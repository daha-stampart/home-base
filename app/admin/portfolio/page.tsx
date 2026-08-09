"use client";

import { 
 ArrowLeft,
 ChevronDown,
 Upload,
} from "lucide-react";

import { useState } from "react";

export default function AdminPortfolioPage() {
 const [categoryOpen, setCategoryOpen] = useState(false);
 const [category, setCategory] = useState("");
 const [designImages, setDesignImages] = useState<File[]>([]);
 const [coverIndex, setCoverIndex] = useState(0);
    
  return (
     <main className="min-h-screen bg-[#07090f] text-white">
         {/* HEADER */}
         <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090f]/90">
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
                         Kelola karya portfolio
                     </p>
                 </div>
             </div>
         </header>


         {/* CONTENT */}
         <section className="mx-auto max-w-[1200px] px-6 py-10">
             <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                 <h2 className="text-xl font-semibold">
                     Tambah Portfolio
                  </h2>

                 <p className="mt-1 text-sm text-zinc-500">
                     Tambahkan karya baru ke portfolio Daha.Stampart.
                 </p>

                 <div className="mt-6">
                     <label className="mb-2 block text-sm font-medium text-zinc-300">
                         Judul Desain
                     </label>

                     <input
                         type="text"
                         placeholder="Contoh: Logo Daha Stampart"
                         className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
                        />
                 </div>

                 <div className="mt-6">
                     <label className="mb-2 block text-sm font-medium text-zinc-300">
                         Pilih Kategori
                     </label>

                     <button
                         type="button"
                         onClick={() => setCategoryOpen(!categoryOpen)}
                         className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#0b0d14] px-4 py-3 text-sm text-white outline-none transition hover:border-white/20 focus:border-red-500/50"
                         >
                         <span className={category ? "text-white" : "text-zinc-600"}>
                             {category || "Pilih kategori"}
                         </span>

                         <ChevronDown
                             size={16}
                             className={`text-zinc-500 transition-transform ${
                             categoryOpen ? "rotate-180" : ""
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

                 <div className="mt-5">
                     <label className="mb-2 block text-sm font-medium text-zinc-300">
                         Credit / Ft.
                     </label>

                     <input
                         type="text"
                         placeholder="Contoh: ft. Daha Stampart"
                         className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
                        />
                 </div>

                 <div className="mt-8">
                     <label className="mb-2 block text-sm font-medium text-zinc-300">
                         Deskripsi Produk
                     </label>

                     <textarea
                         rows={8}
                         placeholder="Tulis deskripsi lengkap mengenai desain atau project ini..."
                         className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500/50"
                        />

                     <p className="mt-2 text-xs text-zinc-600">
                         Gunakan deskripsi yang lengkap untuk menjelaskan project, konsep,
                         proses, atau informasi lainnya.
                     </p>
                 </div>

                 <div className="mt-8">
                     <label className="mb-2 block text-sm font-medium text-zinc-300">
                         Hasil Design
                     </label>

                     <label className="flex min-h-[10x] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/20 px- py-2 text-center transition hover:border-red-500/50 hover:bg-red-500/[0.03]">
                         <div className="mt-2 mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                             <Upload size={18} />
                         </div>

                         <p className="text-sm font-medium text-zinc-300">
                             Upload hasil design
                         </p>

                         <p className="mt-1 text-xs text-zinc-600">
                             Bisa pilih beberapa gambar sekaligus
                         </p>

                         <input
                             type="file"
                             accept="image/png,image/jpeg,image/webp"
                             multiple
                             className="hidden"
                             onChange={(event) => {
                                 const files = Array.from(event.target.files || []);
                                     setDesignImages((current) => [
                                     ...current,
                                     ...files,
                                    ]);
                                }}
                            />
                     </label>
                     
                     {designImages.length > 0 && (
                         <div className="mt-5">
                             {/* HEADER IMAGE */}
                             <div className="mb-4 flex items-center justify-between">
                                 <p className="text-xs text-zinc-500">
                                     {designImages.length} gambar dipilih
                                 </p>

                                 <div className="flex items-center gap-2">
                                     <label className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-red-500/40 hover:text-white">
                                         + Upload

                                         <input
                                             type="file"
                                             accept="image/png,image/jpeg,image/webp"
                                             multiple
                                             className="hidden"
                                             onChange={(event) => {
                                                 const files = Array.from(event.target.files || []);
                                                 setDesignImages((current) => [
                                                     ...current,
                                                     ...files,
                                                    ]);
                                                 event.target.value = "";
                                                }}
                                            />
                                     </label>

                                     <button
                                         type="button"
                                         onClick={() => {
                                              setDesignImages([]);
                                              setCoverIndex(0);
                                            }}
                                         className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-500/10"
                                         >
                                         Clear Image
                                     </button>
                                 </div>
                             </div>

                             {/* PREVIEW */}
                             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                             {designImages.map((file, index) => (
                                 <div
                                     key={`${file.name}-${index}`}
                                         className={`overflow-hidden rounded-xl border bg-white/[0.03] ${
                                         coverIndex === index
                                         ? "border-red-500/60"
                                         : "border-white/10"
                                        }`}
                                     >

                                     {/* IMAGE */}
                                     <img
                                         src={URL.createObjectURL(file)}
                                         alt={file.name}
                                         className="aspect-square w-full object-cover"
                                        />

                                     {/* INFO */}
                                     <div className="p-3">
                                         <p className="truncate text-xs text-zinc-400">
                                             {file.name}
                                         </p>

                                         {/* COVER BUTTON */}

                                         <button
                                             type="button"
                                             onClick={() => setCoverIndex(index)}
                                                 className={`mt-3 w-full rounded-lg px-3 py-2 text-xs font-medium transition ${
                                                 coverIndex === index
                                                 ? "bg-red-500 text-white"
                                                  : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-red-500/40 hover:text-white"
                                                }`}
                                             >
                                             {coverIndex === index ? "★ Cover" : "Jadikan Cover"}
                                         </button>
                                     </div>
                                 </div>                            
                                 ))}
                             </div>
                         </div>
                        )}
                 </div>

                 {/* Akhir Menu Upload */}
             </div>
         </section>

        </main>
    );
}