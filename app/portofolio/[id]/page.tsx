"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

type Portfolio = {
  id: string;
  judul: string;
  client: string;
  kategori: string;
  deskripsi: string;
  gallery: string;
  cover: string;
  dashboard: boolean;
  tanggal: string;
  folderId: string;
};

const API_URL =
  "https://script.google.com/macros/s/AKfycbx3TAa2VbIuRzL_PYjEmcEx_mnD3MAVBo4uvHzRMyMTNxPJhBq1sWN0S_qHif_2FePf/exec";

const getImageUrl = (fileId: string) => {
  if (!fileId) return "";

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
};

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [portfolio, setPortfolio] =
    useState<Portfolio | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}?action=getPortfolio&id=${encodeURIComponent(id)}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil data portofolio."
          );
        }

        const result = await response.json();

        console.log("DETAIL PORTFOLIO:", result);

        if (!result.success || !result.data) {
          throw new Error(
            result.error ||
              result.message ||
              "Portofolio tidak ditemukan."
          );
        }

        setPortfolio(result.data);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [id]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#07090f] text-white">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-zinc-500">
            Memuat desain...
          </p>
        </div>
      </main>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error || !portfolio) {
    return (
      <main className="min-h-screen bg-[#07090f] text-white">
        <section className="mx-auto max-w-4xl px-6 py-10">

          <Link
            href="/portofolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Kembali ke Portofolio
          </Link>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6 text-sm text-red-400">
            {error || "Portofolio tidak ditemukan."}
          </div>

        </section>
      </main>
    );
  }

  // =========================================
  // GALLERY
  // =========================================

  const galleryIds = portfolio.gallery
    ? portfolio.gallery
        .split(/\r?\n/)
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#07090f] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">

          <Link
            href="/portofolio"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Kembali
          </Link>

        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        {/* INFO */}
        <div className="mb-10">

          {/* CATEGORY */}
          {portfolio.kategori && (
            <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-400">
              {portfolio.kategori}
            </span>
          )}

          {/* TITLE */}
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {portfolio.judul}
          </h1>

          {/* CLIENT */}
          {portfolio.client && (
            <p className="mt-2 text-base italic text-zinc-400">
              feat. {portfolio.client}
            </p>
          )}

          {/* DATE */}
          {portfolio.tanggal && (
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
              <CalendarDays size={14} />
              {portfolio.tanggal}
            </div>
          )}

          {/* DESCRIPTION */}
          {portfolio.deskripsi && (
            <div className="mt-6 max-w-3xl">
              <p className="whitespace-pre-line text-sm leading-7 text-zinc-400">
                {portfolio.deskripsi}
              </p>
            </div>
          )}

        </div>

        {/* GALLERY */}
        {galleryIds.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {galleryIds.map((fileId, index) => (
              <div
                key={`${fileId}-${index}`}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
              >
                <img
                  src={getImageUrl(fileId)}
                  alt={`${portfolio.judul} - ${index + 1}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center">
            <p className="text-sm text-zinc-500">
              Belum ada gambar dalam album ini.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}