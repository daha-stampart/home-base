"use client";

import GlassCard from "../../dashboard/GlassCard";
import { ChevronDown, RefreshCw } from "lucide-react";
import Modal from "../../ui/Modal";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackButton from "../../components/common/BackButton";
import { fetchGoogle } from "../../lib/api/google";
import { clearAppraisal } from "../../lib/appraisal-storage";

export default function MobilPage() {
  const [openVendorModal, setOpenVendorModal] = useState(false);
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [showCards, setShowCards] = useState(false);

  const [loadingVendors, setLoadingVendors] = useState(true);
  const [vendorError, setVendorError] = useState("");

  const router = useRouter();

  // =====================================================
  // LOAD VENDOR
  // =====================================================

  const loadVendors = useCallback(async () => {
    try {
      setLoadingVendors(true);
      setVendorError("");

      const data = await fetchGoogle("mobil");

      console.log("VENDOR MOBIL:", data);

      if (!Array.isArray(data)) {
        throw new Error("Data vendor tidak valid");
      }

      setVendors(data);
    } catch (error) {
      console.error("Gagal mengambil vendor mobil:", error);

      setVendors([]);

      setVendorError(
        "Gagal memuat data vendor. Silakan coba lagi."
      );
    } finally {
      setLoadingVendors(false);
    }
  }, []);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadVendors();

    const timer = setTimeout(() => {
      setShowCards(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [loadVendors]);

  // =====================================================
  // OPEN VENDOR MODAL
  // =====================================================

  const handleOpenVendor = () => {
    setOpenVendorModal(true);

    if (vendors.length === 0 && !loadingVendors) {
      loadVendors();
    }
  };

  // =====================================================
  // SELECT VENDOR
  // =====================================================

  const handleSelectVendor = (vendor: any) => {
    const vendorName =
      `${vendor.kode_vendor} (${vendor.nama_vendor})`;

    setSelectedVendor(vendorName);
    setOpenVendorModal(false);
  };

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

      {/* Overlay tipis supaya background tetap terlihat */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-5 px-5 py-8">

        {/* =================================================
            HEADER
        ================================================= */}

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
            APPRAISAL MOBIL
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Silakan pilih vendor untuk memulai appraisal kendaraan.
          </p>
        </GlassCard>

        {/* =================================================
            VENDOR CARD
        ================================================= */}

        <GlassCard
          className={`
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
          `}
        >
          <h2 className="text-lg font-semibold text-blue-300">
            Pilih Vendor
          </h2>

          <button
            type="button"
            onClick={handleOpenVendor}
            className={`
              mt-4
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-white/20
              bg-white/10
              px-4
              py-3
              text-white
              transition-all
              duration-300

              hover:border-red-500/40
              hover:bg-white/15
              active:scale-[0.98]

              ${
                showCards
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <span className="truncate text-left">
              {selectedVendor ||
                "Belum ada vendor yang dipilih"}
            </span>

            <ChevronDown
              size={20}
              className="ml-3 shrink-0 text-white/70"
            />
          </button>
        </GlassCard>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <button
          type="button"
          disabled={!selectedVendor}
          onClick={() => {
            clearAppraisal();

            router.push(
              `/web-partner/otolink-app/digital-app/appraisal/mobil/form?vendor=${encodeURIComponent(
                selectedVendor
              )}`
            );
          }}
          className={`
            w-full
            rounded-xl
            py-3
            font-semibold
            text-white
            transition-all
            duration-700
            ease-out
            active:scale-[0.98]

            ${
              selectedVendor
                ? "bg-red-600 hover:bg-red-500"
                : "cursor-not-allowed bg-gray-600 text-white/60"
            }

            ${
              showCards
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          Lanjut ke Halaman Appraisal
        </button>

        {/* =================================================
            BACK
        ================================================= */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/appraisal"
        />

      </div>

      {/* ===================================================
          VENDOR MODAL
      =================================================== */}

      <Modal
        open={openVendorModal}
        title="Pilih Vendor"
        onClose={() => setOpenVendorModal(false)}
      >

        {/* ================= LOADING ================= */}

        {loadingVendors && (
          <div className="flex flex-col items-center justify-center py-8 text-center">

            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-red-500" />

            <p className="text-sm text-white/70">
              Memuat daftar vendor...
            </p>

          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loadingVendors && vendorError && (
          <div className="py-6 text-center">

            <p className="text-sm text-red-400">
              {vendorError}
            </p>

            <button
              type="button"
              onClick={loadVendors}
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-500
                active:scale-[0.98]
              "
            >
              <RefreshCw size={16} />

              Coba Lagi
            </button>

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loadingVendors &&
          !vendorError &&
          vendors.length === 0 && (
            <div className="py-6 text-center">

              <p className="text-sm text-white/60">
                Belum ada vendor yang tersedia.
              </p>

              <button
                type="button"
                onClick={loadVendors}
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-500
                  active:scale-[0.98]
                "
              >
                <RefreshCw size={16} />

                Muat Ulang
              </button>

            </div>
          )}

        {/* ================= VENDOR LIST ================= */}

        {!loadingVendors &&
          !vendorError &&
          vendors.length > 0 && (
            <div className="space-y-3">

              {vendors.map((vendor) => {
                const vendorName =
                  `${vendor.kode_vendor} (${vendor.nama_vendor})`;

                const isSelected =
                  selectedVendor === vendorName;

                return (
                  <button
                    key={vendor.id}
                    type="button"
                    onClick={() =>
                      handleSelectVendor(vendor)
                    }
                    className={`
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-left
                      text-white
                      transition-all
                      duration-200
                      active:scale-[0.98]

                      ${
                        isSelected
                          ? "border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,.15)]"
                          : "border-white/20 bg-white/10 hover:border-red-500/40 hover:bg-white/15"
                      }
                    `}
                  >
                    <div>
                      <div className="text-base font-bold text-white">
                        {vendor.kode_vendor}
                      </div>

                      <div className="mt-1 text-xs text-white/60">
                        {vendor.nama_vendor}
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>
          )}

      </Modal>

    </main>
  );
}