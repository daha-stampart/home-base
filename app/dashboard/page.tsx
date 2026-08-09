"use client";

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

const portfolio = [
  {
    title: "Company Profile Otolink",
    category: "Desain Company Profile",
    image: "/images/portfolio-otolink.jpg",
  },
  {
    title: "Promo Kopiku",
    category: "Desain Promosi",
    image: "/images/portfolio-kopiku.jpg",
  },
  {
    title: "Branding Axelon",
    category: "Brand Identity",
    image: "/images/portfolio-axelon.jpg",
  },
  {
    title: "Social Media Design",
    category: "Konten Instagram",
    image: "/images/portfolio-social.jpg",
  },
  {
    title: "Event Banner Otolink",
    category: "Desain Banner Event",
    image: "/images/portfolio-event.jpg",
  },
];

export default function DashboardPage() {
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
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo-ds.png"
              alt="Daha.Stampart"
              className="h-10 w-auto object-contain"
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
              Portfolio
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

            <a
             href="/admin/login"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-500/40 hover:text-white"
             >
              <UserRound size={18} />
            </a>

          </div>

        </div>

      </header>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0 bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/images/hero-ds.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-[#07090f]/65" />

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />


        <div className="relative mx-auto grid min-h-[620px] max-w-[1400px] items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">

         {/* LEFT */}
         
         <div className="hero-bounce">
           <p className="text-lg font-medium text-white">
             Hai, selamat datang di
           </p>

           <h1 className="mt-3 text-6xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl xl:text-8xl">
             <span className="text-red-500">
               Daha.
             </span>

             <span className="text-white">
               Stampart
             </span>

            </h1>

            <h2 className="mt-5 max-w-xl text-xl font-semibold leading-8 sm:text-2xl">

             <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
               Desain yang Berbicara, Visual yang Menggugah.
             </span>

            </h2>

           <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
             Solusi desain grafis profesional untuk kebutuhan branding,
             promosi, dan komunikasi visual yang membantu Anda
             tampil beda dan berkesan.
           </p>


           {/* Buttons */}

           <div className="mt-8 flex flex-wrap gap-4">
             <a
               href="/portofolio"
               className="group inline-flex items-center gap-3 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-semibold transition hover:bg-red-400"
               >
               Lihat Portfolio

               <ArrowRight
                 size={17}
                 className="transition-transform group-hover:translate-x-1"
                />
             </a>


             <a
               href="/maintenance"
               className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.07]"
               >
               <Download size={17} />

                Unduh CV
             </a>

            </div>


           {/* Contact & Exit */}

           <div className="mt-7 flex items-center gap-3">
             {/* WhatsApp */}
             <a
               href="https://wa.me/6285772051611"
               target="_blank"
               rel="noopener noreferrer"
               className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-green-500/40 hover:text-green-400"
               aria-label="WhatsApp"
               >
               <MessageCircle size={19} />
             </a>

             {/* Gmail */}
             <a
               href="mailto:daha.stampart@gmail.com"
               className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
               aria-label="Gmail"
               >
               <Mail size={19} />
             </a>

             {/* Exit */}
             <a
               href="/"
               className="group ml-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-red-500/40 hover:text-white"
               >
               <LogOut
                 size={17}
                 className="transition-transform group-hover:-translate-x-1"
                />
               Exit
             </a>
           </div>
         </div>
        
         {/* RIGHT VISUAL */}
         {/* Red glow */}

         <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-red-600/20 blur-[70px]" />


        </div>

      </section>


     {/* =========================================================
          SERVICES
      ========================================================= */}

     <section className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
       <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] md:grid-cols-2 lg:grid-cols-4">
         {services.map((service, index) => {
           const Icon = service.icon;

           return (
             <a
               key={service.title}
               href="/maintenance"
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
          PORTFOLIO
      ========================================================= */}

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">

       <div className="flex items-end justify-between gap-5">
         <div>
           <h2 className="text-3xl font-bold sm:text-4xl">
             Portfolio Terbaru
           </h2>

           <p className="mt-2 text-sm text-zinc-500">
             Beberapa karya pilihan yang telah saya kerjakan.
           </p>
         </div>


         <a
           href="/portofolio"
           className="hidden items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400 sm:flex"
           >
           Lihat Semua Portfolio

           <ArrowRight size={16} />
         </a>

        </div>


       <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
         {portfolio.map((item) => (

         <a
           href="/portfolio"
           key={item.title}
           className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
           >

           <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
             <img
               src={item.image}
               alt={item.title}
               className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
               onError={(event) => {
               event.currentTarget.style.display = "none";
               }}
              />

             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-500/20 via-transparent to-purple-500/20">
               <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                 Portfolio
               </span>
             </div>
           </div>


           <div className="p-4">
             <h3 className="text-sm font-semibold">
               {item.title}
             </h3>

             <p className="mt-1 text-xs text-zinc-600">
               {item.category}
             </p>
           </div>
         </a>
         ))}
        </div>


       <div className="mt-6 flex justify-center sm:hidden">
         <a
           href="/portfolio"
           className="flex items-center gap-2 text-sm font-semibold text-red-500"
           >
           Lihat Semua Portfolio
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
             <p className="max-w-2xl text-lg font-medium leading-7">
               Desain bukan hanya tentang estetika,
               <br className="hidden sm:block" />
               tapi tentang pesan yang{" "}
               <span className="text-red-400">
                 menyampaikan gagasan.
               </span>
             </p>

           </div>
         </div>


         <div className="flex shrink-0 items-center gap-4">
           <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-500 sm:flex">
             <MessageCircle size={19} />
           </div>

           <div className="hidden lg:block">
               <p className="text-sm font-semibold">
                 Punya proyek?
             </p>

             <p className="mt-1 text-xs text-zinc-600">
               Realisasikan ide Anda menjadi kenyataan!
             </p>
           </div>

           <a
             href="/about"
             className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3.5 text-sm font-semibold transition hover:bg-red-400"
             >
             Hubungi Saya
             <ArrowRight size={17} />
           </a>
         </div>

        </div>

      </section>


     {/* FOOTER */}

     <footer className="border-t border-white/[0.06] px-6 py-7">
       <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-3 text-xs text-zinc-600 sm:flex-row">
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