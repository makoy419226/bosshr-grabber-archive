import {
  clearSession,
  getRequest,
  getRequestHeader,
  useSession as getServerSession,
} from "@tanstack/react-start/server";
import type { CmsMedia, CmsPost, PostInput, PostStatus } from "./cms";

const SESSION_NAME = "bosshr-cms-admin";
const SESSION_MAX_AGE = 60 * 60 * 8;
const MAX_IMAGE_BYTES = 1_500_000;
const IMMUTABLE_MEDIA_CACHE_CONTROL = "public, max-age=31536000, immutable";
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const IMAGE_FILE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

type AdminSessionData = { email?: string };

type CloudflareRequest = Request & {
  runtime?: {
    cloudflare?: {
      env?: Env;
    };
  };
};

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  featured_media_id: string | null;
  featured_image_alt: string | null;
  author_email: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

type MediaRow = {
  id: string;
  filename: string;
  mime_type: string;
  byte_size: number;
  alt_text: string;
  created_at: string;
};

type MediaStorageRow = MediaRow & {
  storage_provider: "d1" | "r2" | "dual";
  r2_key: string | null;
};

type MediaDataRow = { data: ArrayBuffer | null };

export type CmsMediaBody = {
  body: ArrayBuffer | ReadableStream;
  filename: string;
  mimeType: string;
  byteSize: number;
  cacheControl: string;
  etag: string | null;
};

let localCmsEnvPromise: Promise<Env> | undefined;

async function getLocalCmsEnv(): Promise<Env> {
  if (!localCmsEnvPromise) {
    localCmsEnvPromise = (async () => {
      const wranglerPackage = "wrangler";
      const wrangler = (await import(/* @vite-ignore */ wranglerPackage)) as {
        getPlatformProxy: (options: {
          configPath: string;
          persist: { path: string };
        }) => Promise<{ env: Env }>;
      };
      const proxy = await wrangler.getPlatformProxy({
        configPath: "wrangler.jsonc",
        persist: { path: ".wrangler/state/v3" },
      });
      return proxy.env;
    })();
  }
  return localCmsEnvPromise;
}

async function getCmsEnv(): Promise<Env> {
  const request = getRequest() as CloudflareRequest;
  const requestEnv = request.runtime?.cloudflare?.env;
  if (requestEnv?.CMS_DB) return requestEnv;
  if (import.meta.env.DEV) return getLocalCmsEnv();
  throw new Error(
    "The CMS_DB Cloudflare binding is unavailable. Run the app with its Cloudflare/Wrangler configuration.",
  );
}

async function getSessionConfig() {
  const { CMS_SESSION_SECRET } = await getCmsEnv();
  if (!CMS_SESSION_SECRET || CMS_SESSION_SECRET.length < 32) {
    throw new Error("CMS_SESSION_SECRET must contain at least 32 characters.");
  }

  const secure = new URL(getRequest().url).protocol === "https:";
  return {
    password: CMS_SESSION_SECRET,
    name: SESSION_NAME,
    maxAge: SESSION_MAX_AGE,
    cookie: {
      httpOnly: true,
      secure,
      sameSite: "strict" as const,
      path: "/",
    },
  };
}

function mapPost(row: PostRow): CmsPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    status: row.status,
    featuredMediaId: row.featured_media_id,
    featuredImageUrl: row.featured_media_id ? `/media/${row.featured_media_id}` : null,
    featuredImageAlt: row.featured_image_alt ?? "",
    authorEmail: row.author_email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}

function mapMedia(row: MediaRow): CmsMedia {
  return {
    id: row.id,
    filename: row.filename,
    mimeType: row.mime_type,
    byteSize: row.byte_size,
    altText: row.alt_text,
    url: `/media/${row.id}`,
    createdAt: row.created_at,
  };
}

function postSelect(where: string): string {
  return `
    SELECT
      p.id, p.slug, p.title, p.excerpt, p.content, p.status,
      p.featured_media_id, m.alt_text AS featured_image_alt,
      p.author_email, p.created_at, p.updated_at, p.published_at
    FROM posts p
    LEFT JOIN media m ON m.id = p.featured_media_id
    ${where}
  `;
}

