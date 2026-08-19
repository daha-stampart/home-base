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

export default function MotorSection5Page() {
  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // REM
  // =====================================================

  const [masterCakram, setMasterCakram] = useState("");
  const [masterCakramCatatan, setMasterCakramCatatan] =
    useState("");

  const [plateBrakeShoe, setPlateBrakeShoe] = useState("");
  const [plateBrakeShoeCatatan, setPlateBrakeShoeCatatan] =
    useState("");

  const [piringanRemDepan, setPiringanRemDepan] = useState("");
  const [piringanRemDepanCatatan, setPiringanRemDepanCatatan] =
    useState("");

  const [masterCylinderRem, setMasterCylinderRem] =
    useState("");
  const [masterCylinderRemCatatan, setMasterCylinderRemCatatan] =
    useState("");

  const [kampasCakram, setKampasCakram] = useState("");
  const [kampasCakramCatatan, setKampasCakramCatatan] =
    useState("");

  const [kampasTromol, setKampasTromol] = useState("");
  const [kampasTromolCatatan, setKampasTromolCatatan] =
    useState("");

  const [leherAngsa, setLeherAngsa] = useState("");
  const [leherAngsaCatatan, setLeherAngsaCatatan] =
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

      setMasterCakram(saved.masterCakram ?? "");
      setMasterCakramCatatan(
        saved.masterCakramCatatan ?? ""
      );

      setPlateBrakeShoe(saved.plateBrakeShoe ?? "");
      setPlateBrakeShoeCatatan(
        saved.plateBrakeShoeCatatan ?? ""
      );

      setPiringanRemDepan(saved.piringanRemDepan ?? "");
      setPiringanRemDepanCatatan(
        saved.piringanRemDepanCatatan ?? ""
      );

      setMasterCylinderRem(
        saved.masterCylinderRem ?? ""
      );
      setMasterCylinderRemCatatan(
        saved.masterCylinderRemCatatan ?? ""
      );

      setKampasCakram(saved.kampasCakram ?? "");
      setKampasCakramCatatan(
        saved.kampasCakramCatatan ?? ""
      );

      setKampasTromol(saved.kampasTromol ?? "");
      setKampasTromolCatatan(
        saved.kampasTromolCatatan ?? ""
      );

      setLeherAngsa(saved.leherAngsa ?? "");
      setLeherAngsaCatatan(
        saved.leherAngsaCatatan ?? ""
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

      masterCakram,
      masterCakramCatatan,

      plateBrakeShoe,
      plateBrakeShoeCatatan,

      piringanRemDepan,
      piringanRemDepanCatatan,

      masterCylinderRem,
      masterCylinderRemCatatan,

      kampasCakram,
      kampasCakramCatatan,

      kampasTromol,
      kampasTromolCatatan,

      leherAngsa,
      leherAngsaCatatan,
    });
  }, [
    isLoaded,
    appraisalId,

    masterCakram,
    masterCakramCatatan,

    plateBrakeShoe,
    plateBrakeShoeCatatan,

    piringanRemDepan,
    piringanRemDepanCatatan,

    masterCylinderRem,
    masterCylinderRemCatatan,

    kampasCakram,
    kampasCakramCatatan,

    kampasTromol,
    kampasTromolCatatan,

    leherAngsa,
    leherAngsaCatatan,
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
              Bagian 5 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              50%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[50%]
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
            REM
          </p>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              1. MASTER CAKRAM
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              MASTER CAKRAM
            </label>

            <p className="italic text-white/70">
              Satu Set
            </p>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="masterCakram"
                    value={option}
                    checked={masterCakram === option}
                    onChange={(e) =>
                      setMasterCakram(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !masterCakram && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ MASTER CAKRAM BELUM DIPILIH
              </p>
            )}

            <textarea
              value={masterCakramCatatan}
              onChange={(e) =>
                setMasterCakramCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              2. PLATE BRAKE SHOE
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              PLATE BRAKE SHOE
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="plateBrakeShoe"
                    value={option}
                    checked={plateBrakeShoe === option}
                    onChange={(e) =>
                      setPlateBrakeShoe(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !plateBrakeShoe && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ PLATE BRAKE SHOE BELUM DIPILIH
              </p>
            )}

            <textarea
              value={plateBrakeShoeCatatan}
              onChange={(e) =>
                setPlateBrakeShoeCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              3. PIRINGAN REM DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              PIRINGAN REM DEPAN
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="piringanRemDepan"
                    value={option}
                    checked={piringanRemDepan === option}
                    onChange={(e) =>
                      setPiringanRemDepan(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !piringanRemDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ PIRINGAN REM DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={piringanRemDepanCatatan}
              onChange={(e) =>
                setPiringanRemDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              4. MASTER CYLINDER REM
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              MASTER CYLINDER REM
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="masterCylinderRem"
                    value={option}
                    checked={masterCylinderRem === option}
                    onChange={(e) =>
                      setMasterCylinderRem(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !masterCylinderRem && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ MASTER CYLINDER REM BELUM DIPILIH
              </p>
            )}

            <textarea
              value={masterCylinderRemCatatan}
              onChange={(e) =>
                setMasterCylinderRemCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              5. KAMPAS CAKRAM
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              KAMPAS CAKRAM
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="kampasCakram"
                    value={option}
                    checked={kampasCakram === option}
                    onChange={(e) =>
                      setKampasCakram(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !kampasCakram && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ KAMPAS CAKRAM BELUM DIPILIH
              </p>
            )}

            <textarea
              value={kampasCakramCatatan}
              onChange={(e) =>
                setKampasCakramCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              6. KAMPAS TROMOL
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              KAMPAS TROMOL
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="kampasTromol"
                    value={option}
                    checked={kampasTromol === option}
                    onChange={(e) =>
                      setKampasTromol(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !kampasTromol && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ KAMPAS TROMOL BELUM DIPILIH
              </p>
            )}

            <textarea
              value={kampasTromolCatatan}
              onChange={(e) =>
                setKampasTromolCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              7. LEHER ANGSA
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              LEHER ANGSA
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="leherAngsa"
                    value={option}
                    checked={leherAngsa === option}
                    onChange={(e) =>
                      setLeherAngsa(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !leherAngsa && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ LEHER ANGSA BELUM DIPILIH
              </p>
            )}

            <textarea
              value={leherAngsaCatatan}
              onChange={(e) =>
                setLeherAngsaCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          {/* =================================================
              BUTTON LANJUT
          ================================================= */}

          <div className="mt-16">

            {showValidation &&
              (!masterCakram ||
                !plateBrakeShoe ||
                !piringanRemDepan ||
                !masterCylinderRem ||
                !kampasCakram ||
                !kampasTromol ||
                !leherAngsa) && (
                <p className="mb-3 text-center text-xl font-semibold text-red-500">
                  ⚠ INSPEKSI BELUM LENGKAP
                </p>
              )}

            <button
              type="button"
              onClick={() => {
                const isComplete =
                  masterCakram &&
                  plateBrakeShoe &&
                  piringanRemDepan &&
                  masterCylinderRem &&
                  kampasCakram &&
                  kampasTromol &&
                  leherAngsa;

                if (!isComplete) {
                  setShowValidation(true);
                  return;
                }

                setShowValidation(false);

                router.push(
                  "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-6"
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
              Lanjut ke Bagian 6 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-4"
        />

      </div>

    </main>
  );
}