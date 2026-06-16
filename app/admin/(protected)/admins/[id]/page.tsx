import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { AdminForm } from "@/components/admin/admin-form";
import { getAdmins, getRoles } from "@/lib/data";
import { saveAdminAction } from "@/app/admin/(protected)/admins/actions";
import { requireAdmin } from "@/lib/auth";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (id === "nuevo") return { title: "Nuevo administrador" };
  return { title: "Editar administrador" };
}

export default async function AdminEditorPage({ params }: PageProps) {
  const { id } = await params;
  const session = await requireAdmin();
  if (session.role !== "super_admin") redirect("/admin");

  const [admins, roles] = await Promise.all([getAdmins(), getRoles()]);
  const admin = id === "nuevo" ? null : admins.find((item) => item.id === id) ?? null;
  if (id !== "nuevo" && !admin) notFound();

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Editor" title={id === "nuevo" ? "Crear administrador" : "Editar administrador"} description="Super administrador con acceso total al panel." />
      <AdminForm admin={admin} roles={roles} action={saveAdminAction} />
    </div>
  );
}