async function sha256(value: string | ArrayBuffer): Promise<ArrayBuffer> {
  const input = typeof value === "string" ? new TextEncoder().encode(value) : value;
  return crypto.subtle.digest("SHA-256", input);
}

function toHex(value: ArrayBuffer): string {
  return Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hasBytes(bytes: Uint8Array, expected: number[], offset = 0): boolean {
  return expected.every((value, index) => bytes[offset + index] === value);
}

function hasValidImageSignature(data: ArrayBuffer, mimeType: string): boolean {
  const bytes = new Uint8Array(data);
  if (mimeType === "image/jpeg") return hasBytes(bytes, [0xff, 0xd8, 0xff]);
  if (mimeType === "image/png") {
    return hasBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }
  if (mimeType === "image/webp") {
    return (
      hasBytes(bytes, [0x52, 0x49, 0x46, 0x46]) && hasBytes(bytes, [0x57, 0x45, 0x42, 0x50], 8)
    );
  }
  if (mimeType === "image/avif") {
    if (!hasBytes(bytes, [0x66, 0x74, 0x79, 0x70], 4)) return false;
    const header = new TextDecoder().decode(bytes.slice(8, Math.min(bytes.length, 40)));
    return header.includes("avif") || header.includes("avis");
  }
  return false;
}

async function safeEqual(left: string, right: string): Promise<boolean> {
  const [leftHash, rightHash] = await Promise.all([sha256(left), sha256(right)]);
  const leftBytes = new Uint8Array(leftHash);
  const rightBytes = new Uint8Array(rightHash);
  let difference = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index % rightBytes.length];
  }
  return difference === 0;
}

