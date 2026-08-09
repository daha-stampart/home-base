"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Trash2,
  Upload,
  ImagePlus,
  Star,
} from "lucide-react";

type Portfolio = {
  id: string;
  judul: string;
  client: string;
  kategori: string;
  deskripsi: string;
  gallery: string;
  cover: string;
  dashboard: boolean;
  tanggal: string;
  folderId: string;
};

type NewPhoto = {
  id: string;
  name: string;
  mimeType: string;
  data: string;
  preview: string;
};

const API_URL =
  "https://script.google.com/macros/s/AKfycbx3TAa2VbIuRzL_PYjEmcEx_mnD3MAVBo4uvHzRMyMTNxPJhBq1sWN0S_qHif_2FePf/exec";

const getImageUrl = (
  fileId: string
) => {
  if (!fileId) return "";

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
};

export function EditPage() {

  const [portfolio, setPortfolio] =
    useState<Portfolio | null>(null);

  const [judul, setJudul] =
    useState("");

  const [client, setClient] =
    useState("");

  const [kategori, setKategori] =
    useState("");

  const [deskripsi, setDeskripsi] =
    useState("");

  const [dashboard, setDashboard] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] = 
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // Foto lama yang akan dihapus
  const [deletedGallery, setDeletedGallery] =
    useState<string[]>([]);

  // Foto baru
  const [newPhotos, setNewPhotos] =
    useState<NewPhoto[]>([]);

  // Cover lama
  const [selectedOldCover, setSelectedOldCover] =
    useState("");

  // Cover foto baru
  const [selectedNewCover, setSelectedNewCover] =
    useState<number | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  // =========================================
  // ID PORTFOLIO
  // =========================================

    const searchParams = useSearchParams();
    const portfolioId = searchParams.get("id") || "";

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    const loadPortfolio = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API_URL}?action=getPortfolio&id=${encodeURIComponent(
              portfolioId
            )}`,
            {
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil data desain."
          );
        }

        const result =
          await response.json();

        if (
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.error ||
              "Data desain tidak ditemukan."
          );
        }

        const data: Portfolio =
          result.data;

        setPortfolio(data);

        setJudul(
          data.judul || ""
        );

        setClient(
          data.client || ""
        );

        setKategori(
          data.kategori || ""
        );

        setDeskripsi(
          data.deskripsi || ""
        );

        setDashboard(
          Boolean(data.dashboard)
        );

        setSelectedOldCover(
          data.cover || ""
        );

      } catch (err) {

        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan."
        );

      } finally {

        setLoading(false);

      }

    };

    loadPortfolio();

  }, []);

  // =========================================
  // GALLERY LAMA
  // =========================================

  const galleryIds =
    portfolio?.gallery
      ? portfolio.gallery
          .split(/\r?\n/)
          .map(
            (id) =>
              id.trim()
          )
          .filter(Boolean)
      : [];

  // =========================================
  // TOGGLE HAPUS FOTO
  // =========================================

  const toggleDeletePhoto = (
    fileId: string
  ) => {

    setDeletedGallery(
      (current) => {

        if (
          current.includes(fileId)
        ) {

          return current.filter(
            (id) =>
              id !== fileId
          );

        }

        return [
          ...current,
          fileId,
        ];

      }
    );

    // Kalau foto yang dihapus
    // adalah cover lama,
    // kosongkan pilihan cover.
    if (
      selectedOldCover === fileId
    ) {

      setSelectedOldCover("");

    }

  };

  // =========================================
  // UPLOAD FOTO
  // =========================================

  const handleFiles = async (
    files: FileList | null
  ) => {

    if (!files) return;

    setError("");

    const selected =
      Array.from(files);

    try {

      const converted =
        await Promise.all(
          selected.map(
            (file) =>
              new Promise<NewPhoto>(
                (
                  resolve,
                  reject
                ) => {

                  const reader =
                    new FileReader();

                  reader.onload =
                    () => {

                      const result =
                        String(
                          reader.result ||
                            ""
                        );

                      const base64 =
                        result.includes(
                          ","
                        )
                          ? result.split(
                              ","
                            )[1]
                          : result;

                      resolve({
                        id:
                          `${Date.now()}-${Math.random()}`,

                        name:
                          file.name,

                        mimeType:
                          file.type ||
                          "image/jpeg",

                        data:
                          base64,

                        preview:
                          URL.createObjectURL(
                            file
                          ),
                      });

                    };

                  reader.onerror =
                    () => {

                      reject(
                        new Error(
                          `Gagal membaca ${file.name}`
                        )
                      );

                    };

                  reader.readAsDataURL(
                    file
                  );

                }
              )
          )
        );

      setNewPhotos(
        (current) => [
          ...current,
          ...converted,
        ]
      );

    } catch (err) {

      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Gagal membaca foto."
      );

    }

  };

  // =========================================
  // HAPUS FOTO BARU
  // =========================================

  const removeNewPhoto = (
    index: number
  ) => {

    setNewPhotos(
      (current) =>
        current.filter(
          (_, i) =>
            i !== index
        )
    );

    if (
      selectedNewCover === index
    ) {

      setSelectedNewCover(
        null
      );

    } else if (
      selectedNewCover !== null &&
      selectedNewCover > index
    ) {

      setSelectedNewCover(
        selectedNewCover - 1
      );

    }

  };

  // =========================================
  // PILIH COVER FOTO LAMA
  // =========================================

  const chooseOldCover = (
    fileId: string
  ) => {

    if (
      deletedGallery.includes(
        fileId
      )
    ) {
      return;
    }

    setSelectedOldCover(
      fileId
    );

    setSelectedNewCover(
      null
    );

  };

  // =========================================
  // PILIH COVER FOTO BARU
  // =========================================

  const chooseNewCover = (
    index: number
  ) => {

    setSelectedNewCover(
      index
    );

    setSelectedOldCover(
      ""
    );

  };

 const handleDelete = async () => {
  if (!portfolio) return;

  const confirmed = window.confirm(
    `Yakin ingin menghapus desain "${portfolio.judul}"?\n\nSemua data, foto, cover, dan folder desain ini akan dihapus.`
  );

  if (!confirmed) return;

  try {
    setDeleting(true);
    setError("");
    setSuccess("");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type":
          "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "deletePortfolio",
        portfolioId: portfolio.id,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Gagal menghubungi server."
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.error ||
          result.message ||
          "Gagal menghapus desain."
      );
    }

    window.location.href =
      "/admin/portofolio/kelola";

  } catch (err) {
    console.error(
      "ERROR DELETE:",
      err
    );

    setError(
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan saat menghapus desain."
    );

  } finally {
    setDeleting(false);
  }
};

  // =========================================
  // SAVE
  // =========================================

  const handleSave = async () => {

    if (!portfolio) {
      return;

    }

    try {

      setSaving(true);

      setError("");

      setSuccess("");

      // =====================================
      // FOTO LAMA YANG DIPERTAHANKAN
      // =====================================

      const keepGallery =
        galleryIds.filter(
          (id) =>
            !deletedGallery.includes(
              id
            )
        );

      // =====================================
      // VALIDASI FOTO
      // =====================================

      const finalPhotoCount =
        keepGallery.length +
        newPhotos.length;

      if (
        finalPhotoCount === 0
      ) {

        throw new Error(
          "Desain harus memiliki minimal satu foto."
        );

      }

      // =====================================
      // VALIDASI COVER
      // =====================================

      if (
        selectedNewCover === null &&
        !selectedOldCover
      ) {

        throw new Error(
          "Silakan pilih cover."
        );

      }

      // =====================================
      // PAYLOAD
      // =====================================

      const payload: any = {

        action:
          "updatePortfolio",

        // ID TETAP
        portfolioId:
          portfolio.id,

        // DATA
        title:
          judul.trim(),

        client:
          client.trim(),

        category:
          kategori.trim(),

        description:
          deskripsi.trim(),

        showOnDashboard:
          dashboard,

        // GALLERY LAMA
        keepGallery,

        // FOTO YANG DIHAPUS
        deleteGallery:
          deletedGallery,

        // FOTO BARU
        files:
          newPhotos.map(
            (photo) => ({
              name:
                photo.name,

              mimeType:
                photo.mimeType,

              data:
                photo.data,
            })
          ),

        // COVER FOTO LAMA
        coverFileId:
          selectedOldCover,

        // COVER FOTO BARU
        coverNewIndex:
          selectedNewCover,
      };

      console.log(
        "UPDATE PORTFOLIO:",
        payload
      );

      // =====================================
      // SEND
      // =====================================

      const response =
        await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      if (!response.ok) {

        throw new Error(
          "Gagal menghubungi server."
        );

      }

      const result =
        await response.json();

      console.log(
        "UPDATE RESPONSE:",
        result
      );

      if (!result.success) {

        throw new Error(
          result.error ||
            result.message ||
            "Gagal menyimpan perubahan."
        );

      }

      // =====================================
      // UPDATE STATE
      // =====================================

      setPortfolio(
        (current) => {

          if (!current) {
            return current;
          }

          return {

            ...current,

            judul:
              judul.trim(),

            client:
              client.trim(),

            kategori:
              kategori.trim(),

            deskripsi:
              deskripsi.trim(),

            dashboard,

            gallery:
              result.gallery
                ? result.gallery.join(
                    "\n"
                  )
                : current.gallery,

            cover:
              result.cover ||
              current.cover,

          };

        }
      );

      // =====================================
      // RESET FOTO
      // =====================================

      setDeletedGallery(
        []
      );

      setNewPhotos(
        []
      );

      if (
        result.cover
      ) {

        setSelectedOldCover(
          result.cover
        );

      }

      setSelectedNewCover(
        null
      );

      // =====================================
      // SUCCESS
      // =====================================

      setSuccess(
        "Perubahan berhasil disimpan."
      );

      console.log(
        "NOTIF SUKSES SET"
      );

    } catch (err) {

      console.error(
        "ERROR UPDATE:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan."
      );

    } finally {

      setSaving(false);

    }

  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <main className="min-h-screen bg-[#07090f] text-white">

        <div className="flex min-h-screen items-center justify-center">

          <p className="text-sm text-zinc-500">
            Memuat data desain...
          </p>

        </div>

      </main>
    );

  }

  // =========================================
  // ERROR LOAD
  // =========================================

  if (
    error &&
    !portfolio
  ) {

    return (
      <main className="min-h-screen bg-[#07090f] text-white">

        <section className="mx-auto max-w-4xl px-6 py-10">

          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6 text-sm text-red-400">

            {error}

          </div>

        </section>

      </main>
    );

  }

  if (!portfolio) {
    return null;
  }

  // =========================================
  // UI
  // =========================================

  return (

    <main className="min-h-screen bg-[#07090f] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]/95 backdrop-blur">

        <div className="mx-auto flex max-w-4xl items-center gap-5 px-6 py-5">

          <Link
            href="/admin/portofolio/kelola"
            className="-ml-30 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >

            <ArrowLeft size={17} />

            Kembali

          </Link>

          <div>

            <h1 className="ml-30 text-xl font-semibold">
              Edit Desain
            </h1>

            <p className="ml-30 text-xs text-zinc-500">
              Kelola karya portofolio Daha.Stampart
            </p>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <section className="mx-auto max-w-4xl px-6 py-10">

        <div className="mb-8">

          <h2 className="text-2xl font-semibold">
            {portfolio.judul}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            ID: {portfolio.id}
          </p>

        </div>

        {/* ERROR */}

        {error && (

          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-5 text-sm text-red-400">

            {error}

          </div>

        )}

        <div className="space-y-6">

          {/* =================================
              COVER
          ================================= */}

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">

            <div className="mb-5">

              <h3 className="text-base font-semibold">
                Cover
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Klik foto untuk menjadikannya cover.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

              {/* FOTO LAMA */}

              {galleryIds.map(
                (fileId, index) => {

                  const deleted =
                    deletedGallery.includes(
                      fileId
                    );

                  const isCover =
                    selectedNewCover === null &&
                    selectedOldCover ===
                      fileId &&
                    !deleted;

                  return (

                    <div
                      key={fileId}
                      className={`relative overflow-hidden rounded-xl border ${
                        isCover
                          ? "border-red-500"
                          : deleted
                          ? "border-red-500/40 opacity-40"
                          : "border-white/10"
                      } bg-black/20`}
                    >

                      <img
                        src={getImageUrl(
                          fileId
                        )}
                        alt={`${portfolio.judul} - ${
                          index + 1
                        }`}
                        referrerPolicy="no-referrer"
                        className="aspect-square w-full object-cover"
                      />

                      {/* COVER */}

                      {isCover && (

                        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-[9px] font-semibold">

                          <Star size={10} />

                          COVER

                        </div>

                      )}

                      {/* DELETED */}

                      {deleted && (

                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">

                          <span className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-semibold">

                            AKAN DIHAPUS

                          </span>

                        </div>

                      )}

                      {/* ACTION */}

                      <div className="absolute bottom-2 left-2 right-2 flex gap-2">

                        {!deleted && (

                          <button
                            type="button"
                            onClick={() =>
                              chooseOldCover(
                                fileId
                              )
                            }
                            className="flex h-8 flex-1 items-center justify-center gap-1 rounded-lg bg-black/70 text-[10px] text-white backdrop-blur hover:bg-black"
                          >

                            <Star size={12} />

                            Cover

                          </button>

                        )}

                        <button
                          type="button"
                          onClick={() =>
                            toggleDeletePhoto(
                              fileId
                            )
                          }
                          className={`flex h-8 ${
                            deleted
                              ? "flex-1"
                              : ""
                          } items-center justify-center gap-1 rounded-lg ${
                            deleted
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/80 text-white"
                          } text-[10px] backdrop-blur`}
                        >

                          <Trash2 size={12} />

                          {deleted
                            ? "Batal Hapus"
                            : "Hapus"}

                        </button>

                      </div>

                    </div>

                  );

                }
              )}

              {/* FOTO BARU */}

              {newPhotos.map(
                (photo, index) => {

                  const isCover =
                    selectedNewCover ===
                    index;

                  return (

                    <div
                      key={photo.id}
                      className={`relative overflow-hidden rounded-xl border ${
                        isCover
                          ? "border-red-500"
                          : "border-emerald-500/30"
                      } bg-black/20`}
                    >

                      <img
                        src={photo.preview}
                        alt={photo.name}
                        className="aspect-square w-full object-cover"
                      />

                      {/* NEW */}

                      <div className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-1 text-[9px] font-semibold text-black">

                        FOTO BARU

                      </div>

                      {/* COVER */}

                      {isCover && (

                        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-red-500 px-2 py-1 text-[9px] font-semibold">

                          <Star size={10} />

                          COVER

                        </div>

                      )}

                      <div className="absolute bottom-2 left-2 right-2 flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            chooseNewCover(
                              index
                            )
                          }
                          className="flex h-8 flex-1 items-center justify-center gap-1 rounded-lg bg-black/70 text-[10px] text-white backdrop-blur"
                        >

                          <Star size={12} />

                          Cover

                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeNewPhoto(
                              index
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/80 text-white"
                        >

                          <Trash2 size={12} />

                        </button>

                      </div>

                    </div>

                  );

                }
              )}

              {/* UPLOAD */}

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/[0.02] text-zinc-500 transition hover:border-red-500/50 hover:bg-red-500/[0.03] hover:text-red-400"
              >

                <ImagePlus size={28} />

                <span className="text-xs font-medium">
                  Tambah Foto
                </span>

              </button>

            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {

                handleFiles(
                  e.target.files
                );

                e.target.value = "";

              }}
            />

          </div>

          {/* =================================
              FORM DATA
          ================================= */}

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">

            <div className="mb-6">

              <h3 className="text-base font-semibold">
                Informasi Desain
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Ubah informasi desain kemudian simpan perubahan.
              </p>

            </div>

            <div className="space-y-5">

              {/* JUDUL */}

              <div>

                <label className="text-sm font-medium text-zinc-400">
                  Judul Desain
                </label>

                <input
                  type="text"
                  value={judul}
                  onChange={(e) =>
                    setJudul(
                      e.target.value
                    )
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-red-500/50"
                />

              </div>

              {/* CLIENT */}

              <div>

                <label className="text-sm font-medium text-zinc-400">
                  Client
                </label>

                <input
                  type="text"
                  value={client}
                  onChange={(e) =>
                    setClient(
                      e.target.value
                    )
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-red-500/50"
                />

              </div>

              {/* KATEGORI */}

              <div>

                <label className="text-sm font-medium text-zinc-400">
                  Kategori
                </label>

                <select
                  value={kategori}
                  onChange={(e) =>
                    setKategori(
                      e.target.value
                    )
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101218] px-4 text-sm text-white outline-none transition focus:border-red-500/50"
                >

                  <option value="">
                    Pilih kategori
                  </option>

                  <option value="Desain Grafis">
                    Desain Grafis
                  </option>

                  <option value="Branding & Identity">
                    Branding & Identity
                  </option>

                  <option value="Konten Visual">
                    Konten Visual
                  </option>

                  <option value="Produk Lain">
                    Produk Lain
                  </option>

                </select>

              </div>

              {/* DESKRIPSI */}

              <div>

                <label className="text-sm font-medium text-zinc-400">
                  Deskripsi
                </label>

                <textarea
                  value={deskripsi}
                  onChange={(e) =>
                    setDeskripsi(
                      e.target.value
                    )
                  }
                  rows={7}
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/50"
                />

              </div>

              {/* DASHBOARD */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.06] bg-black/20 p-4">

                <input
                  type="checkbox"
                  checked={dashboard}
                  onChange={(e) =>
                    setDashboard(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-red-500"
                />

                <div>

                  <p className="text-sm font-medium text-white">
                    Tampilkan di Dashboard
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Maksimal 5 desain dapat ditampilkan di dashboard.
                  </p>

                </div>

              </label>

            </div>

          </div>

          {/* =================================
              SUCCESS
          ================================= */}

          {success && (

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-400">

              <CheckCircle2
                size={20}
                className="shrink-0"
              />

              <div>

                <p className="font-semibold">
                  Berhasil
                </p>

                <p className="mt-1 text-emerald-400/80">
                  {success}
                </p>

              </div>

            </div>

          )}

          {/* =================================
              SAVE
          ================================= */}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-semibold text-white shadow-lg shadow-red-500/10 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Save size={17} />

            {saving
              ? "Menyimpan..."
              : "Simpan Perubahan"}

          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
            <Trash2 size={16} />

            {deleting
            ? "Menghapus Desain..."
            : "Hapus Desain"}
          </button>

        </div>

      </section>

    </main>

  );
}
export default function EditPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#07090f] text-white">
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-zinc-500">
              Memuat halaman edit...
            </p>
          </div>
        </main>
      }
    >
      <EditPage />
    </Suspense>
  );
}