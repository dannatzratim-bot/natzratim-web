import Link from "next/link";
import { Card } from "@/components/card";
import { StatCard } from "@/components/admin/stat-card";
import { IconBook, IconCalendar, IconHeart, IconMail, IconPlay, IconShield } from "@/components/icons";
import { getAdmins, getDonationsInfo, getSiteSettings, listArticles, listContactMessages, listEvents, listVideos } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [articles, videos, events, messages, admins, settings, donations] = await Promise.all([
    listArticles({ includeDrafts: true }),
    listVideos({ includeDrafts: true }),
    listEvents({ includeDrafts: true }),
    listContactMessages(),
    getAdmins(),
    getSiteSettings(),
    getDonationsInfo(),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Artículos" value={String(articles.length)} description="Publicados y borradores." icon={<IconBook className="h-5 w-5" />} />
        <StatCard title="Videos" value={String(videos.length)} description="Biblioteca audiovisual." icon={<IconPlay className="h-5 w-5" />} />
        <StatCard title="Eventos" value={String(events.length)} description="Calendario comunitario." icon={<IconCalendar className="h-5 w-5" />} />
        <StatCard title="Mensajes" value={String(messages.length)} description="Contacto y seguimiento." icon={<IconMail className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="font-display text-3xl font-bold text-temple-900">Resumen del sitio</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Info label="Nombre" value={settings.site_name} />
            <Info label="WhatsApp" value={settings.contact_whatsapp} />
            <Info label="Donaciones" value={donations.title} />
            <Info label="Administradores" value={String(admins.length)} />
          </div>
        </Card>
        <Card className="bg-temple-900 text-white">
          <div className="flex items-center gap-3 text-parchment-200">
            <IconShield className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.28em]">Acceso rápido</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold">Gestiona el contenido desde aquí</h2>
          <p className="mt-3 text-sm leading-7 text-parchment-100/90">
            Artículos, videos, eventos, mensajes y configuración del sitio se administran sin tocar código.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <QuickLink href="/admin/articles" label="Artículos" />
            <QuickLink href="/admin/videos" label="Videos" />
            <QuickLink href="/admin/events" label="Eventos" />
            <QuickLink href="/admin/settings" label="Configuración" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-parchment-200 bg-parchment-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-parchment-600">{label}</p>
      <p className="mt-2 text-sm font-semibold text-temple-900">{value}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10">
      {label}
    </Link>
  );
}

