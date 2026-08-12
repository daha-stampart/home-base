"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  href?: string;
};

export default function BackButton({
 href,

}: BackButtonProps) { 

 const router = useRouter();

 return (
   <button
     type="button"
     onClick={() => {
       if (href) {
         router.push(href);
         } else {
         router.back();
       }
     }}
     className="
     mt-2
     mx-auto
     flex
     w-56
     items-center
     justify-start
     pl-14
     gap-2
     rounded-[20px]
     border
     border-red-500/40
     bg-red-600/50
     px-5
     py-4
     font-semibold
     text-red-100
     transition-all
     duration-200
     active:scale-[0.98]
     active:bg-red-600/40
     "
     >
     <ArrowLeft size={18} />
     <span>Kembali</span>
   </button>
  );
}