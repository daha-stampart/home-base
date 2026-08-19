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

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz_t-1PgHH-nAwx7ce55c6uzQzz7JkHt9ybZtqIebz9AYVkULl0pstKrTM9NmOP8YtS/exec";

export default function MotorSection10Page() {

  const [showCards, setShowCards] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [inspector, setInspector] =
    useState("");

  const [inspectionDate, setInspectionDate] =
    useState("");

  const [vendor, setVendor] =
    useState("Belum dipilih");

  const [appraisalId, setAppraisalId] =
    useState("");

  const [catatanTambahan, setCatatanTambahan] =
    useState("");

  const router = useRouter();


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    setShowCards(true);

    const saved =
      loadAppraisal();

    if (saved) {

      setVendor(
        saved.vendor ??
        "Belum dipilih"
      );

      setAppraisalId(
        saved.appraisalId ??
        ""
      );

      setCatatanTambahan(
        saved.catatanTambahan ??
        ""
      );
    }


    // ===================================================
    // INSPECTOR
    // ===================================================

    const user =
      sessionStorage.getItem("user");

    if (user) {

      try {

        const userData =
          JSON.parse(user);

        setInspector(
          userData.nama ??
          ""
        );

      } catch (error) {

        console.error(
          "Gagal membaca data user:",
          error
        );
      }
    }


    // ===================================================
    // TANGGAL INSPEKSI
    // ===================================================

    setInspectionDate(
      new Date().toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    );


    setIsLoaded(true);

  }, []);


  // =====================================================
  // AUTOSAVE CATATAN
  // =====================================================

  useEffect(() => {

    if (!isLoaded) return;

    saveAppraisal({

      ...loadAppraisal(),

      appraisalId,

      catatanTambahan,

    });

  }, [
    isLoaded,
    appraisalId,
    catatanTambahan,
  ]);


  // =====================================================
  // SUBMIT FINAL
  // =====================================================

  async function handleSubmit() {

    if (isSubmitting) {
      return;
    }


    setSubmitError("");


    const currentData =
      loadAppraisal();


    if (!currentData) {

      setSubmitError(
        "DATA APPRAISAL TIDAK DITEMUKAN."
      );

      return;
    }


    // ===================================================
    // SIMPAN CATATAN TERAKHIR
    // ===================================================

    const finalData = {

      ...currentData,

      appraisalId,

      catatanTambahan,

      // DATA HEADER INSPEKSI
      inspector,
      inspectionDate,

    };


    saveAppraisal(
      finalData
    );


    // ===================================================
    // LOCK BUTTON
    // ===================================================

    setIsSubmitting(true);


    try {

      // =================================================
      // KIRIM KE APPS SCRIPT
      // =================================================

      const response =
        await fetch(
          SCRIPT_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body: JSON.stringify({

              action:
                "SUBMIT_APPRAISAL",

              data:
                finalData,

            }),

          }
        );


      // =================================================
      // CEK HTTP
      // =================================================

      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status}`
        );
      }


      // =================================================
      // BACA RESPONSE
      // =================================================

      const result =
        await response.json();


      // =================================================
      // CEK HASIL APPS SCRIPT
      // =================================================

      if (
        !result ||
        result.success !== true
      ) {

        throw new Error(
          result?.message ??
          "SUBMIT GAGAL."
        );
      }


      // =================================================
      // SIMPAN ID DARI SERVER
      // =================================================

      if (
        result.appraisalId
      ) {

        saveAppraisal({

          ...finalData,

          appraisalId:
            result.appraisalId,

          submitted: true,

          submittedAt:
            new Date().toISOString(),

        });

      }


      // =================================================
      // SUCCESS
      // =================================================
      //
      // JANGAN langsung replace ke Dashboard.
      //
      // Browser masih menyimpan history:
      //
      // Pilih Jenis Unit
      //      ↓
      // Pilih Vendor
      //      ↓
      // Page 1 ... Page 10
      //
      // Marker appraisalHistoryStart dibuat saat user
      // memilih jenis kendaraan.
      //
      // Kita mundurkan history hanya sampai titik awal
      // sesi appraisal, lalu entry tersebut kita replace
      // menjadi Dashboard.
      //
      // Dengan begitu Page 1-10 hilang dari history sesi
      // appraisal, tanpa memakai angka manual seperti -9/-10.
      // =================================================

      sessionStorage.setItem(
        "appraisalSubmitted",
        "true"
      );

      const DASHBOARD_URL =
        "/web-partner/otolink-app/digital-app/dashboard";

      const historyStartRaw =
        sessionStorage.getItem(
          "appraisalHistoryStart"
        );

      const historyStart =
        Number(historyStartRaw);

      const historySteps =
        Number.isFinite(historyStart) &&
        historyStart > 0
          ? window.history.length - historyStart
          : 0;

      // =================================================
      // FALLBACK
      // =================================================

      if (
        historySteps <= 0
      ) {

        sessionStorage.removeItem(
          "appraisalActive"
        );

        sessionStorage.removeItem(
          "appraisalHistoryStart"
        );

        sessionStorage.removeItem(
          "appraisalVehicleType"
        );

        window.location.replace(
          DASHBOARD_URL
        );

        return;
      }

      // =================================================
      // HISTORY CLEANUP
      // =================================================

      const finishHistoryCleanup = () => {

        window.removeEventListener(
          "popstate",
          finishHistoryCleanup
        );

        sessionStorage.removeItem(
          "appraisalActive"
        );

        sessionStorage.removeItem(
          "appraisalHistoryStart"
        );

        sessionStorage.removeItem(
          "appraisalVehicleType"
        );

        // Titik awal sesi appraisal sekarang
        // diganti menjadi Dashboard.
        window.location.replace(
          DASHBOARD_URL
        );
      };

      window.addEventListener(
        "popstate",
        finishHistoryCleanup,
        {
          once: true,
        }
      );

      window.history.go(
        -historySteps
      );


    } catch (error) {

      console.error(
        "SUBMIT ERROR:",
        error
      );


      setSubmitError(
        error instanceof Error
          ? error.message.toUpperCase()
          : "SUBMIT GAGAL. SILAKAN COBA LAGI."
      );


      setIsSubmitting(false);

    }

  }


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
      "
    >

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

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/30
        "
      />


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-md
          px-5
          py-6
          pb-28
        "
      >

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

              <div
                className="
                  mx-auto
                  grid
                  w-fit
                  grid-cols-[100px_15px_220px]
                  gap-y-1
                "
              >

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
              Bagian 10 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              100%
            </span>

          </div>


          <div
            className="
              mt-3
              h-2
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >

            <div
              className="
                h-full
                w-full
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
            Catatan Inspektor
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

          <p className="text-2xl font-semibold text-blue-300">
            KETERANGAN TAMBAHAN
          </p>


          <div className="mt-3 h-px bg-white/15" />


          <div className="mt-6">

            <textarea
              value={catatanTambahan}

              onChange={(e) =>
                setCatatanTambahan(
                  e.target.value.toUpperCase()
                )
              }

              placeholder="TAMBAHKAN CATATAN KHUSUS"

              className="
                min-h-[300px]
                w-full
                resize-y
                rounded-xl
                border
                border-white/20
                bg-white/10
                px-4
                py-4
                text-white
                placeholder:text-white/40
                outline-none
                transition
                focus:border-red-500
                focus:ring-1
                focus:ring-red-500/50
              "
            />

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {submitError && (

            <div
              className="
                mt-4
                rounded-xl
                border
                border-red-500/40
                bg-red-500/10
                px-4
                py-3
                text-center
                text-sm
                font-semibold
                text-red-300
              "
            >
              {submitError}
            </div>

          )}


          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="mt-8">

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}

              className={`
                w-full
                rounded-xl
                py-3
                text-lg
                font-semibold
                text-white
                transition-all
                duration-200
                ${
                  isSubmitting
                    ? "cursor-not-allowed bg-red-900/70"
                    : "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
                }
              `}
            >

              {isSubmitting
                ? "SUBMITTING..."
                : "SUBMIT"}

            </button>

          </div>

        </GlassCard>


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-9"
        />

      </div>

    </main>

  );

}