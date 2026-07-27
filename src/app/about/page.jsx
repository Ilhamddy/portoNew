"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";

export default function AboutPage() {
  const { config, updatePersonal, updatePersonalList } = usePortfolioStore();
  const { personal, skills, experiences } = config;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-black dark:bg-white" />
          <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">
            Tentang Saya
          </span>
        </div>
        <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
          <SplitText text="WHO I" delay={0.05} />
          <br />
          <span className="text-stroke">AM</span>
        </h1>
      </section>

      {/* BIO SECTION */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Profile visual */}
        <div className="relative">
          <div className="relative bg-black dark:bg-zinc-900 aspect-[3/4] w-full max-w-xs sm:max-w-sm overflow-hidden border border-black/10 dark:border-white/10">
            <Image
              src="/profile.jpg"
              alt={personal.name}
              fill
              sizes="(min-width: 1024px) 384px, 100vw"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            />
            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 w-16 h-16 border-t border-l border-white/20 z-10" />
          </div>
          {/* Offset decorative border */}
          <div className="absolute -bottom-4 -right-4 w-full max-w-xs sm:max-w-sm h-full border border-black/15 dark:border-white/15 -z-10" />
          {/* Availability badge */}
          <div className="absolute -top-4 right-0 sm:-right-4 bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-xs tracking-widest uppercase font-semibold">
            {personal.availability}
          </div>
        </div>

        {/* Right: Bio text */}
        <div className="flex flex-col gap-8">
          <div>
            <InlineEdit
              as="h2"
              className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 leading-tight"
              value={personal.name}
              onSave={(value) => updatePersonal("name", value)}
            />
            {personal.detailedBio.map((paragraph, i) => (
              <InlineEdit
                key={i}
                as="p"
                multiline
                className="text-black/60 dark:text-white/60 leading-relaxed mb-4 font-medium"
                value={paragraph}
                onSave={(value) => updatePersonalList("detailedBio", i, value)}
              />
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-b border-black/10 dark:border-white/10 py-6">
            {personal.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black">{s.num}</div>
                <div className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40 mt-1 font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black px-8 py-4 text-sm tracking-widest uppercase font-bold hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-all duration-300 w-fit"
          >
            Hubungi Saya
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 dark:border-white/10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-14">Keahlian</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/15 dark:bg-white/15">
          {skills.map((group) => (
            <div key={group.category} className="bg-white dark:bg-black p-6 md:p-8">
              <h3 className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 mb-6 font-bold">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-black/20 dark:border-white/20 px-3 py-1.5 text-sm font-semibold hover:bg-night-bordeaux-600 hover:text-white dark:hover:bg-dark-cyan-500 dark:hover:text-black hover:border-night-bordeaux-600 dark:hover:border-dark-cyan-500 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-black/10 dark:border-white/10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-14">Pengalaman</h2>
        <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors -mx-4 px-4"
            >
              <div>
                <span className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40 font-mono font-bold">
                  {exp.year}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-1">{exp.role}</h3>
                <p className="text-sm text-black/50 dark:text-white/50 tracking-widest uppercase mb-3 font-semibold">
                  {exp.company}
                </p>
                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed font-medium">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
