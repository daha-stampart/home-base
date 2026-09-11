"use client";

import { useRouter } from "next/navigation";
import {
  FileText,
  Inbox,
  LogOut,
  Menu,
  PackageCheck,
  PackageOpen,
  Users,
  Building2,
  Database,
  AlertTriangle,
  ChevronRight,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

type UserData = {
  user_id: string;
  level: string;
  nama: string;
  jabatan: string;
  cabang: string;
  status: string;
};

const API_URL =
"https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec"

export default function ManagementDocumentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [dokumen, setDokumen] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const savedUser = sessionStorage.getItem(
                "managementDocumentUser"
            );

            if (
                !savedUser ||
                savedUser === "undefined" ||
                savedUser === "null"
                ) {
                sessionStorage.removeItem(
                    "managementDocumentUser"
                );

                router.replace(
                    "/web-partner/management-document"
                );

                return;
            }

            try {

                const parsedUser: UserData =
                JSON.parse(savedUser);

                setUser(parsedUser);
                setLoading(true);
                const response = await fetch(
                    `${API_URL}?action=getDokumen`
                );

                const result = await response.json();

                if (result.success) {
                    setDokumen(result.data || []);
                }
                setLoading(false);

            } catch (error) {
                console.error("Session user error:", error);

                sessionStorage.removeItem(
                "managementDocumentUser"
                );

                router.replace(
                "/web-partner/management-document"
                );
            }
        };

        loadData();
    }, [router]);

  /*
   * DATA
   * kita ambil dari Google Apps Script / Google Sheets.
   */
  const summary = {
        totalDokumen: dokumen.length,

        menungguTerima: dokumen.filter(
            (item) => item.status === "PROSES PENGAMBILAN"
        ).length,

        dokumenReady: dokumen.filter(
            (item) => item.status === "READY"
        ).length,

        dokumenRelease: dokumen.filter(
            (item) => item.status === "DONE"
        ).length,

        perluPerhatian: dokumen.filter(
            (item) => item.perlu_perhatian === true
        ).length,

    };

    const cabangPerluPerhatian = Array.from(
        new Set(
            dokumen
            .filter((item) => item.perlu_perhatian === true)
            .map((item) => item.cabang)
            .filter(Boolean)
        )
    );

    if (!user) {
        return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-[#f5f8fc]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
        </div>
        );
    }

    const isAdministrator =
    user.level === "Administrator";

    const isAdminHO =
    user.level === "Admin HO";

    const isAdminDaerah =
    user.level === "Admin Cabang";

    const isAdminDokumen =
    user.level === "Admin Dokumen";

  return (
    <main className="min-h-[100dvh] w-full bg-[#f5f8fc] text-slate-800">
        {loading && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                
                <div className="relative flex h-32 w-32 items-center justify-center">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-[#0759d1]" />

                    <img
                    src="/images/logo-otolink-v2.png"
                    alt="Otolink"
                    className="h-9 w-auto object-contain"
                    />
                </div>

                <p className="mt-4 text-[12px] font-bold text-[#102852]">
                    Memuat data...
                </p>

                <p className="mt-1 text-[9px] text-slate-400">
                    Mohon tunggu sebentar
                </p>

                </div>
            </div>
        )}

        {/* =====================================================
            NAVBAR
        ====================================================== */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-[64px] max-w-[430px] items-center justify-between px-4">
                
                {/* BRAND */}
                <div className="flex items-center gap-4.5">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-white">
                    <img
                        src="/images/logo-otolink-v2.png"
                        alt="Otolink"
                        className="h-full w-full object-contain"
                    />
                    </div>

                    <div>
                        <p className="text-[24px] font-extrabold leading-8 text-[#0759d1]">
                            OTOLINK
                        </p>

                        <p className="text-[12px] font-medium leading-3 text-slate-500">
                            Manajemen Dokumen
                        </p>
                    </div>
                </div>

                {/* MENU BUTTON */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-[#12315f] transition hover:bg-slate-100 active:scale-95"
                    aria-label="Buka menu"
                    >
                    <Menu size={23} />
                </button>
            </div>
        </header>

        {/* =====================================================
            SIDE MENU / MOBILE MENU
        ====================================================== */}
        {menuOpen && (
            <>
                {/* Overlay */}
                <button
                    type="button"
                    aria-label="Tutup menu"
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px]"
                />

                {/* Drawer */}
                <aside className="fixed right-0 top-0 z-50 h-full w-[280px] bg-white shadow-2xl">
                    <div className="flex h-[64px] items-center justify-between border-b border-slate-200 px-5">
                        <div>
                            <p className="text-sm font-extrabold text-[#0b2857]">
                                Menu
                            </p>

                            <p className="text-[12px] text-slate-500">
                                {user.level}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                            >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4">
                        {/* USER */}
                        <div className="mb-5 rounded-xl bg-[#f1f6ff] p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                Login sebagai
                            </p>

                            <p className="mt-1 text-sm font-bold text-[#0b2857]">
                                {user.nama}
                            </p>

                            <div className="my-3 border-t border-blue-100" />

                            <div>
                                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                                    Jabatan
                                </p>

                                <p className="mt-0.5 text-[12px] font-bold text-[#0b2857]">
                                    {user.jabatan}
                                </p>
                            </div>

                            <div className="mt-3">
                                <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                                    Cabang Otolink
                                </p>

                                <p className="mt-0.5 text-[12px] font-bold text-[#0b2857]">
                                    {user.cabang}
                                </p>
                            </div>
                        </div>

                        {/* AJUKAN PERUBAHAN DATA */}
                        <a
                            href="https://wa.me/6281351919309"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-3 flex w-full items-center justify-center rounded-xl border border-[#0759d1] bg-white py-3 text-[11px] font-bold text-[#0759d1] transition hover:bg-blue-50 active:scale-[0.98]"
                            >
                            AJUKAN PERUBAHAN DATA
                        </a>

                        <p className="mb-5 mt-2 text-center text-[9px] text-slate-400">
                            *Hubungi Administrator untuk request perubahan data
                        </p>

                        {/* LOGOUT */}
                        <button
                            type="button"
                            onClick={() => {
                                // Hapus session login
                                sessionStorage.removeItem(
                                "managementDocumentUser"
                                );

                                // Tutup menu
                                setMenuOpen(false);

                                // Kembali ke halaman login
                                router.replace(
                                "/web-partner/management-document"
                                );
                            }}
                            className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-3
                                text-left
                                text-sm
                                font-semibold
                                text-red-500
                                transition
                                hover:bg-red-50
                                active:scale-[0.98]
                            "
                            >
                            <LogOut size={19} />
                            Keluar
                        </button>
                    </div>
                </aside>
            </>
        )}

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="mx-auto w-full max-w-[430px] px-4 pb-8">
            {/* ===================================================
                WELCOME
            ==================================================== */}
            <section className="pt-6">
                <p className="text-[12px] font-semibold text-[#0759d1]">
                    DASHBOARD
                </p>

                <div className="mt-1">
                    <p className="text-[18px] font-semibold text-slate-500">
                        Selamat datang {user.level}
                    </p>

                    <h1 className="mt-0.5 text-[23px] font-extrabold leading-tight text-[#09275a]">
                        {user.nama} 👋
                    </h1>
                </div>

                <p className="mt-1.5 text-[12px] leading-5 text-slate-500">
                    Kelola seluruh aktivitas dokumen Otolink
                    dimanapun dan kapanpun.
                </p>
            </section>

            {/* ===================================================
                SUMMARY
            ==================================================== */}
            <section className="mt-5">
                <div className="grid grid-cols-2 gap-3">
                    
                    {/* TOTAL DOKUMEN */}
                    <SummaryCard
                        icon={<FileText size={19} />}
                        label="Total Dokumen"
                        value={summary.totalDokumen}
                        iconClass="bg-blue-50 text-blue-700"
                    />

                    {/* MENUNGGU TERIMA */}
                        <SummaryCard
                        icon={<Inbox size={19} />}
                        label="Proses Pengambilan"
                        value={summary.menungguTerima}
                        iconClass="bg-amber-50 text-amber-600"
                    />

                    {/* DOKUMEN READY */}
                    <SummaryCard
                        icon={<PackageCheck size={19} />}
                        label="Dokumen Ready"
                        value={summary.dokumenReady}
                        iconClass="bg-emerald-50 text-emerald-600"
                    />

                    {/* DOKUMEN RELEASE */}
                    <SummaryCard
                        icon={<PackageCheck size={19} />}
                        label="Dokumen Release"
                        value={summary.dokumenRelease}
                        iconClass="bg-emerald-50 text-emerald-600"
                    />

                    {/* PERLU PERHATIAN */}
                    <div
                        className="
                        col-span-2
                        rounded-2xl
                        border
                        border-red-400
                        bg-white
                        p-3.5
                        shadow-sm
                        "
                        >
                        <div className="flex items-stretch">
                        
                            {/* KIRI - JUMLAH */}
                            <div className="flex min-w-0 flex-1 flex-col">
                                <div
                                    className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-red-50
                                    text-red-500
                                    "
                                    >
                                    <AlertTriangle size={19} />
                                </div>

                                <p className="mt-3 text-[14px] font-medium text-slate-500">
                                    Perlu Perhatian!
                                </p>

                                <p className="mt-0.5 text-[23px] font-extrabold leading-none text-[#09275a]">
                                    {summary.perluPerhatian.toLocaleString("id-ID")}
                                </p>
                            </div>

                            {/* KANAN - CABANG */}
                            <div className="ml-4 min-w-0 flex-1 border-l border-red-100 pl-4">
                                <p className="text-[11px] font-bold text-[#09275a]">
                                    Cabang
                                </p>

                                <div className="mt-2 space-y-1.5">
                                    {cabangPerluPerhatian.length === 0 ? (
                                    <p className="text-[10px] text-slate-400">
                                        Tidak ada
                                    </p>
                                    ) : (
                                    cabangPerluPerhatian.map((cabang) => (
                                        <div
                                        key={cabang}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-lg
                                            bg-red-50
                                            px-2.5
                                            py-1.5
                                        "
                                        >
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

                                        <span className="truncate text-[10px] font-semibold text-red-600">
                                            {cabang}
                                        </span>
                                        </div>
                                    ))
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================
                PERLU PERHATIAN
            ==================================================== */}
            <section className="mt-7">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-red-500" />

                        <h2 className="text-[15px] font-extrabold text-[#09275a]">
                            Follow up Dokumen
                        </h2>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/web-partner/management-document/follow-up"
                        )
                    }
                    className="
                        mt-3
                        w-full
                        overflow-hidden
                        rounded-2xl
                        border
                        border-red-100
                        bg-white
                        text-left
                        shadow-sm
                        transition
                        hover:border-red-200
                        hover:bg-red-50/30
                        active:scale-[0.99]
                    "
                    >

                    {/* HEADER */}
                    <div className="flex items-center gap-3 border-b border-red-100 bg-red-50/70 px-4 py-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <AlertTriangle size={18} />
                            </div>

                            <div>
                                <p className="text-[12px] font-bold text-red-600">
                                    Follow up dokumen belum diterima
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-500">
                                    Dokumen yang belum diterima admin lebih dari 3 hari
                                    setelah tanggal pembuatan surat pengambilan terbentuk.
                                </p>
                            </div>
                    </div>

                    {/* EMPTY STATE */}
                    {summary.perluPerhatian === 0 ? (
                            <div className="px-4 py-5 text-center">
                                <p className="text-[11px] font-medium text-slate-400">
                                    Belum ada dokumen yang perlu di-follow up.
                                </p>
                            </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {/* DATA FOLLOW UP DITAMPILKAN DI SINI */}
                        </div>
                    )}
                </button>
                
            </section>

            {/* ===================================================
                MENU UTAMA
            ==================================================== */}
            <section className="mt-7">
                <SectionTitle title="Menu Utama" />

                <div className="mt-3 space-y-2.5">

                    {/* PENGAMBILAN → Administrator + Admin HO */}
                    {(isAdministrator || isAdminHO) && (
                        <MenuItem
                            icon={<PackageOpen size={20} />}
                            title="Pengambilan Dokumen"
                            description="Kelola data pengambilan dokumen"
                            iconClass="bg-blue-50 text-blue-700"
                            onClick={() =>
                                router.push(
                                    "/web-partner/management-document/pengambilan"
                                )
                            }
                        />
                    )}

                    {/* PENERIMAAN → Administrator + Admin Cabang + Admin Dokumen */}
                    {(isAdministrator || isAdminDaerah || isAdminDokumen) && (
                        <MenuItem
                            icon={<Inbox size={20} />}
                            title="Penerimaan Dokumen"
                            description="Kelola dokumen yang akan diterima"
                            iconClass="bg-blue-50 text-blue-700"
                            onClick={() =>
                                router.push(
                                    "/web-partner/management-document/penerimaan"
                                )
                            }
                        />
                    )}

                    {/* PENGELUARAN → Administrator + Admin Cabang + Admin Dokumen */}
                    {(isAdministrator || isAdminDaerah || isAdminDokumen) && (
                        <MenuItem
                            icon={<PackageCheck size={20} />}
                            title="Pengeluaran Dokumen"
                            description="Kelola dokumen yang sudah Ready"
                            iconClass="bg-blue-50 text-blue-700"
                            onClick={() =>
                                router.push(
                                    "/web-partner/management-document/pengeluaran"
                                )
                            }
                        />
                    )}

                </div>
            </section>

            {/* ===================================================
                ADMINISTRASI
            ==================================================== */}
            <section className="mt-7">
                <SectionTitle title="Administrasi" />

                <div className="mt-3 space-y-2.5">
                    <MenuItem
                        icon={<Database size={20} />}
                        title="Data Semua Dokumen"
                        description="Lihat dan kelola seluruh data dokumen"
                        iconClass="bg-slate-100 text-slate-600"
                        onClick={() =>
                            router.push(
                            "/web-partner/management-document/semua-dokumen"
                            )
                        }
                        
                    />

                    <MenuItem
                        icon={<Users size={20} />}
                        title="Staff Operasional"
                        description="Informasi semua staff operasional Otolink"
                        iconClass="bg-slate-100 text-slate-600"
                        onClick={() =>
                            router.push(
                                "/web-partner/management-document/staff"
                            )
                        }
                    />

                </div>
            </section>

            {/* ===================================================
                FOOTER
            ==================================================== */}
            <footer className="mt-8 pb-2 text-center">
                <p className="text-[10px] font-medium text-slate-400">
                    © 2026 Otolink - Manajemen Dokumen
                </p>

                <p className="mt-0.5 text-[9px] text-slate-400">
                    PT Balai Lelang Megatama
                </p>
            </footer>
        </div>
    </main>
  );
}

/* ==========================================================
   SUMMARY CARD
========================================================== */
type SummaryCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  iconClass: string;
  danger?: boolean;
};

