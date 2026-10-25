"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

export default function AboutPage() {
  const { config, updatePersonal, updatePersonalList } = usePortfolioStore();
  const { personal, skills, experiences } = config;
  const { t, language } = useLanguage();

  const bioParagraphs = language === "en" ? t.about.detailedBio : personal.detailedBio;
  const activeExperiences = language === "en" ? t.about.experiences : experiences;

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
              {t.about.badge}
            </span>
          </div>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="WHO I" delay={0.05} />
            <br />
            <span className="text-stroke">AM</span>
          </h1>
          <FadeIn delay={0.3} direction="right">
            <p className="max-w-xs text-[var(--foreground)]/60 text-sm leading-relaxed md:pb-3 font-medium">
              {t.about.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* BIO SECTION */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Profile visual */}
        <FadeIn direction="left" duration={0.7}>
          <div className="relative">
            <motion.div
              className="relative bg-[var(--card-bg)] aspect-[3/4] w-full max-w-xs sm:max-w-sm overflow-hidden rounded-2xl border border-[var(--border-subtle)] shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Image
                src="/profile.jpg"
                alt={personal.name}
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="absolute inset-0 w-full h-full object-cover"
                priority
              />
              {/* Gradient Overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--background)] to-transparent opacity-60" />
            </motion.div>

            {/* Availability badge */}
            <motion.div
              className="absolute -top-3.5 right-4 sm:-right-2 bg-[var(--primary)] text-[var(--primary-fg)] px-4 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-bold shadow-md flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <span className="relative w-1.5 h-1.5 rounded-full bg-white">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
              </span>
              {personal.availability || t.common.openToWork}
            </motion.div>
          </div>
        </FadeIn>

        {/* Right: Bio text */}
        <div className="flex flex-col gap-8">
          <FadeIn direction="right" delay={0.2}>
            <div>
              <InlineEdit
                as="h2"
                className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 leading-tight"
                value={personal.name}
                onSave={(value) => updatePersonal("name", value)}
              />
              {bioParagraphs.map((paragraph, i) => (
                <InlineEdit
                  key={i}
                  as="p"
                  multiline
                  className="text-[var(--foreground)]/70 leading-relaxed mb-4 font-medium text-base sm:text-lg"
                  value={paragraph}
                  onSave={(value) => updatePersonalList("detailedBio", i, value)}
                />
              ))}
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.4}>
            <StaggerContainer className="grid grid-cols-3 gap-3 sm:gap-4 border-t border-b border-[var(--border-subtle)] py-6" staggerDelay={0.1}>
              {personal.stats.map((s, idx) => {
                const label = language === "en" ? (idx === 0 ? t.common.yearsExp : idx === 1 ? t.common.projects : t.common.clients) : s.label;
                return (
                  <StaggerItem key={s.label}>
                    <div className="text-center p-3 rounded-xl bg-[var(--card-bg)]/40 border border-[var(--border-subtle)] card-interactive">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--primary)]">{s.num}</div>
                      <div className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--foreground)]/50 mt-1 font-bold">
                        {label}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </FadeIn>

          <FadeIn delay={0.5}>
            <MagneticButton className="w-fit">
              <Link
                href="/contact"
                className="btn-primary"
              >
                <span>{t.about.ctaButton}</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
        <FadeIn>
          <div className="mb-10">
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold block mb-2">
              {t.about.skillsSubtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{t.about.skillsTitle}</h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {skills.map((group) => (
            <StaggerItem key={group.category}>
              <SpotlightCard
                className="bg-[var(--card-bg)]/75 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[var(--border-subtle)] h-full card-interactive"
              >
                <h3 className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] mb-6 font-bold flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="border border-[var(--border-subtle)] bg-[var(--background)]/60 px-3 py-1.5 text-xs font-semibold rounded-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-default"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* EXPERIENCE */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
        <FadeIn>
          <div className="mb-12">
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold block mb-2">
              {t.about.experienceSubtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{t.about.experienceTitle}</h2>
          </div>
        </FadeIn>

        <div className="relative pl-6 sm:pl-8 border-l border-[var(--border-subtle)] space-y-10">
          {activeExperiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.12} direction="left">
              <div className="relative group">
                {/* Timeline Marker */}
                <motion.span
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--background)] bg-[var(--primary)] ring-4 ring-[var(--primary)]/15"
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[var(--card-bg)] border border-[var(--border-subtle)] text-[var(--primary)] inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    {exp.year}
                  </span>
                  <span className="text-xs text-[var(--foreground)]/50 uppercase tracking-widest font-semibold">
                    {exp.company}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {exp.role}
                </h3>
                <p className="text-sm text-[var(--foreground)]/70 leading-relaxed font-medium max-w-2xl">
                  {exp.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
