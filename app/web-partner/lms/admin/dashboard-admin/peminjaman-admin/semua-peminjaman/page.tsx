"use client";

import {
    ArrowLeft,
    BookOpen,
    RefreshCw,
} from "lucide-react";
import {
    useRouter,
} from "next/navigation";
import {
    useEffect,
    useState,
} from "react";

const API_URL =
    "https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

type Peminjaman = {
    idBuku: string;
    judulBuku: string;
    kodePeminjaman: string;
    peminjam: string;
    alamat: string;
    noHp: string;
};

export default function SemuaPeminjamanPage() {
    const router = useRouter();

    const [data, setData] =
        useState<Peminjaman[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}?action=getPeminjamanDipinjam`,
                {
                    cache: "no-store",
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                        "Gagal mengambil data."
                );
            }

            setData(
                result.peminjaman || []
            );

        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Gagal mengambil data peminjaman."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}

                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 bg-white px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin/peminjaman-admin"
                            )
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <div className="text-center">
                        <h1 className="text-[14px] font-bold text-slate-900">
                            Semua Peminjaman
                        </h1>

                        <p className="text-[7px] text-slate-400">
                            Buku yang sedang dipinjam
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

                <section className="px-4 pb-10 pt-7">

                    {/* SUMMARY */}

                    <div className="mb-5 flex items-center justify-between">

                        <div>
                            <h2 className="text-[13px] font-bold text-slate-900">
                                Daftar Peminjaman
                            </h2>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                                Menampilkan buku dengan
                                status Dipinjam.
                            </p>
                        </div>

                        <div className="rounded-full bg-blue-50 px-3 py-1.5">
                            <span className="text-[9px] font-bold text-blue-600">
                                {data.length} buku
                            </span>
                        </div>

                    </div>

                    {/* LOADING */}

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">

                            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                            <p className="mt-3 text-[10px] text-slate-400">
                                Memuat data peminjaman...
                            </p>

                        </div>
                    )}

                    {/* ERROR */}

                    {!loading && error && (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">

                            <p className="text-[10px] font-semibold text-red-600">
                                Gagal memuat data
                            </p>

                            <p className="mt-1 text-[8px] text-red-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={loadData}
                                className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-[9px] font-bold text-white active:scale-95"
                            >
                                Coba Lagi
                            </button>

                        </div>
                    )}

                    {/* EMPTY */}

                    {!loading &&
                        !error &&
                        data.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                                    <BookOpen
                                        size={28}
                                        strokeWidth={1.5}
                                        className="text-slate-400"
                                    />
                                </div>

                                <h3 className="mt-4 text-[12px] font-bold text-slate-700">
                                    Belum ada peminjaman
                                </h3>

                                <p className="mt-1 max-w-[220px] text-[9px] leading-relaxed text-slate-400">
                                    Belum ada buku yang
                                    berstatus Dipinjam.
                                </p>

                            </div>
                        )}

                    {/* LIST */}

                    {!loading &&
                        !error &&
                        data.length > 0 && (
                            <div className="flex flex-col gap-4">

                                {data.map(
                                    (item, index) => (
                                        <div
                                            key={`${item.kodePeminjaman}-${item.idBuku}-${index}`}
                                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
                                        >

                                            {/* BOOK TITLE */}

                                            <div className="flex items-start gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                                    <BookOpen
                                                        size={18}
                                                        className="text-blue-600"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <p className="text-[12px] font-bold leading-tight text-slate-900">
                                                        {
                                                            item.judulBuku
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-[8px] text-slate-400">
                                                        ID Buku:{" "}
                                                        <span className="font-semibold text-slate-600">
                                                            {
                                                                item.idBuku
                                                            }
                                                        </span>
                                                    </p>

                                                </div>

                                                {/* STATUS */}

                                                <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[8px] font-bold text-red-600">
                                                    Dipinjam
                                                </span>

                                            </div>

                                            {/* DETAIL */}

                                            <div className="mt-4 border-t border-slate-100 pt-3">

                                                <div className="grid grid-cols-[100px_10px_1fr] gap-y-2 text-[9px]">

                                                    <span className="text-slate-400">
                                                        Kode Peminjaman
                                                    </span>

                                                    <span className="text-slate-300">
                                                        :
                                                    </span>

                                                    <span className="font-semibold text-slate-700">
                                                        {
                                                            item.kodePeminjaman
                                                        }
                                                    </span>

                                                    <span className="text-slate-400">
                                                        Peminjam
                                                    </span>

                                                    <span className="text-slate-300">
                                                        :
                                                    </span>

                                                    <span className="font-semibold text-slate-700">
                                                        {
                                                            item.peminjam
                                                        }
                                                    </span>

                                                    <span className="text-slate-400">
                                                        No. HP
                                                    </span>

                                                    <span className="text-slate-300">
                                                        :
                                                    </span>

                                                    <span className="font-semibold text-slate-700">
                                                        {
                                                            item.noHp
                                                        }
                                                    </span>

                                                    <span className="text-slate-400">
                                                        Alamat
                                                    </span>

                                                    <span className="text-slate-300">
                                                        :
                                                    </span>

                                                    <span className="font-semibold leading-relaxed text-slate-700">
                                                        {
                                                            item.alamat
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                </section>

            </div>
        </main>
    );
}