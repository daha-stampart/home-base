"use client";

import { useEffect, useState } from "react";
import GlassCard from "../../../../dashboard/GlassCard";
import BackButton from "../../../../components/common/BackButton";
import { useRouter } from "next/navigation";
import {
  loadAppraisal,
  saveAppraisal,
} from "../../../../lib/appraisal-storage";
import Image from "next/image";

export default function MotorSection9Page() {
  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // STNK
  // =====================================================

  const [stnk, setStnk] = useState("");
  const [stnkCatatan, setStnkCatatan] = useState("");

  // =====================================================
  // NOTA PAJAK
  // =====================================================

  const [notaPajak, setNotaPajak] = useState("");
  const [tanggalPajak, setTanggalPajak] = useState("");
  const [notaPajakCatatan, setNotaPajakCatatan] = useState("");

  // =====================================================
  // KUNCI KONTAK
  // =====================================================

  const [kunciKontak, setKunciKontak] = useState("");
  const [kunciKontakCatatan, setKunciKontakCatatan] =
    useState("");

  const router = useRouter();

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    setShowCards(true);

    const saved = loadAppraisal();

    if (saved) {
      setVendor(saved.vendor ?? "Belum dipilih");
      setAppraisalId(saved.appraisalId ?? "");

      setStnk(saved.stnk ?? "");
      setStnkCatatan(saved.stnkCatatan ?? "");

      setNotaPajak(saved.notaPajak ?? "");
      setTanggalPajak(saved.tanggalPajak ?? "");
      setNotaPajakCatatan(saved.notaPajakCatatan ?? "");

      setKunciKontak(saved.kunciKontak ?? "");
      setKunciKontakCatatan(
        saved.kunciKontakCatatan ?? ""
      );
    }

    // ===================================================
    // INSPECTOR
    // ===================================================

    const user = sessionStorage.getItem("user");

    if (user) {
      try {
        const userData = JSON.parse(user);

        setInspector(userData.nama ?? "");
      } catch (error) {
        console.error("Gagal membaca data user:", error);
      }
    }

    // ===================================================
    // TANGGAL INSPEKSI
    // ===================================================

    setInspectionDate(
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );

    setIsLoaded(true);
  }, []);

  // =====================================================
  // AUTOSAVE
  // =====================================================

  useEffect(() => {
    if (!isLoaded) return;

    saveAppraisal({
      ...loadAppraisal(),

      appraisalId,

      stnk,
      stnkCatatan,

      notaPajak,
      tanggalPajak,
      notaPajakCatatan,

      kunciKontak,
      kunciKontakCatatan,
    });
  }, [
    isLoaded,
    appraisalId,

    stnk,
    stnkCatatan,

    notaPajak,
    tanggalPajak,
    notaPajakCatatan,

    kunciKontak,
    kunciKontakCatatan,
  ]);

  // =====================================================
  // TEXTAREA CLASS
  // =====================================================

  const textareaClass = `
    min-h-[90px]
    w-full
    resize-none
    rounded-xl
    border
    border-white/20
    bg-white/10
    px-4
    py-3
    text-white
    placeholder:text-white/40
    outline-none
    transition
    focus:border-red-500
  `;

  // =====================================================
  // DATE INPUT CLASS
  // =====================================================

  const dateInputClass = `
    w-full
    rounded-xl
    border
    border-white/20
    bg-white/10
    px-4
    py-3
    text-white
    outline-none
    transition
    focus:border-red-500
  `;

  // =====================================================
  // RENDER OPTIONS
  // =====================================================

  const renderOptions = (
    name: string,
    value: string,
    options: string[],
    setValue: (value: string) => void
  ) => {
    return (
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-1">

        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 text-white"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) =>
                setValue(e.target.value)
              }
              className="h-4 w-4 accent-red-500"
            />

            {option}
          </label>
        ))}

      </div>
    );
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const notaPajakComplete =
    notaPajak === "TIDAK" ||
    (notaPajak === "ADA" && tanggalPajak);

  const isComplete =
    stnk &&
    notaPajakComplete &&
    kunciKontak;

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
            ease-out
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
            INSPECTOR
        ================================================= */}

        <div
          className={`
            mb-4
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
            ease-out
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          <div className="flex items-center justify-between">

            <p className="text-sm text-white/60">
              Bagian 9 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              90%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[90%]
                rounded-full
                bg-gradient-to-r
                from-red-500
                to-red-400
                transition-all
                duration-700
              "
            />

          </div>

          <h2 className="mt-1 text-2xl font-bold text-blue-300">
            Dokumen dan Kunci
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
            ease-out
            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          <h2 className="text-base font-semibold text-white/70">
            GRUP SPARE PART
          </h2>

          <p className="text-2xl font-semibold text-blue-300">
            STNK DAN KUNCI KONTAK
          </p>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              STNK
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="block text-lg font-bold text-white">
              STNK
            </label>

            {renderOptions(
              "stnk",
              stnk,
              ["ADA", "TIDAK"],
              setStnk
            )}

            {showValidation && !stnk && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ STNK BELUM DIPILIH
              </p>
            )}

            <textarea
              value={stnkCatatan}
              onChange={(e) =>
                setStnkCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              NOTA PAJAK
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="block text-lg font-bold text-white">
              NOTA PAJAK
            </label>

            {renderOptions(
              "nota-pajak",
              notaPajak,
              ["ADA", "TIDAK"],
              setNotaPajak
            )}

            {showValidation && !notaPajak && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ NOTA PAJAK BELUM DIPILIH
              </p>
            )}

            {notaPajak === "ADA" && (
              <div className="pt-2 text-left">

                <label className="mb-2 block text-sm font-medium text-white/70">
                  TANGGAL PAJAK
                </label>

                <input
                  type="date"
                  value={tanggalPajak}
                  onChange={(e) =>
                    setTanggalPajak(e.target.value)
                  }
                  className={dateInputClass}
                />

                {showValidation && !tanggalPajak && (
                  <p className="mt-2 text-sm font-medium text-red-400">
                    ⚠ TANGGAL PAJAK WAJIB DIISI
                  </p>
                )}

              </div>
            )}

            <textarea
              value={notaPajakCatatan}
              onChange={(e) =>
                setNotaPajakCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              KUNCI KONTAK
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="block text-lg font-bold text-white">
              KUNCI KONTAK
            </label>

            {renderOptions(
              "kunci-kontak",
              kunciKontak,
              ["KUNCI", "REMOTE", "TIDAK ADA"],
              setKunciKontak
            )}

            {showValidation && !kunciKontak && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ KUNCI KONTAK BELUM DIPILIH
              </p>
            )}

            <textarea
              value={kunciKontakCatatan}
              onChange={(e) =>
                setKunciKontakCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          {/* =================================================
              BUTTON LANJUT
          ================================================= */}

          <div className="mt-16">

            {showValidation && !isComplete && (
              <p className="mb-3 text-center text-xl font-semibold text-red-500">
                ⚠ INSPEKSI BELUM LENGKAP
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                if (!isComplete) {
                  setShowValidation(true);
                  return;
                }

                setShowValidation(false);

                router.push(
                  "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-10"
                );
              }}
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
              Lanjut ke Bagian 10 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-8"
        />

      </div>

    </main>
  );
}