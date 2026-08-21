"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { BookOpen, Boxes, Grid2X2, Home, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL =
"https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

function KategoriContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("nama") || "";
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await fetch(
                    `${API_URL}?action=getBooks`,
                    {
                        cache: "no-store",
                    }
                );

                const result = await response.json();

                if (result.success) {
                    setBooks(result.books || []);
                }
            } catch (error) {
                console.error(
                    "Gagal mengambil data buku:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    // =========================
    // DAFTAR KATEGORI
    // =========================

    const categories = useMemo(() => {
        const map = new Map<
            string,
            {
                name: string;
                titles: Set<string>;
            }
        >();

        books.forEach((book) => {
            const kategori = String(
                book.kategori || ""
            ).trim();

            const judul = String(
                book.judul || ""
            ).trim();

            if (!kategori || !judul) return;

            const kategoriKey =
                kategori.toLowerCase();

            if (!map.has(kategoriKey)) {
                map.set(kategoriKey, {
                    name: kategori,
                    titles: new Set(),
                });
            }

            map.get(kategoriKey)!.titles.add(
                judul.toLowerCase()
            );
        });

        return Array.from(map.values())
        .map((category) => ({
            name: category.name,
            count: category.titles.size,
        }))
            
        .sort((a, b) =>
            a.name.localeCompare(
                b.name,
                "id",
                { sensitivity: "base", }
            )
        );
    }, [books]);

    // =========================
    // KATEGORI YANG DIPILIH
    // ========================

    const categoryBooks = useMemo(() => {
        if (!selectedCategory) {
            return [];
        }

        return books.filter((book) =>
            String(book.kategori || "")
                .trim()
                .toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );
    }, [books, selectedCategory]);

    const uniqueCategoryBooks = useMemo(() => {
        const map = new Map();
        categoryBooks.forEach((book) => {
            const key = String(book.judul || "")
                .trim()
                .toLowerCase();

            if (key && !map.has(key)) {
                map.set(key, book);
            }
        });

        return Array.from(map.values()).sort((a, b) =>
            String(a.judul || "").localeCompare(
                String(b.judul || ""),
                "id",
                {
                    sensitivity: "base",
                }
            )
        );
    }, [categoryBooks]);

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 px-4">

                    <h1 className="text-[24px] font-bold text-slate-900">
                        Kategori Buku
                    </h1>

                </header>

                {/* CONTENT */}
                <section className="px-4 pb-8 pt-5">

                    <div className="mb-4">
                        <h2 className="text-[15px] font-bold text-slate-900">
                            Jelajahi Kategori
                        </h2>

                        <p className="mt-1 text-[9px] text-slate-400">
                            Temukan buku berdasarkan
                            kategori.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="flex flex-col items-center py-16">

                            <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                            <p className="mt-3 text-[11px] font-semibold text-slate-600">
                                Memuat...
                            </p>

                        </div>
                    )}

                    {/* CATEGORY LIST */}
                    {!loading &&
                        categories.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">

                                {categories.map(
                                    (category) => (
                                        <button
                                            key={category.name}
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    `/web-partner/lms/kategori?nama=${encodeURIComponent(
                                                        category.name
                                                    )}`
                                                )
                                            }
                                            className="flex min-h-[90px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                                        >

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                                <BookOpen
                                                    size={20}
                                                    strokeWidth={
                                                        1.8
                                                    }
                                                    className="text-blue-600"
                                                />
                                            </div>

                                            <p className="mt-2 text-center text-[10px] font-semibold text-slate-800">
                                                {
                                                    category.name
                                                }
                                            </p>

                                            <p className="mt-0.5 text-[8px] text-slate-400">
                                                {
                                                    category.count
                                                }{" "}
                                                buku
                                            </p>

                                        </button>
                                    )
                                )}

                            </div>
                        )
                    }

                    {selectedCategory && (
                        <section className="mt-7">

                            {/* HEADER */}
                            <div className="mb-4">
                                <h2 className="text-[14px] font-bold text-slate-900">
                                    {selectedCategory}
                                </h2>

                                <p className="mt-1 text-[9px] text-slate-400">
                                    {uniqueCategoryBooks.length} buku
                                </p>
                            </div>

                            {/* LIST BUKU */}
                            <div className="flex flex-col gap-2.5">

                                {uniqueCategoryBooks.map((book) => {

                                    const ready = books.filter(
                                        (item) =>
                                            String(item.judul).trim() ===
                                                String(book.judul).trim() &&
                                            String(item.status)
                                                .trim()
                                                .toLowerCase() === "ready"
                                    ).length;

                                    const borrowed = books.filter(
                                        (item) =>
                                            String(item.judul).trim() ===
                                                String(book.judul).trim() &&
                                            String(item.status)
                                                .trim()
                                                .toLowerCase() === "dipinjam"
                                    ).length;

                                    return (
                                        <button
                                            key={book.idBuku}
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    `/web-partner/lms/buku/${book.idBuku}`
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 text-left shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition active:scale-[0.99]"
                                        >

                                            {/* COVER */}
                                            <div className="flex h-[105px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-1.5">

                                                {book.gambarBuku ? (
                                                    <img
                                                        src={(() => {
                                                            const value =
                                                                String(
                                                                    book.gambarBuku ||
                                                                        ""
                                                                );

                                                            const match =
                                                                value.match(
                                                                    /[?&]id=([^&]+)/
                                                                );

                                                            return match
                                                                ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`
                                                                : value;
                                                        })()}
                                                        alt={book.judul}
                                                        className="h-full w-full object-contain"
                                                        loading="lazy"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                ) : (
                                                    <BookOpen
                                                        size={25}
                                                        className="text-slate-300"
                                                    />
                                                )}

                                            </div>

                                            {/* INFO */}
                                            <div className="min-w-0 flex-1">

                                                <p className="text-[8px] font-semibold text-blue-600">
                                                    {book.kategori}
                                                </p>

                                                <h3 className="mt-1 line-clamp-2 text-[12px] font-bold leading-tight text-slate-900">
                                                    {book.judul}
                                                </h3>

                                                <p className="mt-1 line-clamp-1 text-[9px] text-slate-500">
                                                    {book.penulis}
                                                </p>

                                                <div className="mt-2 flex gap-1">

                                                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[7px] font-semibold text-green-600">
                                                        Ready : {ready}
                                                    </span>

                                                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[7px] font-semibold text-red-500">
                                                        Dipinjam : {borrowed}
                                                    </span>

                                                </div>

                                            </div>

                                        </button>
                                    );
                                })}

                            </div>

                        </section>
                    )}

                    {/* EMPTY */}
                    {!loading &&
                        categories.length === 0 && (
                            <div className="flex flex-col items-center py-16 text-center">

                                <BookOpen
                                    size={35}
                                    strokeWidth={1.5}
                                    className="text-slate-300"
                                />

                                <p className="mt-3 text-[12px] font-semibold text-slate-700">
                                    Belum ada kategori
                                </p>

                                <p className="mt-1 text-[9px] text-slate-400">
                                    Data kategori akan
                                    muncul setelah buku
                                    ditambahkan.
                                </p>

                            </div>
                        )
                    }

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
                            onClick={() =>
                                router.push("/web-partner/lms/katalog")
                            }
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
                            className="flex flex-col items-center justify-center gap-0.5 text-blue-600"
                        >
                            <Boxes
                                size={18}
                                strokeWidth={2.5}
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
                            className="flex flex-col items-center justify-center gap-0.5 text-slate-400"
                        >
                            <Info
                                size={18}
                                strokeWidth={2}
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

export default function KategoriPage() {
    return (
        <Suspense fallback={null}>
            <KategoriContent />
        </Suspense>
    );
}