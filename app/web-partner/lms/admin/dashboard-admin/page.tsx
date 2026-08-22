"use client";

import { useEffect } from "react";
import { LogOut, ShieldCheck, BookOpen, Trash2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardAdminPage() {
    const router = useRouter();

     // Cek apakah admin masih login
    useEffect(() => {
        const admin = sessionStorage.getItem("lmsAdmin");

        if (!admin) {
            router.replace("/web-partner/lms/admin");
        }
    }, [router]);

    // Logout
    const handleLogout = () => {
        sessionStorage.removeItem("lmsAdmin");
        router.replace("/web-partner/lms/admin");
    };


    return (
        <main className="min-h-screen bg-slate-100">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="flex h-16 items-center justify-center gap-3 border-b border-slate-100 px-4">

                    {/* LOGOUT */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition active:scale-95"
                    >
                        <LogOut
                            size={18}
                            strokeWidth={2}
                        />
                    </button>

                    <div>
                        <h1 className="text-[15px] font-bold text-slate-900">
                            Dashboard Admin
                        </h1>

                        <p className="text-[8px] text-slate-400">
                            Library Management System
                        </p>
                    </div>

                </header>

                {/* CONTENT */}
                <section className="px-4 pt-6">

                    <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-[0_8px_25px_rgba(37,99,235,0.2)]">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                            <ShieldCheck
                                size={24}
                                strokeWidth={2}
                            />
                        </div>

                        <h2 className="mt-4 text-[20px] font-bold">
                            Selamat Datang, Admin LMS
                        </h2>

                        <p className="mt-1 text-[10px] text-blue-100">
                            Panel pengelolaan Perpustakaan Digital
                        </p>

                    </div>

                    {/* TEMPORARY INFO */}
                    <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">

                        <p className="text-[11px] font-semibold text-slate-600">
                            Dashboard Admin
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                            Menu pengelolaan buku dan peminjaman.
                        </p>

                    </div>

                    {/* MENU TAMBAH BUKU */}
                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin/tambah-buku"
                            )
                        }
                        className="flex w-full mt-8 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-[0_3px_12px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                        >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                            <BookOpen
                                size={18}
                                strokeWidth={2}
                                className="text-green-500"
                            />
                        </div>

                        <div>
                            <p className="text-[11px] font-bold text-slate-800">
                                Tambah Buku
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                                Tambahkan koleksi buku baru
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin/hapus-buku"
                            )
                        }
                        className="flex w-full mt-3 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                        >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <Trash2
                                size={18}
                                strokeWidth={2}
                                className="text-red-500"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-800">
                                Hapus Buku
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                                Menghapus koleksi buku dari perpustakaan
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin/peminjaman-admin"
                            )
                        }
                        className="flex w-full mt-3 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                        >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                            <BookOpen
                                size={18}
                                strokeWidth={2}
                                className="text-blue-600"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-800">
                                Peminjaman Buku
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                                Mengelola data peminjaman buku
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/pengembalian"
                            )
                        }
                        className="flex mt-3 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition active:scale-[0.98]"
                        >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                            <RotateCcw
                                size={18}
                                strokeWidth={2}
                                className="text-green-600"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-800">
                                Pengembalian Buku
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-400">
                                Mengelola pengembalian buku
                            </p>
                        </div>
                    </button>

                </section>

            </div>
        </main>
    );
}