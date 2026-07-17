import { createFileRoute } from "@tanstack/react-router";
import { getMediaBody } from "@/lib/cms.server";

export const Route = createFileRoute("/media/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!/^[0-9a-f-]{36}$/i.test(params.id)) {
          return new Response("Not found", { status: 404 });
        }

        try {
          const media = await getMediaBody(params.id);
          if (!media) return new Response("Not found", { status: 404 });

          const headers = new Headers({
            "Content-Type": media.mimeType,
            "Content-Length": String(media.byteSize),
            "Cache-Control": media.cacheControl,
            "X-Content-Type-Options": "nosniff",
          });
          if (media.etag) headers.set("ETag", media.etag);

          return new Response(media.body, { headers });
        } catch (error) {
          console.error(
            JSON.stringify({
              message: "cms media read failed",
              mediaId: params.id,
              error: error instanceof Error ? error.message : String(error),
            }),
          );
          return new Response("Media temporarily unavailable", {
            status: 503,
            headers: { "Cache-Control": "no-store", "Retry-After": "60" },
          });
        }
      },
    },
  },
});
