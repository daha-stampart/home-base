"use client";

import { Suspense, useEffect, useState } from "react";
import GlassCard from "../../../dashboard/GlassCard";
import BackButton from "../../../components/common/BackButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { saveAppraisal } from "../../../lib/appraisal-storage";
import { loadAppraisal } from "../../../lib/appraisal-storage";
import Image from "next/image";

function MobilFormContent() {
  const [showCards, setShowCards] = useState(false);
  const searchParams = useSearchParams();

  const [fakePlate, setFakePlate] = useState("Tidak");
  const [transmission, setTransmission] = useState("");
  const [branch, setBranch] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [fakePlateNumber, setFakePlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [physicalColor, setPhysicalColor] = useState("");
  const [year, setYear] = useState("");
  const [otherTransmission, setOtherTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [stnk, setStnk] = useState("");
  const [taxNote, setTaxNote] = useState("");
  const [taxExpiryDate, setTaxExpiryDate] = useState("");
  const [keurBook, setKeurBook] = useState("");
  const [odometer, setOdometer] = useState("");

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");

  const router = useRouter();

  useEffect(() => {
    setShowCards(true);

    setInspectionDate(
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );

    const user = sessionStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      setInspector(userData.nama);
    }

    const vendorFromUrl = searchParams.get("vendor");

    if (vendorFromUrl) {
      saveAppraisal({
        ...loadAppraisal(),
        vendor: vendorFromUrl,
      });
    }

    const saved = loadAppraisal();

    if (saved) {
      setBranch(saved.branch ?? "");
      setPlateNumber(saved.plateNumber ?? "");
      setFakePlate(saved.fakePlate ?? "Tidak");
      setFakePlateNumber(saved.fakePlateNumber ?? "");
      setVehicleType(saved.vehicleType ?? "");
      setPhysicalColor(saved.physicalColor ?? "");
      setYear(saved.year ?? "");
      setTransmission(saved.transmission ?? "");
      setOtherTransmission(saved.otherTransmission ?? "");
      setFuel(saved.fuel ?? "");
      setChassisNumber(saved.chassisNumber ?? "");
      setEngineNumber(saved.engineNumber ?? "");
      setStnk(saved.stnk ?? "");
      setTaxNote(saved.taxNote ?? "");
      setTaxExpiryDate(saved.taxExpiryDate ?? "");
      setKeurBook(saved.keurBook ?? "");
      setOdometer(saved.odometer ?? "");
    }
  }, [searchParams]);

  const saved = loadAppraisal();
  const vendor = saved?.vendor ?? "Belum dipilih";

  const toTitleCase = (text: string) => {
    return text.replace(/\w\S*/g, (word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      );
    });
  };

  function validateSection1() {
    if (!branch.trim()) {
      alert("Cabang Vendor wajib diisi.");
      return false;
    }

    if (!plateNumber.trim()) {
      alert("Nomor Polisi wajib diisi.");
      return false;
    }

    if (!fakePlate) {
      alert("Pilih status Nopol Palsu.");
      return false;
    }

    if (fakePlate === "Ya" && !fakePlateNumber.trim()) {
      alert("Nomor Polisi Palsu wajib diisi.");
      return false;
    }

    if (!vehicleType.trim()) {
      alert("Merk / Type wajib diisi.");
      return false;
    }

    if (!physicalColor.trim()) {
      alert("Warna Fisik wajib diisi.");
      return false;
    }

    if (!year.trim()) {
      alert("Tahun wajib diisi.");
      return false;
    }

    if (!transmission) {
      alert("Pilih Transmisi.");
      return false;
    }

    if (
      transmission === "Lainnya" &&
      !otherTransmission.trim()
    ) {
      alert("Jenis Transmisi wajib diisi.");
      return false;
    }

    if (!fuel.trim()) {
      alert("Bahan Bakar wajib diisi.");
      return false;
    }

    if (!chassisNumber.trim()) {
      alert("Nomor Rangka wajib diisi.");
      return false;
    }

    if (!engineNumber.trim()) {
      alert("Nomor Mesin wajib diisi.");
      return false;
    }

    if (!stnk) {
      alert("Pilih status STNK.");
      return false;
    }

    if (!taxNote) {
      alert("Pilih status Nota Pajak.");
      return false;
    }

    if (taxNote === "Ada" && !taxExpiryDate) {
      alert("Masa Berlaku Nota Pajak wajib diisi.");
      return false;
    }

    if (!keurBook) {
      alert("Pilih status Buku KEUR.");
      return false;
    }

    if (!odometer.trim()) {
      alert("Oddometer wajib diisi.");
      return false;
    }

    return true;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <Image
        src="/images/login-bg.png"
        alt="Otolink Background"
        fill
        priority
        className="pointer-events-none object-cover"
      />

      {/* ================= OVERLAY ================= */}

      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-md px-5 py-6 pb-28">

        {/* Title */}

        <h1 className="mb-5 text-center text-3xl font-bold tracking-wide text-red-500 drop-shadow-lg">
          APPRAISAL MOBIL
        </h1>


        {/* Inspector */}

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

              <div className="mx-auto grid w-fit grid-cols-[100px_15px_190px] gap-y-1">

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

                <span className="font-medium text-white">
                  {vendor}
                </span>

              </div>

            </div>

            <div className="mt-4 h-[2px] bg-white/80" />

          </div>
        </div>


        {/* Progress */}

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
                transition-all
                duration-700
              "
            />

          </div>


          <h2 className="mt-1 text-lg font-bold text-blue-300">
            Identitas Kendaraan
          </h2>

        </GlassCard>


        {/* Form */}

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


          <div className="mt-3 space-y-6 text-center text-white/40">

            {/* Vendor */}

            <div className="space-y-2">

              <label className="text-l font-bold text-white">
                Vendor
              </label>

              <input
                type="text"
                value={vendor}
                readOnly
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  text-white
                  outline-none
                  cursor-not-allowed
                "
              />

            </div>


            {/* Cabang Vendor */}

            <div className="space-y-2">

              <label className="text-l font-bold text-white">
                Cabang Vendor
              </label>

              <input
                type="text"
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value.toUpperCase())
                }
                placeholder="isi cabang atau kota"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Nomor Polisi */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Nomor Polisi
              </label>

              <input
                type="text"
                value={plateNumber}
                onChange={(e) =>
                  setPlateNumber(e.target.value.toUpperCase())
                }
                placeholder="Contoh: B 1234 ABC"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Nopol Palsu */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Nopol Palsu
              </label>

              <div className="flex items-center gap-8">

                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="fakePlate"
                    value="Tidak"
                    checked={fakePlate === "Tidak"}
                    onChange={(e) =>
                      setFakePlate(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Tidak

                </label>


                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="fakePlate"
                    value="Ya"
                    checked={fakePlate === "Ya"}
                    onChange={(e) =>
                      setFakePlate(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Ya

                </label>


                {fakePlate === "Ya" && (
                  <div className="mt-5 space-y-2">

                    <label className="text-m font-bold text-white">
                      Nopol Palsu Terpasang
                    </label>

                    <input
                      type="text"
                      value={fakePlateNumber}
                      onChange={(e) =>
                        setFakePlateNumber(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="Nopol Palsu"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-white/20
                        bg-white/10
                        px-4
                        text-white
                        placeholder:text-white/40
                        outline-none
                        focus:border-red-500
                      "
                    />

                  </div>
                )}

              </div>

            </div>


            {/* Merk Type */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Merk Type
              </label>

              <input
                type="text"
                value={vehicleType}
                onChange={(e) =>
                  setVehicleType(toTitleCase(e.target.value))
                }
                placeholder="Contoh: Toyota Avanza G"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Warna Fisik */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Warna Fisik
              </label>

              <input
                type="text"
                value={physicalColor}
                onChange={(e) =>
                  setPhysicalColor(toTitleCase(e.target.value))
                }
                placeholder="Contoh: Hitam Metalik"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Tahun */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Tahun
              </label>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={year}
                onChange={(e) =>
                  setYear(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Contoh: 2022"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Transmisi */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Transmisi
              </label>

              <div className="flex justify-center gap-8">

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


                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="transmission"
                    value="Lainnya"
                    checked={transmission === "Lainnya"}
                    onChange={(e) =>
                      setTransmission(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Lainnya

                </label>

              </div>


              {transmission === "Lainnya" && (
                <div className="mt-4 space-y-2">

                  <input
                    type="text"
                    value={otherTransmission}
                    onChange={(e) =>
                      setOtherTransmission(
                        toTitleCase(e.target.value)
                      )
                    }
                    placeholder="Tulis jenis transmisi"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/20
                      bg-white/10
                      px-4
                      text-white
                      placeholder:text-white/40
                      outline-none
                      focus:border-red-500
                    "
                  />

                </div>
              )}

            </div>


            {/* Bahan Bakar */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Bahan Bakar
              </label>

              <input
                type="text"
                value={fuel}
                onChange={(e) =>
                  setFuel(toTitleCase(e.target.value))
                }
                placeholder="Contoh: Bensin / Solar / Listrik"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Nomor Rangka */}

            <div className="space-y-2">

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
                placeholder="Masukkan nomor rangka"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* Nomor Mesin */}

            <div className="space-y-2">

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
                placeholder="Masukkan nomor mesin"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* STNK */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                STNK
              </label>

              <div className="flex justify-center gap-8">

                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="stnk"
                    value="Ada"
                    checked={stnk === "Ada"}
                    onChange={(e) =>
                      setStnk(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Ada

                </label>


                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="stnk"
                    value="Tidak"
                    checked={stnk === "Tidak"}
                    onChange={(e) =>
                      setStnk(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Tidak

                </label>

              </div>

            </div>


            {/* Nota Pajak */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Nota Pajak
              </label>

              <div className="flex justify-center gap-8">

                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="taxNote"
                    value="Ada"
                    checked={taxNote === "Ada"}
                    onChange={(e) =>
                      setTaxNote(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Ada

                </label>


                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="taxNote"
                    value="Tidak"
                    checked={taxNote === "Tidak"}
                    onChange={(e) =>
                      setTaxNote(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Tidak

                </label>

              </div>


              {taxNote === "Ada" && (
                <div className="mt-4 space-y-2">

                  <label className="text-lg font-bold text-white">
                    Masa Berlaku Nota Pajak
                  </label>

                  <input
                    type="date"
                    value={taxExpiryDate}
                    onChange={(e) =>
                      setTaxExpiryDate(e.target.value)
                    }
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-white/20
                      bg-white/10
                      px-4
                      text-white
                      outline-none
                      focus:border-red-500
                      [color-scheme:dark]
                    "
                  />

                </div>
              )}

            </div>


            {/* Buku KEUR */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Buku KEUR
              </label>

              <div className="flex justify-center gap-8">

                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="keurBook"
                    value="Ada"
                    checked={keurBook === "Ada"}
                    onChange={(e) =>
                      setKeurBook(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Ada

                </label>


                <label className="flex items-center gap-2 text-white">

                  <input
                    type="radio"
                    name="keurBook"
                    value="Tidak"
                    checked={keurBook === "Tidak"}
                    onChange={(e) =>
                      setKeurBook(e.target.value)
                    }
                    className="h-4 w-4 accent-red-500"
                  />

                  Tidak

                </label>

              </div>

            </div>


            {/* Odometer */}

            <div className="space-y-2">

              <label className="text-lg font-bold text-white">
                Oddometer (KM)
              </label>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={odometer}
                onChange={(e) =>
                  setOdometer(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Contoh: 125000"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-red-500
                "
              />

            </div>


            {/* BUTTON LANJUT */}

            <div className="mt-8">

              <button
                type="button"
                onClick={() => {

                  if (!validateSection1()) return;

                  saveAppraisal({
                    ...loadAppraisal(),
                    vendor,
                    branch,
                    plateNumber,
                    fakePlate,
                    fakePlateNumber,
                    vehicleType,
                    physicalColor,
                    year,
                    transmission,
                    otherTransmission,
                    fuel,
                    chassisNumber,
                    engineNumber,
                    stnk,
                    taxNote,
                    taxExpiryDate,
                    keurBook,
                    odometer,
                  });

                  router.push(
                    "/web-partner/otolink-app/digital-app/appraisal/mobil/form/section-2"
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
                Lanjut ke Bagian 2 ➜
              </button>

            </div>

          </div>

        </GlassCard>


        {/* BACK */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/mobil"
        />

      </div>

    </main>
  );
}

export default function MobilFormPage() {
  return (
    <Suspense
      fallback={
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07090f]">
          <div className="text-center text-white">
            <div className="text-sm text-white/60">
              Memuat halaman appraisal...
            </div>
          </div>
        </main>
      }
    >
      <MobilFormContent />
    </Suspense>
  );
}