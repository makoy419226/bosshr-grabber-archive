import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-bosshr.jpeg";
import logoImg from "@/assets/bosshr-logo.png";
import ctaBg from "@/assets/cta-bg.jpg";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
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
  MessageCircle,
  Menu,
  X,
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
  {
    icon: Compass,
    title: "Career Consultancy",
    desc: "Personalized guidance to help you chart the next chapter of your professional life.",
  },
  {
    icon: FileText,
    title: "Employment Advisory",
    desc: "Practical, honest advice on offers, contracts and career transitions.",
  },
  {
    icon: Briefcase,
    title: "Recruitment Consultancy",
    desc: "Matching qualified professionals with the right employers across industries.",
  },
  {
    icon: Users,
    title: "Workforce Advisory",
    desc: "Strategic workforce planning for growing teams and organizations.",
  },
  {
    icon: ClipboardList,
    title: "Documentation Assistance",
    desc: "End-to-end support with employment documents and processing.",
  },
  {
    icon: UserCheck,
    title: "Applicant Management",
    desc: "Organized applicant coordination from first contact to placement.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    desc: "Programs and coaching that build lasting career capability.",
  },
  {
    icon: Building2,
    title: "Human Resource Solutions",
    desc: "Tailored HR support built around people and business goals.",
  },
];

const values = [
  {
    n: "01",
    title: "Trusted Partner",
    desc: "Building trust through integrity, transparent communication and professional guidance every step of the way.",
  },
  {
    n: "02",
    title: "People First",
    desc: "Every individual deserves personalized support, meaningful opportunities and a trusted partner throughout their journey.",
  },
  {
    n: "03",
    title: "Meaningful Opportunities",
    desc: "Creating opportunities that empower individuals to achieve personal growth, professional success and a brighter future.",
  },
  {
    n: "04",
    title: "Lasting Impact",
    desc: "True success is measured by the lasting impact we create through trusted partnerships and meaningful opportunities.",
  },
];

const jobs = [
  {
    title: "Support",
    desc: "Explore diverse opportunities across multiple growing industries today.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Barista",
    desc: "Craft quality beverages while creating memorable customer experiences.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Waitress",
    desc: "Deliver exceptional dining experiences with friendly professional service.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Receptionist",
    desc: "Welcome visitors while managing appointments professionally every day.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Salon Staff",
    desc: "Deliver premium beauty services with outstanding customer care.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cashier",
    desc: "Handle customer transactions accurately with friendly, attentive service.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sales Associate",
    desc: "Assist customers while achieving daily sales targets successfully.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lady Driver",
    desc: "Provide safe, reliable transportation with professional service.",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Housekeeping Staff",
    desc: "Maintain clean, comfortable and welcoming guest environments daily.",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cleaner",
    desc: "Ensure clean, organized and hygienic environments through quality cleaning services.",
    img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
  },
];

const discoverImages = [
  "https://static.wixstatic.com/media/360f24_6edc9b84666c4bab86b32ba41db6d388f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_6edc9b84666c4bab86b32ba41db6d388f003.jpg",
  "https://static.wixstatic.com/media/360f24_08c69a8bce7b4c459065b616570311c0f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_08c69a8bce7b4c459065b616570311c0f003.jpg",
  "https://static.wixstatic.com/media/360f24_c69c437ca25548abb4c76aafcc02a779f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_c69c437ca25548abb4c76aafcc02a779f003.jpg",
  "https://static.wixstatic.com/media/360f24_8c51356469e045dc945de69ed6f073d3f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_8c51356469e045dc945de69ed6f073d3f003.jpg",
  "https://static.wixstatic.com/media/360f24_29df9ba11dd24878bbc5366fb0bd24caf003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_29df9ba11dd24878bbc5366fb0bd24caf003.jpg",
  "https://static.wixstatic.com/media/360f24_809144177ed04068a9070a35b5e21868f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_809144177ed04068a9070a35b5e21868f003.jpg",
];

