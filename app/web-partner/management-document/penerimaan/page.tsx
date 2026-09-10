"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Inbox,
  FileText,
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
  cabang: string;
  vendor: string;
  no_polisi: string;
  status: string;
  model: string;
  tgl_pembuatan_surat: string;
};

export default function PenerimaanDokumenPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<UserData | null>(null);

  const [dokumen, setDokumen] =
    useState<Dokumen[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

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

        const response = await fetch(
          `${API_URL}?action=getDokumen`
        );

        const result =
          await response.json();

        if (result.success) {
          setDokumen(
            result.data || []
          );
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data penerimaan:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  // =====================================================
  // FILTER DATA
  // =====================================================

  const dokumenPenerimaan =
    useMemo(() => {
      if (!user) return [];

      const cabangUser =
        user.cabang
          ?.trim()
          .toLowerCase();

      const keyword =
        search
          .trim()
          .toLowerCase();

      return dokumen.filter(
        (item) => {
          // Hanya PROSES PENGAMBILAN
          if (
            item.status !==
            "PROSES PENGAMBILAN"
          ) {
            return false;
          }

          // Head Office melihat semua cabang
          if (
            cabangUser !==
            "head office"
          ) {
            const cabangDokumen =
              item.cabang
                ?.trim()
                .toLowerCase();

            if (
              cabangDokumen !==
              cabangUser
            ) {
              return false;
            }
          }

          // Search Nopol / Vendor
          if (!keyword) {
            return true;
          }

          return (
            item.no_polisi
              ?.toLowerCase()
              .includes(keyword) ||
            item.vendor
              ?.toLowerCase()
              .includes(keyword)
          );
        }
      );
    }, [
      dokumen,
      search,
      user,
    ]);

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
                "/web-partner/management-document/dashboard"
              )
            }
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl text-[#12315f] transition hover:bg-slate-100 active:scale-95"
            aria-label="Kembali"
          >
            <ArrowLeft size={21} />
          </button>

          <div>
            <p className="text-[16px] font-extrabold text-[#09275a]">
              Penerimaan Dokumen
            </p>

            <p className="text-[9px] text-slate-400">
              Dokumen proses pengambilan
            </p>
          </div>

        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto w-full max-w-[430px] px-4 pb-8">

        {/* CABANG USER */}

        <section className="pt-5">

          <div className="flex items-center gap-2">
            <Inbox
              size={17}
              className="text-[#0759d1]"
            />

            <div>
              <p className="text-[10px] font-semibold text-slate-400">
                Cabang Otolink
              </p>

              <p className="text-[12px] font-bold text-[#09275a]">
                {user?.cabang || "-"}
              </p>
            </div>
          </div>

        </section>

        {/* =====================================================
            SEARCH
        ====================================================== */}
        <section className="mt-4">

          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Cari No Polisi / Vendor..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-[11px] font-medium text-[#102852] outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
            />

          </div>

        </section>

        {/* =====================================================
            HASIL
        ====================================================== */}
        <section className="mt-5">

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-[#0759d1]" />

              <h2 className="text-[14px] font-extrabold text-[#09275a]">
                Dokumen Menunggu Penerimaan
              </h2>
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#0759d1]">
              {dokumenPenerimaan.length}
            </span>

          </div>

          {/* EMPTY */}
          {dokumenPenerimaan.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center shadow-sm">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FileText
                  size={22}
                  className="text-slate-400"
                />
              </div>

              <p className="mt-3 text-[11px] font-semibold text-slate-500">
                Tidak ada dokumen
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Belum ada dokumen yang menunggu penerimaan.
              </p>

            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {dokumenPenerimaan.map(
                (item, index) => (
                  <div
                    key={item._row}
                    onClick={() =>
                        router.push(
                        `/web-partner/management-document/penerimaan/terima?_row=${item._row}`
                        )
                    }
                    className={`
                      px-4
                      py-3
                      ${
                        index !==
                        dokumenPenerimaan.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    `}
                  >

                    {/* BARIS UTAMA */}
                    <div className="flex items-center justify-between gap-3">

                      <p className="min-w-0 truncate text-[13px] font-extrabold text-[#09275a]">
                        {item.no_polisi || "-"}
                      </p>

                      <span className="shrink-0 rounded-md bg-blue-50 px-2 py-1 text-[9px] font-bold text-[#0759d1]">
                        {item.model || "-"}
                      </span>

                    </div>

                    {/* VENDOR */}
                    <p className="mt-1 truncate text-[10px] font-semibold text-slate-500">
                      {item.vendor || "-"}
                    </p>

                    {/* CABANG OTOLINK */}
                    <p className="mt-1 text-[10px] font-semibold text-slate-500">
                        {" "}
                        {item.cabang || "-"}
                    </p>

                    {/* TANGGAL */}
                    <p className="mt-1 text-[11px] text-slate-400">
                      Tgl pembuatan surat :{" "}
                      {formatTanggal(
                        item.tgl_pembuatan_surat
                      )}
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

// =========================================================
// FORMAT TANGGAL
// =========================================================

function formatTanggal(
  value: string
) {
  if (!value) return "-";

  const parts =
    value.split("-");

  if (parts.length !== 3) {
    return value;
  }

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}