"use client";

import {
  Monitor,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export default function WebPartnerPage() {
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
                        <Monitor size={30} />
                    </div>

                    <div>

                        <p className="text-sm font-medium">
                            <span className="text-red-500">Daha.</span>
                            <span className="text-white">Stampart</span>
                        </p>

                        <h1 className="text-3xl font-bold sm:text-5xl">
                            Web <span className="text-red-500">Partner</span>
                        </h1>

                    </div>

                </div>


                <p className="mt-6 text-sm leading-7 text-zinc-300 sm:text-base">
                    Daftarkan website dan aplikasi digital anda
                    menjadi partner Daha.Stampart untuk membantu
                    mendapatkan pengunjung lebih cepat dan lebih mudah dikenali.
                </p>

            </div>


            {/* Service */}
            <div className="mt-10 grid gap-4 md:grid-cols-2">

                {/* Web Development */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                    <h2 className="text-lg text-red-500 font-semibold">
                        Partner Aktif
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-zinc-300">
                        Daha.Stampart sudah dipercaya oleh berbagai
                        website dan aplikasi digital sebagai salah satu
                        media promosi untuk mengembangkan bisnis, website,
                        ataupun aplikasi digital.
                    </p>

                </div>


                {/* Free partnership */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                    <h2 className="text-lg text-red-500 font-semibold">
                        Free Partnership
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-zinc-300">
                        Ajukan website, aplikasi,
                        atau platform digital anda menjadi  partner kami
                        tanpa biaya apapun, selama  periode promosi masih berlangsung.
                    </p>

                </div>

            </div>


            {/* CTA */}
            <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">

                <h2 className="text-xl font-semibold">
                    Ajukan Platform{" "}
                    <span className="text-red-500">
                    Digital Anda
                    </span>
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Ajukan platform digital anda dan
                    jadikan platform anda lebih dikenal.
                </p>


                <a
                    href="https://wa.me/6281351919309?text=Type%20%3A%20PENGAJUAN%20WEB%20PARTNER%0A%0AHi%20Daha.Stampart%2C%0ASaya%20ingin%20mengajukan%20partnership%0A%0ANama%20%3A%20%0ALink%20platform%20%3A%20%0ADeskripsi%20platform%20%3A%20%0A%28jelaskan%20website%20atau%20aplikasi%20yang%20akan%20anda%20ajukan%29%0A%0AThanks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold transition hover:bg-red-400"
                >
                    <MessageCircle size={17} />
                    Ajukan Sekarang
                </a>

            </div>

        </section>

    </main>
  );
}