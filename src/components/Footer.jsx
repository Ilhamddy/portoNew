"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";

export default function Footer() {
  const { config, updatePersonal } = usePortfolioStore();
  const { personal, navLinks, services } = config;

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_2fr] gap-10 md:gap-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none group-hover:text-[var(--primary)] transition-colors">
                <InlineEdit
                  value={personal.initials}
                  onSave={(value) => updatePersonal("initials", value)}
                />
              </span>
              <span className="w-px h-5 bg-[var(--border-subtle)]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[var(--foreground)]/60 font-bold group-hover:text-[var(--foreground)] transition-colors">
                <InlineEdit
                  value={personal.name}
                  onSave={(value) => updatePersonal("name", value)}
                />
              </span>
            </Link>
            <p className="text-sm text-[var(--foreground)]/65 leading-relaxed max-w-sm font-medium">
              <InlineEdit
                value={personal.role}
                onSave={(value) => updatePersonal("role", value)}
              />{" "}
              berbasis di{" "}
              <InlineEdit
                value={personal.location}
                onSave={(value) => updatePersonal("location", value)}
              />
              , fokus membangun produk digital berkinerja tinggi, elegan, dan berdampak nyata.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 border border-[var(--border-subtle)] bg-[var(--background)] px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] tracking-wider uppercase font-bold text-[var(--foreground)]/70">
                {personal.availability}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-4">
                Navigasi
              </h4>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-4">
                Layanan
              </h4>
              <div className="flex flex-col gap-2.5">
                {services.slice(0, 4).map((service) => (
                  <Link
                    key={service.no}
                    href="/services"
                    className="text-sm text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors font-medium line-clamp-1"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-4">
                Kontak
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors font-medium"
                >
                  <Mail size={14} className="text-[var(--primary)]" />
                  Email
                </a>
                <span className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]/50 font-medium">
                  <MapPin size={14} />
                  {personal.location}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] tracking-[0.25em] uppercase text-[var(--primary)] font-bold mb-4">
                Sosial
              </h4>
              <div className="flex flex-col gap-2.5">
                {personal.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors font-medium"
                  >
                    {social.label}
                    <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs text-[var(--foreground)]/45 tracking-widest uppercase font-medium" suppressHydrationWarning>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </span>
          <Link
            href="/contact"
            className="text-xs tracking-widest uppercase font-bold text-[var(--primary)] hover:underline transition-colors flex items-center gap-1"
          >
            Mulai Diskusi Proyek <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
