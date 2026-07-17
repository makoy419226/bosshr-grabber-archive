import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import ctaBg from "@/assets/cta-bg.jpg";
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  Users,
  Compass,
  ClipboardList,
  UserCheck,
  GraduationCap,
  Building2,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const stats = [
  { value: "98%", label: "Client satisfaction in HR consultancy" },
  { value: "500+", label: "Career consultations delivered" },
  { value: "100%", label: "Client-focused support" },
  { value: "24/7", label: "Online inquiry support" },
];

const services = [
  { icon: Compass, title: "Career Consultancy", desc: "Personalized guidance to help you chart the next chapter of your professional life." },
  { icon: FileText, title: "Employment Advisory", desc: "Practical, honest advice on offers, contracts and career transitions." },
  { icon: Briefcase, title: "Recruitment Consultancy", desc: "Matching qualified professionals with the right employers across industries." },
  { icon: Users, title: "Workforce Advisory", desc: "Strategic workforce planning for growing teams and organizations." },
  { icon: ClipboardList, title: "Documentation Assistance", desc: "End-to-end support with employment documents and processing." },
  { icon: UserCheck, title: "Applicant Management", desc: "Organized applicant coordination from first contact to placement." },
  { icon: GraduationCap, title: "Professional Development", desc: "Programs and coaching that build lasting career capability." },
  { icon: Building2, title: "Human Resource Solutions", desc: "Tailored HR support built around people and business goals." },
];

const values = [
  { n: "01", title: "Trusted Partner", desc: "Building trust through integrity, transparent communication and professional guidance every step of the way." },
  { n: "02", title: "People First", desc: "Every individual deserves personalized support, meaningful opportunities and a trusted partner throughout their journey." },
  { n: "03", title: "Meaningful Opportunities", desc: "Creating opportunities that empower individuals to achieve personal growth, professional success and a brighter future." },
  { n: "04", title: "Lasting Impact", desc: "True success is measured by the lasting impact we create through trusted partnerships and meaningful opportunities." },
];

const jobs = [
  { title: "Support", desc: "Explore diverse opportunities across multiple growing industries today.", salary: "Varies by Position" },
  { title: "Barista", desc: "Craft quality beverages while creating memorable customer experiences.", salary: "AED 2,200 – 4,000" },
  { title: "Waitress", desc: "Deliver exceptional dining experiences with friendly professional service.", salary: "AED 2,000 – 3,500" },
  { title: "Receptionist", desc: "Welcome visitors while managing appointments professionally every day.", salary: "AED 2,500 – 4,500" },
  { title: "Salon Staff", desc: "Deliver premium beauty services with outstanding customer care.", salary: "AED 2,500 – 5,000" },
  { title: "Cashier", desc: "Handle transactions accurately with attentive, friendly service.", salary: "AED 2,000 – 3,500" },
  { title: "Sales Associate", desc: "Assist customers while achieving daily sales targets successfully.", salary: "AED 2,200 – 4,000" },
  { title: "Lady Driver", desc: "Provide safe, reliable transportation with professional service.", salary: "AED 2,500 – 4,500" },
  { title: "Housekeeping Staff", desc: "Maintain clean, comfortable and welcoming environments daily.", salary: "AED 1,800 – 3,000" },
  { title: "Cleaner", desc: "Ensure clean, organized and hygienic environments through quality cleaning services.", salary: "AED 1,500 – 2,800" },
];

