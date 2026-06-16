import Image from "next/image";
import type { ReactNode } from "react";
import { Card } from "@/components/card";
import { LinkButton } from "@/components/button";
import { IconArrowRight, IconBook, IconCalendar, IconPlay } from "@/components/icons";
import type { ArticleRecord, DonationsInfo, EventRecord, SiteSettings, VideoRecord } from "@/types/content";
import { formatDate, formatDateTime } from "@/lib/format";

type HeroProps = {
  settings: SiteSettings;
  articles: ArticleRecord[];
  videos: VideoRecord[];
  events: EventRecord[];
  donations: DonationsInfo;
};

export function Hero({ settings, articles, videos, events, donations }: HeroProps) {
  const latestArticle = articles[0];
  const latestVideo = videos[0];
  const upcomingEvent = events[0];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-halo opacity-90" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-parchment-400/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-20">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-parchment-300 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-temple-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-parchment-500" />
            Sabiduría, tradición y comunidad
          </div>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-none tracking-tight text-temple-900 md:text-6xl">
            {settings.hero_title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{settings.hero_description}</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{settings.welcome_text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/blog">
              Explorar publicaciones
              <IconArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/donaciones" variant="secondary">
              Acceso a donaciones
            </LinkButton>
            <LinkButton href="/contacto" variant="ghost">
              Contacto rápido
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <MetricCard icon={<IconBook className="h-5 w-5" />} label="Última publicación" title={latestArticle?.title ?? "Sin publicaciones"} meta={latestArticle ? latestArticle.category?.name ?? "Blog" : "—"} />
            <MetricCard icon={<IconPlay className="h-5 w-5" />} label="Último video" title={latestVideo?.title ?? "Sin videos"} meta={latestVideo?.category?.name ?? "—"} />
            <MetricCard icon={<IconCalendar className="h-5 w-5" />} label="Próximo evento" title={upcomingEvent?.title ?? "Sin eventos"} meta={upcomingEvent ? formatDate(upcomingEvent.event_date) : donations.title} />
          </div>
        </div>
        <div className="relative z-10">
          <Card className="overflow-hidden p-0">
            <div className="relative h-[440px] bg-temple-950">
              <Image src={settings.banner_image_url} alt={settings.site_name} fill className="object-cover opacity-90" priority />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,36,0.12),rgba(10,26,36,0.75))]" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-parchment-200">Comunidad viva</p>
                <h2 className="font-display text-3xl leading-tight">{settings.site_name}</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-parchment-100/90">{settings.support_cta}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon,
  label,
  title,
  meta,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  meta: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-parchment-100 p-2 text-temple-700">{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-parchment-600">{label}</p>
          <h3 className="mt-1 font-display text-lg font-bold text-temple-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{meta}</p>
        </div>
      </div>
    </Card>
  );
}
