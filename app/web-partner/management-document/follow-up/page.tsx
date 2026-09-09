"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

type Dokumen = {
  _row: number;
  cabang: string;
  vendor: string;
  vendor_cabang: string;
  pic: string;
  no_polisi: string;
  perlu_perhatian: boolean;
};

export default function FollowUpPage() {
  const router = useRouter();

  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCabang, setFilterCabang] = useState("");
  const [filterVendor, setFilterVendor] = useState("");
  const [filterPic, setFilterPic] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          `${API_URL}?action=getDokumen`
        );

        const result = await response.json();

        if (result.success) {
          setDokumen(result.data || []);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data follow up:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const daftarPerhatian = dokumen.filter(
  (item) => item.perlu_perhatian === true
);

const daftarCabang = [
  ...new Set(
    daftarPerhatian.map((item) => item.cabang).filter(Boolean)
  ),
].sort();

const daftarVendor = [
  ...new Set(
    daftarPerhatian.map((item) => item.vendor).filter(Boolean)
  ),
].sort();


const daftarPic = [
  ...new Set(
    daftarPerhatian.map((item) => item.pic).filter(Boolean)
  ),
].sort();

const dokumenPerhatian = daftarPerhatian.filter((item) => {
  const keyword = search.toLowerCase().trim();

  const cocokSearch =
    !keyword ||
    item.no_polisi.toLowerCase().includes(keyword);

  const cocokCabang =
    !filterCabang ||
    item.cabang === filterCabang;

  const cocokVendor =
    !filterVendor ||
    item.vendor === filterVendor;

  const cocokPic =
    !filterPic ||
    item.pic === filterPic;

  return (
    cocokSearch &&
    cocokCabang &&
    cocokVendor &&
    cocokPic
  );
});

  if (loading) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#f5f8fc]">
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
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#f5f8fc] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[64px] max-w-[430px] items-center gap-3 px-4">
          <button
            type="button"
            onClick={() =>
              router.replace(
                "/web-partner/management-document/dashboard"
              )
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-[#12315f]
              transition
              hover:bg-slate-100
              active:scale-95
            "
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-extrabold text-[#09275a]">
              Follow Up Dokumen
            </h1>

            <p className="text-[9px] font-medium text-slate-500">
              Dokumen yang perlu segera ditindaklanjuti
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[430px] px-4 py-5">

        <section>
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-red-500" />

            <h2 className="text-[14px] font-extrabold text-[#09275a]">
              Perlu Perhatian
            </h2>
          </div>

          <p className="mt-1 text-[11px] text-slate-400">
            {dokumenPerhatian.length} dokumen perlu di konfirmasi
          </p>
        </section>

        {/* SEARCH */}
        <div className="mt-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nomor polisi..."
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-[11px]
                font-medium
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#0759d1]
                focus:ring-2
                focus:ring-blue-100
                "
            />
        </div>

        {/* FILTER */}
        <div className="mt-3 grid grid-cols-3 gap-2">

            {/* CABANG OTOLINK */}
            <select
                value={filterCabang}
                onChange={(e) => setFilterCabang(e.target.value)}
                className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-2.5
                text-[9px]
                font-medium
                text-slate-600
                outline-none
                focus:border-[#0759d1]
                focus:ring-2
                focus:ring-blue-100
                "
                >
                <option value="">Semua Cabang</option>

                {daftarCabang.map((cabang) => (
                    <option key={cabang} value={cabang}>
                        {cabang}
                    </option>
                ))}
            </select>

            {/* VENDOR */}
            <select
                value={filterVendor}
                onChange={(e) => setFilterVendor(e.target.value)}
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2.5
                    text-[9px]
                    font-medium
                    text-slate-600
                    outline-none
                    focus:border-[#0759d1]
                    focus:ring-2
                    focus:ring-blue-100
                    "
                >
                <option value="">Semua Vendor</option>

                {daftarVendor.map((vendor) => (
                    <option key={vendor} value={vendor}>
                        {vendor}
                    </option>
                ))}
            </select>

            {/* PIC */}
            <select
                value={filterPic}
                onChange={(e) => setFilterPic(e.target.value)}
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2.5
                    text-[9px]
                    font-medium
                    text-slate-600
                    outline-none
                    focus:border-[#0759d1]
                    focus:ring-2
                    focus:ring-blue-100
                    "
                >
                <option value="">Semua PIC</option>

                {daftarPic.map((pic) => (
                    <option key={pic} value={pic}>
                        {pic}
                    </option>
                ))}
            </select>

        </div>

        <section className="mt-3 space-y-2.5">
          {dokumenPerhatian.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <AlertTriangle size={23} />
              </div>

              <p className="mt-3 text-[12px] font-bold text-slate-500">
                Tidak ada dokumen perlu perhatian
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Semua pengambilan dokumen masih dalam kondisi normal.
              </p>
            </div>
          ) : (
            dokumenPerhatian.map((item) => (
              <button
                key={item._row}
                type="button"
                onClick={() =>
                    router.push(
                        `/web-partner/management-document/semua-dokumen/detail?_row=${item._row}&from=follow-up`
                    )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-red-100
                  bg-white
                  px-4
                  py-3
                  text-left
                  shadow-sm
                  transition
                  hover:border-red-200
                  hover:bg-red-50/30
                  active:scale-[0.99]
                "
              >
                <div className="grid grid-cols-3 gap-3">

                  <div className="min-w-0">
                    <p className="text-[8px] font-medium text-slate-400">
                      Nopol
                    </p>

                    <p className="mt-0.5 truncate text-[11px] font-extrabold text-[#09275a]">
                      {item.no_polisi || "-"}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-medium text-slate-400">
                      Cabang
                    </p>

                    <p className="mt-0.5 truncate text-[10px] font-bold text-[#243b63]">
                      {item.cabang || "-"}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-medium text-slate-400">
                      Vendor
                    </p>

                    <p className="mt-0.5 truncate text-[10px] font-bold text-[#243b63]">
                      {item.vendor || "-"}
                    </p>
                  </div>

                </div>
              </button>
            ))
          )}
        </section>

      </div>
    </main>
  );
}