const team = [
  { name: "Bosshr", role: "Chief Executive Officer", desc: "Leading BOSSHR through integrity, vision, professionalism and excellence.", img: "https://static.wixstatic.com/media/360f24_fe69f0b6cbcc46ea9fab37e554cf2048~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff01.png" },
  { name: "Pammy", role: "Recruitment Supervisor", desc: "Leading recruitment operations with professionalism, dedication and compassion.", img: "https://static.wixstatic.com/media/360f24_f382a34aba584a3ba2ce87aef98f891b~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff04.png" },
  { name: "Maymay", role: "Recruitment Secretary", desc: "Coordinating applicants efficiently through organized communication and support.", img: "https://static.wixstatic.com/media/360f24_635ac877e9c64c8294133066aa841531~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff05.png" },
  { name: "Luna", role: "Recruitment & HR Staff", desc: "Supporting applicants through responsive guidance, care and professionalism.", img: "https://static.wixstatic.com/media/360f24_7c76e046a2df486299367d670622f2e9~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff07.png" },
  { name: "Sagittarius Queen", role: "Recruitment Specialist", desc: "Connecting qualified professionals with trusted employment opportunities confidently.", img: "https://static.wixstatic.com/media/360f24_a9194e24c8534539b5e706e13324fa75~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff02.png" },
  { name: "Art William Laurente", role: "Accounting & Marketing", desc: "Managing finances while strengthening marketing, branding and growth.", img: "https://static.wixstatic.com/media/360f24_f17aac9a02b944caae523dc349642a85~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff03.png" },
  { name: "Junnard GD", role: "Office Coordinator", desc: "Coordinates daily office operations, administrative functions and internal support.", img: "https://static.wixstatic.com/media/360f24_890c609ef76544f095f504edd6052b58~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff06.png" },
];

const testimonials = [
  { name: "Kristine Joy Mendoza", quote: "BOSSHR exceeded my expectations. Their professionalism and dedication gave me confidence every step of the way." },
  { name: "Carlo Miguel Bautista", quote: "Excellent service from a trustworthy team. They truly care about helping people and made the experience enjoyable and hassle-free." },
  { name: "Maria Santos", quote: "The team was incredibly helpful and professional. They guided me with patience and made the entire process simple and stress-free." },
  { name: "John Michael Reyes", quote: "I appreciated their honest advice and quick responses. They made me feel confident from my first inquiry until the very end." },
  { name: "Angela Mae Cruz", quote: "Professional, approachable and genuinely supportive. BOSSHR made my journey smooth, and I'm thankful for all their guidance." },
  { name: "Mark Anthony Dela Cruz", quote: "Everything was well organized and clearly explained. The team was friendly, responsive and always willing to help." },
  { name: "Emma Wilson", quote: "I felt supported throughout the process. The staff were kind, transparent and always ready to answer my questions." },
];

const contacts = [
  { label: "Main", number: "+971 50 238 1130" },
  { label: "Luna", number: "+971 50 346 7287" },
  { label: "Pam", number: "+971 52 804 2091" },
  { label: "Art", number: "+971 55 702 6719" },
  { label: "Maymay", number: "+971 56 270 6579" },
  { label: "Kuya Junnard", number: "+971 56 926 5605" },
  { label: "Bosshr", number: "+971 56 423 2141" },
];

