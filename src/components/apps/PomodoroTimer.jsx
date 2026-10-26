"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  Volume2,
  VolumeX,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Flame,
  Award,
  Sparkles,
  CloudRain,
  Trees,
  Wind,
  X,
  PictureInPicture2,
} from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

// Web Audio API Synthesizer for high-quality chime sound (Zero external audio file dependencies)
function playSynthesizedChime(muted = false) {
  if (muted || typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Multi-harmonic soothing chime (C6, E6, G6, C7 chord harmonics)
    const frequencies = [1046.5, 1318.5, 1567.98, 2093.0];
    const now = ctx.currentTime;

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.18 / (index + 1), now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 2.0);
    });
  } catch (e) {
    console.error("Audio error:", e);
  }
}

// Web Audio Ambient Sound Generator (Rain, Forest breeze, Calm White Noise)
class AmbientSynthesizer {
  constructor() {
    this.ctx = null;
    this.node = null;
    this.gain = null;
    this.filter = null;
  }

  start(type) {
    if (typeof window === "undefined" || type === "off") {
      this.stop();
      return;
    }
    this.stop();

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink/Brownish noise for natural warmth
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      this.filter = this.ctx.createBiquadFilter();
      if (type === "rain") {
        this.filter.type = "lowpass";
        this.filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      } else if (type === "forest") {
        this.filter.type = "bandpass";
        this.filter.frequency.setValueAtTime(500, this.ctx.currentTime);
        this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      } else {
        // whitenoise
        this.filter.type = "lowpass";
        this.filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      }

      this.gain = this.ctx.createGain();
      this.gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1);

      whiteNoise.connect(this.filter);
      this.filter.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.node = whiteNoise;
    } catch (e) {
      console.error("Ambient error:", e);
    }
  }

  stop() {
    if (this.node) {
      try {
        this.node.stop();
        this.node.disconnect();
      } catch (e) {}
      this.node = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

// Canvas Drawer for Picture-in-Picture (Retina 512x512 with exact website colors)
function drawPipCanvas(canvas, { timeLeft, totalDuration, mode, isRunning, activeTask, cycleCount, isDark }) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  // Exact website tokens:
  // Light: background #EFF2EA, foreground #18231E, card #FFFFFF, primary #1C2E24, accent #38614B
  // Dark:  background #09100D, foreground #EEF4F0, card #111D17, primary #489A74, accent #81C9A2
  const bgColor = isDark ? "#09100D" : "#EFF2EA";
  const cardColor = isDark ? "#111D17" : "#FFFFFF";
  const fgColor = isDark ? "#EEF4F0" : "#18231E";
  const fgMuted = isDark ? "rgba(238, 244, 240, 0.6)" : "rgba(24, 35, 30, 0.6)";
  const borderColor = isDark ? "rgba(238, 244, 240, 0.12)" : "rgba(24, 35, 30, 0.09)";
  const trackColor = isDark ? "rgba(238, 244, 240, 0.1)" : "rgba(24, 35, 30, 0.08)";
  const accentColor = isDark ? "#489A74" : "#38614B";

  // Fill outer background with website background color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  // Inner card rounded rect matching website card
  ctx.fillStyle = cardColor;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(18, 18, w - 36, h - 36, 32);
  } else {
    ctx.rect(18, 18, w - 36, h - 36);
  }
  ctx.fill();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Brand header
  ctx.fillStyle = fgMuted;
  ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("ilhamddy · pomodoro", 45, 62);

  ctx.textAlign = "right";
  ctx.fillText(`Cycle ${cycleCount}/4`, w - 45, 62);

  // Circular progress
  const cx = w / 2;
  const cy = h / 2 - 14;
  const r = 125;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = trackColor;
  ctx.lineWidth = 14;
  ctx.stroke();

  const progress = Math.min(1, Math.max(0, (totalDuration - timeLeft) / totalDuration));
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + progress * Math.PI * 2;

  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = mode === "focus" ? accentColor : mode === "shortBreak" ? "#0d9488" : "#6366f1";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.stroke();

  // Mode title
  ctx.textAlign = "center";
  ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = accentColor;
  const modeTitle = mode === "focus" ? "🎯 FOKUS" : mode === "shortBreak" ? "☕ ISTIRAHAT" : "🌴 ISTIRAHAT PANJANG";
  ctx.fillText(modeTitle, cx, cy - 60);

  // Big digital time
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const timeStr = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  ctx.fillStyle = fgColor;
  ctx.font = "900 78px system-ui, -apple-system, sans-serif";
  ctx.fillText(timeStr, cx, cy + 24);

  // Status
  ctx.font = "bold 17px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = isRunning ? accentColor : "#d97706";
  ctx.fillText(isRunning ? "● BERJALAN" : "❚❚ DIJEDA", cx, cy + 68);

  // Active task bar at bottom
  ctx.fillStyle = fgColor;
  ctx.font = "500 19px system-ui, -apple-system, sans-serif";
  const taskText = activeTask ? `Task: ${activeTask}` : "Fokus Sesi Ini";
  const displayTask = taskText.length > 32 ? taskText.slice(0, 29) + "..." : taskText;
  ctx.fillText(displayTask, cx, h - 52);
}

