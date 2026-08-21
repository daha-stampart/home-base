"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Boxes, Grid2X2, Home, Info, LockKeyhole, Search } from "lucide-react";

const API_URL =
"https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

export default function LMSPage() {
    const [books, setBooks] = useState<any[]>([]);
    const router = useRouter();
    const [search, setSearch] = useState("");
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
                console.error("Gagal mengambil data buku:", error);
            }

            finally {
                setLoading(false);
            }

        };

        loadBooks();
    }, []);
    const totalBooks = books.length;
    const totalCategories = useMemo(() => {
        return new Set(
            books
            .map((book) => String(book.kategori || "").trim())
            .filter(Boolean)
        ).size;
    }, [books]);
    const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
        books.forEach((book) => {
            const category = String(book.kategori || "").trim();

            if (!category) return;

            counts[category] = (counts[category] || 0) + 1;
        });

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({
                name,
                count,
            }));
    }, [books]);
    
    const popularBooks = useMemo(() => {
        const popularMap: Record<string, any[]> = {
            "1": [],
            "2": [],
            "3": [],
        };

        books.forEach((book) => {
            const rank = String(book.mostPopular || "").trim();

            if (popularMap[rank]) {
                popularMap[rank].push(book);
            }
        });

        return ["1", "2", "3"]
            .map((rank) => {
                const copies = popularMap[rank];

                if (!copies.length) return null;

                // Ambil satu data buku untuk cover/judul/penulis
                const mainBook = copies[0];

                // Kalau minimal satu copy Ready,
                // maka buku dianggap Ready.
                const isReady = copies.some(
                    (copy) =>
                        String(copy.status || "")
                            .trim()
                            .toLowerCase() === "ready"
                );

                return {
                    ...mainBook,
                    popularRank: rank,
                    isReady,
                };
            })
            .filter(Boolean);
    }, [books]);

    
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
                    <div className="flex flex-col items-center">

                        {/* Spinner */}
                        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                        {/* Text */}
                        <p className="mt-3 text-[11px] font-semibold text-slate-600">
                            Memuat...
                        </p>

                    </div>
                </div>
            )}
    
            <main className="min-h-screen bg-white pb-24">
                <div className="mx-auto w-full max-w-md bg-white">
                    
                    {/* HERO */}
                    <section className="relative h-[240px] overflow-visible bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400">

                        {/* Background Library */}
                        <div
                            className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('/images/lms-dashboard-header.png')",
                            }}
                        />

                        {/* Logo */}
                        <div className="absolute left-4 top-10 z-10 flex items-center gap-2">

                            {/* Book Icon */}
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                <BookOpen
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-blue-600"
                                />
                            </div>

                            {/* Logo Text */}
                            <div className="leading-none text-white">
                                <div className="text-[16px] font-extrabold tracking-[3px]]">
                                    LIBRARY
                                </div>

                                <div className="mt-[3px] text-[8px] font-semibold tracking-[1.4px]">
                                    MANAGEMENT SYSTEM
                                </div>
                            </div>

                        </div>

                        {/* Admin Login */}
                        <button
                            type="button"
                            onClick={() => router.push("/web-partner/lms/admin")}
                            className="absolute right-4 top-6 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-blue-600 shadow-md transition active:scale-95">
                            <LockKeyhole
                                size={12}
                                strokeWidth={2.5}
                            />
                            Admin
                        </button>

                        {/* Welcome Card */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 h-[125px] rounded-t-[18px] bg-none px-4 pt-5 pb-4">
                            <p className="text-[12px] font-medium leading-none text-slate-500">
                                Selamat datang di
                            </p>

                            <h1 className="mt-1 text-[18px] font-bold leading-tight text-slate-900">
                                Perpustakaan Digital
                            </h1>

                            <p className="mt-1 text-[11px] font-medium leading-tight text-slate-500">
                                Temukan buku favoritmu di sini.
                            </p>
                        </div>

                        {/* Search Box */}
                        <div className="absolute bottom-[-20px] left-3 right-3 z-30">
                            <div className="flex h-12 w-full items-center rounded-xl border border-slate-200 bg-white px-3 shadow-[0_3px_12px_rgba(15,23,42,0.08)]">

                                {/* Search Icon */}
                                <Search
                                    size={16}
                                    strokeWidth={2}
                                    className="shrink-0 text-slate-400"
                                />

                                {/* Input */}
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari judul, atau penulis buku..."
                                    className="min-w-0 flex-1 bg-transparent px-2 text-[11px] text-slate-700 outline-none placeholder:text-slate-400"
                                />

                                {/* Cari Button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!search.trim()) return;

                                        router.push(
                                            `/web-partner/lms/pencarian?q=${encodeURIComponent(
                                                search.trim()
                                            )}`
                                        );
                                    }}
                                    className="flex h-7 items-center rounded-lg bg-blue-600 px-3 text-[11px] font-semibold text-white transition active:scale-95"
                                >
                                    Cari buku
                                </button>

                            </div>
                        </div>

                    
                    </section>

                    {/* DASHBOARD CONTENT */}
                    <section className="bg-white px-3 pb-3 pt-[32px]">

                        {/* STATISTICS */}
                        <div className="grid grid-cols-2 gap-2">

                            {/* Total Buku */}
                            <div className="flex h-[78px] items-center gap-2 rounded-xl bg-blue-50 px-3 shadow-[0_3px_12px_rgba(15,23,42,0.05)]">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                                    <BookOpen
                                        size={17}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold text-slate-600">
                                        Total Buku
                                    </p>

                                    <p className="mt-0.5 text-[18px] font-bold leading-none text-blue-600">
                                        {totalBooks.toLocaleString("id-ID")}
                                    </p>

                                    <p className="mt-1 text-[8px] text-slate-400">
                                        Jumlah buku disemua kategori
                                    </p>
                                </div>

                            </div>

                            {/* Kategori Buku */}
                            <div className="flex h-[78px] items-center gap-2 rounded-xl bg-green-50 px-3 shadow-[0_3px_12px_rgba(15,23,42,0.05)]">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                                    <BookOpen
                                        size={17}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold text-slate-600">
                                        Kategori Buku
                                    </p>

                                    <p className="mt-0.5 text-[18px] font-bold leading-none text-green-600">
                                        {totalCategories.toLocaleString("id-ID")}
                                    </p>

                                    <p className="mt-1 text-[8px] text-slate-400">
                                        Kategori tersedia
                                    </p>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* MOST POPULAR BOOKS */}
                    <section className="mt-1 px-6 pt-[12px]">

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">
                                <span className="text-[16px]">
                                    ⭐
                                </span>

                                <h2 className="text-[16px] font-bold text-slate-900">
                                    Most Popular Books
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/web-partner/lms/katalog")
                                }
                                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600"
                            >
                                Lihat semua buku
                                <span className="text-[16px] leading-none">
                                    ›
                                </span>
                            </button>

                        </div>


                        {/* Books */}
                        <div className="mt-3 grid grid-cols-3 gap-2">

                            {popularBooks.map((book, index) => {

                                return (
                                    <div
                                        key={book.idBuku}
                                        onClick={() =>
                                            router.push(
                                                `/web-partner/lms/buku/${book.idBuku}`
                                            )
                                        }
                                        className="relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
                                    >

                                        {/* Ranking */}
                                        <div className="absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-md bg-amber-400 text-[8px] font-bold text-white shadow">
                                            {index + 1}
                                        </div>

                                        {/* Cover */}
                                        <div className="flex h-[125px] w-full items-center justify-center overflow-hidden bg-slate-100 px-2 py-3">
                                            {book.gambarBuku ? (
                                                <img
                                                    src={
                                                        (() => {
                                                            const url = String(book.gambarBuku || "");

                                                            const match = url.match(
                                                                /[?&]id=([^&]+)/
                                                            );

                                                            if (match) {
                                                                return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
                                                            }

                                                            return url;
                                                        })()
                                                    }
                                                    alt={book.judul}
                                                    className="h-full w-full object-contain"
                                                    loading="eager"
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <BookOpen
                                                    size={25}
                                                    strokeWidth={1.5}
                                                    className="text-slate-300"
                                                />
                                            )}
                                        </div>


                                        {/* Info */}
                                        <div className="p-2">

                                            <h3 className="line-clamp-2 min-h-[22px] text-[11px] font-bold leading-tight text-slate-800">
                                                {book.judul}
                                            </h3>

                                            <p className="mt-1 truncate text-[8px] text-slate-500">
                                                {book.penulis}
                                            </p>


                                            {/* Status */}
                                            <div className="mt-2">

                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                                                        book.isReady
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-red-50 text-red-500"
                                                    }`}
                                                >
                                                    {book.isReady ? "Ready" : "Dipinjam"}
                                                </span>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                    {/* JELAJAHI KATEGORI */}
                    <section className="mt-5 pt-[5px] -mb-8">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6">

                            <div className="flex items-center gap-3">
                                <Boxes
                                    size={16}
                                    strokeWidth={2.5}
                                    className="text-blue-600"
                                />

                                <h2 className="text-[16px] font-bold text-slate-900">
                                    Jelajahi Kategori
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/web-partner/lms/kategori")
                                }
                                className="flex items-center gap-1 text-[11px] font-semibold text-blue-600"
                            >
                                Lihat semua kategori
                                <span className="text-[16px] leading-none">
                                    ›
                                </span>
                            </button>

                        </div>

                        {/* Category Cards */}
                        <div className="mt-6 grid grid-cols-5 gap-2 px-5">

                            {categoryStats.map((category, index) => {

                                const styles = [
                                    {
                                        bg: "bg-blue-50",
                                        icon: "bg-blue-500",
                                    },
                                    {
                                        bg: "bg-green-50",
                                        icon: "bg-green-500",
                                    },
                                    {
                                        bg: "bg-orange-50",
                                        icon: "bg-orange-500",
                                    },
                                    {
                                        bg: "bg-purple-50",
                                        icon: "bg-purple-500",
                                    },
                                    {
                                        bg: "bg-pink-50",
                                        icon: "bg-pink-500",
                                    },
                                ];

                                const style = styles[index % styles.length];

                                return (
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
                                        className={`flex h-[60px] min-w-[60px] shrink-0 flex-col items-center justify-center rounded-xl ${style.bg} px-1.5 text-center shadow transition active:scale-95`}
                                    >

                                        {/* Icon */}
                                        <div
                                            className={`flex h-7 w-7 items-center justify-center rounded-full ${style.icon} text-white`}
                                        >
                                            <BookOpen
                                                size={13}
                                                strokeWidth={2}
                                            />
                                        </div>

                                        {/* Category */}
                                        <p className="mt-1 truncate max-w-[62px] text-[11px] font-bold text-slate-700">
                                            {category.name}
                                        </p>

                                    </button>
                                );
                            })}

                        </div>

                    </section>

                    {/* BOTTOM NAVIGATION */}
                    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 px-4 pb-1 pt-1 backdrop-blur-md">
                        
                        <div className="grid grid-cols-4">
                            {/* BERANDA */}
                            <button
                                type="button"
                                className="flex flex-col items-center justify-center gap-0.5 text-blue-600"
                            >
                                <Home
                                    size={18}
                                    strokeWidth={2.5}
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
        </>
    
    );
}