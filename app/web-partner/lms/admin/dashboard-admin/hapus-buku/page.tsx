"use client";

import {
    ArrowLeft,
    BookOpen,
    Search,
    RefreshCw,
} from "lucide-react";
import {
    useRouter,
} from "next/navigation";
import {
    useEffect,
    useMemo,
    useState,
} from "react";

const API_URL =
    "https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

type Buku = {
    idBuku: string;
    status: string;
    judul: string;
    penulis: string;
    kategori: string;
};

export default function HapusBukuPage() {
    const router = useRouter();

    const [data, setData] =
    useState<Buku[]>([]);

    const [loading, setLoading] =
    useState(true);

    const [error, setError] =
    useState("");

    const [search, setSearch] =
    useState("");

    const [showDeleteConfirm, setShowDeleteConfirm] =
    useState<string | null>(null);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}?action=getBukuUntukDihapus`,
                {
                    cache: "no-store",
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                        "Gagal mengambil data buku."
                );
            }

            setData(
                result.buku || []
            );

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Gagal mengambil data buku."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleHapus = async (idBuku: string) => {
        try {
            const response = await fetch(
                API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8",
                    },
                    body: JSON.stringify({
                        action: "hapusBuku",
                        idBuku: idBuku,
                    }),
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                        "Gagal menghapus buku."
                );
            }

            window.location.reload();

        } catch (error) {
            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Gagal menghapus buku."
            );
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredData =
        useMemo(() => {
            const keyword =
                search
                    .toLowerCase()
                    .trim();

            if (!keyword) {
                return data;
            }

            return data.filter(
                (item) =>
                    item.idBuku
                        .toLowerCase()
                        .includes(keyword) ||
                    item.judul
                        .toLowerCase()
                        .includes(keyword) ||
                    item.penulis
                        .toLowerCase()
                        .includes(keyword) ||
                    item.kategori
                        .toLowerCase()
                        .includes(keyword)
            );
        }, [data, search]);

    return (
        <main className="min-h-screen bg-slate-50">

            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 bg-white px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin"
                            )
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                        >
                        <ArrowLeft size={19} />
                    </button>

                    <div className="text-center">

                        <h1 className="text-[16px] font-bold text-slate-900">
                            Hapus Buku
                        </h1>

                        <p className="text-[11px] text-slate-400">
                            Kelola koleksi buku
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={loadData}
                        className="absolute right-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 active:bg-slate-100"
                        >
                        <RefreshCw
                            size={16}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />
                    </button>

                </header>

                {/* CONTENT */}
                <section className="px-4 pb-10 pt-6">

                    {/* SEARCH */}
                    <div className="relative">

                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Cari ID buku, judul, penulis, atau kategori..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
                        />

                    </div>

                    {/* SUMMARY */}
                    <div className="mt-5 flex items-center justify-between">

                        <div>

                            <h2 className="text-[16px] font-bold text-blue-600">
                                Daftar Buku
                            </h2>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                                Pilih buku berdasarkan ID untuk dihapus
                            </p>

                        </div>

                        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-600">
                            {filteredData.length} buku
                        </span>

                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">

                            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                            <p className="mt-3 text-[11px] text-slate-400">
                                Memuat daftar buku...
                            </p>

                        </div>
                    )}

                    {/* ERROR */}
                    {!loading &&
                        error && (
                            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-center">

                                <p className="text-[16px] font-semibold text-red-600">
                                    Gagal memuat data
                                </p>

                                <p className="mt-1 text-[11px] text-red-500">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={loadData}
                                    className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-[11px] font-bold text-white active:scale-95"
                                >
                                    Coba Lagi
                                </button>

                            </div>
                        )}

                    {/* EMPTY */}
                    {!loading &&
                        !error &&
                        filteredData.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                                    <BookOpen
                                        size={24}
                                        strokeWidth={1.5}
                                        className="text-slate-400"
                                    />

                                </div>

                                <p className="mt-3 text-[16px] font-semibold text-slate-500">
                                    {search
                                        ? "Buku tidak ditemukan"
                                        : "Belum ada buku"}
                                </p>

                            </div>
                        )
                    }

                    {/* LIST */}
                    {!loading &&
                        !error &&
                        filteredData.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">

                                {filteredData.map(
                                    (item) => {

                                        const isReady =
                                            item.status
                                                .toLowerCase()
                                                .trim() ===
                                            "ready";

                                        return (
                                            <div
                                                key={
                                                    item.idBuku
                                                }
                                                className="border-b border-slate-100 px-1 py-3"
                                                >

                                                {/* DETAIL BUKU */}
                                                <div className="flex items-start gap-3">

                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">

                                                        <BookOpen
                                                            size={24}
                                                            className="text-blue-600"
                                                        />

                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex items-center gap-2">

                                                            <p className="truncate text-[11px] font-bold text-slate-800">
                                                                {
                                                                    item.judul
                                                                }
                                                            </p>

                                                            {/* STATUS BUKU */}
                                                            <span
                                                                className={
                                                                    isReady
                                                                        ? "shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-600"
                                                                        : "shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600"
                                                                }
                                                                >
                                                                {
                                                                    item.status ||
                                                                    "-"
                                                                }
                                                            </span>

                                                        </div>

                                                        <p className="mt-1 text-[11px] text-slate-600">
                                                            ID Buku :{" "}
                                                            <span className="font-semibold text-blue-600">
                                                                {
                                                                    item.idBuku
                                                                }
                                                            </span>
                                                        </p>

                                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                                            Penulis :{" "}
                                                            <span className="font-semibold text-slate-600">
                                                                {
                                                                    item.penulis
                                                                }
                                                            </span>
                                                        </p>

                                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                                            Kategori :{" "}
                                                            <span className="font-semibold text-slate-600">
                                                                {
                                                                    item.kategori
                                                                }
                                                            </span>
                                                        </p>

                                                    </div>

                                                    <button
                                                        type="button"
                                                        disabled={!isReady}
                                                        onClick={() =>
                                                            setShowDeleteConfirm(item.idBuku)
                                                        }
                                                        className={
                                                            isReady
                                                            ? "shrink-0 rounded-lg bg-red-500 px-3 py-2 text-[11px] font-bold text-white active:scale-95"
                                                            : "shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-bold text-slate-400"
                                                        }
                                                        >
                                                        {isReady
                                                            ? "Hapus"
                                                            : "Dipinjam"}
                                                    </button>
                                                </div>

                                                {/* KONFIRMASI — DI BAWAH DETAIL */}
                                                {showDeleteConfirm === item.idBuku && (
                                                    <div className="mt-2 rounded-xl border border-red-100 bg-red-50 p-3">

                                                        <p className="text-[11px] text-center leading-relaxed text-slate-600">
                                                            Yakin ingin menghapus buku ini?
                                                        </p>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleHapus(item.idBuku)
                                                            }
                                                            className="mt-2 w-full rounded-lg bg-red-600 py-2.5 text-[11px] font-bold text-white active:scale-[0.98]"
                                                            >
                                                            Ya, Hapus
                                                        </button>

                                                    </div>
                                                )}

                                                

                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        )
                    }

                </section>

            </div>

        </main>
    );
}