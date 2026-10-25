"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "./languageStore";
import { translations } from "@/data/translations";

export function useLanguage() {
  const { language, setLanguage, toggleLanguage } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync html lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = language || "en";
    }
  }, [language]);

  const activeLang = mounted ? language : "en";
  const t = translations[activeLang] || translations.en;

  return {
    language: activeLang,
    setLanguage,
    toggleLanguage,
    t,
    isMounted: mounted,
  };
}

export default useLanguage;
