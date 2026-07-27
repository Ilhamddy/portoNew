"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, RefreshCw, Save } from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolioStore";

export default function AdminPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState("");
  const { config, updatePersonal, updateProject, resetContent } = usePortfolioStore();

  useEffect(() => {
    const hasSession =
      localStorage.getItem("ilhamddy-admin-session") === "true" ||
      sessionStorage.getItem("ilhamddy-admin-session") === "true";

    if (!hasSession) {
      router.replace("/admin/login");
      return;
    }

    queueMicrotask(() => setChecked(true));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ilhamddy-admin-session");
    sessionStorage.removeItem("ilhamddy-admin-session");
    router.replace("/admin/login");
  };

  const handleSaveNotice = () => {
    setSaved("Perubahan tersimpan di browser ini dan langsung tampil di frontend.");
    window.setTimeout(() => setSaved(""), 2500);
  };

  const handleReset = () => {
    resetContent();
    setSaved("Konten dikembalikan ke data awal.");
    window.setTimeout(() => setSaved(""), 2500);
  };

  if (!checked) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <span className="text-xs tracking-[0.3em] uppercase font-bold text-black/40 dark:text-white/40">
          Checking session
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-8 md:py-12">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-black/10 dark:border-white/10 pb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-black/45 dark:text-white/45 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors mb-6">
              <ArrowLeft size={14} />
              Kembali ke Website
            </Link>
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold mb-3">
              Admin Dashboard
            </p>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Welcome, ilhamddy
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 px-5 py-3 text-xs tracking-widest uppercase font-bold hover:bg-night-bordeaux-600 hover:text-white dark:hover:bg-dark-cyan-500 dark:hover:text-black transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </header>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSaveNotice}
            className="inline-flex items-center justify-center gap-2 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black px-5 py-3 text-xs tracking-widest uppercase font-bold hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-colors"
          >
            <Save size={14} />
            Simpan Preview
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 border border-black/15 dark:border-white/15 px-5 py-3 text-xs tracking-widest uppercase font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <RefreshCw size={14} />
            Reset Konten
          </button>
        </div>

        {saved && (
          <div className="mt-5 border border-night-bordeaux-600/20 dark:border-dark-cyan-400/20 bg-night-bordeaux-50 dark:bg-dark-cyan-950 p-4">
            <p className="text-sm text-night-bordeaux-700 dark:text-dark-cyan-200 font-semibold">
              {saved}
            </p>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">
          <section className="border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 p-5 sm:p-6">
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold mb-5">
              Profil Website
            </p>
            <div className="flex flex-col gap-4">
              {[
                ["name", "Nama Brand"],
                ["initials", "Logo Initial"],
                ["role", "Role"],
                ["email", "Email"],
                ["phone", "Telepon"],
                ["location", "Lokasi"],
              ].map(([field, label]) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-[10px] tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold">
                    {label}
                  </span>
                  <input
                    value={config.personal[field]}
                    onChange={(event) => updatePersonal(field, event.target.value)}
                    className="w-full border border-black/15 dark:border-white/15 bg-white dark:bg-black px-4 py-3 text-sm font-semibold outline-none focus:border-night-bordeaux-600 dark:focus:border-dark-cyan-400"
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-[10px] tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold">
                  Bio
                </span>
                <textarea
                  rows={6}
                  value={config.personal.bio}
                  onChange={(event) => updatePersonal("bio", event.target.value)}
                  className="w-full resize-none border border-black/15 dark:border-white/15 bg-white dark:bg-black px-4 py-3 text-sm font-semibold leading-relaxed outline-none focus:border-night-bordeaux-600 dark:focus:border-dark-cyan-400"
                />
              </label>
            </div>
          </section>

          <section className="border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 p-5 sm:p-6">
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-bold mb-5">
              Project Portfolio
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {config.projects.map((project) => (
                <div key={project.id} className="border border-black/10 dark:border-white/10 p-4">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold">
                      Project {project.id}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-black/30 dark:text-white/30 font-bold">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      ["title", "Judul"],
                      ["client", "Client"],
                      ["year", "Tahun"],
                      ["category", "Kategori"],
                      ["image", "Path Gambar"],
                    ].map(([field, label]) => (
                      <label key={field} className="block">
                        <span className="mb-1.5 block text-[10px] tracking-widest uppercase text-black/35 dark:text-white/35 font-bold">
                          {label}
                        </span>
                        <input
                          value={project[field]}
                          onChange={(event) => updateProject(project.id, field, event.target.value)}
                          className="w-full border border-black/15 dark:border-white/15 bg-white dark:bg-black px-3 py-2.5 text-sm font-semibold outline-none focus:border-night-bordeaux-600 dark:focus:border-dark-cyan-400"
                        />
                      </label>
                    ))}

                    <label className="block">
                      <span className="mb-1.5 block text-[10px] tracking-widest uppercase text-black/35 dark:text-white/35 font-bold">
                        Deskripsi
                      </span>
                      <textarea
                        rows={4}
                        value={project.desc}
                        onChange={(event) => updateProject(project.id, "desc", event.target.value)}
                        className="w-full resize-none border border-black/15 dark:border-white/15 bg-white dark:bg-black px-3 py-2.5 text-sm font-semibold leading-relaxed outline-none focus:border-night-bordeaux-600 dark:focus:border-dark-cyan-400"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 border border-night-bordeaux-600/20 dark:border-dark-cyan-400/20 bg-night-bordeaux-50 dark:bg-dark-cyan-950 p-5">
          <p className="text-sm text-night-bordeaux-700 dark:text-dark-cyan-200 font-semibold leading-relaxed">
            Editor ini berjalan tanpa backend. Perubahan tersimpan di localStorage browser, bukan ke file project atau database.
          </p>
        </div>
      </section>
    </main>
  );
}
