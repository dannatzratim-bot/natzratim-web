import type { ReactNode } from "react";
import type { DonationsInfo, SiteSettings } from "@/types/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type SiteShellProps = {
  settings: SiteSettings;
  donations: DonationsInfo;
  children: ReactNode;
};

export function SiteShell({ settings, donations, children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf7ef_0%,#f6f0e3_45%,#f4efe5_100%)] text-slate-900">
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} donations={donations} />
    </div>
  );
}

