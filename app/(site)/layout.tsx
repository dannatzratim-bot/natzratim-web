import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { getDonationsInfo, getSiteSettings } from "@/lib/data";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const [settings, donations] = await Promise.all([getSiteSettings(), getDonationsInfo()]);
  return <SiteShell settings={settings} donations={donations}>{children}</SiteShell>;
}

