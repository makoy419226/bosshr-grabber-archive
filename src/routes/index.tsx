import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-bosshr.jpeg";
import logoImg from "@/assets/bosshr-logo.png";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent as ReactWheelEvent,
} from "react";
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
  Globe2,
  Maximize2,
  Menu,
  LockKeyhole,
  Play,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const stats = [
  { value: "UAE", label: "Licensed and based in the UAE" },
  { value: "Global", label: "Serving people wherever they are" },
  { value: "All", label: "Nationalities are welcome" },
  { value: "100%", label: "Client-focused and results-driven" },
];

const services = [
  {
    icon: Users,
    title: "Human Resources Consultancy",
    desc: "Practical people strategies and HR support built around your organization.",
  },
  {
    icon: Briefcase,
    title: "Tourism & Leisure Consulting",
    desc: "Business support for organizations operating across tourism and leisure.",
  },
  {
    icon: GraduationCap,
    title: "Marketing Management",
    desc: "Focused marketing direction that supports visibility, growth and results.",
  },
  {
    icon: UserCheck,
    title: "Commercial Brokers",
    desc: "Professional commercial connections guided by integrity and transparency.",
  },
  {
    icon: Building2,
    title: "Facility Management",
    desc: "Coordinated facility solutions designed for efficient daily operations.",
  },
  {
    icon: Star,
    title: "Hospitality Services",
    desc: "People-first hospitality support focused on service quality and experience.",
  },
  {
    icon: Building2,
    title: "E-Commerce",
    desc: "Business guidance for brands and organizations growing through digital commerce.",
  },
  {
    icon: ClipboardList,
    title: "Organization & Event Management",
    desc: "Structured planning and coordination for organizations and professional events.",
  },
  {
    icon: FileText,
    title: "Document & Office Support",
    desc: "Photocopying, document preparation and specialized office support activities.",
  },
  {
    icon: Compass,
    title: "Lifestyle Development Consultancy",
    desc: "Purposeful guidance that supports personal development and better outcomes.",
  },
];

const values = [
  {
    n: "01",
    title: "Trusted Employers",
    desc: "Connected with legal, trusted companies and recruitment agencies across the UAE.",
  },
  {
    n: "02",
    title: "Legitimate Opportunities",
    desc: "Professional recruitment assistance focused on legitimate employment opportunities.",
  },
  {
    n: "03",
    title: "Open to Everyone",
    desc: "Opportunities are open to all nationalities, wherever you are in your journey.",
  },
  {
    n: "04",
    title: "Your Future, Our Priority",
    desc: "Client-focused, results-driven support delivered with integrity and transparency.",
  },
];

const jobs = [
  {
    title: "Housekeeping",
    desc: "Opportunities across hospitals, hotels and salons.",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
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
    title: "Sales Lady",
    desc: "Assist customers and support daily retail sales goals.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Salon Hairdresser",
    desc: "Provide professional hair and salon services.",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cashier",
    desc: "Handle customer transactions accurately with friendly, attentive service.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Manicurist / Pedicurist",
    desc: "Deliver careful, high-quality nail care services.",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lady Driver",
    desc: "Provide safe, reliable transportation with professional service.",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Florist",
    desc: "Create floral arrangements and provide attentive customer service.",
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Clearance / Establishment Staff",
    desc: "Support establishment, clearance and administrative processes.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Secretary",
    desc: "Coordinate schedules, communication and daily office administration.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Housemaid",
    desc: "Provide dependable household cleaning and daily home support.",
    img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Nanny",
    desc: "Provide responsible, attentive support for children and families.",
    img: "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tutor / Nanny",
    desc: "Combine learning support with attentive childcare.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cook",
    desc: "Prepare quality meals while maintaining a clean, safe kitchen.",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80",
  },
];

type DiscoverMedia = {
  id: string;
  src: string;
  title: string;
  alt?: string;
  thumbnail?: string;
};

