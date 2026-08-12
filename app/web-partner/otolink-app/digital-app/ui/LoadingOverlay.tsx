"use client";

import GlassCard from "../dashboard/GlassCard";
import { Loader2, CircleCheckBig } from "lucide-react";

type LoadingOverlayProps = {
  show: boolean;
  title?: string;
  subtitle?: string;
  success?: boolean;
};

export default function LoadingOverlay({
  show,
  title = "Memproses...",
  subtitle = "Mohon tunggu sebentar",
  success = false,
}: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div
      className="
        fixed inset-0
        z-[999]
        flex items-center justify-center
        bg-black/60
        backdrop-blur-md
        animate-in
        fade-in
        duration-300
      "
    >
      <GlassCard className="w-[340px] p-8 text-center">

        {success ? (
         <CircleCheckBig
         size={52}
         className="mx-auto mb-5 text-green-500"
         />
         ) : (
         <Loader2
         size={52}
         className="mx-auto mb-5 animate-spin text-red-500"
         />
        )}

        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>

       {!success && (
         <p className="mt-2 text-sm text-white/70">
           {subtitle}
         </p>
        )}

      </GlassCard>
    </div>
  );
}