async function requestIpHash(): Promise<string> {
  const ip =
    getRequestHeader("cf-connecting-ip") ??
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local";
  const hash = new Uint8Array(await sha256(ip));
  return Array.from(hash, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function assertSameOrigin(): void {
  const request = getRequest();
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    throw new Error("Invalid request origin.");
  }
}

export async function getAdmin(): Promise<{ email: string } | null> {
  const cmsEnv = await getCmsEnv();
  const session = await getServerSession<AdminSessionData>(await getSessionConfig());
  const email = session.data.email?.toLowerCase();
  if (!email || email !== cmsEnv.CMS_ADMIN_EMAIL?.toLowerCase()) return null;
  return { email };
}

export async function requireAdmin(): Promise<{ email: string }> {
  const admin = await getAdmin();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

export async function loginAdmin(email: string, password: string): Promise<{ email: string }> {
  assertSameOrigin();
  const cmsEnv = await getCmsEnv();

  if (!cmsEnv.CMS_ADMIN_EMAIL || !cmsEnv.CMS_ADMIN_PASSWORD) {
    throw new Error("CMS admin credentials have not been configured.");
  }

  const ipHash = await requestIpHash();
  const cutoff = new Date(Date.now() - 15 * 60 * 1_000).toISOString();
  await cmsEnv.CMS_DB.prepare("DELETE FROM login_attempts WHERE attempted_at < ?")
    .bind(cutoff)
    .run();

  const attempts = await cmsEnv.CMS_DB.prepare(
    "SELECT COUNT(*) AS count FROM login_attempts WHERE ip_hash = ? AND attempted_at >= ?",
  )
    .bind(ipHash, cutoff)
    .first<{ count: number }>();

  if ((attempts?.count ?? 0) >= 5) {
    throw new Error("Too many login attempts. Please wait 15 minutes and try again.");
  }

  const emailMatches = await safeEqual(email.toLowerCase(), cmsEnv.CMS_ADMIN_EMAIL.toLowerCase());
  const passwordMatches = await safeEqual(password, cmsEnv.CMS_ADMIN_PASSWORD);

  if (!emailMatches || !passwordMatches) {
    await cmsEnv.CMS_DB.prepare(
      "INSERT INTO login_attempts (id, ip_hash, attempted_at) VALUES (?, ?, ?)",
    )
      .bind(crypto.randomUUID(), ipHash, new Date().toISOString())
      .run();
    throw new Error("Invalid email or password.");
  }

  const normalizedEmail = email.toLowerCase();
  const session = await getServerSession<AdminSessionData>(await getSessionConfig());
  await session.update({ email: normalizedEmail });
  await cmsEnv.CMS_DB.prepare("DELETE FROM login_attempts WHERE ip_hash = ?").bind(ipHash).run();
  return { email: normalizedEmail };
}

export async function logoutAdmin(): Promise<void> {
  assertSameOrigin();
  await clearSession(await getSessionConfig());
}

export async function listPublishedPosts(): Promise<CmsPost[]> {
  const cmsEnv = await getCmsEnv();
  const result = await cmsEnv.CMS_DB.prepare(
    `${postSelect("WHERE p.status = 'published'")} ORDER BY p.published_at DESC, p.created_at DESC`,
  ).all<PostRow>();
  return result.results.map(mapPost);
}

export async function getPublishedPost(slug: string): Promise<CmsPost | null> {
  const cmsEnv = await getCmsEnv();
  const row = await cmsEnv.CMS_DB.prepare(
    `${postSelect("WHERE p.status = 'published' AND p.slug = ?")} LIMIT 1`,
  )
    .bind(slug)
    .first<PostRow>();
  return row ? mapPost(row) : null;
}

export async function listAllPosts(): Promise<CmsPost[]> {
  await requireAdmin();
  const cmsEnv = await getCmsEnv();
  const result = await cmsEnv.CMS_DB.prepare(
    `${postSelect("")} ORDER BY p.updated_at DESC, p.created_at DESC`,
  ).all<PostRow>();
  return result.results.map(mapPost);
}

export async function listMedia(): Promise<CmsMedia[]> {
  await requireAdmin();
  const cmsEnv = await getCmsEnv();
  const result = await cmsEnv.CMS_DB.prepare(
    "SELECT id, filename, mime_type, byte_size, alt_text, created_at FROM media ORDER BY created_at DESC LIMIT 100",
  ).all<MediaRow>();
  return result.results.map(mapMedia);
}

export async function createPost(input: PostInput): Promise<CmsPost> {
  assertSameOrigin();
  const admin = await requireAdmin();
  const cmsEnv = await getCmsEnv();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const publishedAt = input.status === "published" ? now : null;

  await cmsEnv.CMS_DB.prepare(
    `INSERT INTO posts (
      id, slug, title, excerpt, content, status, featured_media_id,
      author_email, created_at, updated_at, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      input.slug,
      input.title,
      input.excerpt,
      input.content,
      input.status,
      input.featuredMediaId,
      admin.email,
      now,
      now,
      publishedAt,
    )
    .run();

  const post = await getPostById(id);
  if (!post) throw new Error("The post was created but could not be loaded.");
  return post;
}

export async function updatePost(input: PostInput & { id: string }): Promise<CmsPost> {
  assertSameOrigin();
  await requireAdmin();
  const cmsEnv = await getCmsEnv();
  const existing = await getPostById(input.id);
  if (!existing) throw new Error("Post not found.");

  const now = new Date().toISOString();
  const publishedAt =
    input.status === "published" ? (existing.publishedAt ?? now) : existing.publishedAt;

  await cmsEnv.CMS_DB.prepare(
    `UPDATE posts SET
      slug = ?, title = ?, excerpt = ?, content = ?, status = ?,
      featured_media_id = ?, updated_at = ?, published_at = ?
    WHERE id = ?`,
  )
    .bind(
      input.slug,
      input.title,
      input.excerpt,
      input.content,
      input.status,
      input.featuredMediaId,
      now,
      publishedAt,
      input.id,
    )
    .run();

  const post = await getPostById(input.id);
  if (!post) throw new Error("The post was updated but could not be loaded.");
  return post;
}

export async function deletePost(id: string): Promise<void> {
  assertSameOrigin();
  await requireAdmin();
  const cmsEnv = await getCmsEnv();
  await cmsEnv.CMS_DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}

async function getPostById(id: string): Promise<CmsPost | null> {
  const cmsEnv = await getCmsEnv();
  const row = await cmsEnv.CMS_DB.prepare(`${postSelect("WHERE p.id = ?")} LIMIT 1`)
    .bind(id)
    .first<PostRow>();
  return row ? mapPost(row) : null;
}

export async function storeMedia(file: File, altText: string): Promise<CmsMedia> {
  assertSameOrigin();
  await requireAdmin();
  const cmsEnv = await getCmsEnv();

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Upload a JPEG, PNG, WebP or AVIF image.");
  }
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    throw new Error("Images must be smaller than 1.5 MB after optimization.");
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const filename = file.name.slice(0, 180);
  const extension = IMAGE_FILE_EXTENSIONS[file.type];
  const r2Key = `post-images/${id}.${extension}`;
  const data = await file.arrayBuffer();
  if (!hasValidImageSignature(data, file.type)) {
    throw new Error("The uploaded file content does not match its image type.");
  }
  const checksum = await sha256(data);
  const storedObject = await cmsEnv.CMS_MEDIA.put(r2Key, data, {
    httpMetadata: {
      contentType: file.type,
      cacheControl: IMMUTABLE_MEDIA_CACHE_CONTROL,
    },
    customMetadata: { mediaId: id, purpose: "post-image" },
    sha256: checksum,
  });

  try {
    await cmsEnv.CMS_DB.prepare(
      `INSERT INTO media (
        id, filename, mime_type, byte_size, alt_text, purpose, visibility,
        storage_provider, data, r2_key, r2_etag, r2_version,
        checksum_sha256, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, 'post-image', 'public', 'r2', NULL, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        id,
        filename,
        file.type,
        file.size,
        altText.slice(0, 240),
        r2Key,
        storedObject.etag,
        storedObject.version,
        toHex(checksum),
        createdAt,
        createdAt,
      )
      .run();
  } catch (error) {
    try {
      await cmsEnv.CMS_MEDIA.delete(r2Key);
    } catch (cleanupError) {
      console.error(
        JSON.stringify({
          message: "orphaned R2 object cleanup failed",
          mediaId: id,
          error: cleanupError instanceof Error ? cleanupError.message : String(cleanupError),
        }),
      );
    }
    throw error;
  }

  return {
    id,
    filename,
    mimeType: file.type,
    byteSize: file.size,
    altText: altText.slice(0, 240),
    url: `/media/${id}`,
    createdAt,
  };
}

async function getLegacyMediaData(cmsEnv: Env, id: string): Promise<ArrayBuffer | null> {
  const legacy = await cmsEnv.CMS_DB.prepare("SELECT data FROM media WHERE id = ? LIMIT 1")
    .bind(id)
    .first<MediaDataRow>();
  return legacy?.data ?? null;
}

export async function getMediaBody(id: string): Promise<CmsMediaBody | null> {
  const cmsEnv = await getCmsEnv();
  const media = await cmsEnv.CMS_DB.prepare(
    `SELECT
      id, filename, mime_type, byte_size, alt_text, created_at,
      storage_provider, r2_key
    FROM media
    WHERE id = ? AND visibility = 'public'
    LIMIT 1`,
  )
    .bind(id)
    .first<MediaStorageRow>();
  if (!media) return null;

  if (media.r2_key) {
    const object = await cmsEnv.CMS_MEDIA.get(media.r2_key);
    if (object) {
      return {
        body: object.body,
        filename: media.filename,
        mimeType: object.httpMetadata?.contentType ?? media.mime_type,
        byteSize: object.size,
        cacheControl: object.httpMetadata?.cacheControl ?? IMMUTABLE_MEDIA_CACHE_CONTROL,
        etag: object.httpEtag,
      };
    }

    if (media.storage_provider === "r2") {
      console.error(JSON.stringify({ message: "R2 media object missing", mediaId: id }));
      throw new Error("Media storage is temporarily unavailable.");
    }
  }

  const data = await getLegacyMediaData(cmsEnv, id);
  if (!data || data.byteLength === 0) {
    console.error(JSON.stringify({ message: "D1 media body missing", mediaId: id }));
    throw new Error("Media storage is temporarily unavailable.");
  }

  return {
    body: data,
    filename: media.filename,
    mimeType: media.mime_type,
    byteSize: media.byte_size,
    cacheControl: IMMUTABLE_MEDIA_CACHE_CONTROL,
    etag: null,
  };
}
