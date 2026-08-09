"use client";

import { ArrowLeft, Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07090f] px-6 text-white">

      <div className="w-full max-w-lg text-center">

        {/* Icon */}

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-500">
          <Wrench size={36} />
        </div>

        {/* Title */}

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

        {/* Back */}

        <a
          href="/dashboard"
          className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-semibold transition hover:bg-red-400"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />

          Kembali ke Dashboard
        </a>

      </div>

    </main>
  );
}