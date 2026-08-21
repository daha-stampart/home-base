"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL =
"https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

function SearchResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("q") || "";

    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(query);

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

    const results = useMemo(() => {
        const keyword = query.trim().toLowerCase();

            if (!keyword) {
                return [];
            }

            // Cari berdasarkan:
            // - Judul
            // - Penulis
            // - Kategori
            const filtered = books.filter((book) => {
                const judul = String(book.judul || "").toLowerCase();
                const penulis = String(book.penulis || "").toLowerCase();
                const kategori = String(book.kategori || "").toLowerCase();

                return (
                    judul.includes(keyword) ||
                    penulis.includes(keyword) ||
                    kategori.includes(keyword)
                );
            });

            // Satu judul hanya tampil satu kali
            const uniqueBooks = Array.from(
                new Map(
                    filtered.map((book) => [
                        String(book.judul).trim().toLowerCase(),
                        book,
                    ])
                ).values()
            );

        return uniqueBooks;
    }, [books, query]);

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

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 px-4">

                    <button
                        type="button"
                        onClick={() => router.push("/web-partner/lms")}
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <h1 className="text-[14px] font-bold text-slate-900">
                        Hasil Pencarian
                    </h1>

                </header>

                {/* SEARCH INFO */}
                <section className="px-4 pt-4">

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            const keyword = searchInput.trim();

                            if (!keyword) return;

                            router.push(
                                `/web-partner/lms/pencarian?q=${encodeURIComponent(
                                    keyword
                                )}`
                            );
                        }}
                        className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"
                    >

                        <Search
                            size={16}
                            className="shrink-0 text-slate-400"
                        />

                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) =>
                                setSearchInput(e.target.value)
                            }
                            placeholder="Cari judul, penulis, atau kategori..."
                            className="ml-2 h-full min-w-0 flex-1 bg-transparent text-[10px] text-slate-700 outline-none placeholder:text-slate-400"
                        />

                        {searchInput && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchInput("");
                                    router.push(
                                        "/web-partner/lms/pencarian"
                                    );
                                }}
                                className="ml-2 text-[9px] font-semibold text-slate-400"
                            >
                                Hapus
                            </button>
                        )}

                    </form>

                    {!loading && query && (
                        <p className="mt-3 text-[10px] text-slate-500">
                            {results.length} hasil ditemukan untuk{" "}
                            <span className="font-semibold text-slate-700">
                                "{query}"
                            </span>
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

                {/* NO RESULT */}
                {!loading && query && results.length === 0 && (
                    <div className="flex flex-col items-center px-5 py-16 text-center">

                        <BookOpen
                            size={35}
                            strokeWidth={1.5}
                            className="text-slate-300"
                        />

                        <p className="mt-3 text-[12px] font-semibold text-slate-700">
                            Buku tidak ditemukan
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                            Coba cari dengan judul, penulis,
                            atau kategori lain.
                        </p>

                    </div>
                )}

                {/* RESULTS */}
                {!loading && results.length > 0 && (
                    <section className="px-4 pb-8 pt-4">

                        <div className="grid grid-cols-2 gap-3">

                            {results.map((book) => {

                                const readyCount =
                                    books.filter(
                                        (item) =>
                                            String(item.judul).trim() ===
                                                String(book.judul).trim() &&
                                            String(item.status)
                                                .trim()
                                                .toLowerCase() ===
                                                "ready"
                                    ).length;

                                const borrowedCount =
                                    books.filter(
                                        (item) =>
                                            String(item.judul).trim() ===
                                                String(book.judul).trim() &&
                                            String(item.status)
                                                .trim()
                                                .toLowerCase() ===
                                                "dipinjam"
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
                                        className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_2px_10px_rgba(15,23,42,0.06)] transition active:scale-[0.98]"
                                    >

                                        {/* COVER */}
                                        <div className="flex h-[180px] items-center justify-center overflow-hidden bg-slate-100 px-3 py-3">

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
                                                    size={30}
                                                    className="text-slate-300"
                                                />
                                            )}

                                        </div>

                                        {/* INFO */}
                                        <div className="px-3 py-3">

                                            <p className="text-[11px] font-semibold text-blue-600">
                                                {book.kategori}
                                            </p>

                                            <h2 className="mt-1 line-clamp-2 text-[16px] font-bold leading-tight text-slate-900">
                                                {book.judul}
                                            </h2>

                                            <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">
                                                {book.penulis}
                                            </p>

                                            <div className="mt-2 flex flex-wrap gap-1">

                                                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
                                                    Ready : {readyCount}
                                                </span>

                                                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-500">
                                                    Dipinjam : {borrowedCount}
                                                </span>

                                            </div>

                                        </div>

                                    </button>
                                );
                            })}

                        </div>

                    </section>
                )}

            </div>
        </main>
    );
}

export default function SearchResultPage() {
    return (
        <Suspense fallback={null}>
            <SearchResultContent />
        </Suspense>
    );
}