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

export default function MotorSection3Page() {
  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // PERTANYAAN
  // =====================================================

  const [kepala, setKepala] = useState("");
  const [kepalaCatatan, setKepalaCatatan] = useState("");

  const [sayapDalam, setSayapDalam] = useState("");
  const [sayapDalamCatatan, setSayapDalamCatatan] = useState("");

  const [sayapLuar, setSayapLuar] = useState("");
  const [sayapLuarCatatan, setSayapLuarCatatan] = useState("");

  const [rangkaTengah, setRangkaTengah] = useState("");
  const [rangkaTengahCatatan, setRangkaTengahCatatan] = useState("");

  const [bodyBelakang, setBodyBelakang] = useState("");
  const [bodyBelakangCatatan, setBodyBelakangCatatan] = useState("");

  const [spackboardDepan, setSpackboardDepan] = useState("");
  const [spackboardDepanCatatan, setSpackboardDepanCatatan] = useState("");

  const [spackboardBelakang, setSpackboardBelakang] = useState("");
  const [spackboardBelakangCatatan, setSpackboardBelakangCatatan] =
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

      setKepala(saved.kepala ?? "");
      setKepalaCatatan(saved.kepalaCatatan ?? "");

      setSayapDalam(saved.sayapDalam ?? "");
      setSayapDalamCatatan(saved.sayapDalamCatatan ?? "");

      setSayapLuar(saved.sayapLuar ?? "");
      setSayapLuarCatatan(saved.sayapLuarCatatan ?? "");

      setRangkaTengah(saved.rangkaTengah ?? "");
      setRangkaTengahCatatan(saved.rangkaTengahCatatan ?? "");

      setBodyBelakang(saved.bodyBelakang ?? "");
      setBodyBelakangCatatan(saved.bodyBelakangCatatan ?? "");

      setSpackboardDepan(saved.spackboardDepan ?? "");
      setSpackboardDepanCatatan(saved.spackboardDepanCatatan ?? "");

      setSpackboardBelakang(saved.spackboardBelakang ?? "");
      setSpackboardBelakangCatatan(
        saved.spackboardBelakangCatatan ?? ""
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

      kepala,
      kepalaCatatan,

      sayapDalam,
      sayapDalamCatatan,

      sayapLuar,
      sayapLuarCatatan,

      rangkaTengah,
      rangkaTengahCatatan,

      bodyBelakang,
      bodyBelakangCatatan,

      spackboardDepan,
      spackboardDepanCatatan,

      spackboardBelakang,
      spackboardBelakangCatatan,
    });
  }, [
    isLoaded,
    appraisalId,

    kepala,
    kepalaCatatan,

    sayapDalam,
    sayapDalamCatatan,

    sayapLuar,
    sayapLuarCatatan,

    rangkaTengah,
    rangkaTengahCatatan,

    bodyBelakang,
    bodyBelakangCatatan,

    spackboardDepan,
    spackboardDepanCatatan,

    spackboardBelakang,
    spackboardBelakangCatatan,
  ]);

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
    focus:border-red-500
    ${
      invalid
        ? "border-red-500"
        : "border-white/20"
    }
  `;

  // =====================================================
  // TEXTAREA CLASS
  // =====================================================

  const getTextareaClass = `
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
              Bagian 3 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              30%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[30%]
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
            Eksterior
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
            COVER
          </p>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 1 - KEPALA
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              KEPALA
            </label>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="kepala"
                  value="Baik"
                  checked={kepala === "Baik"}
                  onChange={(e) => setKepala(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="kepala"
                  value="Cukup"
                  checked={kepala === "Cukup"}
                  onChange={(e) => setKepala(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="kepala"
                  value="Rusak"
                  checked={kepala === "Rusak"}
                  onChange={(e) => setKepala(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !kepala && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ KEPALA BELUM DIPILIH
              </p>
            )}

            <textarea
              value={kepalaCatatan}
              onChange={(e) => setKepalaCatatan(e.target.value)}
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 2 - SAYAP DALAM
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              SAYAP DALAM
            </label>

            <p className="italic text-center text-white/70">
              Satu pasang
            </p>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="sayapDalam"
                  value="Baik"
                  checked={sayapDalam === "Baik"}
                  onChange={(e) => setSayapDalam(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="sayapDalam"
                  value="Cukup"
                  checked={sayapDalam === "Cukup"}
                  onChange={(e) => setSayapDalam(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="sayapDalam"
                  value="Rusak"
                  checked={sayapDalam === "Rusak"}
                  onChange={(e) => setSayapDalam(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !sayapDalam && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ SAYAP DALAM BELUM DIPILIH
              </p>
            )}

            <textarea
              value={sayapDalamCatatan}
              onChange={(e) => setSayapDalamCatatan(e.target.value)}
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 3 - SAYAP LUAR
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              SAYAP LUAR
            </label>

            <p className="italic text-center text-white/70">
              Satu pasang
            </p>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="sayapLuar"
                  value="Baik"
                  checked={sayapLuar === "Baik"}
                  onChange={(e) => setSayapLuar(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="sayapLuar"
                  value="Cukup"
                  checked={sayapLuar === "Cukup"}
                  onChange={(e) => setSayapLuar(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="sayapLuar"
                  value="Rusak"
                  checked={sayapLuar === "Rusak"}
                  onChange={(e) => setSayapLuar(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !sayapLuar && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ SAYAP LUAR BELUM DIPILIH
              </p>
            )}

            <textarea
              value={sayapLuarCatatan}
              onChange={(e) => setSayapLuarCatatan(e.target.value)}
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 4 - RANGKA TENGAH
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              RANGKA TENGAH
            </label>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="rangkaTengah"
                  value="Baik"
                  checked={rangkaTengah === "Baik"}
                  onChange={(e) => setRangkaTengah(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="rangkaTengah"
                  value="Cukup"
                  checked={rangkaTengah === "Cukup"}
                  onChange={(e) => setRangkaTengah(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="rangkaTengah"
                  value="Rusak"
                  checked={rangkaTengah === "Rusak"}
                  onChange={(e) => setRangkaTengah(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !rangkaTengah && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ RANGKA TENGAH BELUM DIPILIH
              </p>
            )}

            <textarea
              value={rangkaTengahCatatan}
              onChange={(e) => setRangkaTengahCatatan(e.target.value)}
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 5 - BODY BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              BODY BELAKANG
            </label>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="bodyBelakang"
                  value="Baik"
                  checked={bodyBelakang === "Baik"}
                  onChange={(e) => setBodyBelakang(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="bodyBelakang"
                  value="Cukup"
                  checked={bodyBelakang === "Cukup"}
                  onChange={(e) => setBodyBelakang(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="bodyBelakang"
                  value="Rusak"
                  checked={bodyBelakang === "Rusak"}
                  onChange={(e) => setBodyBelakang(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !bodyBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ BODY BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={bodyBelakangCatatan}
              onChange={(e) => setBodyBelakangCatatan(e.target.value)}
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 6 - SPACKBOARD DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              SPAKBOARD DEPAN
            </label>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="spackboardDepan"
                  value="Baik"
                  checked={spackboardDepan === "Baik"}
                  onChange={(e) => setSpackboardDepan(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="spackboardDepan"
                  value="Cukup"
                  checked={spackboardDepan === "Cukup"}
                  onChange={(e) => setSpackboardDepan(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="spackboardDepan"
                  value="Rusak"
                  checked={spackboardDepan === "Rusak"}
                  onChange={(e) => setSpackboardDepan(e.target.value)}
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !spackboardDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ SPACKBOARD DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={spackboardDepanCatatan}
              onChange={(e) =>
                setSpackboardDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PERTANYAAN 7 - SPACKBOARD BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              SPAKBOARD BELAKANG
            </label>

            <div className="flex justify-center gap-10 pt-1">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="spackboardBelakang"
                  value="Baik"
                  checked={spackboardBelakang === "Baik"}
                  onChange={(e) =>
                    setSpackboardBelakang(e.target.value)
                  }
                  className="h-4 w-4 accent-red-500"
                />
                BAIK
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="spackboardBelakang"
                  value="Cukup"
                  checked={spackboardBelakang === "Cukup"}
                  onChange={(e) =>
                    setSpackboardBelakang(e.target.value)
                  }
                  className="h-4 w-4 accent-red-500"
                />
                CUKUP
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="spackboardBelakang"
                  value="Rusak"
                  checked={spackboardBelakang === "Rusak"}
                  onChange={(e) =>
                    setSpackboardBelakang(e.target.value)
                  }
                  className="h-4 w-4 accent-red-500"
                />
                RUSAK
              </label>

            </div>

            {showValidation && !spackboardBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ SPACKBOARD BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={spackboardBelakangCatatan}
              onChange={(e) =>
                setSpackboardBelakangCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={getTextareaClass}
            />

          </div>

          {/* =================================================
              AKHIR PERTANYAAN
          ================================================= */}

          <div className="mt-6" />

          {/* =================================================
              BUTTON LANJUT
          ================================================= */}

          <div className="mt-16">

            {showValidation && (
              <p className="mb-3 text-center text-xl font-semibold text-red-500">
                ⚠ Inspeksi belum lengkap
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                const isComplete =
                  kepala &&
                  sayapDalam &&
                  sayapLuar &&
                  rangkaTengah &&
                  bodyBelakang &&
                  spackboardDepan &&
                  spackboardBelakang;

                if (!isComplete) {
                  setShowValidation(true);
                  return;
                }

                setShowValidation(false);

                router.push(
                  "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-4"
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
              Lanjut ke Bagian 4 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-2"
        />

      </div>

    </main>
  );
}