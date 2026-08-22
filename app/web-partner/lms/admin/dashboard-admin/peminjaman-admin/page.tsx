"use client";

import {
    ArrowLeft,
    BookOpen,
    ClipboardList,
    Clock3,
    CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PeminjamanAdminPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 bg-white px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin"
                            )
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <div className="text-center">
                        <h1 className="text-[14px] font-bold text-slate-900">
                            Peminjaman Buku
                        </h1>

                        <p className="text-[7px] text-slate-400">
                            Admin Perpustakaan Digital
                        </p>
                    </div>

                </header>

                {/* CONTENT */}
                <section className="px-4 pb-10 pt-10">

                    {/* TITLE */}
                    <div className="mb-5 flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                            <ClipboardList
                                size={19}
                                className="text-blue-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-[13px] font-bold text-slate-900">
                                Kelola Peminjaman
                            </h2>

                            <p className="text-[8px] text-slate-400">
                                Kelola pengajuan peminjaman buku.
                            </p>
                        </div>

                    </div>

                    {/* MENU */}
                    <div className="flex flex-col pt-5 gap-5">

                        {/* SEMUA PEMINJAMAN */}
                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/web-partner/lms/admin/dashboard-admin/peminjaman-admin/semua-peminjaman"
                                )
                            }
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                            >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                <BookOpen
                                    size={18}
                                    strokeWidth={2}
                                    className="text-blue-600"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-bold text-slate-800">
                                    Semua Peminjaman
                                </p>

                                <p className="mt-0.5 text-[8px] text-slate-400">
                                    Melihat seluruh data peminjaman buku.
                                </p>
                            </div>

                            <span className="text-[16px] text-slate-300">
                                ›
                            </span>
                        </button>


                        {/* PENGAJUAN PEMINJAMAN */}
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                            >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                                <ClipboardList
                                    size={18}
                                    strokeWidth={2}
                                    className="text-amber-500"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-bold text-slate-800">
                                    Pengajuan Peminjaman
                                </p>

                                <p className="mt-0.5 text-[8px] text-slate-400">
                                    Melihat pengajuan peminjaman yang masuk.
                                </p>
                            </div>

                            <span className="text-[16px] text-slate-300">
                                ›
                            </span>
                        </button>


                        {/* MENUNGGU PENGEMBALIAN */}
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                            >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                <Clock3
                                    size={18}
                                    strokeWidth={2}
                                    className="text-green-600"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-bold text-slate-800">
                                    Menunggu Pengembalian
                                </p>

                                <p className="mt-0.5 text-[8px] text-slate-400">
                                    Melihat buku yang sedang dipinjam.
                                </p>
                            </div>

                            <span className="text-[16px] text-slate-300">
                                ›
                            </span>
                        </button>

                    </div>

                </section>

            </div>
        </main>
    );
}