"use client";

import {
 MessageCircle,
 Moon,
 BriefcaseBusiness,
 Users,
 Star,
 PenTool,
 Grid3X3,
 List,
 ChevronDown,
} from "lucide-react";

export default function PortfolioPage() {
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
                     <a
                         href="/maintenance"
                         className="hidden items-center gap-2 rounded-full border border-red-500/70 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white sm:flex"
                         >
                         <MessageCircle size={16} />
                         Hubungi Saya
                     </a>

                     <button
                         type="button"
                         className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-white/20 hover:text-white"
                         >
                         <Moon size={18} />
                      </button>
                 </div>
             </div>
         </header>
         
         {/* AREA BACKGROUND */}
         <div className="relative overflow-hidden"> 
             {/* Background */}
             <div
                 className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                 style={{
                     backgroundImage: "url('/images/portfolio-hero.png')",
                    }}
                />

             {/* Dark Overlay */}
             <div className="pointer-events-none absolute inset-0 bg-[#07090f]/55" />

             {/* Bottom Gradient */}
             <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-[#07090f] via-[#1b080f]/80 to-transparent" />
             
             {/* Vignette */}
             <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.75)_100%)]" />

             {/* HERO PORTFOLIO */}

             <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-12 pt-20 lg:px-10">
                 <div className="hero-bounce max-w-3xl">
                     <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
                         Portofolio
                     </p>

                     <h1 className="mt-4 text-5xl font-bold leading-[1.25] tracking-tight text-white sm:text-6xl">
                         <span className="block">
                             Karya Kreatif
                         </span>

                         <span className="block">
                             Dari Ide Menjadi{" "}
                             <span className="text-red-500">
                                 Visual
                             </span>
                         </span>
                     </h1>

                     <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                         Berbagai karya desain grafis, branding, konten visual, 
                         dan berbagai project kreatif yang telah saya kerjakan dari berbagai industri.
                     </p>
                 </div>
             </section>

             {/* STATS */}
             <section className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
                 <div className="w-full max-w-[720px] py-5">
                     <div className="grid grid-cols-4 gap-8">
                         {/* Projek Selesai */}
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

                         {/* Klien Puas */}
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
         
         <div className="relative z-10 mx-6 h-[2px] bg-white/30" />

         {/* PORTFOLIO GRID */}
         <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
                  {/* PORTFOLIO FILTER */}
             <div className="mt-8 flex items-center justify-between gap-6">
                 {/* LEFT CONTROLS */}
                 <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
                     <button className="shrink-0 rounded-full bg-red-500 px-5 py-2.5 text-xs font-semibold text-white">
                         Semua Karya
                     </button>

                     <button className="shrink-0 rounded-full px-5 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">
                         Desain Grafis
                     </button>

                     <button className="shrink-0 rounded-full px-5 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">
                         Branding & Identity
                     </button>

                     <button className="shrink-0 rounded-full px-5 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">
                         Konten Visual
                     </button>

                     <button className="shrink-0 rounded-full px-5 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">
                         Produk Lain
                     </button>
                 </div>

                 {/* RIGHT CONTROLS */}
                 <div className="flex shrink-0 items-center gap-6">
                     {/* SORTING */}
                     <button className="flex h-10 items-center gap-5 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:text-white">
                         Terbaru
                         <ChevronDown size={15} />
                     </button>

                     {/* GRID */}
                     <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 transition hover:bg-red-500/20">
                         <Grid3X3 size={17} />
                     </button>

                     {/* LIST */}

                     <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-white/20 hover:text-white">
                         <List size={17} />
                     </button>
                 </div>
             </div>

             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                 {/* Karya nanti masuk di sini */}
             </div>
         </section>
     </main>
    );
}