"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  BriefcaseBusiness,
  Users,
  Star,
  PenTool,
  Grid3X3,
  List,
  ChevronDown,
  UserRound,
} from "lucide-react";

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

export default function PortfolioPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("Semua Karya");
  const [sortOrder, setSortOrder] = useState("Terbaru");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}?action=getPortfolio`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.error || "Gagal mengambil data portfolio."
          );
        }

        setPortfolios(result.data || []);
      } catch (err) {
        console.error(err);

        setError(
          "Portfolio belum dapat dimuat."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  const filteredPortfolios =
  activeCategory === "Semua Karya"
    ? [...portfolios]
    : portfolios.filter(
        (item) =>
          item.kategori === activeCategory
      );

filteredPortfolios.sort((a, b) => {
  const dateA = new Date(a.tanggal).getTime();
  const dateB = new Date(b.tanggal).getTime();

  if (sortOrder === "Terbaru") {
    return dateB - dateA;
  }

  return dateA - dateB;
});

  const getCoverUrl = (fileId: string) => {
  if (!fileId) return "";

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
 };

  return (
    <main className="dashboard-enter relative min-h-screen bg-[#07090f] text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">

          {/* Logo */}
          <a
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo-ds.png"
              alt="Daha.Stampart"
              className="h-9 w-auto object-contain"
            />

            <span className="text-xl font-semibold tracking-tight">
              <span className="text-red-500">
                Daha.
              </span>

              <span className="text-white">
                Stampart
              </span>
            </span>
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="/dashboard"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Home
            </a>

            <a
              href="/portfolio"
              className="relative py-20 text-base font-medium text-red-500"
            >
              Portofolio

              <span className="absolute bottom-18 left-0 h-[2px] w-full bg-red-500" />
            </a>

            <a
              href="/maintenance"
              className="py-20 text-base font-medium text-zinc-300 transition hover:text-white"
            >
              Produk
            </a>

            <a
              href="/maintenance"
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
              href="/maintenance"
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

        {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="fixed left-0 right-0 top-16 z-40 border-b border-white/[0.06] bg-[#07090f]/95 backdrop-blur-xl lg:hidden">
              <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-4">

                <a
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-white/[0.06] py-3 text-sm font-medium text-zinc-300"
                  >
                  Home
                </a>

                <a
                  href="/portofolio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-white/[0.06] py-3 text-sm font-medium text-red-500"
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
                  href="/maintenance"
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
        {/* Akhir Mobile Navigation */}
      </header>

      {/* AREA BACKGROUND */}
      <div className="relative overflow-hidden">

        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 bg-no-repeat opacity-100"
          style={{
            backgroundImage:
            "url('/images/portfolio-hero.png')",
            backgroundPosition: "center top, center top",
            backgroundSize: "100% auto, 100% auto",
            backgroundRepeat: "no-repeat, no-repeat",
          }}

        />

        {/* HERO */}
        <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-12 pt-20 lg:px-10">

          <div className="hero-bounce max-w-3xl">

            <p className="text-xs -translate-y-18 -translate-x-2 font-semibold uppercase tracking-[0.25em] text-red-500">
              Portofolio
            </p>

            <h1 className="mt-2 text-2xl -translate-y-18 -translate-x-2 font-bold leading-[1.25] tracking-tight text-white sm:text-6xl">

              <span className="block">
                Karya Kreatif
              </span>

              <span className="block">
                Dari Ide Menjadi{" "}
                <span className="text-red-500">
                  <br />Visual
                </span>
              </span>

            </h1>

            <p className="mt-1 -translate-y-17 -translate-x-2  max-w-2xl text-[11px] leading-5 text-white sm:text-base">
              Berbagai karya desain grafis, branding,
              konten visual, dan berbagai project kreatif
              yang telah saya kerjakan dari berbagai industri.
            </p>

          </div>

          {/* Fade Hero ke Background */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-40 z-20 h-120 bg-gradient-to-b from-transparent via-[#07090f]/70 to-[#07090f]" />
                   
        </section>

        {/* STATS */}
        <section className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">

          <div className="-translate-y-30 translate-x-5 w-full max-w-[720px] py-5">

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Projek */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <p className="text-lg font-bold leading-none text-white">
                    120+
                  </p>

                  <p className="mt-1 text-xs whitespace-nowrap text-zinc-400">
                    Project Selesai
                  </p>
                </div>

              </div>

              {/* Klien */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
                  <Users size={20} />
                </div>

                <div>
                  <p className="text-lg font-bold leading-none text-white">
                    110+
                  </p>

                  <p className="mt-1 text-xs whitespace-nowrap text-zinc-400">
                    Klien Puas
                  </p>
                </div>

              </div>

              {/* Pengalaman */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
                  <Star size={20} />
                </div>

                <div>
                  <p className="text-lg font-bold leading-none text-white">
                    8+
                  </p>

                  <p className="mt-1 text-xs whitespace-nowrap text-zinc-400">
                    Tahun Pengalaman
                  </p>
                </div>

              </div>

              {/* Dedikasi */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
                  <PenTool size={20} />
                </div>

                <div>
                  <p className="text-lg font-bold leading-none text-white">
                    100%
                  </p>

                  <p className="mt-1 text-xs whitespace-nowrap text-zinc-400">
                    Dedikasi
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

      <div className="relative -translate-y-34 z-10 mx-6 h-[2px] bg-white/20" />

      {/* PORTFOLIO GRID */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">

        {/* FILTER */}
        <div className="mt-8 flex -translate-y-40 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          {/* MOBILE CATEGORY */}
            <div className="relative w-full lg:hidden">
              <button
                type="button"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="flex h-9 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 text-[11px] font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
                >
                <span>{activeCategory}</span>

                <ChevronDown
                 size={15}
                  className={`transition-transform duration-200 ${
                  showCategoryMenu ? "rotate-180" : ""
                  }`}
                />
             </button>

              {showCategoryMenu && (
                <div className="absolute left-0 top-11 z-50 w-full overflow-hidden rounded-xl border border-white/10 bg-[#111318] p-1 shadow-2xl">
                  {[
                    "Semua Karya",
                    "Desain Grafis",
                    "Branding & Identity",
                    "Konten Visual",
                    "Produk Lain",
                  ].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setShowCategoryMenu(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-xs transition ${
                        activeCategory === category
                        ? "bg-red-500 text-white"
                        : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                      >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* DESKTOP CATEGORY */}
            <div className="hidden min-w-0 items-center gap-2 lg:flex">

              {[
                "Semua Karya",
                "Desain Grafis",
                "Branding & Identity",
                "Konten Visual",
                "Produk Lain",
              ].map((category) => (

                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                    className={
                    activeCategory === category
                    ? "shrink-0 rounded-full bg-red-500 px-5 py-2.5 text-xs font-semibold text-white"
                    : "shrink-0 rounded-full px-5 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
                  }
                  >
                  {category}
                </button>

              ))}

            </div>

          {/* RIGHT */}
         <div className="flex shrink-0 items-left gap-6">

         <div className="relative">
             <button
                 onClick={() => setShowSortMenu(!showSortMenu)}
                 className="flex h-10 items-center gap-5 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
                 >
                 {sortOrder}
                 <ChevronDown size={15} />
             </button>

             {showSortMenu && (
             <div className="absolute right-0 translate-x-10 top-12 z-50 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#111318] p-1 shadow-2xl">
                 <button
                     onClick={() => {
                     setSortOrder("Terbaru");
                     setShowSortMenu(false);
                     }}
                     className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                     >
                     Terbaru
                 </button>

                 <button
                     onClick={() => {
                     setSortOrder("Kategori");
                     setShowSortMenu(false);
                     }}
                     className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                     >
                     Kategori
                 </button>

                 <button
                     onClick={() => {
                     setSortOrder("By Nama");
                     setShowSortMenu(false);
                     }}
                     className="w-full rounded-lg px-3 py-2.5 text-left text-xs text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                     >
                     By Nama
                 </button>
             </div>
             )}
         </div>

         <button
             onClick={() => setViewMode("grid")}
                 className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                 viewMode === "grid"
                 ? "border-red-500/30 bg-red-500/10 text-red-500"
                 : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
             >
             <Grid3X3 size={17} />
         </button>

         <button
             onClick={() => setViewMode("list")}
                 className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                 viewMode === "list"
                 ? "border-red-500/30 bg-red-500/10 text-red-500"
                 : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
             >
             <List size={17} />
         </button>

          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm -translate-y-50 text-zinc-500">
              Memuat portfolio...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-8 text-center">
            <p className="text-sm -translate-y-50 text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          !error &&
          filteredPortfolios.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">

                <p className="text-lg -translate-y-50 font-semibold text-white">
                  Belum ada karya
                </p>

                <p className="mt-2 text-sm -translate-y-50 text-zinc-500">
                  Belum ada desain
                  pada kategori ini.
                </p>

              </div>
            </div>
          )}

        {/* GRID */}
        {!loading &&
          !error &&
          filteredPortfolios.length > 0 && (

         <div
             className={
             viewMode === "grid"
             ? "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
             : "mt-8 flex flex-col gap-5"
             }
             >

              {filteredPortfolios.map((item) => (

             <article
                 key={item.id}
                 className={
                 viewMode === "grid"
                 ? "group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05]"
                 : "group flex overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition duration-300 hover:border-red-500/30 hover:bg-white/[0.05]"
                 }
                 >

                  {/* COVER */}
                 <div
                     className={
                     viewMode === "grid"
                     ? "relative aspect-[4/3] overflow-hidden bg-black/30"
                     : "relative h-40 w-64 shrink-0 overflow-hidden bg-black/30"
                     }
                     >

                     {item.cover ? (
                      <img
                        src={getCoverUrl(item.cover)}
                        alt={item.judul}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                     ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm text-zinc-600">
                          Tidak ada cover
                        </span>
                      </div>
                     )}

                     {/* CATEGORY */}
                     {item.kategori && (
                     <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                         {item.kategori}
                     </div>
                     )}
                  </div>

                  {/* CONTENT */}
                 <div
                     className={
                     viewMode === "grid"
                     ? "p-5"
                     : "flex flex-1 flex-col justify-center p-6"
                     }
                     >

                     <h2 className="line-clamp-1 text-lg font-semibold text-white">
                         {item.judul}
                     </h2>

                     {item.client && (
                         <p className="mt-1 text-sm italic text-zinc-300">
                             feat. {item.client}
                        </p>
                        )}
                     {viewMode === "list" && item.deskripsi && (
                         <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                             {item.deskripsi}
                         </p>
                        )}
                  </div>

                </article>

              ))}

            </div>

          )}

      </section>

    </main>
  );
}