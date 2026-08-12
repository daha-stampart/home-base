"use client";

import { useState } from "react";
import {
  MessageCircle,
  UserRound,
} from "lucide-react";

export default function WebPartnerPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  return (
    <main className="min-h-screen bg-[#07090f] text-white">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">

          {/* LOGO */}
          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo-ds.png"
              alt="Daha.Stampart"
              className="h-9 w-auto object-contain"
            />

            <span className="text-xl font-semibold tracking-tight">
              <span className="text-red-500">
                Daha.
              </span>

              <span className="text-white">
                Stampart
              </span>
            </span>
          </a>


          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="/dashboard"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Home
            </a>

            <a
              href="/portofolio"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Portofolio
            </a>

            <a
              href="/maintenance"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Produk
            </a>

            {/* WEB PARTNER AKTIF */}
            <a
              href="/web-partner"
              className="relative py-20 text-base font-medium text-red-500"
            >
              Web Partner

              <span className="absolute bottom-18 left-0 h-[2px] w-full bg-red-500" />
            </a>

            <a
              href="/maintenance"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              All About Me
            </a>

          </nav>


          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white lg:hidden"
              aria-label="Buka menu"
            >
              ☰
            </button>


            {/* HUBUNGI SAYA */}
            <a
              href="/maintenance"
              className="hidden items-center gap-2 rounded-full border border-red-500/70 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white sm:flex"
            >
              <MessageCircle size={16} />
              Hubungi Saya
            </a>


            {/* USER */}
            <a
              href="/admin/login"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white"
            >
              <UserRound size={18} />
            </a>

          </div>

        </div>


        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        {isMobileMenuOpen && (
          <div className="fixed left-0 right-0 top-16 z-40 border-b border-white/[0.06] bg-[#07090f]/95 backdrop-blur-xl lg:hidden">

            <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-4">

                <a
                    href="/dashboard"
                    onClick={() =>
                        setIsMobileMenuOpen(false)
                    }
                    className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                    >
                    Home
                </a>


                <a
                    href="/portofolio"
                    onClick={() =>
                    setIsMobileMenuOpen(false)
                    }
                    className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                    >
                    Portofolio
                </a>


                <a
                    href="/maintenance"
                    onClick={() =>
                    setIsMobileMenuOpen(false)
                        }
                    className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                    >
                    Produk
                </a>


                {/* WEB PARTNER AKTIF */}
                <a
                    href="/web-partner"
                    onClick={() =>
                        setIsMobileMenuOpen(false)
                    }
                    className="border-b border-white/[0.06] py-3 text-sm font-medium text-red-500"
                    >
                    Web Partner
                </a>


                <a
                    href="/maintenance"
                    onClick={() =>
                        setIsMobileMenuOpen(false)
                    }
                    className="py-3 text-sm font-medium text-zinc-300"
                    >
                    All About Me
                </a>

            </nav>

         </div>
        )}

      </header>

        {/* =====================================================
    HERO WEB PARTNER
===================================================== */}

    <section className="dashboard-enter px-4 pt-5">

  <div className="relative h-[260px] overflow-hidden rounded-2xl">

    {/* BACKGROUND IMAGE */}
    <img
      src="/images/header-web-partner.png"
      alt="Web Partner Daha.Stampart"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/35" />

    {/* LEFT GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

    {/* HERO CONTENT */}
    <div className="relative z-10 flex h-full w-[75%] flex-col justify-center px-5">

      {/* LABEL */}
      <span className="mb-2 w-fit rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-medium text-white backdrop-blur-sm">
        Web Partner
      </span>

      {/* TITLE */}
      <h1 className="text-[22px] font-bold leading-[1.1] text-white">
        Bergabung Menjadi
        <br />
        Partner{" "}
        <span className="text-red-500">
          Daha.Stampart
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-2 max-w-[210px] text-[10px] leading-[1.5] text-zinc-200">
        Jadilah bagian dari jaringan partner resmi
        Daha.Stampart dan dapatkan berbagai
        keuntungan menarik untuk mengembangkan
        bisnis Anda.
      </p>

      {/* BUTTONS */}
      <div className="mt-3 flex items-center gap-2">

        <a
          href="/maintenance"
          className="rounded-lg bg-red-600 px-3 py-2 text-[9px] font-semibold text-white transition hover:bg-red-500"
        >
          Daftar Sekarang →
        </a>

      </div>

    </div>

  </div>

</section>


{/* =====================================================
    PARTNER AKTIF
===================================================== */}

<section
  id="partner"
  className="dashboard-enter px-4 pb-12 pt-8"
>

  {/* SECTION TITLE */}
  <div className="mb-5">

    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
      Partner Kami
    </p>

    <h2 className="mt-1 text-2xl font-bold leading-tight text-white">
      Beberapa Partner Aktif
      <br />
      <span className="text-red-500">Daha.</span>Stampart
    </h2>

  </div>


  {/* PARTNER CARD */}
  <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">

    {/* BANNER */}
    <div className="relative h-[190px] w-full overflow-hidden bg-zinc-900">

      <img
        src="/images/otolink-app/otolink-app-1.png"
        alt="Otolink Digital Appraisal"
        className="h-full w-full scale-100 object-cover"
      />

    </div>


    {/* PARTNER INFO */}
    <div className="px-5 py-4">

      <h3 className="text-lg font-semibold text-white">
        Otolink Digital Appraisal
      </h3>

      <p className="mt-1 text-xs leading-5 text-zinc-400">
        KHUSUS UNTUK INSPECTOR PT BALAI LELANG MEGATAMA (OTOLINK)
        <br />
        PT Balai Lelang Megatama Digital Vehicle Inspection System untuk proses
        appraisal kendaraan yang lebih cepat, akurat,
        dan terstandarisasi.
      </p>

      <div className="mt-4 flex gap-2">

        {/* LIHAT PREVIEW */}
        <a
          href="/web-partner/otolink-app"
          className="flex flex-1 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-[10px] font-semibold text-red-400 transition hover:bg-red-500/20"
          >
          Lihat Preview
        </a>

        {/* KUNJUNGI SITUS */}
        <a
          href="/web-partner/otolink-app/digital-app"
          className="flex flex-1 items-center justify-center rounded-lg bg-red-600 px-3 py-2.5 text-[10px] font-semibold text-white transition hover:bg-red-500"
          >
          Kunjungi Situs
        </a>

      </div>

    </div>

  </article>

</section>

    </main>
  );
}