"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

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

const getCoverUrl = (fileId: string) => {
  if (!fileId) return "";

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
};

export default function KelolaPortofolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}?action=getPortfolio`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data portofolio.");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Gagal mengambil data portofolio."
          );
        }

        setPortfolios(result.data || []);
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
  }, []);

  return (
    <main className="min-h-screen bg-[#07090d] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]/100">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-5">

          <Link
            href="/admin"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Kembali
          </Link>

          <div>
            <h1 className="text-xl font-semibold">
              Kelola Desain
            </h1>

            <p className="text-xs text-zinc-500">
              Kelola karya portofolio Daha.Stampart
            </p>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Semua Desain
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Pilih desain yang ingin kamu edit.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[250px] items-center justify-center text-sm text-zinc-500">
            Memuat portofolio...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          portfolios.length === 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center">
              <p className="text-zinc-400">
                Belum ada desain.
              </p>
            </div>
          )}

        {/* GRID */}
        {!loading &&
          !error &&
          portfolios.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {portfolios.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
                >

                  {/* COVER */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/30">

                    {item.cover ? (
                      <img
                        src={getCoverUrl(item.cover)}
                        alt={item.judul}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-600">
                        Tidak ada cover
                      </div>
                    )}

                    {/* CATEGORY */}
                    {item.kategori && (
                      <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                        {item.kategori}
                      </span>
                    )}

                  </div>

                  {/* INFO */}
                  <div className="p-5">

                    <h3 className="line-clamp-1 text-lg font-semibold text-white">
                      {item.judul}
                    </h3>

                    {item.client && (
                      <p className="mt-1 text-sm italic text-zinc-300">
                        feat. {item.client}
                      </p>
                    )}

                    {/* EDIT BUTTON */}
                    <Link
                      href={`/admin/portofolio/kelola/edit?id=${encodeURIComponent(
                        item.id
                      )}`}
                      className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                    >
                      <Pencil size={16} />
                      Edit Desain
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          )}

      </section>

    </main>
  );
}