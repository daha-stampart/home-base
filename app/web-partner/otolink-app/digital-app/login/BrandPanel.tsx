import Image from "next/image";

type BrandPanelProps = {
  show: boolean;
};

export default function BrandPanel({ show }: BrandPanelProps) {
  return (
    <div
      className={`
       w-full
       text-center
       text-white
       transition-all
       duration-700
       ease-out

        ${
          show
            ? "translate-x-0 opacity-100"
            : "-translate-x-24 opacity-0 pointer-events-none"
        }

        lg:max-w-[760px]
        lg:pl-12
        lg:text-left
      `}
    >
      <div className="mb-8 flex justify-center lg:justify-start">
        <Image
          src="/images/logo-otolink-v2.png"
          alt="Otolink"
          width={280}
          height={100}
          priority
          className="drop-shadow-[0_0_20px_rgba(255,255,255,.25)]"
        />
      </div>

      <h1 className="mt-10 text-4Xl font-black leading-tight sm:text-5xl lg:mt-16 lg:text-6xl">
        PT BALAI LELANG
        <br />
        MEGATAMA
      </h1>

      <p className="mt-6 text-lg text-white/85 sm:text-xl lg:mt-8 lg:text-4xl">
        Digital Vehicle Inspection System
      </p>
    </div>
  );
}