"use client";

import { ArrowLeft, BookOpen, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL =
"https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

const fileToBase64 = (
    file: File
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = String(reader.result);

            const base64 = result.includes(",")
                ? result.split(",")[1]
                : result;

            resolve(base64);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};

export default function TambahBukuPage() {
    const router = useRouter();

    const [judul, setJudul] = useState("");
    const [penulis, setPenulis] = useState("");
    const [kategori, setKategori] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [mostPopular, setMostPopular] = useState("");
    const [jumlahCopy, setJumlahCopy] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async () => {
        setMessage("");
        setError("");

        if (
            !judul.trim() ||
            !penulis.trim() ||
            !kategori.trim() ||
            !sinopsis.trim() ||
            !jumlahCopy
        ) {
            setError("Semua data buku wajib diisi.");
            return;
        }

        if (!imageFile) {
            setError("Cover buku wajib diupload.");
            return;
        }

        const copy = Number(jumlahCopy);

        if (!Number.isInteger(copy) || copy < 1) {
            setError("Jumlah copy harus minimal 1.");
            return;
        }

        try {
            setLoading(true);

            const imageBase64 = await fileToBase64(imageFile);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    action: "addBook",
                    judul: judul.trim(),
                    penulis: penulis.trim(),
                    kategori: kategori.trim(),
                    sinopsis: sinopsis.trim(),
                    mostPopular,
                    jumlahCopy: copy,
                    imageBase64,
                    imageName: imageFile.name,
                    imageType: imageFile.type,
                }),
            });

            if (!response.ok) {
                throw new Error("Gagal menghubungi server.");
            }

            const result = await response.json();

            if (!result.success) {
                setError(
                    result.message ||
                    "Buku gagal ditambahkan."
                );
                return;
            }

            setMessage(result.message);

            // Reset form
            setJudul("");
            setPenulis("");
            setKategori("");
            setSinopsis("");
            setMostPopular("");
            setJumlahCopy("");
            setImageFile(null);
            setImagePreview("");

        } catch (err) {
            console.error(err);

            setError(
                "Tidak dapat terhubung ke server."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar.");
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setError("");
    };

    return (
        <main className="min-h-screen bg-slate-100">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* HEADER */}
                <header className="relative flex h-16 items-center justify-center border-b border-slate-100 px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/web-partner/lms/admin/dashboard-admin"
                            )
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition active:scale-95"
                    >
                        <ArrowLeft
                            size={18}
                            strokeWidth={2}
                        />
                    </button>

                    <div className="text-center">
                        <h1 className="text-[15px] font-bold text-slate-900">
                            Tambah Buku
                        </h1>

                        <p className="text-[8px] text-slate-400">
                            Library Management System
                        </p>
                    </div>

                </header>


                {/* CONTENT */}
                <section className="px-4 pb-10 pt-5">

                    {/* INTRO */}
                    <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <BookOpen
                                size={20}
                                strokeWidth={2}
                            />
                        </div>

                        <div>
                            <p className="text-[11px] font-bold text-slate-800">
                                Tambahkan Buku
                            </p>

                            <p className="mt-0.5 text-[8px] text-slate-500">
                                Isi informasi buku yang akan ditambahkan.
                            </p>
                        </div>

                    </div>


                    {/* JUDUL BUKU */}
                    <div className="mt-5">

                        <label className="text-[10px] font-semibold text-slate-700">
                            Judul Buku
                        </label>

                        <input
                            type="text"
                            value={judul}
                            onChange={(e) =>
                                setJudul(e.target.value)
                            }
                            placeholder="Masukkan judul buku"
                            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* PENULIS */}
                    <div className="mt-4">

                        <label className="text-[10px] font-semibold text-slate-700">
                            Penulis
                        </label>

                        <input
                            type="text"
                            value={penulis}
                            onChange={(e) =>
                                setPenulis(e.target.value)
                            }
                            placeholder="Masukkan nama penulis"
                            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* KATEGORI */}
                    <div className="mt-4">

                        <label className="text-[10px] font-semibold text-slate-700">
                            Kategori
                        </label>

                        <input
                            type="text"
                            value={kategori}
                            onChange={(e) =>
                                setKategori(e.target.value)
                            }
                            placeholder="Contoh: Fantasi"
                            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                        <p className="mt-1 text-[7px] text-slate-400">
                            Kategori diisi manual oleh Admin.
                        </p>

                    </div>


                    {/* SINOPSIS */}
                    <div className="mt-4">

                        <label className="text-[10px] font-semibold text-slate-700">
                            Sinopsis Buku
                        </label>

                        <textarea
                            value={sinopsis}
                            onChange={(e) =>
                                setSinopsis(e.target.value)
                            }
                            placeholder="Masukkan sinopsis buku"
                            rows={5}
                            className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[10px] leading-relaxed text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* GAMBAR BUKU */}
                    <div className="mt-1.5">

                        <label className="flex h-[180px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">

                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview cover"
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <>
                                    <ImagePlus
                                        size={24}
                                        strokeWidth={1.8}
                                        className="text-slate-400"
                                    />

                                    <span className="mt-2 text-[9px] font-medium text-slate-500">
                                        Upload gambar buku
                                    </span>

                                    <span className="mt-0.5 text-[7px] text-slate-400">
                                        JPG / PNG / WEBP
                                    </span>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>

                        {imageFile && (
                            <p className="mt-1 text-[7px] text-slate-400">
                                {imageFile.name}
                            </p>
                        )}

                    </div>


                    {/* MOST POPULAR */}
                    <div className="mt-4">

                        <label className="text-[10px] font-semibold text-slate-700">
                            Most Popular
                        </label>

                        <select
                            value={mostPopular}
                            onChange={(e) =>
                                setMostPopular(e.target.value)
                            }
                            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] text-slate-800 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">
                                Tidak masuk Most Popular
                            </option>

                            <option value="1">
                                Most Popular #1
                            </option>

                            <option value="2">
                                Most Popular #2
                            </option>

                            <option value="3">
                                Most Popular #3
                            </option>
                        </select>

                    </div>


                    {/* JUMLAH COPY */}
                    <div className="mt-4">

                        <label className="text-[10px] font-semibold text-slate-700">
                            Jumlah Copy
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={jumlahCopy}
                            onChange={(e) =>
                                setJumlahCopy(e.target.value)
                            }
                            placeholder="Contoh: 2"
                            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                        <p className="mt-1 text-[7px] text-slate-400">
                            Setiap copy akan mendapatkan ID Buku yang berbeda.
                        </p>

                    </div>

                    {/* PESAN HASIL SUBMIT */}
                    {error && (
                        <div className="mt-4 rounded-xl bg-red-50 px-3 py-2.5">
                            <p className="text-[9px] font-medium text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    {message && (
                        <div className="mt-4 rounded-xl bg-green-50 px-3 py-2.5">
                            <p className="text-[9px] font-medium text-green-600">
                                {message}
                            </p>
                        </div>
                    )}


                    {/* SUBMIT */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-[10px] font-semibold text-white shadow-[0_5px_15px_rgba(37,99,235,0.2)] transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Menyimpan..." : "Tambah Buku"}
                    </button>

                </section>

            </div>
        </main>
    );
}