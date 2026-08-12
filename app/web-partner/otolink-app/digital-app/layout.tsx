"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BASE_PATH = "/web-partner/otolink-app/digital-app";

export default function DigitalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = () => {
      // =====================================================
      // LANDING PAGE = PUBLIC
      // =====================================================

      if (pathname === BASE_PATH || pathname === `${BASE_PATH}/`) {
        return true;
      }

      // =====================================================
      // SEMUA HALAMAN LAIN = WAJIB LOGIN
      // =====================================================

      const userData = sessionStorage.getItem("user");

      if (!userData) {
        window.location.replace(BASE_PATH);
        return false;
      }

      // Pastikan isi session valid
      try {
        JSON.parse(userData);
        return true;
      } catch (error) {
        console.error("Session user tidak valid:", error);

        sessionStorage.removeItem("user");
        window.location.replace(BASE_PATH);

        return false;
      }
    };

    // Check saat route berubah
    checkSession();

    // =====================================================
    // CHROME BACK / FORWARD / BFCache
    // =====================================================

    const handlePageShow = () => {
      checkSession();
    };

    // =====================================================
    // BROWSER BACK / FORWARD
    // =====================================================

    const handlePopState = () => {
      checkSession();
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return <>{children}</>;
}