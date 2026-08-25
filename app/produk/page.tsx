"use client";

import { Palette, Lightbulb, Clapperboard, Monitor, MessageCircle, UserRound } from "lucide-react";

import { useState } from "react";
const products = [
  {
    icon: Palette,
    title: "Request Desain",
    description:
      "Konsultasikan langsung apapun ide Anda ke tim Daha.Stampart.",
  },
  
  {
    icon: Palette,
    title: "Desain Grafis",
    description:
      "Undangan, banner, poster dan kebutuhan desain cetak atau digital lainnya.",
  },

  {
    icon: Lightbulb,
    title: "Branding & Identity",
    description:
      "Logo, identitas brand, company profile dan kebutuhan branding lainnya.",
  },

  {
    icon: Clapperboard,
    title: "Konten Visual",
    description:
      "Desain konten media sosial, feed, story dan kebutuhan digital lainnya.",
  },

  {
    icon: Monitor,
    title: "Web Partner",
    description:
      "Daftarkan Website dan aplikasi anda menjadi partner Daha.Stampart.",
  },
];

export default function ProdukPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
    <main className="min-h-screen bg-[#07090f] text-white">
        
        {/* =========================================================
            NAVBAR
        ========================================================= */}
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/90 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">

                {/* Logo */}
                <a
                href="/dashboard"
                className="-translate-x-10 translate-y-2 flex items-center gap-3"
                >
                    <img
                        src="/images/logo-ds.png"
                        alt="Daha.Stampart"
                        className="h-30 w-40"
                    />

                    <span className="hidden text-xl font-semibold tracking-tight sm:block">
                        <span className="text-red-500">Daha.</span>
                        <span className="text-white">Stampart</span>
                    </span>
                </a>

                {/* Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">

                    {/* Home */}
                    <a
                        href="/dashboard"
                        className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
                        >
                        Home
                    </a>

                    {/* Portofolio */}
                    <a
                        href="/portofolio"
                        className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
                        >
                        Portofolio
                    </a>

                    {/* Produk */}
                    <a
                        href="/produk"
                        className="relative py-20 text-base font-medium text-red-500"
                        >
                        Produk

                        <span className="absolute bottom-18 left-0 h-[2px] w-full bg-red-500" />
                    </a>

                    {/* Web Partner */}
                    <a
                        href="/web-partner"
                        className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
                        >
                        Web Partner
                    </a>

                    {/* All About Me */}
                    <a
                        href="/about"
                        className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
                        >
                        All About Me
                    </a>

                </nav>

                {/* Right */}
                <div className="flex items-center gap-3">

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white lg:hidden"
                        aria-label="Buka menu"
                        >
                        ☰
                    </button>


                    {/* Hubungi Saya */}
                    <a
                        href="/about"
                        className="hidden items-center gap-2 rounded-full border border-red-500/70 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white sm:flex"
                        >
                        <MessageCircle size={16} />
                        Hubungi Saya
                    </a>


                    {/* User */}
                    <a
                        href="/admin/login"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white"
                        >
                        <UserRound size={18} />
                    </a>

                </div>

            </div>


            {/* =========================================================
                MOBILE NAVIGATION
            ========================================================= */}
            {isMobileMenuOpen && (
                <div className="fixed left-0 right-0 top-20 z-40 border-b border-white/[0.06] bg-[#07090f]/95 backdrop-blur-xl lg:hidden">

                    <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-4">

                        {/* Home */}
                        <a
                            href="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                            >
                            Home
                        </a>

                        {/* Portofolio */}
                        <a
                            href="/portofolio"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                            >
                            Portofolio
                        </a>

                        {/* Produk - ACTIVE */}
                        <a
                            href="/produk"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="border-b border-white/[0.06] py-3 text-sm font-medium text-red-500"
                            >
                            Produk
                        </a>

                        {/* Web Partner */}
                        <a
                            href="/web-partner"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                            >
                            Web Partner
                        </a>

                        {/* All About Me */}
                        <a
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-3 text-sm font-medium text-zinc-300"
                            >
                            All About Me
                        </a>

                    </nav>

                </div>
            )}

        </header>

        {/* =========================================================
         MENU
        ========================================================= */}
      <section className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">
        <div className="mb-10">
          <p className="text-2xl font-semibold">
            <span className="text-red-500">Daha.</span>
            <span className="text-white">Stampart</span>
        </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Produk & Layanan
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Solusi desain, branding, konten visual dan kebutuhan digital
            untuk membantu ide Anda tampil lebih kuat dan berkesan.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon;

            {/* REQUEST DESAIN */}
            if (product.title === "Request Desain") {
              return (
                <a
                  key={product.title}
                  href="/produk/request-desain"
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04]"
                  >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            }

            {/* DESAIN GRAFIS */}
            if (product.title === "Desain Grafis") {
              return (
                <a
                  key={product.title}
                  href="/produk/desain-grafis"
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            }

            {/* BRANDING & IDENTITY */}
            if (product.title === "Branding & Identity") {
              return (
                <a
                  key={product.title}
                  href="/produk/branding"
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04]"
                  >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            }

            {/* KONTEN VISUAL */}
            if (product.title === "Konten Visual") {
              return (
                <a
                  key={product.title}
                  href="/produk/konten-visual"
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04]"
                  >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            }

            {/* WEB PARTNER */}
            if (product.title === "Web Partner") {
              return (
                <a
                  key={product.title}
                  href="/produk/web-partner"
                  className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.04]"
                  >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            }

          })}
          
        </div>
      </section>
    </main>
  );
}