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
import { Plus } from "lucide-react";

export default function ServicesPage() {
  const { config, updateService } = usePortfolioStore();
  const { services, process } = config;
  const [activeService, setActiveService] = useState(-1);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-black dark:bg-white" />
          <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">
            Layanan
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.45rem,12vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="APA YANG" delay={0.05} />
            <br />
            <span className="text-stroke">SAYA BISA</span>
          </h1>
          <p className="max-w-xs text-black/50 dark:text-white/50 text-sm leading-relaxed md:pb-3 font-medium">
            Solusi digital yang dirancang untuk mendorong pertumbuhan bisnis Anda.
          </p>
        </div>
      </section>

      {/* SERVICES — ACCORDION STYLE */}
      <section className="relative z-10 py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10 border-t border-black/10 dark:border-white/10">
          {services.map((svc, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setActiveService(activeService === i ? -1 : i)}
                className="w-full flex items-start sm:items-center justify-between gap-4 py-6 md:py-8 text-left cursor-pointer"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-xs tracking-[0.3em] text-black/30 dark:text-white/30 font-mono hidden sm:block">
                    {svc.no}
                  </span>
                  <InlineEdit
                    as="h2"
                    className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight"
                    value={svc.title}
                    onSave={(value) => updateService(i, "title", value)}
                  />
                </div>
                <Plus
                  size={28}
                  className={`transition-transform duration-300 ${activeService === i ? "rotate-45" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeService === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-8 md:pb-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pl-0 md:pl-24">
                  <InlineEdit
                    as="p"
                    multiline
                    className="text-black/60 dark:text-white/60 leading-relaxed font-medium"
                    value={svc.desc}
                    onSave={(value) => updateService(i, "desc", value)}
                  />
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-black/70 dark:text-white/70 font-semibold">
                        <span className="w-1.5 h-1.5 bg-night-bordeaux-600 dark:bg-dark-cyan-500 rounded-full shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Proses Kerja</h2>
          <p className="max-w-xs text-sm text-black/50 dark:text-white/50 leading-relaxed font-medium">
            Pendekatan sistematis yang memastikan proyek selesai tepat waktu dan sesuai ekspektasi.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-black/10 dark:bg-white/10">
          {process.map((p, i) => (
            <SpotlightCard
              key={i}
              className="bg-white dark:bg-black p-5 md:p-6 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 h-full border border-black/5 dark:border-white/5"
            >
              <span className="text-xs text-black/30 dark:text-white/30 font-mono group-hover:text-white/30 dark:group-hover:text-black/30 mb-4 block">
                {p.step}
              </span>
              <h3 className="font-black uppercase text-lg tracking-tight mb-2">{p.title}</h3>
              <p className="text-xs text-black/50 dark:text-white/50 group-hover:text-white/60 dark:group-hover:text-black/60 leading-relaxed font-medium">
                {p.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-5 sm:mx-6 md:mx-12 mb-16 md:mb-20 bg-black text-white dark:bg-zinc-900 p-7 sm:p-10 md:p-20 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-black/10 dark:border-white/10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Siap mulai?</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Diskusikan<br />
            Proyek Anda
          </h2>
        </div>
        <Link
          href="/contact"
          className="w-full sm:w-auto justify-center md:shrink-0 group inline-flex items-center gap-3 border border-night-bordeaux-400 text-night-bordeaux-400 px-6 sm:px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-night-bordeaux-400 hover:text-black transition-all duration-300"
        >
          Konsultasi Gratis <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