export default function PomodoroTimer() {
  const { t } = useLanguage();
  const pomodoroText = t.apps?.pomodoro || {};

  // Settings State
  const [durations, setDurations] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientSound, setAmbientSound] = useState("off");
  const [showSettings, setShowSettings] = useState(false);

  // Timer Operational State
  const [mode, setMode] = useState("focus"); // "focus" | "shortBreak" | "longBreak"
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(1); // 1 to 4

  // Stats State
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const [streakDays, setStreakDays] = useState(1);

  // Tasks State
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState("");

  // Picture-in-Picture States
  const [pipWindow, setPipWindow] = useState(null);
  const [isCanvasPipActive, setIsCanvasPipActive] = useState(false);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const ambientRef = useRef(null);

  const isPipActive = Boolean(pipWindow || isCanvasPipActive);

  // Synchronize Dark/Light Mode with website theme
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDark = () => {
      const darkActive = document.documentElement.classList.contains("dark");
      setIsDark(darkActive);
      if (pipWindow && !pipWindow.closed) {
        if (darkActive) {
          pipWindow.document.body.classList.add("dark");
        } else {
          pipWindow.document.body.classList.remove("dark");
        }
      }
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [pipWindow]);

  // Initialize Ambient Ref
  useEffect(() => {
    ambientRef.current = new AmbientSynthesizer();
    return () => {
      if (ambientRef.current) ambientRef.current.stop();
    };
  }, []);

  // Load Persisted Data
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("pomodoro_durations");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setDurations(parsed);
        setTimeLeft(parsed.focus * 60);
      }

      const savedStats = localStorage.getItem("pomodoro_stats");
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setCompletedSessions(parsed.completed || 0);
        setTotalFocusMinutes(parsed.totalMinutes || 0);
        setStreakDays(parsed.streak || 1);
      }

      const savedTasks = localStorage.getItem("pomodoro_tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {}
  }, []);

  // Save Stats
  const updateStats = useCallback((addedMinutes = 25) => {
    setCompletedSessions((prev) => {
      const updated = prev + 1;
      setTotalFocusMinutes((prevMin) => {
        const updatedMin = prevMin + addedMinutes;
        try {
          localStorage.setItem(
            "pomodoro_stats",
            JSON.stringify({
              completed: updated,
              totalMinutes: updatedMin,
              streak: streakDays,
            })
          );
        } catch (e) {}
        return updatedMin;
      });
      return updated;
    });
  }, [streakDays]);

  // Handle Mode Switch
  const switchMode = useCallback(
    (newMode, customDuration) => {
      setMode(newMode);
      setIsRunning(false);
      const minutes = customDuration || durations[newMode] || 25;
      setTimeLeft(minutes * 60);
    },
    [durations]
  );

  // Next Session Handler
  const handleSessionCompletion = useCallback(() => {
    playSynthesizedChime(!soundEnabled);

    if (mode === "focus") {
      updateStats(durations.focus);
      if (cycleCount >= 4) {
        setCycleCount(1);
        switchMode("longBreak", durations.longBreak);
      } else {
        setCycleCount((prev) => prev + 1);
        switchMode("shortBreak", durations.shortBreak);
      }
      if (autoStartBreaks) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    } else {
      switchMode("focus", durations.focus);
    }
  }, [mode, cycleCount, durations, soundEnabled, autoStartBreaks, updateStats, switchMode]);

  // Main Timer Tick
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleSessionCompletion();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleSessionCompletion]);

  // Manage Ambient Sound
  useEffect(() => {
    if (ambientRef.current) {
      if (isRunning && ambientSound !== "off") {
        ambientRef.current.start(ambientSound);
      } else {
        ambientRef.current.stop();
      }
    }
  }, [isRunning, ambientSound]);

  // Browser Tab Title Sync
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (isRunning) {
      const modeLabel = mode === "focus" ? "🎯 Focus" : "☕ Break";
      document.title = `(${formatted}) ${modeLabel} · Ilhamddy Apps`;
    } else {
      document.title = "Apps · Ilhamddy";
    }

    return () => {
      document.title = "Apps · Ilhamddy";
    };
  }, [timeLeft, isRunning, mode]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsRunning((prev) => !prev);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setIsRunning(false);
        setTimeLeft(durations[mode] * 60);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [durations, mode]);

  // Update PiP Canvas on state changes
  useEffect(() => {
    if (canvasRef.current) {
      const activeTaskText = tasks.find((t) => !t.completed)?.text || "";
      drawPipCanvas(canvasRef.current, {
        timeLeft,
        totalDuration: (durations[mode] || 25) * 60,
        mode,
        isRunning,
        activeTask: activeTaskText,
        cycleCount,
        isDark,
      });
    }
  }, [timeLeft, durations, mode, isRunning, tasks, cycleCount, isDark]);

  // MediaSession API setup for Video PiP controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLeave = () => setIsCanvasPipActive(false);
    video.addEventListener("leavepictureinpicture", handleLeave);

    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("play", () => setIsRunning(true));
        navigator.mediaSession.setActionHandler("pause", () => setIsRunning(false));
        navigator.mediaSession.setActionHandler("nexttrack", () => handleSessionCompletion());
      } catch (e) {}
    }

    return () => {
      video.removeEventListener("leavepictureinpicture", handleLeave);
    };
  }, [handleSessionCompletion]);

  // Toggle Picture-in-Picture
  const togglePictureInPicture = async () => {
    // 1. If Document PiP active, close it
    if (pipWindow) {
      pipWindow.close();
      setPipWindow(null);
      return;
    }

    // 2. If Video PiP active, exit it
    if (document.pictureInPictureElement) {
      try {
        await document.exitPictureInPicture();
      } catch (err) {}
      setIsCanvasPipActive(false);
      return;
    }

    // 3. Document Picture-in-Picture API (Chrome/Edge 111+)
    if (typeof window !== "undefined" && "documentPictureInPicture" in window) {
      try {
        const pipWin = await window.documentPictureInPicture.requestWindow({
          width: 350,
          height: 390,
        });

        // Exact theme tokens from globals.css
        const style = pipWin.document.createElement("style");
        style.textContent = `
          :root {
            --background: #EFF2EA;
            --foreground: #18231E;
            --card-bg: #FFFFFF;
            --card-solid: #FFFFFF;
            --border-subtle: rgba(24, 35, 30, 0.09);
            --primary: #1C2E24;
            --primary-hover: #294234;
            --primary-fg: #F4F6F0;
            --accent-sage: #38614B;
            --track: rgba(24, 35, 30, 0.08);
          }

          body.dark {
            --background: #09100D;
            --foreground: #EEF4F0;
            --card-bg: #111D17;
            --card-solid: #111D17;
            --border-subtle: rgba(238, 244, 240, 0.09);
            --primary: #489A74;
            --primary-hover: #5DB58C;
            --primary-fg: #06100B;
            --accent-sage: #81C9A2;
            --track: rgba(238, 244, 240, 0.1);
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: var(--background);
            color: var(--foreground);
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            padding: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            box-sizing: border-box;
            user-select: none;
            overflow: hidden;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          .pip-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            background: var(--card-bg);
            border: 1px solid var(--border-subtle);
            border-radius: 22px;
            padding: 16px 18px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          }
          .pip-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--foreground);
            opacity: 0.65;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 10px;
          }
          .pip-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--accent-sage);
            font-weight: 800;
          }
          .pip-badge-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--accent-sage);
          }
          .pip-time {
            font-size: 58px;
            font-weight: 900;
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.04em;
            text-align: center;
            color: var(--foreground);
            margin: 10px 0 4px 0;
            line-height: 1;
          }
          .pip-status {
            text-align: center;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .pip-progress-track {
            width: 100%;
            height: 6px;
            background: var(--track);
            border-radius: 999px;
            overflow: hidden;
            margin-bottom: 12px;
          }
          .pip-progress-bar {
            height: 100%;
            border-radius: 999px;
            transition: width 0.3s ease;
          }
          .pip-task {
            font-size: 12px;
            color: var(--foreground);
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 6px 12px;
            background: var(--background);
            border: 1px solid var(--border-subtle);
            border-radius: 10px;
            margin-bottom: 14px;
            font-weight: 500;
          }
          .pip-controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: auto;
          }
          .pip-btn {
            background: var(--background);
            color: var(--foreground);
            border: 1px solid var(--border-subtle);
            border-radius: 999px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
          }
          .pip-btn:hover {
            opacity: 0.85;
            transform: scale(1.04);
          }
          .pip-btn-icon {
            width: 40px;
            height: 40px;
          }
          .pip-btn-main {
            background: var(--primary);
            color: var(--primary-fg);
            font-weight: 800;
            font-size: 13px;
            padding: 10px 24px;
            border: none;
            gap: 8px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .pip-btn-main:hover {
            opacity: 0.92;
          }
        `;
        pipWin.document.head.appendChild(style);

        if (isDark) {
          pipWin.document.body.classList.add("dark");
        }

        pipWin.addEventListener("pagehide", () => {
          setPipWindow(null);
        });

        setPipWindow(pipWin);
        return;
      } catch (err) {
        console.warn("Document PiP failed, attempting Video PiP fallback:", err);
      }
    }

    // 4. Video Picture-in-Picture Fallback (Universal)
    try {
      if (canvasRef.current && videoRef.current) {
        if (!videoRef.current.srcObject) {
          videoRef.current.srcObject = canvasRef.current.captureStream(10);
        }
        await videoRef.current.play();
        await videoRef.current.requestPictureInPicture();
        setIsCanvasPipActive(true);
      }
    } catch (err) {
      console.error("Picture-in-Picture could not be initiated:", err);
    }
  };

  // Tasks Management
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskInput.trim(),
      completed: false,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    setNewTaskInput("");
    try {
      localStorage.setItem("pomodoro_tasks", JSON.stringify(updated));
    } catch (err) {}
  };

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    try {
      localStorage.setItem("pomodoro_tasks", JSON.stringify(updated));
    } catch (err) {}
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    try {
      localStorage.setItem("pomodoro_tasks", JSON.stringify(updated));
    } catch (err) {}
  };

  // Progress Calculation
  const totalSeconds = (durations[mode] || 25) * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  const formatDisplayTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Circular SVG Properties
  const radius = 138;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hidden Canvas & Video for Universal Picture-in-Picture support */}
      <canvas ref={canvasRef} width={512} height={512} style={{ display: "none" }} />
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />

      {/* 1. TOP STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="text-xl font-black text-[var(--foreground)]">{completedSessions}</div>
            <div className="text-[11px] font-medium text-[var(--foreground)]/60 uppercase tracking-wider">
              {pomodoroText.completedSessions || "Sesi Selesai"}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <div className="text-xl font-black text-[var(--foreground)]">{totalFocusMinutes} m</div>
            <div className="text-[11px] font-medium text-[var(--foreground)]/60 uppercase tracking-wider">
              {pomodoroText.totalFocusTime || "Total Fokus"}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Flame size={20} />
          </div>
          <div>
            <div className="text-xl font-black text-[var(--foreground)]">{streakDays} hari</div>
            <div className="text-[11px] font-medium text-[var(--foreground)]/60 uppercase tracking-wider">
              {pomodoroText.streak || "Streak Harian"}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-xl font-black text-[var(--foreground)]">4 Sesi</div>
            <div className="text-[11px] font-medium text-[var(--foreground)]/60 uppercase tracking-wider">
              {pomodoroText.dailyGoal || "Target Siklus"}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN TIMER CARD (Tiimo Nature Glassmorphism) */}
      <div className="relative rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.04)] mb-8 overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            mode === "focus"
              ? "bg-emerald-500/15 dark:bg-emerald-400/20"
              : mode === "shortBreak"
              ? "bg-teal-500/15 dark:bg-teal-400/20"
              : "bg-indigo-500/15 dark:bg-indigo-400/20"
          }`}
        />

        {/* Card Header: Mode Selector & Ambient Audio Tools */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--border-subtle)]">
          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-[var(--background)]/80 border border-[var(--border-subtle)]">
            {[
              { id: "focus", label: pomodoroText.focusMode || "Fokus" },
              { id: "shortBreak", label: pomodoroText.shortBreakMode || "Istirahat Pendek" },
              { id: "longBreak", label: pomodoroText.longBreakMode || "Istirahat Panjang" },
            ].map((tab) => {
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchMode(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[var(--primary)] text-[var(--primary-fg)] shadow-sm scale-[1.02]"
                      : "text-[var(--foreground)]/65 hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Audio, Picture-in-Picture & Settings Controls */}
          <div className="flex items-center gap-2">
            {/* Ambient Sound Mode Selector */}
            <div className="relative flex items-center gap-1 bg-[var(--background)]/80 border border-[var(--border-subtle)] px-2 py-1.5 rounded-full text-xs font-semibold text-[var(--foreground)]">
              <span className="text-[11px] px-1 text-[var(--foreground)]/60">
                {pomodoroText.ambientSound || "Suara"}:
              </span>
              {[
                { id: "off", icon: VolumeX, label: "Off" },
                { id: "rain", icon: CloudRain, label: "Rain" },
                { id: "forest", icon: Trees, label: "Forest" },
                { id: "whitenoise", icon: Wind, label: "White" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setAmbientSound(id)}
                  title={`Ambient: ${label}`}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    ambientSound === id
                      ? "bg-[var(--primary)] text-[var(--primary-fg)] shadow-xs"
                      : "text-[var(--foreground)]/50 hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>

            {/* Chime Sound Bell Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playSynthesizedChime(false);
              }}
              title={soundEnabled ? "Bel Notifikasi Aktif" : "Bel Hening"}
              className="p-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--background)]/80 text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Picture-in-Picture Floating Window Button */}
            <button
              onClick={togglePictureInPicture}
              title={
                isPipActive
                  ? pomodoroText.pipActive || "Tutup Picture-in-Picture"
                  : pomodoroText.pipTooltip ||
                    "Picture-in-Picture (Jendela Mengambang saat buka tab lain)"
              }
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isPipActive
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/50 shadow-xs scale-105"
                  : "border-[var(--border-subtle)] bg-[var(--background)]/80 text-[var(--foreground)]/75 hover:text-[var(--foreground)]"
              }`}
            >
              <PictureInPicture2 size={16} />
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setShowSettings(true)}
              title="Pengaturan Timer"
              className="p-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--background)]/80 text-[var(--foreground)]/75 hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* PiP Active Banner Notice */}
        {isPipActive && (
          <div className="relative z-10 mb-6 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>
                Picture-in-Picture aktif — Timer tetap mengambang di layar Anda saat membuka tab atau aplikasi lain.
              </span>
            </div>
            <button
              onClick={togglePictureInPicture}
              className="underline hover:no-underline font-bold text-emerald-800 dark:text-emerald-200 cursor-pointer shrink-0"
            >
              Tutup PiP
            </button>
          </div>
        )}

        {/* Center: Circular SVG Progress & Digital Display */}
        <div className="relative z-10 flex flex-col items-center justify-center my-4">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 320 320">
              {/* Background Track Ring */}
              <circle
                cx="160"
                cy="160"
                r={radius}
                className="stroke-[var(--border-subtle)]"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Dynamic Animated Progress Ring */}
              <motion.circle
                cx="160"
                cy="160"
                r={radius}
                stroke={
                  mode === "focus"
                    ? "var(--primary)"
                    : mode === "shortBreak"
                    ? "#0d9488"
                    : "#6366f1"
                }
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                initial={false}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Inner Content Inside Circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {/* Cycle indicator dots (4 sessions in 1 cycle) */}
              <div className="flex items-center gap-1.5 mb-3">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dot < cycleCount
                        ? "w-4 bg-emerald-500"
                        : dot === cycleCount
                        ? "w-6 bg-[var(--primary)] animate-pulse"
                        : "w-2 bg-[var(--border-subtle)]"
                    }`}
                  />
                ))}
              </div>

              {/* Huge Crisp Digital Time Display */}
              <div className="text-6xl sm:text-7xl font-black tracking-tight text-[var(--foreground)] tabular-nums select-none">
                {formatDisplayTime(timeLeft)}
              </div>

              {/* Status Pill */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background)]/90 border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)]/80">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isRunning ? "bg-emerald-500 animate-ping" : "bg-amber-400"
                  }`}
                />
                <span>
                  {isRunning
                    ? mode === "focus"
                      ? "Sedang Berjalan"
                      : "Sedang Istirahat"
                    : "Dijeda"}
                </span>
              </div>
            </div>
          </div>

          {/* Cycle Label */}
          <div className="text-xs font-semibold text-[var(--foreground)]/60 mt-2 mb-6">
            {pomodoroText.cycleProgress
              ? pomodoroText.cycleProgress
                  .replace("{current}", cycleCount)
                  .replace("{total}", "4")
              : `Siklus ${cycleCount} dari 4`}
          </div>

          {/* Action Buttons: Play/Pause, Reset, Skip */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(durations[mode] * 60);
              }}
              title="Reset Timer (R)"
              className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 sm:px-10 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-fg)] font-black text-sm tracking-wider uppercase flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause size={18} />
                  <span>{pomodoroText.pause || "Jeda"}</span>
                </>
              ) : (
                <>
                  <Play size={18} className="fill-current" />
                  <span>{pomodoroText.start || "Mulai"}</span>
                </>
              )}
            </button>

            <button
              onClick={handleSessionCompletion}
              title="Lewati Sesi"
              className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Picture in Picture & Keyboard shortcut tips */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[var(--foreground)]/50 mt-5 font-medium">
            <span>{pomodoroText.keyboardHint || "Tips: Spasi untuk Mulai/Jeda, R untuk Reset."}</span>
            <span>·</span>
            <button
              onClick={togglePictureInPicture}
              className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline font-bold cursor-pointer"
            >
              <PictureInPicture2 size={13} />
              <span>{isPipActive ? "Tutup Jendela Mengambang" : "Buka Picture-in-Picture (Jendela Mengambang)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. FOCUS TASK LIST (Current session focus) */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-md p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <h3 className="text-base font-bold text-[var(--foreground)]">
              {pomodoroText.activeTaskLabel || "Fokus & Tugas Sesi Ini"}
            </h3>
          </div>
          <span className="text-xs font-semibold text-[var(--foreground)]/50">
            {tasks.filter((t) => t.completed).length}/{tasks.length} Selesai
          </span>
        </div>

        {/* Add Task Input Form */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder={
              pomodoroText.currentTaskPlaceholder || "Tulis fokus atau tugas yang sedang dikerjakan..."
            }
            className="flex-1 px-4 py-3 rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-[var(--primary)] text-[var(--primary-fg)] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Plus size={16} />
            <span>{pomodoroText.addTaskBtn || "Simpan"}</span>
          </button>
        </form>

        {/* Task Items */}
        <div className="space-y-2.5">
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-xs text-[var(--foreground)]/50 border border-dashed border-[var(--border-subtle)] rounded-2xl">
              Belum ada tugas yang dicatat. Tulis tugas Anda di atas untuk menjaga fokus kerja hari ini.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                  task.completed
                    ? "bg-[var(--background)]/40 border-[var(--border-subtle)] opacity-60"
                    : "bg-[var(--background)]/90 border-[var(--border-subtle)]"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer"
                >
                  {task.completed ? (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-[var(--foreground)]/40 shrink-0" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      task.completed ? "line-through text-[var(--foreground)]/60" : "text-[var(--foreground)]"
                    }`}
                  >
                    {task.text}
                  </span>
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  title="Hapus Tugas"
                  className="p-1.5 text-[var(--foreground)]/40 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. SETTINGS MODAL */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-solid)] text-[var(--foreground)] p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-[var(--primary)]" />
                  <h3 className="font-bold text-lg">
                    {pomodoroText.settingsTitle || "Pengaturan Timer"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1.5 rounded-full hover:bg-[var(--background)] text-[var(--foreground)]/60 hover:text-[var(--foreground)] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 mb-2">
                    {pomodoroText.focusDuration || "Durasi Fokus (Menit)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={durations.focus}
                    onChange={(e) =>
                      setDurations({ ...durations, focus: Number(e.target.value) || 25 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 mb-2">
                    {pomodoroText.shortBreakDuration || "Istirahat Pendek (Menit)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={durations.shortBreak}
                    onChange={(e) =>
                      setDurations({ ...durations, shortBreak: Number(e.target.value) || 5 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/70 mb-2">
                    {pomodoroText.longBreakDuration || "Istirahat Panjang (Menit)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={durations.longBreak}
                    onChange={(e) =>
                      setDurations({ ...durations, longBreak: Number(e.target.value) || 15 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)] font-semibold text-sm"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {pomodoroText.autoStartBreaks || "Mulai istirahat secara otomatis"}
                  </span>
                  <input
                    type="checkbox"
                    checked={autoStartBreaks}
                    onChange={(e) => setAutoStartBreaks(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  try {
                    localStorage.setItem("pomodoro_durations", JSON.stringify(durations));
                  } catch (e) {}
                  setTimeLeft(durations[mode] * 60);
                  setIsRunning(false);
                  setShowSettings(false);
                }}
                className="w-full py-3 rounded-full bg-[var(--primary)] text-[var(--primary-fg)] font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                {pomodoroText.saveSettings || "Simpan Pengaturan"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. DOCUMENT PICTURE-IN-PICTURE PORTAL */}
      {pipWindow &&
        createPortal(
          <div className="pip-card">
            <div className="pip-header">
              <span className="pip-badge">
                <span className="pip-badge-dot" />
                <span>
                  {mode === "focus"
                    ? "🎯 Fokus"
                    : mode === "shortBreak"
                    ? "☕ Istirahat"
                    : "🌴 Istirahat Panjang"}
                </span>
              </span>
              <span>Siklus {cycleCount}/4</span>
            </div>

            <div>
              <div className="pip-time">{formatDisplayTime(timeLeft)}</div>
              <div
                className="pip-status"
                style={{ color: isRunning ? "var(--accent-sage)" : "#d97706" }}
              >
                {isRunning ? "● Sedang Berjalan" : "❚❚ Dijeda"}
              </div>
              <div className="pip-progress-track">
                <div
                  className="pip-progress-bar"
                  style={{
                    width: `${progressPercent}%`,
                    background:
                      mode === "focus"
                        ? "var(--accent-sage)"
                        : mode === "shortBreak"
                        ? "#0d9488"
                        : "#6366f1",
                  }}
                />
              </div>
              <div className="pip-task">
                {tasks.find((t) => !t.completed)?.text || "Fokus pada tugas aktif Anda"}
              </div>
            </div>

            <div className="pip-controls">
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(durations[mode] * 60);
                }}
                title="Reset (R)"
                className="pip-btn pip-btn-icon"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="pip-btn pip-btn-main"
              >
                {isRunning ? (
                  <>
                    <Pause size={16} />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>Mulai</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSessionCompletion}
                title="Lewati"
                className="pip-btn pip-btn-icon"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>,
          pipWindow.document.body
        )}
    </div>
  );
}
