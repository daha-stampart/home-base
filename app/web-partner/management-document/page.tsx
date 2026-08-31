"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  User,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  X,
  Check,
  Loader2,
} from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzb-cstuDVHCxESFXpfmZdAKfqMMKMQmJ1pwLPGxJxcznGTgqFdRGITbLsnDgyixcxR/exec";

type UserData = {
  user_id: string;
  level: string;
  nama: string;
  jabatan: string;
  cabang: string;
  status: string;
};

export default function ManagementDocumentPage() {
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // BUKA LOGIN
  // =====================================================

  const openLogin = () => {
    setShowLogin(true);
    setErrorMessage("");

    setTimeout(() => {
      setLoginVisible(true);
    }, 30);
  };

  // =====================================================
  // TUTUP LOGIN
  // =====================================================

  const closeLogin = () => {
    if (loading || loginSuccess) return;

    setLoginVisible(false);

    setTimeout(() => {
      setShowLogin(false);
      setErrorMessage("");
    }, 400);
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorMessage("");

    if (!username.trim()) {
      setErrorMessage("User ID wajib diisi.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();

      formData.append("action", "login");
      formData.append("user_id", username.trim());
      formData.append("password", password);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();

      console.log("LOGIN RESPONSE:", result);

      if (!result.success) {
        setLoading(false);

        setErrorMessage(
          result.message || "User ID atau password salah."
        );

        return;
      }

      const user: UserData = result.user;

      // Simpan data user
      sessionStorage.setItem(
        "managementDocumentUser",
        JSON.stringify(user)
      );

      // Berhasil
      setLoading(false);
      setLoginSuccess(true);

      // Tunggu animasi checklist
      setTimeout(() => {
        router.push(
          "/web-partner/management-document/dashboard"
        );
      }, 1200);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setLoading(false);

      setErrorMessage(
        "Tidak dapat terhubung ke server."
      );
    }
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0750bd]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <img
        src="/images/m-d/bg-md-otolink.png"
        alt=""
        className="
          fixed
          inset-0
          z-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 flex min-h-[100dvh] w-full justify-center px-4">

        <div className="flex min-h-[100dvh] w-full max-w-[430px] flex-col">

          {/* =================================================
              BRANDING
          ================================================= */}

          <section className="pt-6 text-center">

            <div className="flex justify-center">
              <img
                src="/images/logo-otolink-v2.png"
                alt="Otolink"
                className="
                  w-[155px]
                  object-contain
                  drop-shadow-md
                "
              />
            </div>

            <div className="mt-4">

              <h1
                className="
                  text-[23px]
                  font-extrabold
                  leading-[1.08]
                  tracking-tight
                  text-[#08265a]
                  drop-shadow-sm
                "
              >
                Sistem Manajemen
                <br />
                Dokumen Otolink
              </h1>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[300px]
                  text-[11px]
                  font-medium
                  leading-[1.45]
                  text-[#536785]
                "
              >
                Kelola seluruh data dokumen kendaraan
                <br />
                dengan mudah, aman dan terintegrasi.
              </p>

              <div
                className="
                  mx-auto
                  mt-3
                  h-[3px]
                  w-[48px]
                  rounded-full
                  bg-red-500
                "
              />

            </div>
          </section>

          {/* =================================================
              TOMBOL LOGIN
          ================================================= */}

          {!showLogin && (
            <section className="mt-7 flex justify-center">

              <button
                type="button"
                onClick={openLogin}
                className="
                  group
                  flex
                  h-[46px]
                  w-[190px]
                  items-center
                  justify-center
                  gap-1.5
                  rounded-[10px]
                  bg-[#0759d1]
                  text-[14px]
                  font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(0,50,140,0.25)]
                  transition-all
                  duration-200
                  hover:bg-[#064db7]
                  active:scale-95
                "
              >
                Login

                <ChevronRight
                  size={19}
                  strokeWidth={2.5}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </button>

            </section>
          )}

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          {showLogin && (
            <section className="mt-5 flex justify-center">

              <div
                className={`
                  w-full
                  max-w-[300px]
                  transform
                  transition-all
                  duration-500
                  ease-out
                  ${
                    loginVisible
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-5 scale-95 opacity-0"
                  }
                `}
              >

                <div
                  className="
                    relative
                    rounded-[18px]
                    border
                    border-white
                    bg-white
                    px-3.5
                    py-3.5
                    shadow-[0_15px_40px_rgba(0,35,100,0.22)]
                  "
                >

                  {/* =================================================
                      SUCCESS
                  ================================================= */}

                  {loginSuccess ? (

                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        py-7
                        text-center
                      "
                    >

                      <div
                        className="
                          flex
                          h-[58px]
                          w-[58px]
                          items-center
                          justify-center
                          rounded-full
                          bg-green-50
                          text-green-600
                        "
                      >
                        <Check
                          size={31}
                          strokeWidth={2.5}
                        />
                      </div>

                      <h2
                        className="
                          mt-3
                          text-[18px]
                          font-extrabold
                          text-[#09275a]
                        "
                      >
                        User Terverifikasi
                      </h2>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-slate-500
                        "
                      >
                        Membuka dashboard...
                      </p>

                    </div>

                  ) : (

                    <>

                      {/* CLOSE */}

                      {!loading && (
                        <button
                          type="button"
                          onClick={closeLogin}
                          className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            text-slate-400
                            transition
                            hover:bg-slate-100
                          "
                        >
                          <X size={15} />
                        </button>
                      )}

                      {/* ICON */}

                      <div className="flex justify-center">

                        <div
                          className="
                            flex
                            h-[42px]
                            w-[42px]
                            items-center
                            justify-center
                            rounded-full
                            bg-[#edf4ff]
                            text-[#0759c9]
                          "
                        >
                          <FileText
                            size={21}
                            strokeWidth={1.8}
                          />
                        </div>

                      </div>

                      {/* TITLE */}

                      <div className="mt-1.5 text-center">

                        <h2
                          className="
                            text-[19px]
                            font-extrabold
                            tracking-tight
                            text-[#09275a]
                          "
                        >
                          Login
                        </h2>

                        <p
                          className="
                            mt-0.5
                            text-[9px]
                            text-[#66758e]
                          "
                        >
                          Masukkan akun Anda untuk melanjutkan
                        </p>

                      </div>

                      {/* ERROR */}

                      {errorMessage && (
                        <div
                          className="
                            mt-3
                            rounded-[8px]
                            border
                            border-red-100
                            bg-red-50
                            px-3
                            py-2
                            text-center
                          "
                        >
                          <p
                            className="
                              text-[9px]
                              font-medium
                              leading-4
                              text-red-600
                            "
                          >
                            {errorMessage}
                          </p>
                        </div>
                      )}

                      {/* FORM */}

                      <form
                        onSubmit={handleLogin}
                        className="mt-3"
                      >

                        {/* USER ID */}

                        <div>

                          <label
                            htmlFor="username"
                            className="
                              mb-1
                              block
                              text-[10px]
                              font-bold
                              text-[#102852]
                            "
                          >
                            User ID
                          </label>

                          <div className="relative">

                            <User
                              size={14}
                              className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-[#71809a]
                              "
                            />

                            <input
                              id="username"
                              type="text"
                              value={username}
                              onChange={(e) => {
                                setUsername(
                                  e.target.value
                                );
                                setErrorMessage("");
                              }}
                              placeholder="Masukkan User ID"
                              autoComplete="username"
                              disabled={loading}
                              className="
                                h-[40px]
                                w-full
                                rounded-[8px]
                                border
                                border-[#dce3ed]
                                bg-white
                                pl-[36px]
                                pr-3
                                text-[10px]
                                text-[#172b4d]
                                outline-none
                                placeholder:text-[#8a96a9]
                                focus:border-[#1264d5]
                                focus:ring-2
                                focus:ring-blue-500/10
                              "
                            />

                          </div>

                        </div>

                        {/* PASSWORD */}

                        <div className="mt-2.5">

                          <label
                            htmlFor="password"
                            className="
                              mb-1
                              block
                              text-[10px]
                              font-bold
                              text-[#102852]
                            "
                          >
                            Password
                          </label>

                          <div className="relative">

                            <Lock
                              size={14}
                              className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-[#71809a]
                              "
                            />

                            <input
                              id="password"
                              type={
                                showPassword
                                  ? "text"
                                  : "password"
                              }
                              value={password}
                              onChange={(e) => {
                                setPassword(
                                  e.target.value
                                );
                                setErrorMessage("");
                              }}
                              placeholder="Masukkan password"
                              autoComplete="current-password"
                              disabled={loading}
                              className="
                                h-[40px]
                                w-full
                                rounded-[8px]
                                border
                                border-[#dce3ed]
                                bg-white
                                pl-[36px]
                                pr-[40px]
                                text-[10px]
                                text-[#172b4d]
                                outline-none
                                placeholder:text-[#8a96a9]
                                focus:border-[#1264d5]
                                focus:ring-2
                                focus:ring-blue-500/10
                              "
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword(
                                  !showPassword
                                )
                              }
                              disabled={loading}
                              className="
                                absolute
                                right-1
                                top-1/2
                                flex
                                h-8
                                w-8
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-lg
                                text-[#71809a]
                              "
                            >
                              {showPassword ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                            </button>

                          </div>

                        </div>

                        {/* LOGIN */}

                        <button
                          type="submit"
                          disabled={loading}
                          className="
                            mt-3
                            flex
                            h-[40px]
                            w-full
                            items-center
                            justify-center
                            gap-1.5
                            rounded-[8px]
                            bg-[#0759d1]
                            text-[12px]
                            font-bold
                            text-white
                            shadow-[0_5px_12px_rgba(7,89,209,0.20)]
                            transition-all
                            hover:bg-[#064db7]
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-70
                          "
                        >

                          {loading ? (
                            <>
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />

                              Memverifikasi User...
                            </>
                          ) : (
                            <>
                              Login

                              <ChevronRight
                                size={15}
                                strokeWidth={2.5}
                              />
                            </>
                          )}

                        </button>

                      </form>

                      {/* SECURITY */}

                      <div
                        className="
                          mt-2.5
                          flex
                          items-center
                          justify-center
                          gap-1
                        "
                      >

                        <Lock
                          size={11}
                          className="text-[#71809a]"
                        />

                        <p
                          className="
                            text-center
                            text-[8px]
                            leading-3
                            text-[#71809a]
                          "
                        >
                          Akses terbatas hanya untuk pengguna resmi
                          Otolink.
                        </p>

                      </div>

                    </>
                  )}

                </div>

              </div>

            </section>
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="mt-auto pb-4 pt-4 text-center">

            <p
              className="
                text-[10px]
                font-medium
                text-white
                drop-shadow-md
              "
            >
              © 2026 Otolink - Manajemen Dokumen
            </p>

            <p
              className="
                mt-0.5
                text-[9px]
                text-white/90
                drop-shadow-md
              "
            >
              All rights reserved.
            </p>

          </footer>

        </div>
      </div>
    </main>
  );
}