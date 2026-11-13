"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import FadeIn from "@/components/reactbits/FadeIn";
import MagneticButton from "@/components/reactbits/MagneticButton";
import StaggerContainer, { StaggerItem } from "@/components/reactbits/StaggerContainer";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";
import FuturisticCommandSection from "@/components/FuturisticCommandSection";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Compass,
  Monitor,
  Flame,
  Award,
  Clock,
  Briefcase,
  Users,
  FolderOpen,
  CalendarDays,
  Lightbulb,
  PenTool,
  Rocket,
  Search,
  FlaskConical,
  Settings,
  Globe,
  Cpu,
  GitBranch,
  Terminal,
  LayoutGrid,
  ExternalLink,
  ChevronRight,
  MapPin,
  Star,
  TrendingUp,
  Server,
  Database,
  Workflow,
  Wrench,
  Boxes,
  Palette,
  TerminalSquare,
  Network,
} from "lucide-react";

/* ──────────────────────────────────────────────
   Animated Counter Component
   ────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(String(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [isInView, target, duration, count, rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────
   Service Icons Mapping
   ────────────────────────────────────────────── */
const serviceIcons = [
  <Code2 key="s1" size={24} />,
  <Settings key="s2" size={24} />,
  <PenTool key="s3" size={24} />,
  <ShieldCheck key="s4" size={24} />,
];

/* ──────────────────────────────────────────────
   Process Step Icons
   ────────────────────────────────────────────── */
const processIcons = [Search, Lightbulb, PenTool, Code2, FlaskConical, Rocket];

/* ──────────────────────────────────────────────
   Full Skills Data (Detailed Engineering Stack)
   ────────────────────────────────────────────── */
const detailedSkillCategories = [
  {
    category: "Frontend Engineering",
    icon: Code2,
    badge: "Core Stack",
    desc: "Arsitektur frontend modern, reactive UI, dan komponen modular.",
    skills: [
      { name: "React 19", level: "Expert", tag: "Library" },
      { name: "Next.js 16 (App Router)", level: "Advanced", tag: "Framework" },
      { name: "TypeScript", level: "Advanced", tag: "Language" },
      { name: "Tailwind CSS v4", level: "Expert", tag: "Styling" },
      { name: "Framer Motion", level: "Advanced", tag: "Animation" },
      { name: "Zustand & Redux", level: "Advanced", tag: "State" },
      { name: "HTML5 / Semantic Web", level: "Expert", tag: "Core" },
      { name: "CSS3 / Modern Layouts", level: "Expert", tag: "Core" },
    ],
  },
  {
    category: "UI/UX & Product Design",
    icon: Palette,
    badge: "Design Systems",
    desc: "Desain berbasis token, wireframing, dan prototipe interaktif.",
    skills: [
      { name: "Figma", level: "Expert", tag: "Design Tool" },
      { name: "Design System Architecture", level: "Advanced", tag: "System" },
      { name: "Wireframing & Prototyping", level: "Advanced", tag: "UX" },
      { name: "WCAG AA Accessibility", level: "Proficient", tag: "A11y" },
      { name: "Responsive & Mobile First", level: "Expert", tag: "Methodology" },
      { name: "Micro-interactions", level: "Advanced", tag: "Motion" },
    ],
  },
  {
    category: "Backend, Database & API",
    icon: Database,
    badge: "Data & Services",
    desc: "Integrasi API, ORM, database relation, dan autentikasi aman.",
    skills: [
      { name: "Node.js & Express", level: "Advanced", tag: "Runtime" },
      { name: "RESTful APIs", level: "Expert", tag: "Architecture" },
      { name: "PostgreSQL & Prisma", level: "Proficient", tag: "Database" },
      { name: "Supabase & Firebase", level: "Advanced", tag: "BaaS" },
      { name: "NextAuth / OAuth", level: "Advanced", tag: "Auth" },
      { name: "Stripe Payment Gateway", level: "Proficient", tag: "Fintech" },
    ],
  },
  {
    category: "DevOps, Tools & Infrastructure",
    icon: TerminalSquare,
    badge: "Workflow & Cloud",
    desc: "Automasi deployment, version control, dan optimasi performa.",
    skills: [
      { name: "Git & GitHub Workflows", level: "Advanced", tag: "VCS" },
      { name: "Vercel & Netlify", level: "Expert", tag: "Deployment" },
      { name: "Lighthouse Performance (100/100)", level: "Expert", tag: "Audit" },
      { name: "Docker (Basics)", level: "Familiar", tag: "Container" },
      { name: "Postman & API Testing", level: "Advanced", tag: "Testing" },
      { name: "VS Code & Turbopack", level: "Expert", tag: "Tooling" },
    ],
  },
  {
    category: "IT Consulting & Network",
    icon: Network,
    badge: "Enterprise",
    desc: "Strategi digital, audit sistem, dan konfigurasi infrastruktur IT.",
    skills: [
      { name: "IT Strategy & Roadmap", level: "Advanced", tag: "Strategy" },
      { name: "System Architecture Audit", level: "Advanced", tag: "Audit" },
      { name: "Network Setup & Security", level: "Advanced", tag: "Infrastructure" },
      { name: "Hardware & Server Provisioning", level: "Proficient", tag: "Hardware" },
      { name: "Tech Stack Consultation", level: "Expert", tag: "Advisory" },
    ],
  },
];

