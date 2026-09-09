"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ChevronDown,
  FileText,
  MapPin,
  User,
  CalendarDays,
  X,
  RefreshCw,
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

export default function SemuaDokumenPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(
    null
  );

  // =====================================================
  // FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [filterCabang, setFilterCabang] =
    useState("SEMUA");

  const [filterStatus, setFilterStatus] =
    useState("SEMUA");

  const [tanggalDari, setTanggalDari] =
    useState("");

  const [tanggalSampai, setTanggalSampai] =
    useState("");

  const [showFilter, setShowFilter] =
    useState(false);

  // =====================================================
  // DATA DOKUMEN
  // =====================================================
  const [dokumen, setDokumen] =
  useState<Dokumen[]>([]);

  const [loading, setLoading] =
  useState(true);

  // =====================================================
  // CEK SESSION
  // =====================================================

  useEffect(() => {
    async function loadData() {
      const savedUser = sessionStorage.getItem(
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
        
        setLoading(true);
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
            "Gagal mengambil data dokumen:",
            error
          );
        } finally {
          setLoading(false);
        }

        try {
          const response = await fetch(
            `${API_URL}?action=getDokumen`
          );

          const result = await response.json();

          if (result.success) {
            setDokumen(result.data || []);
          }

          console.log(
            "DATA DOKUMEN:",
            result.data
          );

        } catch (error) {
          console.error(
            "Gagal mengambil data dokumen:",
            error
          );
        } finally {
          setLoading(false);
        }

      } catch (error) {
        console.error(
          "Session error:",
          error
        );

        sessionStorage.removeItem(
          "managementDocumentUser"
        );

        router.replace(
          "/web-partner/management-document"
        );
      }
    }

    loadData();
  }, [router]);

  // =====================================================
  // DAFTAR CABANG
  // =====================================================

  const daftarCabang = useMemo(() => {
    const cabang = dokumen
      .map((item) => item.cabang)
      .filter(Boolean);

    return [
      "SEMUA",
      ...Array.from(
        new Set(cabang)
      ).sort(),
    ];
  }, [dokumen]);

  // =====================================================
  // DAFTAR STATUS
  // =====================================================

  const daftarStatus = useMemo(() => {
    const status = dokumen
      .map((item) => item.status)
      .filter(Boolean);

    return [
      "SEMUA",
      ...Array.from(
        new Set(status)
      ).sort(),
    ];
  }, [dokumen]);

  // =====================================================
  // JUMLAH FILTER AKTIF
  // =====================================================

  const jumlahFilterAktif = [
    filterCabang !== "SEMUA",
    filterStatus !== "SEMUA",
    Boolean(tanggalDari),
    Boolean(tanggalSampai),
  ].filter(Boolean).length;

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredDokumen = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return dokumen.filter((item) => {
      // SEARCH NO POLISI
      const cocokSearch =
        !keyword ||
        item.no_polisi
          .toLowerCase()
          .includes(keyword);

      // CABANG
      const cocokCabang =
        filterCabang === "SEMUA" ||
        item.cabang === filterCabang;

      // STATUS
      const cocokStatus =
        filterStatus === "SEMUA" ||
        item.status === filterStatus;

      // TANGGAL PEMBUATAN SURAT
      const cocokTanggal =
        (!tanggalDari ||
          item.tgl_pembuatan_surat >=
            tanggalDari) &&
        (!tanggalSampai ||
          item.tgl_pembuatan_surat <=
            tanggalSampai);

      return (
        cocokSearch &&
        cocokCabang &&
        cocokStatus &&
        cocokTanggal
      );
    });
  }, [
    dokumen,
    search,
    filterCabang,
    filterStatus,
    tanggalDari,
    tanggalSampai,
  ]);

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "PROSES PENGAMBILAN":
        return {
          wrapper:
            "bg-amber-50 border-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };

      case "READY":
        return {
          wrapper:
            "bg-blue-50 border-blue-100",
          text: "text-blue-700",
          dot: "bg-blue-500",
        };

      case "DONE":
        return {
          wrapper:
            "bg-emerald-50 border-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        };

      default:
        return {
          wrapper:
            "bg-slate-50 border-slate-200",
          text: "text-slate-500",
          dot: "bg-slate-400",
        };
    }
  };

  // =====================================================
  // RESET FILTER
  // =====================================================

  const resetFilter = () => {
    setSearch("");
    setFilterCabang("SEMUA");
    setFilterStatus("SEMUA");
    setTanggalDari("");
    setTanggalSampai("");
  };

  // =====================================================
  // LOADING SESSION
  // =====================================================

  if (!user) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#f5f8fc]">
        <div className="flex flex-col items-center">
          <div
            className="
              h-7
              w-7
              animate-spin
              rounded-full
              border-2
              border-blue-200
              border-t-[#0759d1]
            "
          />

          <p className="mt-3 text-[11px] font-medium text-slate-400">
            Memuat halaman...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-[100dvh] w-full bg-[#f5f8fc] text-slate-800">
      {loading && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col items-center">

          {/* LOADING RING */}
          <div className="relative flex h-32 w-32 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-[#0759d1]" />

            <img
              src="/images/logo-otolink-v2.png"
              alt="Otolink"
              className="h-9 w-auto object-contain"
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

    {/* ===================================================
      HEADER
    ==================================================== */}

    <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur-md
        "
        >
        <div
          className="
            mx-auto
            flex
            h-[64px]
            max-w-[430px]
            items-center
            gap-3
            px-4
          "
          >

          {/* BACK */}
          <button
            type="button"
            onClick={() =>
              router.push(
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

          {/* TITLE */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-extrabold text-[#09275a]">
              Data Semua Dokumen
            </h1>

            <p className="text-[9px] font-medium text-slate-500">
              Seluruh data dokumen Otolink
            </p>
          </div>

          {/* REFRESH */}
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-[#0759d1]
              transition
              hover:bg-blue-50
              active:scale-95
            "
            aria-label="Refresh"
          >
            <RefreshCw size={18} />
          </button>

        </div>
      </header>

      {/* ===================================================
          CONTENT
      ==================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[430px]
          px-4
          pb-8
        "
      >

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="pt-5">

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-gradient-to-br
              from-[#0759d1]
              to-[#0b47a1]
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-[14px] font-semibold text-white/75">
                  TOTAL DOKUMEN
                </p>

                <p className="mt-1 text-[32px] font-extrabold leading-none text-white">
                  {dokumen.length}
                </p>
              </div>

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                  text-white
                "
              >
                <FileText size={22} />
              </div>

            </div>

            <p className="mt-3 text-[11px] text-white/70">
              Periksa dan kelola semua dokumen
            </p>
          </div>

        </section>

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="mt-4">

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari berdasarkan nomor polisi..."
              className="
                h-[46px]
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                pl-11
                pr-10
                text-[12px]
                text-slate-700
                shadow-sm
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-500/10
              "
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                className="
                  absolute
                  right-2
                  top-1/2
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-slate-100
                "
                aria-label="Hapus pencarian"
              >
                <X size={15} />
              </button>
            )}

          </div>

        </section>

        {/* =================================================
            FILTER BUTTON
        ================================================= */}

        <section className="mt-3">

          <button
            type="button"
            onClick={() =>
              setShowFilter(
                !showFilter
              )
            }
            className="
              flex
              h-[42px]
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3.5
              text-left
              shadow-sm
              transition
              hover:border-blue-200
            "
          >

            <div className="flex items-center gap-2">

              <SlidersHorizontal
                size={16}
                className="text-[#0759d1]"
              />

              <span className="text-[11px] font-bold text-[#12315f]">
                Filter
              </span>

              {jumlahFilterAktif > 0 && (
                <span
                  className="
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0759d1]
                    px-1.5
                    text-[9px]
                    font-bold
                    text-white
                  "
                >
                  {jumlahFilterAktif}
                </span>
              )}

            </div>

            <ChevronDown
              size={17}
              className={`
                text-slate-400
                transition-transform
                duration-200
                ${
                  showFilter
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </button>

        </section>

        {/* =================================================
            FILTER PANEL
        ================================================= */}

        {showFilter && (
          <section
            className="
              mt-2
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-3.5
              shadow-sm
            "
          >

            {/* =================================================
                CABANG
            ================================================= */}

            <div>

              <label className="mb-1.5 block text-[10px] font-bold text-slate-600">
                Kota / Cabang
              </label>

              <div className="relative">

                <MapPin
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <select
                  value={filterCabang}
                  onChange={(e) =>
                    setFilterCabang(
                      e.target.value
                    )
                  }
                  className="
                    h-[40px]
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-9
                    pr-9
                    text-[11px]
                    font-medium
                    text-slate-700
                    outline-none
                    focus:border-blue-400
                  "
                >
                  {daftarCabang.map(
                    (cabang) => (
                      <option
                        key={cabang}
                        value={cabang}
                      >
                        {cabang === "SEMUA"
                          ? "Semua Kota"
                          : cabang}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

              </div>

            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="mt-3">

              <label className="mb-1.5 block text-[10px] font-bold text-slate-600">
                Status Dokumen
              </label>

              <div className="relative">

                <FileText
                  size={14}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value
                    )
                  }
                  className="
                    h-[40px]
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-9
                    pr-9
                    text-[11px]
                    font-medium
                    text-slate-700
                    outline-none
                    focus:border-blue-400
                  "
                >

                  <option value="SEMUA">
                    Semua Status
                  </option>

                  {daftarStatus
                    .filter(
                      (status) =>
                        status !==
                        "SEMUA"
                    )
                    .map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}

                </select>

                <ChevronDown
                  size={15}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

              </div>

            </div>

            {/* =================================================
                PERIODE TANGGAL
            ================================================= */}

            <div className="mt-3">

              <label className="mb-1.5 block text-[10px] font-bold text-slate-600">
                Periode Tanggal Surat
              </label>

              <div className="grid grid-cols-2 gap-2">

                {/* DARI */}

                <div>

                  <label className="mb-1 block text-[9px] font-medium text-slate-400">
                    Dari
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={13}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="date"
                      value={tanggalDari}
                      onChange={(e) =>
                        setTanggalDari(
                          e.target.value
                        )
                      }
                      className="
                        h-[40px]
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-9
                        pr-2
                        text-[10px]
                        font-medium
                        text-slate-700
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-500/10
                      "
                    />

                  </div>

                </div>

                {/* SAMPAI */}

                <div>

                  <label className="mb-1 block text-[9px] font-medium text-slate-400">
                    Sampai
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={13}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="date"
                      value={tanggalSampai}
                      min={
                        tanggalDari ||
                        undefined
                      }
                      onChange={(e) =>
                        setTanggalSampai(
                          e.target.value
                        )
                      }
                      className="
                        h-[40px]
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-9
                        pr-2
                        text-[10px]
                        font-medium
                        text-slate-700
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-500/10
                      "
                    />

                  </div>

                </div>

              </div>

              {(tanggalDari ||
                tanggalSampai) && (
                <p className="mt-1.5 text-[8px] leading-3 text-slate-400">
                  Filter berdasarkan tanggal
                  pembuatan surat.
                </p>
              )}

            </div>

            {/* =================================================
                RESET
            ================================================= */}

            {(filterCabang !==
              "SEMUA" ||
              filterStatus !==
                "SEMUA" ||
              tanggalDari ||
              tanggalSampai ||
              search) && (

              <button
                type="button"
                onClick={resetFilter}
                className="
                  mt-3
                  flex
                  h-[38px]
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-50
                  text-[10px]
                  font-bold
                  text-slate-500
                  transition
                  hover:bg-slate-100
                  active:scale-[0.99]
                "
              >
                Reset Filter
              </button>

            )}

          </section>
        )}

        {/* =================================================
            RESULT INFO
        ================================================= */}

        <section className="mt-5 flex items-center justify-between">

          <div>

            <p className="text-[11px] text-slate-400">
              Daftar Dokumen
            </p>

            <p className="mt-0.5 text-[14px] font-bold text-[#12315f]">
              {filteredDokumen.length}{" "}
              dokumen ditemukan
            </p>

          </div>

        </section>

        {/* =================================================
            DOCUMENT LIST
        ================================================= */}

        <section className="mt-3 space-y-3">

          {filteredDokumen.length ===
          0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-200
                bg-white
                px-5
                py-10
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-50
                  text-slate-300
                "
              >
                <FileText size={23} />
              </div>

              <p className="mt-3 text-[12px] font-bold text-slate-500">
                Belum ada data dokumen
              </p>

              <p className="mx-auto mt-1 max-w-[240px] text-[9px] leading-4 text-slate-400">
                Data dokumen akan muncul
                setelah terhubung dengan
                database Google Sheets.
              </p>

            </div>

          ) : (

            filteredDokumen.map(
              (item, index) => {

                const statusStyle =
                  getStatusStyle(
                    item.status
                  );

                return (
                  <button
                    key={`${item.no_surat}-${index}`}
                    type="button"
                    onClick={() =>
                      router.push(
                        `/web-partner/management-document/semua-dokumen/detail?_row=${item._row}`
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-3
                      text-left
                      shadow-sm
                      transition
                      hover:border-blue-200
                      hover:shadow-md
                      active:scale-[0.99]
                    "
                  >
                    {/* TOP */}
                    <div className="flex items-center justify-between gap-3">

                      {/* NOPOL */}
                      <div className="min-w-0">
                        <p className="text-[14px] font-extrabold tracking-tight text-[#09275a]">
                          {item.no_polisi}
                        </p>
                      </div>

                      {/* STATUS */}
                      <span
                        className={`
                          shrink-0
                          rounded-full
                          border
                          px-2
                          py-0.5
                          text-[9px]
                          font-extrabold
                          ${statusStyle.wrapper}
                          ${statusStyle.text}
                        `}
                      >
                        <span className="inline-flex items-center gap-1">

                          <span
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              ${statusStyle.dot}
                            `}
                          />

                          {item.status || "BELUM ADA STATUS"}

                        </span>
                      </span>

                    </div>

                    {/* INFO RINGKAS */}
                    <div className="mt-2 grid grid-cols-2 gap-2">

                      {/* VENDOR */}
                      <div className="min-w-0">
                        <p className="text-[9px] font-medium text-slate-400">
                          Vendor
                        </p>

                        <p className="mt-0.5 truncate text-[12px] font-bold text-[#243b63]">
                          {item.vendor || "-"}
                        </p>
                      </div>

                      {/* CABANG */}
                      <div className="min-w-0">
                        <p className="text-[9px] font-medium text-slate-400">
                          Cabang Otolink
                        </p>

                        <p className="mt-0.5 truncate text-[12px] font-bold text-[#243b63]">
                          {item.cabang || "-"}
                        </p>
                      </div>

                    </div>
                  </button>
                );
              }
            )

          )}

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="mt-8 pb-3 text-center">

          <p className="text-[14px] font-medium text-slate-400">
            © 2026 Otolink - Manajemen
            Dokumen
          </p>

          <p className="mt-0.5 text-[11px] text-slate-400">
            PT Balai Lelang Megatama
          </p>

        </footer>

      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| INFO ITEM
|--------------------------------------------------------------------------
*/

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">

      <div className="flex items-center gap-1 text-slate-400">

        {icon}

        <span className="text-[8px] font-medium">
          {label}
        </span>

      </div>

      <p className="mt-0.5 truncate text-[10px] font-bold text-[#243b63]">
        {value || "-"}
      </p>

    </div>
  );
}