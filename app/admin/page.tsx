"use client";
import { useEffect } from "react";

import {
    Plus,
    Pencil,
    ArrowLeft,
    LogOut,
 } from "lucide-react";

 export default function AdminPage() {
  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/dashboard";
  };

  useEffect(() => {
     const checkSession = async () => {
     try {
      const response = await fetch("/api/admin/session", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        window.location.replace("/admin/login");
      }
     } catch {
      window.location.replace("/admin/login");
     }
     };

     checkSession();

     const handlePageShow = () => {
     checkSession();
     };

     window.addEventListener("pageshow", handlePageShow);

     return () => {
     window.removeEventListener("pageshow", handlePageShow);
     };
    }, []);

 return (
    <main className="dashboard-enter min-h-screen bg-[#07090f] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]/90">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6">

         <div className="ml-6">
             <h1 className="text-lg font-semibold">
                 Admin Dashboard
             </h1>

             <p className="text-xs text-zinc-500">
                  Kelola portfolio Daha.Stampart
             </p>
         </div>

         <button
             type="button"
             onClick={handleLogout}
             className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-red-400"
             >
             <LogOut size={18} />
             Logout
         </button>


        </div>
      </header>


     {/* CONTENT */}
     <section className="mx-auto max-w-[1200px] px-6 py-10">
         <div className="grid gap-6 sm:grid-cols-2">
             {/* TAMBAH DESAIN */}
             <a
                 href="/admin/portfolio"
                 className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-red-500/40"
                 >

                 <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                     <Plus size={22} />
                 </div>

                 <h2 className="text-lg font-semibold">
                     Tambah Desain
                 </h2>

                 <p className="mt-2 text-sm leading-6 text-zinc-500">
                     Tambahkan karya baru ke portfolio Daha.Stampart.
                 </p>
             </a>

             {/* KELOLA DESAIN */}
             <a
                 href="/admin/portfolio/manage"
                 className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-red-500/40"
                 >

                 <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                     <Pencil size={22} />
                 </div>

                 <h2 className="text-lg font-semibold">
                     Kelola Desain
                 </h2>

                 <p className="mt-2 text-sm leading-6 text-zinc-500">
                     Edit, ganti cover, tambah gambar, atau hapus portfolio.
                 </p>
             </a>
         </div>
     </section>

    </main>
 );
}