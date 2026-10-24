"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";

function subscribeTheme(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getThemeServerSnapshot() {
  return false;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const darkMode = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const pathname = usePathname();
  const { config, updatePersonal } = usePortfolioStore();
  const { personal, navLinks } = config;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Tiimo-style bold lowercase wordmark */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-[var(--foreground)] group-hover:opacity-80 transition-opacity lowercase">
            <InlineEdit
              value={personal.name || "ilhamddy"}
              onSave={(value) => updatePersonal("name", value)}
            />
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)] self-end mb-1" />
        </Link>

        {/* Desktop Nav - Centered Tiimo Style */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wider font-semibold transition-all duration-200 relative py-1 ${isActive
                    ? "text-[var(--foreground)] font-bold"
                    : "text-[var(--foreground)]/65 hover:text-[var(--foreground)]"
                  }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--foreground)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons - Pill style with circular arrow */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] hover:bg-[var(--foreground)]/10 transition-colors text-[var(--foreground)] cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
          </button>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)] text-xs tracking-wide px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm"
          >
            <span>Hubungi Saya</span>
            <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={12} />
            </span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-[var(--border-subtle)] text-[var(--foreground)]"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
          </button>
          <button
            className="p-2 text-[var(--foreground)] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100 border-b border-[var(--border-subtle)] shadow-xl" : "max-h-0 opacity-0 pointer-events-none"
          } bg-[var(--background)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)]`}
      >
        <nav className="flex flex-col px-6 py-5 gap-3.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-wider font-semibold transition-colors py-1.5 flex items-center justify-between ${isActive
                    ? "text-[var(--foreground)] font-bold"
                    : "text-[var(--foreground)]/65 hover:text-[var(--foreground)]"
                  }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]" />}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--primary-fg)] text-xs tracking-wide px-5 py-3 rounded-full font-bold transition-colors shadow-sm"
          >
            <span>Hubungi Saya</span>
            <ArrowUpRight size={14} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
