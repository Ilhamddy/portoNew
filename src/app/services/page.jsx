"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import FadeIn from "@/components/reactbits/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/reactbits/StaggerContainer";
import MagneticButton from "@/components/reactbits/MagneticButton";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";
import { Plus, Check, ArrowRight, Sparkles } from "lucide-react";

export default function ServicesPage() {
  const { config, updateService } = usePortfolioStore();
  const { services, process } = config;
  const { t, language } = useLanguage();
  const [activeService, setActiveService] = useState(0);

  const activeServices = language === "en" ? t.services.servicesList : services;
  const activeProcess = language === "en" ? t.services.processList : process;

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
              {t.services.badge}
            </span>
          </div>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.45rem,12vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text={t.services.title1} delay={0.05} />
            <br />
            <span className="text-stroke">{t.services.titleAccent}</span>
          </h1>
          <FadeIn delay={0.3} direction="right">
            <p className="max-w-xs text-[var(--foreground)]/60 text-sm leading-relaxed md:pb-3 font-medium">
              {t.services.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES — ACCORDION STYLE */}
      <section className="relative z-10 py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
          {activeServices.map((svc, i) => {
            const isOpen = activeService === i;
            const no = services[i]?.no || `0${i + 1}`;
            return (
              <FadeIn key={i} delay={i * 0.08} direction="none">
                <div className="group transition-colors">
                  <button
                    onClick={() => setActiveService(isOpen ? -1 : i)}
                    className="w-full flex items-start sm:items-center justify-between gap-4 py-7 md:py-9 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className={`text-xs tracking-[0.3em] font-mono font-bold transition-colors hidden sm:block ${isOpen ? "text-[var(--primary)]" : "text-[var(--foreground)]/40"}`}>
                        {no}
                      </span>
                      <InlineEdit
                        as="h2"
                        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight transition-colors ${isOpen ? "text-[var(--primary)]" : "group-hover:text-[var(--foreground)]"}`}
                        value={svc.title}
                        onSave={(value) => updateService(i, "title", value)}
                      />
                    </div>
                    <motion.div
                      className={`p-2 rounded-full border transition-colors ${isOpen ? "bg-[var(--primary)] text-[var(--primary-fg)] border-[var(--primary)]" : "border-[var(--border-subtle)] text-[var(--foreground)]/60"}`}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Plus size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 pl-0 sm:pl-16 md:pl-20">
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
                              {t.services.consultCta} <ArrowRight size={13} />
                            </Link>
                          </div>

                          <div className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/60 backdrop-blur-sm">
                            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--foreground)]/40 font-bold block mb-4">
                              {t.services.deliverablesTitle}
                            </span>
                            <StaggerContainer as="ul" className="grid grid-cols-1 sm:grid-cols-2 gap-3" staggerDelay={0.06}>
                              {svc.features.map((f) => (
                                <StaggerItem key={f} as="li">
                                  <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]/80 font-semibold">
                                    <span className="w-4 h-4 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                                      <Check size={10} strokeWidth={3} />
                                    </span>
                                    {f}
                                  </div>
                                </StaggerItem>
                              ))}
                            </StaggerContainer>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold block mb-2">
                {t.services.processBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{t.services.processTitle}</h2>
            </div>
            <p className="max-w-xs text-sm text-[var(--foreground)]/60 leading-relaxed font-medium">
              {t.services.processSubtitle}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
          {activeProcess.map((p, i) => (
            <StaggerItem key={i}>
              <SpotlightCard
                className="p-6 sm:p-7 border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 backdrop-blur-sm group hover:border-[var(--primary)]/50 transition-all rounded-xl card-interactive h-full"
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA */}
      <FadeIn className="mx-5 sm:mx-6 md:px-12 max-w-7xl mx-auto mb-16 md:mb-20">
        <div className="rounded-3xl bg-[var(--card-bg)] text-[var(--foreground)] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[var(--border-subtle)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-3 flex items-center gap-2">
              <Sparkles size={14} /> {language === "id" ? "Siap mulai?" : "Ready to launch?"}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              {t.services.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mt-2 max-w-md">
              {t.services.ctaSubtitle}
            </p>
          </div>
          <MagneticButton>
            <Link
              href="/contact"
              className="btn-primary"
            >
              <span>{t.services.ctaButton}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </div>
      </FadeIn>

      <Footer />
    </main>
  );
}
