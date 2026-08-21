"use client";

import { ArrowLeft, BookOpen, Search, Tags, Library, ClipboardCheck, Boxes, Grid2X2, Home, Info} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TentangPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 px-4">

                    <h1 className="text-[24px] font-bold text-slate-900">
                        Tentang
                    </h1>

                </header>

                {/* CONTENT */}
                <section className="px-5 pb-10 pt-6">

                    {/* HERO */}
                    <div className="text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                            <Library
                                size={32}
                                strokeWidth={1.8}
                                className="text-blue-600"
                            />
                        </div>

                        <h2 className="mt-4 text-[18px] font-bold text-slate-900">
                            Perpustakaan Digital
                        </h2>

                        <p className="mt-1 text-[10px] font-medium text-blue-600">
                            Library Management System
                        </p>

                    </div>

                    {/* ABOUT */}
                    <div className="mt-6">

                        <h3 className="text-[13px] font-bold text-slate-900">
                            Tentang Perpustakaan Digital
                        </h3>

                        <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
                            Perpustakaan Digital merupakan
                            bagian dari Library Management
                            System (LMS) yang dirancang untuk
                            memberikan kemudahan dalam
                            mengakses, menemukan, dan
                            mengelola koleksi buku secara
                            digital.
                        </p>

                        <p className="mt-3 text-[10px] leading-relaxed text-slate-600">
                            Melalui platform ini, pengguna
                            dapat menjelajahi berbagai
                            koleksi buku, mencari berdasarkan
                            judul, penulis, maupun kategori,
                            melihat detail dan sinopsis buku,
                            serta mengetahui ketersediaan
                            buku dengan lebih mudah dan
                            praktis.
                        </p>

                    </div>

                    {/* FEATURES */}
                    <div className="mt-6">

                        <h3 className="text-[13px] font-bold text-slate-900">
                            Fitur Utama
                        </h3>

                        <div className="mt-3 flex flex-col gap-2.5">

                            {/* SEARCH */}
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                    <Search
                                        size={18}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-slate-800">
                                        Pencarian Buku
                                    </p>

                                    <p className="mt-0.5 text-[8px] leading-relaxed text-slate-500">
                                        Cari buku berdasarkan
                                        judul, penulis, atau
                                        kategori.
                                    </p>
                                </div>

                            </div>

                            {/* CATALOG */}
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50">
                                    <BookOpen
                                        size={18}
                                        className="text-green-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-slate-800">
                                        Katalog Buku
                                    </p>

                                    <p className="mt-0.5 text-[8px] leading-relaxed text-slate-500">
                                        Jelajahi seluruh
                                        koleksi buku yang
                                        tersedia.
                                    </p>
                                </div>

                            </div>

                            {/* CATEGORY */}
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                    <Tags
                                        size={18}
                                        className="text-orange-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-slate-800">
                                        Kategori Buku
                                    </p>

                                    <p className="mt-0.5 text-[8px] leading-relaxed text-slate-500">
                                        Temukan koleksi
                                        berdasarkan kategori.
                                    </p>
                                </div>

                            </div>

                            {/* BOOK DETAIL */}
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50">
                                    <ClipboardCheck
                                        size={18}
                                        className="text-purple-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-slate-800">
                                        Detail & Ketersediaan
                                    </p>

                                    <p className="mt-0.5 text-[8px] leading-relaxed text-slate-500">
                                        Lihat detail buku,
                                        sinopsis, Ready, dan
                                        Dipinjam.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* QUOTE */}
                    <div className="mt-3 text-center">

                        <BookOpen
                            size={18}
                            className="mx-auto text-blue-600"
                        />

                        <p className="mt-2 text-[11px] font-semibold italic leading-relaxed text-slate-600">
                            “Temukan buku favorit Anda dan
                            nikmati pengalaman membaca yang
                            lebih mudah.”
                        </p>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-3 mb-6 text-center">

                        <p className="text-[11px] font-semibold text-blue-600">
                            by Muhammad Azhar Amin
                        </p>

                    </div>

                </section>

                {/* BOTTOM NAVIGATION */}
                <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 px-4 pb-1 pt-1 backdrop-blur-md">
                    <div className="grid grid-cols-4">
                        {/* BERANDA */}
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/web-partner/lms")
                            }
                            className="flex flex-col items-center justify-center gap-0.5 text-slate-400"
                        >
                        <Home
                                size={18}
                                strokeWidth={2}
                            />
                            <span className="text-[11px] font-semibold">
                                Beranda
                            </span>
                        </button>

                        {/* KATALOG */}
                        <button
                            type="button"
                            className="flex flex-col items-center justify-center gap-0.5 text-slate-400"
                        >
                            <Grid2X2
                                size={18}
                                strokeWidth={2}
                            />
                            <span className="text-[11px] font-medium">
                                Katalog
                            </span>
                        </button>

                        {/* KATEGORI */}
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/web-partner/lms/kategori")
                            }
                            className="flex flex-col items-center justify-center gap-0.5 text-slate-400"
                        >
                            <Boxes
                                size={18}
                                strokeWidth={2}
                            />
                            <span className="text-[11px] font-medium">
                                Kategori
                            </span>
                        </button>

                        {/* TENTANG */}
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/web-partner/lms/tentang")
                            }
                            className="flex flex-col items-center justify-center gap-0.5 text-blue-500"
                        >
                            <Info
                                size={18}
                                strokeWidth={2.5}
                            />
                            <span className="text-[11px] font-medium">
                                Tentang
                            </span>
                        </button>

                    </div>
                </nav>

            </div>
        </main>
    );
}