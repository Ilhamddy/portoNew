"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import FadeIn from "@/components/reactbits/FadeIn";
import MagneticButton from "@/components/reactbits/MagneticButton";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";
import { X, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

export default function PortfolioPage() {
  const { config, updateProject } = usePortfolioStore();
  const { categories, projects } = config;
  const { t, language } = useLanguage();
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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative page-enter">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-[var(--border-subtle)]">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
              {t.portfolio.badge}
            </span>
          </div>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text={t.portfolio.title1} delay={0.05} />
            <br />
            <span className="text-stroke">{t.portfolio.titleAccent}</span>
          </h1>
          <FadeIn delay={0.3} direction="right">
            <p className="max-w-xs text-[var(--foreground)]/60 text-sm leading-relaxed md:pb-3 font-medium">
              {t.portfolio.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FILTER */}
      <FadeIn delay={0.2} direction="none">
        <section className="relative z-10 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto py-6 md:py-8 flex gap-2.5 overflow-x-auto sm:flex-wrap border-b border-[var(--border-subtle)]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 sm:px-5 py-2.5 text-xs tracking-wider uppercase font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 rounded-full border ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-fg)] border-[var(--primary)] shadow-sm"
                    : "border-[var(--border-subtle)] text-[var(--foreground)]/65 hover:border-[var(--primary)]/50 hover:text-[var(--foreground)] bg-[var(--card-bg)]/40"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? "bg-white/20 text-white" : "bg-[var(--foreground)]/10 text-[var(--foreground)]/60"}`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </section>
      </FadeIn>

      {/* PROJECTS GRID */}
      <section className="relative z-10 py-10 md:py-14 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const projectDesc =
                (language === "en" ? t.portfolio.projectDescriptions[project.id] : null) ||
                project.desc;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={project.size === "large" ? "md:col-span-2" : ""}
                >
                  <SpotlightCard
                    className={`group relative min-h-[440px] flex flex-col justify-between overflow-hidden cursor-pointer border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 backdrop-blur-sm hover:border-[var(--primary)]/40 transition-all duration-300 card-interactive`}
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
                              priority={i < 4}
                              sizes={project.size === "large" ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
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
                        <p className="text-sm text-[var(--foreground)]/65 mb-5 leading-relaxed line-clamp-2 font-medium">
                          {projectDesc}
                        </p>

                        <div className="flex flex-wrap gap-2 items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((techItem) => (
                              <span
                                key={techItem}
                                className="text-[10px] tracking-wider uppercase border border-[var(--border-subtle)] px-2.5 py-1 font-semibold rounded-md bg-[var(--background)]/60 text-[var(--foreground)]/70"
                              >
                                {techItem}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            {language === "en" ? "Details" : "Detail"} <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="bg-[var(--card-solid)] text-[var(--foreground)] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative border border-[var(--border-subtle)] shadow-2xl rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-[var(--border-subtle)] text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-colors cursor-pointer"
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
                    className="object-cover object-top"
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

              <p className="text-[var(--foreground)]/70 text-sm leading-relaxed mb-6 font-medium">
                {(language === "en" ? t.portfolio.projectDescriptions[selected.id] : null) || selected.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {selected.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="border border-[var(--border-subtle)] bg-[var(--background)]/60 px-3 py-1 text-xs tracking-wider uppercase font-semibold rounded-md"
                  >
                    {techItem}
                  </span>
                ))}
              </div>

              <MagneticButton>
                <Link
                  href="/contact"
                  onClick={() => setSelected(null)}
                  className="btn-primary w-full sm:w-auto justify-center"
                >
                  <span>{language === "en" ? "Discuss Similar Project" : "Diskusikan Proyek Serupa"}</span>
                  <ArrowRight size={14} />
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <FadeIn className="mx-5 sm:mx-6 md:px-12 max-w-7xl mx-auto mb-16 md:mb-20">
        <div className="rounded-3xl bg-[var(--card-bg)] text-[var(--foreground)] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[var(--border-subtle)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-3 flex items-center gap-2">
              <Sparkles size={14} /> {language === "id" ? "Punya ide?" : "Have an idea?"}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              {t.portfolio.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mt-2 max-w-md">
              {t.portfolio.ctaSubtitle}
            </p>
          </div>
          <MagneticButton>
            <Link
              href="/contact"
              className="btn-primary"
            >
              <span>{t.portfolio.ctaButton}</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </div>
      </FadeIn>

      <Footer />
    </main>
  );
}
