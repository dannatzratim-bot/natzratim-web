import type { ReactNode } from "react";

export default function AdminAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf7ef_0%,#f6f0e3_45%,#f2ead8_100%)] px-4 py-12">
      <div className="mx-auto max-w-md">{children}</div>
    </div>
  );
}

