import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "../lib/api/user";
import LoadingOverlay from "../ui/LoadingOverlay";

type LoginCardProps = {
 show: boolean;
};

export default function LoginCard({ show }: LoginCardProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  async function handleLogin() {
   setLoading(true);

   try {
    const users = await fetchUsers();

    const user = users.find(
      (u: any) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
     setLoading(false);

     alert("UserID salah, Password salah, atau Akun Tidak Aktif");
     return;
    }

    sessionStorage.setItem(
     "user",
     JSON.stringify(user)
    );

    await new Promise((resolve) => setTimeout(resolve, 250));
    setSuccess(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/web-partner/otolink-app/digital-app/dashboard");

   } catch (err) {
    setLoading(false);

    console.error(err);
    alert("Gagal terhubung ke server");
   }
  }
  
  return (
    <div
       className={`
       w-full
       max-w-md
       rounded-[30px]
       border
       border-white/20
       bg-white/10
       p-6
       backdrop-blur-2xl
       shadow-[0_35px_90px_rgba(0,0,0,.45)]
       transition-all
       duration-700
       ease-out
       sm:p-8
       lg:p-10

        ${
          show
            ? "translate-x-0 scale-100 opacity-100"
            : "translate-x-20 scale-95 opacity-0 pointer-events-none"
        }
      `}
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        Login Inspector
      </h2>

      <input
       type="text"
       placeholder="User ID"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       className="mb-5 h-14 w-full rounded-xl border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 outline-none"
     />

      <input
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="mb-6 h-14 w-full rounded-xl border border-white/20 bg-white/10 px-5 text-white placeholder:text-white/50 outline-none"
     />

      <button
       onClick={handleLogin} 
       className="h-14 w-full rounded-xl bg-[#D71920] font-semibold text-white transition hover:bg-red-700">
       {loading ? "Memverifikasi akun..." : "LOGIN"}
      </button>

     <LoadingOverlay
       show={loading}
       success={success}
       title={success ? "Login berhasil" : "Memverifikasi akun..."}
      />

    </div>
  );
}