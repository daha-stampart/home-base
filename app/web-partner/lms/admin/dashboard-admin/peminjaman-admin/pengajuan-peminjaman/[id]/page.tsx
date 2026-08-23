"use client";

import {
    ArrowLeft,
    BookOpen,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL =
"https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

type Pengajuan = {
    idBuku: string;
    judulBuku: string;
    kodePeminjaman: string;
    peminjam: string;
    alamat: string;
    noHp: string;
};

export default function DetailPengajuanPage() {
    const router = useRouter();
    const params = useParams();
    const kodePeminjaman = decodeURIComponent(
        String(params.id));

    const [data, setData] =
        useState<Pengajuan | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");
    
    const [showApproveForm, setShowApproveForm] =
        useState(false);

    const [tanggalPinjam, setTanggalPinjam] =
        useState("");

    const [jatuhTempo, setJatuhTempo] =
        useState("");

    const [showTolakConfirm, setShowTolakConfirm] =
        useState(false);

    const handleApprove = async () => {
        if (!tanggalPinjam || !jatuhTempo) {
            alert(
                "Tanggal pinjam dan jatuh tempo wajib diisi."
            );
            return;
        }

        if (jatuhTempo < tanggalPinjam) {
            alert(
                "Jatuh tempo tidak boleh sebelum tanggal pinjam."
            );
            return;
        }

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
                        action:
                            "approvePeminjaman",

                        kodePeminjaman:
                            data?.kodePeminjaman,

                        tanggalPinjam,
                        jatuhTempo,
                    }),
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                        "Gagal menyetujui peminjaman."
                );
            }

            // Kembali ke daftar pengajuan
            window.location.href =
                "/web-partner/lms/admin/dashboard-admin/peminjaman-admin/pengajuan-peminjaman";

        } catch (error) {
            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Gagal menyimpan."
            );
        }
    };

    const handleTolak = async () => {
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
                        action: "tolakPeminjaman",
                        kodePeminjaman:
                            data?.kodePeminjaman,
                    }),
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                        "Gagal menolak pengajuan."
                );
            }

            window.location.href =
            "/web-partner/lms/admin/dashboard-admin/peminjaman-admin/pengajuan-peminjaman";

        } catch (error) {
            console.error(error);

            alert(
                error instanceof Error
                ? error.message
                : "Gagal menolak pengajuan."
            );
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}?action=getDetailPengajuan&kodePeminjaman=${encodeURIComponent(
                        kodePeminjaman
                    )}`,
                    {
                        cache: "no-store",
                    }
                );

                const result =
                    await response.json();

                if (!result.success) {
                    throw new Error(
                        result.message ||
                            "Data pengajuan tidak ditemukan."
                    );
                }

                setData(
                    result.pengajuan
                );

            } catch (error) {
                console.error(error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Gagal mengambil data pengajuan."
                );
            } finally {
                setLoading(false);
            }
        };

        if (kodePeminjaman) {
            loadData();
        }
    }, [kodePeminjaman]);

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 bg-white px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin/peminjaman-admin/pengajuan-peminjaman"
                            )
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <div className="text-center">
                        <h1 className="text-[16px] font-bold text-slate-900">
                            Detail Pengajuan
                        </h1>

                        <p className="text-[11px] text-slate-400">
                            Approve atau Tolak pengajuan
                        </p>
                    </div>

                </header>

                {/* CONTENT */}
                <section className="px-4 pb-10 pt-8">

                    {/* LOADING */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">

                            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                            <p className="mt-3 text-[11px] text-slate-400">
                                Memuat data...
                            </p>

                        </div>
                    )}

                    {/* ERROR */}
                    {!loading && error && (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">

                            <p className="text-[16px] font-semibold text-red-600">
                                Data tidak ditemukan
                            </p>

                            <p className="mt-1 text-[8px] text-red-500">
                                {error}
                            </p>

                        </div>
                    )}

                    {/* DATA */}
                    {!loading &&!error &&
                        data && (
                            <>

                                {/* BOOK */}
                                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                            <BookOpen
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <p className="text-[16px] font-bold leading-tight text-slate-900">
                                                {
                                                    data.judulBuku
                                                }
                                            </p>

                                            <p className="mt-1 text-[11px] text-slate-400">
                                                ID Buku:{" "}
                                                <span className="font-semibold text-slate-600">
                                                    {
                                                        data.idBuku
                                                    }
                                                </span>
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* DETAIL PEMINJAMAN */}
                                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">

                                    <h2 className="mb-4 text-[11px] font-bold text-slate-900">
                                        Data Peminjaman
                                    </h2>

                                    <div className="grid grid-cols-[110px_10px_1fr] gap-y-3 text-[11px]">

                                        <span className="text-slate-400">
                                            Kode Peminjaman
                                        </span>

                                        <span className="text-slate-300">
                                            :
                                        </span>

                                        <span className="font-semibold text-slate-700">
                                            {
                                                data.kodePeminjaman
                                            }
                                        </span>

                                        <span className="text-slate-400">
                                            ID Buku
                                        </span>

                                        <span className="text-slate-300">
                                            :
                                        </span>

                                        <span className="font-semibold text-slate-700">
                                            {
                                                data.idBuku
                                            }
                                        </span>

                                        <span className="text-slate-400">
                                            Nama Peminjam
                                        </span>

                                        <span className="text-slate-300">
                                            :
                                        </span>

                                        <span className="font-semibold text-slate-700">
                                            {
                                                data.peminjam
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
                                                data.noHp
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
                                                data.alamat
                                            }
                                        </span>

                                    </div>

                                </div>

                            </>
                        )
                    }

                    {/* APPROVE ATAU TOLAK */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                        {/* KOLOM APPROVE */}
                        <div>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowApproveForm(true);
                                    setShowTolakConfirm(false);
                                }}
                                className="w-full rounded-xl bg-green-500 py-3 text-[10px] font-bold text-white shadow-sm transition active:scale-[0.98]"
                                >
                                Approve
                            </button>

                            {showApproveForm && (
                                <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-4">

                                    <h3 className="text-[11px] font-bold text-slate-800">
                                        Proses Peminjaman
                                    </h3>

                                    {/* TANGGAL PINJAM */}
                                    <div className="mt-4">
                                        <label className="text-[11px] font-semibold text-slate-600">
                                            Tanggal Pinjam
                                        </label>

                                        <input
                                            type="date"
                                            value={tanggalPinjam}
                                            onChange={(e) =>
                                                setTanggalPinjam(e.target.value)
                                            }
                                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-700 outline-none focus:border-green-400"
                                        />
                                    </div>

                                    {/* JATUH TEMPO */}
                                    <div className="mt-3">
                                        <label className="text-[11px] font-semibold text-slate-600">
                                            Jatuh Tempo
                                        </label>

                                        <input
                                            type="date"
                                            value={jatuhTempo}
                                            onChange={(e) =>
                                                setJatuhTempo(e.target.value)
                                            }
                                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-700 outline-none focus:border-green-400"
                                        />
                                    </div>

                                    {/* SIMPAN */}
                                    <button
                                        type="button"
                                        onClick={handleApprove}
                                        className="mt-4 w-full rounded-lg bg-green-600 py-3 text-[10px] font-bold text-white transition active:scale-[0.98]"
                                        >
                                        Simpan
                                    </button>

                                </div>
                            )}

                        </div>


                        {/* KOLOM TOLAK */}
                        <div>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowTolakConfirm(true);
                                    setShowApproveForm(false);
                                }}
                                className="w-full rounded-xl bg-red-500 py-3 text-[10px] font-bold text-white shadow-sm transition active:scale-[0.98]"
                                >
                                Tolak
                            </button>

                            {showTolakConfirm && (
                                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">

                                    <h3 className="text-[11px] font-bold text-slate-800">
                                        Tolak Pengajuan
                                    </h3>

                                    <p className="mt-2 text-[9px] leading-relaxed text-slate-500">
                                        Yakin ingin menolak pengajuan peminjaman ini?
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleTolak}
                                        className="mt-4 w-full rounded-lg bg-red-600 py-3 text-[10px] font-bold text-white active:scale-[0.98]"
                                        >
                                        Ya, Tolak
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>

                </section>

            </div>
        </main>
    );
}