import { createFileRoute } from "@tanstack/react-router";
import { assertSameOrigin, requireAdmin, storeMedia } from "@/lib/cms.server";

const MAX_MEDIA_REQUEST_BYTES = 1_700_000;

function mediaErrorStatus(message: string): number {
  if (message === "Unauthorized") return 401;
  if (message === "Invalid request origin.") return 403;
  if (
    message.startsWith("Upload a JPEG") ||
    message.startsWith("Images must be smaller") ||
    message.startsWith("The uploaded file content") ||
    message.startsWith("Select an image")
  ) {
    return 400;
  }
  return 500;
}

export const Route = createFileRoute("/api/admin/media")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          assertSameOrigin();
          await requireAdmin();

          if (!request.headers.get("content-type")?.startsWith("multipart/form-data;")) {
            return Response.json({ error: "Upload a multipart form." }, { status: 415 });
          }

          const contentLengthHeader = request.headers.get("content-length");
          const contentLength = Number(contentLengthHeader);
          if (!contentLengthHeader || !Number.isSafeInteger(contentLength) || contentLength <= 0) {
            return Response.json({ error: "A valid upload size is required." }, { status: 411 });
          }
          if (contentLength > MAX_MEDIA_REQUEST_BYTES) {
            return Response.json({ error: "The upload is too large." }, { status: 413 });
          }

          const form = await request.formData();
          const file = form.get("file");
          const altText = form.get("altText");
          if (!(file instanceof File)) {
            return Response.json({ error: "Select an image to upload." }, { status: 400 });
          }

          const media = await storeMedia(file, typeof altText === "string" ? altText : "");
          return Response.json(media, {
            status: 201,
            headers: { "Cache-Control": "no-store" },
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "The image could not be uploaded.";
          const status = mediaErrorStatus(message);
          console.error(JSON.stringify({ message: "cms media upload failed", error: message }));
          return Response.json(
            { error: status === 500 ? "The image could not be uploaded." : message },
            { status },
          );
        }
      },
    },
  },
});
