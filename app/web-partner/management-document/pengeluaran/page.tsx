"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Search,
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
  cabang: string;
  pic: string;
  no_hp_pic: string;
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

export default function PengeluaranPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<UserData | null>(null);

  const [dokumen, setDokumen] =
    useState<Dokumen[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

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

        if (!result.success) {
          console.error(
            "Gagal mengambil dokumen:",
            result.message
          );

          setDokumen([]);
          return;
        }

        const allDokumen: Dokumen[] =
          result.data || [];

        /*
         * Hanya dokumen dengan status READY
         */
        const readyDokumen =
          allDokumen.filter(
            (item) =>
              String(item.status || "")
                .trim()
                .toUpperCase() === "READY"
          );

        /*
         * Jika user bukan Head Office,
         * hanya tampilkan dokumen cabangnya.
         *
         * Head Office dapat melihat semua cabang.
         */
        const filteredByCabang =
          String(
            parsedUser.cabang || ""
          )
            .trim()
            .toLowerCase() ===
          "head office"
            ? readyDokumen
            : readyDokumen.filter(
                (item) =>
                  String(item.cabang || "")
                    .trim()
                    .toLowerCase() ===
                  String(
                    parsedUser.cabang || ""
                  )
                    .trim()
                    .toLowerCase()
              );

        setDokumen(
          filteredByCabang
        );
      } catch (error) {
        console.error(
          "Gagal mengambil data pengeluaran:",
          error
        );

        setDokumen([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

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

  const filteredDokumen =
    dokumen.filter((item) => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword) return true;

      return (
        String(item.no_polisi || "")
          .toLowerCase()
          .includes(keyword) ||
        String(item.vendor || "")
          .toLowerCase()
          .includes(keyword)
      );
    });

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
              Pengeluaran Dokumen
            </p>

            <p className="text-[9px] text-slate-400">
              Dokumen yang siap dikeluarkan
            </p>
          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto w-full max-w-[430px] px-4 pb-10">

        {/* =================================================
            CABANG OTOLINK
        ================================================== */}
        <section className="pt-5">

          <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">

            <p className="text-[9px] font-semibold text-slate-400">
              User Login
            </p>

            <p className="mt-0.5 text-[12px] font-extrabold text-[#09275a]">
              {user?.cabang || "-"}
            </p>

          </div>

        </section>

        {/* =================================================
            SEARCH
        ================================================== */}
        <section className="mt-4">

          <div className="relative">

            <Search
              size={16}
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
              placeholder="Cari No Polisi atau Vendor"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-[11px] font-medium text-[#102852] outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
            />

          </div>

        </section>

        {/* =================================================
            HEADER LIST
        ================================================== */}
        <section className="mt-5">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <p className="text-[13px] font-extrabold text-[#09275a]">
                Dokumen Siap Keluar
              </p>

              <p className="mt-0.5 text-[9px] text-slate-400">
                Pilih dokumen untuk diproses
              </p>

            </div>

            <div className="rounded-full bg-blue-50 px-3 py-1.5">

              <p className="text-[10px] font-extrabold text-[#0759d1]">
                {filteredDokumen.length}
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            EMPTY
        ================================================== */}
        {filteredDokumen.length === 0 ? (

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

              <Inbox
                size={22}
                className="text-slate-400"
              />

            </div>

            <p className="mt-3 text-[11px] font-bold text-slate-500">
              {search
                ? "Dokumen tidak ditemukan"
                : "Belum Ada Dokumen Ready"}
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              {search
                ? "Coba gunakan kata kunci lain."
                : "Belum ada dokumen yang siap dikeluarkan."}
            </p>

          </div>

        ) : (

          /* =================================================
             LIST DOKUMEN
          ================================================== */
          <div className="space-y-3">

            {filteredDokumen.map(
              (item) => (

                <button
                  key={item._row}
                  type="button"
                  onClick={() =>
                    router.push(
                      `/web-partner/management-document/pengeluaran/keluar?_row=${item._row}`
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md active:scale-[0.99]"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-[13px] font-extrabold text-[#09275a]">
                        {item.no_polisi ||
                          "-"}
                      </p>

                    </div>

                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[8px] font-extrabold text-[#0759d1]">
                        {item.model || "-"}
                    </span>

                  </div>

                  {/* DETAIL */}
                  <div className="mt-3 border-t border-slate-100 pt-3">

                    <div className="grid grid-cols-[95px_10px_1fr] gap-y-1 text-[9px]">

                      <span className="font-medium text-slate-400">
                        Vendor
                      </span>

                      <span className="text-slate-300">
                        :
                      </span>

                      <span className="font-bold text-[#243b63]">
                        {item.vendor ||
                          "-"}
                      </span>

                      <span className="font-medium text-slate-400">
                        Cabang
                      </span>

                      <span className="text-slate-300">
                        :
                      </span>

                      <span className="font-bold text-[#243b63]">
                        {item.vendor_cabang ||
                          "-"}
                      </span>

                      <span className="font-medium text-slate-400">
                        Tgl Diterima
                      </span>

                      <span className="text-slate-300">
                        :
                      </span>

                      <span className="font-bold text-[#243b63]">
                        {formatTanggal(
                          item.tgl_diserahkan
                        )}
                      </span>

                    </div>

                  </div>

                </button>

              )
            )}

          </div>

        )}

      </div>

    </main>
  );
}