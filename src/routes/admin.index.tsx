import logoImg from "@/assets/bosshr-logo.png";
import type { CmsMedia, CmsPost, PostInput } from "@/lib/cms";
import { slugifyTitle } from "@/lib/cms";
import {
  getAdminSession,
  getCmsDashboard,
  logoutFromCms,
  removeCmsPost,
  saveCmsPost,
} from "@/lib/cms.functions";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  FilePlus2,
  ImagePlus,
  LogOut,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const admin = await getAdminSession();
    if (!admin) throw redirect({ to: "/admin/login" });
    return getCmsDashboard();
  },
  head: () => ({ meta: [{ title: "CMS Dashboard — BOSSHR Team Consultancy" }] }),
  component: AdminDashboard,
});

type EditorState = PostInput;

const emptyEditor: EditorState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "draft",
  featuredMediaId: null,
};

function getErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) return "Something went wrong. Please try again.";
  if (error.message.includes("UNIQUE constraint failed")) return "That URL slug is already in use.";
  return error.message;
}

async function optimizeImage(file: File): Promise<File> {
  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("This image could not be read."));
      element.src = imageUrl;
    });

    const maxDimension = 1600;
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Image optimization is unavailable in this browser.");
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.82),
    );
    if (!blob) throw new Error("This image could not be optimized.");
    if (blob.size > 1_500_000) throw new Error("The optimized image is still larger than 1.5 MB.");
    const filename = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], filename, { type: "image/webp" });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function AdminDashboard() {
  const initial = Route.useLoaderData();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CmsPost[]>(initial.posts);
  const [media, setMedia] = useState<CmsMedia[]>(initial.media);
  const [editor, setEditor] = useState<EditorState>(emptyEditor);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");

  const selectedImage = useMemo(
    () => media.find((item) => item.id === editor.featuredMediaId) ?? null,
    [editor.featuredMediaId, media],
  );

  function resetEditor() {
    setEditingId(null);
    setEditor(emptyEditor);
    setError("");
    setMessage("");
  }

  function editPost(post: CmsPost) {
    setEditingId(post.id);
    setEditor({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      status: post.status,
      featuredMediaId: post.featuredMediaId,
    });
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateTitle(title: string) {
    setEditor((current) => {
      const previousGeneratedSlug = slugifyTitle(current.title);
      const shouldGenerateSlug = !current.slug || current.slug === previousGeneratedSlug;
      return { ...current, title, slug: shouldGenerateSlug ? slugifyTitle(title) : current.slug };
    });
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const saved = await saveCmsPost({ data: { ...editor, id: editingId ?? undefined } });
      setPosts((current) => {
        const next = current.filter((post) => post.id !== saved.id);
        return [saved, ...next];
      });
      setEditingId(saved.id);
      setEditor({ ...editor, id: saved.id });
      setMessage(
        saved.status === "published" ? "Post published successfully." : "Draft saved successfully.",
      );
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(post: CmsPost) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    setError("");
    try {
      await removeCmsPost({ data: { id: post.id } });
      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (editingId === post.id) resetEditor();
    } catch (caught) {
      setError(getErrorMessage(caught));
    }
  }

  async function handleMediaUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const optimized = await optimizeImage(file);
      const form = new FormData();
      form.append("file", optimized);
      form.append("altText", mediaAlt.trim());
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const result = (await response.json()) as CmsMedia | { error: string };
      if (!response.ok || "error" in result) {
        throw new Error("error" in result ? result.error : "The image could not be uploaded.");
      }
      setMedia((current) => [result, ...current]);
      setEditor((current) => ({ ...current, featuredMediaId: result.id }));
      setMediaAlt("");
      setMessage("Image uploaded and selected.");
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setUploading(false);
    }
  }

  async function handleLogout() {
    await logoutFromCms();
    await navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-dvh bg-secondary/30 text-foreground">
      <header className="border-b border-white/10 bg-primary text-primary-foreground">
        <div className="container-x flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="BOSSHR" className="h-14 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Content Manager</p>
              <p className="text-xs text-white/60">{initial.admin.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/posts"
              target="_blank"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/20 px-4 text-sm font-medium hover:bg-white/10"
            >
              View site <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container-x grid gap-8 py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:py-12">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-foreground">
                {editingId ? "Edit content" : "New content"}
              </p>
              <h1 className="mt-2 text-3xl font-semibold">
                {editingId ? "Update post" : "Create a post"}
              </h1>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetEditor}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold hover:bg-secondary"
              >
                <X className="h-4 w-4" /> New post
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="mt-8 space-y-6">
            <div>
              <label htmlFor="post-title" className="text-sm font-semibold">
                Title
              </label>
              <input
                id="post-title"
                required
                minLength={3}
                maxLength={160}
                value={editor.title}
                onChange={(event) => updateTitle(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="New job opportunities available"
              />
            </div>

            <div>
              <label htmlFor="post-slug" className="text-sm font-semibold">
                Page URL
              </label>
              <div className="mt-2 flex min-h-12 items-center overflow-hidden rounded-xl border border-input bg-background focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
                <span className="pl-4 text-sm text-muted-foreground">/posts/</span>
                <input
                  id="post-slug"
                  required
                  value={editor.slug}
                  onChange={(event) =>
                    setEditor((current) => ({ ...current, slug: event.target.value.toLowerCase() }))
                  }
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  className="min-h-12 min-w-0 flex-1 bg-transparent px-1 pr-4 text-base outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="post-excerpt" className="text-sm font-semibold">
                Short summary
              </label>
              <textarea
                id="post-excerpt"
                rows={3}
                maxLength={320}
                value={editor.excerpt}
                onChange={(event) =>
                  setEditor((current) => ({ ...current, excerpt: event.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-input bg-background p-4 text-base leading-6 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="A short introduction shown on the updates page."
              />
            </div>

            <div>
              <label htmlFor="post-content" className="text-sm font-semibold">
                Content
              </label>
              <textarea
                id="post-content"
                required
                minLength={10}
                rows={12}
                value={editor.content}
                onChange={(event) =>
                  setEditor((current) => ({ ...current, content: event.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-input bg-background p-4 text-base leading-7 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Write the full update here. Leave an empty line between paragraphs."
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Use blank lines to separate paragraphs.
              </p>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">Featured image</legend>
              <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <label htmlFor="media-alt" className="text-xs font-medium text-muted-foreground">
                    Image description
                  </label>
                  <input
                    id="media-alt"
                    value={mediaAlt}
                    onChange={(event) => setMediaAlt(event.target.value)}
                    className="mt-1 min-h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                    placeholder="Describe the image for accessibility"
                  />
                </div>
                <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 text-sm font-semibold hover:border-gold">
                  <ImagePlus className="h-4 w-4" /> {uploading ? "Optimizing…" : "Upload photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    disabled={uploading}
                    onChange={handleMediaUpload}
                    className="sr-only"
                  />
                </label>
              </div>

              {media.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {media.slice(0, 10).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setEditor((current) => ({ ...current, featuredMediaId: item.id }))
                      }
                      aria-label={`Select ${item.altText || item.filename}`}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 ${editor.featuredMediaId === item.id ? "border-gold" : "border-transparent"}`}
                    >
                      <img src={item.url} alt="" className="h-full w-full object-cover" />
                      {editor.featuredMediaId === item.id && (
                        <span className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-gold-foreground">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {selectedImage && (
                <button
                  type="button"
                  onClick={() => setEditor((current) => ({ ...current, featuredMediaId: null }))}
                  className="mt-3 text-xs font-semibold text-muted-foreground underline underline-offset-4"
                >
                  Remove featured image
                </button>
              )}
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <label htmlFor="post-status" className="text-sm font-semibold">
                  Status
                </label>
                <select
                  id="post-status"
                  value={editor.status}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      status: event.target.value as "draft" | "published",
                    }))
                  }
                  className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none focus:border-gold"
                >
                  <option value="draft">Draft — private</option>
                  <option value="published">Published — visible to everyone</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 font-semibold text-gold-foreground transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />{" "}
                {saving ? "Saving…" : editor.status === "published" ? "Publish post" : "Save draft"}
              </button>
            </div>

            {message && (
              <p
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {message}
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
          </form>
        </section>

        <aside className="self-start rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-foreground">
                Content library
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Your posts</h2>
            </div>
            <button
              type="button"
              onClick={resetEditor}
              aria-label="Create new post"
              className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <FilePlus2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {posts.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                No posts yet. Create your first update.
              </p>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${post.status === "published" ? "bg-green-100 text-green-800" : "bg-secondary text-muted-foreground"}`}
                      >
                        {post.status}
                      </span>
                      <h3 className="mt-2 line-clamp-2 font-semibold leading-snug">{post.title}</h3>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        /posts/{post.slug}
                      </p>
                    </div>
                    {post.featuredImageUrl && (
                      <img
                        src={post.featuredImageUrl}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => editPost(post)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold hover:bg-secondary"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </button>
                    {post.status === "published" && (
                      <Link
                        to="/posts/$slug"
                        params={{ slug: post.slug }}
                        target="_blank"
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold hover:bg-secondary"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" /> View
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(post)}
                      className="ml-auto inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
