import type { AdminProfile } from "@/types/content";
import { Card } from "@/components/card";

type RoleOption = { id: string; slug: string; name: string };

export function AdminForm({
  admin,
  roles,
  action,
}: {
  admin: AdminProfile | null;
  roles: RoleOption[];
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card>
      <form action={action} className="space-y-6">
        <input type="hidden" name="id" value={admin?.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nombre completo" name="full_name" defaultValue={admin?.full_name ?? ""} required />
          <Field label="Usuario" name="username" defaultValue={admin?.username ?? ""} required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Correo electrónico" name="email" defaultValue={admin?.email ?? ""} required />
          <Field label="Contraseña" name="password" defaultValue="" placeholder={admin ? "Dejar en blanco para mantener" : "Contraseña inicial"} type="password" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-temple-900">Rol</span>
            <select name="role_slug" defaultValue={admin?.role_slug ?? "admin"} className="w-full rounded-2xl border border-parchment-200 bg-white px-4 py-3 text-sm">
              {roles.map((role) => (
                <option key={role.id} value={role.slug}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="Avatar URL" name="avatar_url" defaultValue={admin?.avatar_url ?? ""} />
        </div>
        <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">
          {admin ? "Guardar administrador" : "Crear administrador"}
        </button>
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-temple-900">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        type={type}
        className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm"
      />
    </label>
  );
}

