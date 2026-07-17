import { CmsPublicLayout } from "@/components/cms/site-shell";
import { formatCmsDate } from "@/lib/cms";
import { getPublicPost } from "@/lib/cms.functions";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    const post = await getPublicPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — BOSSHR Team Consultancy` },
          { name: "description", content: loaderData.excerpt || loaderData.content.slice(0, 155) },
        ]
      : [],
  }),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <CmsPublicLayout>
      <article>
        <header className="border-b border-border bg-secondary/40 py-12 sm:py-16">
          <div className="container-x max-w-4xl">
            <Link
              to="/posts"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> All updates
            </Link>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-gold-foreground">
              {formatCmsDate(post.publishedAt)}
            </p>
            <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight sm:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        <div className="container-x max-w-4xl py-12 sm:py-16">
          {post.featuredImageUrl && (
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt}
              className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover shadow-sm"
            />
          )}
          <div className="space-y-6 text-base leading-8 text-foreground/85 sm:text-lg">
            {post.content
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </article>
    </CmsPublicLayout>
  );
}
