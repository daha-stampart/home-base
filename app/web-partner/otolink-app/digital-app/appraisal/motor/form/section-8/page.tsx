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

export default function MotorSection8Page() {
  const [showCards, setShowCards] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // MESIN DAN KELISTRIKAN
  // =====================================================

  const [accu, setAccu] = useState("");
  const [accuCatatan, setAccuCatatan] = useState("");

  const [cdi, setCdi] = useState("");
  const [cdiCatatan, setCdiCatatan] = useState("");

  const [kiprok, setKiprok] = useState("");
  const [kiprokCatatan, setKiprokCatatan] = useState("");

  const [mainSwitchSteeringLock, setMainSwitchSteeringLock] =
    useState("");
  const [
    mainSwitchSteeringLockCatatan,
    setMainSwitchSteeringLockCatatan,
  ] = useState("");

  const [ignitionCoil, setIgnitionCoil] = useState("");
  const [ignitionCoilCatatan, setIgnitionCoilCatatan] =
    useState("");

  const [dinamoStater, setDinamoStater] = useState("");
  const [dinamoStaterCatatan, setDinamoStaterCatatan] =
    useState("");

  const [rotorMagnet, setRotorMagnet] = useState("");
  const [rotorMagnetCatatan, setRotorMagnetCatatan] =
    useState("");

  const [statorKumparan, setStatorKumparan] = useState("");
  const [statorKumparanCatatan, setStatorKumparanCatatan] =
    useState("");

  const [gearRantaiVBelt, setGearRantaiVBelt] = useState("");
  const [gearRantaiVBeltCatatan, setGearRantaiVBeltCatatan] =
    useState("");

  const [crankcaseAssy, setCrankcaseAssy] = useState("");
  const [crankcaseAssyCatatan, setCrankcaseAssyCatatan] =
    useState("");

  const [headCylinder, setHeadCylinder] = useState("");
  const [headCylinderCatatan, setHeadCylinderCatatan] =
    useState("");

  const [cylinder, setCylinder] = useState("");
  const [cylinderCatatan, setCylinderCatatan] = useState("");

  const [carburatorAssy, setCarburatorAssy] = useState("");
  const [carburatorAssyCatatan, setCarburatorAssyCatatan] =
    useState("");

  const [oilPumpAssy, setOilPumpAssy] = useState("");
  const [oilPumpAssyCatatan, setOilPumpAssyCatatan] =
    useState("");

  const [coverCrankcase1, setCoverCrankcase1] = useState("");
  const [coverCrankcase1Catatan, setCoverCrankcase1Catatan] =
    useState("");

  const [coverCrankcase2, setCoverCrankcase2] = useState("");
  const [coverCrankcase2Catatan, setCoverCrankcase2Catatan] =
    useState("");

  const [rantaiKamrat, setRantaiKamrat] = useState("");
  const [rantaiKamratCatatan, setRantaiKamratCatatan] =
    useState("");

  const [crankshaftAssy, setCrankshaftAssy] = useState("");
  const [crankshaftAssyCatatan, setCrankshaftAssyCatatan] =
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

      setAccu(saved.accu ?? "");
      setAccuCatatan(saved.accuCatatan ?? "");

      setCdi(saved.cdi ?? "");
      setCdiCatatan(saved.cdiCatatan ?? "");

      setKiprok(saved.kiprok ?? "");
      setKiprokCatatan(saved.kiprokCatatan ?? "");

      setMainSwitchSteeringLock(
        saved.mainSwitchSteeringLock ?? ""
      );
      setMainSwitchSteeringLockCatatan(
        saved.mainSwitchSteeringLockCatatan ?? ""
      );

      setIgnitionCoil(saved.ignitionCoil ?? "");
      setIgnitionCoilCatatan(
        saved.ignitionCoilCatatan ?? ""
      );

      setDinamoStater(saved.dinamoStater ?? "");
      setDinamoStaterCatatan(
        saved.dinamoStaterCatatan ?? ""
      );

      setRotorMagnet(saved.rotorMagnet ?? "");
      setRotorMagnetCatatan(
        saved.rotorMagnetCatatan ?? ""
      );

      setStatorKumparan(saved.statorKumparan ?? "");
      setStatorKumparanCatatan(
        saved.statorKumparanCatatan ?? ""
      );

      setGearRantaiVBelt(saved.gearRantaiVBelt ?? "");
      setGearRantaiVBeltCatatan(
        saved.gearRantaiVBeltCatatan ?? ""
      );

      setCrankcaseAssy(saved.crankcaseAssy ?? "");
      setCrankcaseAssyCatatan(
        saved.crankcaseAssyCatatan ?? ""
      );

      setHeadCylinder(saved.headCylinder ?? "");
      setHeadCylinderCatatan(
        saved.headCylinderCatatan ?? ""
      );

      setCylinder(saved.cylinder ?? "");
      setCylinderCatatan(saved.cylinderCatatan ?? "");

      setCarburatorAssy(saved.carburatorAssy ?? "");
      setCarburatorAssyCatatan(
        saved.carburatorAssyCatatan ?? ""
      );

      setOilPumpAssy(saved.oilPumpAssy ?? "");
      setOilPumpAssyCatatan(
        saved.oilPumpAssyCatatan ?? ""
      );

      setCoverCrankcase1(saved.coverCrankcase1 ?? "");
      setCoverCrankcase1Catatan(
        saved.coverCrankcase1Catatan ?? ""
      );

      setCoverCrankcase2(saved.coverCrankcase2 ?? "");
      setCoverCrankcase2Catatan(
        saved.coverCrankcase2Catatan ?? ""
      );

      setRantaiKamrat(saved.rantaiKamrat ?? "");
      setRantaiKamratCatatan(
        saved.rantaiKamratCatatan ?? ""
      );

      setCrankshaftAssy(saved.crankshaftAssy ?? "");
      setCrankshaftAssyCatatan(
        saved.crankshaftAssyCatatan ?? ""
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

      accu,
      accuCatatan,

      cdi,
      cdiCatatan,

      kiprok,
      kiprokCatatan,

      mainSwitchSteeringLock,
      mainSwitchSteeringLockCatatan,

      ignitionCoil,
      ignitionCoilCatatan,

      dinamoStater,
      dinamoStaterCatatan,

      rotorMagnet,
      rotorMagnetCatatan,

      statorKumparan,
      statorKumparanCatatan,

      gearRantaiVBelt,
      gearRantaiVBeltCatatan,

      crankcaseAssy,
      crankcaseAssyCatatan,

      headCylinder,
      headCylinderCatatan,

      cylinder,
      cylinderCatatan,

      carburatorAssy,
      carburatorAssyCatatan,

      oilPumpAssy,
      oilPumpAssyCatatan,

      coverCrankcase1,
      coverCrankcase1Catatan,

      coverCrankcase2,
      coverCrankcase2Catatan,

      rantaiKamrat,
      rantaiKamratCatatan,

      crankshaftAssy,
      crankshaftAssyCatatan,
    });
  }, [
    isLoaded,
    appraisalId,

    accu,
    accuCatatan,

    cdi,
    cdiCatatan,

    kiprok,
    kiprokCatatan,

    mainSwitchSteeringLock,
    mainSwitchSteeringLockCatatan,

    ignitionCoil,
    ignitionCoilCatatan,

    dinamoStater,
    dinamoStaterCatatan,

    rotorMagnet,
    rotorMagnetCatatan,

    statorKumparan,
    statorKumparanCatatan,

    gearRantaiVBelt,
    gearRantaiVBeltCatatan,

    crankcaseAssy,
    crankcaseAssyCatatan,

    headCylinder,
    headCylinderCatatan,

    cylinder,
    cylinderCatatan,

    carburatorAssy,
    carburatorAssyCatatan,

    oilPumpAssy,
    oilPumpAssyCatatan,

    coverCrankcase1,
    coverCrankcase1Catatan,

    coverCrankcase2,
    coverCrankcase2Catatan,

    rantaiKamrat,
    rantaiKamratCatatan,

    crankshaftAssy,
    crankshaftAssyCatatan,
  ]);

  // =====================================================
  // TEXTAREA
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
    const fieldName = `mesin-kelistrikan-${number}`;

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

        <div className="flex justify-center gap-12 pt-1">

          {["BAIK", "RUSAK"].map((option) => (
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
    accu &&
    cdi &&
    kiprok &&
    mainSwitchSteeringLock &&
    ignitionCoil &&
    dinamoStater &&
    rotorMagnet &&
    statorKumparan &&
    gearRantaiVBelt &&
    crankcaseAssy &&
    headCylinder &&
    cylinder &&
    carburatorAssy &&
    oilPumpAssy &&
    coverCrankcase1 &&
    coverCrankcase2 &&
    rantaiKamrat &&
    crankshaftAssy;

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
              Bagian 8 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              80%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[80%]
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
            Mesin
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
            MESIN DAN KELISTRIKAN
          </p>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              ACCU
          ================================================= */}

          {renderItem(
            1,
            "ACCU",
            accu,
            setAccu,
            accuCatatan,
            setAccuCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              CDI
          ================================================= */}

          {renderItem(
            2,
            "CDI",
            cdi,
            setCdi,
            cdiCatatan,
            setCdiCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              KIPROK
          ================================================= */}

          {renderItem(
            3,
            "KIPROK",
            kiprok,
            setKiprok,
            kiprokCatatan,
            setKiprokCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              MAIN SWITCH STEERING LOCK
          ================================================= */}

          {renderItem(
            4,
            "MAIN SWITCH STEERING LOCK",
            mainSwitchSteeringLock,
            setMainSwitchSteeringLock,
            mainSwitchSteeringLockCatatan,
            setMainSwitchSteeringLockCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              IGNITION COIL
          ================================================= */}

          {renderItem(
            5,
            "IGNITION COIL",
            ignitionCoil,
            setIgnitionCoil,
            ignitionCoilCatatan,
            setIgnitionCoilCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              DINAMO STATER
          ================================================= */}

          {renderItem(
            6,
            "DINAMO STATER",
            dinamoStater,
            setDinamoStater,
            dinamoStaterCatatan,
            setDinamoStaterCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              ROTOR / MAGNET
          ================================================= */}

          {renderItem(
            7,
            "ROTOR / MAGNET",
            rotorMagnet,
            setRotorMagnet,
            rotorMagnetCatatan,
            setRotorMagnetCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              STATOR / KUMPARAN
          ================================================= */}

          {renderItem(
            8,
            "STATOR / KUMPARAN",
            statorKumparan,
            setStatorKumparan,
            statorKumparanCatatan,
            setStatorKumparanCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              GEAR DAN RANTAI / V-BELT
          ================================================= */}

          {renderItem(
            9,
            "GEAR DAN RANTAI / V-BELT",
            gearRantaiVBelt,
            setGearRantaiVBelt,
            gearRantaiVBeltCatatan,
            setGearRantaiVBeltCatatan,
            "Satu Set"
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              CRANKCASE ASSY
          ================================================= */}

          {renderItem(
            10,
            "CRANKCASE ASSY",
            crankcaseAssy,
            setCrankcaseAssy,
            crankcaseAssyCatatan,
            setCrankcaseAssyCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              HEAD CYLINDER
          ================================================= */}

          {renderItem(
            11,
            "HEAD CYLINDER",
            headCylinder,
            setHeadCylinder,
            headCylinderCatatan,
            setHeadCylinderCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              CYLINDER
          ================================================= */}

          {renderItem(
            12,
            "CYLINDER",
            cylinder,
            setCylinder,
            cylinderCatatan,
            setCylinderCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              CARBURATOR ASSY
          ================================================= */}

          {renderItem(
            13,
            "CARBURATOR ASSY",
            carburatorAssy,
            setCarburatorAssy,
            carburatorAssyCatatan,
            setCarburatorAssyCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              OIL PUMP ASSY
          ================================================= */}

          {renderItem(
            14,
            "OIL PUMP ASSY",
            oilPumpAssy,
            setOilPumpAssy,
            oilPumpAssyCatatan,
            setOilPumpAssyCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              COVER CRANKCASE 1
          ================================================= */}

          {renderItem(
            15,
            "COVER CRANKCASE 1",
            coverCrankcase1,
            setCoverCrankcase1,
            coverCrankcase1Catatan,
            setCoverCrankcase1Catatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              COVER CRANKCASE 2
          ================================================= */}

          {renderItem(
            16,
            "COVER CRANKCASE 2",
            coverCrankcase2,
            setCoverCrankcase2,
            coverCrankcase2Catatan,
            setCoverCrankcase2Catatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              RANTAI KAMRAT
          ================================================= */}

          {renderItem(
            17,
            "RANTAI KAMRAT",
            rantaiKamrat,
            setRantaiKamrat,
            rantaiKamratCatatan,
            setRantaiKamratCatatan
          )}

          <div className="mt-5 h-px bg-white/15" />

          {/* =================================================
              CRANKSHAFT ASSY
          ================================================= */}

          {renderItem(
            18,
            "CRANKSHAFT ASSY",
            crankshaftAssy,
            setCrankshaftAssy,
            crankshaftAssyCatatan,
            setCrankshaftAssyCatatan
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
                  "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-9"
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
              Lanjut ke Bagian 9 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form/section-7"
        />

      </div>

    </main>
  );
}