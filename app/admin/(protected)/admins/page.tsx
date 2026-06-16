import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { deleteAdminAction } from "@/app/admin/(protected)/admins/actions";
import { getAdmins, getRoles } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";

export default async function AdminsPage() {
  const session = await requireAdmin();
  if (session.role !== "super_admin") redirect("/admin");

  const [admins, roles] = await Promise.all([getAdmins(), getRoles()]);

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Administradores" title="Gestión de usuarios con acceso" description="Crear, editar y eliminar administradores del sitio." />
      <div className="flex justify-end">
        <Link href="/admin/admins/nuevo" className="rounded-full bg-temple-900 px-5 py-3 text-sm font-semibold text-white shadow-shrine">
          Nuevo administrador
        </Link>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-parchment-200 text-sm">
          <thead className="bg-parchment-50 text-left text-xs uppercase tracking-[0.22em] text-parchment-600">
            <tr>
              <th className="px-5 py-4">Nombre</th>
              <th className="px-5 py-4">Usuario</th>
              <th className="px-5 py-4">Correo</th>
              <th className="px-5 py-4">Rol</th>
              <th className="px-5 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parchment-200 bg-white">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-5 py-4 font-semibold text-temple-900">{admin.full_name}</td>
                <td className="px-5 py-4 text-slate-700">{admin.username}</td>
                <td className="px-5 py-4 text-slate-700">{admin.email}</td>
                <td className="px-5 py-4 text-slate-700">{roles.find((role) => role.slug === admin.role_slug)?.name ?? admin.role_slug}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/admins/${admin.id}`} className="rounded-full border border-parchment-300 px-3 py-2 text-xs font-semibold text-temple-900">
                      Editar
                    </Link>
                    <form action={deleteAdminAction}>
                      <input type="hidden" name="id" value={admin.id} />
                      <button className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

