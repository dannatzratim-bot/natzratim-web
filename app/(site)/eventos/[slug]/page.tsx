import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { ContentRenderer } from "@/components/content-renderer";
import { getEventBySlug } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/format";
import { LinkButton } from "@/components/button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Evento no encontrado" };
  return {
    title: event.seo_title ?? event.title,
    description: event.seo_description ?? event.excerpt,
    openGraph: {
      title: event.seo_title ?? event.title,
      description: event.seo_description ?? event.excerpt,
      type: "article",
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="space-y-8">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">{event.category}</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-temple-900 md:text-5xl">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span>{formatDate(event.event_date)}</span>
            <span>
              {formatTime(event.start_time)}
              {event.end_time ? ` - ${formatTime(event.end_time)}` : ""}
            </span>
            <span>{event.location ?? "Por definir"}</span>
          </div>
          <p className="max-w-3xl text-base leading-8 text-slate-700">{event.excerpt}</p>
        </div>
        <ContentRenderer blocks={event.content} />
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/contacto">Solicitar información</LinkButton>
          <LinkButton href="/donaciones" variant="secondary">
            Ver donaciones
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}

