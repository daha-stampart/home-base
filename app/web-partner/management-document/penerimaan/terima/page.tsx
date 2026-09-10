"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Inbox,
} from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

type UserData = {
  user_id: string;
  level: string;
  nama: string;
  jabatan: string;
  cabang: string;
  status: string;
};

type Dokumen = {
  _row: number;
  no_surat: string;
  tgl_pembuatan_surat: string;
  vendor: string;
  vendor_cabang: string;
  nama_pengambil: string;
  model: string;
  no_polisi: string;
  merk_type: string;
  status: string;
};

function TerimaDokumenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rowId =
    searchParams.get("_row");

  const [user, setUser] =
    useState<UserData | null>(null);

  const [dokumen, setDokumen] =
    useState<Dokumen | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [tanggalPenerimaan, setTanggalPenerimaan] =
    useState("");
  
  const [submitting, setSubmitting] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  useEffect(() => {
    const loadData = async () => {
      const savedUser =
        sessionStorage.getItem(
          "managementDocumentUser"
        );

      if (!savedUser) {
        router.replace(
          "/web-partner/management-document"
        );
        return;
      }

      try {
        const parsedUser: UserData =
          JSON.parse(savedUser);

        setUser(parsedUser);

        if (!rowId) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}?action=getDokumen`
        );

        const result =
          await response.json();

        if (result.success) {
          const found =
            (result.data || []).find(
              (item: Dokumen) =>
                String(item._row) ===
                String(rowId)
            );

          setDokumen(found || null);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil detail dokumen:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router, rowId]);

  const handleSubmitPenerimaan =
    async () => {
        if (
        !dokumen ||
        !tanggalPenerimaan ||
        !user?.nama
        ) {
        alert(
            "Tanggal penerimaan dan nama penerima wajib diisi."
        );
        return;
        }

        try {
        setSubmitting(true);

        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
            "Content-Type":
                "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
            action:
                "submitPenerimaan",
            data: {
                _row: dokumen._row,
                tgl_diserahkan:
                tanggalPenerimaan,
                nama_penerima:
                user.nama,
            },
            }),
        });

        setShowSuccess(true);

        } catch (error) {
        console.error(
            "Gagal submit penerimaan:",
            error
        );

        alert(
            "Gagal menerima dokumen. Silakan coba lagi."
        );
        } finally {
        setSubmitting(false);
        }
    };

  const formatTanggal = (
    value: string
  ) => {
    if (!value) return "-";

    const parts =
      value.split("-");

    if (parts.length !== 3) {
      return value;
    }

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <main className="min-h-[100dvh] bg-[#f5f8fc] text-slate-800">

      {/* =====================================================
          LOADING
      ====================================================== */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col items-center">

            <div className="relative flex h-32 w-32 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-[#0759d1]" />

              <img
                src="/images/logo-otolink-v2.png"
                alt="Otolink"
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="mt-4 text-[12px] font-bold text-[#102852]">
              Memuat data...
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              Mohon tunggu sebentar
            </p>

          </div>
        </div>
      )}

      {/* =====================================================
          HEADER
      ====================================================== */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-[64px] max-w-[430px] items-center px-4">

                <button
                    type="button"
                    onClick={() =>
                    router.replace(
                        "/web-partner/management-document/penerimaan"
                    )
                    }
                    className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl text-[#12315f] transition hover:bg-slate-100 active:scale-95"
                    aria-label="Kembali"
                    >
                    <ArrowLeft size={21} />
                </button>

                <div>
                    <p className="text-[16px] font-extrabold text-[#09275a]">
                    Detail Dokumen
                    </p>

                    <p className="text-[9px] text-slate-400">
                    Penerimaan dokumen
                    </p>
                </div>

            </div>
        </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}
        <div className="mx-auto w-full max-w-[430px] px-4 pb-10">

            {!dokumen ? (
                <div className="pt-10 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Inbox
                            size={22}
                            className="text-slate-400"
                        />
                    </div>

                    <p className="mt-3 text-[11px] font-semibold text-slate-500">
                        Dokumen tidak ditemukan
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            router.replace(
                            "/web-partner/management-document/penerimaan"
                            )
                        }
                        className="mt-5 rounded-xl bg-[#0b2f66] px-5 py-3 text-[10px] font-bold text-white"
                        >
                        KEMBALI
                    </button>

                </div>
            ) : (
            <>
                {/* =================================================
                    DETAIL
                ================================================== */}
                <section className="pt-5">

                    <div className="mb-4 flex items-center gap-2">
                        <div className="h-5 w-1 rounded-full bg-[#0759d1]" />

                        <h2 className="text-[14px] font-extrabold text-[#09275a]">
                        Informasi Dokumen
                        </h2>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <InfoRow
                            label="No Surat"
                            value={dokumen.no_surat}
                        />

                        <InfoRow
                            label="Tgl Pembuatan Surat"
                            value={formatTanggal(
                                dokumen.tgl_pembuatan_surat
                            )}
                        />

                        <InfoRow
                            label="Vendor"
                            value={dokumen.vendor}
                        />

                        <InfoRow
                            label="Cabang Vendor"
                            value={dokumen.vendor_cabang}
                        />

                        <InfoRow
                            label="Nama Pengambil"
                            value={dokumen.nama_pengambil}
                        />

                        <InfoRow
                            label="Model"
                            value={dokumen.model}
                        />

                        <InfoRow
                            label="No Polisi"
                            value={dokumen.no_polisi}
                        />

                        <InfoRow
                            label="Merk Type"
                            value={dokumen.merk_type}
                            last
                        />

                    </div>

                </section>

                {/* =================================================
                    TERIMA DOKUMEN
                ================================================== */}
                <section className="mt-5">

                    {!showForm ? (
                        <button
                            type="button"
                            onClick={() =>
                                setShowForm(true)
                            }
                            className="w-full rounded-xl bg-[#0b2f66] py-3.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#09275a] active:scale-[0.98]"
                            >
                            TERIMA DOKUMEN
                        </button>
                    ) : (
                        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">

                            <div className="mb-4 flex items-center gap-2">
                                <CheckCircle
                                    size={18}
                                    className="text-[#0759d1]"
                                />

                                <p className="text-[12px] font-extrabold text-[#09275a]">
                                    Konfirmasi Penerimaan
                                </p>
                            </div>

                            {/* TANGGAL */}
                            <div>
                                <label className="text-[10px] font-semibold text-slate-500">
                                    Tanggal Penerimaan
                                </label>

                                <input
                                    type="date"
                                    value={
                                        tanggalPenerimaan
                                    }
                                    onChange={(e) =>
                                        setTanggalPenerimaan(
                                        e.target.value
                                        )
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[11px] font-medium text-[#102852] outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
                                />
                            </div>

                            {/* NAMA PENERIMA */}
                            <div className="mt-4">
                                <label className="text-[10px] font-semibold text-slate-500">
                                    Nama Penerima
                                </label>

                                <div className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                                    <p className="text-[11px] font-bold text-[#102852]">
                                        {user?.nama || "-"}
                                    </p>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <div className="mt-5 flex gap-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-[10px] font-bold text-slate-500 transition hover:bg-slate-50 active:scale-[0.98]"
                                    >
                                    BATAL
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleSubmitPenerimaan
                                    }
                                    disabled={
                                        !tanggalPenerimaan ||
                                        submitting
                                    }
                                    className="flex-1 rounded-xl bg-[#0b2f66] py-3 text-[10px] font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                    {submitting
                                        ? "MENYIMPAN..."
                                        : "KONFIRMASI"}
                                </button>

                            </div>

                        </div>
                    )}

                </section>
          </>
            )}

        </div>
        {showSuccess && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-sm">
                <div className="w-full max-w-[360px] rounded-3xl bg-white px-6 py-7 text-center shadow-2xl">

                    {/* CHECKLIST */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500">
                            <CheckCircle
                                size={28}
                                strokeWidth={3}
                                className="text-white"
                            />
                        </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-5 text-[16px] font-extrabold text-[#09275a]">
                        Dokumen Berhasil Diterima
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                        Dokumen telah berhasil dicatat sebagai dokumen
                        <span className="font-bold text-green-600">
                            {" "}READY
                        </span>.
                    </p>

                    {/* BUTTON */}
                    <button
                        type="button"
                        onClick={() =>
                        router.replace(
                            "/web-partner/management-document/penerimaan"
                        )
                        }
                        className="mt-6 w-full rounded-xl bg-[#0b2f66] py-3.5 text-[10px] font-bold text-white shadow-sm transition hover:bg-[#09275a] active:scale-[0.98]"
                        >
                        OK
                    </button>

                </div>
            </div>
        )}
    </main>
  );
}

// =========================================================
// INFO ROW
// =========================================================

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-4 py-3 ${
        !last
          ? "border-b border-slate-100"
          : ""
      }`}
    >
      <p className="text-[9px] font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 break-words text-[11px] font-bold text-[#243b63]">
        {value || "-"}
      </p>
    </div>
  );
}

// =========================================================
// SUSPENSE WRAPPER
// =========================================================

export default function TerimaDokumenPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-white">
          <div className="text-xs font-semibold text-slate-500">
            Memuat...
          </div>
        </div>
      }
    >
      <TerimaDokumenPage />
    </Suspense>
  );
}