"use client";

import { useState, useEffect, useSyncExternalStore, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Moon,
  Sun,
  Globe,
  Home,
  User,
  Compass,
  Layers,
  Sparkles,
  Send,
  Search,
  X,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolioStore";
import { useLanguage } from "@/lib/useLanguage";

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

// Generates the smooth scooped curve (notch) for 6 mobile bottom tabs
function getNotchPath(activeIndex, totalTabs = 6) {
  const tabWidth = 1000 / totalTabs;
  const cx = activeIndex * tabWidth + tabWidth / 2;
  const w = 48; // half width of curve
  const d = 32; // depth of scoop
  const left = cx - w;
  const right = cx + w;

  return `M 0,0 L ${left},0 C ${left + 18},0 ${cx - 28},${d} ${cx},${d} C ${cx + 28},${d} ${right - 18},0 ${right},0 L 1000,0 L 1000,72 L 0,72 Z`;
}

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const darkMode = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const pathname = usePathname();
  const { config } = usePortfolioStore();
  const { personal, projects, services } = config;
  const { language, toggleLanguage, t } = useLanguage();

  // Scroll detection for dynamic mobile navbar (hides on scroll down, shows on scroll up)
  const { scrollY } = useScroll();
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (latest < 40) {
      setMobileNavVisible(true);
    } else if (diff > 8) {
      setMobileNavVisible(false);
    } else if (diff < -8) {
      setMobileNavVisible(true);
    }
    lastScrollY.current = latest;
  });

  // Navigation items matching previous menu
  const navLinks = [
    { label: t.nav.home || "Home", href: "/", icon: Home },
    { label: t.nav.about || "About", href: "/about", icon: User },
    { label: t.nav.services || "Services", href: "/services", icon: Compass },
    { label: t.nav.portfolio || "Portfolio", href: "/portfolio", icon: Layers },
    { label: t.nav.apps || "Apps", href: "/apps", icon: Sparkles },
    { label: t.nav.contact || "Contact", href: "/contact", icon: Send },
  ];

  const getActiveIndex = () => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/about")) return 1;
    if (pathname.startsWith("/services")) return 2;
    if (pathname.startsWith("/portfolio")) return 3;
    if (pathname.startsWith("/apps")) return 4;
    if (pathname.startsWith("/contact")) return 5;
    return 0;
  };

  const activeIndex = getActiveIndex();
  const email = personal.email || "hello@ilhamddy.com";

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleEmailClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard shortcut Ctrl+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter search results
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.some((tc) => tc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP FLOATING PILL NAVBAR                              */}
      {/* ============================================================ */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 hidden md:flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-fit rounded-full transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border p-1.5 sm:p-2 bg-white text-black border-black/10 dark:bg-[#121316] dark:text-white dark:border-white/10 dark:shadow-[0_16px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center justify-between gap-4 lg:gap-6">
          
          {/* Left: Circle Logo Button */}
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 bg-[#111113] text-white dark:bg-white dark:text-black shadow-sm"
            title="Home"
            aria-label="Home"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M10.8 3H19.5V21H14.8V15.2H9.2L6.8 21H2L10.8 3ZM10.8 11.2H14.8V7.5L10.8 11.2Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          {/* Nav Links Matching Previous Menu */}
          <nav className="flex items-center gap-4 lg:gap-6 px-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-normal font-medium transition-colors py-1 ${
                    isActive
                      ? "text-black dark:text-white font-bold"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/8 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-semibold transition-all cursor-pointer"
            title="Search projects, services, stack (Ctrl+K)"
          >
            <Search size={13} className="text-neutral-500 dark:text-neutral-400" />
            <span className="hidden lg:inline">{language === "id" ? "Cari..." : "Search..."}</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 opacity-70">
              ⌘K
            </kbd>
          </button>

          {/* Right Section: Controls & Email Pill */}
          <div className="flex items-center gap-2">
            {/* Desktop Lang & Theme */}
            <div className="flex items-center gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2 mr-0.5">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 rounded-full text-[11px] font-bold text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                title={language === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
              >
                <Globe size={12} />
                <span>{language.toUpperCase()}</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-full text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
              </button>
            </div>

            {/* Email Pill Button */}
            <Link
              href="/contact"
              onClick={handleEmailClick}
              title="Click to open Contact / Copy Email"
              className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] px-5 sm:px-6 py-2.5 bg-[#111113] text-white dark:bg-white dark:text-black shadow-md cursor-pointer select-none"
              style={
                !darkMode
                  ? {
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22), transparent 75%), #111113",
                    }
                  : undefined
              }
            >
              <span>{copied ? "Copied!" : email}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MOBILE TOP MINIMAL BRAND HEADER                           */}
      {/* ============================================================ */}
      <motion.div
        animate={{ y: mobileNavVisible ? 0 : -80, opacity: mobileNavVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 left-4 right-4 z-40 md:hidden flex items-center justify-between pointer-events-none"
      >
        {/* Circle Logo */}
        <Link
          href="/"
          className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center bg-[#111113] text-white dark:bg-white dark:text-black shadow-md active:scale-95 transition-transform"
          aria-label="Home"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M10.8 3H19.5V21H14.8V15.2H9.2L6.8 21H2L10.8 3ZM10.8 11.2H14.8V7.5L10.8 11.2Z" fill="currentColor" />
          </svg>
        </Link>

        {/* Quick Search, Theme & Language Switches */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#121316]/90 backdrop-blur-md shadow-sm">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
            aria-label="Search"
          >
            <Search size={14} />
          </button>
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-full text-[11px] font-bold text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
            aria-label="Toggle language"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
          </button>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 3. MOBILE CURVED BOTTOM NOTCH NAVIGATION BAR (Dinamis / Auto-Hide) */}
      {/* ============================================================ */}
      <motion.div
        animate={{ y: mobileNavVisible ? 0 : 96 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 inset-x-0 z-50 md:hidden pointer-events-auto"
      >
        <div className="relative h-[68px] w-full">
          {/* Smooth SVG Scooped Notch Curve */}
          <svg
            className="absolute top-0 left-0 w-full h-[68px] overflow-visible text-white dark:text-[#121316] drop-shadow-[0_-4px_16px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_-8px_24px_rgba(0,0,0,0.5)]"
            viewBox="0 0 1000 68"
            preserveAspectRatio="none"
          >
            <motion.path
              d={getNotchPath(activeIndex, navLinks.length)}
              fill="currentColor"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          </svg>

          {/* 6 Bottom Nav Items (Home, About, Services, Portfolio, Apps, Contact) */}
          <div className="relative z-10 grid grid-cols-6 h-full items-center">
            {navLinks.map((item, index) => {
              const isActive = activeIndex === index;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center h-full text-center select-none cursor-pointer"
                >
                  {isActive ? (
                    <>
                      {/* Elevated Floating Circular Button with Spring Transition */}
                      <motion.div
                        layoutId="mobileActiveBubble"
                        className="absolute -top-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white text-black border border-black/[0.08] dark:bg-[#1E2026] dark:text-white dark:border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      >
                        <Icon size={19} className="stroke-[2.2]" />
                      </motion.div>
                      {/* Text Label inside Scoop */}
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-tight text-black dark:text-white mt-5">
                        {item.label}
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                      <Icon size={18} className="stroke-[1.8]" />
                      <span className="text-[9px] sm:text-[10px] font-medium tracking-tight mt-1 opacity-80">
                        {item.label}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Safe Area Padding for modern smartphones */}
        <div className="h-[env(safe-area-inset-bottom,8px)] bg-white dark:bg-[#121316]" />
      </motion.div>

      {/* ============================================================ */}
      {/* 4. MODAL SEARCH DIALOG (Ctrl+K)                              */}
      {/* ============================================================ */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141A] text-[var(--foreground)] shadow-2xl overflow-hidden z-10"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
                <Search size={18} className="text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder={language === "id" ? "Cari proyek, teknologi, layanan..." : "Search projects, stack, services..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-none outline-none text-sm text-[var(--foreground)] placeholder:text-neutral-400"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                {/* Navigation links */}
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-2">
                    {language === "id" ? "Halaman Cepat" : "Quick Pages"}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {navLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setSearchOpen(false)}
                        className="p-2 rounded-lg border border-neutral-100 dark:border-neutral-800 hover:border-blue-500/30 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs font-semibold flex items-center justify-between"
                      >
                        <span>{l.label}</span>
                        <ArrowRight size={11} className="text-neutral-400" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {filteredProjects.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-2">
                      {language === "id" ? "Proyek" : "Projects"}
                    </div>
                    <div className="space-y-1.5">
                      {filteredProjects.map((p) => (
                        <Link
                          key={p.id}
                          href="/portfolio"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs transition-colors"
                        >
                          <div>
                            <span className="font-bold">{p.title}</span>
                            <span className="text-[10px] text-neutral-400 ml-2">({p.category})</span>
                          </div>
                          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-semibold">
                            {p.tech.slice(0, 2).join(", ")}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {filteredServices.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-2">
                      {language === "id" ? "Layanan" : "Services"}
                    </div>
                    <div className="space-y-1.5">
                      {filteredServices.map((s) => (
                        <Link
                          key={s.no}
                          href="/services"
                          onClick={() => setSearchOpen(false)}
                          className="block p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs transition-colors"
                        >
                          <div className="font-bold">{s.title}</div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{s.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Navigasi cepat keyboard</span>
                <span>ESC untuk tutup</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
