"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Sparkles,
  Phone,
  ShieldCheck,
  Globe2,
  Send,
  Heart,
} from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";

export default function Footer() {
  const { config, updatePersonal } = usePortfolioStore();
  const { personal, services } = config;
  const { t, language } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.portfolio, href: "/portfolio" },
    { label: t.nav.apps || "Apps", href: "/apps" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--card-solid)] text-[var(--foreground)] transition-colors duration-300 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        {/* Top Segment: Brand & Value proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-12 lg:gap-16 pb-14 border-b border-[var(--border-subtle)]">
          {/* Left Column: Brand & Bio */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <InlineEdit
                  value={personal.initials}
                  onSave={(value) => updatePersonal("initials", value)}
                />
              </span>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight uppercase leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <InlineEdit
                    value={personal.name}
                    onSave={(value) => updatePersonal("name", value)}
                  />
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--foreground)]/50 font-semibold mt-1">
                  Portfolio Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-[var(--foreground)]/70 leading-relaxed max-w-sm font-normal mb-6">
              <InlineEdit
                value={personal.role}
                onSave={(value) => updatePersonal("role", value)}
              />{" "}
              {t.common.basedIn}{" "}
              <InlineEdit
                value={personal.location}
                onSave={(value) => updatePersonal("location", value)}
              />
              . {t.common.focusText}
            </p>

            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] text-xs font-semibold text-[var(--foreground)]/80 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span>{personal.availability || t.common.openToWork}</span>
            </div>
          </div>

          {/* Right Navigation & Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Quick Navigation */}
            <div>
              <h4 className="text-[11px] tracking-[0.22em] uppercase text-blue-600 dark:text-blue-400 font-bold mb-4">
                {t.common.navigation}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs sm:text-sm text-[var(--foreground)]/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium hover:translate-x-1 duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services Offered */}
            <div>
              <h4 className="text-[11px] tracking-[0.22em] uppercase text-blue-600 dark:text-blue-400 font-bold mb-4">
                {t.common.servicesTitle}
              </h4>
              <div className="flex flex-col gap-2.5">
                {services.slice(0, 4).map((service) => (
                  <Link
                    key={service.no}
                    href="/services"
                    className="text-xs sm:text-sm text-[var(--foreground)]/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium line-clamp-1 hover:translate-x-1 duration-200"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Direct Channels & Socials */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] tracking-[0.22em] uppercase text-blue-600 dark:text-blue-400 font-bold mb-4">
                {t.common.contactTitle}
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--foreground)]/75 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  <Mail size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate">{personal.email}</span>
                </a>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--foreground)]/60 font-medium">
                  <MapPin size={14} className="shrink-0" />
                  <span>{personal.location}</span>
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-2">
                {personal.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[var(--border-subtle)] bg-[var(--background)] hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={10} className="opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--foreground)]/50">
          <div className="flex items-center gap-2" suppressHydrationWarning>
            <span>© {new Date().getFullYear()} {personal.name}.</span>
            <span>·</span>
            <span>{t.common.allRights}</span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{t.common.startProject}</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