export default function Home() {
  const { config } = usePortfolioStore();
  const { personal, projects, services, experiences } = config;
  const { t, language } = useLanguage();

  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative page-enter">
      <AnimatedBackground />
      <Navbar />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO SECTION (Impactful headline + badge + dual CTA + tech strip)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-28 sm:pt-36 pb-16 md:pb-24 overflow-hidden">
        {/* Modern clean engineering background with ambient lighting & subtle grid */}
        <div className="absolute inset-x-0 top-0 h-[750px] z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[650px] sm:w-[980px] h-[500px] bg-gradient-to-b from-blue-500/15 via-indigo-500/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-24 left-1/4 w-80 h-80 bg-blue-500/8 dark:bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute top-36 right-1/4 w-80 h-80 bg-indigo-500/8 dark:bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,#000_65%,transparent_100%)] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/40 to-[var(--background)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center">
          {/* Floating Availability Pill Badge */}
          <FadeIn delay={0.2} direction="down">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 backdrop-blur-md text-xs font-semibold tracking-wide text-[var(--foreground)]/85 mb-7 shadow-xs">
              <span className="relative w-2 h-2 rounded-full bg-blue-500">
                <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
              </span>
              <span>{personal.availability || t.common.openToWork}</span>
              <span className="text-[var(--foreground)]/30">·</span>
              <span className="text-[var(--foreground)]/70">{personal.role || t.home.badgeRole}</span>
            </div>
          </FadeIn>

          {/* Signature Impactful Headline */}
          <FadeIn delay={0.4} duration={0.8}>
            <h1 className="text-[clamp(2.4rem,6vw,5rem)] font-bold tracking-tight leading-[1.08] text-[var(--foreground)] max-w-3xl mx-auto mb-6 text-balance">
              {t.home.heroTitle1} <br className="hidden sm:inline" />
              {t.home.heroTitle2}{" "}
              <span className="font-italic-serif font-normal text-[var(--foreground)]">
                {t.home.heroTitleAccent}
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.6}>
            <p className="max-w-2xl text-[var(--foreground)]/70 text-sm sm:text-base md:text-lg leading-relaxed mb-9 font-normal">
              {t.home.heroSubtitle}
            </p>
          </FadeIn>

          {/* Dual Call To Action Buttons */}
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <MagneticButton>
                <Link href="/portfolio" className="btn-primary">
                  <span>{t.home.heroCtaPrimary}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={13} />
                  </span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className="btn-secondary">
                  <span>{t.home.heroCtaSecondary}</span>
                  <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Tech Strip (Industry Standards) */}
          <FadeIn delay={1.0} direction="up">
            <div className="w-full max-w-4xl pt-8 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] tracking-[0.22em] uppercase text-[var(--foreground)]/50 font-semibold block mb-6">
                {language === "id"
                  ? "Dipercaya & Menggunakan Standar Industri Terkini"
                  : "Trusted & Engineered With Modern Industry Standards"}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[var(--foreground)]/65 font-semibold text-xs tracking-wider uppercase">
                {[
                  { icon: Code2, label: "Next.js" },
                  { icon: Sparkles, label: "React 19" },
                  { icon: Flame, label: "Tailwind CSS" },
                  { icon: ShieldCheck, label: "TypeScript" },
                  { icon: Compass, label: "Figma UI/UX" },
                ].map(({ icon: Icon, label }) => (
                  <motion.span
                    key={label}
                    className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={15} className="text-blue-600 dark:text-blue-400" /> {label}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. STATS BAR (Animated Counter Strip)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-12 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <FadeIn duration={0.6}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-xs">
            {[
              { num: 3, suffix: "+", label: language === "id" ? "Tahun Pengalaman" : "Years Experience", icon: CalendarDays },
              { num: 40, suffix: "+", label: language === "id" ? "Proyek Selesai" : "Projects Completed", icon: FolderOpen },
              { num: 20, suffix: "+", label: language === "id" ? "Klien Puas" : "Happy Clients", icon: Users },
            ].map(({ num, suffix, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon size={18} className="text-blue-600 dark:text-blue-400 hidden sm:block" />
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
                    <AnimatedCounter target={num} suffix={suffix} />
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs tracking-[0.15em] uppercase text-[var(--foreground)]/55 font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. ABOUT BRIEF (Profile Photo + Short Bio + Highlights)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Profile visual */}
          <FadeIn direction="left" duration={0.7}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl group">
                <Image
                  src="/profile.jpg"
                  alt={personal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="tiimo-glass rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={14} className="text-blue-400" />
                      <span className="text-xs font-semibold">{personal.location}</span>
                    </div>
                    <div className="text-sm font-bold">{personal.name}</div>
                    <div className="text-[11px] text-white/75">{personal.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Bio & Highlights */}
          <FadeIn direction="right" delay={0.2} duration={0.7}>
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--primary)] mb-3 block">
                {t.home.craftTagline}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-[var(--foreground)] text-balance">
                {t.home.craftTitle1} <br />
                <span className="font-italic-serif font-normal">{t.home.craftTitleAccent}</span>
              </h2>
              <p className="text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed mb-4 font-normal">
                {t.home.craftDesc1}
              </p>
              <p className="text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                {t.home.craftDesc2}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-8 w-full">
                {[
                  { icon: Zap, text: language === "id" ? "Performa Tinggi" : "High Performance" },
                  { icon: Globe, text: language === "id" ? "SEO Optimal" : "SEO Optimized" },
                  { icon: Smartphone, text: "Mobile-First" },
                  { icon: ShieldCheck, text: language === "id" ? "Clean Architecture" : "Clean Code" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm font-semibold text-[var(--foreground)]/80">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <MagneticButton>
                <Link href="/about" className="btn-primary">
                  <span>{language === "id" ? "Profil Lengkap" : "About Me"}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. SERVICES GRID (4 Service Cards with Icons)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--primary)] mb-3 block">
              {language === "id" ? "APA YANG SAYA TAWARKAN" : "WHAT I OFFER"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-[var(--foreground)] text-balance">
              {language === "id" ? "Layanan " : "Services "}
              <span className="font-italic-serif font-normal">
                {language === "id" ? "profesional" : "I provide"}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--foreground)]/65 text-sm sm:text-base leading-relaxed font-normal">
              {language === "id"
                ? "Solusi digital menyeluruh yang dirancang untuk mendorong pertumbuhan bisnis dan produk Anda."
                : "Comprehensive digital solutions engineered to scale your product and business."}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6" staggerDelay={0.1}>
          {(language === "id" ? t.services.servicesList : t.services.servicesList).slice(0, 4).map((service, i) => (
            <StaggerItem key={service.title}>
              <Link href="/services" className="block h-full">
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 p-6 sm:p-8 card-interactive h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/15">
                      {serviceIcons[i]}
                    </div>
                    <span className="text-xs font-mono text-[var(--foreground)]/30 font-bold">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--foreground)]/65 leading-relaxed mb-5 flex-1 font-normal">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] text-[var(--foreground)]/60 font-semibold"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="text-center mt-10">
            <MagneticButton>
              <Link href="/services" className="btn-secondary">
                <span>{t.home.craftCta}</span>
                <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. FEATURED PROJECTS (Showcase 3 Featured Projects with Images)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--primary)] mb-3 block">
                {t.home.featuredBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-[var(--foreground)] text-balance">
                {t.home.featuredTitle}
              </h2>
              <p className="mt-3 max-w-xl text-[var(--foreground)]/65 text-sm sm:text-base leading-relaxed font-normal">
                {t.home.featuredSubtitle}
              </p>
            </div>
            <MagneticButton>
              <Link href="/portfolio" className="btn-secondary shrink-0">
                <span>{t.home.featuredCta}</span>
                <ArrowRight size={14} />
              </Link>
            </MagneticButton>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.12}>
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href="/portfolio" className="block group">
                <div className="rounded-2xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--card-bg)]/85 card-interactive h-full">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                        {language === "id" ? "Lihat Detail" : "View Project"} <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-[11px] text-[var(--foreground)]/45 font-semibold">{project.year}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1.5 text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--foreground)]/60 leading-relaxed line-clamp-2 mb-3 font-normal">
                      {(language === "id" ? t.portfolio.projectDescriptions : t.portfolio.projectDescriptions)[project.id] || project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-subtle)] text-[var(--foreground)]/55 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. FULL SKILLS & TECH STACK (Comprehensive & Detailed Grid)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Cpu size={14} /> Full Technical Spectrum
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-[var(--foreground)] text-balance">
              {language === "id" ? "Keahlian & Penguasaan " : "Engineering Skills & "}
              <span className="font-italic-serif font-normal">
                {language === "id" ? "Teknologi" : "Tech Stack"}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--foreground)]/65 text-sm sm:text-base leading-relaxed font-normal">
              {language === "id"
                ? "Daftar lengkap teknologi, tools, dan metodologi yang saya gunakan secara profesional untuk merekayasa produk digital skala produksi."
                : "A detailed breakdown of technologies, frameworks, and methodologies applied to build production-grade web systems."}
            </p>
          </div>
        </FadeIn>

        {/* 5 Deep-Dive Categories */}
        <div className="space-y-6">
          {detailedSkillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <FadeIn key={cat.category} delay={idx * 0.08} duration={0.5}>
                <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 p-6 sm:p-8 card-interactive">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/15">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
                          {cat.category}
                        </h3>
                        <p className="text-xs text-[var(--foreground)]/60 font-normal mt-0.5">
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center text-[10px] px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {cat.skills.map((item) => (
                      <div
                        key={item.name}
                        className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)]/70 hover:border-blue-500/40 hover:bg-[var(--card-solid)] transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase">
                            {item.tag}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--foreground)]/8 text-[var(--foreground)]/60 font-medium">
                            {item.level}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. WORK PROCESS (6-Step Timeline)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--primary)] mb-3 block">
              {language === "id" ? t.services.processBadge : t.services.processBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-[var(--foreground)] text-balance">
              {language === "id" ? "Alur kerja yang " : "A workflow that's "}
              <span className="font-italic-serif font-normal">
                {language === "id" ? "terstruktur" : "structured"}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--foreground)]/65 text-sm sm:text-base leading-relaxed font-normal">
              {language === "id" ? t.services.processSubtitle : t.services.processSubtitle}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5" staggerDelay={0.08}>
          {(language === "id" ? t.services.processList : t.services.processList).map((step, i) => {
            const StepIcon = processIcons[i] || Rocket;
            return (
              <StaggerItem key={step.step}>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 p-5 text-center card-interactive h-full flex flex-col items-center group">
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 mb-3">
                    {step.step}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/15 group-hover:scale-110 transition-transform">
                    <StepIcon size={20} />
                  </div>
                  <h4 className="text-sm font-bold tracking-tight mb-1.5">{step.title}</h4>
                  <p className="text-[11px] text-[var(--foreground)]/55 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          8. EXPERIENCE TIMELINE (Career History)
          ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start">
          <FadeIn direction="left" duration={0.7}>
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[var(--primary)] mb-3 block">
                {language === "id" ? "REKAM JEJAK" : "CAREER TRACK"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-[var(--foreground)] text-balance">
                {language === "id" ? "Pengalaman " : "Experience "}
                <span className="font-italic-serif font-normal">
                  {language === "id" ? "profesional" : "& growth"}
                </span>
              </h2>
              <p className="text-[var(--foreground)]/65 text-sm sm:text-base leading-relaxed font-normal mb-6">
                {language === "id"
                  ? "Rekam jejak karier dan kontribusi dalam pengembangan produk digital."
                  : "Career trajectory and contributions in delivering digital solutions."}
              </p>
              <MagneticButton>
                <Link href="/about" className="btn-secondary">
                  <span>{language === "id" ? "Selengkapnya" : "Full Details"}</span>
                  <ArrowRight size={14} />
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15} duration={0.7}>
            <div className="space-y-4">
              {(language === "id" ? t.about.experiences : t.about.experiences).map((exp, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 p-6 sm:p-7 card-interactive"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center shrink-0">
                      <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold tracking-tight">{exp.role}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-[var(--foreground)]/55 font-semibold">
                        <span>{exp.company}</span>
                        <span className="text-[var(--foreground)]/25">·</span>
                        <span>{exp.year}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--foreground)]/65 leading-relaxed font-normal pl-12">
                    {exp.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          9. FUTURISTIC TELEMETRY & ROBOTIC COMMAND SECTION
          ════════════════════════════════════════════════════════════════ */}
      <FuturisticCommandSection />

      {/* ════════════════════════════════════════════════════════════════
          10. BOTTOM CTA (Strong Call-To-Action)
          ════════════════════════════════════════════════════════════════ */}
      <FadeIn className="py-10 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto" duration={0.7}>
        <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[var(--border-subtle)] bg-gradient-to-br from-slate-950 via-[#0B1528] to-slate-950 shadow-2xl group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-40" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-white text-balance">
              {t.home.bottomCtaTitle} <br />
              <span className="font-italic-serif font-normal text-white">{t.home.bottomCtaAccent}</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/85 font-normal max-w-md mx-auto mb-8 leading-relaxed">
              {t.home.bottomCtaDesc}
            </p>
            <MagneticButton>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>{t.home.bottomCtaButton}</span>
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} />
                </span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </FadeIn>

      {/* ════════════════════════════════════════════════════════════════
          10. GIANT WORDMARK (Branding)
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-14 pb-0 overflow-hidden select-none pointer-events-none -mb-8">
        <motion.h2
          className="text-[clamp(4.5rem,20vw,18rem)] font-extrabold text-center tracking-tighter uppercase leading-[0.75] text-[var(--foreground)] opacity-[0.06] transition-opacity"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.06, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          ilhamddy
        </motion.h2>
      </section>

      <Footer />
    </main>
  );
}