const team = [
  {
    name: "Bosshr",
    role: "Chief Executive Officer",
    phone: "971564232141",
    desc: "Leading BOSSHR through integrity, vision, professionalism and excellence.",
    img: "https://static.wixstatic.com/media/360f24_fe69f0b6cbcc46ea9fab37e554cf2048~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff01.png",
  },
  {
    name: "Pammy",
    role: "Recruitment Supervisor",
    phone: "971528042091",
    desc: "Leading recruitment operations with professionalism, dedication and compassion.",
    img: "https://static.wixstatic.com/media/360f24_f382a34aba584a3ba2ce87aef98f891b~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff04.png",
  },
  {
    name: "Maymay",
    role: "Recruitment Secretary",
    phone: "971562706579",
    desc: "Coordinating applicants efficiently through organized communication and support.",
    img: "https://static.wixstatic.com/media/360f24_635ac877e9c64c8294133066aa841531~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff05.png",
  },
  {
    name: "Luna",
    role: "Recruitment & HR Staff",
    phone: "971503467287",
    desc: "Supporting applicants through responsive guidance, care and professionalism.",
    img: "https://static.wixstatic.com/media/360f24_7c76e046a2df486299367d670622f2e9~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff07.png",
  },
  {
    name: "Sagittarius Queen",
    role: "Recruitment Specialist",
    phone: "971502381130",
    desc: "Connecting qualified professionals with trusted employment opportunities confidently.",
    img: "https://static.wixstatic.com/media/360f24_a9194e24c8534539b5e706e13324fa75~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff02.png",
  },
  {
    name: "Art William Laurente",
    role: "Accounting & Marketing",
    phone: "971557026719",
    desc: "Managing finances while strengthening marketing, branding and growth.",
    img: "https://static.wixstatic.com/media/360f24_f17aac9a02b944caae523dc349642a85~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff03.png",
  },
  {
    name: "Junnard GD",
    role: "Office Coordinator",
    phone: "971569265605",
    desc: "Coordinates daily office operations, administrative functions and internal support.",
    img: "https://static.wixstatic.com/media/360f24_890c609ef76544f095f504edd6052b58~mv2.png/v1/fill/w_600,h_780,fp_0.50_0.50,q_85,enc_avif,quality_auto/staff06.png",
  },
];

