"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
    "https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

export default function BookPreviewPage() {
    const router = useRouter();
    const params = useParams();

    const bookId = String(params.id || "");

    const [books, setBooks] = useState<any[]>([]);
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await fetch(
                    `${API_URL}?action=getBooks`,
                    {
                        cache: "no-store",
                    }
                );

                const result = await response.json();

                if (result.success) {
                    const allBooks = result.books || [];

                    setBooks(allBooks);

                    const foundBook = allBooks.find(
                        (item: any) =>
                            String(item.idBuku) === bookId
                    );

                    setBook(foundBook || null);
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

        loadBook();
    }, [bookId]);

    if (loading) {
        return (
            <main className="flex h-screen items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                    <p className="mt-3 text-[11px] font-semibold text-slate-600">
                        Memuat...
                    </p>
                </div>
            </main>
        );
    }

    if (!book) {
        return (
            <main className="flex h-screen items-center justify-center bg-white px-5">
                <div className="text-center">
                    <BookOpen
                        size={32}
                        className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                        Buku tidak ditemukan
                    </p>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-[10px] font-semibold text-white"
                    >
                        Kembali
                    </button>
                </div>
            </main>
        );
    }

    const imageUrl = (() => {
        const url = String(book.gambarBuku || "");

        const match = url.match(
            /[?&]id=([^&]+)/
        );

        if (match) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
        }

        return url;
    })();

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white pb-24">

                {/* HEADER */}
                <header className="flex h-14 items-center justify-center border-b border-slate-100 px-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="absolute left-6 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <h1 className="text-[14px] font-bold text-slate-900">
                        Detail Buku
                    </h1>
                </header>

                {/* COVER */}
                <section className="flex justify-center bg-slate-50 px-8 py-6">
                    <div className="h-[270px] w-[190px] overflow-hidden rounded-xl bg-white shadow-[0_5px_20px_rgba(15,23,42,0.12)]">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={book.judul}
                                className="h-full w-full object-contain"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <BookOpen
                                    size={40}
                                    className="text-slate-300"
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* BOOK INFO */}
                <section className="px-5 py-5 text-center">

                    <p className="text-[18px] font-semibold text-blue-600">
                        {book.kategori}
                    </p>

                    <h2 className="mt-1 text-[32px] font-bold leading-tight text-slate-900">
                        {book.judul}
                    </h2>

                    <p className="mt-2 text-[18px] text-slate-500">
                        {book.penulis}
                    </p>

                    {/* STATUS COPY */}
                    <div className="mt-4 flex items-center justify-center gap-2">

                        <span className="rounded-full bg-green-50 px-3 py-1 text-[18px] font-semibold text-green-600">
                            Ready :{" "}
                            {
                                // Semua copy dengan judul yang sama
                                // lalu hitung yang statusnya Ready
                                // eslint-disable-next-line react-hooks/exhaustive-deps
                                books.filter(
                                    (item: any) =>
                                        String(item.judul).trim() ===
                                            String(book.judul).trim() &&
                                        String(item.status)
                                            .trim()
                                            .toLowerCase() === "ready"
                                ).length
                            }
                        </span>

                        <span className="rounded-full bg-red-50 px-3 py-1 text-[18px] font-semibold text-red-500">
                            Dipinjam :{" "}
                            {
                                books.filter(
                                    (item: any) =>
                                        String(item.judul).trim() ===
                                            String(book.judul).trim() &&
                                        String(item.status)
                                            .trim()
                                            .toLowerCase() === "dipinjam"
                                ).length
                            }
                        </span>

                    </div>

                    {/* SINOPSIS */}
                    <div className="mt-6">
                        <h3 className="text-[18px] font-bold text-slate-900">
                            Sinopsis
                        </h3>

                        <p className="mt-2 text-[16px] leading-relaxed text-slate-600">
                            {book.sinopsis}
                        </p>
                    </div>

                    {/* PINJAM BUKU */}
                    <div className="mt-7">
                        <button
                            type="button"
                            disabled={
                                books.filter(
                                    (item: any) =>
                                        String(item.judul).trim() ===
                                            String(book.judul).trim() &&
                                        String(item.status).trim().toLowerCase() ===
                                            "ready"
                                ).length === 0
                            }
                            className="flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-[18px] font-semibold text-white shadow-[0_5px_15px_rgba(37,99,235,0.20)] transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Pinjam Buku
                        </button>
                    </div>

                </section>

            </div>
        </main>
    );
}