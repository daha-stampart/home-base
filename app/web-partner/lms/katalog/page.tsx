"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Search, Boxes, Grid2X2, Home, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL =
    "https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

export default function KatalogPage() {
    const router = useRouter();

    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

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

    // Satu judul = satu kartu
    const uniqueBooks = useMemo(() => {
        const map = new Map();

        books.forEach((book) => {
            const key = String(book.judul || "")
                .trim()
                .toLowerCase();

            if (key && !map.has(key)) {
                map.set(key, book);
            }
        });

        const unique = Array.from(map.values());

        // =========================
        // MOST POPULAR #1 - #3
        // =========================
        const popular = unique
            .filter((book) => {
                const value = Number(
                    book.mostPopular
                );

                return (
                    value >= 1 &&
                    value <= 3
                );
            })
            .sort(
                (a, b) =>
                    Number(a.mostPopular) -
                    Number(b.mostPopular)
            );

        // =========================
        // BUKU LAIN
        // SORT BERDASARKAN JUDUL
        // =========================
        const others = unique
        .filter((book) => {
            const value = Number(
                book.mostPopular
            );

            return !(
                value >= 1 &&
                value <= 3
            );
        })
        .sort((a, b) =>
            String(a.judul || "").localeCompare(
                String(b.judul || ""),
                "id",
                {
                    sensitivity: "base",
                }
            )
        );

        return [...popular, ...others];
    
    }, [books]);

    // Pencarian katalog
    const filteredBooks = useMemo(() => {
        const keyword = search
            .trim()
            .toLowerCase();

        if (!keyword) {
            return uniqueBooks;
        }

        return uniqueBooks.filter((book) => {
            const judul = String(
                book.judul || ""
            ).toLowerCase();

            const penulis = String(
                book.penulis || ""
            ).toLowerCase();

            const kategori = String(
                book.kategori || ""
            ).toLowerCase();

            return (
                judul.includes(keyword) ||
                penulis.includes(keyword) ||
                kategori.includes(keyword)
            );
        });
    }, [uniqueBooks, search]);

    const getImageUrl = (url: string) => {
        const value = String(url || "");

        const match = value.match(
            /[?&]id=([^&]+)/
        );

        if (match) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
        }

        return value;
    };

    const getReadyCount = (judul: string) => {
        return books.filter(
            (book) =>
                String(book.judul).trim() ===
                    String(judul).trim() &&
                String(book.status)
                    .trim()
                    .toLowerCase() === "ready"
        ).length;
    };

    const getBorrowedCount = (judul: string) => {
        return books.filter(
            (book) =>
                String(book.judul).trim() ===
                    String(judul).trim() &&
                String(book.status)
                    .trim()
                    .toLowerCase() === "dipinjam"
        ).length;
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 px-4">

                    <h1 className="text-[24px] font-bold text-slate-900">
                        Daftar Buku
                    </h1>

                </header>

                {/* SEARCH */}
                <section className="px-4 pt-4">

                    <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-400 focus-within:bg-white">

                        <Search
                            size={16}
                            className="shrink-0 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Cari judul, penulis, kategori..."
                            className="ml-2 h-full min-w-0 flex-1 bg-transparent text-[11px] text-slate-700 outline-none placeholder:text-slate-400"
                        />

                    </div>

                    {!loading && (
                        <p className="mt-3 text-[10px] text-slate-500">
                            {filteredBooks.length} buku
                        </p>
                    )}

                </section>

                {/* LOADING */}
                {loading && (
                    <div className="flex flex-col items-center py-16">

                        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                        <p className="mt-3 text-[11px] font-semibold text-slate-600">
                            Memuat...
                        </p>

                    </div>
                )}

                {/* EMPTY */}
                {!loading &&
                    filteredBooks.length === 0 && (
                        <div className="flex flex-col items-center px-5 py-16 text-center">

                            <BookOpen
                                size={35}
                                strokeWidth={1.5}
                                className="text-slate-300"
                            />

                            <p className="mt-3 text-[12px] font-semibold text-slate-700">
                                Buku tidak ditemukan
                            </p>

                            <p className="mt-1 text-[11px] text-slate-400">
                                Coba gunakan kata kunci
                                lain.
                            </p>

                        </div>
                    )}

                {/* BOOK LIST */}
                {!loading &&
                    filteredBooks.length > 0 && (
                        <section className="px-4 pb-8 pt-4">

                            <div className="flex flex-col gap-2.5">

                                {filteredBooks.map((book) => {
                                    const popularNumber = Number(
                                        book.mostPopular
                                    );

                                    const ready =
                                        getReadyCount(book.judul);

                                    const borrowed =
                                        getBorrowedCount(book.judul);

                                    return (
                                        <button
                                            key={book.idBuku}
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    `/web-partner/lms/buku/${book.idBuku}`
                                                )
                                            }
                                            className="relative flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 text-left shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition active:scale-[0.99]"
                                        >
                                            {popularNumber >= 1 &&
                                                popularNumber <= 3 && (
                                                <div className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-md bg-amber-400 text-[9px] font-bold text-white shadow-sm">
                                                    {popularNumber}
                                                </div>
                                            )}

                                            {/* COVER */}
                                            <div className="flex h-[105px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-1.5">

                                                {book.gambarBuku ? (
                                                    <img
                                                        src={getImageUrl(
                                                            book.gambarBuku
                                                        )}
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

                                                <h2 className="mt-1 line-clamp-2 text-[12px] font-bold leading-tight text-slate-900">
                                                    {book.judul}
                                                </h2>

                                                <p className="mt-1 line-clamp-1 text-[9px] text-slate-500">
                                                    {book.penulis}
                                                </p>

                                                <div className="mt-2 flex flex-wrap gap-1">

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

                    )
                }

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
                            className="flex flex-col items-center justify-center gap-0.5 text-blue-600"
                        >
                            <Grid2X2
                                size={18}
                                strokeWidth={2.5}
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