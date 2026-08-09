import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Halaman login boleh diakses tanpa session
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get("admin_session");

  // Tidak punya session → kembali ke login
  if (!session || session.value !== "authenticated") {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // Halaman admin tidak boleh disimpan browser cache
  const response = NextResponse.next();

  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};