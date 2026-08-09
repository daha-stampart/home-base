"use client";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  ImagePlus,
  Upload,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

type PortfolioImage = {
  id: string;
  file: File;
  preview: string;
};

export default function AdminPortfolioPage() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [coverIndex, setCoverIndex] = useState<number | null>(null);

  const [showOnDashboard, setShowOnDashboard] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  /**
   * Web App URL Apps Script
   *
   * GANTI dengan URL Web App Apps Script
   * yang sudah kita deploy.
   */
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3TAa2VbIuRzL_PYjEmcEx_mnD3MAVBo4uvHzRMyMTNxPJhBq1sWN0S_qHif_2FePf/exec";


  /**
   * Bersihkan preview object URL saat component
   * dibuang agar tidak terjadi memory leak.
   */
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);


  /**
   * Tambahkan banyak gambar sekaligus.
   */
  function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) return;


    const newImages: PortfolioImage[] =
      files.map((file, index) => ({
        id: `${Date.now()}-${index}-${file.name}`,
        file,
        preview: URL.createObjectURL(file),
      }));


    setImages((current) => [
      ...current,
      ...newImages,
    ]);


    event.target.value = "";
  }


  /**
   * Hapus satu gambar.
   */
  function removeImage(index: number) {
    const image = images[index];

    if (image) {
      URL.revokeObjectURL(image.preview);
    }


    setImages((current) =>
      current.filter((_, i) => i !== index)
    );


    /**
     * Sesuaikan index cover setelah gambar dihapus.
     */
    setCoverIndex((currentCover) => {

      if (currentCover === null) {
        return null;
      }

      if (currentCover === index) {
        return null;
      }

      if (currentCover > index) {
        return currentCover - 1;
      }

      return currentCover;
    });
  }


  /**
   * Hapus semua gambar.
   */
  function clearImages() {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setImages([]);
    setCoverIndex(null);
  }


  /**
   * Convert File → Base64.
   *
   * Apps Script menerima data gambar
   * dalam bentuk Base64.
   */
  function fileToBase64(
    file: File
  ): Promise<string> {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = () => {

        const result =
          reader.result as string;

        /**
         * Hapus prefix:
         * data:image/png;base64,
         */
        const base64 =
          result.split(",")[1];

        resolve(base64);
      };


      reader.onerror = () => {
        reject(
          new Error(
            `Gagal membaca file ${file.name}`
          )
        );
      };


      reader.readAsDataURL(file);
    });
  }


  /**
   * SAVE PORTOFOLIO
   */
  async function handleSave() {

    setSaveMessage("");


    /**
     * Validasi Judul.
     */
    if (!title.trim()) {
      setSaveMessage(
        "Judul desain wajib diisi."
      );

      return;
    }


    /**
     * Validasi Kategori.
     */
    if (!category) {
      setSaveMessage(
        "Kategori wajib dipilih."
      );

      return;
    }


    /**
     * Validasi Client.
     */
    if (!client.trim()) {
      setSaveMessage(
        "Client wajib diisi."
      );

      return;
    }


    /**
     * Minimal satu gambar.
     */
    if (images.length === 0) {
      setSaveMessage(
        "Upload minimal 1 gambar."
      );

      return;
    }


    /**
     * Cover wajib dipilih.
     */
    if (coverIndex === null) {
      setSaveMessage(
        "Pilih 1 gambar sebagai Cover."
      );

      return;
    }


    setIsSaving(true);
    setSaveMessage(
      "Menyiapkan gambar..."
    );


    try {

      /**
       * Convert semua gambar
       * menjadi Base64.
       */
      const uploadedFiles =
        await Promise.all(
          images.map(async (image) => {

            const base64 =
              await fileToBase64(
                image.file
              );


            return {
              name: image.file.name,
              mimeType:
                image.file.type ||
                "image/jpeg",
              data: base64,
            };

          })
        );


      setSaveMessage(
        "Menyimpan portofolio..."
      );


      /**
       * Kirim ke Apps Script.
       */
      const response =
        await fetch(
          SCRIPT_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body: JSON.stringify({

              action:
                "savePortfolio",

              title:
                title.trim(),

              client:
                client.trim(),

              category,

              description:
                description.trim(),

              showOnDashboard,

              coverIndex,

              files:
                uploadedFiles,

            }),
          }
        );


      const result =
        await response.json();


      if (!result.success) {

        throw new Error(
          result.error ||
          "Gagal menyimpan porotfolio."
        );

      }


      setSaveMessage(
        "Portofolio berhasil disimpan."
      );


      /**
       * Reset form setelah berhasil.
       */
      setTitle("");
      setClient("");
      setCategory("");
      setDescription("");
      setShowOnDashboard(false);

      clearImages();


    } catch (error) {

      console.error(error);

      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan."
      );

    } finally {

      setIsSaving(false);

    }

  }


  return (
    <main className="min-h-screen bg-[#07090f] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]">

        <div className="mx-auto flex h-20 max-w-[1200px] items-center px-6">

          <a
            href="/admin"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />

            Kembali
          </a>


          <div className="ml-6">

            <h1 className="text-lg font-semibold">
              Admin Page
            </h1>

            <p className="text-xs text-zinc-500">
              Kelola karya Daha Stampart
            </p>

          </div>

        </div>

      </header>


      {/* CONTENT */}

      <section className="mx-auto max-w-[1200px] px-6 py-10">

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

          <h2 className="text-xl font-semibold">
            Tambah Karya
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Tambahkan karya baru ke portofolio Daha.Stampart.
          </p>


          {/* JUDUL */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Judul Desain
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Contoh: Daha X-Banner"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
            />

          </div>


          {/* KATEGORI */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Pilih Kategori
            </label>


            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setCategoryOpen(
                    !categoryOpen
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#0b0d14] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-red-500/50"
              >

                <span
                  className={
                    category
                      ? "text-white"
                      : "text-zinc-600"
                  }
                >
                  {category ||
                    "Pilih kategori"}
                </span>


                <ChevronDown
                  size={16}
                  className={`text-zinc-500 transition-transform ${
                    categoryOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>


              {categoryOpen && (

                <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0b0d14] p-1 shadow-2xl shadow-black/40">

                  {[
                    "Desain Grafis",
                    "Branding & Identity",
                    "Konten Visual",
                    "Produk Lain",
                  ].map((item) => (

                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setCategory(item);
                        setCategoryOpen(false);
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-500"
                    >
                      {item}
                    </button>

                  ))}

                </div>

              )}

            </div>

          </div>


          {/* CLIENT */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Client
            </label>

            <input
              type="text"
              value={client}
              onChange={(event) =>
                setClient(event.target.value)
              }
              placeholder="Contoh: PT Ind Merdeka"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
            />

          </div>


          {/* DESKRIPSI */}

          <div className="mt-8">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Deskripsi Produk
            </label>

            <textarea
              rows={8}
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Tulis deskripsi lengkap mengenai desain atau project ini..."
              className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
            />

            <p className="mt-2 text-xs text-zinc-600">
              Gunakan deskripsi yang lengkap untuk menjelaskan project,
              konsep, proses, atau informasi lainnya.
            </p>

          </div>


          {/* UPLOAD GALLERY */}

          <div className="mt-8">

            <div className="mb-4">

              <label className="block text-sm font-medium text-zinc-300">
                Foto Portofolio
              </label>

              <p className="mt-1 text-xs text-zinc-600">
                Upload beberapa foto sekaligus. Pilih satu foto sebagai Cover.
              </p>

            </div>


            {/* UPLOAD BOX */}

            <label className="mx-auto flex min-h-[110px] w-full max-w-[400px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-6 text-center transition hover:border-red-500/50 hover:bg-red-500/[0.03]">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <ImagePlus size={24} />
              </div>

              <p className="text-sm font-medium text-zinc-300">
                Upload Desain
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Bisa pilih banyak gambar sekaligus
              </p>

              <p className="mt-1 text-xs text-zinc-700">
                PNG, JPG, JPEG, WEBP
              </p>


              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                className="hidden"
                onChange={
                  handleImageUpload
                }
              />

            </label>


            {/* PREVIEW */}

            {images.length > 0 && (

              <div className="mt-6">

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-zinc-300">
                      Preview Foto
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {images.length} gambar dipilih
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={clearImages}
                    className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-500/10"
                  >
                    Hapus Semua
                  </button>

                </div>


                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                  {images.map(
                    (image, index) => {

                      const isCover =
                        coverIndex === index;


                      return (

                        <div
                          key={image.id}
                          className={`overflow-hidden rounded-xl border bg-white/[0.03] transition ${
                            isCover
                              ? "border-red-500/60"
                              : "border-white/10"
                          }`}
                        >

                          <div className="relative aspect-[4/3] bg-black">

                            <img
                              src={image.preview}
                              alt={image.file.name}
                              className="h-full w-full object-cover"
                            />


                            {/* COVER BADGE */}

                            {isCover && (

                              <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg">

                                <Check size={12} />

                                COVER

                              </div>

                            )}


                            {/* DELETE */}

                            <button
                              type="button"
                              onClick={() =>
                                removeImage(index)
                              }
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
                            >
                              <X size={15} />
                            </button>

                          </div>


                          {/* CARD FOOTER */}

                          <div className="border-t border-white/10 p-3">

                            <p className="truncate text-xs text-zinc-500">
                              {image.file.name}
                            </p>


                            <button
                              type="button"
                              onClick={() =>
                                setCoverIndex(
                                  index
                                )
                              }
                              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                                isCover
                                  ? "bg-red-500 text-white"
                                  : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-red-500/40 hover:text-red-400"
                              }`}
                            >

                              {isCover ? (
                                <>
                                  <Check
                                    size={14}
                                  />
                                  Cover Terpilih
                                </>
                              ) : (
                                "Jadikan Cover"
                              )}

                            </button>

                          </div>

                        </div>

                      );

                    }
                  )}

                </div>

              </div>

            )}

          </div>


          {/* DASHBOARD */}

          <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-4">

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                checked={
                  showOnDashboard
                }
                onChange={(event) =>
                  setShowOnDashboard(
                    event.target.checked
                  )
                }
                className="mt-1 h-4 w-4 accent-red-500"
              />


              <div>

                <p className="text-sm font-medium text-zinc-300">
                  Tampilkan di Dashboard
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-600">
                  Dashboard hanya dapat menampilkan maksimal 5 desain.
                </p>

              </div>

            </label>

          </div>


          {/* SAVE MESSAGE */}

          {saveMessage && (

            <div
              className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                saveMessage.includes(
                  "berhasil"
                )
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                  : "border-red-500/20 bg-red-500/5 text-red-400"
              }`}
            >
              {saveMessage}
            </div>

          )}


          {/* SAVE BUTTON */}

          <div className="mt-8 flex justify-end">

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Upload size={17} />
                  Simpan Portofolio
                </>
              )}

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}