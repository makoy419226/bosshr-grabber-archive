import { CmsPublicLayout } from "@/components/cms/site-shell";
import { formatCmsDate } from "@/lib/cms";
import { getPublicPosts } from "@/lib/cms.functions";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";

export const Route = createFileRoute("/posts")({
  loader: () => getPublicPosts(),
  head: () => ({
    meta: [
      { title: "News & Updates — BOSSHR Team Consultancy" },
      {
        name: "description",
        content: "Latest news, job opportunities and updates from BOSSHR Team Consultancy.",
      },
    ],
  }),
  component: PostsPage,
});

function PostsPage() {
  const posts = Route.useLoaderData();

  return (
    <CmsPublicLayout>
      <section className="border-b border-border bg-secondary/40 py-14 sm:py-20">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-foreground">
            BOSSHR Journal
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            News, opportunities and updates.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Stay informed about current opportunities, practical guidance and the latest from our
            team in Dubai.
          </p>
        </div>
      </section>

      <section className="container-x py-14 sm:py-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-5 text-2xl font-semibold">Updates are coming soon.</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              New announcements and opportunities will appear here when they are published.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  to="/posts/$slug"
                  params={{ slug: post.slug }}
                  className="flex w-full flex-col"
                >
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt={post.featuredImageAlt}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid aspect-[16/10] place-items-center bg-primary/5">
                      <FileText className="h-10 w-10 text-gold" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-foreground">
                      {formatCmsDate(post.publishedAt)}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold leading-tight">{post.title}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.excerpt || post.content}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Read update <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </CmsPublicLayout>
  );
}
