"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
} from "lucide-react";

// =====================================================
// WEBSITE AKTIF OTOLINK
// =====================================================

const OTOLINK_URL = "https://lelang.otolink.co.id";

// =====================================================
// PREVIEW WEBSITE
// =====================================================

const previewImages = [
  "/images/web-otolink/web-otolink-1.png",
  "/images/web-otolink/web-otolink-2.png",
  "/images/web-otolink/web-otolink-3.png",
  "/images/web-otolink/web-otolink-4.png",
  "/images/web-otolink/web-otolink-5.png",
];

export default function WebOtolinkPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const openPreview = (image: string) => {
    setSelectedImage(image);
    setZoom(1);
  };

  const closePreview = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  return (
    <main className="min-h-screen bg-[#07090f] text-white">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5">

          <Link
            href="/web-partner"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            <span>Kembali</span>
          </Link>


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

          PT Balai Lelang

          <br />

          <span className="text-red-500">
            Megatama
          </span>

        </h1>


        {/* DESCRIPTION */}

        <p className="dashboard-enter mt-3 max-w-md text-sm leading-6 text-zinc-400">

          WEBSITE RESMI OTOLINK

          <br />

          Platform resmi PT Balai Lelang Megatama
          untuk memberikan informasi dan layanan
          lelang kendaraan roda dua dan roda empat.

        </p>


        {/* =================================================
            CTA ATAS
        ================================================= */}

        <div className="mt-6">

          <a
            href={OTOLINK_URL}
            target="_blank"
            rel="noopener noreferrer"
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

            PT Balai Lelang Megatama (OTOLINK) merupakan perusahaan swasta
            yang bergerak di bidang penyediaan jasa pra lelang, lelang dan pasca lelang.

            <br />
            <br />

            OTOLINK didirikan dari tahun 2011 untuk memenuhi kebutuhan
            masyarakat pada umumnya dan dunia usaha pada khususnya,
            terhadap suatu proses penjualan aset yang efisien dan efektif.

            OTOLINK menjalin kerjasama yang erat dengan pemilik aset,
            kalangan investor, kantor Badan Pertanahan serta Kantor-kantor
            Pelayanan Kekayaan Negara dan Lelang (“KPKNL”) setempat.

            Aset yang dapat dilelang melalui OTOLINK yaitu aset bergerak
            (Automotive / kendaraan bermotor).

            Sebelum menyelenggarakan lelang, OTOLINK terlebih dahulu memastikan
            status dan kondisi aset dari sisi hukum serta melakukan pemasaran
            yang intensif dengan metode yang efektif, terarah, serta menarik.

            <br />
            <br />

            Saat ini OTOLINK berkantor pusat di
            Jalan Raya Kalimalang No 19 Duren Sawit Jakarta Timur 13440.

          </p>

        </div>


        {/* =================================================
            INFORMASI & LAYANAN
        ================================================= */}

        <div className="mt-7">

          <h2 className="text-xl font-semibold text-white">
            Informasi & Layanan
          </h2>


          <div className="mt-4 grid grid-cols-2 gap-3">

            {/* CARD 1 */}

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">

              <p className="text-sm font-semibold text-white">
                Informasi Lelang
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Informasi mengenai kegiatan dan
                proses lelang kendaraan roda dua dan roda empat.
              </p>

            </div>


            {/* CARD 2 */}

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">

              <p className="text-sm font-semibold text-white">
                Kendaraan Lelang
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Berbagai merk dan type unit dengan berbagai kondisi
                dan harga yang menarik.
              </p>

            </div>


            {/* CARD 3 */}

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">

              <p className="text-sm font-semibold text-white">
                Layanan Otolink
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Informasi layanan yang disediakan
                oleh PT Balai Lelang Megatama
                baik online maupun offline (on site).
              </p>

            </div>


            {/* CARD 4 */}

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">

              <p className="text-sm font-semibold text-white">
                Akses Website
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                Akses langsung menuju website resmi
                Otolink untuk mengikuti proses lelang.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            PREVIEW WEBSITE
        ================================================= */}

        <div className="mt-7">

          <div className="dashboard-enter mb-3 flex items-center gap-2">

            <Globe
              size={16}
              className="text-red-500"
            />

            <h2 className="text-sm font-semibold text-white">
              Preview Website
            </h2>

          </div>


          {/* =================================================
              PREVIEW 1
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl">

            <button
              type="button"
              onClick={() => openPreview(previewImages[0])}
              className="block w-full cursor-pointer"
            >

              <img
                src={previewImages[0]}
                alt="Preview Website Otolink 1"
                className="block h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
              />

            </button>

          </div>


          {/* =================================================
              PREVIEW 2
          ================================================= */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl">

            <button
              type="button"
              onClick={() => openPreview(previewImages[1])}
              className="block w-full cursor-pointer"
            >

              <img
                src={previewImages[1]}
                alt="Preview Website Otolink 2"
                className="block h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
              />

            </button>

          </div>


          {/* =================================================
              PREVIEW 3
          ================================================= */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl">

            <button
              type="button"
              onClick={() => openPreview(previewImages[2])}
              className="block w-full cursor-pointer"
            >

              <img
                src={previewImages[2]}
                alt="Preview Website Otolink 3"
                className="block h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
              />

            </button>

          </div>


          {/* =================================================
              PREVIEW 4
          ================================================= */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl">

            <button
              type="button"
              onClick={() => openPreview(previewImages[3])}
              className="block w-full cursor-pointer"
            >

              <img
                src={previewImages[3]}
                alt="Preview Website Otolink 4"
                className="block h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
              />

            </button>

          </div>


          {/* =================================================
              PREVIEW 5
          ================================================= */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-2xl">

            <button
              type="button"
              onClick={() => openPreview(previewImages[4])}
              className="block w-full cursor-pointer"
            >

              <img
                src={previewImages[4]}
                alt="Preview Website Otolink 5"
                className="block h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
              />

            </button>

          </div>

        </div>


        {/* =================================================
            CTA BAWAH
        ================================================= */}

        <div className="mt-6">

          <a
            href={OTOLINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-enter flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-sm font-semibold text-white transition hover:bg-red-500"
          >

            Kunjungi Website Otolink

            <ExternalLink size={16} />

          </a>

        </div>

      </section>


      {/* =====================================================
          IMAGE POPUP + ZOOM
      ===================================================== */}

      {selectedImage && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={closePreview}
        >

          {/* CLOSE */}

          <button
            type="button"
            onClick={closePreview}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20"
          >
            ×
          </button>


          {/* IMAGE */}

          <img
            src={selectedImage}
            alt="Preview Website Otolink"
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
            }}
            onClick={(event) => event.stopPropagation()}
          />


          {/* ZOOM CONTROL */}

          <div
            className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/70 p-2 backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
          >

            {/* ZOOM OUT */}

            <button
              type="button"
              onClick={() =>
                setZoom((current) =>
                  Math.max(1, current - 0.25)
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
            >
              −
            </button>


            {/* PERCENTAGE */}

            <span className="min-w-[50px] text-center text-xs text-white">
              {Math.round(zoom * 100)}%
            </span>


            {/* ZOOM IN */}

            <button
              type="button"
              onClick={() =>
                setZoom((current) =>
                  Math.min(3, current + 0.25)
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
            >
              +
            </button>

          </div>

        </div>

      )}

    </main>
  );
}