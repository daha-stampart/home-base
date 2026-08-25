"use client";

import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Mail,
  Sparkles,
  Palette,
  Monitor,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07090f] text-white">

        {/* =========================================================
          CONTENT
        ========================================================= */}
        <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

            {/* Back */}
            <a
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
                >
                <ArrowLeft size={16} />
                Kembali ke Home
            </a>


            {/* =========================================================
                HERO
            ========================================================= */}
            <div className="mt-12 max-w-4xl">

                <p className="text-sm font-medium">
                    <span className="text-red-500">Daha.</span>
                    <span className="text-white">Stampart</span>
                </p>

                <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">
                    Tentang Kami
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                    Daha.Stampart hadir untuk membantu bisnis, brand dan individu
                    menghadirkan visual yang lebih kuat, profesional dan berkesan.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                    Kami percaya bahwa sebuah desain bukan hanya tentang tampilan,
                    tetapi tentang bagaimana sebuah ide dapat disampaikan dengan
                    tepat dan memiliki karakter.
                </p>

            </div>

            {/* =========================================================
                ABOUT
            ========================================================= */}
            <div className="mt-12 grid gap-4 md:grid-cols-2">

                {/* Vision */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <Sparkles size={22} />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold">
                        Ide yang <span className="text-red-500">Berarti</span>
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        Setiap kebutuhan memiliki cerita dan tujuan yang berbeda.
                        Karena itu, kami mengutamakan proses memahami ide sebelum
                        menerjemahkannya menjadi sebuah karya visual.
                    </p>

                </div>

                {/* Approach */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <Lightbulb size={22} />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold">
                        Kreatif & <span className="text-red-500">Profesional</span>
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        Kami menggabungkan kreativitas, komunikasi dan perhatian
                        terhadap detail untuk menghasilkan solusi visual yang
                        relevan dengan kebutuhan Anda.
                    </p>

                </div>

            </div>

            {/* =========================================================
                WHAT WE DO
            ========================================================= */}
            <div className="mt-12">

                <h2 className="text-2xl font-bold sm:text-3xl">
                    Apa yang <span className="text-red-500">Kami Kerjakan</span>
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Dari sebuah ide hingga menjadi visual yang siap digunakan.
                </p>


                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Graphic Design */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <Palette size={22} />
                        </div>

                        <h3 className="mt-5 font-semibold">
                            Desain Grafis
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            Berbagai kebutuhan desain untuk media cetak maupun digital.
                        </p>

                    </div>


                    {/* Branding */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <Lightbulb size={22} />
                        </div>

                        <h3 className="mt-5 font-semibold">
                            Branding & Identity
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            Membangun identitas visual yang kuat dan mudah dikenali.
                        </p>

                    </div>


                    {/* Digital */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <Monitor size={22} />
                        </div>

                        <h3 className="mt-5 font-semibold">
                            Digital Solution
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            Website dan kebutuhan digital untuk mendukung aktivitas
                            dan perkembangan bisnis.
                        </p>

                    </div>

                </div>

            </div>

            {/* =========================================================
                CONTACT
            ========================================================= */}

            <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6 sm:p-8">

                <div className="max-w-2xl">

                    <p className="text-sm font-medium text-red-500">
                    Hubungi Kami
                    </p>

                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                    Punya ide atau kebutuhan?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Ceritakan kebutuhan Anda kepada kami. Mari berdiskusi dan
                    temukan solusi yang tepat untuk ide, brand maupun bisnis Anda.
                    </p>

                </div>


                {/* Contact Buttons */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/6281351919309"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-red-500/40 hover:bg-white/[0.04]"
                        >

                        <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                                <MessageCircle size={20} />
                            </div>

                            <div>

                                <p className="text-sm font-semibold">
                                    Kontak
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                    Hubungi kami melalui WhatsApp
                                </p>

                            </div>

                        </div>

                        <ArrowRight
                            size={17}
                            className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-500"
                        />

                    </a>

                    {/* Email */}
                    <a
                        href="mailto:daha.stampart@gmail.com"
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-red-500/40 hover:bg-white/[0.04]"
                        >

                        <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                                <Mail size={20} />
                            </div>

                            <div>

                                <p className="text-sm font-semibold">
                                    Email
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                    daha.stampart@gmail.com
                                </p>

                            </div>

                        </div>

                        <ArrowRight
                            size={17}
                            className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-500"
                        />

                    </a>

                </div>

            </div>

            {/* =========================================================
                FOOTER CTA
            ========================================================= */}

            <div className="py-12 text-center">

                <p className="text-sm text-zinc-500">
                    Daha.Stampart
                </p>

                <p className="mt-2 text-xs text-zinc-600">
                    Desain yang Berbicara, Visual yang Menggugah.
                </p>

            </div>

        </section>

    </main>
  );
}