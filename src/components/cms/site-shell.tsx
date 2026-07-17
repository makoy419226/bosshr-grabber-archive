import logoImg from "@/assets/bosshr-logo.png";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function CmsSiteHeader() {
  return (
    <header className="border-b border-white/10 bg-primary text-primary-foreground">
      <div className="container-x flex min-h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="BOSSHR home" className="shrink-0">
          <img src={logoImg} alt="BOSSHR Team Consultancy" className="h-16 w-auto object-contain" />
        </Link>
        <nav aria-label="Content navigation" className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <Link
            to="/posts"
            className="inline-flex min-h-11 items-center text-sm font-medium text-gold"
          >
            News &amp; Updates
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function CmsSiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground">
      <div className="container-x flex flex-col justify-between gap-5 py-10 text-sm sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold">BOSSHR Team Consultancy FZC</p>
          <p className="mt-1 text-white/60">Bridging people to opportunities in the UAE.</p>
        </div>
        <a
          href="/#contact"
          className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-full bg-gold px-5 py-2.5 font-medium text-gold-foreground"
        >
          Contact us <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}

export function CmsPublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <CmsSiteHeader />
      <main className="flex-1">{children}</main>
      <CmsSiteFooter />
    </div>
  );
}
