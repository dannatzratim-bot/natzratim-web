import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-parchment-300/70 bg-white shadow-glow">
        <Image src="/brand/natzratim-logo.jpg" alt="Logo de la Comunidad Natzratim" fill className="object-cover" sizes="48px" priority />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-[0.12em] text-temple-900">NATZRATIM</span>
          <span className="text-[0.7rem] uppercase tracking-[0.28em] text-temple-700">Comunidad de estudio</span>
        </span>
      ) : null}
    </Link>
  );
}

