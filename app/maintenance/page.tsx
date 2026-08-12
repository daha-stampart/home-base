"use client";

import { ArrowLeft, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MaintenancePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07090f] px-6 text-white">

      <div className="w-full max-w-lg text-center">

        {/* ================= ICON ================= */}

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-500">
          <Wrench size={36} />
        </div>

        {/* ================= TITLE ================= */}

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
          Under Maintenance
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Coming Soon
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-400">
          Maaf halaman ini sedang dalam proses pengembangan.
          Silakan kembali lagi nanti.
        </p>

        {/* ================= BACK ================= */}

        <button
          type="button"
          onClick={() => router.back()}
          className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-400 active:scale-[0.98]"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />

          Kembali
        </button>

      </div>

    </main>
  );
}