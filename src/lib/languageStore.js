"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: "en", // default is English ('en' | 'id')
      setLanguage: (lang) => set({ language: lang === "id" ? "id" : "en" }),
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "id" : "en",
        })),
    }),
    {
      name: "ilhamddy-language-preference-v2",
      version: 1,
    }
  )
);
