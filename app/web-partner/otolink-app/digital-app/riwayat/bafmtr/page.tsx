"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import GlassCard from "../../dashboard/GlassCard";
import BackButton from "../../components/common/BackButton";

type HistoryResult = {
  kategori?: string;
  kode_vendor?: string;
  nama_vendor?: string;
  nopol?: string;
  appraisal_id?: string;
  merk_type?: string;
  warna_fisik?: string;
  tahun?: string;
  transmisi?: string;
  nomor_rangka?: string;
  nomor_mesin?: string;
  odometer?: string;
  cabang_vendor?: string;
  inspector?: string;
  tanggal_inspeksi?: string;
};

type HistoryResponse = {
  success: boolean;
  found: boolean;
  total: number;
  results?: HistoryResult[];
  message?: string;
};

const MASTER_VENDOR_URL =
  "https://script.google.com/macros/s/AKfycbxU8VNnaouZ3JR7HhVY5SASpem0b4pFudY3EqnomO0rnOsgiIRuEfMH94WwEjLiDyo1YQ/exec";

export default function BafmtrPage() {
  const [history, setHistory] = useState<HistoryResult[]>([]);
  const [inspector, setInspector] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        // ============================================
        // AMBIL DATA INSPECTOR LOGIN
        // ============================================

        const userRaw = sessionStorage.getItem("user");

        if (!userRaw) {
          throw new Error(
            "Data inspector tidak ditemukan. Silakan login kembali."
          );
        }

        const userData = JSON.parse(userRaw);

        const currentInspector = userData?.nama;

        if (!currentInspector) {
          throw new Error(
            "Nama inspector tidak ditemukan. Silakan login kembali."
          );
        }

        setInspector(currentInspector);

        // ============================================
        // REQUEST HISTORY
        // ============================================

        const url =
          MASTER_VENDOR_URL +
          "?action=history" +
          "&kode_vendor=BAFMTR" +
          "&inspector=" +
          encodeURIComponent(currentInspector);

        console.log("History BAFMTR:", url);

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            "Gagal menghubungi server riwayat."
          );
        }

        const data: HistoryResponse =
          await response.json();

        console.log("Response History:", data);

        if (!data.success) {
          throw new Error(
            data.message || "Gagal mengambil data riwayat."
          );
        }

        if (data.found && Array.isArray(data.results)) {
          setHistory(data.results);
        } else {
          setHistory([]);
        }
      } catch (err) {
        console.error("History error:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Terjadi kesalahan saat mengambil riwayat."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* ================================================
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

      {/* ================================================
          CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-md px-5 pt-10 pb-28">
        {/* ==============================================
            HEADER
        ============================================== */}

        <GlassCard className="mb-5 p-5 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-red-500 drop-shadow-lg">
            RIWAYAT BAFMTR
          </h1>

          <div className="mx-auto mt-3 h-px w-3/4 bg-white/20" />

          <p className="mt-3 text-sm font-semibold tracking-wide text-white">
            BUSSAN AUTO FINANCE MOTOR
          </p>
        </GlassCard>

        {/* ==============================================
            INSPECTOR
        ============================================== */}

        {!loading && !error && (
          <p className="mb-5 text-center text-xs text-white/50">
            Riwayat inspeksi oleh{" "}
            <span className="font-semibold text-white/80">
              {inspector}
            </span>
          </p>
        )}

        {/* ==============================================
            LOADING
        ============================================== */}

        {loading && (
          <GlassCard className="p-7 text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-white/20 border-t-red-500" />

            <p className="mt-4 text-sm text-white/70">
              Memuat riwayat inspeksi...
            </p>
          </GlassCard>
        )}

        {/* ==============================================
            ERROR
        ============================================== */}

        {!loading && error && (
          <GlassCard className="p-6 text-center">
            <h2 className="text-lg font-bold text-white">
              Gagal Memuat Riwayat
            </h2>

            <div className="mx-auto mt-3 h-px w-20 bg-red-500/60" />

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {error}
            </p>
          </GlassCard>
        )}

        {/* ==============================================
            EMPTY
        ============================================== */}

        {!loading && !error && history.length === 0 && (
          <GlassCard className="p-6 text-center">
            <h2 className="text-lg font-bold text-white">
              Belum Ada Riwayat
            </h2>

            <div className="mx-auto mt-3 h-px w-20 bg-red-500/60" />

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Belum ada unit BAFMTR yang diinspeksi
              oleh inspector ini.
            </p>
          </GlassCard>
        )}

        {/* ==============================================
            HISTORY
        ============================================== */}

        {!loading && !error && history.length > 0 && (
          <div>
            {/* TOTAL */}

            <div className="mb-4 px-1">
              <p className="text-xs font-semibold tracking-wide text-white/50">
                TOTAL UNIT DIINSPEKSI
              </p>

              <p className="mt-1 text-xl font-bold text-white">
                {history.length} UNIT
              </p>
            </div>

            {/* ==========================================
                LIST UNIT
            ========================================== */}

            {history.map((unit, index) => (
              <div key={unit.appraisal_id || index}>
                <GlassCard className="p-5">
                  {/* UNIT */}

                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-white/40">
                      UNIT {index + 1}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-white/60">
                      MOTOR
                    </span>
                  </div>

                  {/* NOPOL */}

                  <p className="text-xs font-medium text-white/40">
                    NOMOR POLISI
                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-wider text-white">
                    {unit.nopol || "-"}
                  </h2>

                  {/* SEPARATOR DETAIL */}

                  <div className="my-4 h-px bg-white/10" />

                  {/* DETAIL */}

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        ID Appraisal
                      </span>

                      <span className="break-all text-xs font-semibold text-white">
                        {unit.appraisal_id || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Merk / Type
                      </span>

                      <span className="text-sm text-white">
                        {unit.merk_type || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Warna Fisik
                      </span>

                      <span className="text-sm text-white">
                        {unit.warna_fisik || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Tahun
                      </span>

                      <span className="text-sm text-white">
                        {unit.tahun || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Transmisi
                      </span>

                      <span className="text-sm text-white">
                        {unit.transmisi || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Nomor Rangka
                      </span>

                      <span className="break-all text-sm text-white">
                        {unit.nomor_rangka || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Nomor Mesin
                      </span>

                      <span className="break-all text-sm text-white">
                        {unit.nomor_mesin || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Odometer
                      </span>

                      <span className="text-sm text-white">
                        {unit.odometer
                          ? `${unit.odometer} KM`
                          : "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Cabang Vendor
                      </span>

                      <span className="text-sm text-white">
                        {unit.cabang_vendor || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Inspektor
                      </span>

                      <span className="text-sm text-white">
                        {unit.inspector || "-"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <span className="w-32 shrink-0 text-xs text-white/40">
                        Tgl Inspeksi
                      </span>

                      <span className="text-sm text-white">
                        {unit.tanggal_inspeksi || "-"}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                {/* ======================================
                    SEPARATOR ANTAR UNIT
                ====================================== */}

                {index < history.length - 1 && (
                  <div className="flex items-center py-5">
                    <div className="h-px flex-1 bg-white/20" />

                    <span className="px-4 text-[10px] font-semibold tracking-[0.2em] text-white/30">
                      UNIT BERIKUTNYA
                    </span>

                    <div className="h-px flex-1 bg-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ==============================================
            BACK
        ============================================== */}

        <BackButton
          href="/web-partner/otolink-app/digital-app/riwayat"
        />
      </div>
    </main>
  );
}