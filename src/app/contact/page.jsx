"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/reactbits/SplitText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { ArrowRight, Check, Mail, MessageCircle, Clock, Sparkles } from "lucide-react";

export default function ContactPage() {
  const { config } = usePortfolioStore();
  const { personal } = config;

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      desc: "Balas dalam < 24 jam",
    },
    {
      label: "WhatsApp",
      value: personal.phone,
      href: personal.phoneUrl,
      desc: "Senin – Jumat, 09.00–18.00 WIB",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ilhamddy",
      href: personal.socials.find((s) => s.label === "LinkedIn")?.href || "https://linkedin.com",
      desc: "Koneksi profesional & jejaring",
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
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-28 sm:pt-32 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[var(--primary)]" />
          <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
            Kontak
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-[clamp(2.6rem,13vw,7rem)] font-black uppercase tracking-tighter leading-[0.9]">
            <SplitText text="MARI" delay={0.05} />
            <br />
            <span className="text-stroke">BICARA</span>
          </h1>
          <p className="max-w-xs text-[var(--foreground)]/60 text-sm leading-relaxed md:pb-3 font-medium">
            Punya ide proyek atau butuh konsultasi teknis? Saya siap mendengarkan dan mendiskusikan solusi terbaik.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-12 lg:gap-16 xl:gap-20 items-start">
        {/* LEFT: FORM */}
        <div className="p-6 sm:p-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold block mb-1">
                  Kirim Pesan
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight">Formulir Diskusi Proyek</h2>
              </div>

              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/60 block mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] text-sm font-semibold outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--foreground)]/30"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/60 block mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] text-sm font-semibold outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--foreground)]/30"
                    placeholder="nama@perusahaan.com"
                  />
                </div>
              </div>

              {/* Row: Service + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/60 block mb-2">
                    Layanan Dibutuhkan
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] text-sm font-semibold outline-none focus:border-[var(--primary)] transition-colors cursor-pointer text-[var(--foreground)]"
                  >
                    <option value="">Pilih layanan...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/60 block mb-2">
                    Estimasi Budget
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] text-sm font-semibold outline-none focus:border-[var(--primary)] transition-colors cursor-pointer text-[var(--foreground)]"
                  >
                    <option value="">Pilih rentang...</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/60 block mb-2">
                  Pesan atau Detail Kebutuhan *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--background)] text-sm font-semibold outline-none focus:border-[var(--primary)] transition-colors resize-none placeholder:text-[var(--foreground)]/30"
                  placeholder="Ceritakan gambaran singkat proyek atau kebutuhan teknologi Anda..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)] px-8 py-4 text-xs tracking-widest uppercase font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pesan
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SUCCESS STATE */
            <div className="py-12 px-6 text-center flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center">
                <Check size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">Pesan Terkirim!</h2>
                <p className="text-[var(--foreground)]/65 leading-relaxed max-w-sm mx-auto font-medium text-sm">
                  Terima kasih, <strong className="text-[var(--foreground)]">{form.name}</strong>. Saya akan meninjau dan membalas email Anda dalam waktu 24 jam.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", service: "", budget: "", message: "" });
                }}
                className="mt-2 text-xs tracking-widest uppercase text-[var(--primary)] hover:underline font-bold cursor-pointer"
              >
                Kirim pesan lain →
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: INFO CARDS */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold block mb-4">
              Kontak Langsung
            </span>
            <div className="flex flex-col gap-3">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/75 backdrop-blur-sm flex items-center justify-between gap-4 hover:border-[var(--primary)] transition-all shadow-sm"
                >
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[var(--primary)] font-bold block mb-1">
                      {info.label}
                    </span>
                    <span className="text-sm font-bold block group-hover:text-[var(--primary)] transition-colors break-all">
                      {info.value}
                    </span>
                    <span className="text-xs text-[var(--foreground)]/50 mt-0.5 block">
                      {info.desc}
                    </span>
                  </div>
                  <span className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--foreground)]/40 group-hover:text-[var(--primary)] group-hover:border-[var(--primary)] transition-all">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs tracking-wider uppercase font-bold text-[var(--foreground)]">
                Tersedia untuk proyek baru
              </span>
            </div>
            <p className="text-xs text-[var(--foreground)]/60 leading-relaxed font-medium">
              Menerima freelance dan konsultasi teknis. Konsultasikan ide Anda untuk mendiskusikan timeline dan roadmap.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/60 backdrop-blur-sm flex items-start gap-4">
            <div className="p-3 rounded-lg border border-[var(--border-subtle)] text-[var(--primary)]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase font-bold text-[var(--foreground)]/50 mb-1">
                Waktu Respons
              </p>
              <p className="text-2xl font-black">&lt; 24 Jam</p>
              <p className="text-xs text-[var(--foreground)]/55 mt-1 font-medium">
                Respon cepat di hari kerja (Senin–Jumat).
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
