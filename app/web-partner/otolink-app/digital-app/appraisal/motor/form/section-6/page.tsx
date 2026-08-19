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

export default function MotorSection6Page() {
  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // LAMPU
  // =====================================================

  const [lampuDepan, setLampuDepan] = useState("");
  const [lampuDepanCatatan, setLampuDepanCatatan] =
    useState("");

  const [lampuBelakang, setLampuBelakang] = useState("");
  const [lampuBelakangCatatan, setLampuBelakangCatatan] =
    useState("");

  const [seinDepan, setSeinDepan] = useState("");
  const [seinDepanCatatan, setSeinDepanCatatan] =
    useState("");

  const [seinBelakang, setSeinBelakang] = useState("");
  const [seinBelakangCatatan, setSeinBelakangCatatan] =
    useState("");

  // =====================================================
  // BAN & VELG
  // =====================================================

  const [karetBelakang, setKaretBelakang] = useState("");
  const [karetBelakangCatatan, setKaretBelakangCatatan] = useState("");

  const [velgCwDepan, setVelgCwDepan] = useState("");
  const [velgCwDepanCatatan, setVelgCwDepanCatatan] = useState("");

  const [karetDepan, setKaretDepan] = useState("");
  const [karetDepanCatatan, setKaretDepanCatatan] = useState("");

  const [velgJariJariDepan, setVelgJariJariDepan] = useState("");
  const [velgJariJariDepanCatatan, setVelgJariJariDepanCatatan] = useState("");

  const [velgJariJariBelakang, setVelgJariJariBelakang] = useState("");
  const [velgJariJariBelakangCatatan, setVelgJariJariBelakangCatatan] = useState("");

  const [velgCwBelakang, setVelgCwBelakang] = useState("");
  const [velgCwBelakangCatatan, setVelgCwBelakangCatatan] = useState("");

  // =====================================================
  // MERK & KETEBALAN BAN
  // =====================================================

  const [merkBanDepan, setMerkBanDepan] = useState("");
  const [merkBanBelakang, setMerkBanBelakang] = useState("");
  const [ketebalanBanDepan, setKetebalanBanDepan] = useState("");
  const [ketebalanBanBelakang, setKetebalanBanBelakang] = useState("");

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

      setLampuDepan(saved.lampuDepan ?? "");
      setLampuDepanCatatan(
        saved.lampuDepanCatatan ?? ""
      );

      setLampuBelakang(saved.lampuBelakang ?? "");
      setLampuBelakangCatatan(
        saved.lampuBelakangCatatan ?? ""
      );

      setSeinDepan(saved.seinDepan ?? "");
      setSeinDepanCatatan(
        saved.seinDepanCatatan ?? ""
      );

      setSeinBelakang(saved.seinBelakang ?? "");
      setSeinBelakangCatatan(
        saved.seinBelakangCatatan ?? ""
      );

      setKaretBelakang(saved.karetBelakang ?? "");
      setKaretBelakangCatatan(saved.karetBelakangCatatan ?? "");
      setVelgCwDepan(saved.velgCwDepan ?? "");
      setVelgCwDepanCatatan(saved.velgCwDepanCatatan ?? "");
      setKaretDepan(saved.karetDepan ?? "");
      setKaretDepanCatatan(saved.karetDepanCatatan ?? "");
      setVelgJariJariDepan(saved.velgJariJariDepan ?? "");
      setVelgJariJariDepanCatatan(saved.velgJariJariDepanCatatan ?? "");
      setVelgJariJariBelakang(saved.velgJariJariBelakang ?? "");
      setVelgJariJariBelakangCatatan(saved.velgJariJariBelakangCatatan ?? "");
      setVelgCwBelakang(saved.velgCwBelakang ?? "");
      setVelgCwBelakangCatatan(saved.velgCwBelakangCatatan ?? "");

      setMerkBanDepan(saved.merkBanDepan ?? "");
      setMerkBanBelakang(saved.merkBanBelakang ?? "");
      setKetebalanBanDepan(saved.ketebalanBanDepan ?? "");
      setKetebalanBanBelakang(saved.ketebalanBanBelakang ?? "");
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

      lampuDepan,
      lampuDepanCatatan,

      lampuBelakang,
      lampuBelakangCatatan,

      seinDepan,
      seinDepanCatatan,

      seinBelakang,
      seinBelakangCatatan,

      karetBelakang,
      karetBelakangCatatan,
      velgCwDepan,
      velgCwDepanCatatan,
      karetDepan,
      karetDepanCatatan,
      velgJariJariDepan,
      velgJariJariDepanCatatan,
      velgJariJariBelakang,
      velgJariJariBelakangCatatan,
      velgCwBelakang,
      velgCwBelakangCatatan,

      merkBanDepan,
      merkBanBelakang,
      ketebalanBanDepan,
      ketebalanBanBelakang,
    });
  }, [
    isLoaded,
    appraisalId,

    lampuDepan,
    lampuDepanCatatan,

    lampuBelakang,
    lampuBelakangCatatan,

    seinDepan,
    seinDepanCatatan,

    seinBelakang,
    seinBelakangCatatan,

    karetBelakang,
    karetBelakangCatatan,
    velgCwDepan,
    velgCwDepanCatatan,
    karetDepan,
    karetDepanCatatan,
    velgJariJariDepan,
    velgJariJariDepanCatatan,
    velgJariJariBelakang,
    velgJariJariBelakangCatatan,
    velgCwBelakang,
    velgCwBelakangCatatan,

    merkBanDepan,
    merkBanBelakang,
    ketebalanBanDepan,
    ketebalanBanBelakang,
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
              Bagian 6 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              60%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[60%]
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
            LAMPU DAN BAN
          </p>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              1. LAMPU DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              LAMPU DEPAN
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="lampuDepan"
                    value={option}
                    checked={lampuDepan === option}
                    onChange={(e) =>
                      setLampuDepan(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !lampuDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ LAMPU DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={lampuDepanCatatan}
              onChange={(e) =>
                setLampuDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              2. LAMPU BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              LAMPU BELAKANG
            </label>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="lampuBelakang"
                    value={option}
                    checked={lampuBelakang === option}
                    onChange={(e) =>
                      setLampuBelakang(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !lampuBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ LAMPU BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={lampuBelakangCatatan}
              onChange={(e) =>
                setLampuBelakangCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              3. SEIN DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              SEIN DEPAN
            </label>

            <p className="italic text-white/70">
              Satu Pasang
            </p>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="seinDepan"
                    value={option}
                    checked={seinDepan === option}
                    onChange={(e) =>
                      setSeinDepan(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !seinDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ SEIN DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={seinDepanCatatan}
              onChange={(e) =>
                setSeinDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              4. SEIN BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">

            <label className="text-lg font-bold text-white">
              SEIN BELAKANG
            </label>

            <p className="italic text-white/70">
              Satu Pasang
            </p>

            <div className="flex justify-center gap-10 pt-1">

              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="seinBelakang"
                    value={option}
                    checked={seinBelakang === option}
                    onChange={(e) =>
                      setSeinBelakang(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}

            </div>

            {showValidation && !seinBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ SEIN BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={seinBelakangCatatan}
              onChange={(e) =>
                setSeinBelakangCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />

          </div>


          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              5. KARET BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              KARET BELAKANG
            </label>

            <p className="italic text-white/70">
              Tires
            </p>

            <div className="flex justify-center gap-10 pt-1">
              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="karetBelakang"
                    value={option}
                    checked={karetBelakang === option}
                    onChange={(e) =>
                      setKaretBelakang(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            {showValidation && !karetBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ KARET BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={karetBelakangCatatan}
              onChange={(e) =>
                setKaretBelakangCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              6. VELG CW DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              VELG CW DEPAN
            </label>

            <div className="flex justify-center gap-10 pt-1">
              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="velgCwDepan"
                    value={option}
                    checked={velgCwDepan === option}
                    onChange={(e) =>
                      setVelgCwDepan(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            {showValidation && !velgCwDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ VELG CW DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={velgCwDepanCatatan}
              onChange={(e) =>
                setVelgCwDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              7. KARET DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              KARET DEPAN
            </label>

            <p className="italic text-white/70">
              Tires
            </p>

            <div className="flex justify-center gap-10 pt-1">
              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="karetDepan"
                    value={option}
                    checked={karetDepan === option}
                    onChange={(e) =>
                      setKaretDepan(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            {showValidation && !karetDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ KARET DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={karetDepanCatatan}
              onChange={(e) =>
                setKaretDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              8. VELG JARI JARI DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              VELG JARI JARI DEPAN
            </label>

            <div className="flex justify-center gap-10 pt-1">
              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="velgJariJariDepan"
                    value={option}
                    checked={velgJariJariDepan === option}
                    onChange={(e) =>
                      setVelgJariJariDepan(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            {showValidation && !velgJariJariDepan && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ VELG JARI JARI DEPAN BELUM DIPILIH
              </p>
            )}

            <textarea
              value={velgJariJariDepanCatatan}
              onChange={(e) =>
                setVelgJariJariDepanCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              9. VELG JARI JARI BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              VELG JARI JARI BELAKANG
            </label>

            <div className="flex justify-center gap-10 pt-1">
              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="velgJariJariBelakang"
                    value={option}
                    checked={velgJariJariBelakang === option}
                    onChange={(e) =>
                      setVelgJariJariBelakang(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            {showValidation && !velgJariJariBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ VELG JARI JARI BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={velgJariJariBelakangCatatan}
              onChange={(e) =>
                setVelgJariJariBelakangCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              10. VELG CW BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              VELG CW BELAKANG
            </label>

            <div className="flex justify-center gap-10 pt-1">
              {["BAIK", "CUKUP", "RUSAK"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="radio"
                    name="velgCwBelakang"
                    value={option}
                    checked={velgCwBelakang === option}
                    onChange={(e) =>
                      setVelgCwBelakang(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            {showValidation && !velgCwBelakang && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ VELG CW BELAKANG BELUM DIPILIH
              </p>
            )}

            <textarea
              value={velgCwBelakangCatatan}
              onChange={(e) =>
                setVelgCwBelakangCatatan(e.target.value)
              }
              placeholder="tambahkan catatan khusus"
              className={textareaClass}
            />
          </div>

          {/* =================================================
              11. MERK BAN DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              MERK BAN DEPAN
            </label>
            <textarea
              value={merkBanDepan}
              onChange={(e) => setMerkBanDepan(e.target.value)}
              placeholder="Input merk ban depan"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              12. MERK BAN BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              MERK BAN BELAKANG
            </label>
            <textarea
              value={merkBanBelakang}
              onChange={(e) => setMerkBanBelakang(e.target.value)}
              placeholder="Input merk ban belakang"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              13. KETEBALAN BAN DEPAN
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              KETEBALAN BAN DEPAN
            </label>
            <textarea
              value={ketebalanBanDepan}
              onChange={(e) => setKetebalanBanDepan(e.target.value)}
              placeholder="Contoh: 80 MM / 50%"
              className={textareaClass}
            />
          </div>

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              14. KETEBALAN BAN BELAKANG
          ================================================= */}

          <div className="mt-6 space-y-3 text-center">
            <label className="text-lg font-bold text-white">
              KETEBALAN BAN BELAKANG
            </label>
            <textarea
              value={ketebalanBanBelakang}
              onChange={(e) => setKetebalanBanBelakang(e.target.value)}
              placeholder="Contoh: 75 MM / 80%"
              className={textareaClass}
            />
          </div>

          {/* =================================================
              BUTTON LANJUT
          ================================================= */}

          <div className="mt-16">

            {showValidation &&
              (!lampuDepan ||
                !lampuBelakang ||
                !seinDepan ||
                !seinBelakang ||
                !karetBelakang ||
                !velgCwDepan ||
                !karetDepan ||
                !velgJariJariDepan ||
                !velgJariJariBelakang ||
                !velgCwBelakang) && (
                <p className="mb-3 text-center text-xl font-semibold text-red-500">
                  ⚠ INSPEKSI BELUM LENGKAP
                </p>
              )}

            <button
              type="button"
              onClick={() => {
                const isComplete =
                  lampuDepan &&
                  lampuBelakang &&
                  seinDepan &&
                  seinBelakang &&
                  karetBelakang &&
                  velgCwDepan &&
                  karetDepan &&
                  velgJariJariDepan &&
                  velgJariJariBelakang &&
                  velgCwBelakang;

                if (!isComplete) {
                  setShowValidation(true);
                  return;
                }

                setShowValidation(false);

                router.push(
                  "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-7"
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
              Lanjut ke Bagian 7 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-5"
        />

      </div>

    </main>
  );
}