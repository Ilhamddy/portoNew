"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { X, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

export default function PortfolioPage() {
  const { config, updateProject } = usePortfolioStore();
  const { categories, projects } = config;
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[var(--primary)]" />
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
            Portfolio
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="KARYA" delay={0.05} />
            <br />
            <span className="text-stroke">TERBAIK</span>
          </h1>
          <p className="max-w-xs text-[var(--foreground)]/60 text-sm leading-relaxed md:pb-3 font-medium">
            Koleksi proyek pilihan yang mencerminkan kemampuan dan pendekatan saya dalam membangun produk digital berkualitas tinggi.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto py-6 md:py-8 flex gap-2.5 overflow-x-auto sm:flex-wrap border-b border-[var(--border-subtle)]">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 sm:px-5 py-2.5 text-xs tracking-wider uppercase font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 rounded-full border ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--primary-fg)] border-[var(--primary)] shadow-sm"
                  : "border-[var(--border-subtle)] text-[var(--foreground)]/65 hover:border-[var(--primary)]/50 hover:text-[var(--foreground)] bg-[var(--card-bg)]/40"
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? "bg-white/20 text-white" : "bg-[var(--foreground)]/10 text-[var(--foreground)]/60"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </section>

      {/* PROJECTS GRID */}
      <section className="relative z-10 py-10 md:py-14 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((project) => (
            <SpotlightCard
              key={project.id}
              className={`group relative min-h-[440px] flex flex-col justify-between overflow-hidden cursor-pointer border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 backdrop-blur-sm hover:border-[var(--primary)]/40 transition-all duration-300 ${
                project.size === "large" ? "md:col-span-2" : ""
              }`}
            >
              <div onClick={() => setSelected(project)} className="w-full h-full flex flex-col justify-between">
                <div className="p-4 sm:p-5 md:p-6 pb-0">
                  <div className={`overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--background)] p-2 shadow-sm ${
                    project.size === "large" ? "aspect-[16/7] sm:aspect-[16/8]" : "aspect-[16/10]"
                  }`}>
                    <div className="flex h-7 items-center gap-1.5 rounded-t-[14px] border border-[var(--border-subtle)] border-b-0 bg-[var(--card-bg)] px-3">
                      <span className="h-2 w-2 rounded-full bg-rose-500/60" />
                      <span className="h-2 w-2 rounded-full bg-amber-500/60" />
                      <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
                    </div>
                    <div className="relative h-[calc(100%-1.75rem)] overflow-hidden rounded-b-[14px] border border-[var(--border-subtle)] bg-[var(--background)]">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        sizes={project.size === "large" ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
                      {project.category}
                    </span>
                    <span className="text-xs text-[var(--foreground)]/50 font-mono">
                      {project.year}
                    </span>
                  </div>

                  <InlineEdit
                    as="p"
                    className="text-xs tracking-widest uppercase text-[var(--foreground)]/50 mb-1"
                    value={project.client}
                    onSave={(value) => updateProject(project.id, "client", value)}
                  />
                  <InlineEdit
                    as="h3"
                    className="font-black uppercase tracking-tight leading-tight text-2xl md:text-3xl mb-3 group-hover:text-[var(--primary)] transition-colors"
                    value={project.title}
                    onSave={(value) => updateProject(project.id, "title", value)}
                  />
                  <InlineEdit
                    as="p"
                    multiline
                    className="text-sm text-[var(--foreground)]/65 mb-5 leading-relaxed line-clamp-2 font-medium"
                    value={project.desc}
                    onSave={(value) => updateProject(project.id, "desc", value)}
                  />

                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] tracking-wider uppercase border border-[var(--border-subtle)] px-2.5 py-1 font-semibold rounded-md bg-[var(--background)]/60 text-[var(--foreground)]/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Detail <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[var(--card-bg)] text-[var(--foreground)] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-[var(--border-subtle)] shadow-2xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 p-2 rounded-full border border-[var(--border-subtle)] text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="overflow-hidden rounded-[18px] border border-[var(--border-subtle)] bg-[var(--background)] p-2 mb-6 shadow-sm">
              <div className="flex h-7 items-center gap-1.5 rounded-t-[12px] border border-[var(--border-subtle)] border-b-0 bg-[var(--card-bg)] px-3">
                <span className="h-2 w-2 rounded-full bg-rose-500/60" />
                <span className="h-2 w-2 rounded-full bg-amber-500/60" />
                <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-b-[12px] border border-[var(--border-subtle)] bg-[var(--background)]">
                <Image
                  src={selected.image}
                  alt={`${selected.title} preview`}
                  fill
                  sizes="(min-width: 640px) 512px, 100vw"
                  className="object-contain object-center p-2"
                />
              </div>
            </div>

            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-2 block">
              {selected.category} · {selected.year}
            </span>

            <InlineEdit
              as="h2"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-1"
              value={selected.title}
              onSave={(value) => {
                updateProject(selected.id, "title", value);
                setSelected((current) => ({ ...current, title: value }));
              }}
            />

            <InlineEdit
              as="p"
              className="text-xs tracking-widest uppercase text-[var(--foreground)]/50 mb-4 font-semibold"
              value={selected.client}
              onSave={(value) => {
                updateProject(selected.id, "client", value);
                setSelected((current) => ({ ...current, client: value }));
              }}
            />

            <InlineEdit
              as="p"
              multiline
              className="text-[var(--foreground)]/70 text-sm leading-relaxed mb-6 font-medium"
              value={selected.desc}
              onSave={(value) => {
                updateProject(selected.id, "desc", value);
                setSelected((current) => ({ ...current, desc: value }));
              }}
            />

            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="border border-[var(--border-subtle)] bg-[var(--background)]/60 px-3 py-1 text-xs tracking-wider uppercase font-semibold rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setSelected(null)}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)] px-6 py-3.5 text-xs tracking-widest uppercase font-bold transition-all shadow-sm"
            >
              Diskusikan Proyek Serupa <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="mx-5 sm:mx-6 md:mx-12 mb-16 md:mb-20 rounded-2xl bg-[var(--card-bg)] text-[var(--foreground)] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[var(--border-subtle)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-3 flex items-center gap-2">
            <Sparkles size={14} /> Punya ide?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Wujudkan<br />
            Proyek Anda
          </h2>
        </div>
        <Link
          href="/contact"
          className="relative z-10 w-full sm:w-auto justify-center md:shrink-0 group inline-flex items-center gap-3 bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)] px-8 py-4 text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Mulai Sekarang <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