function SummaryCard({
  icon,
  label,
  value,
  iconClass,
  danger = false,
}: SummaryCardProps) {
    return (
        <div
            className={`
                rounded-2xl
                border
                bg-white
                p-3.5
                shadow-sm
                ${
                danger
                    ? "border-red-500"
                    : "border-slate-200"
                }
            `}
            >
            
            <div className="flex items-center justify-between">
                <div
                    className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        ${iconClass}
                    `}
                    >
                    {icon}
                </div>

                
            </div>

            <p className="mt-3 text-[14px] font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-0.5 text-[23px] font-extrabold leading-none text-[#09275a]">
                {value.toLocaleString("id-ID")}
            </p>
        </div>
    );
}

/* ==========================================================
   SECTION TITLE
========================================================== */
function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-5 w-1 rounded-full bg-[#0759d1]" />

      <h2 className="text-[15px] font-extrabold text-[#09275a]">
        {title}
      </h2>
    </div>
  );
}

/* ==========================================================
   MENU ITEM
========================================================== */
type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconClass: string;
  onClick?: () => void;
};

function MenuItem({
  icon,
  title,
  description,
  iconClass,
  onClick,
}: MenuItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3.5
                text-left
                shadow-sm
                transition
                hover:border-blue-200
                hover:shadow-md
                active:scale-[0.99]
            "
            >
            {/* ICON */}
            <div
                className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${iconClass}
                `}
                >
                {icon}
            </div>

            {/* TEXT */}
            <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#102852]">
                    {title}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-slate-500">
                    {description}
                </p>
            </div>

            {/* ARROW */}
            <ChevronRight
                size={18}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
            />
        </button>
    );
}