"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import FadeIn from "@/components/reactbits/FadeIn";
import MagneticButton from "@/components/reactbits/MagneticButton";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import StaggerContainer, { StaggerItem } from "@/components/reactbits/StaggerContainer";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  Copy,
  CheckCheck,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const { config } = usePortfolioStore();
  const { personal } = config;
  const { t, language } = useLanguage();

  const services = t.contact.serviceOptions;
  const budgets = t.contact.budgetOptions;

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: services[0] || "Frontend Development",
    budget: budgets[1] || budgets[0] || "Rp 5 – 15 Jt",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactChannels = [
    {
      label: t.contact.emailLabel,
      value: personal.email,
      href: `mailto:${personal.email}`,
      desc: t.contact.emailDesc,
      icon: Mail,
      action: "copy",
    },
    {
      label: "WhatsApp",
      value: personal.phone,
      href: personal.phoneUrl,
      desc: t.contact.waDesc,
      icon: MessageCircle,
      action: "link",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ilhamddy",
      href: personal.socials.find((s) => s.label === "LinkedIn")?.href || "https://linkedin.com",
      desc: t.contact.linkedInDesc,
      icon: ArrowUpRight,
      action: "link",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 overflow-x-hidden relative page-enter">
      <AnimatedBackground />
      <Navbar />

      {/* ============================================================ */}
      {/* 1. PAGE HEADER                                              */}
      {/* ============================================================ */}
      <section className="pt-28 sm:pt-36 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-b border-[var(--border-subtle)]">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
              {t.contact.badge}
            </span>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <FadeIn delay={0.15}>
              <h1 className="text-[clamp(2.3rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.08] text-[var(--foreground)] max-w-2xl text-balance">
                {t.contact.title1}{" "}
                <span className="font-italic-serif font-normal text-[var(--foreground)]">
                  {t.contact.titleAccent}
                </span>
              </h1>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="right">
            <div className="max-w-sm">
              <p className="text-[var(--foreground)]/70 text-sm leading-relaxed mb-4 font-normal">
                {t.contact.subtitle}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] text-xs font-semibold text-[var(--foreground)]/80">
                <span className="relative w-2 h-2 rounded-full bg-emerald-500">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                </span>
                <span>{personal.availability || t.contact.availablePill}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT: FORM + DIRECT CHANNELS                     */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_420px] gap-10 lg:gap-14 items-start">
        {/* LEFT: INTERACTIVE CONTACT FORM */}
        <FadeIn direction="left" duration={0.6}>
          <div className="p-6 sm:p-10 md:p-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/90 backdrop-blur-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[var(--glow-primary)] to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-60" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 flex flex-col gap-8"
                >
                  <div>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--primary)] font-bold block mb-2">
                      {t.contact.formBadge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                      {t.contact.formTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--foreground)]/60 mt-1 font-normal">
                      {t.contact.formSubtitle}
                    </p>
                  </div>

                  {/* 1. SERVICE CHIPS SELECTION */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 block mb-3">
                      {t.contact.serviceLabel}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((svc) => {
                        const isSelected = form.service === svc;
                        return (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => setForm({ ...form, service: svc })}
                            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-[var(--primary)] text-[var(--primary-fg)] shadow-sm scale-102"
                                : "border border-[var(--border-subtle)] bg-[var(--background)]/60 text-[var(--foreground)]/75 hover:border-[var(--primary)] hover:text-[var(--foreground)]"
                            }`}
                          >
                            {isSelected && <Check size={13} strokeWidth={3} />}
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. BUDGET CHIPS SELECTION */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 block mb-3">
                      {t.contact.budgetLabel}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => {
                        const isSelected = form.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm({ ...form, budget: b })}
                            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-[var(--primary)] text-[var(--primary-fg)] shadow-sm scale-102"
                                : "border border-[var(--border-subtle)] bg-[var(--background)]/60 text-[var(--foreground)]/75 hover:border-[var(--primary)] hover:text-[var(--foreground)]"
                            }`}
                          >
                            {isSelected && <Check size={13} strokeWidth={3} />}
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. NAME & EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 block mb-2">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)]/80 text-sm font-medium outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--glow-primary)] transition-all placeholder:text-[var(--foreground)]/30"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 block mb-2">
                        {t.contact.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)]/80 text-sm font-medium outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--glow-primary)] transition-all placeholder:text-[var(--foreground)]/30"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </div>

                  {/* 4. MESSAGE TEXTAREA */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 block mb-2">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)]/80 text-sm font-medium outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--glow-primary)] transition-all resize-none placeholder:text-[var(--foreground)]/30 leading-relaxed"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  {/* 5. SUBMIT BUTTON & ASSURANCE */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full sm:w-auto inline-flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t.contact.submitting}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.contact.submitButton}</span>
                            <Send size={14} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <span className="text-[11px] text-[var(--foreground)]/50 font-medium text-center sm:text-right flex items-center justify-center sm:justify-end gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                      {t.contact.privacyNote}
                    </span>
                  </div>
                </motion.form>
              ) : (
                /* SUCCESS STATE */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="py-14 px-6 text-center flex flex-col items-center gap-6 relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                    <Check size={38} strokeWidth={2.5} />
                  </div>
                  <div className="max-w-md">
                    <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 block mb-2">
                      {t.contact.successBadge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3">
                      {t.contact.successTitle.replace("{name}", form.name || (language === "en" ? "Friend" : "Kawan"))}
                    </h3>
                    <p className="text-[var(--foreground)]/70 leading-relaxed text-sm font-normal">
                      {t.contact.successMessage
                        .replace("{service}", form.service)
                        .replace("{email}", form.email)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        service: services[0] || "Frontend Development",
                        budget: budgets[1] || budgets[0] || "Rp 5 – 15 Jt",
                        message: "",
                      });
                    }}
                    className="btn-secondary text-xs uppercase tracking-wider font-bold cursor-pointer mt-2"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* RIGHT: DIRECT CHANNELS & ASSURANCE CARDS */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          {/* DIRECT CHANNELS */}
          <FadeIn direction="right" delay={0.2}>
            <div className="p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 backdrop-blur-xl shadow-sm">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--primary)] font-bold block mb-4">
                {t.contact.directChannels}
              </span>

              <div className="flex flex-col gap-3">
                {contactChannels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="group p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)]/60 hover:border-[var(--primary)]/60 hover:bg-[var(--background)] transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--primary)] shrink-0 group-hover:scale-105 transition-transform">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] tracking-wider uppercase font-bold text-[var(--foreground)]/50 block">
                            {item.label}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[var(--foreground)] truncate block group-hover:text-[var(--primary)] transition-colors">
                            {item.value}
                          </span>
                          <span className="text-[11px] text-[var(--foreground)]/50 truncate block mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>

                      {item.action === "copy" ? (
                        <button
                          onClick={handleCopyEmail}
                          title={t.contact.copyEmail}
                          className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all cursor-pointer shrink-0"
                          aria-label={t.contact.copyEmail}
                        >
                          {copiedEmail ? (
                            <CheckCheck size={16} className="text-emerald-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all shrink-0"
                          aria-label={`Open ${item.label}`}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* RESPONSE TIME & SLA */}
          <FadeIn direction="right" delay={0.35}>
            <div className="p-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/85 backdrop-blur-xl shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl border border-[var(--border-subtle)] bg-[var(--background)] text-[var(--primary)] flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase font-bold text-[var(--foreground)]/50 mb-1">
                  {t.contact.responseTimeTitle}
                </p>
                <p className="text-xl font-bold text-[var(--foreground)]">{t.contact.responseTimeValue}</p>
                <p className="text-xs text-[var(--foreground)]/65 mt-1 leading-relaxed font-normal">
                  {t.contact.responseTimeDesc}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* WHAT WE OFFER / ASSURANCE */}
          <FadeIn direction="right" delay={0.5}>
            <div className="p-6 rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--card-bg)] to-[var(--background)] backdrop-blur-xl shadow-sm">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--primary)] font-bold block mb-3">
                {t.contact.whatYouGet}
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--foreground)]/75">
                {t.contact.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
