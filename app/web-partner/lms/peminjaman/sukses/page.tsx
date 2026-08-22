"use client";

import {
    CheckCircle2,
    Copy,
    ArrowLeft,
} from "lucide-react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";
import { Suspense } from "react";

function PeminjamanSuksesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const kodePeminjaman =
        searchParams.get("kode") || "";

    const judulBuku =
        searchParams.get("judul") || "";

    const idBuku =
        searchParams.get("id") || "";

    const copyKode = async () => {
        if (!kodePeminjaman) return;

        try {
            await navigator.clipboard.writeText(
                kodePeminjaman
            );
        } catch (error) {
            console.error(
                "Gagal menyalin kode:",
                error
            );
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}

                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 bg-white px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms"
                            )
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <h1 className="text-[14px] font-bold text-slate-900">
                        Peminjaman Buku
                    </h1>

                </header>

                {/* CONTENT */}

                <section className="flex min-h-[calc(100vh-56px)] flex-col px-5 pb-10 pt-10">

                    {/* SUCCESS ICON */}

                    <div className="flex justify-center">

                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">

                            <CheckCircle2
                                size={48}
                                strokeWidth={1.8}
                                className="text-green-500"
                            />

                        </div>

                    </div>

                    {/* TITLE */}

                    <div className="mt-5 text-center">

                        <h2 className="text-[18px] font-bold text-slate-900">
                            Peminjaman Berhasil
                        </h2>

                        <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                            Peminjaman buku berhasil
                            diajukan.
                        </p>

                    </div>

                    {/* DETAIL CARD */}

                    <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.06)]">

                        {/* KODE PEMINJAMAN */}

                        <div>

                            <p className="text-[9px] font-semibold text-slate-500">
                                Kode Peminjaman
                            </p>

                            <div className="mt-2 flex items-center justify-between rounded-xl bg-blue-50 px-3 py-3">

                                <p className="text-[15px] font-bold tracking-wide text-blue-600">
                                    {kodePeminjaman ||
                                        "-"}
                                </p>

                                {kodePeminjaman && (
                                    <button
                                        type="button"
                                        onClick={
                                            copyKode
                                        }
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm active:scale-95"
                                    >
                                        <Copy
                                            size={14}
                                        />
                                    </button>
                                )}

                            </div>

                        </div>

                        {/* JUDUL */}

                        <div className="mt-5 border-t border-slate-100 pt-4">

                            <p className="text-[9px] font-semibold text-slate-500">
                                Judul Buku
                            </p>

                            <p className="mt-1 text-[12px] font-bold text-slate-900">
                                {judulBuku || "-"}
                            </p>

                        </div>

                        {/* ID BUKU */}

                        <div className="mt-4 border-t border-slate-100 pt-4">

                            <p className="text-[9px] font-semibold text-slate-500">
                                ID Buku
                            </p>

                            <p className="mt-1 text-[11px] font-bold text-slate-700">
                                {idBuku || "-"}
                            </p>

                        </div>

                    </div>

                    {/* INFO */}

                    <div className="mt-5 rounded-xl bg-amber-50 px-4 py-4">

                        <p className="text-center text-[10px] font-semibold leading-relaxed text-amber-700">
                            Tunjukkan kode peminjaman
                            ini kepada bagian administrasi
                            perpustakaan untuk pengambilan
                            buku.
                        </p>

                    </div>

                    {/* BUTTON */}

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms"
                            )
                        }
                        className="mt-7 h-11 w-full rounded-xl bg-blue-600 text-[11px] font-bold text-white shadow-md transition active:scale-[0.98]"
                    >
                        Kembali ke Beranda
                    </button>

                </section>

            </div>
        </main>
    );
}

export default function PeminjamanSuksesPage() {
    return (
        <Suspense fallback={null}>
            <PeminjamanSuksesContent />
        </Suspense>
    );
}