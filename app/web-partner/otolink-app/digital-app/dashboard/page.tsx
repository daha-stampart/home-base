"use client";

import { ClipboardList, History, LogOut } from "lucide-react";
import GlassCard from "../dashboard/GlassCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const LANDING_URL = "/web-partner/otolink-app/digital-app";
const DASHBOARD_URL = "/web-partner/otolink-app/digital-app/dashboard";

export default function DashboardPage() {
  const router = useRouter();

  const [showCards, setShowCards] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    // =====================================================
    // CHECK SESSION
    // =====================================================

    const checkSession = () => {
      const userData = sessionStorage.getItem("user");

      if (!userData) {
        window.location.replace(LANDING_URL);
        return false;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        return true;
      } catch (error) {
        console.error("Session user tidak valid:", error);

        sessionStorage.removeItem("user");
        window.location.replace(LANDING_URL);

        return false;
      }
    };

    // Check pertama kali
    const validSession = checkSession();

    if (validSession) {
      setShowCards(true);
    }

    // =====================================================
    // PROTEKSI CHROME BACK / FORWARD / BFCache
    // =====================================================

    const handlePageShow = () => {
      checkSession();
    };

    window.addEventListener("pageshow", handlePageShow);

    // =====================================================
    // DASHBOARD SETELAH SUBMIT
    //
    // Jika halaman Dashboard dikembalikan oleh Chrome melalui
    // BFCache/history setelah submit, langsung pastikan URL
    // dan dokumen aktif kembali ke Dashboard.
    //
    // Tidak memakai history.go(-9) atau angka manual.
    // =====================================================

    const handlePageShowAfterSubmit = (event: PageTransitionEvent) => {
      const submitted =
        sessionStorage.getItem("appraisalSubmitted");

      if (
        submitted === "true" &&
        event.persisted
      ) {
        window.location.replace(DASHBOARD_URL);
      }
    };

    window.addEventListener(
      "pageshow",
      handlePageShowAfterSubmit
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow
      );

      window.removeEventListener(
        "pageshow",
        handlePageShowAfterSubmit
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Efek loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Hapus session
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("appraisalSubmitted");
    sessionStorage.removeItem("appraisalActive");

    // Pastikan state user juga kosong
    setUser(null);

    // ===================================================
    // HARD REDIRECT
    // ===================================================

    window.location.replace(LANDING_URL);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <Image
        src="/images/login-bg.png"
        alt="Otolink Background"
        fill
        priority
        className="pointer-events-none object-cover"
      />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center space-y-4 px-6 py-8">
        {/* =====================================================
            WELCOME
        ===================================================== */}

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
          <h1 className="text-xl font-bold text-white">
            Selamat Datang
          </h1>

          <p className="mt-3 text-2xl font-semibold text-red-500">
            {user?.nama}
          </p>

          <p className="mt-1 text-sm text-white/70">
            {user?.role} • {user?.perusahaan} • {user?.cabang}
          </p>
        </GlassCard>

        {/* =====================================================
            APPRAISAL BARU
        ===================================================== */}

        <GlassCard
          onClick={() => {
            setSelectedCard("appraisal");

            // Appraisal baru = hapus lock submit sebelumnya.
            sessionStorage.removeItem("appraisalSubmitted");
            sessionStorage.setItem("appraisalActive", "true");

            setTimeout(() => {
              router.push(
                "/web-partner/otolink-app/digital-app/appraisal"
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
              selectedCard === "appraisal"
                ? "scale-[0.98] border-red-500 bg-red-600/20 shadow-[0_0_25px_rgba(220,38,38,.35)]"
                : ""
            }

            hover:border-red-500/40
            hover:bg-red-600/10
          `}
        >
          <div className="flex items-center gap-4">
            <ClipboardList size={30} className="text-white" />

            <div>
              <h2 className="text-lg font-semibold text-white">
                APPRAISAL BARU
              </h2>

              <p className="text-sm text-white/70">
                Mulai melakukan appraisal kendaraan
              </p>
            </div>
          </div>
        </GlassCard>

        {/* =====================================================
            RIWAYAT
        ===================================================== */}

        <GlassCard
          onClick={() => {
            setSelectedCard("riwayat");

            setTimeout(() => {
              router.push("/web-partner/otolink-app/digital-app/riwayat");
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
              selectedCard === "riwayat"
                ? "scale-[0.98] border-red-500 bg-red-600/20 shadow-[0_0_25px_rgba(220,38,38,.35)]"
                : ""
            }

            hover:border-red-500/40
            hover:bg-red-600/10
          `}
        >
          <div className="flex items-center gap-4">
            <History size={30} className="text-white" />

            <div>
              <h2 className="text-lg font-semibold text-white">
                RIWAYAT
              </h2>

              <p className="text-sm text-white/70">
                Lihat appraisal yang telah anda submit
              </p>
            </div>
          </div>
        </GlassCard>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <button
          type="button"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className={`
            w-full
            rounded-[24px]
            border
            border-red-500/40
            bg-red-600/50
            px-6
            py-5
            text-left
            transition-all
            duration-700
            ease-out
            delay-[450ms]

            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }

            active:scale-[0.98]
            active:bg-red-600/40

            disabled:cursor-not-allowed
            disabled:opacity-70
          `}
        >
          <div className="flex items-center gap-4">
            <LogOut size={30} className="text-red-400" />

            <div>
              <h2 className="text-lg font-semibold text-white">
                Logout
              </h2>

              <p className="text-sm text-white/70">
                Keluar dari aplikasi
              </p>
            </div>
          </div>
        </button>

        {/* =====================================================
            LOGOUT LOADING
        ===================================================== */}

        {isLoggingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-7 shadow-2xl">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />

              <p className="text-lg font-semibold text-gray-800">
                Mengakhiri sesi...
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
