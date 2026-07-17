import logoImg from "@/assets/bosshr-logo.png";
import { getAdminSession, loginToCms } from "@/lib/cms.functions";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/admin/login")({
  loader: async () => {
    const admin = await getAdminSession();
    if (admin) throw redirect({ to: "/admin" });
    return null;
  },
  head: () => ({ meta: [{ title: "CMS Login — BOSSHR Team Consultancy" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await loginToCms({ data: { email, password } });
      await navigate({ to: "/admin" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-primary px-5 py-12 text-primary-foreground">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex min-h-11 items-center gap-1.5 text-sm text-white/70 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Return to website
        </Link>
        <div className="rounded-3xl border border-white/10 bg-white p-7 text-foreground shadow-2xl sm:p-9">
          <img
            src={logoImg}
            alt="BOSSHR Team Consultancy"
            className="mx-auto h-24 w-auto object-contain"
          />
          <div className="mt-6 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold-foreground">
              <LockKeyhole className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-3xl font-semibold">Content manager</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Sign in to publish updates and manage website photos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="admin-email" className="text-sm font-semibold">
                Admin email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-sm font-semibold">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
