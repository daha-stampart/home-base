"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
   requestAnimationFrame(() => {
     setIsMounted(true);
    });
  }, []);
  const goToPage = (path: string) => {
  setIsLeaving(true);

  setTimeout(() => {
    router.push(path);
  }, 600);
  };
  
  return (
    <main
     className={`relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat text-white transition-transform duration-500 ease-in-out ${
       isLeaving ? "-translate-y-full" : "translate-y-0"
     }`}
     style={{
       backgroundImage: "url('/images/background-ds.png')",
      }}
     >

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
      </div>

      {/* Main Content */}
      <section
       className={`relative z-10 flex min-h-screen items-center justify-center px-6 transition-all duration-[1800ms] ease-out ${
         isMounted
         ? "translate-y-0 opacity-100"
         : "translate-y-[80px] opacity-0"
        }`}
       >

        <div className="w-full max-w-4xl text-center">

          {/* Logo */}
         <div className="mb-1 flex -translate-y-5 justify-center">
           <img
             src="/images/logo-ds.png"
             alt="Daha.Stampart"
             className="h-50 w-auto object-contain"
            />
          </div>

          {/* Badge */}
          <div className="-translate-y-15 mb-5 flex justify-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs tracking-wide text-zinc-400">

              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

              CREATIVE DESIGN STUDIO

            </div>

          </div>


          {/* Title */}
          <h1 className="-translate-y-15 text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.86] tracking-[-0.055em]">
          
            <span className="text-red-500">
             Daha.
            </span>

            <br />

            Stampart

          </h1>


          {/* Description */}
          <p className="-translate-y-18 mx-auto mt-10 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">

            Visual identity, graphic design, digital products,
            and creative solutions built to make your brand stand out.

          </p>


          {/* Buttons */}
          <div className="-translate-y-20 mt-10 flex justify-center gap-30">

            {/* Dashboard */}
            <button
             type="button"
             onClick={() => goToPage("/dashboard")}
             className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white/30 hover:bg-white/[0.06]"
             >
              Masuk Dashboard

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>


            {/* Portofolio */}
            <button
             type="button"
             onClick={() => goToPage("/portfolio")}
             className="group inline-flex items-center gap-3 rounded-full bg-red-500 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-red-400"
             >
              Lihat Portfolio
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}