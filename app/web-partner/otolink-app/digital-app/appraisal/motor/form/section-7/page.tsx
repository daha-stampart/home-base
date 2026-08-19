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

export default function MotorSection7Page() {
  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // AKSESORIS
  // =====================================================

  const [kacaSpion, setKacaSpion] = useState("");
  const [kacaSpionCatatan, setKacaSpionCatatan] = useState("");

  const [listGrafis, setListGrafis] = useState("");
  const [listGrafisCatatan, setListGrafisCatatan] = useState("");

  const [toolKit, setToolKit] = useState("");
  const [toolKitCatatan, setToolKitCatatan] = useState("");

  const [tutupRantaiVBelt, setTutupRantaiVBelt] = useState("");
  const [tutupRantaiVBeltCatatan, setTutupRantaiVBeltCatatan] =
    useState("");

  const [panelInstrumentKanan, setPanelInstrumentKanan] =
    useState("");
  const [
    panelInstrumentKananCatatan,
    setPanelInstrumentKananCatatan,
  ] = useState("");

  const [panelInstrumentKiri, setPanelInstrumentKiri] =
    useState("");
  const [
    panelInstrumentKiriCatatan,
    setPanelInstrumentKiriCatatan,
  ] = useState("");

  const [klakson, setKlakson] = useState("");
  const [klaksonCatatan, setKlaksonCatatan] = useState("");

  const [jok, setJok] = useState("");
  const [jokCatatan, setJokCatatan] = useState("");

  const [speedometer, setSpeedometer] = useState("");
  const [speedometerCatatan, setSpeedometerCatatan] = useState("");

  const [behelBelakang, setBehelBelakang] = useState("");
  const [behelBelakangCatatan, setBehelBelakangCatatan] =
    useState("");

  const [fuelTank, setFuelTank] = useState("");
  const [fuelTankCatatan, setFuelTankCatatan] = useState("");

  const [footStepDepan, setFootStepDepan] = useState("");
  const [footStepDepanCatatan, setFootStepDepanCatatan] =
    useState("");

  const [footStepBelakang, setFootStepBelakang] = useState("");
  const [footStepBelakangCatatan, setFootStepBelakangCatatan] =
    useState("");

  const [kickStater, setKickStater] = useState("");
  const [kickStaterCatatan, setKickStaterCatatan] = useState("");

  const [pedalGigi, setPedalGigi] = useState("");
  const [pedalGigiCatatan, setPedalGigiCatatan] = useState("");

  const [pedalRem, setPedalRem] = useState("");
  const [pedalRemCatatan, setPedalRemCatatan] = useState("");

  const [segitigaAtas, setSegitigaAtas] = useState("");
  const [segitigaAtasCatatan, setSegitigaAtasCatatan] = useState("");

  const [segitigaBawah, setSegitigaBawah] = useState("");
  const [segitigaBawahCatatan, setSegitigaBawahCatatan] =
    useState("");

  const [toolBox, setToolBox] = useState("");
  const [toolBoxCatatan, setToolBoxCatatan] = useState("");

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

      setKacaSpion(saved.kacaSpion ?? "");
      setKacaSpionCatatan(saved.kacaSpionCatatan ?? "");

      setListGrafis(saved.listGrafis ?? "");
      setListGrafisCatatan(saved.listGrafisCatatan ?? "");

      setToolKit(saved.toolKit ?? "");
      setToolKitCatatan(saved.toolKitCatatan ?? "");

      setTutupRantaiVBelt(saved.tutupRantaiVBelt ?? "");
      setTutupRantaiVBeltCatatan(
        saved.tutupRantaiVBeltCatatan ?? ""
      );

      setPanelInstrumentKanan(
        saved.panelInstrumentKanan ?? ""
      );
      setPanelInstrumentKananCatatan(
        saved.panelInstrumentKananCatatan ?? ""
      );

      setPanelInstrumentKiri(
        saved.panelInstrumentKiri ?? ""
      );
      setPanelInstrumentKiriCatatan(
        saved.panelInstrumentKiriCatatan ?? ""
      );

      setKlakson(saved.klakson ?? "");
      setKlaksonCatatan(saved.klaksonCatatan ?? "");

      setJok(saved.jok ?? "");
      setJokCatatan(saved.jokCatatan ?? "");

      setSpeedometer(saved.speedometer ?? "");
      setSpeedometerCatatan(
        saved.speedometerCatatan ?? ""
      );

      setBehelBelakang(saved.behelBelakang ?? "");
      setBehelBelakangCatatan(
        saved.behelBelakangCatatan ?? ""
      );

      setFuelTank(saved.fuelTank ?? "");
      setFuelTankCatatan(saved.fuelTankCatatan ?? "");

      setFootStepDepan(saved.footStepDepan ?? "");
      setFootStepDepanCatatan(
        saved.footStepDepanCatatan ?? ""
      );

      setFootStepBelakang(saved.footStepBelakang ?? "");
      setFootStepBelakangCatatan(
        saved.footStepBelakangCatatan ?? ""
      );

      setKickStater(saved.kickStater ?? "");
      setKickStaterCatatan(
        saved.kickStaterCatatan ?? ""
      );

      setPedalGigi(saved.pedalGigi ?? "");
      setPedalGigiCatatan(saved.pedalGigiCatatan ?? "");

      setPedalRem(saved.pedalRem ?? "");
      setPedalRemCatatan(saved.pedalRemCatatan ?? "");

      setSegitigaAtas(saved.segitigaAtas ?? "");
      setSegitigaAtasCatatan(
        saved.segitigaAtasCatatan ?? ""
      );

      setSegitigaBawah(saved.segitigaBawah ?? "");
      setSegitigaBawahCatatan(
        saved.segitigaBawahCatatan ?? ""
      );

      setToolBox(saved.toolBox ?? "");
      setToolBoxCatatan(saved.toolBoxCatatan ?? "");
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

      kacaSpion,
      kacaSpionCatatan,

      listGrafis,
      listGrafisCatatan,

      toolKit,
      toolKitCatatan,

      tutupRantaiVBelt,
      tutupRantaiVBeltCatatan,

      panelInstrumentKanan,
      panelInstrumentKananCatatan,

      panelInstrumentKiri,
      panelInstrumentKiriCatatan,

      klakson,
      klaksonCatatan,

      jok,
      jokCatatan,

      speedometer,
      speedometerCatatan,

      behelBelakang,
      behelBelakangCatatan,

      fuelTank,
      fuelTankCatatan,

      footStepDepan,
      footStepDepanCatatan,

      footStepBelakang,
      footStepBelakangCatatan,

      kickStater,
      kickStaterCatatan,

      pedalGigi,
      pedalGigiCatatan,

      pedalRem,
      pedalRemCatatan,

      segitigaAtas,
      segitigaAtasCatatan,

      segitigaBawah,
      segitigaBawahCatatan,

      toolBox,
      toolBoxCatatan,
    });
  }, [
    isLoaded,
    appraisalId,

    kacaSpion,
    kacaSpionCatatan,

    listGrafis,
    listGrafisCatatan,

    toolKit,
    toolKitCatatan,

    tutupRantaiVBelt,
    tutupRantaiVBeltCatatan,

    panelInstrumentKanan,
    panelInstrumentKananCatatan,

    panelInstrumentKiri,
    panelInstrumentKiriCatatan,

    klakson,
    klaksonCatatan,

    jok,
    jokCatatan,

    speedometer,
    speedometerCatatan,

    behelBelakang,
    behelBelakangCatatan,

    fuelTank,
    fuelTankCatatan,

    footStepDepan,
    footStepDepanCatatan,

    footStepBelakang,
    footStepBelakangCatatan,

    kickStater,
    kickStaterCatatan,

    pedalGigi,
    pedalGigiCatatan,

    pedalRem,
    pedalRemCatatan,

    segitigaAtas,
    segitigaAtasCatatan,

    segitigaBawah,
    segitigaBawahCatatan,

    toolBox,
    toolBoxCatatan,
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
  // RENDER ITEM
  // =====================================================

  const renderItem = (
    number: number,
    question: string,
    value: string,
    setValue: (value: string) => void,
    catatan: string,
    setCatatan: (value: string) => void,
    keterangan?: string
  ) => {
    const fieldName = `aksesori-${number}`;

    return (
      <div className="mt-6 space-y-3 text-center">

        <label className="block text-lg font-bold text-white">
          {question}
        </label>

        {keterangan && (
          <p className="italic text-white/70">
            {keterangan}
          </p>
        )}

        <div className="flex justify-center gap-10 pt-1">

          {["BAIK", "CUKUP", "RUSAK"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-white"
            >
              <input
                type="radio"
                name={fieldName}
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

        {showValidation && !value && (
          <p className="text-left text-sm font-medium text-red-400">
            ⚠ {question} BELUM DIPILIH
          </p>
        )}

        <textarea
          value={catatan}
          onChange={(e) =>
            setCatatan(e.target.value)
          }
          placeholder="tambahkan catatan khusus"
          className={textareaClass}
        />

      </div>
    );
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const isComplete =
    kacaSpion &&
    listGrafis &&
    toolKit &&
    tutupRantaiVBelt &&
    panelInstrumentKanan &&
    panelInstrumentKiri &&
    klakson &&
    jok &&
    speedometer &&
    behelBelakang &&
    fuelTank &&
    footStepDepan &&
    footStepBelakang &&
    kickStater &&
    pedalGigi &&
    pedalRem &&
    segitigaAtas &&
    segitigaBawah &&
    toolBox;

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
              Bagian 7 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              70%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[70%]
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
            AKSESORIS
          </p>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              KACA SPION
          ================================================= */}

          {renderItem(
            1,
            "KACA SPION",
            kacaSpion,
            setKacaSpion,
            kacaSpionCatatan,
            setKacaSpionCatatan,
            "Satu Pasang"
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              LIST GRAFIS
          ================================================= */}

          {renderItem(
            2,
            "LIST GRAFIS",
            listGrafis,
            setListGrafis,
            listGrafisCatatan,
            setListGrafisCatatan,
            "Satu Set"
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              TOOL KIT
          ================================================= */}

          {renderItem(
            3,
            "TOOL KIT",
            toolKit,
            setToolKit,
            toolKitCatatan,
            setToolKitCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              TUTUP RANTAI / V-BELT
          ================================================= */}

          {renderItem(
            4,
            "TUTUP RANTAI / V-BELT",
            tutupRantaiVBelt,
            setTutupRantaiVBelt,
            tutupRantaiVBeltCatatan,
            setTutupRantaiVBeltCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PANEL INSTRUMENT KANAN
          ================================================= */}

          {renderItem(
            5,
            "PANEL INSTRUMENT KANAN",
            panelInstrumentKanan,
            setPanelInstrumentKanan,
            panelInstrumentKananCatatan,
            setPanelInstrumentKananCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PANEL INSTRUMENT KIRI
          ================================================= */}

          {renderItem(
            6,
            "PANEL INSTRUMENT KIRI",
            panelInstrumentKiri,
            setPanelInstrumentKiri,
            panelInstrumentKiriCatatan,
            setPanelInstrumentKiriCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              KLAKSON
          ================================================= */}

          {renderItem(
            7,
            "KLAKSON",
            klakson,
            setKlakson,
            klaksonCatatan,
            setKlaksonCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              JOK
          ================================================= */}

          {renderItem(
            8,
            "JOK",
            jok,
            setJok,
            jokCatatan,
            setJokCatatan,
            "Tempat Duduk"
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              SPEEDOMETER
          ================================================= */}

          {renderItem(
            9,
            "SPEEDOMETER",
            speedometer,
            setSpeedometer,
            speedometerCatatan,
            setSpeedometerCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              BEHEL BELAKANG
          ================================================= */}

          {renderItem(
            10,
            "BEHEL BELAKANG",
            behelBelakang,
            setBehelBelakang,
            behelBelakangCatatan,
            setBehelBelakangCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              FUEL TANK
          ================================================= */}

          {renderItem(
            11,
            "FUEL TANK",
            fuelTank,
            setFuelTank,
            fuelTankCatatan,
            setFuelTankCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              FOOT STEP DEPAN
          ================================================= */}

          {renderItem(
            12,
            "FOOT STEP DEPAN",
            footStepDepan,
            setFootStepDepan,
            footStepDepanCatatan,
            setFootStepDepanCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              FOOT STEP BELAKANG
          ================================================= */}

          {renderItem(
            13,
            "FOOT STEP BELAKANG",
            footStepBelakang,
            setFootStepBelakang,
            footStepBelakangCatatan,
            setFootStepBelakangCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              KICK STATER
          ================================================= */}

          {renderItem(
            14,
            "KICK STATER",
            kickStater,
            setKickStater,
            kickStaterCatatan,
            setKickStaterCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PEDAL GIGI
          ================================================= */}

          {renderItem(
            15,
            "PEDAL GIGI",
            pedalGigi,
            setPedalGigi,
            pedalGigiCatatan,
            setPedalGigiCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              PEDAL REM
          ================================================= */}

          {renderItem(
            16,
            "PEDAL REM",
            pedalRem,
            setPedalRem,
            pedalRemCatatan,
            setPedalRemCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              SEGITIGA ATAS
          ================================================= */}

          {renderItem(
            17,
            "SEGITIGA ATAS",
            segitigaAtas,
            setSegitigaAtas,
            segitigaAtasCatatan,
            setSegitigaAtasCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              SEGITIGA BAWAH
          ================================================= */}

          {renderItem(
            18,
            "SEGITIGA BAWAH",
            segitigaBawah,
            setSegitigaBawah,
            segitigaBawahCatatan,
            setSegitigaBawahCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              TOOL BOX
          ================================================= */}

          {renderItem(
            19,
            "TOOL BOX",
            toolBox,
            setToolBox,
            toolBoxCatatan,
            setToolBoxCatatan
          )}

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
                  "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-8"
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
              Lanjut ke Bagian 8 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-6"
        />

      </div>

    </main>
  );
}