const testimonials = [
  {
    name: "Kristine Joy Mendoza",
    quote:
      "BOSSHR exceeded my expectations. Their professionalism and dedication gave me confidence every step of the way.",
  },
  {
    name: "Carlo Miguel Bautista",
    quote:
      "Excellent service from a trustworthy team. They truly care about helping people and made the experience enjoyable and hassle-free.",
  },
  {
    name: "Maria Santos",
    quote:
      "The team was incredibly helpful and professional. They guided me with patience and made the entire process simple and stress-free.",
  },
  {
    name: "John Michael Reyes",
    quote:
      "I appreciated their honest advice and quick responses. They made me feel confident from my first inquiry until the very end.",
  },
  {
    name: "Angela Mae Cruz",
    quote:
      "Professional, approachable and genuinely supportive. BOSSHR made my journey smooth, and I'm thankful for all their guidance.",
  },
  {
    name: "Mark Anthony Dela Cruz",
    quote:
      "Everything was well organized and clearly explained. The team was friendly, responsive and always willing to help.",
  },
  {
    name: "Emma Wilson",
    quote:
      "I felt supported throughout the process. The staff were kind, transparent and always ready to answer my questions.",
  },
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
  const reduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllTeam, setShowAllTeam] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timer = window.setTimeout(scrollToTop, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-[#06152f] via-[#0b3974] to-[#06152f] text-white shadow-lg">
        <div className="container-x flex h-20 items-center justify-between">
          <a
            href="#top"
            aria-label="BOSSHR Team Consultancy home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={logoImg}
              width={1536}
              height={1024}
              alt="BOSSHR Team Consultancy"
              className="h-16 w-auto object-contain"
            />
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-x-0 bottom-0 top-20 z-40 cursor-default bg-black/55 backdrop-blur-[2px] md:hidden"
              />
              <motion.nav
                id="mobile-navigation"
                initial={reduceMotion ? false : { x: "100%" }}
                animate={{ x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-0 right-0 top-20 z-50 w-[85vw] max-w-sm overflow-y-auto border-l border-white/10 bg-gradient-to-b from-[#0b3974] to-[#06152f] px-6 pb-8 pt-5 shadow-2xl md:hidden"
              >
                <div className="flex flex-col">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Navigation
                  </p>
                  {nav.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-12 items-center border-b border-white/10 text-base font-medium text-white/85 transition-colors hover:text-white"
                    >
                      {n.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground"
                  >
                    Get in touch <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden border-b border-border/60">
        <div className="relative bg-primary">
          <motion.img
            src={heroImg}
            width={1536}
            height={1024}
            alt="BOSSHR Team Consultancy office overlooking the Dubai skyline"
            fetchPriority="high"
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="block h-auto w-full origin-center transform-gpu"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/15 to-transparent lg:block" />
          <div className="bg-neutral-950 py-14 lg:absolute lg:inset-0 lg:flex lg:items-center lg:bg-transparent lg:py-0">
            <div className="container-x">
              <motion.div
                className="flex max-w-2xl flex-col items-start text-left text-primary-foreground lg:max-w-[52%]"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary/40 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground/80 uppercase backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> BOSSHR Team Consultancy FZC
                  · Ajman, UAE
                </span>
                <h1 className="mt-6 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-7xl">
                  A bridge to <em className="italic text-gold">better</em> opportunities.
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
                  Trusted career guidance, employment consultancy and professional HR support —
                  helping individuals and businesses achieve their goals with confidence.
                </p>
                <div className="mt-8 flex flex-wrap justify-start gap-3">
                  <a
                    href="#services"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Our services <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20"
                  >
                    About us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="border-t border-border/60 bg-secondary/40">
          <div className="container-x grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8">
                <div className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Our Services
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium md:text-5xl">
                Solutions that create lasting impact.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              From career guidance to full HR support, every service is built around trust, clarity
              and outcomes.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.45 }}
                className="group relative bg-card p-8 transition-colors hover:bg-secondary/60"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH & DISCOVER */}
      <section
        id="discover"
        className="overflow-hidden border-b border-border bg-secondary/40 py-24"
      >
        <div className="container-x">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Watch &amp; Discover
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
              See BOSSHR in action.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Explore how BOSSHR Team Consultancy FZC is helping individuals build successful
              careers through trusted guidance, meaningful opportunities, and real success stories.
            </p>
          </Reveal>

          <div className="relative mt-14 overflow-hidden" aria-label="BOSSHR team success stories">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-secondary/90 to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-secondary/90 to-transparent md:w-24" />
            <motion.div
              className="flex w-max gap-4"
              animate={reduceMotion ? undefined : { x: ["0%", "calc(-50% - 0.5rem)"] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 30, ease: "linear", repeat: Number.POSITIVE_INFINITY }
              }
            >
              {[...discoverImages, ...discoverImages].map((src, index) => (
                <motion.figure
                  key={`${src}-${index}`}
                  aria-hidden={index >= discoverImages.length}
                  className="group w-[72vw] shrink-0 overflow-hidden rounded-2xl bg-primary sm:w-80 md:w-96"
                >
                  <motion.img
                    src={src}
                    alt={
                      index < discoverImages.length ? `BOSSHR team success story ${index + 1}` : ""
                    }
                    loading="lazy"
                    width={900}
                    height={1200}
                    whileHover={reduceMotion ? undefined : { scale: 1.045 }}
                    transition={{ duration: 0.4 }}
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="bg-primary py-24 text-primary-foreground">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why BOSSHR</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium md:text-5xl">
            A consultancy built on trust.
          </h2>
          <p className="mt-4 max-w-2xl text-primary-foreground/70">
            Helping individuals build brighter futures through trusted guidance, meaningful
            opportunities and genuine support.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.n}
                className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-8 backdrop-blur"
              >
                <div className="font-display text-3xl text-gold">{v.n}</div>
                <h3 className="mt-4 font-display text-xl font-medium text-primary-foreground">
                  {v.title}
                </h3>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Career Listings
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium md:text-5xl">
                Explore opportunities with BOSSHR.
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Discover career opportunities across various industries. Find a role that matches
                your skills, experience and professional goals.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              aria-expanded={showAllJobs}
              aria-controls="career-list"
              onClick={() => setShowAllJobs((show) => !show)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-gold hover:bg-secondary"
            >
              {showAllJobs ? "Show less" : "Show all opportunities"}
              <ArrowUpRight
                className={`h-4 w-4 transition-transform ${showAllJobs ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div
            id="career-list"
            className={showAllJobs ? "mt-8" : "relative mt-8 overflow-hidden pb-6"}
          >
            {!showAllJobs && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background to-transparent md:w-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background to-transparent md:w-20" />
              </>
            )}
            <motion.div
              layout
              className={
                showAllJobs ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "flex w-max gap-4"
              }
              animate={
                !showAllJobs && !reduceMotion ? { x: ["0%", "calc(-50% - 0.5rem)"] } : { x: 0 }
              }
              transition={
                !showAllJobs && !reduceMotion
                  ? { duration: 55, ease: "linear", repeat: Number.POSITIVE_INFINITY }
                  : { duration: 0.3 }
              }
            >
              {(showAllJobs ? jobs : [...jobs, ...jobs]).map((j, index) => {
                const isDuplicate = !showAllJobs && index >= jobs.length;

                return (
                  <motion.article
                    key={`${j.title}-${showAllJobs ? "grid" : index}`}
                    aria-hidden={isDuplicate || undefined}
                    layout
                    initial={showAllJobs && !reduceMotion ? { opacity: 0, x: 48 } : false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    transition={{
                      duration: 0.45,
                      delay: showAllJobs && !reduceMotion ? (index % jobs.length) * 0.05 : 0,
                    }}
                    className={`group relative min-h-80 overflow-hidden rounded-2xl border border-border bg-primary p-6 text-primary-foreground transition-colors hover:border-gold hover:shadow-lg ${
                      showAllJobs ? "min-w-0" : "w-[85vw] max-w-sm shrink-0 snap-start"
                    }`}
                  >
                    <img
                      src={j.img}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/25" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-xs font-medium text-gold-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-foreground" /> Now
                          Hiring
                        </span>
                      </div>
                      <div className="mt-auto pt-12">
                        <h3 className="font-display text-3xl font-medium">{j.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                          {j.desc}
                        </p>
                        <a
                          href="#contact"
                          tabIndex={isDuplicate ? -1 : undefined}
                          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors hover:text-white"
                        >
                          Apply today <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
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
              BOSSHR Team Consultancy FZC is committed to helping individuals move forward through
              trusted guidance, meaningful opportunities and professional support. We believe every
              journey deserves the right direction — and a stronger future.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Team</p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
            Meet the people behind BOSSHR.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Dedicated professionals committed to guiding, supporting and creating meaningful
            opportunities for every client.
          </p>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              aria-expanded={showAllTeam}
              aria-controls="team-list"
              onClick={() => setShowAllTeam((show) => !show)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-gold hover:bg-secondary"
            >
              {showAllTeam ? "Show less" : "Show all team members"}
              <ArrowUpRight
                className={`h-4 w-4 transition-transform ${showAllTeam ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <div
            id="team-list"
            className={showAllTeam ? "mt-8" : "relative mt-8 overflow-hidden pb-6"}
          >
            {!showAllTeam && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background to-transparent md:w-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background to-transparent md:w-20" />
              </>
            )}
            <motion.div
              layout
              className={
                showAllTeam
                  ? "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "flex w-max gap-6"
              }
              animate={
                !showAllTeam && !reduceMotion ? { x: ["0%", "calc(-50% - 0.75rem)"] } : { x: 0 }
              }
              transition={
                !showAllTeam && !reduceMotion
                  ? { duration: 45, ease: "linear", repeat: Number.POSITIVE_INFINITY }
                  : { duration: 0.3 }
              }
            >
              {(showAllTeam ? team : [...team, ...team]).map((m, index) => {
                const isDuplicate = !showAllTeam && index >= team.length;

                return (
                  <motion.a
                    key={`${m.name}-${showAllTeam ? "grid" : index}`}
                    href={`https://wa.me/${m.phone}?text=${encodeURIComponent(`Hello ${m.name}, I found you through the BOSSHR website and would like to enquire.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Message ${m.name} on WhatsApp`}
                    aria-hidden={isDuplicate || undefined}
                    tabIndex={isDuplicate ? -1 : undefined}
                    layout
                    initial={showAllTeam && !reduceMotion ? { opacity: 0, x: 32 } : false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: showAllTeam && !reduceMotion ? (index % team.length) * 0.06 : 0,
                    }}
                    className={
                      showAllTeam ? "group min-w-0" : "group w-[78vw] max-w-72 shrink-0 snap-start"
                    }
                  >
                    <div className="overflow-hidden rounded-2xl bg-secondary">
                      <img
                        src={m.img}
                        alt={m.name}
                        loading="lazy"
                        className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-medium">{m.name}</h3>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="text-sm text-gold-foreground/80">{m.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                    <p className="mt-3 text-xs font-medium text-primary">Message on WhatsApp</p>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/40 py-24">
        <div className="container-x">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Client Testimonials
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
            Trusted by professionals.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Why individuals trust BOSSHR Team Consultancy FZC to guide their career journey.
          </p>

          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="mb-6 break-inside-avoid rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <img
          src={ctaBg}
          alt=""
          aria-hidden
          loading="lazy"
          width={1600}
          height={600}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="container-x relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Ready to Take the Next Step?
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium text-primary-foreground md:text-6xl">
            Your next opportunity starts today.
          </h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">
            Let BOSSHR Consultancy help you build a brighter future.
          </p>
          <a
            href="https://wa.me/971502381130"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5"
          >
            Message us on WhatsApp <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Let's talk.</h2>
            <p className="mt-4 text-muted-foreground">
              Send us a message through WhatsApp or email — we usually respond within one business
              day.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/971502381130"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp +971 50 238 1130
              </a>
              <a
                href="mailto:bosshrteamcc18@gmail.com"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold"
              >
                <Mail className="h-4 w-4 text-gold" /> Email us
              </a>
            </div>

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
                    <a
                      href={
                        c.label === "Main"
                          ? "https://wa.me/971502381130"
                          : `tel:${c.number.replace(/\s/g, "")}`
                      }
                      target={c.label === "Main" ? "_blank" : undefined}
                      rel={c.label === "Main" ? "noreferrer" : undefined}
                      className="font-medium tabular-nums hover:text-gold-foreground"
                    >
                      {c.number}
                      {c.label === "Main" && " · WhatsApp"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal className="md:col-span-7">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Direct messaging
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Choose how you'd like to reach us.
              </h3>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Start a WhatsApp conversation for a quick response, or send your enquiry directly to
                our main email inbox.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <a
                  href="https://wa.me/971502381130"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-52 flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground transition-transform hover:-translate-y-1"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-foreground/10">
                    <MessageCircle className="h-6 w-6 text-gold" />
                  </span>
                  <span className="mt-8">
                    <span className="block font-display text-2xl font-medium">WhatsApp</span>
                    <span className="mt-2 block text-sm text-primary-foreground/70">
                      +971 50 238 1130
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                      Open WhatsApp <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </a>

                <a
                  href="mailto:bosshrteamcc18@gmail.com"
                  className="group flex min-h-52 flex-col justify-between rounded-2xl border border-border bg-secondary/50 p-6 transition-all hover:-translate-y-1 hover:border-gold"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15">
                    <Mail className="h-6 w-6 text-gold-foreground" />
                  </span>
                  <span className="mt-8">
                    <span className="block font-display text-2xl font-medium">Email</span>
                    <span className="mt-2 block break-all text-sm text-muted-foreground">
                      bosshrteamcc18@gmail.com
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-foreground">
                      Open email app <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="container-x grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={logoImg}
              width={1536}
              height={1024}
              alt="BOSSHR Team Consultancy"
              loading="lazy"
              className="h-28 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
              Trusted career guidance, recruitment and HR consultancy across the UAE.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-medium text-primary-foreground">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-medium text-primary-foreground">
              Stay in the know
            </h4>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Be among the first to hear about latest news, tips, events and special offers.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-gold"
              />
              <button className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground">
                Sign up
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="container-x flex flex-col justify-between gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row">
            <span>© 2026 BOSSHR Team Consultancy · Ajman, UAE · +971 50 238 1130</span>
            <a
              href="https://makoyportfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
            >
              Redesigned by Makoy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
