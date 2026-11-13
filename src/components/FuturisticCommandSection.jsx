"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Cpu,
  Zap,
  Radio,
  Sliders,
  Share2,
  Navigation,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Compass,
  CheckCircle2,
  Wifi,
  Sparkles,
  Layers,
  Terminal,
  RotateCcw,
  Plus,
  Minus,
  Crosshair,
  Search,
  Bell,
  MoreHorizontal,
} from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

export default function FuturisticCommandSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("radar");
  const [zoomLevel, setZoomLevel] = useState(100);

  // Simulated AI robotic nodes on topological tech map
  const telemetryNodes = [
    { id: 1, title: "Edge Node #38", status: "Active 99.9%", latency: "12ms", coords: "top-[32%] left-[24%]", active: true },
    { id: 2, title: "Neural Gateway #06", status: "Syncing", latency: "24ms", coords: "top-[20%] left-[30%]" },
    { id: 3, title: "Quantum Pod #11", status: "Nominal", latency: "16ms", coords: "top-[32%] right-[48%]" },
    { id: 4, title: "Autonomous Core #02", status: "Processing", latency: "8ms", coords: "top-[58%] right-[42%]" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Bot size={14} className="animate-pulse" /> Autonomous Architecture & Telemetry
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-3 text-[var(--foreground)] text-balance">
          {language === "id" ? "Pusat Kendali " : "Command & Control "}
          <span className="font-italic-serif font-normal">
            {language === "id" ? "Sistem Modern" : "Ecosystem"}
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-[var(--foreground)]/65 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
          {language === "id"
            ? "Visualisasi arsitektur interaktif: monitoring sistem cerdas, topologi jaringan real-time, dan status robotik enterprise."
            : "Interactive architectural dashboard: intelligent telemetry, live network topology, and robotic autonomy monitoring."}
        </p>
      </div>

      {/* Main Dual-Panel Dashboard Container (Inspired by Roam Map + Telemetry UI) */}
      <div className="relative rounded-[32px] sm:rounded-[36px] border border-[var(--border-subtle)] bg-[var(--card-solid)] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] min-h-[580px]">
        
        {/* ========================================================
            LEFT PANEL: Topological Interactive Dark Map / Tech Grid
            ======================================================== */}
        <div className="relative min-h-[460px] lg:min-h-full bg-[#080C14] text-white p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
          {/* Subtle topological terrain background with grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] opacity-40 pointer-events-none" />
          
          {/* Ambient luminous glow */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Curved S-Path Route (Telemetry Circuit) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-70" viewBox="0 0 700 500" fill="none">
            <path
              d="M 60,420 C 180,410 180,310 240,280 C 320,240 380,140 220,110 C 140,95 240,40 360,60"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 60,420 C 180,410 180,310 240,280 C 320,240 380,140 220,110 C 140,95 240,40 360,60"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            {/* Glowing active path segment */}
            <path
              d="M 60,420 C 130,415 150,370 185,320"
              stroke="#F59E0B"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          {/* Top Floating Header & Nav Pills */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                NextGen OS
              </span>
            </div>

            {/* Micro Nav Capsule Pills */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <button
                onClick={() => setActiveTab("radar")}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  activeTab === "radar" ? "bg-white text-black shadow-md" : "text-white/70 hover:text-white"
                }`}
                title="Radar Topology"
              >
                <Compass size={15} />
              </button>
              <button
                onClick={() => setActiveTab("nodes")}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  activeTab === "nodes" ? "bg-white text-black shadow-md" : "text-white/70 hover:text-white"
                }`}
                title="Active Nodes"
              >
                <Layers size={15} />
              </button>
              <button
                onClick={() => setActiveTab("bot")}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  activeTab === "bot" ? "bg-white text-black shadow-md" : "text-white/70 hover:text-white"
                }`}
                title="Robot AI"
              >
                <Bot size={15} />
              </button>
            </div>
          </div>

          {/* Telemetry Node Callout Card (Floating in terrain) */}
          <div className="relative z-10 my-auto py-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-xs rounded-2xl p-4 sm:p-5 bg-white text-black dark:bg-[#111622] dark:text-white shadow-2xl border border-black/10 dark:border-white/10 backdrop-blur-xl relative"
            >
              {/* Corner badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono">NODE #38 CABO</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
              </div>
              <div className="text-sm font-extrabold tracking-tight mb-3">
                Autonomous Cluster Unit
              </div>

              {/* Specs row */}
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-black/10 dark:border-white/10 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-[11px]">
                    <Zap size={13} />
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60">Speed</div>
                    <div className="font-bold">10 Gbps</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[11px]">
                    <Activity size={13} />
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60">Latency</div>
                    <div className="font-bold">3.2 ms</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Floating Bar & Map Controls */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="font-mono text-[11px]">COORDS: 08°39′S 115°13′E</span>
            </div>

            {/* Zoom / Reset Controls */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
                className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center"
                title="Zoom Out"
              >
                <Minus size={12} />
              </button>
              <span className="text-[10px] font-mono px-1 font-bold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 10, 150))}
                className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center"
                title="Zoom In"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center"
                title="Reset View"
              >
                <Crosshair size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT PANEL: Robotic Tech Inspector & Journey Logs
            ======================================================== */}
        <div className="relative bg-[#F4F6F9] dark:bg-[#0E131E] p-6 sm:p-8 flex flex-col justify-between">
          
          {/* Top Search bar within Dashboard & Avatar badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                readOnly
                placeholder={language === "id" ? "Cari klaster & AI model..." : "Search telemetry & neural pods..."}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-black/8 dark:border-white/10 bg-white dark:bg-[#161D2B] text-xs font-medium placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
            <button className="w-8 h-8 rounded-full border border-black/8 dark:border-white/10 bg-white dark:bg-[#161D2B] flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white transition-colors relative">
              <Bell size={14} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute top-1.5 right-1.5" />
            </button>
          </div>

          {/* Header Title with Unit Tag */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider inline-block mb-1">
                UNIT #BOT-2841
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Autonomous Robot System
              </h3>
            </div>
            <button className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Interactive Futuristic Robotic Visual Centerpiece */}
          <div className="relative my-4 aspect-[16/10] rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-b from-blue-950/20 via-slate-900/10 to-transparent p-6 flex flex-col items-center justify-center overflow-hidden group">
            {/* Ambient concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-blue-500/15 animate-ping" style={{ animationDuration: "4s" }} />
              <div className="w-36 h-36 rounded-full border border-blue-500/20" />
              <div className="w-24 h-24 rounded-full border border-blue-500/30" />
            </div>

            {/* Glowing Robotic Centerpiece Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white flex items-center justify-center shadow-2xl shadow-blue-500/30 cursor-pointer"
            >
              <Bot size={54} className="stroke-[1.7]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0E131E]" />
            </motion.div>

            {/* Sensor Indicators */}
            <div className="relative z-10 mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/40 border border-[var(--border-subtle)] text-[var(--foreground)]">
                <Radio size={12} className="text-blue-500" /> LiDAR Active
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/40 border border-[var(--border-subtle)] text-[var(--foreground)]">
                <Cpu size={12} className="text-indigo-500" /> Neural Edge
              </span>
            </div>
          </div>

          {/* Active Mission / Status Bar */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-white dark:bg-[#141A26] p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-[var(--foreground)]/60">Active Pipeline</span>
              <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                100% HEALTH
              </span>
            </div>
            
            {/* Progress visual with robotic node markers */}
            <div className="relative flex items-center justify-between py-2">
              <div className="absolute inset-x-0 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
              <div className="absolute left-0 right-1/4 h-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full" />
              
              <div className="relative z-10 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                A
              </div>
              <div className="relative z-10 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
                <Bot size={13} />
              </div>
              <div className="relative z-10 w-6 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-[10px] font-bold">
                B
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--foreground)]/70 mt-1">
              <span>Frontend Cluster</span>
              <span>Cloud Engine</span>
            </div>
          </div>

          {/* Telemetry Activity Log Items */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[var(--foreground)] mb-2.5">
              <span>{language === "id" ? "Aktivitas Terbaru" : "Recent Events"}</span>
              <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline text-[11px]">
                {language === "id" ? "Lihat Semua" : "View All"}
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-white dark:bg-[#141A26] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <div className="font-bold">Next.js 16 SSR Sync</div>
                    <div className="text-[10px] text-neutral-400">Turbopack build verified</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">12 ms</span>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-white dark:bg-[#141A26] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <div>
                    <div className="font-bold">Automated Security Audit</div>
                    <div className="text-[10px] text-neutral-400">Zero vulnerabilities</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">10:45 AM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

