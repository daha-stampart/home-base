"use client";

import { useState } from "react";
import { UserRound, Lock, LogIn, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      window.location.href = "/admin";
      return;
    }

    alert("Username atau password salah.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07090f] px-6 text-white">

      <div className="dashboard-enter w-full max-w-[420px]">

        {/* HEADER */}

        <div className="mb-5 text-center">

          <img
            src="/images/logo-ds.png"
            alt="Daha.Stampart"
            className="-mt-20 mx-auto mb-2 h-60 w-auto object-contain"
          />

          <h1 className="-mt-10 text-3xl font-bold">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Masuk untuk mengelola desain Daha.Stampart
          </p>

        </div>


        {/* LOGIN CARD */}

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 shadow-2xl shadow-black/30"
        >

          {/* USERNAME */}

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Username
            </label>

            <div className="relative">

              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
              />

            </div>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <LogIn size={18} />
            Login Admin
          </button>

        </form>

       <a
         href="/dashboard"
         className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-500 transition hover:text-red-400"
         >
         <ArrowLeft size={16} />
           Kembali ke Dashboard
       </a>

      </div>


    </main>
  );
}