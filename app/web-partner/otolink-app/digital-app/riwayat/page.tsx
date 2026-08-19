"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import GlassCard from "../dashboard/GlassCard";
import BackButton from "../components/common/BackButton";

type Vendor = {
  id: string | number;
  kode_vendor: string;
  nama_vendor: string;
  status: boolean;
  type?: string;
  file_id?: string;
};

type SearchResult = {
  kategori: string;
  kode_vendor: string;
  nama_vendor: string;
  nopol: string;
  appraisal_id: string;
  merk_type: string;
  cabang_vendor: string;
  inspector: string;
  tanggal_inspeksi: string;
};

type SearchResponse = {
  success: boolean;
  found: boolean;
  total: number;
  results: SearchResult[];
  message?: string;
};

const MASTER_VENDOR_URL =
  "https://script.google.com/macros/s/AKfycbxU8VNnaouZ3JR7HhVY5SASpem0b4pFudY3EqnomO0rnOsgiIRuEfMH94WwEjLiDyo1YQ/exec";

export default function RiwayatPage() {
  // =====================================================
  // MASTER VENDOR
  // =====================================================

  const [mobil, setMobil] = useState<Vendor[]>([]);
  const [motor, setMotor] = useState<Vendor[]>([]);
  const [lain, setLain] = useState<Vendor[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCards, setShowCards] = useState(false);

  // =====================================================
  // SEARCH
  // =====================================================

  const [searchNopol, setSearchNopol] = useState("");
  const [searching, setSearching] = useState(false);

  const [searchResults, setSearchResults] =
    useState<SearchResult[]>([]);

  const [searchDone, setSearchDone] =
    useState(false);

  const [searchError, setSearchError] =
    useState("");

  // =====================================================
  // INPUT NOPOL
  // =====================================================

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchNopol(
      e.target.value.toUpperCase()
    );

    setSearchDone(false);
    setSearchError("");
    setSearchResults([]);
  };

  // =====================================================
  // GLOBAL SEARCH
  // =====================================================

  const handleSearch = async () => {
    const nopol =
      searchNopol.trim();

    if (!nopol) {
      return;
    }

    try {
      setSearching(true);
      setSearchDone(false);
      setSearchError("");
      setSearchResults([]);

      // =================================================
      // AMBIL USER LOGIN
      // =================================================

      let inspector = "";

      try {
        const userRaw =
          sessionStorage.getItem("user");

        if (userRaw) {
          const userData =
            JSON.parse(userRaw);

          inspector =
            userData?.nama || "";
        }
      } catch (sessionError) {
        console.error(
          "Gagal membaca userData:",
          sessionError
        );
      }

      // =================================================
      // VALIDASI INSPECTOR
      // =================================================

      if (!inspector) {
        setSearchError(
          "Data inspector tidak ditemukan. Silakan login kembali."
        );

        setSearchDone(true);
        return;
      }

      // =================================================
      // BUILD URL
      // =================================================

      const url =
        `${MASTER_VENDOR_URL}` +
        `?action=search` +
        `&nopol=${encodeURIComponent(nopol)}` +
        `&inspector=${encodeURIComponent(inspector)}`;

      console.log(
        "Global Search URL:",
        url
      );

      // =================================================
      // FETCH GS
      // =================================================

      const response =
        await fetch(url, {
          method: "GET",
          cache: "no-store",
        });

      if (!response.ok) {
        throw new Error(
          "Gagal menghubungi server pencarian."
        );
      }

      const data: SearchResponse =
        await response.json();

      console.log(
        "Hasil Global Search:",
        data
      );

      // =================================================
      // RESPONSE
      // =================================================

      if (!data.success) {
        throw new Error(
          data.message ||
            "Pencarian gagal."
        );
      }

      if (
        data.found &&
        data.results?.length > 0
      ) {
        setSearchResults(
          data.results
        );
      } else {
        setSearchResults([]);
      }

      setSearchDone(true);

    } catch (err) {
      console.error(
        "Error global search:",
        err
      );

      setSearchError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mencari data."
      );

      setSearchDone(true);

    } finally {
      setSearching(false);
    }
  };

  // =====================================================
  // FETCH MASTER VENDOR
  // =====================================================

  useEffect(() => {
    setShowCards(true);

    const fetchVendors =
      async () => {
        try {
          setLoading(true);
          setError("");

          const [
            mobilResponse,
            motorResponse,
            lainResponse,
          ] = await Promise.all([
            fetch(
              `${MASTER_VENDOR_URL}?action=mobil`,
              {
                method: "GET",
                cache: "no-store",
              }
            ),

            fetch(
              `${MASTER_VENDOR_URL}?action=motor`,
              {
                method: "GET",
                cache: "no-store",
              }
            ),

            fetch(
              `${MASTER_VENDOR_URL}?action=lain`,
              {
                method: "GET",
                cache: "no-store",
              }
            ),
          ]);

          if (
            !mobilResponse.ok ||
            !motorResponse.ok ||
            !lainResponse.ok
          ) {
            throw new Error(
              "Gagal mengambil data vendor."
            );
          }

          const [
            mobilData,
            motorData,
            lainData,
          ] = await Promise.all([
            mobilResponse.json(),
            motorResponse.json(),
            lainResponse.json(),
          ]);

          if (
            !Array.isArray(mobilData) ||
            !Array.isArray(motorData) ||
            !Array.isArray(lainData)
          ) {
            throw new Error(
              "Format data vendor tidak valid."
            );
          }

          setMobil(
            mobilData.filter(
              (vendor: Vendor) =>
                vendor.status === true
            )
          );

          setMotor(
            motorData.filter(
              (vendor: Vendor) =>
                vendor.status === true
            )
          );

          setLain(
            lainData.filter(
              (vendor: Vendor) =>
                vendor.status === true
            )
          );

        } catch (err) {
          console.error(
            "Error fetch master vendor:",
            err
          );

          setError(
            "Data vendor tidak dapat dimuat. Silakan coba lagi."
          );

        } finally {
          setLoading(false);
        }
      };

    fetchVendors();
  }, []);

  // =====================================================
  // VENDOR URL
  // =====================================================

  const getVendorPath = (
    vendor: Vendor
  ) => {
    const kode =
      vendor.kode_vendor
        .trim()
        .toLowerCase();

    return `/web-partner/otolink-app/digital-app/riwayat/${encodeURIComponent(
      kode
    )}`;
  };

  // =====================================================
  // RENDER VENDOR
  // =====================================================

  const renderVendorList = (
    vendors: Vendor[]
  ) => {
    if (vendors.length === 0) {
      return (
        <p className="text-sm italic text-white/50">
          Belum Ada Vendor
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {vendors.map(
          (vendor) => (
            <Link
              key={vendor.id}
              href={getVendorPath(vendor)}
              className="block w-full"
            >
              <GlassCard
                className="
                  p-4
                  transition-all
                  duration-200
                  hover:border-white/30
                  active:scale-[0.98]
                "
              >
                <div className="flex items-center justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <h3 className="
                      text-lg
                      font-bold
                      text-white
                    ">
                      {vendor.kode_vendor}
                    </h3>

                    <p className="
                      mt-1
                      truncate
                      text-sm
                      text-white/60
                    ">
                      {vendor.nama_vendor}
                    </p>

                  </div>

                  <span className="
                    shrink-0
                    text-2xl
                    text-white/50
                  ">
                    ›
                  </span>

                </div>
              </GlassCard>
            </Link>
          )
        )}
      </div>
    );
  };

  // =====================================================
  // RENDER SEARCH RESULT
  // =====================================================

  const renderSearchResults = () => {
    if (!searchDone) {
      return null;
    }

    // ===================================================
    // ERROR
    // ===================================================

    if (searchError) {
      return (
        <GlassCard className="mb-7 p-5 text-center">

          <h2 className="
            text-lg
            font-bold
            text-white
          ">
            Pencarian Gagal
          </h2>

          <p className="
            mt-2
            text-sm
            leading-relaxed
            text-white/60
          ">
            {searchError}
          </p>

        </GlassCard>
      );
    }

    // ===================================================
    // TIDAK DITEMUKAN
    // ===================================================

    if (
      searchResults.length === 0
    ) {
      return (
        <GlassCard className="
          mb-7
          p-5
          text-center
        ">

          <h2 className="
            text-lg
            font-bold
            text-white
          ">
            Data Unit Tidak Ditemukan
          </h2>

          <div className="
            mx-auto
            mt-3
            h-px
            w-20
            bg-red-500/60
          " />

          <p className="
            mt-3
            text-sm
            leading-relaxed
            text-white/60
          ">
            Tidak ditemukan riwayat
            inspeksi untuk nomor polisi
          </p>

          <p className="
            mt-2
            text-lg
            font-bold
            tracking-wide
            text-red-400
          ">
            {searchNopol}
          </p>

        </GlassCard>
      );
    }

    // ===================================================
    // HASIL DITEMUKAN
    // ===================================================

    return (
      <div className="
        mb-7
        space-y-4
      ">

        <div className="px-1">

          <h2 className="
            text-lg
            font-bold
            tracking-wide
            text-white
          ">
            HASIL INSPEKSI
          </h2>

          <p className="
            mt-1
            text-xs
            text-white/50
          ">
            Ditemukan{" "}
            {searchResults.length}{" "}
            data
          </p>

        </div>

        {searchResults.map(
          (result, index) => (
            <GlassCard
              key={`${result.appraisal_id}-${index}`}
              className="
                p-5
                transition-all
                duration-300
              "
            >

              {/* HEADER */}

              <div className="
                flex
                items-start
                justify-between
                gap-3
              ">

                <div>

                  <h3 className="
                    text-xl
                    font-bold
                    tracking-wide
                    text-white
                  ">
                    {result.nopol}
                  </h3>

                  <p className="
                    mt-1
                    text-sm
                    font-semibold
                    text-red-400
                  ">
                    {result.kode_vendor}
                  </p>

                  <p className="
                    text-xs
                    text-white/50
                  ">
                    {result.nama_vendor}
                  </p>

                </div>

                <span className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-white/60
                ">
                  {result.kategori}
                </span>

              </div>

              <div className="
                my-4
                h-px
                bg-white/10
              " />

              {/* DETAIL */}

              <div className="
                space-y-2.5
                text-sm
              ">

                <div className="flex gap-3">
                  <span className="
                    w-28
                    shrink-0
                    text-white/45
                  ">
                    ID Appraisal
                  </span>

                  <span className="text-white">
                    {result.appraisal_id || "-"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="
                    w-28
                    shrink-0
                    text-white/45
                  ">
                    Merk / Type
                  </span>

                  <span className="text-white">
                    {result.merk_type || "-"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="
                    w-28
                    shrink-0
                    text-white/45
                  ">
                    Cabang
                  </span>

                  <span className="text-white">
                    {result.cabang_vendor || "-"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="
                    w-28
                    shrink-0
                    text-white/45
                  ">
                    Inspektor
                  </span>

                  <span className="text-white">
                    {result.inspector || "-"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="
                    w-28
                    shrink-0
                    text-white/45
                  ">
                    Tgl Inspeksi
                  </span>

                  <span className="text-white">
                    {result.tanggal_inspeksi || "-"}
                  </span>
                </div>

              </div>

            </GlassCard>
          )
        )}

      </div>
    );
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="
      relative
      min-h-screen
      w-full
      overflow-hidden
    ">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <Image
        src="/images/login-bg.png"
        alt="Otolink Background"
        fill
        priority
        className="
          pointer-events-none
          object-cover
        "
      />

      <div className="
        pointer-events-none
        absolute
        inset-0
        bg-black/30
      " />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="
        relative
        z-10
        mx-auto
        w-full
        max-w-md
        px-5
        pt-10
        pb-28
      ">

        {/* =================================================
            HEADER
        ================================================= */}

        <GlassCard
          className={`
            mb-4
            p-5
            text-center
            transition-all
            duration-700
            ease-out
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          <h1 className="
            text-2xl
            font-bold
            tracking-wide
            text-red-500
            drop-shadow-lg
          ">
            RIWAYAT INSPEKSI UNIT
          </h1>

          <div className="
            mx-auto
            mt-3
            h-px
            w-3/4
            bg-white/20
          " />

          <p className="
            mt-3
            text-sm
            font-semibold
            tracking-wide
            text-white
          ">
            PT BALAI LELANG MEGATAMA
          </p>

        </GlassCard>

        {/* =================================================
            SEARCH DESCRIPTION
        ================================================= */}

        <p
          className={`
            mb-2
            px-1
            text-center
            text-xs
            leading-relaxed
            text-white/60
            transition-all
            delay-100
            duration-700
            ease-out
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
          `}
        >
          Cari data unit yang sudah anda
          inspeksi berdasarkan nomor polisi
        </p>

        {/* =================================================
            SEARCH BAR
        ================================================= */}

        <GlassCard
          className={`
            mb-7
            p-4
            transition-all
            delay-100
            duration-700
            ease-out
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          <div className="
            flex
            gap-2
          ">

            <input
              type="text"
              value={searchNopol}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="CONTOH : A 1234 BCD"
              autoComplete="off"
              className="
                min-w-0
                flex-1
                rounded-xl
                border
                border-white/10
                bg-black/30
                px-4
                py-3
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-white
                outline-none
                placeholder:text-white/30
                focus:border-red-500/50
                focus:bg-black/40
              "
            />

            <button
              type="button"
              onClick={handleSearch}
              disabled={
                searching ||
                !searchNopol.trim()
              }
              className="
                shrink-0
                rounded-xl
                bg-red-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                transition-all
                duration-200
                hover:bg-red-700
                active:scale-[0.97]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >

              {searching ? (
                <span className="
                  flex
                  items-center
                  gap-2
                ">

                  <span className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  " />

                  CARI

                </span>
              ) : (
                "CARI"
              )}

            </button>

          </div>

        </GlassCard>

        {/* =================================================
            SEARCH RESULT
        ================================================= */}

        {renderSearchResults()}

        {/* =================================================
            LOADING VENDOR
        ================================================= */}

        {loading && (
          <GlassCard className="
            p-6
            text-center
          ">

            <div className="
              mx-auto
              h-8
              w-8
              animate-spin
              rounded-full
              border-4
              border-white/20
              border-t-red-500
            " />

            <p className="
              mt-4
              text-sm
              font-medium
              text-white/70
            ">
              Memuat vendor...
            </p>

          </GlassCard>
        )}

        {/* =================================================
            ERROR VENDOR
        ================================================= */}

        {!loading && error && (
          <GlassCard className="
            p-6
            text-center
          ">

            <h2 className="
              text-lg
              font-bold
              text-white
            ">
              Gagal Memuat Data
            </h2>

            <p className="
              mt-2
              text-sm
              leading-relaxed
              text-white/60
            ">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                mt-5
                w-full
                rounded-xl
                bg-red-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
                active:scale-[0.98]
              "
            >
              Coba Lagi
            </button>

          </GlassCard>
        )}

        {/* =================================================
            VENDOR CONTENT
        ================================================= */}

        {!loading && !error && (
          <div
            className={`
              transition-all
              duration-700
              ease-out
              ${
                showCards
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >

            {/* =================================================
                APPRAISAL MOBIL
            ================================================= */}

            <section>

              <h2 className="
                mb-3
                text-lg
                font-bold
                tracking-wide
                text-white
              ">
                APPRAISAL MOBIL
              </h2>

              {renderVendorList(mobil)}

            </section>

            {/* PEMISAH */}

            <div className="
              my-7
              h-px
              w-full
              bg-white/20
            " />

            {/* =================================================
                APPRAISAL MOTOR
            ================================================= */}

            <section>

              <h2 className="
                mb-3
                text-lg
                font-bold
                tracking-wide
                text-white
              ">
                APPRAISAL MOTOR
              </h2>

              {renderVendorList(motor)}

            </section>

            {/* PEMISAH */}

            <div className="
              my-7
              h-px
              w-full
              bg-white/20
            " />

            {/* =================================================
                APPRAISAL UNIT LAIN
            ================================================= */}

            <section>

              <h2 className="
                mb-3
                text-lg
                font-bold
                tracking-wide
                text-white
              ">
                APPRAISAL UNIT LAIN
              </h2>

              {renderVendorList(lain)}

            </section>

          </div>
        )}

        {/* =================================================
            BACK
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/dashboard"
        />

      </div>

    </main>
  );
}