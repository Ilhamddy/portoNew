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
import { ArrowRight, Award, Users, Briefcase } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { config, updateHeroSlide, updateProject, updateService } = usePortfolioStore();
  const { personal, services, projects, heroSlides } = config;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const statIcons = [
    <Briefcase key="exp" size={24} className="text-black dark:text-white" />,
    <Award key="proj" size={24} className="text-black dark:text-white" />,
    <Users key="clients" size={24} className="text-black dark:text-white" />,
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* HERO SECTION WITH SLIDES */}
      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center min-h-[78vh] md:min-h-[85vh] relative z-10">
        <div className="relative overflow-hidden w-full min-h-[42vh] md:min-h-[45vh] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-black dark:bg-white" />
                <span className="text-xs tracking-[0.3em] uppercase text-black/50 dark:text-white/50 font-bold">
                  <InlineEdit
                    value={heroSlides[currentSlide].tagline}
                    onSave={(value) => updateHeroSlide(currentSlide, "tagline", value)}
                  />
                </span>
              </div>
              
              <h1 className="text-[clamp(2.15rem,11vw,6.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8 break-words">
                <InlineEdit
                  as="span"
                  className="block"
                  value={heroSlides[currentSlide].titleLine1}
                  onSave={(value) => updateHeroSlide(currentSlide, "titleLine1", value)}
                />
                <InlineEdit
                  as="span"
                  className="text-stroke block"
                  value={heroSlides[currentSlide].titleLine2}
                  onSave={(value) => updateHeroSlide(currentSlide, "titleLine2", value)}
                />
              </h1>

              <InlineEdit
                as="p"
                multiline
                className="max-w-2xl text-black/60 dark:text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-medium min-h-[4.5rem] sm:min-h-[3.5rem]"
                value={heroSlides[currentSlide].desc}
                onSave={(value) => updateHeroSlide(currentSlide, "desc", value)}
              />

              <div className="flex flex-wrap gap-4">
                <Link
                  href={heroSlides[currentSlide].ctaLink}
                  className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black px-6 sm:px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-all duration-300"
                >
                  <InlineEdit
                    value={heroSlides[currentSlide].ctaText}
                    onSave={(value) => updateHeroSlide(currentSlide, "ctaText", value)}
                  />
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 border border-night-bordeaux-600 text-night-bordeaux-600 dark:border-dark-cyan-400 dark:text-dark-cyan-400 px-6 sm:px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-night-bordeaux-600 hover:text-white dark:hover:bg-dark-cyan-400 dark:hover:text-black transition-all duration-300"
                >
                  Hubungi Saya
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators / Manual Navigation */}
        <div className="flex gap-4 mt-8">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-300 cursor-pointer ${
                currentSlide === index ? "w-12 bg-night-bordeaux-600 dark:bg-dark-cyan-500" : "w-3 bg-night-bordeaux-600/25 dark:bg-dark-cyan-500/25"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 md:py-16 border-t border-b border-black/10 dark:border-white/10 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          {personal.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 md:gap-6 p-5 md:p-6 border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]"
            >
              <div className="p-4 bg-black/5 dark:bg-white/5 rounded-none">
                {statIcons[i]}
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black tracking-tight">{stat.num}</div>
                <div className="text-xs tracking-widest uppercase text-black/50 dark:text-white/50 font-bold mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold block mb-3">
              Layanan Unggulan
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Solusi Digital</h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-night-bordeaux-600 dark:text-dark-cyan-400 hover:text-night-bordeaux-700 dark:hover:text-dark-cyan-300 transition-colors"
          >
            Semua Layanan <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(0, 4).map((svc) => (
            <SpotlightCard
              key={svc.no}
              className="border border-black/15 dark:border-white/15 p-6 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[250px] group bg-white dark:bg-zinc-950/40"
            >
              <div>
                <span className="text-xs tracking-widest text-black/35 dark:text-white/35 font-mono block mb-4">
                  {svc.no}
                </span>
                <InlineEdit
                  as="h3"
                  className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-black/80 dark:group-hover:text-white/80"
                  value={svc.title}
                  onSave={(value) => updateService(services.findIndex((item) => item.no === svc.no), "title", value)}
                />
                <InlineEdit
                  as="p"
                  multiline
                  className="text-sm text-black/60 dark:text-white/60 leading-relaxed font-medium"
                  value={svc.desc}
                  onSave={(value) => updateService(services.findIndex((item) => item.no === svc.no), "desc", value)}
                />
              </div>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* SELECTED PORTFOLIO PREVIEW */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold block mb-3">
              Karya Pilihan
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Proyek Terbaru</h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-night-bordeaux-600 dark:text-dark-cyan-400 hover:text-night-bordeaux-700 dark:hover:text-dark-cyan-300 transition-colors"
          >
            Lihat Semua Proyek <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project) => (
            <SpotlightCard
              key={project.id}
              className={`group min-h-[430px] flex flex-col justify-between border border-black/15 dark:border-white/15 ${project.color}`}
            >
              <div className="p-4 sm:p-5 md:p-6 pb-0">
                <div className="overflow-hidden border border-current/15 bg-white/20 dark:bg-black/15 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                  <div className="flex h-8 items-center gap-1.5 border-b border-current/10 bg-white/35 px-3 dark:bg-black/20">
                    <span className="h-2 w-2 rounded-full bg-current opacity-30" />
                    <span className="h-2 w-2 rounded-full bg-current opacity-20" />
                    <span className="h-2 w-2 rounded-full bg-current opacity-10" />
                  </div>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase opacity-60 font-semibold">{project.category}</span>
                  <span className="text-xs opacity-50 font-mono">{project.year}</span>
                </div>
                <div className="mt-6">
                  <InlineEdit
                    as="p"
                    className="text-xs tracking-widest uppercase opacity-55 mb-2"
                    value={project.client}
                    onSave={(value) => updateProject(project.id, "client", value)}
                  />
                  <InlineEdit
                    as="h3"
                    className="font-black uppercase tracking-tight leading-tight text-2xl md:text-3xl mb-3"
                    value={project.title}
                    onSave={(value) => updateProject(project.id, "title", value)}
                  />
                  <InlineEdit
                    as="p"
                    multiline
                    className="text-sm opacity-70 mb-4 leading-relaxed max-w-lg font-medium"
                    value={project.desc}
                    onSave={(value) => updateProject(project.id, "desc", value)}
                  />
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
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="mx-5 sm:mx-6 md:mx-12 mb-16 md:mb-20 bg-black text-white dark:bg-zinc-900 p-7 sm:p-10 md:p-20 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-black/10 dark:border-white/10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Punya Ide Proyek?</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Mari Kolaborasi<br />Dan Wujudkan!
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
