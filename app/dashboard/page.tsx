"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  MessageCircle,
  UserRound,
  Palette,
  Monitor,
  Lightbulb,
  Clapperboard,
  LogOut,
  Mail,
} from "lucide-react";

const services = [
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
      "Logo, Identitas brand, company profile dan lainnya.",
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
      "Website dan aplikasi partner Daha.Stampart.",
  },
];

const API_URL =
  "https://script.google.com/macros/s/AKfycbx3TAa2VbIuRzL_PYjEmcEx_mnD3MAVBo4uvHzRMyMTNxPJhBq1sWN0S_qHif_2FePf/exec";

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

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const response = await fetch(
          `${API_URL}?action=getPortfolio`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        console.log(
          "DATA PORTFOLIO:",
          JSON.stringify(result.data, null, 2)
        );

        console.log(
          "COVER URL:",
          `https://drive.google.com/thumbnail?id=${result.data?.[0]?.cover}&sz=w1200`
        );

        if (!result.success) {
          throw new Error(
            result.error || "Gagal mengambil data portfolio."
          );
        }

        setPortfolio(
          (result.data || []).filter(
            (item: Portfolio) =>
              item.dashboard === true ||
              String(item.dashboard).toLowerCase() === "true"
          )
        );
      } catch (error) {
        console.error("Gagal memuat portfolio:", error);
        setPortfolio([]);
      } finally {
        setLoadingPortfolio(false);
      }
    }

    loadPortfolio();
  }, []);

  return (
    <main className="dashboard-enter min-h-screen bg-[#07090f] text-white">

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
              Stampart
            </span>
          </a>


          {/* Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="/dashboard"
              className="relative py-20 text-base font-medium text-red-500"
            >
              Home

              <span className="absolute bottom-18 left-0 h-[2px] w-full bg-red-500" />
            </a>


            <a
              href="/portofolio"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Portofolio
            </a>


            <a
              href="/maintenance"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Produk
            </a>


            <a
              href="/web-partner"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Web Partner
            </a>


            <a
              href="/maintenance"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              All About Me
            </a>

          </nav>


          {/* Right */}

          {/* Mobile Menu Button */}

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white lg:hidden"
              aria-label="Buka menu"
            >
              ☰
            </button>


            <a
              href="/maintenance"
              className="hidden items-center gap-2 rounded-full border border-red-500/70 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white sm:flex"
            >
              <MessageCircle size={16} />
              Hubungi Saya
            </a>


            <a
              href="/admin/login"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white"
            >
              <UserRound size={18} />
            </a>

          </div>

        </div>


        {/* Mobile Navigation */}

        {isMobileMenuOpen && (
          <div className="fixed left-0 right-0 top-20 z-40 border-b border-white/[0.06] bg-[#07090f]/95 backdrop-blur-xl lg:hidden">

            <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-4">

              <a
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/[0.06] py-3 text-sm font-medium text-red-500"
              >
                Home
              </a>


              <a
                href="/portofolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
              >
                Portofolio
              </a>


              <a
                href="/maintenance"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
              >
                Produk
              </a>


              <a
                href="/web-partner"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
              >
                Web Partner
              </a>


              <a
                href="/maintenance"
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
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden">

        {/* Background utama */}

        <div
          className="hero-background absolute inset-0 bg-no-repeat opacity-70"
          style={{
            backgroundImage: "url('/images/hero-ds.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />


        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-65%"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.100) 100%, rgba(0,0,0,0.100) 50%, transparent 100%)",
          }}
        />


        {/* LEFT */}

        <div className="hero-bounce translate-y-6 translate-x-5">

          <p className="text-xs font-medium text-white sm:text-lg">
            Hai, selamat datang di
          </p>


          <h1 className="mt-2 text-4xl font-bold leading-[0.9] tracking-[-0.05em] sm:text-7xl xl:text-8xl">

            <span className="text-red-500">
              Daha.
            </span>

            <span className="text-white">
              Stampart
            </span>

          </h1>


          <h2 className="mt-4 max-w-xl -translate-y-3 font-semibold leading-5 sm:text-2xl">

            <span className="text-sm bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Desain yang Berbicara,
            </span>

            <span className="text-base bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              <br />
              Visual yang Menggugah
            </span>

          </h2>


          <p className="mt-2 translate-y-10 max-w-xl text-xs leading-5 text-white-400 sm:text-lg">
            Solusi desain grafis profesional
            <br />
            untuk kebutuhan branding, promosi dan
            <br />
            komunikasi visual yang membantu Anda
            <br />
            tampil beda dan berkesan.
          </p>


          {/* Buttons */}

          <div className="mt-15 flex flex-wrap gap-10 -translate-y-2">

            <a
              href="/portofolio"
              className="group inline-flex items-center gap-3 rounded-full bg-red-500 px-4 py-3.5 text-sm font-semibold transition hover:bg-red-400"
            >
              Lihat Desain

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>


            <a
              href="/maintenance"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/[0.7] px-4 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.07]"
            >
              <Download size={17} />

              Unduh Portofolio
            </a>

          </div>

        </div>


        {/* Contact & Exit */}

        <div className="mt-7 flex items-center gap-1 translate-x-5 translate-y-0">

          {/* WhatsApp */}

          <a
            href="https://wa.me/6285772051611"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-10 items-center justify-center rounded-full border border-white/10 bg-black/[0.5] text-zinc-400 transition hover:border-green-500/40 hover:text-green-400"
            aria-label="WhatsApp"
          >
            <MessageCircle size={19} />
          </a>


          {/* Gmail */}

          <a
            href="mailto:daha.stampart@gmail.com"
            className="flex h-9 w-10 items-center justify-center rounded-full border border-white/10 bg-black/[0.5] text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
            aria-label="Gmail"
          >
            <Mail size={19} />
          </a>


          {/* Exit */}

          <a
            href="/"
            className="group ml-2 flex items-center gap-2 rounded-full border border-white/10 bg-black/[0.5] px-4 py-2 text-sm font-medium text-zinc-400 transition hover:border-red-500/40 hover:text-white"
          >
            <LogOut
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />

            Exit
          </a>

        </div>


        {/* RIGHT VISUAL */}

        {/* Red glow */}

        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-red-600/20 blur-[70px]" />

      </section>


      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section className="relative z-20 mx-auto -mt-10 max-w-[1400px] px-6 translate-y-12 lg:px-10">

        <h2 className="mt-8 mb-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          ORDER <span className="text-red-500">NOW</span>
        </h2>


        <div className="grid overflow-hidden rounded-2xl border border-white/20 bg-black/[0.7] md:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <a
                key={service.title}
                href={
                  service.title === "Web Partner"
                    ? "/web-partner"
                    : "/maintenance"
                }
                className={`group p-7 transition hover:bg-white/[0.04] ${
                  index !== services.length - 1
                    ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                    <Icon size={25} />
                  </div>


                  <div>

                    <h3 className="font-semibold">
                      {service.title}
                    </h3>


                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {service.description}
                    </p>

                  </div>

                </div>

              </a>

            );

          })}

        </div>

      </section>


      {/* =========================================================
          PORTOFOLIO
      ========================================================= */}

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">

        <div className="flex items-end translate-y-5 justify-between gap-5">

          <div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Desain Selesai
            </h2>


            <p className="mt-1 text-sm text-zinc-500">
              Beberapa karya pilihan yang telah saya kerjakan.
            </p>

          </div>


          <a
            href="/portofolio"
            className="hidden items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400 sm:flex"
          >
            Lihat Semua Desain

            <ArrowRight size={16} />
          </a>

        </div>


        {/* PORTFOLIO CARDS */}

        {loadingPortfolio ? (

          <div className="mt-6 flex min-h-[200px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">

            <p className="text-sm text-zinc-500">
              Memuat desain...
            </p>

          </div>

        ) : portfolio.length === 0 ? (

          <div className="mt-6 flex min-h-[200px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">

            <p className="text-sm text-zinc-500">
              Desain belum tersedia
            </p>

          </div>

        ) : (

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {portfolio.map((item) => (

              <a
                href={`/portofolio/${item.id}`}
                key={`${item.judul}-${item.kategori}`}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
              >

                {/* IMAGE */}

                <div className="w-full overflow-hidden bg-zinc-900">

                  <img
                    src={`https://drive.google.com/thumbnail?id=${item.cover}&sz=w1200`}
                    alt={item.judul}
                    referrerPolicy="no-referrer"
                    className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                    onError={() => {
                      console.error(
                        "GAGAL LOAD GAMBAR:",
                        item.cover
                      );
                    }}
                  />

                </div>


                {/* INFO */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="text-base font-semibold text-white">
                        {item.judul}
                      </h3>


                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        feat. {item.client}
                      </p>

                    </div>


                    {item.kategori && (

                      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-medium text-zinc-400">
                        {item.kategori}
                      </span>

                    )}

                  </div>

                </div>

              </a>

            ))}

          </div>

        )}


        {/* MOBILE — LIHAT SEMUA */}

        <div className="mt-6 flex justify-center sm:hidden">

          <a
            href="/portofolio"
            className="flex items-center gap-2 text-sm font-semibold text-blue-500"
          >
            Lihat Semua Desain

            <ArrowRight size={16} />
          </a>

        </div>

      </section>


      {/* =========================================================
          WEB PARTNER
      ========================================================= */}

      <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">

        <div className="flex items-end justify-between gap-5">

          <div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Web <span className="text-red-500">Partner</span>
            </h2>


            <p className="mt-1 text-sm text-zinc-500">
              Akses website partner yang Daha.Stampart
            </p>

          </div>


          <a
            href="/web-partner"
            className="hidden items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400 sm:flex"
          >
            Lihat Semua

            <ArrowRight size={16} />
          </a>

        </div>


        {/* WEB OTOLINK */}

        <a
          href="/web-partner/web-otolink"
          className="group mt-6 block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
        >

          {/* IMAGE */}

          <div className="w-full overflow-hidden bg-zinc-900">

            <img
              src="/images/web-otolink/web-otolink-1.png"
              alt="Website Otolink"
              className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
            />

          </div>


          {/* INFO */}

          <div className="flex items-center justify-between gap-4 p-5">

            <div>

              <h3 className="text-base font-semibold text-white">
                Website Otolink
              </h3>


              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Website resmi PT Balai Lelang Megatama (Otolink).
              </p>

            </div>


            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">

              <ArrowRight size={17} />

            </div>

          </div>

        </a>


        {/* MOBILE — LIHAT SEMUA */}

        <div className="mt-5 flex justify-center sm:hidden">

          <a
            href="/web-partner"
            className="flex items-center gap-2 text-sm font-semibold text-blue-500"
          >
            Lihat Semua Web Partner

            <ArrowRight size={16} />

          </a>

        </div>

      </section>


      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="mx-auto max-w-[1400px] px-6 pb-12 lg:px-10">

        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center md:flex-row md:text-left lg:px-12">

          <div className="flex items-start gap-5">

            <div className="text-5xl leading-none text-red-500">
              “
            </div>


            <div>

              <p className="max-w-2xl text-left text-lg font-medium leading-7">
                Desain bukan hanya tentang estetika,
                tapi tentang

                <br className="hidden sm:block" />

                <br />

                <span className="text-xl text-blod text-red-500">
                  pesan yang menyampaikan gagasan.
                </span>

              </p>

            </div>

          </div>


          <div className="-translate-y-5 items-center gap-4">

            <div className="flex h-10 w-10 translate-x-22 translate-y-1 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-500">
              <MessageCircle size={15} />
            </div>


            <div className="translate-y-2 lg:block">

              <p className="text-sm font-semibold">
                Punya proyek?
              </p>


              <p className="mt-1 translate-y-1 text-xs text-zinc-600">
                Realisasikan ide Anda menjadi kenyataan!
              </p>

            </div>


            <a
              href="/about"
              className="inline-flex translate-y-5 items-center gap-2 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-semibold transition hover:bg-red-400"
            >
              Hubungi Saya

              <ArrowRight size={17} />

            </a>

          </div>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t text-center border-white/[0.06] px-6 py-7">

        <div className="mx-auto flex max-w-[1400px] flex-col justify-center gap-3 text-xs text-zinc-600 sm:flex-row">

          <p>
            © 2003 Daha.Stampart
          </p>


          <p>
            Design • Digital • Creative
          </p>

        </div>

      </footer>

    </main>
  );
}