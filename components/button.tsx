import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-50";

export function Button({
  className,
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }>) {
  const styles =
    variant === "secondary"
      ? "border border-parchment-300 bg-white text-temple-900 hover:border-parchment-400 hover:bg-parchment-50"
      : variant === "ghost"
        ? "text-temple-900 hover:bg-parchment-100"
        : "bg-temple-900 text-white shadow-shrine hover:bg-temple-800";

  return <button className={cn(base, styles, className)} {...props} />;
}

export function LinkButton({
  className,
  variant = "primary",
  href,
  ...props
}: PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; variant?: "primary" | "secondary" | "ghost" }>) {
  const styles =
    variant === "secondary"
      ? "border border-parchment-300 bg-white text-temple-900 hover:border-parchment-400 hover:bg-parchment-50"
      : variant === "ghost"
        ? "text-temple-900 hover:bg-parchment-100"
        : "bg-temple-900 text-white shadow-shrine hover:bg-temple-800";
  return <Link href={href} className={cn(base, styles, className)} {...props} />;
}
