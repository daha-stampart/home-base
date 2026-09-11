"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  MapPin,
  PackageCheck,
  User,
  X,
} from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

type Dokumen = {
  _row: number;
  cabang: string;
  no_surat: string;
  vendor: string;
  vendor_cabang: string;
  no_polisi: string;
  status: string;
  model: string;
  merk_type: string;
  tgl_pembuatan_surat: string;
  nama_pengambil: string;
  no_hp_pengambil: string;
  tgl_diserahkan: string;
  nama_penerima: string;
  tgl_pengeluaran: string;
  penerima_pengeluaran: string;
  keterangan: string;
};

type UserData = {
  user_id?: string;
  level?: string;
  nama?: string;
  jabatan?: string;
  cabang?: string;
};

export default function KeluarDokumenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rowParam = searchParams.get("_row");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [dokumen, setDokumen] = useState<Dokumen | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [tanggalPengeluaran, setTanggalPengeluaran] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");

    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch {
        setUserData(null);
      }
    }

    loadDokumen();
  }, [rowParam]);

  async function loadDokumen() {
    if (!rowParam) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}?action=getDokumen`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Data dokumen tidak valid.");
      }

      const found = result.data.find(
        (item: Dokumen) =>
          String(item._row) === String(rowParam)
      );

      setDokumen(found || null);
    } catch (error) {
      console.error("Gagal mengambil detail dokumen:", error);
      setDokumen(null);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(value?: string) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function handleOpenForm() {
    setTanggalPengeluaran(
      new Date().toISOString().split("T")[0]
    );
    setNamaPenerima("");
    setShowForm(true);
  }

  function handleNamaPenerimaChange(
    value: string
  ) {
    setNamaPenerima(value.toUpperCase());
  }

  function handleConfirmClick() {
    if (!tanggalPengeluaran) {
      return;
    }

    if (!namaPenerima.trim()) {
      return;
    }

    setShowConfirm(true);
  }

  async function handleSubmitPengeluaran() {
    if (!dokumen) return;

    try {
      setSubmitting(true);
      setShowConfirm(false);

      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "submitPengeluaran",
          data: {
            _row: dokumen._row,
            tgl_pengeluaran: tanggalPengeluaran,
            penerima_pengeluaran:
                namaPenerima.trim().toUpperCase(),
            keterangan: keterangan.trim(),
          },
        }),
      });

      setShowForm(false);
      setShowSuccess(true);
    } catch (error) {
      console.error(
        "Gagal menyimpan pengeluaran:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleSuccessOk() {
    setShowSuccess(false);

    router.replace(
      "/web-partner/management-document/pengeluaran"
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
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
      </main>
    );
  }

  if (!dokumen) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-md px-5 py-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#09275a]"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <FileText
              size={40}
              className="mx-auto mb-3 text-slate-300"
            />

            <h1 className="text-base font-bold text-[#09275a]">
              Dokumen Tidak Ditemukan
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Data dokumen yang dipilih tidak tersedia.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-md px-5 py-6 pb-10">
        {/* HEADER */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#09275a]"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#09275a]">
                Detail Dokumen
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Detail dokumen siap dikeluarkan
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#09275a]">
              <PackageCheck size={22} />
            </div>
          </div>
        </div>

        {/* IDENTITAS UTAMA */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Nomor Polisi
              </p>

              <p className="mt-1 text-2xl font-extrabold tracking-wide text-[#09275a]">
                {dokumen.no_polisi || "-"}
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-[#09275a]">
              {dokumen.model || "-"}
            </span>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="mt-4">
            <DetailRow
              label="No Surat"
              value={dokumen.no_surat}
            />

            <DetailRow
              label="Tgl Pembuatan Surat"
              value={formatDate(
                dokumen.tgl_pembuatan_surat
              )}
            />

            <DetailRow
              label="Vendor"
              value={dokumen.vendor}
            />

            <DetailRow
              label="Cabang Vendor"
              value={dokumen.vendor_cabang}
            />

            <DetailRow
              label="Nama Pengambil"
              value={dokumen.nama_pengambil}
            />

            <DetailRow
              label="Model"
              value={dokumen.model}
            />

            <DetailRow
              label="No Polisi"
              value={dokumen.no_polisi}
            />

            <DetailRow
              label="Merk Type"
              value={dokumen.merk_type}
              last
            />
          </div>
        </div>

        {/* INFO PENERIMAAN */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <CalendarDays size={16} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#09275a]">
                Informasi Penerimaan
              </p>

              <p className="text-[10px] text-slate-400">
                Dokumen telah diterima
              </p>
            </div>
          </div>

          <DetailRow
            label="Tgl Diterima"
            value={formatDate(dokumen.tgl_diserahkan)}
          />

          <DetailRow
            label="Nama Penerima"
            value={dokumen.nama_penerima}
            last
          />
        </div>

        {/* FORM PENGELUARAN */}
        {showForm && (
          <div className="mb-5 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <div className="mb-4">
              <p className="text-sm font-extrabold text-[#09275a]">
                Pengeluaran Dokumen
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Lengkapi data penerima dokumen.
              </p>
            </div>

            {/* TANGGAL */}
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                Tanggal Pengeluaran
              </label>

              <input
                type="date"
                value={tanggalPengeluaran}
                onChange={(e) =>
                  setTanggalPengeluaran(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-[#09275a] focus:ring-2 focus:ring-blue-50"
              />
            </div>

            {/* NAMA PENERIMA */}
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                Nama Penerima
              </label>

              <div className="mb-4 relative">
                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={namaPenerima}
                  onChange={(e) =>
                    handleNamaPenerimaChange(
                      e.target.value
                    )
                  }
                  placeholder="Masukkan nama penerima"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm uppercase text-slate-700 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-[#09275a] focus:ring-2 focus:ring-blue-50"
                />
              </div>

              {/* KETERANGAN */}
                <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-bold text-slate-600">
                        Keterangan
                    </label>

                    <textarea
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                        placeholder="Masukkan keterangan jika diperlukan"
                        rows={3}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#09275a] focus:ring-2 focus:ring-blue-50"
                    />
                </div>
            </div>

            {/* WARNING */}
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-center text-[11px] font-extrabold leading-relaxed text-red-600">
                PASTIKAN TANDA TERIMA FISIK SUDAH
                DITANDATANGANI PENERIMA DOKUMEN
              </p>
            </div>

            {/* BUTTON */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNamaPenerima("");
                }}
                disabled={submitting}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition active:scale-[0.98] disabled:opacity-50"
              >
                BATAL
              </button>

              <button
                type="button"
                onClick={handleConfirmClick}
                disabled={
                  submitting ||
                  !tanggalPengeluaran ||
                  !namaPenerima.trim()
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-[#09275a] px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                KONFIRMASI
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* TOMBOL KELUARKAN */}
        {!showForm && (
          <button
            type="button"
            onClick={handleOpenForm}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#09275a] px-4 py-3.5 text-sm font-extrabold text-white shadow-sm transition active:scale-[0.98]"
          >
            <PackageCheck size={19} />
            KELUARKAN DOKUMEN
          </button>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-base font-extrabold text-[#09275a]">
                  Konfirmasi Pengeluaran
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Pastikan data yang dimasukkan sudah
                  benar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 rounded-xl bg-slate-50 p-3">
              <div className="flex justify-between gap-3 py-1">
                <span className="text-xs text-slate-500">
                  No Polisi
                </span>

                <span className="text-right text-xs font-bold text-[#09275a]">
                  {dokumen.no_polisi}
                </span>
              </div>

              <div className="flex justify-between gap-3 py-1">
                <span className="text-xs text-slate-500">
                  Tanggal
                </span>

                <span className="text-right text-xs font-bold text-[#09275a]">
                  {formatDate(tanggalPengeluaran)}
                </span>
              </div>

              <div className="flex justify-between gap-3 py-1">
                    <span className="text-xs text-slate-500">
                    Penerima
                    </span>

                    <span className="text-right text-xs font-bold uppercase text-[#09275a]">
                    {namaPenerima}
                    </span>
              </div>

              <div className="flex justify-between gap-3 py-1">
                    <span className="text-xs text-slate-500">
                        Keterangan
                    </span>

                    <span className="max-w-[65%] text-right text-xs font-bold text-[#09275a]">
                        {keterangan || "-"}
                    </span>
              </div>

            </div>

            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-center text-[11px] font-extrabold leading-relaxed text-red-600">
                PASTIKAN TANDA TERIMA FISIK SUDAH
                DITANDATANGANI PENERIMA DOKUMEN
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600"
              >
                BATAL
              </button>

              <button
                type="button"
                onClick={handleSubmitPengeluaran}
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    PROSES...
                  </>
                ) : (
                  <>
                    YA, KELUARKAN
                    <PackageCheck size={17} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={38}
                className="text-green-500"
              />
            </div>

            <h2 className="text-lg font-extrabold text-[#09275a]">
              Dokumen Berhasil Dikeluarkan
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Data pengeluaran dokumen telah berhasil
              disimpan.
            </p>

            <button
              type="button"
              onClick={handleSuccessOk}
              className="mt-5 w-full rounded-xl bg-[#09275a] px-4 py-3 text-sm font-bold text-white active:scale-[0.98]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value?: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[125px_10px_1fr] gap-1 py-2.5 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>

      <span className="text-xs font-medium text-slate-300">
        :
      </span>

      <span className="break-words text-right text-xs font-semibold text-slate-700">
        {value || "-"}
      </span>
    </div>
  );
}