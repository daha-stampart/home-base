"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Smartphone,
} from "lucide-react";

export default function OtolinkAppPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  return (
    <main className="min-h-screen bg-[#07090f] text-white">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5">

          {/* BACK */}
          <Link
            href="/web-partner"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            <span>Kembali</span>
          </Link>

          {/* TITLE */}
          <span className="text-sm font-semibold text-white">
            Web Partner
          </span>

          <div className="w-[70px]" />

        </div>

      </header>


      {/* =====================================================
        CONTENT
      ===================================================== */}

      <section className="px-4 pb-14 pt-6">

        {/* LABEL */}
        <p className="dashboard-enter text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
          Web Partner
        </p>

        {/* TITLE */}
        <h1 className="dashboard-enter mt-2 text-3xl font-bold leading-tight text-white">
          Otolink
          <br />
          <span className="dashboard-enter text-red-500">
            Digital Appraisal
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="dashboard-enter mt-3 max-w-md text-sm leading-6 text-zinc-400">
          KHUSUS UNTUK INSPECTOR PT BALAI LELANG MEGATAMA (OTOLINK)
          <br />Platform PT Balai Lelang Megatama untuk melakukan inspeksi
          kendaraan yang akan di lelang.
        </p>

       {/* CTA atas */}
        <div className="mt-6">
          <a
           href="/web-partner/otolink-app/digital-app"
           className="relative z-50 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-semibold text-white transition hover:bg-red-500"
           >
            Kunjungi Website
            <ExternalLink size={16} />
          </a>
        </div>

        {/* =================================================
          ABOUT
        ================================================= */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">
            Tentang Website
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Platform digital appraisal kendaraan yang membantu
            proses inspeksi menjadi lebih cepat, terstruktur,
            dan terdokumentasi.
            <br  />Otolink Digital Appraisal dirancang untuk
            memudahkan inspektor melakukan proses appraisal
            kendaraan secara digital,
            sehingga data inspeksi dapat dicatat
            dan dikelola dengan lebih praktis.
          </p>
        </div>


        {/* =================================================
          FEATURE
        ================================================= */}

        <div className="mt-7">
          <h2 className="text-xl font-semibold text-white">
            Fitur Utama
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">
                Digital Inspection
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Proses inspeksi kendaraan dilakukan
                secara digital.
              </p>

            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">
                Dokumentasi
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Dokumentasi kendaraan tersimpan
                secara terstruktur.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">

              <p className="text-sm font-semibold text-white">
                Mobile Friendly
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Dapat digunakan langsung melalui
                perangkat mobile.
              </p>

            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">

              <p className="text-sm font-semibold text-white">
                Data Terstruktur
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Data appraisal tersusun dengan rapi
                dan mudah dikelola.
              </p>

            </div>

          </div>
 
        </div>


       {/* =================================================
          PREVIEW
        ================================================= */}

        <div className="mt-7">
          <div className="dashboard-enter mb-3 flex items-center gap-2">
            <Smartphone
              size={16}
              className="text-red-500"
            />

            <h2 className="text-sm font-semibold text-white">
              Preview Website
            </h2>

          </div>


          {/* PREVIEW FRAME */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl">

            {/* PREVIEW LANDSCAPE 1 */}
            <div className="mt-5 mb-5 flex justify-center">
              <div className="w-[95%] overflow-hidden rounded-4xl border border-white/[0.08] bg-black/40">
                <button
                  type="button"
                  onClick={() =>
                  setSelectedImage("/images/otolink-app/otolink-app-1.png")
                  }
                  className="block w-full scale-110 cursor-pointer"
                  >
                  <img
                    src="/images/otolink-app/otolink-app-1.png"
                    alt="Preview Otolink Digital Appraisal - Landscape"
                    className="block w-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* PREVIEW LANDSCAPE 2*/}
            <div className="mt-5 mb-5 flex justify-center">
              <div className="w-[95%] overflow-hidden rounded-4xl border border-white/[0.08] bg-black/40">
                <button
                  type="button"
                  onClick={() =>
                  setSelectedImage("/images/otolink-app/otolink-app-2.png")
                  }
                  className="block w-full scale-110 cursor-pointer"
                  >
                  <img
                    src="/images/otolink-app/otolink-app-2.png"
                    alt="Preview Otolink Digital Appraisal - Landscape"
                    className="block w-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* PREVIEW PORTRAIT 1 */}
            <div className="mt-5 mb-5 flex justify-center">
              <div className="w-[95%] overflow-hidden rounded-4xl border border-white/[0.08] bg-black/40">
                <button
                  type="button"
                  onClick={() =>
                  setSelectedImage("/images/otolink-app/otolink-app-3.png")
                  }
                  className="block w-full scale-110 cursor-pointer"
                  >
                  <img
                    src="/images/otolink-app/otolink-app-3.png"
                    alt="Preview Otolink Digital Appraisal - Portrait 2"
                    className="block w-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* PREVIEW PORTRAIT 2 */}
            <div className="mt-5 mb-5 flex justify-center">
              <div className="w-[95%] overflow-hidden rounded-4xl border border-white/[0.08] bg-black/40">
                <button
                  type="button"
                  onClick={() =>
                  setSelectedImage("/images/otolink-app/otolink-app-4.png")
                  }
                  className="block w-full scale-110 cursor-pointer"
                  >
                  <img
                    src="/images/otolink-app/otolink-app-4.png"
                    alt="Preview Otolink Digital Appraisal - Portrait 2"
                    className="block w-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* SUBTLE OVERLAY */}
            <div className="absolute inset-0 bg-black/5" />
          </div>

        </div>

        {/* CTA bawah */}
        <div className="mt-6">
          <a
           href="/web-partner/otolink-app/digital-app"
           className="dashboard-enter flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-semibold text-white transition hover:bg-red-500"
           >
            Kunjungi Partner kami
            <ExternalLink size={16} />
          </a>
        </div>


        
      </section>

      {/* IMAGE POPUP */}
      {selectedImage && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        onClick={() => {
        setSelectedImage(null);
        setZoom(1);
        }}
        >

        {/* CLOSE */}
        <button
          type="button"
          onClick={() => {
          setSelectedImage(null);
          setZoom(1);
          }}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md"
          >
          ×
        </button>

        {/* IMAGE */}
        <img
          src={selectedImage}
          alt="Preview Otolink"
          className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain transition-transform duration-200"
          style={{
          transform: `scale(${zoom})`,
          }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* ZOOM CONTROLS */}
        <div
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 p-2 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
          >

          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white"
           >
            −
          </button>

          <span className="min-w-[45px] text-center text-xs text-white">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white"
            >
            +
          </button>

        </div>

      </div>
      )}

    </main>
  );
}