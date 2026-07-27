"use client";

import Link from "next/link";
import { Edit3, LogOut, ShieldCheck } from "lucide-react";
import { setAdminEditMode, useAdminEditMode } from "./InlineEdit";

export default function AdminEditToolbar() {
  const { isAdmin, editMode } = useAdminEditMode();

  if (!isAdmin) return null;

  const handleToggle = () => {
    setAdminEditMode(!editMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("ilhamddy-admin-session");
    sessionStorage.removeItem("ilhamddy-admin-session");
    setAdminEditMode(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col sm:flex-row gap-2">
      <Link
        href="/admin"
        className="inline-flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 bg-white text-black dark:bg-black dark:text-white px-4 py-3 text-xs tracking-widest uppercase font-bold shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
      >
        <ShieldCheck size={14} />
        Admin
      </Link>
      <button
        onClick={handleToggle}
        className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest uppercase font-bold shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-colors ${
          editMode
            ? "bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black"
            : "border border-black/10 dark:border-white/10 bg-white text-black dark:bg-black dark:text-white"
        }`}
      >
        <Edit3 size={14} />
        {editMode ? "Editing On" : "Edit Mode"}
      </button>
      <button
        onClick={handleLogout}
        className="inline-flex items-center justify-center gap-2 border border-black/10 dark:border-white/10 bg-white text-black dark:bg-black dark:text-white px-4 py-3 text-xs tracking-widest uppercase font-bold shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
      >
        <LogOut size={14} />
        Logout
      </button>
    </div>
  );
}
