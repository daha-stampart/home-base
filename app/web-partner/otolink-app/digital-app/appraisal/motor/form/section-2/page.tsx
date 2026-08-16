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

export default function MotorSection2Page() {
  const [showCards, setShowCards] = useState(false);

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");

  const router = useRouter();

  const [plateNumber, setPlateNumber] = useState("");
  const [fakePlate, setFakePlate] = useState("");
  const [fakePlateNumber, setFakePlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [physicalColor, setPhysicalColor] = useState("");
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [odometer, setOdometer] = useState("");
  const [vendorBranch, setVendorBranch] = useState("");

  const [showValidation, setShowValidation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appraisalId, setAppraisalId] = useState("");

  // =====================================================
  // VALIDASI
  // =====================================================

  const isFormComplete =
    plateNumber.trim() !== "" &&
    fakePlate !== "" &&
    (fakePlate === "Tidak" || fakePlateNumber.trim() !== "") &&
    vehicleType.trim() !== "" &&
    physicalColor.trim() !== "" &&
    year.trim() !== "" &&
    transmission !== "" &&
    engineNumber.trim() !== "" &&
    chassisNumber.trim() !== "" &&
    odometer.trim() !== "" &&
    vendorBranch.trim() !== "" &&
    inspector.trim() !== "" &&
    inspectionDate.trim() !== "";

  // =====================================================
  // INITIAL LOAD DATA
  // =====================================================

  useEffect(() => {
    const saved = loadAppraisal();

    if (saved) {
      setPlateNumber(saved.plateNumber ?? "");
      setFakePlate(saved.fakePlate ?? "");
      setFakePlateNumber(saved.fakePlateNumber ?? "");
      setVehicleType(saved.vehicleType ?? "");
      setPhysicalColor(saved.physicalColor ?? "");
      setYear(saved.year ?? "");
      setTransmission(saved.transmission ?? "");
      setEngineNumber(saved.engineNumber ?? "");
      setChassisNumber(saved.chassisNumber ?? "");
      setOdometer(saved.odometer ?? "");
      setVendorBranch(saved.vendorBranch ?? "");
    }

    setIsLoaded(true);
  }, []);

  // =====================================================
  // AUTOSAVE
  // =====================================================

  useEffect(() => {
    if (!isLoaded) return;

    saveAppraisal({
      ...loadAppraisal(),

      plateNumber,
      fakePlate,
      fakePlateNumber,
      vehicleType,
      physicalColor,
      year,
      transmission,
      engineNumber,
      chassisNumber,
      odometer,
      vendorBranch,
    });
  }, [
    isLoaded,
    plateNumber,
    fakePlate,
    fakePlateNumber,
    vehicleType,
    physicalColor,
    year,
    transmission,
    engineNumber,
    chassisNumber,
    odometer,
    vendorBranch,
  ]);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    setShowCards(true);

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
    // VENDOR
    // ===================================================

    const saved = loadAppraisal();

    if (saved) {
      setVendor(saved.vendor ?? "Belum dipilih");
    }
  }, []);

  // =====================================================
  // CLASS INPUT
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

      {/* =================================================
          OVERLAY
      ================================================= */}

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

                {/* Inspector */}

                <span className="text-white/60">
                  Inspector
                </span>

                <span className="text-center text-white/60">
                  :
                </span>

                <span className="font-medium text-white">
                  {inspector}
                </span>

                {/* Tanggal */}

                <span className="text-white/60">
                  Tgl Inspeksi
                </span>

                <span className="text-center text-white/60">
                  :
                </span>

                <span className="font-medium text-white">
                  {inspectionDate}
                </span>

                {/* Vendor */}

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
              Bagian 2 dari 10
            </p>

            <span className="text-sm font-semibold text-red-400">
              20%
            </span>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="
                h-full
                w-[20%]
                rounded-full
                bg-gradient-to-r
                from-red-500
                to-red-400
                transition-all
                duration-700
              "
            />

          </div>

          <h2 className="mt-1 text-lg font-bold text-blue-300">
            Identitas Kendaraan
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

          <h2 className="text-lg font-semibold text-white">
            Data Unit
          </h2>

          <div className="mt-3 h-px bg-white/15" />

          {/* =================================================
              NOMOR POLISI
          ================================================= */}

          <div className="mt-3 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Nomor Polisi
            </label>
            
            <p className="text-left text-xs text-white/50">
              Tambahkan "SPASI" antara huruf dan angka
            </p>

            <input
              type="text"
              value={plateNumber}
              onChange={(e) =>
                setPlateNumber(e.target.value.toUpperCase())
              }
              placeholder="Contoh: B 1234 ABC"
              className={getInputClass(
                showValidation && !plateNumber.trim()
              )}
            />

            {showValidation && !plateNumber.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Nomor Polisi belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              NOPOL PALSU
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Nopol Palsu
            </label>

            <div className="flex justify-center gap-16 pt-2">

              <label className="flex items-center gap-2 text-white">

                <input
                  type="radio"
                  name="fakePlate"
                  value="Ya"
                  checked={fakePlate === "Ya"}
                  onChange={(e) => {
                    setFakePlate(e.target.value);
                  }}
                  className="h-4 w-4 accent-red-500"
                />

                Ya

              </label>

              <label className="flex items-center gap-2 text-white">

                <input
                  type="radio"
                  name="fakePlate"
                  value="Tidak"
                  checked={fakePlate === "Tidak"}
                  onChange={(e) => {
                    setFakePlate(e.target.value);
                    setFakePlateNumber("");
                  }}
                  className="h-4 w-4 accent-red-500"
                />

                Tidak

              </label>

            </div>

            {showValidation && !fakePlate && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Nopol Palsu belum dipilih
              </p>
            )}

          </div>

          {/* =================================================
              NOMOR POLISI PALSU
          ================================================= */}

          {fakePlate === "Ya" && (
            <div className="mt-3 space-y-2 text-center">

              <label className="text-lg font-bold text-white">
                Nomor Polisi Palsu
              </label>

              <p className="text-left text-xs text-white/50">
                Tambahkan "SPASI" antara huruf dan angka
              </p>

              <input
                type="text"
                value={fakePlateNumber}
                onChange={(e) =>
                  setFakePlateNumber(
                    e.target.value.toUpperCase()
                  )
                }
                placeholder="Isi nomor polisi palsu yag terpasang"
                className={getInputClass(
                  showValidation &&
                  fakePlate === "Ya" &&
                  !fakePlateNumber.trim()
                )}
              />

              {showValidation &&
                fakePlate === "Ya" &&
                !fakePlateNumber.trim() && (
                  <p className="text-left text-sm font-medium text-red-400">
                    ⚠ Nomor Polisi Palsu belum diisi
                  </p>
                )}

            </div>
          )}

          {/* =================================================
              MERK TYPE
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Merk Type
            </label>

            <input
              type="text"
              value={vehicleType}
              onChange={(e) =>
                setVehicleType(
                  e.target.value
                    .toLowerCase()
                    .replace(
                      /\b\w/g,
                      (char) => char.toUpperCase()
                    )
                )
              }
              placeholder="Contoh: Honda Vario 160"
              className={getInputClass(
                showValidation && !vehicleType.trim()
              )}
            />

            {showValidation && !vehicleType.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Merk Type belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              WARNA FISIK
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Warna Fisik
            </label>

            <input
              type="text"
              value={physicalColor}
              onChange={(e) =>
                setPhysicalColor(
                  e.target.value
                    .toLowerCase()
                    .replace(
                      /\b\w/g,
                      (char) => char.toUpperCase()
                    )
                )
              }
              placeholder="Contoh: Hitam Biru"
              className={getInputClass(
                showValidation && !physicalColor.trim()
              )}
            />

            {showValidation && !physicalColor.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Warna Fisik belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              TAHUN
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Tahun
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={year}
              onChange={(e) =>
                setYear(
                  e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 4)
                )
              }
              placeholder="Contoh: 2025"
              className={getInputClass(
                showValidation && !year.trim()
              )}
            />

            {showValidation && !year.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Tahun belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              TRANSMISI
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Transmisi
            </label>

            <div className="flex justify-center gap-16 pt-2">

              <label className="flex items-center gap-2 text-white">

                <input
                  type="radio"
                  name="transmission"
                  value="Manual"
                  checked={transmission === "Manual"}
                  onChange={(e) =>
                    setTransmission(e.target.value)
                  }
                  className="h-4 w-4 accent-red-500"
                />

                Manual

              </label>

              <label className="flex items-center gap-2 text-white">

                <input
                  type="radio"
                  name="transmission"
                  value="Matic"
                  checked={transmission === "Matic"}
                  onChange={(e) =>
                    setTransmission(e.target.value)
                  }
                  className="h-4 w-4 accent-red-500"
                />

                Matic

              </label>

            </div>

            {showValidation && !transmission && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Transmisi belum dipilih
              </p>
            )}

          </div>

          {/* =================================================
              NOMOR RANGKA
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Nomor Rangka
            </label>

            <input
              type="text"
              value={chassisNumber}
              onChange={(e) =>
                setChassisNumber(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="Contoh: MH1JFZ12345678901"
              className={getInputClass(
                showValidation && !chassisNumber.trim()
              )}
            />

            {showValidation && !chassisNumber.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Nomor Rangka belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              NOMOR MESIN
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Nomor Mesin
            </label>

            <input
              type="text"
              value={engineNumber}
              onChange={(e) =>
                setEngineNumber(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="Contoh: K15B123456"
              className={getInputClass(
                showValidation && !engineNumber.trim()
              )}
            />

            {showValidation && !engineNumber.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Nomor Mesin belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              ODDOMETER
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Oddometer
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={odometer}
              onChange={(e) =>
                setOdometer(
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
              placeholder="Contoh: 45000"
              className={getInputClass(
                showValidation && !odometer.trim()
              )}
            />

            {showValidation && !odometer.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Oddometer belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              CABANG VENDOR
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Cabang Vendor
            </label>

            <input
              type="text"
              value={vendorBranch}
              onChange={(e) =>
                setVendorBranch(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="Contoh: DEPOK"
              className={getInputClass(
                showValidation && !vendorBranch.trim()
              )}
            />

            {showValidation && !vendorBranch.trim() && (
              <p className="text-left text-sm font-medium text-red-400">
                ⚠ Cabang Vendor belum diisi
              </p>
            )}

          </div>

          {/* =================================================
              INSPEKTOR
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Inspektor
            </label>

            <input
              type="text"
              value={inspector}
              readOnly
              className="
                h-12
                w-full
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

          {/* =================================================
              TGL INSPEKSI
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              Tgl Inspeksi
            </label>

            <input
              type="text"
              value={inspectionDate}
              readOnly
              className="
                h-12
                w-full
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

          {/* =================================================
            ID APPRAISAL
          ================================================= */}

          <div className="mt-6 space-y-2 text-center">

            <label className="text-lg font-bold text-white">
              ID Appraisal
            </label>

            <input
              type="text"
              value={appraisalId || "Akan di generate saat submit appraisal"}
              readOnly
              className="
              h-12
              w-full
              rounded-xl
              border
              border-white/20
              bg-white/10
              px-4
              text-white/70
              outline-none
              cursor-not-allowed
              "
            />

          </div>

          {/* =================================================
              SPACING
          ================================================= */}

          <div className="mt-16" />

          {/* =================================================
              BUTTON LANJUT
          ================================================= */}

          <div className="mt-3">

            {showValidation && !isFormComplete && (
              <p className="mb-3 text-center text-xl font-semibold text-red-500">
                ⚠ Inspeksi belum lengkap
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                if (!isFormComplete) {
                  setShowValidation(true);

                  setTimeout(() => {
                    const firstInvalid =
                      document.querySelector(
                        ".border-red-500"
                      );

                    firstInvalid?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }, 50);

                  return;
                }

                router.push(
                "/web-partner/otolink-app/digital-app/appraisal/motor/form/section-3"
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
              Lanjut ke Bagian 3 ➜
            </button>

          </div>

        </GlassCard>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/motor/form"
        />

      </div>

    </main>
  );
}