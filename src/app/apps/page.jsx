"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import FadeIn from "@/components/reactbits/FadeIn";
import PomodoroTimer from "@/components/apps/PomodoroTimer";
import { useLanguage } from "@/lib/useLanguage";
import {
  Timer,
  LayoutGrid,
  Sparkles,
  BookOpen,
  Coffee,
  Brain,
  CheckCircle2,
  ArrowRight,
  Code2,
  FileText,
  CalendarCheck,
} from "lucide-react";

export default function AppsPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("pomodoro"); // "pomodoro" | "upcoming"

  const appsContent = t.apps || {};
  const upcomingApps = appsContent.upcomingApps || [];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative page-enter">
      <AnimatedBackground />
      <Navbar />

      {/* ============================================================ */}
      {/* 1. PAGE HEADER                                              */}
      {/* ============================================================ */}
      <section className="pt-28 sm:pt-36 pb-10 md:pb-14 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-[var(--border-subtle)]">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
              {appsContent.badge || "Aplikasi & Utilitas"}
            </span>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeIn delay={0.15}>
              <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.08] text-[var(--foreground)] max-w-2xl text-balance">
                {appsContent.title1 || "PRODUKTIVITAS"}{" "}
                <span className="font-italic-serif font-normal text-[var(--foreground)]">
                  {appsContent.titleAccent || "DIGITAL"}
                </span>
              </h1>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} direction="right">
            <p className="max-w-sm text-[var(--foreground)]/65 text-sm sm:text-base leading-relaxed md:pb-2 font-medium">
              {appsContent.subtitle ||
                "Koleksi aplikasi web interaktif berkinerja tinggi yang dirancang untuk mendukung fokus, alur kerja, dan efisiensi harian."}
            </p>
          </FadeIn>
        </div>

        {/* TOP TAB SWITCHER (Pomodoro vs Upcoming) */}
        <FadeIn delay={0.4} direction="up">
          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={() => setActiveTab("pomodoro")}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "pomodoro"
                  ? "bg-[var(--primary)] text-[var(--primary-fg)] shadow-md scale-[1.02]"
                  : "bg-[var(--card-bg)]/80 text-[var(--foreground)]/70 hover:text-[var(--foreground)] border border-[var(--border-subtle)]"
              }`}
            >
              <Timer size={16} />
              <span>{appsContent.tabs?.pomodoro || "Pomodoro Focus"}</span>
            </button>

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "upcoming"
                  ? "bg-[var(--primary)] text-[var(--primary-fg)] shadow-md scale-[1.02]"
                  : "bg-[var(--card-bg)]/80 text-[var(--foreground)]/70 hover:text-[var(--foreground)] border border-[var(--border-subtle)]"
              }`}
            >
              <LayoutGrid size={16} />
              <span>{appsContent.tabs?.upcoming || "Aplikasi Lainnya"}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black">
                {upcomingApps.length}
              </span>
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ============================================================ */}
      {/* 2. APP VIEW AREA                                            */}
      {/* ============================================================ */}
      <section className="py-12 md:py-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {activeTab === "pomodoro" ? (
          <div>
            {/* The Pomodoro App */}
            <FadeIn delay={0.2} duration={0.6}>
              <PomodoroTimer />
            </FadeIn>

            {/* Educational Guide on Pomodoro Technique */}
            <FadeIn delay={0.4} direction="up">
              <div className="mt-16 pt-12 border-t border-[var(--border-subtle)] max-w-4xl mx-auto">
                <div className="flex items-center gap-2.5 mb-3">
                  <BookOpen size={18} className="text-[var(--primary)]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--primary)]">
                    {language === "id" ? "Metodologi Kerja" : "Focus Methodology"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-8">
                  {language === "id"
                    ? "Cara Memaksimalkan Teknik Pomodoro"
                    : "How to Maximize The Pomodoro Technique"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: Brain,
                      step: "01",
                      title: language === "id" ? "1 Fokus Tunggal" : "Single Task Focus",
                      desc:
                        language === "id"
                          ? "Pilih 1 prioritas tugas penting sebelum menyalakan timer. Hindari multitasking."
                          : "Select one high-priority task before pressing start. Avoid all multitasking.",
                    },
                    {
                      icon: Timer,
                      step: "02",
                      title: language === "id" ? "25 Menit Deep Work" : "25m Deep Work",
                      desc:
                        language === "id"
                          ? "Kerjakan tugas tanpa henti hingga bel berbunyi. Tahan godaan membuka media sosial."
                          : "Work intensely until the chime sounds. Resist opening distractions or checking notifications.",
                    },
                    {
                      icon: Coffee,
                      step: "03",
                      title: language === "id" ? "5 Menit Recharge" : "5m Recharge",
                      desc:
                        language === "id"
                          ? "Berdiri dari meja, regangkan otot, ambil segelas air, atau rilekskan pandangan."
                          : "Step away from the screen, hydrate, stretch, and let your cognitive load reset.",
                    },
                    {
                      icon: Sparkles,
                      step: "04",
                      title: language === "id" ? "15-20 Menit Istirahat" : "15-20m Long Break",
                      desc:
                        language === "id"
                          ? "Setelah 4 sesi berturut-turut, nikmati istirahat panjang untuk memulihkan energi."
                          : "After completing a 4-session cycle, enjoy a full recharge to maintain sustainable stamina.",
                    },
                  ].map(({ icon: Icon, step, title, desc }) => (
                    <div
                      key={step}
                      className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/70 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--primary)]">
                          <Icon size={18} />
                        </div>
                        <span className="text-xs font-mono font-bold text-[var(--foreground)]/40">
                          {step}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[var(--foreground)] mb-2">{title}</h4>
                      <p className="text-xs text-[var(--foreground)]/65 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        ) : (
          /* Upcoming Apps Showcase */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={14} />
                <span>{appsContent.upcomingTitle || "Aplikasi Dalam Pengembangan"}</span>
              </div>
              <p className="max-w-xl mx-auto text-[var(--foreground)]/70 text-sm sm:text-base leading-relaxed">
                {appsContent.upcomingSubtitle ||
                  "Alat-alat produktivitas ringan lainnya yang sedang disiapkan untuk memperkaya ekosistem web Ilhamddy."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingApps.map((app, idx) => {
                const icons = [FileText, CalendarCheck, Code2];
                const IconComponent = icons[idx % icons.length];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md flex flex-col justify-between hover:border-[var(--primary)]/40 transition-all duration-300 group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--primary)] mb-5 group-hover:scale-110 transition-transform">
                        <IconComponent size={22} />
                      </div>
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-3">
                        {app.status}
                      </span>
                      <h3 className="text-base font-bold text-[var(--foreground)] mb-2">
                        {app.title}
                      </h3>
                      <p className="text-xs text-[var(--foreground)]/65 leading-relaxed">
                        {app.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--foreground)]/50">
                      <span>Web Utility</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
