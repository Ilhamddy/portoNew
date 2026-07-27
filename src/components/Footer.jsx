"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";

export default function Footer() {
  const { config, updatePersonal } = usePortfolioStore();
  const { personal, navLinks, services } = config;

  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-10 md:gap-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none">
                <InlineEdit
                  value={personal.initials}
                  onSave={(value) => updatePersonal("initials", value)}
                />
              </span>
              <span className="w-px h-6 bg-black/25 dark:bg-white/25" />
              <span className="text-xs tracking-[0.25em] uppercase text-black/55 dark:text-white/55 font-bold">
                <InlineEdit
                  value={personal.name}
                  onSave={(value) => updatePersonal("name", value)}
                />
              </span>
            </Link>
            <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed max-w-sm font-medium">
              <InlineEdit
                value={personal.role}
                onSave={(value) => updatePersonal("role", value)}
              />{" "}
              berbasis di{" "}
              <InlineEdit
                value={personal.location}
                onSave={(value) => updatePersonal("location", value)}
              />
              , fokus membangun produk digital yang cepat, rapi, dan siap digunakan.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 border border-black/10 dark:border-white/10 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-night-bordeaux-500 dark:bg-dark-cyan-500" />
              <span className="text-[10px] tracking-[0.22em] uppercase font-bold text-black/50 dark:text-white/50">
                {personal.availability}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[10px] tracking-[0.28em] uppercase text-black/40 dark:text-white/40 font-bold mb-4">
                Menu
              </h4>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-black/65 dark:text-white/65 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors font-semibold"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.28em] uppercase text-black/40 dark:text-white/40 font-bold mb-4">
                Layanan
              </h4>
              <div className="flex flex-col gap-2.5">
                {services.slice(0, 3).map((service) => (
                  <Link
                    key={service.no}
                    href="/services"
                    className="text-sm text-black/65 dark:text-white/65 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors font-semibold"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.28em] uppercase text-black/40 dark:text-white/40 font-bold mb-4">
                Kontak
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 text-sm text-black/65 dark:text-white/65 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors font-semibold"
                >
                  <Mail size={14} />
                  Email
                </a>
                <span className="inline-flex items-center gap-2 text-sm text-black/45 dark:text-white/45 font-semibold">
                  <MapPin size={14} />
                  {personal.location}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.28em] uppercase text-black/40 dark:text-white/40 font-bold mb-4">
                Sosial
              </h4>
              <div className="flex flex-col gap-2.5">
                {personal.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-black/65 dark:text-white/65 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors font-semibold"
                  >
                    {social.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs text-black/35 dark:text-white/35 tracking-widest uppercase" suppressHydrationWarning>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </span>
          <Link
            href="/contact"
            className="text-xs tracking-widest uppercase font-bold text-night-bordeaux-600 dark:text-dark-cyan-400 hover:text-night-bordeaux-700 dark:hover:text-dark-cyan-300 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </footer>
  );
}
