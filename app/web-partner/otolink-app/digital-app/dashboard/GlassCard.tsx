import { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function GlassCard({
  children,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={`
        rounded-[30px]
        border border-white/20
        bg-white/10
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(0,0,0,.35)]
        transition-all
        duration-300

        ${className}
      `}
    >
      {children}
    </div>
  );
}