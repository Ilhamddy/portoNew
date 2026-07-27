"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { portfolioConfig } from "@/data/portfolio";

const cloneConfig = (value) => JSON.parse(JSON.stringify(value));

export const usePortfolioStore = create(
  persist(
    (set) => ({
      config: cloneConfig(portfolioConfig),
      updatePersonal: (field, value) =>
        set((state) => ({
          config: {
            ...state.config,
            personal: {
              ...state.config.personal,
              [field]: value,
            },
          },
        })),
      updatePersonalList: (field, index, value) =>
        set((state) => ({
          config: {
            ...state.config,
            personal: {
              ...state.config.personal,
              [field]: state.config.personal[field].map((item, itemIndex) =>
                itemIndex === index ? value : item
              ),
            },
          },
        })),
      updateHeroSlide: (slideIndex, field, value) =>
        set((state) => ({
          config: {
            ...state.config,
            heroSlides: state.config.heroSlides.map((slide, index) =>
              index === slideIndex ? { ...slide, [field]: value } : slide
            ),
          },
        })),
      updateService: (serviceIndex, field, value) =>
        set((state) => ({
          config: {
            ...state.config,
            services: state.config.services.map((service, index) =>
              index === serviceIndex ? { ...service, [field]: value } : service
            ),
          },
        })),
      updateProject: (projectId, field, value) =>
        set((state) => ({
          config: {
            ...state.config,
            projects: state.config.projects.map((project) =>
              project.id === projectId ? { ...project, [field]: value } : project
            ),
          },
        })),
      resetContent: () => set({ config: cloneConfig(portfolioConfig) }),
    }),
    {
      name: "ilhamddy-portfolio-content",
      version: 3,
      migrate: (persistedState) => {
        if (!persistedState?.config) return persistedState;

        return {
          ...persistedState,
          config: {
            ...persistedState.config,
            projects: persistedState.config.projects.map((project) => {
              if (project.id === 1) {
                return { ...project, image: "/projects/dashboard-analytics.png" };
              }

              if (project.id === 2) {
                return { ...project, image: "/projects/porto.png" };
              }

              if (project.id === 3) {
                return { ...project, image: "/projects/jaringan.png" };
              }

              if (project.id === 6) {
                return { ...project, image: "/projects/company-profile.png" };
              }

              return project;
            }),
          },
        };
      },
    }
  )
);

export const usePortfolioConfig = () => usePortfolioStore((state) => state.config);
