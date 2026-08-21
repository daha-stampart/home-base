"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    LogIn,
} from "lucide-react";

const API_URL = "https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

export default function LMSAdminPage() {
    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        if (!userId.trim() || !password.trim()) {
            setError("User ID dan password wajib diisi.");
            return;
        }

        try {
            setLoading(true);

            const params = new URLSearchParams({
                action: "login",
                userId: userId.trim(),
                password: password,
            });

            const response = await fetch(
                `${API_URL}?${params.toString()}`,
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error("Gagal menghubungi server.");
            }

            const result = await response.json();

            if (!result.success) {
                setError(
                    result.message ||
                    "User ID atau password salah."
                );
                return;
            }

            // Simpan data admin yang berhasil login
            sessionStorage.setItem(
                "lmsAdmin",
                JSON.stringify(result.user)
            );

            // Masuk ke dashboard admin
            router.push(
                "/web-partner/lms/admin/dashboard-admin"
            );

        } catch (err) {
            console.error(err);

            setError(
                "Tidak dapat terhubung ke server. Coba lagi."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-slate-100">
            <button
                    type="button"
                    onClick={() => router.push("/web-partner/lms")}
                    className="absolute left-4 top-5 z-10 flex h-10 items-center gap-1.5 rounded-full bg-white px-3 text-[9px] font-semibold text-slate-600 shadow-sm transition active:scale-95"
                >
                ← Kembali
            </button>
            
            <div className="mx-auto flex min-h-screen w-full max-w-md items-start justify-center bg-white px-5 pt-[120px]">

                <div className="w-full">

                    {/* ICON */}
                    <div className="flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-[0_8px_25px_rgba(37,99,235,0.25)]">
                            <LockKeyhole
                                size={30}
                                strokeWidth={2}
                                className="text-white"
                            />
                        </div>
                    </div>

                    {/* TITLE */}
                    <div className="mt-5 text-center">
                        <h1 className="text-[24px] font-bold tracking-tight text-slate-900">
                            Admin Login
                        </h1>

                        <p className="mt-1 text-[11px] text-slate-500">
                            Masuk untuk mengelola Perpustakaan Digital
                        </p>
                    </div>

                    {/* LOGIN FORM */}
                    <form
                        onSubmit={handleLogin}
                        className="mt-7 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                    >

                        {/* USER ID */}
                        <div>
                            <label className="text-[10px] font-semibold text-slate-700">
                                User ID
                            </label>

                            <input
                                type="text"
                                value={userId}
                                onChange={(e) =>
                                    setUserId(e.target.value)
                                }
                                placeholder="Masukkan User ID"
                                autoComplete="username"
                                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[11px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="mt-4">
                            <label className="text-[10px] font-semibold text-slate-700">
                                Password
                            </label>

                            <div className="relative mt-1.5">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Masukkan password"
                                    autoComplete="current-password"
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pr-10 text-[11px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* ERROR */}
                        {error && (
                            <div className="mt-4 rounded-lg bg-red-50 px-3 py-2">
                                <p className="text-[9px] font-medium text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[11px] font-semibold text-white shadow-[0_5px_15px_rgba(37,99,235,0.2)] transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                            <LogIn
                                size={15}
                                strokeWidth={2.5}
                            />

                            {loading
                                ? "Memproses..."
                                : "Masuk sebagai Admin"}
                        </button>

                    </form>

                    {/* FOOTER */}
                    <p className="mt-5 text-center text-[8px] text-slate-400">
                        Library Management System
                    </p>

                </div>

            </div>
        </main>
    );
}