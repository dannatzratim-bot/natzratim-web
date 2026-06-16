import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("rounded-3xl border border-parchment-200 bg-white/85 p-6 shadow-shrine backdrop-blur-sm", className)}>{children}</div>
  );
}

