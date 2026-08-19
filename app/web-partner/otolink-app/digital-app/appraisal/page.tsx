"use client";

import { Car, Bike, Truck } from "lucide-react";
import GlassCard from "../dashboard/GlassCard";
import BackButton from "../components/common/BackButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AppraisalPage() {
  const router = useRouter();

  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    setShowCards(true);
  }, []);

  // =====================================================
  // MULAI SESI APPRAISAL
  // =====================================================
  //
  // Kita simpan posisi history saat user memilih
  // jenis kendaraan. Page 10 nantinya bisa memakai
  // marker ini untuk menentukan batas sesi appraisal.
  //
  const startAppraisalSession = (
    vehicleType: "mobil" | "motor"
  ) => {
    sessionStorage.setItem(
      "appraisalActive",
      "true"
    );

    sessionStorage.setItem(
      "appraisalVehicleType",
      vehicleType
    );

    sessionStorage.setItem(
      "appraisalHistoryStart",
      String(window.history.length)
    );

    // Pastikan flag submit dari appraisal sebelumnya
    // tidak terbawa ke sesi appraisal baru.
    sessionStorage.removeItem(
      "appraisalSubmitted"
    );
  };

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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-6 px-6 py-8">

        {/* ================= HEADER ================= */}

        <GlassCard
          className={`
            p-6
            text-center
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
          <h1 className="text-2xl font-bold text-red-500">
            Pilih Jenis Kendaraan
          </h1>

          <p className="mt-2 text-white/70">
            Silakan pilih appraisal yang akan dilakukan
          </p>
        </GlassCard>

        {/* ================= MOBIL ================= */}

        <GlassCard
          onClick={() => {
            setSelectedCard("mobil");

            startAppraisalSession("mobil");

            setTimeout(() => {
              router.push(
                "/web-partner/otolink-app/digital-app/appraisal/mobil"
              );
            }, 180);
          }}
          className={`
            cursor-pointer
            p-6
            transition-all
            duration-700
            ease-out
            delay-150

            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }

            ${
              selectedCard === "mobil"
                ? "scale-[0.98] border-red-500 bg-red-600/20 shadow-[0_0_25px_rgba(220,38,38,.35)]"
                : ""
            }

            hover:border-red-500/40
            hover:bg-red-600/10
          `}
        >
          <div className="flex items-center gap-4">

            <Car
              size={30}
              className="text-blue-500"
            />

            <div>
              <h2 className="text-lg font-semibold text-white">
                MOBIL
              </h2>

              <p className="text-sm text-white/70">
                Appraisal kendaraan roda empat
              </p>
            </div>

          </div>
        </GlassCard>

        {/* ================= MOTOR ================= */}

        <GlassCard
          onClick={() => {
            setSelectedCard("motor");

            startAppraisalSession("motor");

            setTimeout(() => {
              router.push(
                "/web-partner/otolink-app/digital-app/appraisal/motor"
              );
            }, 180);
          }}
          className={`
            cursor-pointer
            p-6
            transition-all
            duration-700
            ease-out
            delay-300

            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }

            ${
              selectedCard === "motor"
                ? "scale-[0.98] border-red-500 bg-red-600/20 shadow-[0_0_25px_rgba(220,38,38,.35)]"
                : ""
            }

            hover:border-red-500/40
            hover:bg-red-600/10
          `}
        >
          <div className="flex items-center gap-4">

            <Bike
              size={30}
              className="text-blue-500"
            />

            <div>
              <h2 className="text-lg font-semibold text-white">
                MOTOR
              </h2>

              <p className="text-sm text-white/70">
                Appraisal kendaraan roda dua
              </p>
            </div>

          </div>
        </GlassCard>

        {/* ================= UNIT LAIN ================= */}

        <GlassCard
          onClick={() => {
            setSelectedCard("unit");

            // Unit lain belum masuk flow appraisal final.
            sessionStorage.removeItem(
              "appraisalActive"
            );

            sessionStorage.removeItem(
              "appraisalHistoryStart"
            );

            sessionStorage.removeItem(
              "appraisalVehicleType"
            );

            setTimeout(() => {
              router.push("/maintenance");
            }, 180);
          }}
          className={`
            cursor-pointer
            p-6
            transition-all
            duration-700
            ease-out
            delay-[450ms]

            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }

            ${
              selectedCard === "unit"
                ? "scale-[0.98] border-red-500 bg-red-600/20 shadow-[0_0_25px_rgba(220,38,38,.35)]"
                : ""
            }

            hover:border-red-500/40
            hover:bg-red-600/10
          `}
        >
          <div className="flex items-center gap-4">

            <Truck
              size={30}
              className="text-blue-500"
            />

            <div>
              <h2 className="text-lg font-semibold text-white">
                UNIT LAIN
              </h2>

              <p className="text-sm text-white/70">
                Alat berat, trailer dan lain-lain
              </p>
            </div>

          </div>
        </GlassCard>

        {/* ================= BACK BUTTON ================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/dashboard"
        />

      </div>
    </main>
  );
}
