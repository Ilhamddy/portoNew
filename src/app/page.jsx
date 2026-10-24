"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
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
} from "lucide-react";

export default function Home() {
  const { config } = usePortfolioStore();
  const { personal, projects, services } = config;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative">
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
          {/* Seamless fade: subtle top tint, clear middle pine trees, smooth fade to page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/20 via-transparent via-60% to-[var(--background)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center">
          {/* Floating pill badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 backdrop-blur-md text-xs font-semibold tracking-wide text-[var(--foreground)]/80 mb-7 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{personal.availability || "Open to Work"}</span>
            <span className="text-[var(--foreground)]/30">·</span>
            <span className="text-[var(--foreground)]/65">{personal.role}</span>
          </div>

          {/* Tiimo-Style Signature Headline with Italic Serif Accent */}
          <h1 className="text-[clamp(2.3rem,5.8vw,4.75rem)] font-bold tracking-tight leading-[1.1] text-[var(--foreground)] max-w-3xl mx-auto mb-6">
            Rekayasa web modern <br className="hidden sm:inline" />
            dibangun untuk <span className="font-italic-serif font-normal text-[var(--foreground)]">dunia nyata</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-[var(--foreground)]/70 text-sm sm:text-base md:text-lg leading-relaxed mb-9 font-normal">
            Mengubah visi produk kompleks menjadi antarmuka digital yang elegan, cepat, dan siap rilis dengan standar arsitektur frontend kelas dunia.
          </p>

          {/* Primary Pill CTA with circular arrow */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 bg-[var(--primary)] text-[var(--primary-fg)] hover:opacity-90 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm"
            >
              <span>Lihat Hasil Karya</span>
              <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} />
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 hover:bg-[var(--card-bg)] text-[var(--foreground)] px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all backdrop-blur-sm"
            >
              <span>Mulai Konsultasi</span>
              <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Social Proof & Technology Logos Strip (Tiimo style) */}
          <div className="w-full max-w-4xl pt-8 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] tracking-[0.22em] uppercase text-[var(--foreground)]/50 font-semibold block mb-6">
              Dipercaya & Menggunakan Standar Industri Terkini
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[var(--foreground)]/65 font-semibold text-xs tracking-wider uppercase">
              <span className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors">
                <Code2 size={15} className="text-emerald-700 dark:text-emerald-400" /> Next.js
              </span>
              <span className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors">
                <Sparkles size={15} className="text-emerald-700 dark:text-emerald-400" /> React 19
              </span>
              <span className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors">
                <Flame size={15} className="text-emerald-700 dark:text-emerald-400" /> Tailwind CSS
              </span>
              <span className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors">
                <ShieldCheck size={15} className="text-emerald-700 dark:text-emerald-400" /> TypeScript
              </span>
              <span className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors">
                <Compass size={15} className="text-emerald-700 dark:text-emerald-400" /> Figma UI/UX
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FEATURED HIGHLIGHT (Tiimo App Store Awards Bento)         */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Frosted Award Bento Card with scenic background */}
          <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-[0_20px_60px_rgba(0,0,0,0.06)] group">
            <Image
              src="/hero-misty-forest.jpg"
              alt="Misty forest texture"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Soft inner glow gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 via-transparent to-black/20" />

            {/* Frosted Glass Floating Card in Center */}
            <div className="absolute inset-6 sm:inset-10 tiimo-glass rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg mb-4">
                <Award size={30} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-[var(--foreground)]">
                Excellence in Frontend & UI
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground)]/70 font-medium">
                40+ Proyek Sukses · 100% Kepuasan Klien
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--foreground)]/10 text-[11px] font-semibold">
                <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" /> Standar Portofolio 2025
              </div>
            </div>
          </div>

          {/* Right: Text content & Pill CTA */}
          <div className="flex flex-col items-start lg:pl-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-[var(--foreground)]">
              Kualitas kode & desain <br />
              untuk hasil yang <span className="font-italic-serif font-normal">berkelanjutan</span>
            </h2>
            <p className="text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed mb-4 font-normal">
              Saya menggabungkan kepekaan estetika desain modern dengan kepatuhan kode yang ketat. Setiap proyek dirancang dengan clean architecture, SEO optimal, dan performa tinggi yang ramah mesin pencari.
            </p>
            <p className="text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed mb-8 font-normal">
              Dari web app interaktif hingga landing page berkonversi tinggi, setiap piksel dan fungsi diselaraskan untuk membantu bisnis Anda berkembang.
            </p>

            <Link
              href="/services"
              className="group inline-flex items-center gap-3 bg-[var(--primary)] text-[var(--primary-fg)] hover:opacity-90 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs"
            >
              <span>Pelajari Layanan</span>
              <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DUAL BENTO CARDS ("Structure you can see" & "One tap away")*/}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Card 1: Structure you can see */}
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 p-8 sm:p-10 flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Arsitektur yang <span className="font-italic-serif font-normal">terstruktur</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-relaxed font-normal mb-6">
                Ubah konsep rumit menjadi struktur komponen modular yang rapi, mudah dipelihara, dan siap diskalakan seiring perkembangan produk.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:opacity-75 transition-opacity mb-8"
              >
                <span>Pelajari Pendekatan</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Scenic background with Tiimo-style frosted widgets */}
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
                  <div className="tiimo-glass rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[var(--foreground)]">
                    <span className="flex items-center gap-1.5">
                      <Plus size={13} className="text-emerald-600 dark:text-emerald-400" /> Clean Component
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--foreground)]/10">1 MIN ↗</span>
                  </div>
                  <div className="tiimo-glass rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[var(--foreground)]">
                    <span className="flex items-center gap-1.5">
                      <LayoutGrid size={13} className="text-emerald-600 dark:text-emerald-400" /> Modular State
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--foreground)]/10">2 MIN ↗</span>
                  </div>
                </div>
                <div className="tiimo-glass rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[var(--foreground)]">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span>100/100 Lighthouse Performance</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">OPTIMAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Your schedule, one tap away */}
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 p-8 sm:p-10 flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Kinerja cepat, <span className="font-italic-serif font-normal">satu ketukan</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--foreground)]/70 leading-relaxed font-normal mb-6">
                Pantau proses pengerjaan dan milestone proyek secara transparan dengan jadwal terencana dan komunikasi yang responsif.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:opacity-75 transition-opacity mb-8"
              >
                <span>Lihat Alur Kerja</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Scenic background with Tiimo-style frosted task card */}
            <div className="relative rounded-2xl overflow-hidden p-5 border border-[var(--border-subtle)] min-h-[190px] flex flex-col justify-end">
              <Image
                src="/rolling-green-hills.jpg"
                alt="Scenic green hill background"
                fill
                sizes="(min-width: 768px) 500px, 100vw"
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

              <div className="relative z-10 tiimo-glass rounded-xl p-4 text-[var(--foreground)]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Focus Milestone
                  </span>
                  <span className="text-[10px] font-mono opacity-80">6H SPRINT</span>
                </div>
                <div className="text-xs sm:text-sm font-bold">Frontend Development & Review</div>
                <div className="text-[11px] opacity-75 mt-0.5">Siap untuk staging & pengujian langsung</div>
                <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                  <span>Timeline transparan</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">10:30 AM - 18:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MULTI-DEVICE SYNC SECTION ("One planner, synced across")  */}
      {/* ============================================================ */}
      <section className="py-14 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Narrative */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-[var(--foreground)]">
              Satu karya, optimal di <br />
              <span className="font-italic-serif font-normal">semua perangkat</span>
            </h2>
            <p className="text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Dirancang dengan pendekatan mobile-first. Mulai dari layar ponsel pintar, tablet, hingga desktop monitor beresolusi tinggi — tata letak, kecepatan, dan interaksi tetap presisi dan memukau.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm font-semibold text-[var(--foreground)]/80">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>Responsif sempurna di iOS, Android, macOS & Windows</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-[var(--foreground)]/80">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>Dukungan Dark Mode otomatis mengikuti preferensi sistem</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-[var(--foreground)]/80">
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>Aksesibilitas (WCAG) dan navigasi keyboard teruji</span>
              </div>
            </div>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 bg-[var(--primary)] text-[var(--primary-fg)] hover:opacity-90 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs"
            >
              <span>Jelajahi Portofolio</span>
              <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={12} />
              </span>
            </Link>
          </div>

          {/* Right: Phone Mockup Glass Interface with Scenic Wallpaper */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
            <div className="relative rounded-[36px] border-4 border-[var(--border-subtle)] bg-[var(--card-solid)] p-3 sm:p-4 shadow-2xl overflow-hidden">
              <div className="relative rounded-[28px] overflow-hidden border border-[var(--border-subtle)] p-5 min-h-[460px] flex flex-col justify-between">
                {/* Scenic background inside mobile screen */}
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
                    <span className="text-[10px]">Online</span>
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="relative z-10 text-white mb-4">
                  <div className="text-lg font-bold">Wednesday</div>
                  <div className="text-xs text-white/70">ilhamddy workspace</div>
                </div>

                {/* Date Pills */}
                <div className="relative z-10 grid grid-cols-7 gap-1 text-center mb-5 text-xs text-white">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div
                      key={i}
                      className={`py-2 rounded-xl text-[11px] font-bold ${i === 3
                          ? "bg-white text-black shadow-md"
                          : "bg-black/25 text-white/80 backdrop-blur-xs"
                        }`}
                    >
                      <div>{day}</div>
                      <div className="text-[10px] mt-0.5 font-normal">{21 + i}</div>
                    </div>
                  ))}
                </div>

                {/* Frosted interactive cards inside mobile */}
                <div className="relative z-10 space-y-2.5">
                  <div className="text-xs font-bold text-white tracking-wide">Get Started</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="tiimo-glass rounded-xl p-3 text-xs font-medium text-[var(--foreground)] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Plus size={12} className="text-emerald-600 dark:text-emerald-400" /> Task
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
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PANORAMIC GREEN MEADOW CTA ("Join the planning revolution") */}
      {/* ============================================================ */}
      <section className="py-10 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[var(--border-subtle)] shadow-xl group">
          {/* Panoramic lush rolling green hills */}
          <Image
            src="/rolling-green-hills.jpg"
            alt="Rolling green meadow landscape"
            fill
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Soft atmospheric gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-white">
              Wujudkan ide digital Anda <br />
              ke level <span className="font-italic-serif font-normal text-white">berikutnya</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/85 font-normal max-w-md mx-auto mb-8 leading-relaxed">
              Diskusikan kebutuhan proyek Anda hari ini untuk roadmap teknis dan estimasi yang jelas.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-xl"
            >
              <span>Mulai Diskusi Proyek</span>
              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. GIANT WORDMARK FOOTER HERO ("ILHAMDDY" like Tiimo)        */}
      {/* ============================================================ */}
      <section className="relative pt-14 pb-0 overflow-hidden select-none pointer-events-none -mb-8">
        <h2 className="text-[clamp(4.5rem,20vw,18rem)] font-extrabold text-center tracking-tighter uppercase leading-[0.75] text-[var(--foreground)] opacity-15 transition-opacity">
          ilhamddy
        </h2>
      </section>

      <Footer />
    </main>
  );
}
