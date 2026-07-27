"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import { usePortfolioStore } from "@/lib/portfolioStore";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { config, updatePersonal } = usePortfolioStore();
  const { personal, navLinks } = config;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    queueMicrotask(() => setDarkMode(isDark));
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none select-none text-black dark:text-white">
            <InlineEdit
              value={personal.initials}
              onSave={(value) => updatePersonal("initials", value)}
            />
          </span>
          <span className="hidden sm:block w-px h-5 bg-black/40 dark:bg-white/40" />
          <span className="hidden sm:block text-xs tracking-[0.25em] uppercase text-black/60 dark:text-white/60 font-medium">
            <InlineEdit
              value={personal.name}
              onSave={(value) => updatePersonal("name", value)}
            />
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-semibold transition-colors duration-200 relative group ${
                  isActive
                    ? "text-night-bordeaux-600 dark:text-dark-cyan-400"
                    : "text-black/50 dark:text-white/50 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-night-bordeaux-600 dark:bg-dark-cyan-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 border border-black/15 dark:border-white/15 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 text-black dark:text-white cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black text-xs tracking-widest uppercase px-5 py-2.5 font-bold hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-colors duration-200"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 border border-black/15 dark:border-white/15 text-black dark:text-white"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="p-2 text-black dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white dark:bg-black border-t border-black/10 dark:border-white/10`}
      >
        <nav className="flex flex-col px-5 sm:px-6 py-4 gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-bold transition-colors ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-2 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black text-xs tracking-widest uppercase px-5 py-3 font-bold text-center hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-colors duration-200"
          >
            Hire Me
          </Link>
        </nav>
      </div>
    </header>
  );
}
