"use client";

import {
    ArrowLeft,
    BookOpen,
} from "lucide-react";
import {
    Suspense,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";

const API_URL =
    "https://script.google.com/macros/s/AKfycbxaG8a_E3R5iFHmzK0C2jCA-j22JlQvqd_8AKkYiXksJ41K-D3bMpN3r4v3O5WL17I-/exec";

function PeminjamanContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const bookId =
        searchParams.get("id") || "";

    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [nama, setNama] =
        useState("");

    const [alamat, setAlamat] =
        useState("");

    const [noHp, setNoHp] =
        useState("");

    // =========================
    // LOAD DATA BUKU
    // =========================

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await fetch(
                    `${API_URL}?action=getBooks`,
                    {
                        cache: "no-store",
                    }
                );

                const result =
                    await response.json();

                if (result.success) {
                    setBooks(
                        result.books || []
                    );
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

        loadBooks();
    }, []);

    // =========================
    // CARI BUKU
    // =========================

    const book = useMemo(() => {
        return books.find(
            (item) =>
                String(item.idBuku || "")
                    .trim() ===
                String(bookId).trim()
        );
    }, [books, bookId]);

    // =========================
    // CARI 1 ID BUKU YANG READY
    // =========================

    const readyBookId = useMemo(() => {
        if (!book) return "";

        const judul = String(
            book.judul || ""
        )
            .trim()
            .toLowerCase();

        const readyBook = books.find(
            (item) =>
                String(item.judul || "")
                    .trim()
                    .toLowerCase() === judul &&
                String(item.status || "")
                    .trim()
                    .toLowerCase() === "ready"
        );

        return String(
            readyBook?.idBuku || ""
        ).trim();
    }, [books, book]);

    // =========================
    // IMAGE URL
    // =========================

    const getImageUrl = (
        url: string
    ) => {
        const value = String(
            url || ""
        );

        const match = value.match(
            /[?&]id=([^&]+)/
        );

        if (match) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
        }

        return value;
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center">

                    <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

                    <p className="mt-3 text-[11px] font-semibold text-slate-600">
                        Memuat...
                    </p>

                </div>
            </main>
        );
    }

    // =========================
    // BUKU TIDAK DITEMUKAN
    // =========================

    if (!book) {
        return (
            <main className="min-h-screen bg-white">
                <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 text-center">

                    <BookOpen
                        size={40}
                        strokeWidth={1.5}
                        className="text-slate-300"
                    />

                    <h2 className="mt-3 text-[13px] font-bold text-slate-800">
                        Buku tidak ditemukan
                    </h2>

                    <button
                        type="button"
                        onClick={() =>
                            router.back()
                        }
                        className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-[10px] font-semibold text-white"
                    >
                        Kembali
                    </button>

                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto min-h-screen w-full max-w-md bg-white">

                {/* =========================
                    HEADER
                ========================= */}

                <header className="relative flex h-14 items-center justify-center border-b border-slate-100 px-4">

                    <button
                        type="button"
                        onClick={() =>
                            router.back()
                        }
                        className="absolute left-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-600 active:bg-slate-100"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <h1 className="text-[14px] font-bold text-slate-900">
                        Peminjaman Buku
                    </h1>

                </header>

                {/* =========================
                    CONTENT
                ========================= */}

                <section className="px-5 pb-10 pt-6">

                    {/* =========================
                        DETAIL BUKU
                    ========================= */}

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">

                        <div className="flex gap-4">

                            {/* COVER */}

                            <div className="flex h-[150px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-2">

                                {book.gambarBuku ? (
                                    <img
                                        src={getImageUrl(
                                            book.gambarBuku
                                        )}
                                        alt={
                                            book.judul
                                        }
                                        className="h-full w-full object-contain"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <BookOpen
                                        size={30}
                                        className="text-slate-300"
                                    />
                                )}

                            </div>

                            {/* INFO */}

                            <div className="min-w-0 flex-1">

                                <p className="text-[9px] font-semibold text-blue-600">
                                    {
                                        book.kategori
                                    }
                                </p>

                                <h2 className="mt-1 text-[15px] font-bold leading-tight text-slate-900">
                                    {
                                        book.judul
                                    }
                                </h2>

                                <p className="mt-1 text-[10px] text-slate-500">
                                    {
                                        book.penulis
                                    }
                                </p>

                                {/* ID BUKU */}

                                <div className="mt-5">

                                    <p className="text-[9px] font-semibold text-slate-600">
                                        ID Buku
                                    </p>

                                    {readyBookId ? (
                                        <span className="mt-2 inline-flex rounded-lg bg-green-50 px-3 py-1.5 text-[9px] font-bold text-green-600">
                                            {
                                                readyBookId
                                            }
                                        </span>
                                    ) : (
                                        <p className="mt-2 text-[9px] font-semibold text-red-500">
                                            Tidak ada buku
                                            yang tersedia
                                        </p>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =========================
                        DATA PEMINJAM
                    ========================= */}

                    <div className="mt-7">

                        <h2 className="text-[13px] font-bold text-slate-900">
                            Data Peminjam
                        </h2>

                        <p className="mt-1 text-[9px] text-slate-400">
                            Masukkan data peminjam
                            dengan lengkap.
                        </p>

                        <div className="mt-4 flex flex-col gap-3">

                            {/* NAMA */}
                            <div>
                                <label className="text-[9px] font-semibold text-slate-700">
                                    Nama
                                </label>

                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) =>
                                        setNama(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="Masukkan nama lengkap"
                                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* ALAMAT */}
                            <div>
                                <label className="text-[9px] font-semibold text-slate-700">
                                    Alamat
                                </label>

                                <textarea
                                    value={alamat}
                                    onChange={(e) =>
                                        setAlamat(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="Masukkan alamat lengkap"
                                    rows={3}
                                    className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* NO HP */}
                            <div>
                                <label className="text-[9px] font-semibold text-slate-700">
                                    No. HP
                                </label>

                                <input
                                    type="tel"
                                    value={noHp}
                                    onChange={(e) =>
                                        setNoHp(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="Contoh: 08123456789"
                                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                    </div>

                    {/* =========================
                        SUBMIT
                    ========================= */}

                    <button
                        type="button"
                        disabled={
                            !readyBookId ||
                            !nama.trim() ||
                            !alamat.trim() ||
                            !noHp.trim()
                        }
                        onClick={async () => {

                            if (
                                !readyBookId ||
                                !nama.trim() ||
                                !alamat.trim() ||
                                !noHp.trim()
                            ) {
                                return;
                            }

                            try {

                                const response =
                                await fetch(API_URL, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        action:
                                            "submitPeminjaman",

                                        idBuku:
                                            readyBookId,

                                        judulBuku:
                                            book.judul,

                                        peminjam:
                                            nama.trim(),

                                        alamat:
                                            alamat.trim(),

                                        noHp:
                                            noHp.trim(),
                                    }),
                                });

                                const result =
                                    await response.json();

                                if (!result.success) {
                                    alert(
                                        result.message ||
                                            "Pengajuan peminjaman gagal. Hubungi Admin."
                                    );

                                    return;
                                }

                                router.push(
                                    `/web-partner/lms/peminjaman/sukses?kode=${encodeURIComponent(
                                        result.kodePeminjaman
                                    )}&judul=${encodeURIComponent(
                                        book.judul
                                    )}&id=${encodeURIComponent(
                                        readyBookId
                                    )}`
                                );

                            } catch (error) {

                                console.error(error);

                                alert(
                                    "Terjadi kesalahan saat mengajukan peminjaman."
                                );
                            }
                        }}
                        className="mt-7 h-11 w-full rounded-xl bg-blue-600 text-[11px] font-bold text-white shadow-md transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        Ajukan Peminjaman
                    </button>

                </section>

            </div>
        </main>
    );
}

export default function PeminjamanPage() {
    return (
        <Suspense fallback={null}>
            <PeminjamanContent />
        </Suspense>
    );
}