const discoverMedia: DiscoverMedia[] = [
  {
    id: "story-1",
    src: "https://static.wixstatic.com/media/360f24_6edc9b84666c4bab86b32ba41db6d388f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_6edc9b84666c4bab86b32ba41db6d388f003.jpg",
    title: "BOSSHR success story 1",
    alt: "BOSSHR team success story 1",
  },
  {
    id: "story-2",
    src: "https://static.wixstatic.com/media/360f24_08c69a8bce7b4c459065b616570311c0f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_08c69a8bce7b4c459065b616570311c0f003.jpg",
    title: "BOSSHR success story 2",
    alt: "BOSSHR team success story 2",
  },
  {
    id: "story-3",
    src: "https://static.wixstatic.com/media/360f24_c69c437ca25548abb4c76aafcc02a779f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_c69c437ca25548abb4c76aafcc02a779f003.jpg",
    title: "BOSSHR success story 3",
    alt: "BOSSHR team success story 3",
  },
  {
    id: "story-4",
    src: "https://static.wixstatic.com/media/360f24_8c51356469e045dc945de69ed6f073d3f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_8c51356469e045dc945de69ed6f073d3f003.jpg",
    title: "BOSSHR success story 4",
    alt: "BOSSHR team success story 4",
  },
  {
    id: "story-5",
    src: "https://static.wixstatic.com/media/360f24_29df9ba11dd24878bbc5366fb0bd24caf003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_29df9ba11dd24878bbc5366fb0bd24caf003.jpg",
    title: "BOSSHR success story 5",
    alt: "BOSSHR team success story 5",
  },
  {
    id: "story-6",
    src: "https://static.wixstatic.com/media/360f24_809144177ed04068a9070a35b5e21868f003.jpg/v1/fill/w_900,h_1200,q_85,enc_avif,quality_auto/360f24_809144177ed04068a9070a35b5e21868f003.jpg",
    title: "BOSSHR success story 6",
    alt: "BOSSHR team success story 6",
  },
];

const discoverLoopMedia = [...discoverMedia, ...discoverMedia];

function getGoogleDrivePreviewUrl(source: string) {
  try {
    const url = new URL(source);
    if (url.hostname.replace(/^www\./, "") !== "drive.google.com") return null;

    const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? url.searchParams.get("id");
    if (!fileId) return null;

    return `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`;
  } catch {
    return null;
  }
}

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

const contactPages = [
  {
    label: "YouTube",
    value: "@BossHr2026",
    href: "https://www.youtube.com/@BossHr2026",
    logoSrc: "https://cdn.simpleicons.org/youtube/FF0000",
  },
  {
    label: "Facebook",
    value: "",
    href: "",
    logoSrc: "https://cdn.simpleicons.org/facebook/1877F2",
  },
  { label: "Website", value: "", href: "", logoSrc: "" },
  {
    label: "TikTok",
    value: "@bosshr18",
    href: "https://www.tiktok.com/@bosshr18",
    logoSrc: "https://cdn.simpleicons.org/tiktok/000000",
  },
  {
    label: "WhatsApp",
    value: "+971 50 238 1130",
    href: "https://wa.me/971502381130",
    logoSrc: "https://cdn.simpleicons.org/whatsapp/25D366",
  },
  {
    label: "Gmail",
    value: "bosshrteamcc18@gmail.com",
    href: "mailto:bosshrteamcc18@gmail.com",
    logoSrc: "https://cdn.simpleicons.org/gmail/EA4335",
  },
];

