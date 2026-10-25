"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import FadeIn from "@/components/reactbits/FadeIn";
import MagneticButton from "@/components/reactbits/MagneticButton";
import StaggerContainer, { StaggerItem } from "@/components/reactbits/StaggerContainer";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";
import {
  ArrowUpRight,
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
  Plus,
  LayoutGrid,
  Terminal,
  GitBranch,
  Cpu,
} from "lucide-react";

export default function Home() {
  const { config } = usePortfolioStore();
  const { personal, projects, services } = config;
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative page-enter">
      <AnimatedBackground />
      <Navbar />

      {/* ============================================================ */}
      {/* 1. HERO SECTION (Tiimo Misty Forest Nature Aesthetic)        */}
      {/* ============================================================ */}
      <section className="relative w-full pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden">
        {/* Full-width misty pine forest background image fading down */}
        <div className="absolute inset-x-0 top-0 h-[720px] z-0 overflow-hidden pointer-events-none">
          <Image
            src="/hero-misty-forest.jpg"
            alt="Misty pine forest landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90 dark:opacity-30 transition-opacity"
          />
          {/* Seamless fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/20 via-transparent via-60% to-[var(--background)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center">
          {/* Floating pill badge */}
          <FadeIn delay={0.2} direction="down">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 backdrop-blur-md text-xs font-semibold tracking-wide text-[var(--foreground)]/80 mb-7 shadow-xs">
              <span className="relative w-2 h-2 rounded-full bg-emerald-500">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </span>
              <span>{personal.availability || t.common.openToWork}</span>
              <span className="text-[var(--foreground)]/30">·</span>
              <span className="text-[var(--foreground)]/65">{personal.role || t.home.badgeRole}</span>
            </div>
          </FadeIn>

          {/* Signature Headline with Italic Serif Accent */}
          <FadeIn delay={0.4} duration={0.8}>
            <h1 className="text-[clamp(2.3rem,5.8vw,4.75rem)] font-bold tracking-tight leading-[1.1] text-[var(--foreground)] max-w-3xl mx-auto mb-6 text-balance">
              {t.home.heroTitle1} <br className="hidden sm:inline" />
              {t.home.heroTitle2} <span className="font-italic-serif font-normal text-[var(--foreground)]">{t.home.heroTitleAccent}</span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.6}>
            <p className="max-w-2xl text-[var(--foreground)]/70 text-sm sm:text-base md:text-lg leading-relaxed mb-9 font-normal">
              {t.home.heroSubtitle}
            </p>
          </FadeIn>

          {/* Primary Pill CTA */}
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
              <MagneticButton>
                <Link
                  href="/portfolio"
                  className="btn-primary"
                >
                  <span>{t.home.heroCtaPrimary}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={13} />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/contact"
                  className="btn-secondary"
                >
                  <span>{t.home.heroCtaSecondary}</span>
                  <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Tech Stack Strip */}
          <FadeIn delay={1.0} direction="up">
            <div className="w-full max-w-4xl pt-8 border-t border-[var(--border-subtle)]">
              <span className="text-[11px] tracking-[0.22em] uppercase text-[var(--foreground)]/50 font-semibold block mb-6">
                {language === "id" ? "Dipercaya & Menggunakan Standar Industri Terkini" : "Trusted & Engineered With Modern Industry Standards"}
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
                    <Icon size={15} className="text-emerald-700 dark:text-emerald-400" /> {label}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FEATURED HIGHLIGHT (Excellence Bento)                      */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Frosted Award Bento Card */}
          <FadeIn direction="left" duration={0.7}>
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-[0_20px_60px_rgba(0,0,0,0.06)] group card-interactive">
              <Image
                src="/hero-misty-forest.jpg"
                alt="Misty forest texture"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 via-transparent to-black/20" />

              {/* Frosted Glass Floating Card */}
              <div className="absolute inset-6 sm:inset-10 tiimo-glass rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg mb-4">
                  <Award size={30} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-[var(--foreground)]">
                  Excellence in Frontend & UI
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/70 font-medium">
                  {language === "id" ? "40+ Proyek Sukses · 100% Kepuasan Klien" : "40+ Successful Projects · 100% Client Satisfaction"}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--foreground)]/10 text-[11px] font-semibold">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" /> {language === "id" ? "Standar Portofolio 2025" : "Engineering Standard 2025"}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Text content */}
          <FadeIn direction="right" delay={0.2} duration={0.7}>
            <div className="flex flex-col items-start lg:pl-4">
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

              <MagneticButton>
                <Link
                  href="/services"
                  className="btn-primary"
                >
                  <span>{t.home.craftCta}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DUAL BENTO CARDS                                          */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Card 1: Architecture */}
          <FadeIn delay={0} duration={0.6}>
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 p-8 sm:p-10 flex flex-col justify-between shadow-xs relative overflow-hidden group card-interactive h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  {t.home.bento1Title} <span className="font-italic-serif font-normal">{t.home.bento1Accent}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-relaxed font-normal mb-6">
                  {t.home.bento1Desc}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors mb-8"
                >
                  <span>{t.home.bento1Cta}</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Scenic background with frosted widgets */}
              <div className="relative rounded-2xl overflow-hidden p-5 border border-[var(--border-subtle)] min-h-[190px] flex flex-col justify-end">
                <Image
                  src="/hero-misty-forest.jpg"
                  alt="Scenic pine forest background"
                  fill
                  sizes="(min-width: 768px) 500px, 100vw"
                  className="object-cover object-bottom opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                <div className="relative z-10 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div
                      className="tiimo-glass rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[var(--foreground)]"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Terminal size={13} className="text-emerald-600 dark:text-emerald-400" /> {t.home.bento1Widget1}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--foreground)]/10">1 MIN ↗</span>
                    </motion.div>
                    <motion.div
                      className="tiimo-glass rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[var(--foreground)]"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="flex items-center gap-1.5">
                        <GitBranch size={13} className="text-emerald-600 dark:text-emerald-400" /> {t.home.bento1Widget2}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--foreground)]/10">2 MIN ↗</span>
                    </motion.div>
                  </div>
                  <motion.div
                    className="tiimo-glass rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[var(--foreground)]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span>100/100 Lighthouse Performance</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-70">OPTIMAL</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Performance */}
          <FadeIn delay={0.15} duration={0.6}>
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 p-8 sm:p-10 flex flex-col justify-between shadow-xs relative overflow-hidden group card-interactive h-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  {t.home.bento2Title} <span className="font-italic-serif font-normal">{t.home.bento2Accent}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-relaxed font-normal mb-6">
                  {t.home.bento2Desc}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors mb-8"
                >
                  <span>{language === "id" ? "Lihat Alur Kerja" : "View Workflow"}</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Scenic background with frosted task card */}
              <div className="relative rounded-2xl overflow-hidden p-5 border border-[var(--border-subtle)] min-h-[190px] flex flex-col justify-end">
                <Image
                  src="/rolling-green-hills.jpg"
                  alt="Scenic green hill background"
                  fill
                  sizes="(min-width: 768px) 500px, 100vw"
                  className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

                <motion.div
                  className="relative z-10 tiimo-glass rounded-xl p-4 text-[var(--foreground)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="relative w-2 h-2 rounded-full bg-emerald-500">
                        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                      </span>
                      Focus Milestone
                    </span>
                    <span className="text-[10px] font-mono opacity-80">6H SPRINT</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold">{t.home.bento2CardTitle}</div>
                  <div className="text-[11px] opacity-75 mt-0.5">{t.home.bento2CardSub}</div>
                  <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                    <span>{t.home.bento2CardFoot1}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t.home.bento2CardFoot2}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MULTI-DEVICE SECTION                                      */}
      {/* ============================================================ */}
      <section className="py-14 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Narrative */}
          <FadeIn direction="left" duration={0.7}>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-[var(--foreground)] text-balance">
                {t.home.multiDeviceTitle1} <br />
                <span className="font-italic-serif font-normal">{t.home.multiDeviceAccent}</span>
              </h2>
              <p className="text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {t.home.multiDeviceDesc}
              </p>

              <StaggerContainer className="space-y-3 mb-8" staggerDelay={0.12}>
                {t.home.multiDeviceFeatures.map((text) => (
                  <StaggerItem key={text}>
                    <div className="flex items-center gap-3 text-sm font-semibold text-[var(--foreground)]/80">
                      <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{text}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <MagneticButton>
                <Link href="/portfolio" className="btn-primary">
                  <span>{t.home.multiDeviceCta}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Right: Phone Mockup */}
          <FadeIn direction="right" delay={0.2} duration={0.7}>
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
              <motion.div
                className="relative rounded-[36px] border-4 border-[var(--border-subtle)] bg-[var(--card-solid)] p-3 sm:p-4 shadow-2xl overflow-hidden"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="relative rounded-[28px] overflow-hidden border border-[var(--border-subtle)] p-5 min-h-[460px] flex flex-col justify-between">
                  <Image
                    src="/rolling-green-hills.jpg"
                    alt="Scenic hills wallpaper"
                    fill
                    sizes="400px"
                    className="object-cover object-center opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                  {/* Status Bar */}
                  <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white/80 mb-4">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px]">{t.home.phoneOnline}</span>
                    </div>
                  </div>

                  {/* Mobile Header */}
                  <div className="relative z-10 text-white mb-4">
                    <div className="text-lg font-bold">Wednesday</div>
                    <div className="text-xs text-white/70">{t.home.phoneWorkspace}</div>
                  </div>

                  {/* Date Pills */}
                  <div className="relative z-10 grid grid-cols-7 gap-1 text-center mb-5 text-xs text-white">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                      <div
                        key={i}
                        className={`py-2 rounded-xl text-[11px] font-bold ${
                          i === 3
                            ? "bg-white text-black shadow-md"
                            : "bg-black/25 text-white/80 backdrop-blur-xs"
                        }`}
                      >
                        <div>{day}</div>
                        <div className="text-[10px] mt-0.5 font-normal">{21 + i}</div>
                      </div>
                    ))}
                  </div>

                  {/* Frosted cards */}
                  <div className="relative z-10 space-y-2.5">
                    <div className="text-xs font-bold text-white tracking-wide">Get Started</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="tiimo-glass rounded-xl p-3 text-xs font-medium text-[var(--foreground)] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Cpu size={12} className="text-emerald-600 dark:text-emerald-400" /> Task
                        </span>
                        <span className="text-[9px] font-mono opacity-70">1 MIN ↗</span>
                      </div>
                      <div className="tiimo-glass rounded-xl p-3 text-xs font-medium text-[var(--foreground)] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <LayoutGrid size={12} className="text-emerald-600 dark:text-emerald-400" /> Widget
                        </span>
                        <span className="text-[9px] font-mono opacity-70">2 MIN ↗</span>
                      </div>
                    </div>
                    <div className="tiimo-glass rounded-xl p-3 text-xs font-medium text-[var(--foreground)] flex items-center justify-between">
                      <span>Performance Score</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">60 FPS</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PANORAMIC CTA                                             */}
      {/* ============================================================ */}
      <FadeIn className="py-10 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto" duration={0.7}>
        <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[var(--border-subtle)] shadow-xl group">
          <Image
            src="/rolling-green-hills.jpg"
            alt="Rolling green meadow landscape"
            fill
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

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

      {/* ============================================================ */}
      {/* 6. GIANT WORDMARK                                            */}
      {/* ============================================================ */}
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
