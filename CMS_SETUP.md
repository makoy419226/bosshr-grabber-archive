# BOSSHR Content Manager

The website now includes a Cloudflare-native content manager:

- Public updates: `/posts`
- Admin login: `/admin/login`
- Admin dashboard: `/admin`
- Draft and published posts
- Featured-image upload with browser-side WebP optimization
- Eight-hour encrypted admin sessions and login rate limiting

## Cloudflare resources

The `CMS_DB` binding points to the `bosshr-cms` D1 database. The migrations are:

- `0001_create_cms.sql` — original posts, D1 media, and login throttling
- `0002_add_application_platform.sql` — users, jobs, applications, inquiries,
  forum content, audit logs, and R2-ready media metadata

The `CMS_MEDIA` binding targets the private `bosshr-media` R2 bucket. New post
images are stored in R2 while `/media/:id` continues to support any legacy D1
images. The Cloudflare account must have R2 enabled before the bucket can be
created or this binding can be deployed.

Create the bucket once R2 is enabled:

```sh
npx wrangler r2 bucket create bosshr-media
```

R2 uses object-key prefixes rather than physical folders:

```text
post-images/<uuid>.<extension>
profile-images/<user-id>/<uuid>.<extension>
resumes/<application-id>/<uuid>.<extension>
documents/<uuid>.<extension>
```

Only `post-images/` is currently connected to a public upload and read flow.
Profile-image, resume, and document flows are reserved by the schema and must
be implemented with authentication and private download authorization before
use.

## Application data model

The D1 schema now provides these application tables:

- `users`
- `posts`
- `job_openings`
- `applications`
- `inquiries`
- `forum_topics`
- `forum_comments`
- `audit_logs`
- `media`
- `login_attempts`

The migration creates the storage foundation only. The current admin dashboard
manages posts and post images. Jobs, applications, inquiries, member accounts,
forum moderation, private resume downloads, and audit-log screens still need
their own validated server functions and user interfaces.

## Local development

1. Copy `.dev.vars.example` to `.dev.vars` if it does not already exist.
2. Replace all three placeholder values with local credentials.
3. Apply migrations with `npm run cms:migrate:local`.
4. Start the site with `npm run dev`.

For a production-build preview, run `npm run build` and then `npm run preview`.
Regenerate Cloudflare binding types with `npm run cf:typegen`; this command uses
the placeholder names in `.dev.vars.example` and never reads local secret values.

## Production secrets

After building, configure these Worker secrets using the generated Wrangler
configuration:

```sh
npx wrangler secret put CMS_ADMIN_EMAIL --config .output/server/wrangler.json
npx wrangler secret put CMS_ADMIN_PASSWORD --config .output/server/wrangler.json
npx wrangler secret put CMS_SESSION_SECRET --config .output/server/wrangler.json
```

Use a unique admin password and a randomly generated session secret of at least
32 characters. Never commit `.dev.vars`; it is already ignored by Git.

Build and deploy only after the production secrets are configured:

```sh
npm run build
npx nitro deploy --prebuilt
```

## Email and SMTP

The Worker includes an `EMAIL` send binding. Cloudflare Email Sending cannot be
activated until the sender domain uses Cloudflare DNS and is onboarded under
**Compute > Email Service > Email Sending**.

`bossconsultancy.com` currently uses NameBright nameservers. After changing the
domain to the Cloudflare nameservers assigned when it is added to the account,
onboard it and verify the DNS records:

```sh
npx wrangler email sending enable bossconsultancy.com
npx wrangler email sending dns get bossconsultancy.com
```

For an external SMTP client, Cloudflare's secure SMTP endpoint is
`smtp.mx.cloudflare.net` on port `465`. Its username is `api_token`, and its
password is a Cloudflare API token with Email Sending permission. The website
Worker should use its native `EMAIL` binding instead of storing an SMTP token.
