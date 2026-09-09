"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Users, MessageCircle, } from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

type Staff = {
  nama: string;
  jabatan: string;
  cabang: string;
  no_hp: string;
};

export default function StaffPage() {
  const router = useRouter();

  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterCabang, setFilterCabang] = useState("");

  useEffect(() => {
    async function loadStaff() {
      try {
        const response = await fetch(
          `${API_URL}?action=getStaff`
        );

        const result = await response.json();

        if (result.success) {
          setStaff(result.data || []);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data staff:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  const daftarCabang = [
    ...new Set(
      staff
        .map((item) => item.cabang)
        .filter(Boolean)
    ),
  ].sort();

  const staffFiltered = staff.filter((item) => {
    const keyword = search.toLowerCase().trim();

    const cocokSearch =
      !keyword ||
      item.nama.toLowerCase().includes(keyword) ||
      item.jabatan.toLowerCase().includes(keyword) ||
      item.no_hp.toLowerCase().includes(keyword);

    const cocokCabang =
      !filterCabang ||
      item.cabang === filterCabang;

    return cocokSearch && cocokCabang;
  });

  if (loading) {
        return (
        <main className="flex min-h-[100dvh] items-center justify-center bg-[#f5f8fc]">
            <div className="flex flex-col items-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-[#0759d1]" />

                <img
                src="/images/logo-otolink-v2.png"
                alt="Otolink"
                className="h-8 w-auto object-contain"
                />
            </div>

            <p className="mt-4 text-[12px] font-bold text-[#102852]">
                Memuat data...
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
                Mohon tunggu sebentar
            </p>
            </div>
        </main>
        );
    }

  return (
        <main className="min-h-[100dvh] bg-[#f5f8fc] text-slate-800">

            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex h-[64px] max-w-[430px] items-center gap-3 px-4">

                    <button
                        type="button"
                        onClick={() =>
                        router.replace(
                            "/web-partner/management-document/dashboard"
                        )
                        }
                        className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-[#12315f]
                        transition
                        hover:bg-slate-100
                        active:scale-95
                        "
                        aria-label="Kembali"
                        >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="min-w-0 flex-1">
                        <h1 className="truncate text-[15px] font-extrabold text-[#09275a]">
                            Staff Operasional
                        </h1>

                        <p className="text-[9px] font-medium text-slate-500">
                            Informasi semua staff operasional
                        </p>
                    </div>

                </div>
            </header>

            <div className="mx-auto w-full max-w-[430px] px-4 py-5">

                {/* JUDUL */}
                <section>
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-1 rounded-full bg-[#0759d1]" />

                        <h2 className="text-[14px] font-extrabold text-[#09275a]">
                            Data Staff
                        </h2>
                    </div>

                    <p className="mt-1 text-[9px] text-slate-400">
                        {staffFiltered.length} staff
                    </p>
                </section>

                {/* SEARCH */}
                <div className="relative mt-4">
                    <Search
                        size={16}
                        className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                        setSearch(e.target.value)
                        }
                        placeholder="Cari nama, jabatan, atau no HP..."
                        className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-9
                        pr-4
                        text-[10px]
                        font-medium
                        text-slate-700
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-[#0759d1]
                        focus:ring-2
                        focus:ring-blue-100
                        "
                    />
                </div>

                {/* FILTER CABANG */}
                <div className="mt-2.5">
                    <select
                        value={filterCabang}
                            onChange={(e) =>
                            setFilterCabang(e.target.value)
                        }
                        className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-[10px]
                        font-medium
                        text-slate-600
                        outline-none
                        focus:border-[#0759d1]
                        focus:ring-2
                        focus:ring-blue-100
                        "
                    >
                        <option value="">
                            Semua Cabang Otolink
                        </option>

                        {daftarCabang.map((cabang) => (
                            <option
                                key={cabang}
                                value={cabang}
                                >
                                {cabang}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DATA STAFF */}
                <section className="mt-4 space-y-2.5">

                    {staffFiltered.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                            <Users size={23} />
                        </div>

                        <p className="mt-3 text-[12px] font-bold text-slate-500">
                            Data staff tidak ditemukan
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                            Coba ubah kata pencarian atau filter cabang.
                        </p>

                        </div>
                    ) : (
                        staffFiltered.map((item, index) => (
                        <div
                            key={`${item.nama}-${item.no_hp}-${index}`}
                            className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            shadow-sm
                            "
                            >

                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">

                                {/* NAMA */}
                                <div className="min-w-0">
                                    <p className="text-[8px] font-medium text-slate-400">
                                        Nama
                                    </p>

                                    <p className="mt-0.5 break-words text-[10px] font-extrabold text-[#09275a]">
                                    {item.nama || "-"}
                                    </p>
                                </div>

                                {/* JABATAN */}
                                <div className="min-w-0">
                                    <p className="text-[8px] font-medium text-slate-400">
                                        Jabatan
                                    </p>

                                    <p className="mt-0.5 break-words text-[10px] font-bold text-[#243b63]">
                                        {item.jabatan || "-"}
                                    </p>
                                </div>

                                {/* CABANG */}
                                <div className="min-w-0">
                                    <p className="text-[8px] font-medium text-slate-400">
                                        Cabang
                                    </p>

                                    <p className="mt-0.5 break-words text-[10px] font-bold text-[#243b63]">
                                        {item.cabang || "-"}
                                    </p>
                                </div>

                                {/* NO HP */}
                                <div className="min-w-0">
                                    <p className="text-[8px] font-medium text-slate-400">
                                        No HP
                                    </p>

                                    <p className="mt-0.5 break-words text-[10px] font-bold text-[#243b63]">
                                        {item.no_hp || "-"}
                                    </p>
                                </div>

                            </div>

                        </div>
                    ))
                    )}

                </section>

                {/* AJUKAN PERUBAHAN DATA */}
                <div className="mt-6 pb-6">
                    <button
                        type="button"
                        onClick={() =>
                        window.open(
                            "https://wa.me/6281351919309?text=Halo%20Admin%2C%20saya%20ingin%20mengajukan%20perubahan%20data%20Staff%20Operasional.",
                            "_blank"
                        )
                        }
                        className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#0759d1]
                        px-4
                        py-3
                        text-[10px]
                        font-extrabold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-[#064db5]
                        active:scale-[0.98]
                        "
                        >
                        <MessageCircle size={15} />

                        Ajukan Perubahan Data
                    </button>

                    <p className="mt-2 text-center text-[8px] font-medium text-slate-400">
                        klik untuk hubingi administrator dan ajukan perubahan data
                    </p>
                </div>

            </div>
        </main>
    );
}