const nav = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why BOSSHR" },
  { href: "#careers", label: "Careers" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-semibold">B</span>
            <span className="font-display text-lg font-semibold tracking-tight">BOSSHR<span className="text-gold">.</span></span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>
            ))}
          </nav>
          <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden border-b border-border/60">
        <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> BOSSHR Team Consultancy FZC · Ajman, UAE
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] font-medium tracking-tight md:text-7xl">
              A bridge to <em className="italic text-gold">better</em> opportunities.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Trusted career guidance, employment consultancy and professional HR support — helping individuals and businesses achieve their goals with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                Our services <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#about" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                About us
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-gold/30 to-primary/10 blur-2xl" />
              <img src={heroImg} width={1920} height={1200} alt="BOSSHR consultancy team" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl" />
            </div>
          </div>
        </div>
        <div className="border-t border-border/60 bg-secondary/40">
          <div className="container-x grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8">
                <div className="font-display text-4xl font-medium tracking-tight md:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Services</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium md:text-5xl">Solutions that create lasting impact.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">From career guidance to full HR support, every service is built around trust, clarity and outcomes.</p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-card p-8 transition-colors hover:bg-secondary/60">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="bg-primary py-24 text-primary-foreground">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why BOSSHR</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium md:text-5xl">A consultancy built on trust.</h2>
          <p className="mt-4 max-w-2xl text-primary-foreground/70">Helping individuals build brighter futures through trusted guidance, meaningful opportunities and genuine support.</p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.n} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-8 backdrop-blur">
                <div className="font-display text-3xl text-gold">{v.n}</div>
                <h3 className="mt-4 font-display text-xl font-medium text-primary-foreground">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Career Listings</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium md:text-5xl">Explore opportunities with BOSSHR.</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">Discover career opportunities across various industries. Find a role that matches your skills, experience and professional goals.</p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => (
              <article key={j.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Now Hiring
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{j.salary}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium">{j.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{j.desc}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-gold-foreground">
                  Apply today <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-border bg-secondary/40 py-24">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">About Us</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-3xl leading-snug tracking-tight md:text-4xl">
              BOSSHR Team Consultancy FZC is committed to helping individuals move forward through trusted guidance, meaningful opportunities and professional support. We believe every journey deserves the right direction — and a stronger future.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Team</p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Meet the people behind BOSSHR.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Dedicated professionals committed to guiding, supporting and creating meaningful opportunities for every client.</p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="overflow-hidden rounded-2xl bg-secondary">
                  <img src={m.img} alt={m.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium">{m.name}</h3>
                <p className="text-sm text-gold-foreground/80">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/40 py-24">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Client Testimonials</p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Trusted by professionals.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Why individuals trust BOSSHR Team Consultancy FZC to guide their career journey.</p>

          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="mb-6 break-inside-avoid rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm font-medium">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <img src={ctaBg} alt="" aria-hidden loading="lazy" width={1600} height={600} className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="container-x relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Ready to Take the Next Step?</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium text-primary-foreground md:text-6xl">
            Your next opportunity starts today.
          </h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">Let BOSSHR Consultancy help you build a brighter future.</p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5">
            Contact the team <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Let's talk.</h2>
            <p className="mt-4 text-muted-foreground">Reach out through email, phone or the enquiry form — we usually respond within one business day.</p>

            <div className="mt-8 space-y-4">
              <a href="mailto:bosshrteamcc18@gmail.com" className="flex items-start gap-3 text-sm">
                <Mail className="mt-0.5 h-4 w-4 text-gold" />
                <span>bosshrteamcc18@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                <span>Ajman, United Arab Emirates</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="mt-0.5 h-4 w-4 text-gold" />
                <span>Monday – Saturday · 9:00 AM – 6:00 PM</span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4 text-gold" /> Direct lines
              </div>
              <ul className="mt-4 divide-y divide-border text-sm">
                {contacts.map((c) => (
                  <li key={c.number} className="flex items-center justify-between py-2.5">
                    <span className="text-muted-foreground">{c.label}</span>
                    <a href={`tel:${c.number.replace(/\s/g, "")}`} className="font-medium tabular-nums hover:text-gold-foreground">{c.number}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form className="md:col-span-7 rounded-2xl border border-border bg-card p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" required />
              <Field label="Last name" required />
              <Field label="Email" type="email" required />
              <Field label="Phone" type="tel" required />
              <div className="sm:col-span-2">
                <Field label="Position of interest" required />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Message</label>
                <textarea rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="Tell us a little about yourself…" />
              </div>
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Submit enquiry <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-gold-foreground font-display text-lg font-semibold">B</span>
              <span className="font-display text-lg font-semibold tracking-tight">BOSSHR Team Consultancy</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">Trusted career guidance, recruitment and HR consultancy across the UAE.</p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-medium text-primary-foreground">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-gold">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-medium text-primary-foreground">Stay in the know</h4>
            <p className="mt-4 text-sm text-primary-foreground/70">Be among the first to hear about latest news, tips, events and special offers.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" className="flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-gold" />
              <button className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground">Sign up</button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="container-x flex flex-col justify-between gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row">
            <span>© 2026 BOSSHR Team Consultancy · Ajman, UAE · +971 50 238 1130</span>
            <span>Redesigned with care.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}{required && <span className="text-gold"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}