const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#careers", label: "Careers" },
  { href: "/posts", label: "Updates" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

const MARQUEE_IDLE_DELAY = 5_000;

function useInteractiveMarquee(
  interactive: boolean,
  autoplay: boolean,
  secondsPerLoop: number,
  gapPixels: number,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const focusWithinRef = useRef(false);
  const suppressClickUntilRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    didDrag: false,
  });

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const pauseUntilIdle = useCallback(() => {
    if (!interactive) return;

    pausedRef.current = true;
    lastFrameRef.current = null;
    clearResumeTimer();
    if (!autoplay) return;

    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
      lastFrameRef.current = null;
      resumeTimerRef.current = null;
    }, MARQUEE_IDLE_DELAY);
  }, [autoplay, clearResumeTimer, interactive]);

  const getCycleWidth = useCallback(
    (viewport: HTMLDivElement) => (viewport.scrollWidth + gapPixels) / 2,
    [gapPixels],
  );

  useEffect(() => {
    clearResumeTimer();
    lastFrameRef.current = null;
    pausedRef.current = !autoplay;

    if (!interactive || !autoplay) return;

    const animate = (timestamp: number) => {
      const viewport = viewportRef.current;

      if (
        viewport &&
        !pausedRef.current &&
        !dragRef.current.active &&
        !focusWithinRef.current &&
        !document.hidden
      ) {
        if (lastFrameRef.current !== null) {
          const elapsed = Math.min(timestamp - lastFrameRef.current, 50) / 1_000;
          const cycleWidth = getCycleWidth(viewport);
          viewport.scrollLeft += (cycleWidth / secondsPerLoop) * elapsed;

          if (cycleWidth > 0 && viewport.scrollLeft >= cycleWidth) {
            viewport.scrollLeft -= cycleWidth;
          }
        }

        lastFrameRef.current = timestamp;
      } else {
        lastFrameRef.current = null;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      clearResumeTimer();
      dragRef.current.active = false;
    };
  }, [autoplay, clearResumeTimer, getCycleWidth, interactive, secondsPerLoop]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!interactive || (event.pointerType === "mouse" && event.button !== 0)) return;

      // Let touchscreens use the browser's native, momentum-based horizontal scrolling.
      // The custom drag implementation is reserved for mouse and pen input so it does
      // not compete with vertical page scrolling on mobile.
      if (event.pointerType === "touch") {
        pauseUntilIdle();
        return;
      }

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollLeft: event.currentTarget.scrollLeft,
        didDrag: false,
      };
      pauseUntilIdle();
    },
    [interactive, pauseUntilIdle],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!interactive) return;

      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) {
        if (event.pointerType === "mouse" && (event.movementX !== 0 || event.movementY !== 0)) {
          pauseUntilIdle();
        }
        return;
      }

      const distance = event.clientX - drag.startX;
      if (!drag.didDrag && Math.abs(distance) > 4) {
        drag.didDrag = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      if (drag.didDrag) {
        event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
        event.preventDefault();
      }
    },
    [interactive, pauseUntilIdle],
  );

  const finishPointerInteraction = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      drag.active = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      pauseUntilIdle();

      if (drag.didDrag) {
        suppressClickUntilRef.current = performance.now() + 250;
        drag.didDrag = false;
      }
    },
    [pauseUntilIdle],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      dragRef.current.active = false;
      dragRef.current.didDrag = false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      pauseUntilIdle();
    },
    [pauseUntilIdle],
  );

  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (performance.now() >= suppressClickUntilRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClickUntilRef.current = 0;
  }, []);

  const onWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      if (!interactive) return;

      const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      if (!horizontalIntent) return;

      pauseUntilIdle();
      if (event.shiftKey && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.currentTarget.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    },
    [interactive, pauseUntilIdle],
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!interactive || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;

      pauseUntilIdle();
    },
    [interactive, pauseUntilIdle],
  );

  const onScroll = useCallback(() => {
    if (interactive && pausedRef.current) pauseUntilIdle();
  }, [interactive, pauseUntilIdle]);

  const onFocusCapture = useCallback(
    (event: ReactFocusEvent<HTMLDivElement>) => {
      if (!interactive) return;

      const focusedElement = event.target as HTMLElement;
      if (!focusedElement.matches(":focus-visible")) {
        pauseUntilIdle();
        return;
      }

      focusWithinRef.current = true;
      pausedRef.current = true;
      lastFrameRef.current = null;
      clearResumeTimer();
    },
    [clearResumeTimer, interactive, pauseUntilIdle],
  );

  const onBlurCapture = useCallback(
    (event: ReactFocusEvent<HTMLDivElement>) => {
      if (!focusWithinRef.current) return;
      if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget as Node)) return;

      focusWithinRef.current = false;
      pauseUntilIdle();
    },
    [pauseUntilIdle],
  );

  return {
    viewportRef,
    onPointerDown,
    onPointerMove,
    onPointerUp: finishPointerInteraction,
    onPointerCancel,
    onClickCapture,
    onWheel,
    onKeyDown,
    onScroll,
    onFocusCapture,
    onBlurCapture,
  };
}

