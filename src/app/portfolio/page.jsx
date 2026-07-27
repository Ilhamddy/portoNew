"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import { portfolioConfig } from "@/data/portfolio";
import { X, ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const { categories, projects } = portfolioConfig;
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-black dark:bg-white" />
          <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">
            Portfolio
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="KARYA" delay={0.05} />
            <br />
            <span className="text-stroke">TERBAIK</span>
          </h1>
          <p className="max-w-xs text-black/50 dark:text-white/50 text-sm leading-relaxed md:pb-3 font-medium">
            Koleksi proyek pilihan yang mencerminkan kemampuan dan pendekatan saya dalam membangun produk digital.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto py-6 md:py-8 flex gap-2 overflow-x-auto sm:flex-wrap border-b border-black/10 dark:border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 sm:px-5 py-2 text-xs tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? "bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black"
                : "border border-night-bordeaux-600/20 text-night-bordeaux-600/60 dark:border-dark-cyan-400/20 dark:text-dark-cyan-400/60 hover:border-night-bordeaux-600 dark:hover:border-dark-cyan-400 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* PROJECTS GRID */}
      <section className="relative z-10 py-10 md:py-12 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <SpotlightCard
              key={project.id}
              className={`group relative p-7 md:p-14 min-h-[250px] md:min-h-[260px] flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.005] border border-black/10 dark:border-white/10 ${project.color} ${
                project.size === "large" ? "md:col-span-2" : ""
              }`}
            >
              <div onClick={() => setSelected(project)} className="w-full h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs tracking-[0.25em] uppercase opacity-60 font-semibold">
                    {project.category}
                  </span>
                  <span className="text-xs opacity-50 font-mono">{project.year}</span>
                </div>
                <div className="mt-6">
                  <p className="text-xs tracking-widest uppercase opacity-55 mb-2">{project.client}</p>
                  <h3
                    className={`font-black uppercase tracking-tight leading-tight mb-3 ${
                      project.size === "large" ? "text-2xl sm:text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm opacity-70 mb-4 leading-relaxed max-w-lg font-medium">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] tracking-wider uppercase border border-current opacity-40 px-2 py-0.5 font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current opacity-30 group-hover:w-full transition-all duration-500" />
                <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity text-xs tracking-widest uppercase font-bold">
                  Detail →
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-zinc-950 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative border border-black/10 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 text-2xl text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 mb-2 block font-semibold">
              {selected.category} · {selected.year}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">{selected.title}</h2>
            <p className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40 mb-6 font-semibold">
              {selected.client}
            </p>
            <p className="text-black/60 dark:text-white/60 leading-relaxed mb-8 font-medium">{selected.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="border border-black/20 dark:border-white/20 px-3 py-1 text-xs tracking-wider uppercase font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black px-5 sm:px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-colors duration-300"
            >
              Diskusikan Proyek Serupa →
            </Link>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="mx-5 sm:mx-6 md:mx-12 mb-16 md:mb-20 bg-black text-white dark:bg-zinc-900 p-7 sm:p-10 md:p-20 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-black/10 dark:border-white/10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Punya ide?</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Wujudkan<br />
            Proyek Anda
          </h2>
        </div>
        <Link
          href="/contact"
          className="w-full sm:w-auto justify-center md:shrink-0 group inline-flex items-center gap-3 border border-night-bordeaux-400 text-night-bordeaux-400 px-6 sm:px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-night-bordeaux-400 hover:text-black transition-all duration-300"
        >
          Mulai Sekarang <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
