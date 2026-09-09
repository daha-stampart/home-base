"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, } from "lucide-react";

const API_URL =
"https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

function DetailDokumenPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const router = useRouter();
  const [dokumen, setDokumen] =
  useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const row = searchParams.get("_row");
  useEffect(() => {
  async function loadDokumen() {
        try {
        const response = await fetch(
            `${API_URL}?action=getDokumen`
        );

        const result = await response.json();

        if (result.success) {
            const data = result.data || [];

            const selected = data.find(
            (item: any) =>
                String(item._row) === String(row)
            );

            setDokumen(selected || null);
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
        } catch (error) {
        console.error(
            "Gagal mengambil detail dokumen:",
            error
        );
        }
    }


    if (row) {
        loadDokumen();
    }
    }, [row]);
    

    return (
    <main className="min-h-[100dvh] bg-[#f5f8fc]">
        <div className="mx-auto w-full max-w-[430px] px-4 py-6">

            {/* KEMBALI */}
            <button
                type="button"
                onClick={() =>
                    router.replace(
                        from === "follow-up"
                        ? "/web-partner/management-document/follow-up"
                        : "/web-partner/management-document/semua-dokumen"
                    )
                }
                className="
                    mb-3
                    inline-flex
                    items-center
                    gap-1.5
                    text-[10px]
                    font-bold
                    text-[#0759d1]
                    transition
                    active:scale-[0.98]
                "
                >
                <ChevronLeft size={15} />
                Kembali
            </button>
            <h1 className="text-[18px] font-extrabold text-[#09275a]">
                Detail Dokumen
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
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
                ) : !dokumen ? (
                <p className="mt-4 text-center text-[11px] text-slate-400">
                    Data tidak ditemukan.
                </p>
            ) : (

                <>
                    {/* HEADER */}
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-[16px] font-extrabold text-[#09275a]">
                        {dokumen.no_polisi}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                            {dokumen.vendor} • {dokumen.cabang}
                        </p>

                        <p className="mt-3 text-[10px] font-bold text-blue-600">
                            Status : {dokumen.status}
                        </p>
                    </div>

                    {/* INFORMASI DOKUMEN */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                        <p className="text-[11px] font-extrabold text-[#12315f]">
                            Informasi Dokumen
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">

                            <InfoItem
                                label="No Surat"
                                value={dokumen.no_surat}
                            />

                            <InfoItem
                                label="Vendor"
                                value={dokumen.vendor}
                            />

                            <InfoItem
                                label="Cabang Vendor"
                                value={dokumen.vendor_cabang}
                            />

                            <InfoItem
                                label="Tgl Pembuatan Surat"
                                value={dokumen.tgl_pembuatan_surat}
                            />

                            <InfoItem
                                label="Nama PIC"
                                value={dokumen.pic}
                            />

                            <InfoItem
                                label="Nama Pengambil"
                                value={dokumen.nama_pengambil}
                            />


                            <InfoItem
                                label="Nama Admin Daerah"
                                value={dokumen.nama_admin_cabang}
                            />

                            <InfoItem
                                label="Jabatan Admin Daerah"
                                value={dokumen.jabatan_admin_cabang}
                            />

                            <InfoItem
                                label="Model"
                                value={dokumen.model}
                            />

                            <InfoItem
                                label="Nopol"
                                value={dokumen.no_polisi}
                            />

                            <InfoItem
                                label="Merk Type"
                                value={dokumen.merk_type}
                            />

                            <InfoItem
                                label="Tgl Diserahkan"
                                value={dokumen.tgl_diserahkan}
                            />

                            <InfoItem
                                label="Penerima Dokumen"
                                value={dokumen.nama_penerima}
                            />

                            <InfoItem
                                label="Tgl Release"
                                value={dokumen.tgl_pengeluaran}
                            />

                            <InfoItem
                                label="Diserahkan Kepada"
                                value={dokumen.penerima_pengeluaran}
                            />

                            <InfoItem
                                label="Keterangan"
                                value={dokumen.keterangan}
                            />

                        </div>
                    </div>

                    {/* TOMBOL HUBUNGI PIC */}
                    <a
                        href={`https://wa.me/${String(
                            dokumen.no_hp_pic || ""
                        ).replace(/^0/, "62")}?text=${encodeURIComponent(
                        `Follow up dokumen (model : ${dokumen.model}), dengan ket :

                        vendor : ${dokumen.vendor}
                        cabang : ${dokumen.vendor_cabang}
                        no polisi : ${dokumen.no_polisi}
                        merk type : ${dokumen.merk_type}
                        tgl pembuatan surat : ${dokumen.tgl_pembuatan_surat}

                        Terimakasih`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            mt-3
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-green-500
                            px-4
                            py-3
                            text-[14px]
                            font-extrabold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-zinc-600
                            active:scale-[0.99]
                        "
                        >
                        HUBUNGI PIC
                    </a>

                    {/* TOMBOL HUBUNGI PENGAMBIL DOKUMEN */}
                    <a
                        href={`https://wa.me/${String(
                            dokumen.no_hp_pengambil || ""
                        ).replace(/^0/, "62")}?text=${encodeURIComponent(
                        `Follow up dokumen (model : ${dokumen.model}), dengan ket :

                        vendor : ${dokumen.vendor}
                        cabang : ${dokumen.vendor_cabang}
                        no polisi : ${dokumen.no_polisi}
                        merk type : ${dokumen.merk_type}
                        tgl pembuatan surat : ${dokumen.tgl_pembuatan_surat}

                        Terimakasih`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            mt-3
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-blue-500
                            px-4
                            py-3
                            text-[14px]
                            font-extrabold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-zinc-600
                            active:scale-[0.99]
                        "
                        >
                        HUBUNGI PENGAMBIL DOKUMEN
                    </a>

                    {/* TOMBOL HUBUNGI ADMIN DAERAH */}
                    {dokumen.cabang?.trim().toLowerCase() !== "jakarta" && (
                        <a
                            href={`https://wa.me/${String(
                                dokumen.no_hp_admin_cabang || ""
                            ).replace(/^0/, "62")}?text=${encodeURIComponent(
                            `Follow up dokumen (model : ${dokumen.model}), dengan ket :

                            vendor : ${dokumen.vendor}
                            cabang : ${dokumen.vendor_cabang}
                            no polisi : ${dokumen.no_polisi}
                            merk type : ${dokumen.merk_type}
                            tgl pembuatan surat : ${dokumen.tgl_pembuatan_surat}

                            Terimakasih`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                mt-3
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-orange-500
                                px-4
                                py-3
                                text-[14px]
                                font-extrabold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-zinc-600
                                active:scale-[0.99]
                            "
                            >
                            HUBUNGI ADMIN DAERAH
                        </a>
                    )}

                </>
   
            )}

        </div>
    </main>
    );
}

export default function DetailDokumenPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-xs font-semibold text-slate-500">
            Memuat...
          </div>
        </div>
      }
    >
      <DetailDokumenPage />
    </Suspense>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[8px] font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 break-words text-[10px] font-bold text-[#243b63]">
        {value || "-"}
      </p>
    </div>
  );
}