function Index() {
  const reduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [selectedDiscoverMedia, setSelectedDiscoverMedia] = useState<DiscoverMedia | null>(null);
  const discoverMarquee = useInteractiveMarquee(true, !reduceMotion, 30, 16);
  const careerMarquee = useInteractiveMarquee(!showAllJobs, !showAllJobs && !reduceMotion, 55, 16);
  const teamMarquee = useInteractiveMarquee(!showAllTeam, !showAllTeam && !reduceMotion, 45, 24);
  const testimonialMarquee = useInteractiveMarquee(
    !showAllTestimonials,
    !showAllTestimonials && !reduceMotion,
    55,
    24,
  );
  const selectedDiscoverVideoUrl = selectedDiscoverMedia
    ? getGoogleDrivePreviewUrl(selectedDiscoverMedia.src)
    : null;

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
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-4 py-2 text-sm font-medium text-gold-foreground shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

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
          <nav aria-label="Primary navigation" className="hidden gap-8 lg:flex">
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
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="/admin/login"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm font-medium text-white transition-colors hover:border-white/45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <LockKeyhole className="h-4 w-4" aria-hidden="true" /> Admin Login
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gold px-4 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
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
                className="fixed inset-x-0 bottom-0 top-20 z-40 cursor-default bg-black/55 backdrop-blur-[2px] lg:hidden"
              />
              <motion.nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                initial={reduceMotion ? false : { x: "100%" }}
                animate={{ x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-0 right-0 top-20 z-50 w-[85vw] max-w-sm overflow-y-auto border-l border-white/10 bg-gradient-to-b from-[#0b3974] to-[#06152f] px-6 pb-8 pt-5 shadow-2xl lg:hidden"
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
                  <a
                    href="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <LockKeyhole className="h-4 w-4" aria-hidden="true" /> Admin Login
                  </a>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section id="top" className="relative overflow-hidden border-b border-border/60">
          <div className="relative min-h-[calc(100svh-5rem)] bg-primary sm:min-h-[680px] lg:min-h-[760px]">
            <motion.img
              src={heroImg}
              width={1536}
              height={1024}
              alt="BOSSHR Team Consultancy office in Dubai"
              fetchPriority="high"
              initial={reduceMotion ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full origin-center object-cover object-center transform-gpu"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/5 lg:bg-gradient-to-r lg:from-black/65 lg:via-black/20 lg:to-transparent" />
            <div className="absolute inset-0 flex items-end py-10 sm:py-14 lg:items-center lg:py-0">
              <div className="container-x">
                <motion.div
                  className="flex max-w-2xl flex-col items-start text-left text-primary-foreground lg:max-w-[52%]"
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary/40 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground/80 uppercase backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Open to all nationalities
                    · Dubai, UAE
                  </span>
                  <h1 className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight sm:mt-6 sm:text-5xl lg:text-7xl">
                    Your bridge to <em className="italic text-gold">new opportunities</em> in Dubai.
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:mt-6 lg:text-lg">
                    We connect talent with legitimate employment opportunities and help businesses
                    grow through people, strategy and practical solutions.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-start gap-3 sm:mt-8">
                    <a
                      href="#careers"
                      className="inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:-translate-y-0.5"
                    >
                      View positions <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-6 py-3 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20"
                    >
                      Our services
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

        {/* ABOUT */}
        <section
          id="about"
          className="scroll-mt-20 border-b border-border bg-secondary/40 py-16 sm:py-20 lg:py-24"
        >
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">About Us</p>
              <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-medium leading-tight sm:text-5xl">
                We build bridges from people to opportunities.
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7">
              <div className="max-w-2xl space-y-5 font-sans text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                <p>
                  BOSSHR Team Consultancy FZC is a legitimate, UAE-based consultancy connecting
                  people with trusted employers and helping organizations grow with the right people
                  and strategies.
                </p>
                <p>
                  We serve all nationalities, wherever they are, with professional recruitment
                  assistance and access to legitimate employment opportunities in the UAE. Our work
                  is guided by integrity, transparency and compliance with UAE laws and regulations.
                </p>
              </div>

              <div className="mt-8 border-l-2 border-gold pl-5 sm:pl-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-foreground">
                  Our purpose
                </p>
                <p className="mt-2 max-w-xl font-sans text-base font-medium leading-7 text-foreground">
                  Bridging people to opportunities and building futures together.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="container-x">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Services
                </p>
                <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium md:text-5xl">
                  People, strategy and solutions for growth.
                </h2>
              </div>
              <p className="max-w-md text-muted-foreground">
                Professional consultancy and business support delivered with integrity, transparency
                and a focus on results.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
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

        {/* WHY */}
        <section
          id="why"
          className="scroll-mt-20 bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24"
        >
          <div className="container-x">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why BOSSHR</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium md:text-5xl">
              Why choose BOSSHR Team Consultancy?
            </h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/70">
              Licensed, trusted and professionally committed to connecting talent with the right
              opportunities across the UAE.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.n}
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-8 backdrop-blur"
                >
                  <div className="font-display text-3xl text-gold">{v.n}</div>
                  <h3 className="mt-4 font-display text-xl font-medium text-primary-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WATCH & DISCOVER */}
        <section
          id="discover"
          className="scroll-mt-20 overflow-hidden border-b border-border bg-secondary/40 py-16 sm:py-20 lg:py-24"
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
                careers through trusted guidance, meaningful opportunities, and real success
                stories.
              </p>
            </Reveal>

            <div
              className="relative mt-12 overflow-hidden lg:mt-14"
              aria-label="BOSSHR team success stories"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-secondary/90 to-transparent md:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-secondary/90 to-transparent md:w-24" />
              <div
                ref={discoverMarquee.viewportRef}
                role="region"
                aria-label="BOSSHR success stories carousel. Swipe, drag or scroll horizontally."
                tabIndex={0}
                onPointerDown={discoverMarquee.onPointerDown}
                onPointerMove={discoverMarquee.onPointerMove}
                onPointerUp={discoverMarquee.onPointerUp}
                onPointerCancel={discoverMarquee.onPointerCancel}
                onClickCapture={discoverMarquee.onClickCapture}
                onWheel={discoverMarquee.onWheel}
                onKeyDown={discoverMarquee.onKeyDown}
                onScroll={discoverMarquee.onScroll}
                onFocusCapture={discoverMarquee.onFocusCapture}
                onBlurCapture={discoverMarquee.onBlurCapture}
                className="cursor-grab touch-auto overflow-x-auto overscroll-x-contain select-none [-webkit-overflow-scrolling:touch] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold focus-visible:outline-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex w-max gap-4">
                  {discoverLoopMedia.map((media, index) => {
                    const isDuplicate = index >= discoverMedia.length;
                    const isGoogleDriveVideo = Boolean(getGoogleDrivePreviewUrl(media.src));

                    return (
                      <motion.button
                        key={`${media.id}-${index}`}
                        type="button"
                        aria-label={
                          isGoogleDriveVideo ? `Play ${media.title}` : `Expand ${media.title}`
                        }
                        aria-hidden={isDuplicate || undefined}
                        tabIndex={isDuplicate ? -1 : 0}
                        onClick={() => setSelectedDiscoverMedia(media)}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        className="group relative w-[72vw] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-primary text-left focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none sm:w-80 md:w-96"
                      >
                        {isGoogleDriveVideo ? (
                          media.thumbnail ? (
                            <motion.img
                              src={media.thumbnail}
                              alt=""
                              aria-hidden="true"
                              draggable="false"
                              loading="lazy"
                              width={900}
                              height={1200}
                              whileHover={reduceMotion ? undefined : { scale: 1.045 }}
                              transition={{ duration: 0.4 }}
                              className="aspect-[4/5] h-full w-full object-cover"
                            />
                          ) : (
                            <span className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary via-[#0b3974] to-primary px-6 text-center text-primary-foreground">
                              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-gold-foreground shadow-lg">
                                <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
                              </span>
                              <span className="font-display text-2xl font-medium">
                                {media.title}
                              </span>
                            </span>
                          )
                        ) : (
                          <motion.img
                            src={media.src}
                            alt={isDuplicate ? "" : (media.alt ?? media.title)}
                            draggable="false"
                            loading="lazy"
                            width={900}
                            height={1200}
                            whileHover={reduceMotion ? undefined : { scale: 1.045 }}
                            transition={{ duration: 0.4 }}
                            className="aspect-[4/5] h-full w-full object-cover"
                          />
                        )}

                        <span className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/35 via-transparent to-transparent p-4 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white backdrop-blur-sm">
                            {isGoogleDriveVideo ? (
                              <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                            ) : (
                              <Maximize2 className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Dialog
          open={selectedDiscoverMedia !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedDiscoverMedia(null);
          }}
        >
          <DialogContent className="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-6xl gap-0 overflow-hidden border-white/15 bg-neutral-950 p-0 text-white shadow-2xl sm:rounded-2xl [&>button]:right-2 [&>button]:top-2 [&>button]:z-20 [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-black/75 [&>button]:text-white [&>button]:opacity-100 [&>button]:ring-offset-black">
            <DialogTitle className="sr-only">
              {selectedDiscoverMedia?.title ?? "BOSSHR Watch and Discover media"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {selectedDiscoverVideoUrl
                ? "Google Drive video player"
                : "Expanded BOSSHR success story image"}
            </DialogDescription>

            {selectedDiscoverMedia &&
              (selectedDiscoverVideoUrl ? (
                <div className="flex min-h-52 w-full items-center justify-center bg-black">
                  <iframe
                    key={selectedDiscoverVideoUrl}
                    src={selectedDiscoverVideoUrl}
                    title={selectedDiscoverMedia.title}
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="aspect-video max-h-[calc(100dvh-1rem)] w-full border-0"
                  />
                </div>
              ) : (
                <div className="flex max-h-[calc(100dvh-1rem)] min-h-0 w-full items-center justify-center overflow-hidden bg-black p-2 sm:p-4">
                  <img
                    src={selectedDiscoverMedia.src}
                    alt={selectedDiscoverMedia.alt ?? selectedDiscoverMedia.title}
                    className="max-h-[calc(100dvh-3rem)] max-w-full object-contain"
                  />
                </div>
              ))}
          </DialogContent>
        </Dialog>

        {/* CAREERS */}
        <section
          id="careers"
          className="scroll-mt-20 border-b border-border py-16 sm:py-20 lg:py-24"
        >
          <div className="container-x">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Available Positions
                </p>
                <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium md:text-5xl">
                  Free job opportunities in the UAE.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Open to all nationalities, wherever you are. Applicants inside the UAE can attend
                  a free walk-in interview—bring an updated CV or résumé.
                </p>
              </div>
              <button
                type="button"
                aria-expanded={showAllJobs}
                aria-controls="career-list"
                onClick={() => setShowAllJobs((show) => !show)}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-gold hover:bg-secondary md:self-auto"
              >
                {showAllJobs ? "Show less" : "Show all opportunities"}
                <ArrowUpRight
                  className={`h-4 w-4 transition-transform ${showAllJobs ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div
              id="career-list"
              className={showAllJobs ? "mt-10" : "relative mt-10 overflow-hidden pb-6"}
            >
              {!showAllJobs && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background to-transparent md:w-20" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background to-transparent md:w-20" />
                </>
              )}
              <div
                ref={careerMarquee.viewportRef}
                role="region"
                aria-label="Career listings carousel. Swipe, drag or scroll horizontally."
                tabIndex={showAllJobs ? -1 : 0}
                onPointerDown={careerMarquee.onPointerDown}
                onPointerMove={careerMarquee.onPointerMove}
                onPointerUp={careerMarquee.onPointerUp}
                onPointerCancel={careerMarquee.onPointerCancel}
                onClickCapture={careerMarquee.onClickCapture}
                onWheel={careerMarquee.onWheel}
                onKeyDown={careerMarquee.onKeyDown}
                onScroll={careerMarquee.onScroll}
                onFocusCapture={careerMarquee.onFocusCapture}
                onBlurCapture={careerMarquee.onBlurCapture}
                className={
                  showAllJobs
                    ? "overflow-visible"
                    : "cursor-grab touch-auto overflow-x-auto overscroll-x-contain select-none [-webkit-overflow-scrolling:touch] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold focus-visible:outline-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                }
              >
                <motion.div
                  layout
                  className={
                    showAllJobs ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "flex w-max gap-4"
                  }
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
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
                          showAllJobs ? "min-w-0" : "w-[84vw] max-w-sm shrink-0 snap-start"
                        }`}
                      >
                        <img
                          src={j.img}
                          alt=""
                          aria-hidden="true"
                          draggable="false"
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
                              draggable="false"
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
          </div>
        </section>

        {/* TEAM */}
        <section
          id="team"
          className="scroll-mt-20 border-b border-border bg-secondary/40 py-16 sm:py-20 lg:py-24"
        >
          <div className="container-x">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Team
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
                  Meet the people behind BOSSHR.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Dedicated professionals committed to guiding, supporting and creating meaningful
                  opportunities for every client.
                </p>
              </div>
              <button
                type="button"
                aria-expanded={showAllTeam}
                aria-controls="team-list"
                onClick={() => setShowAllTeam((show) => !show)}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-gold hover:bg-secondary md:self-auto"
              >
                {showAllTeam ? "Show less" : "Show all team members"}
                <ArrowUpRight
                  className={`h-4 w-4 transition-transform ${showAllTeam ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div
              id="team-list"
              className={showAllTeam ? "mt-10" : "relative mt-10 overflow-hidden pb-6"}
            >
              {!showAllTeam && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-secondary/95 to-transparent md:w-20" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-secondary/95 to-transparent md:w-20" />
                </>
              )}
              <div
                ref={teamMarquee.viewportRef}
                role="region"
                aria-label="Team members carousel. Swipe, drag or scroll horizontally."
                tabIndex={showAllTeam ? -1 : 0}
                onPointerDown={teamMarquee.onPointerDown}
                onPointerMove={teamMarquee.onPointerMove}
                onPointerUp={teamMarquee.onPointerUp}
                onPointerCancel={teamMarquee.onPointerCancel}
                onClickCapture={teamMarquee.onClickCapture}
                onWheel={teamMarquee.onWheel}
                onKeyDown={teamMarquee.onKeyDown}
                onScroll={teamMarquee.onScroll}
                onFocusCapture={teamMarquee.onFocusCapture}
                onBlurCapture={teamMarquee.onBlurCapture}
                className={
                  showAllTeam
                    ? "overflow-visible"
                    : "cursor-grab touch-auto overflow-x-auto overscroll-x-contain select-none [-webkit-overflow-scrolling:touch] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold focus-visible:outline-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                }
              >
                <motion.div
                  layout
                  className={
                    showAllTeam
                      ? "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "flex w-max gap-6"
                  }
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {(showAllTeam ? team : [...team, ...team]).map((m, index) => {
                    const isDuplicate = !showAllTeam && index >= team.length;

                    return (
                      <motion.a
                        key={`${m.name}-${showAllTeam ? "grid" : index}`}
                        href={`https://wa.me/${m.phone}?text=${encodeURIComponent(`Hello ${m.name}, I found you through the BOSSHR website and would like to enquire.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        draggable="false"
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
                          showAllTeam
                            ? "group min-w-0"
                            : "group w-[84vw] max-w-xs shrink-0 snap-start"
                        }
                      >
                        <div className="overflow-hidden rounded-2xl bg-secondary">
                          <img
                            src={m.img}
                            alt={m.name}
                            draggable="false"
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
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {m.desc}
                        </p>
                        <p className="mt-3 text-xs font-medium text-primary">Message on WhatsApp</p>
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="scroll-mt-20 border-b border-border py-16 sm:py-20 lg:py-24"
        >
          <div className="container-x">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Client Testimonials
                </p>
                <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
                  Trusted by professionals.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Why individuals trust BOSSHR Team Consultancy FZC to guide their career journey.
                </p>
              </Reveal>
              <button
                type="button"
                aria-expanded={showAllTestimonials}
                aria-controls="testimonial-list"
                onClick={() => setShowAllTestimonials((show) => !show)}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-gold hover:bg-secondary md:self-auto"
              >
                {showAllTestimonials ? "Show less" : "Show all testimonials"}
                <ArrowUpRight
                  className={`h-4 w-4 transition-transform ${showAllTestimonials ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div
              id="testimonial-list"
              className={showAllTestimonials ? "mt-10" : "relative mt-10 overflow-hidden pb-6"}
            >
              {!showAllTestimonials && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background to-transparent md:w-20" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background to-transparent md:w-20" />
                </>
              )}

              <div
                ref={testimonialMarquee.viewportRef}
                role="region"
                aria-label="Client testimonials carousel. Swipe, drag or scroll horizontally."
                tabIndex={showAllTestimonials ? -1 : 0}
                onPointerDown={testimonialMarquee.onPointerDown}
                onPointerMove={testimonialMarquee.onPointerMove}
                onPointerUp={testimonialMarquee.onPointerUp}
                onPointerCancel={testimonialMarquee.onPointerCancel}
                onClickCapture={testimonialMarquee.onClickCapture}
                onWheel={testimonialMarquee.onWheel}
                onKeyDown={testimonialMarquee.onKeyDown}
                onScroll={testimonialMarquee.onScroll}
                onFocusCapture={testimonialMarquee.onFocusCapture}
                onBlurCapture={testimonialMarquee.onBlurCapture}
                className={
                  showAllTestimonials
                    ? "overflow-visible"
                    : "cursor-grab touch-auto overflow-x-auto overscroll-x-contain select-none [-webkit-overflow-scrolling:touch] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold focus-visible:outline-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                }
              >
                <motion.div
                  layout
                  className={
                    showAllTestimonials
                      ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                      : "flex w-max gap-6"
                  }
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {(showAllTestimonials ? testimonials : [...testimonials, ...testimonials]).map(
                    (t, index) => {
                      const isDuplicate = !showAllTestimonials && index >= testimonials.length;

                      return (
                        <motion.figure
                          layout
                          key={`${t.name}-${showAllTestimonials ? "grid" : index}`}
                          aria-hidden={isDuplicate}
                          initial={
                            showAllTestimonials && !reduceMotion ? { opacity: 0, x: 32 } : false
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay:
                              showAllTestimonials && !reduceMotion
                                ? (index % testimonials.length) * 0.05
                                : 0,
                          }}
                          className={`flex min-h-64 flex-col rounded-2xl border border-border bg-card p-6 ${
                            showAllTestimonials
                              ? "min-w-0"
                              : "w-[84vw] max-w-md shrink-0 snap-start"
                          }`}
                        >
                          <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                            ))}
                          </div>
                          <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                            “{t.quote}”
                          </blockquote>
                          <figcaption className="mt-auto pt-6 text-sm font-medium">
                            {t.name}
                          </figcaption>
                        </motion.figure>
                      );
                    },
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
          <div className="container-x grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
              <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">Let's talk.</h2>
              <p className="mt-4 text-muted-foreground">
                Send us a message through WhatsApp or email — we usually respond within one business
                day.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:bosshrteamcc18@gmail.com"
                  className="flex items-start gap-3 text-sm"
                >
                  <Mail className="mt-0.5 h-4 w-4 text-gold" />
                  <span>bosshrteamcc18@gmail.com</span>
                </a>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                  <span>
                    Office 18, 2nd Floor, Al Kazim Building (Abu Saif Business Center), Dubai,
                    United Arab Emirates
                  </span>
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
                  Start a WhatsApp conversation for a quick response, or send your enquiry directly
                  to our main email inbox.
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

                <div className="mt-10 border-t border-border pt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Our pages
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {contactPages.map(({ label, value, href, logoSrc }) => {
                      const content = (
                        <>
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            {logoSrc ? (
                              <img
                                src={logoSrc}
                                alt=""
                                aria-hidden="true"
                                width={22}
                                height={22}
                                loading="lazy"
                                className="h-[22px] w-[22px] object-contain"
                              />
                            ) : (
                              <Globe2 className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              {label}
                            </span>
                            <span className="mt-1 block min-h-5 truncate text-sm font-medium">
                              {value}
                            </span>
                          </span>
                        </>
                      );

                      return href ? (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noreferrer" : undefined}
                          className="flex min-h-20 items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-gold hover:bg-secondary/50"
                        >
                          {content}
                        </a>
                      ) : (
                        <div
                          key={label}
                          aria-label={`${label} page details not provided`}
                          className="flex min-h-20 items-center gap-3 rounded-xl border border-border bg-background p-4"
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

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
            <h4 className="font-display text-sm font-medium text-primary-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a
                  href="https://wa.me/971502381130"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
                  WhatsApp +971 50 238 1130
                </a>
              </li>
              <li>
                <a
                  href="mailto:bosshrteamcc18@gmail.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                  bosshrteamcc18@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>Office 18, Al Kazim Building, Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="container-x flex flex-col justify-between gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row">
            <span>© 2026 BOSSHR Team Consultancy · Dubai, UAE · +971 50 238 1130</span>
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
