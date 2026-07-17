import { z } from "zod";

export const postStatusSchema = z.enum(["draft", "published"]);

export const postInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  excerpt: z.string().trim().max(320),
  content: z.string().trim().min(10).max(50_000),
  status: postStatusSchema,
  featuredMediaId: z.string().uuid().nullable(),
});

export const postIdSchema = z.object({ id: z.string().uuid() });
export const postSlugSchema = z.object({ slug: z.string().min(1).max(180) });

export const loginInputSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(256),
});

export type PostStatus = z.infer<typeof postStatusSchema>;
export type PostInput = z.infer<typeof postInputSchema>;

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  featuredMediaId: string | null;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type CmsMedia = {
  id: string;
  filename: string;
  mimeType: string;
  byteSize: number;
  altText: string;
  url: string;
  createdAt: string;
};

export function slugifyTitle(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export function formatCmsDate(value: string | null): string {
  if (!value) return "Not published";
  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
