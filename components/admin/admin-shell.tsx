import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { IconBook, IconCalendar, IconHeart, IconMail, IconShield, IconPlay } from "@/components/icons";
import { signOutAction } from "@/app/admin/(protected)/actions";
import type { RoleSlug } from "@/types/content";

type AdminShellProps = {
  children: ReactNode;
  role: RoleSlug;
  fullName?: string | null;
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: IconShield },
  { href: "/admin/articles", label: "Artículos", icon: IconBook },
  { href: "/admin/videos", label: "Videos", icon: IconPlay },
  { href: "/admin/events", label: "Eventos", icon: IconCalendar },
  { href: "/admin/messages", label: "Mensajes", icon: IconMail },
  { href: "/admin/admins", label: "Administradores", icon: IconShield },
  { href: "/admin/settings", label: "Configuración", icon: IconHeart },
];

export function AdminShell({ children, role, fullName }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf7ef_0%,#f6f0e3_35%,#f2ead8_100%)] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-parchment-200 bg-white/80 px-5 py-6 backdrop-blur-xl">
          <div className="space-y-6">
            <Logo compact />
            <div className="rounded-3xl border border-parchment-200 bg-parchment-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">Sesión activa</p>
              <p className="mt-2 font-display text-xl font-bold text-temple-900">{fullName ?? "Administrador"}</p>
              <p className="mt-1 text-sm text-slate-600">{role === "super_admin" ? "Super administrador" : "Administrador"}</p>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-temple-900 transition-colors hover:bg-parchment-100">
                    <Icon className="h-4 w-4 text-parchment-600" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <form action={signOutAction}>
              <button className="w-full rounded-full border border-parchment-300 bg-white px-5 py-3 text-sm font-semibold text-temple-900 hover:bg-parchment-100">
                Cerrar sesión
              </button>
            </form>
          </div>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-parchment-200 bg-white/75 px-5 py-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">Panel de administración</p>
                <h1 className="font-display text-2xl font-bold text-temple-900">Comunidad Natzratim</h1>
              </div>
              <div className="rounded-full border border-parchment-300 bg-parchment-50 px-4 py-2 text-sm font-semibold text-temple-900">
                {role === "super_admin" ? "Nivel total" : "Nivel administrador"}
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

