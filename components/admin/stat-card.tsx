import { Card } from "@/components/card";
import type { ReactNode } from "react";

export function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card className="flex items-start gap-4">
      <div className="rounded-2xl bg-parchment-100 p-3 text-temple-700">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-parchment-600">{title}</p>
        <p className="mt-2 font-display text-3xl font-bold text-temple-900">{value}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </Card>
  );
}

