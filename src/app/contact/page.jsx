"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import { portfolioConfig } from "@/data/portfolio";
import { ArrowRight, Check } from "lucide-react";

export default function ContactPage() {
  const { personal } = portfolioConfig;

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const contactInfo = [
    {
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      desc: "Balas dalam 24 jam",
    },
    {
      label: "WhatsApp",
      value: personal.phone,
      href: personal.phoneUrl,
      desc: "Senin – Jumat, 09.00–18.00",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ilhamddy",
      href: personal.socials.find((s) => s.label === "LinkedIn")?.href || "#",
      desc: "Koneksi profesional",
    },
  ];

  const services = [
    "Frontend Development",
    "IT Consulting",
    "Web Design & UI/UX",
    "Maintenance & Support",
    "Lainnya",
  ];

  const budgets = [
    "< Rp 5 Juta",
    "Rp 5 – 15 Juta",
    "Rp 15 – 50 Juta",
    "> Rp 50 Juta",
    "Perlu diskusi",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-black dark:bg-white" />
          <span className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold">
            Kontak
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="MARI" delay={0.05} />
            <br />
            <span className="text-stroke">BICARA</span>
          </h1>
          <p className="max-w-xs text-black/50 dark:text-white/50 text-sm leading-relaxed md:pb-3 font-medium">
            Punya proyek atau pertanyaan? Saya siap mendengarkan dan membantu Anda.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-12 lg:gap-16 xl:gap-24 items-start">
        {/* LEFT: FORM */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">
              <p className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 mb-10 font-bold">
                Isi formulir di bawah ini
              </p>

              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                <div
                  className={`border border-black/15 dark:border-white/15 relative transition-all duration-300 ${
                    focused === "name" ? "border-night-bordeaux-600 dark:border-dark-cyan-400" : ""
                  }`}
                >
                  <label className="absolute top-4 left-5 text-[10px] tracking-[0.3em] uppercase text-black/35 dark:text-white/35 font-bold pointer-events-none">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className="w-full pt-10 pb-5 px-5 bg-transparent text-sm font-semibold outline-none placeholder:text-black/25 dark:placeholder:text-white/25"
                    placeholder="Nama kamu"
                  />
                </div>

                <div
                  className={`border border-black/15 dark:border-white/15 sm:border-l-0 relative transition-all duration-300 ${
                    focused === "email" ? "border-night-bordeaux-600 dark:border-dark-cyan-400 sm:border-l" : ""
                  }`}
                >
                  <label className="absolute top-4 left-5 text-[10px] tracking-[0.3em] uppercase text-black/35 dark:text-white/35 font-bold pointer-events-none">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="w-full pt-10 pb-5 px-5 bg-transparent text-sm font-semibold outline-none placeholder:text-black/25 dark:placeholder:text-white/25"
                    placeholder="email@kamu.com"
                  />
                </div>
              </div>

              {/* Row: Service + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 -mt-px">
                <div
                  className={`border border-black/15 dark:border-white/15 relative transition-all duration-300 ${
                    focused === "service" ? "border-night-bordeaux-600 dark:border-dark-cyan-400" : ""
                  }`}
                >
                  <label className="absolute top-4 left-5 text-[10px] tracking-[0.3em] uppercase text-black/35 dark:text-white/35 font-bold pointer-events-none z-10">
                    Layanan yang Dibutuhkan
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onFocus={() => setFocused("service")}
                    onBlur={() => setFocused(null)}
                    className="w-full pt-10 pb-5 px-5 bg-white dark:bg-zinc-950 text-sm font-semibold outline-none appearance-none cursor-pointer text-black/70 dark:text-white/70"
                  >
                    <option value="">Pilih layanan...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none text-xs">
                    ▾
                  </span>
                </div>

                <div
                  className={`border border-black/15 dark:border-white/15 sm:border-l-0 relative transition-all duration-300 ${
                    focused === "budget" ? "border-night-bordeaux-600 dark:border-dark-cyan-400 sm:border-l" : ""
                  }`}
                >
                  <label className="absolute top-4 left-5 text-[10px] tracking-[0.3em] uppercase text-black/35 dark:text-white/35 font-bold pointer-events-none z-10">
                    Estimasi Budget
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    onFocus={() => setFocused("budget")}
                    onBlur={() => setFocused(null)}
                    className="w-full pt-10 pb-5 px-5 bg-white dark:bg-zinc-950 text-sm font-semibold outline-none appearance-none cursor-pointer text-black/70 dark:text-white/70"
                  >
                    <option value="">Pilih range...</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 pointer-events-none text-xs">
                    ▾
                  </span>
                </div>
              </div>

              {/* Message */}
              <div
                className={`border border-black/15 dark:border-white/15 -mt-px relative transition-all duration-300 ${
                  focused === "message" ? "border-night-bordeaux-600 dark:border-dark-cyan-400" : ""
                }`}
              >
                <label className="absolute top-4 left-5 text-[10px] tracking-[0.3em] uppercase text-black/35 dark:text-white/35 font-bold pointer-events-none">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full pt-10 pb-5 px-5 bg-transparent text-sm font-semibold outline-none resize-none placeholder:text-black/25 dark:placeholder:text-white/25"
                  placeholder="Ceritakan proyek atau pertanyaan kamu..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-0 border border-night-bordeaux-600 dark:border-dark-cyan-500 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black px-6 sm:px-10 py-5 text-sm tracking-widest uppercase font-bold hover:bg-transparent dark:hover:bg-transparent hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-500 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pesan
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SUCCESS STATE */
            <div className="border border-black/15 dark:border-white/15 p-8 sm:p-12 md:p-16 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-night-bordeaux-600 dark:bg-dark-cyan-500 flex items-center justify-center">
                <Check size={28} className="text-white dark:text-black" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">Pesan Terkirim!</h2>
                <p className="text-black/55 dark:text-white/55 leading-relaxed max-w-sm mx-auto font-medium">
                  Terima kasih, <strong className="text-black dark:text-white">{form.name}</strong>. Saya akan membalas email kamu dalam 24 jam ke depan.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", service: "", budget: "", message: "" });
                }}
                className="text-xs tracking-widest uppercase text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4 cursor-pointer font-bold"
              >
                Kirim pesan lain
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 mb-6 font-bold">
              Atau hubungi langsung
            </p>
            <div className="flex flex-col gap-px bg-black/10 dark:bg-white/10">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-black p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-night-bordeaux-600 hover:text-white dark:hover:bg-dark-cyan-500 dark:hover:text-black border border-black/5 dark:border-white/5 transition-all duration-300"
                >
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/35 dark:text-white/35 group-hover:text-white/45 dark:group-hover:text-black/45 block mb-1 font-bold">
                      {info.label}
                    </span>
                    <span className="text-sm font-black break-all">{info.value}</span>
                    <span className="block text-xs text-black/40 dark:text-white/40 group-hover:text-white/45 dark:group-hover:text-black/45 mt-0.5 font-medium">
                      {info.desc}
                    </span>
                  </div>
                  <span className="text-black/25 dark:text-white/25 group-hover:text-white/50 dark:group-hover:text-black/50 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="border border-black/15 dark:border-white/15 p-5 sm:p-6 bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-night-bordeaux-500 rounded-full animate-pulse" />
              <span className="text-xs tracking-widest uppercase font-bold">
                Tersedia untuk proyek baru
              </span>
            </div>
            <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed font-medium">
              Saat ini saya membuka kolaborasi untuk proyek freelance. Hubungi saya sekarang untuk slot terbatas.
            </p>
          </div>

          <div className="bg-black text-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-5 sm:p-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 dark:text-white/40 mb-2 font-bold">
              Waktu Respons
            </p>
            <p className="text-3xl font-black mb-1">&lt; 24 Jam</p>
            <p className="text-xs text-white/50 dark:text-white/50 leading-relaxed font-medium">
              Saya membalas setiap pesan masuk pada hari kerja. Weekend mungkin sedikit lebih lama.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
