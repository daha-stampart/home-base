"use client";

import { useEffect, useState } from "react";
import GlassCard from "../../../../dashboard/GlassCard";
import BackButton from "../../../../components/common/BackButton";
import { useRouter } from "next/navigation";
import {
  saveAppraisal,
  loadAppraisal,
} from "../../../../lib/appraisal-storage";
import InspectionCheckbox from "../../../../components/appraisal/InspectionCheckbox";
import Modal from "../../../../ui/Modal";
import Image from "next/image";

export default function MobilFormPage() {
  const [showCards, setShowCards] = useState(false);

  {/* menu bagian yang di ceklist */}
  const [inspection, setInspection] = useState({
    hood: [] as string[],
    grillLogo: [] as string[],
    frontBumper: [] as string[],
    frontEmblem: [] as string[],
    upperFront: [] as string[],
    upperFrontLower: [] as string[],
    bulbHead: [] as string[],
    fogLight: [] as string[],
    rightHeadLamp: [] as string[],
    leftHeadLamp: [] as string[],
    rightFrontTurnSignal: [] as string[],
    leftFrontTurnSignal: [] as string[],
    frontWindshield: [] as string[],
    frontPillar: [] as string[],
  });

  const [inspector, setInspector] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [vendor, setVendor] = useState("Belum dipilih");
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);

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

    const saved = loadAppraisal();

    console.log("LOAD", saved);

    if (saved) {
      setVendor(saved.vendor ?? "Belum dipilih");

      {/* save bagian yang sudah di ceklist */}
      setInspection({
        hood: [],
        grillLogo: [],
        frontBumper: [],
        frontEmblem: [],
        upperFront: [],
        upperFrontLower: [],
        bulbHead: [],
        fogLight: [],
        rightHeadLamp: [],
        leftHeadLamp: [],
        rightFrontTurnSignal: [],
        leftFrontTurnSignal: [],
        frontWindshield: [],
        frontPillar: [],

        ...saved.inspection,
      });
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    console.log("AUTOSAVE", inspection);

    saveAppraisal({
      ...loadAppraisal(),
      inspection,
    });
  }, [inspection, isLoaded]);

  {/* data validasi */}
  function validateSection2() {
    return (
      inspection.hood.length > 0 &&
      inspection.grillLogo.length > 0 &&
      inspection.frontBumper.length > 0 &&
      inspection.frontEmblem.length > 0 &&
      inspection.upperFront.length > 0 &&
      inspection.upperFrontLower.length > 0 &&
      inspection.bulbHead.length > 0 &&
      inspection.fogLight.length > 0 &&
      inspection.rightHeadLamp.length > 0 &&
      inspection.leftHeadLamp.length > 0 &&
      inspection.rightFrontTurnSignal.length > 0 &&
      inspection.leftFrontTurnSignal.length > 0 &&
      inspection.frontWindshield.length > 0 &&
      inspection.frontPillar.length > 0
    );
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

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto w-full max-w-md px-5 py-6 pb-28">

        {/* Title */}

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
            Eksterior
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
            Bagian Depan
          </h2>

          <div className="mt-3 h-px bg-white/15" />

          {/* Mulai Pertanyaan */}

          <div className="space-y-2">

            <InspectionCheckbox
              title="KAP MESIN"
              value={inspection.hood}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  hood: value,
                })
              }
              error={
                submitted && inspection.hood.length === 0
                  ? "Pilih minimal satu kondisi !"
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Repaint",
                "Lesum",
                "Penyok",
                "Retak",
                "Pecah",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="GRILL LOGO"
              value={inspection.grillLogo}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  grillLogo: value,
                })
              }
              error={
                submitted && inspection.grillLogo.length === 0
                  ? "Pilih minimal satu kondisi !"
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="BUMPER DEPAN"
              value={inspection.frontBumper}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  frontBumper: value,
                })
              }
              error={
                submitted && inspection.frontBumper.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Repaint",
                "Lesum",
                "Penyok",
                "Retak",
                "Pecah",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="EMBLEM DEPAN"
              value={inspection.frontEmblem}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  frontEmblem: value,
                })
              }
              error={
                submitted && inspection.frontEmblem.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="UPFRONT DEPAN ATAS"
              description="Bagian depan mesin atas"
              value={inspection.upperFront}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  upperFront: value,
                })
              }
              error={
                submitted && inspection.upperFront.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Penyok",
                "Karat / Kropos",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="UPFRONT DEPAN BAWAH"
              description="Bagian depan mesin bawah"
              value={inspection.upperFrontLower}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  upperFrontLower: value,
                })
              }
              error={
                submitted && inspection.upperFrontLower.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Penyok",
                "Karat / Kropos",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="BULB HEAD"
              description="Braket lampu depan"
              value={inspection.bulbHead}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  bulbHead: value,
                })
              }
              error={
                submitted && inspection.bulbHead.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Pecah",
                "Patah",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="LAMPU FOGLIGHT"
              value={inspection.fogLight}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  fogLight: value,
                })
              }
              error={
                submitted && inspection.fogLight.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
                "Rusak",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="LAMPU DEPAN KANAN"
              value={inspection.rightHeadLamp}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  rightHeadLamp: value,
                })
              }
              error={
                submitted && inspection.rightHeadLamp.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
                "Rusak",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="LAMPU DEPAN KIRI"
              value={inspection.leftHeadLamp}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  leftHeadLamp: value,
                })
              }
              error={
                submitted && inspection.leftHeadLamp.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
                "Rusak",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="LAMPU SEN DEPAN KANAN"
              value={inspection.rightFrontTurnSignal}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  rightFrontTurnSignal: value,
                })
              }
              error={
                submitted &&
                inspection.rightFrontTurnSignal.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
                "Rusak",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="LAMPU SEN DEPAN KIRI"
              value={inspection.leftFrontTurnSignal}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  leftFrontTurnSignal: value,
                })
              }
              error={
                submitted &&
                inspection.leftFrontTurnSignal.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Baret",
                "Retak",
                "Pecah",
                "Rusak",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="KACA DEPAN"
              value={inspection.frontWindshield}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  frontWindshield: value,
                })
              }
              error={
                submitted &&
                inspection.frontWindshield.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Oplos",
                "Jamur",
                "Baret",
                "Retak",
                "Pecah",
              ]}
            />

            <div className="my-6 border-t border-white/15" />

            <InspectionCheckbox
              title="TIANG KACA DEPAN"
              value={inspection.frontPillar}
              onChange={(value) =>
                setInspection({
                  ...inspection,
                  frontPillar: value,
                })
              }
              error={
                submitted && inspection.frontPillar.length === 0
                  ? "Pilih minimal satu kondisi."
                  : ""
              }
              options={[
                "Baik",
                "Tidak Ada",
                "Baret",
                "Repaint",
                "Lesum",
                "Retak",
                "Patah",
              ]}
            />

            {/* Akhir Pertanyaan */}

          </div>

          <div className="mt-8">

            <button
              type="button"
              onClick={() => {
                setSubmitted(true);

                if (!validateSection2()) {
                  setShowIncompleteModal(true);
                  return;
                }

                saveAppraisal({
                  ...loadAppraisal(),
                  inspection,
                });

                // Di sini pindah ke Bagian 3
                router.push("/maintenance");
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

        {/* ================= BACK BUTTON ================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal/mobil/form"
        />

        <Modal
          open={showIncompleteModal}
          title="⚠️ Checklist Belum Lengkap"
          onClose={() => setShowIncompleteModal(false)}
        >
          <p className="text-center text-white">
            Silakan periksa kembali jawaban Anda.
          </p>
        </Modal>

      </div>

    </main>
  );
}