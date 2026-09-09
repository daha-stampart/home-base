"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Search,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

type Staff = {
  nama: string;
  jabatan: string;
  cabang: string;
  no_hp: string;
};

type Kendaraan = {
  nopol: string;
  merk_type: string;
};

export default function PengambilanDokumenPage() {
  const router = useRouter();

  const [noSurat, setNoSurat] = useState("");
  const [vendor, setVendor] = useState("");
  const [vendorCabang, setVendorCabang] = useState("");
  const [model, setModel] = useState("");
  const [tglPembuatanSurat, setTglPembuatanSurat] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [kendaraan, setKendaraan] = useState<Kendaraan[]>([
    {
      nopol: "",
      merk_type: "",
    },
  ]);

  const [staff, setStaff] = useState<Staff[]>([]);
  const [searchPengambil, setSearchPengambil] =
    useState("");
  const [namaPengambil, setNamaPengambil] =
    useState("");
  const [showPengambil, setShowPengambil] =
    useState(false);
  const [cabangOtolink, setCabangOtolink] =
    useState("");  

  useEffect(() => {
    const loadStaff = async () => {
  try {
    const response = await fetch(
        `${API_URL}?action=getStaff`,
        {
            cache: "no-store",
        }
        );

        if (!response.ok) {
        throw new Error(
            `HTTP Error: ${response.status}`
        );
        }

        const result = await response.json();

        if (result.success) {
        setStaff(result.data || []);
        }
    } catch (error) {
        console.error(
        "Gagal mengambil data staff:",
        error
        );
    }
    };

    loadStaff();
  }, []);

  const tambahKendaraan = () => {
    setKendaraan((prev) => [
      ...prev,
      {
        nopol: "",
        merk_type: "",
      },
    ]);
  };

  const updateKendaraan = (
    index: number,
    field: "nopol" | "merk_type",
    value: string
  ) => {
    setKendaraan((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value.toUpperCase(),
            }
          : item
      )
    );
  };

  const staffFiltered = staff.filter((item) => {
  if (
    item.cabang.trim().toLowerCase() ===
    "head office"
  ) {
    return false;
  }

    const keyword = searchPengambil
        .toLowerCase()
        .trim();

    if (!keyword) return true;

    return (
        item.nama.toLowerCase().includes(keyword) ||
        item.jabatan.toLowerCase().includes(keyword) ||
        item.cabang.toLowerCase().includes(keyword)
    );
    });

    const resetForm = () => {
    setNoSurat("");
    setVendor("");
    setVendorCabang("");
    setModel("");
    setTglPembuatanSurat("");

    setKendaraan([
        {
        nopol: "",
        merk_type: "",
        },
    ]);

    setSearchPengambil("");
    setNamaPengambil("");
    setCabangOtolink("");
    };

    const pilihPengambil = (item: Staff) => {
        setNamaPengambil(item.nama);
        setSearchPengambil(item.nama);
        setCabangOtolink(item.cabang);
        setShowPengambil(false);
    };

    const handleSubmit = async () => {
    if (submitting) return;

    if (
        !noSurat.trim() ||
        !vendor.trim() ||
        !vendorCabang.trim() ||
        !model.trim() ||
        !tglPembuatanSurat ||
        !namaPengambil
    ) {
        alert("Mohon lengkapi semua data.");
        return;
    }

    if (
        kendaraan.some(
        (item) =>
            !item.nopol.trim() ||
            !item.merk_type.trim()
        )
    ) {
        alert(
        "Nopol dan Merk Type wajib diisi untuk semua kendaraan."
        );
        return;
    }

    try {
        setSubmitting(true);

        await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            action: "submitPengambilan",
            data: {
            no_surat: noSurat.trim().toUpperCase(),
            vendor: vendor.trim().toUpperCase(),
            vendor_cabang:
                vendorCabang.trim().toUpperCase(),
            model: model.trim().toUpperCase(),
            tgl_pembuatan_surat:
                tglPembuatanSurat,
            nama_pengambil:
                namaPengambil.trim().toUpperCase(),
            cabang_otolink: cabangOtolink,
            kendaraan: kendaraan.map((item) => ({
                nopol: item.nopol
                .trim()
                .toUpperCase(),
                merk_type: item.merk_type
                .trim()
                .toUpperCase(),
            })),
            },
        }),
        });

        resetForm();
        setShowSuccess(true);

    } catch (error) {
        console.error(
        "Submit pengambilan error:",
        error
        );

        alert(
        error instanceof Error
            ? error.message
            : "Gagal menyimpan data."
        );
    } finally {
        setSubmitting(false);
    }
    };

  return (
    <main className="min-h-screen bg-slate-50">
        <div className="mx-auto min-h-screen w-full max-w-md px-5 py-5 pb-10">

            {/* HEADER */}
            <div className="flex items-center gap-3">
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
                    rounded-full
                    bg-white
                    text-[#243b63]
                    shadow-sm
                    transition
                    active:scale-95
                    "
                    >
                    <ArrowLeft size={18} />
                </button>

                <div>
                    <h1 className="text-[16px] font-extrabold text-[#0b2f66]">
                        Pengambilan Dokumen
                    </h1>

                    <p className="mt-0.5 text-[9px] font-medium text-slate-400">
                        Input data pengambilan dokumen
                    </p>
                </div>
            </div>

            {/* FORM */}
            <div className="mt-5 space-y-3">

                {/* NO SURAT */}
                <div>
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        No Surat
                    </label>

                    <input
                        type="text"
                        value={noSurat}
                        onChange={(e) =>
                            setNoSurat(e.target.value.toUpperCase())
                        }
                        placeholder="Masukkan nomor surat"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-3
                            py-2.5
                            text-[10px]
                            font-semibold
                            text-[#243b63]
                            outline-none
                            focus:border-blue-400
                        "
                    />
                </div>

                {/* VENDOR */}
                <div>
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        Vendor
                    </label>

                    <input
                        type="text"
                        value={vendor}
                        onChange={(e) =>
                            setVendor(e.target.value.toUpperCase())
                        }
                        placeholder="Masukkan vendor"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-3
                            py-2.5
                            text-[10px]
                            font-semibold
                            text-[#243b63]
                            outline-none
                            focus:border-blue-400
                        "
                    />
                </div>

                {/* CABANG VENDOR */}
                <div>
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        Cabang Vendor
                    </label>

                    <input
                        type="text"
                        value={vendorCabang}
                        onChange={(e) =>
                        setVendorCabang(e.target.value.toUpperCase())
                        }
                        placeholder="Masukkan cabang vendor"
                        className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2.5
                        text-[10px]
                        font-semibold
                        text-[#243b63]
                        outline-none
                        focus:border-blue-400
                        "
                    />
                </div>

                {/* MODEL */}
                <div>
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        Model
                    </label>

                    <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2.5
                        text-[10px]
                        font-semibold
                        text-[#243b63]
                        outline-none
                        focus:border-blue-400
                        "
                        >
                        <option value="">Pilih model</option>
                        <option value="MOBIL">MOBIL</option>
                        <option value="MOTOR">MOTOR</option>
                    </select>
                </div>

                {/* TANGGAL */}
                <div>
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        Tgl Pembuatan Surat
                    </label>

                    <input
                        type="date"
                        value={tglPembuatanSurat}
                        onChange={(e) =>
                            setTglPembuatanSurat(e.target.value)
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-3
                            py-2.5
                            text-[10px]
                            font-semibold
                            text-[#243b63]
                            outline-none
                            focus:border-blue-400
                        "
                    />
                </div>

                {/* NOPOL */}
                <div>
                    <div className="mb-1 flex items-center justify-between">
                        <label className="text-[9px] font-bold text-[#243b63]">
                            Nopol
                        </label>

                        <button
                            type="button"
                            onClick={tambahKendaraan}
                            className="
                            flex
                            items-center
                            gap-1
                            rounded-lg
                            bg-blue-50
                            px-2
                            py-1.5
                            text-[8px]
                            font-extrabold
                            text-blue-700
                            transition
                            active:scale-95
                            "
                            >
                            <Plus size={12} />
                            Tambah
                        </button>
                    </div>

                    <div className="space-y-3">
                        {kendaraan.map((item, index) => (
                            <div
                                key={index}
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-3
                                    shadow-sm
                                "
                                >
                                <p className="mb-2 text-[8px] font-extrabold text-slate-400">
                                    KENDARAAN {index + 1}
                                </p>

                                {/* NOPOL */}
                                <input
                                    type="text"
                                    value={item.nopol}
                                    onChange={(e) =>
                                    updateKendaraan(
                                        index,
                                        "nopol",
                                        e.target.value
                                    )
                                    }
                                    placeholder="Masukkan nomor polisi"
                                    className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-3
                                    py-2.5
                                    text-[10px]
                                    font-bold
                                    text-[#243b63]
                                    outline-none
                                    focus:border-blue-400
                                    "
                                />

                                {/* MERK TYPE */}
                                <div className="mt-2.5">
                                    <label className="mb-1 block text-[8px] font-bold text-slate-400">
                                        Merk Type
                                    </label>

                                    <input
                                        type="text"
                                        value={item.merk_type}
                                        onChange={(e) =>
                                            updateKendaraan(
                                            index,
                                            "merk_type",
                                            e.target.value
                                            )
                                        }
                                        placeholder="Contoh: TOYOTA AVANZA"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-3
                                            py-2.5
                                            text-[10px]
                                            font-bold
                                            text-[#243b63]
                                            outline-none
                                            focus:border-blue-400
                                        "
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* NAMA PENGAMBIL */}
                <div className="relative">
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        Nama Pengambil
                    </label>

                    <div className="relative">
                        <Search
                            size={14}
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
                            value={searchPengambil}
                            onFocus={() => setShowPengambil(true)}
                            onChange={(e) => {
                            setSearchPengambil(
                                e.target.value.toUpperCase()
                            );
                            setNamaPengambil("");
                            setShowPengambil(true);
                            }}
                            placeholder="Cari nama pengambil"
                            className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            py-2.5
                            pl-9
                            pr-9
                            text-[10px]
                            font-semibold
                            text-[#243b63]
                            outline-none
                            focus:border-blue-400
                            "
                        />

                        <ChevronDown
                            size={14}
                            className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            "
                        />
                    </div>

                    {showPengambil && (
                        <div
                            className="
                            absolute
                            z-20
                            mt-1
                            max-h-52
                            w-full
                            overflow-y-auto
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-lg
                            "
                            >
                            {staffFiltered.length > 0 ? (
                                staffFiltered.map((item, index) => (
                                <button
                                    key={`${item.nama}-${index}`}
                                    type="button"
                                    onClick={() =>
                                      pilihPengambil(item)
                                    }
                                    className="
                                        w-full
                                        border-b
                                        border-slate-100
                                        px-3
                                        py-2.5
                                        text-left
                                        last:border-b-0
                                        hover:bg-slate-50
                                    "
                                    >
                                    <p className="text-[9px] font-extrabold text-[#243b63]">
                                        {item.nama}
                                    </p>

                                    <p className="mt-0.5 text-[8px] text-slate-400">
                                        {item.jabatan || "-"} •{" "}
                                        {item.cabang || "-"}
                                    </p>
                                </button>
                            ))
                            ) : (
                                <div className="px-3 py-4 text-center">
                                    <p className="text-[9px] font-semibold text-slate-400">
                                    Nama tidak ditemukan
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CABANG OTOLINK */}
                <div>
                    <label className="mb-1 block text-[9px] font-bold text-[#243b63]">
                        Cabang Otolink
                    </label>

                    <input
                        type="text"
                        value={cabangOtolink}
                        readOnly
                        placeholder="Otomatis terisi dari nama pengambil"
                        className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-100
                        px-3
                        py-2.5
                        text-[10px]
                        font-bold
                        text-[#243b63]
                        outline-none
                        "
                    />
                </div>

                {/* SUBMIT */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
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
                    {submitting
                        ? "Menyimpan..."
                        : "Submit Pengambilan"
                    }
                </button>

            </div>
        </div>

        {/* SUKSES */}
        {showSuccess && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
                <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
                
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                        <CheckCircle
                            size={42}
                            className="text-green-500"
                            strokeWidth={2.5}
                        />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-[#243b63]">
                        Berhasil!
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        Data pengambilan dokumen berhasil disimpan.
                    </p>

                    <button
                        type="button"
                        onClick={() => setShowSuccess(false)}
                        className="mt-6 w-full rounded-xl bg-[#0b2f66] py-3 text-xs font-bold text-white transition active:scale-[0.98]"
                        >
                        OK
                    </button>
                </div>
            </div>
        )}

    </main>
  );
}