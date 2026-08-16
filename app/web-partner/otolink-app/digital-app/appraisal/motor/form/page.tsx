"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import GlassCard from "../../../dashboard/GlassCard";
import BackButton from "../../../components/common/BackButton";

import {
  loadAppraisal,
  saveAppraisal,
} from "../../../lib/appraisal-storage";

function MotorFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // =====================================================
  // UI STATE
  // =====================================================

  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // =====================================================
  // HEADER DATA
  // =====================================================

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");

  // =====================================================
  // PENYERAH
  // =====================================================

  const [penyerah, setPenyerah] = useState({
    nama: "",
    jabatan: "",
    perusahaan: "",
    cabang: "",
  });

  // =====================================================
  // PENERIMA
  // =====================================================

  const [penerima, setPenerima] = useState({
    nama: "",
    jabatan: "",
    perusahaan: "",
    cabang: "",
  });

  // =====================================================
  // PROPER CASE
  // =====================================================

  const toProperCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =====================================================
  // VALIDASI PENYERAH
  // =====================================================

  const isFormComplete =
    penyerah.nama.trim() !== "" &&
    penyerah.jabatan.trim() !== "" &&
    penyerah.perusahaan.trim() !== "" &&
    penyerah.cabang.trim() !== "";

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    setShowCards(true);

    // ---------------------------------------------------
    // TANGGAL INSPEKSI
    // ---------------------------------------------------

    const today = new Date();

    setInspectionDate(
      today.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );

    // ---------------------------------------------------
    // LOAD DATA APPRAISAL
    // ---------------------------------------------------

    const saved = loadAppraisal();

    // ---------------------------------------------------
    // LOAD VENDOR
    // ---------------------------------------------------

    const vendorFromUrl = searchParams.get("vendor");

    if (vendorFromUrl) {
      setVendor(vendorFromUrl);

      saveAppraisal({
        ...saved,
        vendor: vendorFromUrl,
      });
    } else {
      setVendor(saved?.vendor ?? "Belum dipilih");
    }

    // ---------------------------------------------------
    // LOAD PENYERAH DARI STORAGE
    // ---------------------------------------------------

    if (saved?.penyerah) {
      setPenyerah({
        nama: saved.penyerah.nama ?? "",
        jabatan: saved.penyerah.jabatan ?? "",
        perusahaan: saved.penyerah.perusahaan ?? "",
        cabang: saved.penyerah.cabang ?? "",
      });
    }

    // ---------------------------------------------------
    // LOAD USER LOGIN
    // ---------------------------------------------------

    const user = sessionStorage.getItem("user");

    if (user) {
      try {
        const userData = JSON.parse(user);

        setInspector(userData.nama ?? "");

        setPenerima({
          nama: userData.nama ?? "",
          jabatan: userData.role ?? userData.jabatan ?? "",
          perusahaan: userData.perusahaan ?? "",
          cabang: userData.cabang ?? "",
        });
      } catch (error) {
        console.error("Gagal membaca data user:", error);
      }
    }

    // ---------------------------------------------------
    // LOAD SELESAI
    // ---------------------------------------------------

    setIsLoaded(true);
  }, [searchParams]);

  // =====================================================
  // AUTOSAVE
  // BARU BOLEH JALAN SETELAH INITIAL LOAD SELESAI
  // =====================================================

  useEffect(() => {
    if (!isLoaded) return;

    const saved = loadAppraisal();

    saveAppraisal({
      ...saved,
      penyerah,
      penerima,
    });
  }, [penyerah, penerima, isLoaded]);

  // =====================================================
  // HANDLE NEXT
  // =====================================================

  const handleNext = () => {
    // ---------------------------------------------------
    // VALIDASI
    // ---------------------------------------------------

    if (!isFormComplete) {
      setShowValidation(true);

      // Scroll ke bagian form
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // ---------------------------------------------------
    // SIMPAN FINAL DATA HALAMAN 1
    // ---------------------------------------------------

    const saved = loadAppraisal();

    saveAppraisal({
      ...saved,
      penyerah,
      penerima,
    });

    // ---------------------------------------------------
    // KE HALAMAN 2
    // ---------------------------------------------------

    router.push(
      "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-2"
    );
  };

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const getInputClass = (invalid: boolean) => `
    h-12
    w-full
    rounded-xl
    border
    bg-white/10
    px-4
    text-white
    placeholder:text-white/40
    outline-none
    transition
    ${
      invalid
        ? "border-red-500 focus:border-red-500"
        : "border-white/20 focus:border-red-500"
    }
  `;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <Image
        src="/images/login-bg.png"
        alt="Otolink Background"
        fill
        priority
        className="pointer-events-none object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-md px-5 py-6 pb-28">

        {/* =================================================
            TITLE
        ================================================= */}

        <h1
          className={`
            mb-5
            text-center
            text-3xl
            font-bold
            tracking-wide
            text-red-500
            drop-shadow-lg
            transition-all
            duration-700
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          APPRAISAL MOTOR
        </h1>

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className={`
            mb-4
            transition-all
            duration-700
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          <div className="mx-auto w-fit">

            <div className="space-y-2 pl-2 text-sm">

              <div className="mx-auto grid w-fit grid-cols-[100px_15px_220px] gap-y-1">

                <span className="text-white/60">
                  Inspector
                </span>

                <span className="text-center text-white/60">
                  :
                </span>

                <span className="font-medium text-white">
                  {inspector}
                </span>

                <span className="text-white/60">
                  Tgl Inspeksi
                </span>

                <span className="text-center text-white/60">
                  :
                </span>

                <span className="font-medium text-white">
                  {inspectionDate}
                </span>

                <span className="text-white/60">
                  Vendor
                </span>

                <span className="text-center text-white/60">
                  :
                </span>

                <span className="whitespace-nowrap font-medium text-white">
                  {vendor}
                </span>

              </div>

            </div>

            <div className="mt-4 h-[2px] bg-white/80" />

          </div>
        </div>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <GlassCard
          className={`
            p-4
            transition-all
            duration-700
            delay-150
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          <div className="flex items-center justify-between">

            <p className="text-sm text-white/60">
              Bagian 1 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              10%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[10%]
                rounded-full
                bg-gradient-to-r
                from-red-500
                to-red-400
              "
            />

          </div>

          <h2 className="mt-1 text-lg font-bold text-blue-300">
            SERAH TERIMA
          </h2>

        </GlassCard>

        {/* =================================================
            FORM
        ================================================= */}

        <GlassCard
          className={`
            mt-4
            p-5
            transition-all
            duration-700
            delay-300
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          {/* =================================================
              YANG MENYERAHKAN
          ================================================= */}

          <h2 className="text-left text-lg font-semibold text-white">
            Yang Menyerahkan
          </h2>

          <div className="mt-3 h-px bg-white/15" />

          <div className="mt-6 space-y-6">

            {/* NAMA PIC */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Nama PIC
              </label>

              <input
                type="text"
                value={penyerah.nama}
                onChange={(e) => {
                  setPenyerah((prev) => ({
                    ...prev,
                    nama: toProperCase(e.target.value),
                  }));
                }}
                placeholder="PIC yang menyerahkan unit"
                className={getInputClass(
                  showValidation && !penyerah.nama.trim()
                )}
              />

              {showValidation && !penyerah.nama.trim() && (
                <p className="text-left text-sm font-medium text-red-400">
                  Nama PIC wajib diisi
                </p>
              )}

            </div>

            {/* JABATAN */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Jabatan
              </label>

              <input
                type="text"
                value={penyerah.jabatan}
                onChange={(e) => {
                  setPenyerah((prev) => ({
                    ...prev,
                    jabatan: toProperCase(e.target.value),
                  }));
                }}
                placeholder="Masukkan jabatan"
                className={getInputClass(
                  showValidation && !penyerah.jabatan.trim()
                )}
              />

              {showValidation && !penyerah.jabatan.trim() && (
                <p className="text-left text-sm font-medium text-red-400">
                  Jabatan wajib diisi
                </p>
              )}

            </div>

            {/* PERUSAHAAN */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Perusahaan
              </label>

              <input
                type="text"
                value={penyerah.perusahaan}
                onChange={(e) => {
                  setPenyerah((prev) => ({
                    ...prev,
                    perusahaan: toProperCase(e.target.value),
                  }));
                }}
                placeholder="Nama perusahaan"
                className={getInputClass(
                  showValidation && !penyerah.perusahaan.trim()
                )}
              />

              {showValidation && !penyerah.perusahaan.trim() && (
                <p className="text-left text-sm font-medium text-red-400">
                  Perusahaan wajib diisi
                </p>
              )}

            </div>

            {/* CABANG */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Cabang
              </label>

              <input
                type="text"
                value={penyerah.cabang}
                onChange={(e) => {
                  setPenyerah((prev) => ({
                    ...prev,
                    cabang: toProperCase(e.target.value),
                  }));
                }}
                placeholder="Masukkan Cabang"
                className={getInputClass(
                  showValidation && !penyerah.cabang.trim()
                )}
              />

              {showValidation && !penyerah.cabang.trim() && (
                <p className="text-left text-sm font-medium text-red-400">
                  Cabang wajib diisi
                </p>
              )}

            </div>

          </div>

          {/* =================================================
              YANG MENERIMA
          ================================================= */}

          <h2 className="mt-8 text-left text-lg font-semibold text-white">
            Yang Menerima
          </h2>

          <div className="mt-3 h-px bg-white/15" />

          <div className="mt-6 space-y-5">

            {/* NAMA */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Nama PIC
              </label>

              <input
                type="text"
                value={penerima.nama}
                readOnly
                className="
                  h-12
                  w-full
                  cursor-default
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white/70
                  outline-none
                "
              />

            </div>

            {/* JABATAN */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Jabatan
              </label>

              <input
                type="text"
                value={penerima.jabatan}
                readOnly
                className="
                  h-12
                  w-full
                  cursor-default
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white/70
                  outline-none
                "
              />

            </div>

            {/* PERUSAHAAN */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Perusahaan
              </label>

              <input
                type="text"
                value={penerima.perusahaan}
                readOnly
                className="
                  h-12
                  w-full
                  cursor-default
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white/70
                  outline-none
                "
              />

            </div>

            {/* CABANG */}

            <div className="space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Cabang
              </label>

              <input
                type="text"
                value={penerima.cabang}
                readOnly
                className="
                  h-12
                  w-full
                  cursor-default
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white/70
                  outline-none
                "
              />

            </div>

          </div>

        </GlassCard>

        {/* =================================================
            BUTTON LANJUT
        ================================================= */}

        <div className="mt-8">

          <button
            type="button"
            onClick={handleNext}
            className="
              w-full
              rounded-xl
              bg-red-600
              py-3
              text-lg
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-red-700
              active:scale-[0.98]
            "
          >
            Lanjut ke Bagian 2 ➜
          </button>

        </div>

        {/* =================================================
            BACK
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor"
        />

      </div>

    </main>
  );
}

// =========================================================
// PAGE WRAPPER
// =========================================================

export default function MotorFormPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <div className="text-sm text-white/60">
            Memuat halaman appraisal...
          </div>
        </main>
      }
    >
      <MotorFormContent />
    </Suspense>
  );
}