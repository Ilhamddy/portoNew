"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { Plus, Check, ArrowRight, Sparkles } from "lucide-react";

export default function ServicesPage() {
  const { config, updateService } = usePortfolioStore();
  const { services, process } = config;
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[var(--primary)]" />
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
            Layanan
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.45rem,12vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="APA YANG" delay={0.05} />
            <br />
            <span className="text-stroke">SAYA BISA</span>
          </h1>
          <p className="max-w-xs text-[var(--foreground)]/60 text-sm leading-relaxed md:pb-3 font-medium">
            Solusi digital menyeluruh yang dirancang untuk mendorong pertumbuhan bisnis dan produk Anda.
          </p>
        </div>
      </section>

      {/* SERVICES — ACCORDION STYLE */}
      <section className="relative z-10 py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
          {services.map((svc, i) => {
            const isOpen = activeService === i;
            return (
              <div key={i} className="group transition-colors">
                <button
                  onClick={() => setActiveService(isOpen ? -1 : i)}
                  className="w-full flex items-start sm:items-center justify-between gap-4 py-7 md:py-9 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className={`text-xs tracking-[0.3em] font-mono font-bold transition-colors hidden sm:block ${isOpen ? "text-[var(--primary)]" : "text-[var(--foreground)]/40"}`}>
                      {svc.no}
                    </span>
                    <InlineEdit
                      as="h2"
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight transition-colors ${isOpen ? "text-[var(--primary)]" : "group-hover:text-[var(--foreground)]"}`}
                      value={svc.title}
                      onSave={(value) => updateService(i, "title", value)}
                    />
                  </div>
                  <div className={`p-2 rounded-full border border-[var(--border-subtle)] transition-transform duration-300 ${isOpen ? "rotate-45 bg-[var(--primary)] text-[var(--primary-fg)] border-[var(--primary)]" : "text-[var(--foreground)]/60"}`}>
                    <Plus size={20} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isOpen ? "max-h-[600px] opacity-100 pb-10" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 pl-0 sm:pl-16 md:pl-20">
                    <div>
                      <InlineEdit
                        as="p"
                        multiline
                        className="text-[var(--foreground)]/70 leading-relaxed font-medium text-base mb-6"
                        value={svc.desc}
                        onSave={(value) => updateService(i, "desc", value)}
                      />
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[var(--primary)] hover:underline"
                      >
                        Pesan Layanan Ini <ArrowRight size={13} />
                      </Link>
                    </div>

                    <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/60 backdrop-blur-sm">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--foreground)]/40 font-bold block mb-4">
                        Fitur & Cakupan
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {svc.features.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-xs text-[var(--foreground)]/80 font-semibold">
                            <span className="w-4 h-4 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold block mb-2">
              Alur Kerja
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Proses Sistematis</h2>
          </div>
          <p className="max-w-xs text-sm text-[var(--foreground)]/60 leading-relaxed font-medium">
            Pendekatan terstruktur yang memastikan setiap proyek selesai tepat waktu, efisien, dan berkualitas prima.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {process.map((p, i) => (
            <SpotlightCard
              key={i}
              className="p-6 sm:p-7 border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 backdrop-blur-sm group hover:border-[var(--primary)]/50 transition-all rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[var(--primary)] font-mono font-bold px-2 py-0.5 rounded bg-[var(--primary)]/10">
                  STEP {p.step}
                </span>
                <span className="text-xs text-[var(--foreground)]/30 font-mono">
                  0{i + 1}/06
                </span>
              </div>
              <h3 className="font-black uppercase text-xl tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-[var(--foreground)]/65 leading-relaxed font-medium">
                {p.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-5 sm:mx-6 md:mx-12 mb-16 md:mb-20 rounded-2xl bg-[var(--card-bg)] text-[var(--foreground)] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[var(--border-subtle)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-3 flex items-center gap-2">
            <Sparkles size={14} /> Siap mulai?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Diskusikan<br />
            Proyek Anda
          </h2>
        </div>
        <Link
          href="/contact"
          className="relative z-10 w-full sm:w-auto justify-center md:shrink-0 group inline-flex items-center gap-3 bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)] px-8 py-4 text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Konsultasi Gratis <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
