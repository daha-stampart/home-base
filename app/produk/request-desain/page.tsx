"use client";

import {
  Palette,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export default function RequestDesainPage() {
  return (
    <main className="min-h-screen bg-[#07090f] text-white">

      {/* =========================================================
        CONTENT
      ========================================================= */}
      <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

        {/* Back */}
        <a
          href="/produk"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke Halaman Produk
        </a>


        {/* Heading */}
        <div className="mt-10 max-w-3xl">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <Palette size={30} />
            </div>

            <div>

              <p className="text-sm font-medium">
                <span className="text-red-500">Daha.</span>
                <span className="text-white">Stampart</span>
              </p>

              <h1 className="text-3xl font-bold sm:text-5xl">
                Request <span className="text-red-500">Desain</span>
              </h1>

            </div>

          </div>

          <p className="mt-6 text-sm leading-7 text-zinc-300 sm:text-base">
            Punya ide desain yang belum masuk dalam kategori layanan kami?
            Konsultasikan langsung ide anda kepada tim Daha.Stampart.
          </p>

        </div>

        {/* Service */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">

          {/* Request Desain */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <h2 className="text-lg text-red-500 font-semibold">
              Request Desain
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
              <li>• Ceritakan ide Anda</li>
              <li>• Jelaskan kebutuhan desain</li>
              <li>• Sampaikan referensi yang Anda inginkan</li>
              <li>• Konsultasikan langsung dengan tim kami</li>
            </ul>

          </div>

        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">

          <h2 className="text-xl font-semibold">
            Konsultasikan kebutuhan{" "}
            <span className="text-red-500">
              desain Anda
            </span>
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Ceritakan ide Anda kepada tim
            Daha.Stampart.
          </p>


          <a
            href="https://wa.me/6281351919309?text=Type%20Order%20%3A%20REQUEST%20DESAIN%0A%0AHi%20Daha.Stampart%2C%0Amau%20konsultasi%20nih%0A%0ASaya%20%3A%0APunya%20ide%20mau%20buat%20%3A%0ADetailnya%20%3A%20%0A%28jelaskan%20ide%20yg%20anda%20inginkan%29%0A%0AThanks"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold transition hover:bg-red-400"
          >
            <MessageCircle size={17} />
            Konsultasi Sekarang
          </a>

        </div>

      </section>

    </main>
  );
}