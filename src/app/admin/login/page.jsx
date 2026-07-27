"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

const TEMP_ADMIN = {
  email: "admin@ilhamddy.com",
  password: "admin123",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Email dan password wajib diisi.");
      return;
    }

    if (form.email !== TEMP_ADMIN.email || form.password !== TEMP_ADMIN.password) {
      setMessage("Email atau password salah.");
      return;
    }

    const storage = form.remember ? localStorage : sessionStorage;
    storage.setItem("ilhamddy-admin-session", "true");
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <section className="min-h-screen px-5 sm:px-6 md:px-12 py-8 flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_460px] border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950">
          <div className="hidden lg:flex min-h-[620px] flex-col justify-between bg-night-bordeaux-950 text-white dark:bg-dark-cyan-950 p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -right-24 h-72 w-72 border border-white/20 rounded-full" />
              <div className="absolute bottom-16 left-12 h-44 w-44 border border-white/10 rounded-full" />
              <div className="absolute bottom-0 right-0 h-64 w-64 bg-night-bordeaux-700/40 dark:bg-dark-cyan-700/40" />
            </div>

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3 text-xs tracking-widest uppercase font-bold text-white/65 hover:text-white transition-colors">
                <ArrowLeft size={14} />
                Kembali ke website
              </Link>
            </div>

            <div className="relative z-10">
              <span className="text-xs tracking-[0.3em] uppercase text-white/45 font-bold">
                Admin Panel
              </span>
              <h1 className="mt-5 text-5xl font-black uppercase tracking-tight leading-[0.95]">
                Manage your portfolio with focus.
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60 font-medium">
                Area login khusus untuk mengelola konten portfolio, project, layanan, dan informasi kontak ilhamddy.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3">
              {["Secure", "Private", "Ready"].map((item) => (
                <div key={item} className="border border-white/10 p-4">
                  <span className="text-[10px] tracking-widest uppercase text-white/45 font-bold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            <div className="lg:hidden mb-10">
              <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-black/45 dark:text-white/45 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors">
                <ArrowLeft size={14} />
                Kembali
              </Link>
            </div>

            <div className="mb-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="flex h-11 w-11 items-center justify-center bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black">
                  <LockKeyhole size={18} />
                </span>
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold">
                    ilhamddy
                  </p>
                  <p className="text-sm font-black uppercase tracking-tight">
                    Admin Access
                  </p>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
                Masuk Admin
              </h2>
              <p className="mt-3 text-sm text-black/55 dark:text-white/55 leading-relaxed font-medium">
                Gunakan akun admin untuk masuk ke dashboard pengelolaan website.
              </p>
              <div className="mt-5 border border-night-bordeaux-600/20 dark:border-dark-cyan-400/20 bg-night-bordeaux-50 dark:bg-dark-cyan-950 px-4 py-3">
                <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold mb-2">
                  User sementara
                </p>
                <p className="text-sm text-black/65 dark:text-white/65 font-semibold">
                  Email: {TEMP_ADMIN.email}
                </p>
                <p className="text-sm text-black/65 dark:text-white/65 font-semibold">
                  Password: {TEMP_ADMIN.password}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="block">
                <span className="mb-2 block text-[10px] tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold">
                  Email Admin
                </span>
                <span className="relative block">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35 dark:text-white/35" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@ilhamddy.com"
                    className="w-full border border-black/15 dark:border-white/15 bg-white dark:bg-black pl-11 pr-4 py-4 text-sm font-semibold outline-none transition-colors focus:border-night-bordeaux-600 dark:focus:border-dark-cyan-400 placeholder:text-black/25 dark:placeholder:text-white/25"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-bold">
                  Password
                </span>
                <span className="relative block">
                  <LockKeyhole size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35 dark:text-white/35" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full border border-black/15 dark:border-white/15 bg-white dark:bg-black pl-11 pr-12 py-4 text-sm font-semibold outline-none transition-colors focus:border-night-bordeaux-600 dark:focus:border-dark-cyan-400 placeholder:text-black/25 dark:placeholder:text-white/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/35 dark:text-white/35 hover:text-night-bordeaux-600 dark:hover:text-dark-cyan-400 transition-colors"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="inline-flex items-center gap-3 text-sm text-black/55 dark:text-white/55 font-semibold">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 accent-night-bordeaux-600 dark:accent-dark-cyan-500"
                  />
                  Ingat sesi login
                </label>
                <button
                  type="button"
                  className="text-left sm:text-right text-xs tracking-widest uppercase font-bold text-night-bordeaux-600 dark:text-dark-cyan-400 hover:text-night-bordeaux-700 dark:hover:text-dark-cyan-300 transition-colors"
                >
                  Lupa Password?
                </button>
              </div>

              {message && (
                <div className="border border-night-bordeaux-600/20 dark:border-dark-cyan-400/20 bg-night-bordeaux-50 dark:bg-dark-cyan-950 px-4 py-3 text-sm text-night-bordeaux-700 dark:text-dark-cyan-200 font-semibold">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="mt-2 bg-night-bordeaux-600 text-white dark:bg-dark-cyan-500 dark:text-black px-6 py-4 text-sm tracking-widest uppercase font-bold hover:bg-night-bordeaux-700 dark:hover:bg-dark-cyan-400 transition-colors"
              >
                Login Admin
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
