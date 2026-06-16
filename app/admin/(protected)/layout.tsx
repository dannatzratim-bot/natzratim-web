import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();
  if (!session.isAuthorized || !session.profile) redirect("/admin/login");
  return <AdminShell role={session.role ?? "admin"} fullName={session.profile.full_name}>{children}</AdminShell>;
}

