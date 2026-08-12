"use client";

import { useState } from "react";
import Image from "next/image";

import { APP } from "./lib/config";
import BrandPanel from "./login/BrandPanel";
import LoginCard from "./login/LoginCard";

export default function DigitalAppPage() {
  const [loginMode, setLoginMode] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background */}
      <Image
        src="/images/login-bg.png"
        alt="Otolink Background"
        fill
        priority
        className="pointer-events-none object-cover"
      />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(255,210,80,0.28),transparent_35%)]
        "
      />

      {/* LANDING */}
      <div
        className={`
          relative z-10 flex min-h-screen w-full items-center justify-center px-6
          transition-all duration-700
          ${
            loginMode
              ? "pointer-events-none absolute opacity-0 scale-95"
              : "opacity-100 scale-100"
          }
        `}
      >
        <div className="w-full max-w-[620px] rounded-[32px] border border-white/20 bg-white/10 px-6 py-8 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,.45)] sm:px-12 sm:py-10">

          {/* Logo */}
          <div className="dashboard-enter mb-10 flex justify-center">
            <Image
              src="/images/logo-otolink-v2.png"
              alt="Otolink"
              width={220}
              height={70}
              priority
            />
          </div>

          <h1 className="dashboard-enter text-center text-2xl font-semibold text-white">
            Selamat Datang di
          </h1>

          <h2 className="dashboard-enter mt-3 text-center text-3xl font-bold text-white">
            PT BALAI LELANG MEGATAMA
          </h2>

          <p className="dashboard-enter mt-4 text-center text-2xl text-white/90">
            Digital Inspection System
          </p>

          <div className="mx-auto mt-8 h-px w-40 bg-white/20" />

          <p className="dashboard-enter mt-5 text-center leading-8 text-white/75">
            Platform digital untuk melakukan inspeksi kendaraan secara cepat,
            akurat dan terstandarisasi sebelum mengikuti proses lelang.
          </p>

          {/* Login Button */}
          <button
            onClick={() => setLoginMode(true)}
            className="
              dashboard-enter
              mt-10 flex h-16 w-full
              items-center justify-center
              rounded-2xl
              bg-[#D71920]
              text-lg font-semibold text-white
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-red-700
            "
          >
            Login Inspector →
          </button>

          <p className="dashboard-enter mt-5 text-center text-sm text-white/60">
            Silakan login menggunakan akun inspector.
          </p>

          <p className="mt-10 text-center text-xs text-white/40">
            {APP.version}
          </p>

        </div>
      </div>

      {/* LOGIN */}
      <div
        className={`
          absolute inset-0 z-20
          flex items-center justify-center
          px-6 py-10
          transition-all duration-700
          ${
            loginMode
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-24">

          <BrandPanel show={loginMode} />

          <LoginCard show={loginMode} />

        </div>
      </div>

    </main>
  );
}