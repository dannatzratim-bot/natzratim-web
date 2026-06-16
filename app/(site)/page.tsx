import { Hero } from "@/components/hero";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { LinkButton } from "@/components/button";
import { IconArrowRight, IconBook, IconCalendar, IconHeart, IconPlay } from "@/components/icons";
import { getDonationsInfo, getSiteSettings, listArticles, listEvents, listVideos } from "@/lib/data";
import { formatDate, youtubeThumbnailUrl } from "@/lib/format";

export default async function HomePage() {
  const [settings, donations, articles, videos, events] = await Promise.all([
    getSiteSettings(),
    getDonationsInfo(),
    listArticles({ limit: 3 }),
    listVideos({ limit: 3 }),
    listEvents({ limit: 3 }),
  ]);

  return (
    <div className="noise-layer">
      <Hero settings={settings} articles={articles} videos={videos} events={events} donations={donations} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Últimas publicaciones"
          title="Estudio que acompaña la vida diaria"
          description="Artículos con contexto, reflexión y contenido actualizado para la comunidad."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="flex h-full flex-col">
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-parchment-600">
                <IconBook className="h-4 w-4" />
                {article.category?.name ?? "Blog"}
              </div>
              <h3 className="font-display text-2xl font-bold text-temple-900">{article.title}</h3>
              <p className="mt-3 max-h-24 overflow-hidden text-sm leading-7 text-slate-700">{article.excerpt}</p>
              <div className="mt-4 text-sm text-slate-500">{formatDate(article.published_at)}</div>
              <div className="mt-auto pt-5">
                <LinkButton href={`/blog/${article.slug}`} variant="secondary">
                  Leer artículo
                  <IconArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Biblioteca de videos"
          title="Contenido audiovisual con acceso rápido"
          description="Material de estudio y enseñanza integrado con YouTube y listo para consultar por categorías."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden p-0">
              <div className="relative aspect-video">
                <img src={video.thumbnail_url || youtubeThumbnailUrl(video.youtube_id)} alt={video.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(10,26,36,0.62))]" />
              </div>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-parchment-600">{video.category?.name ?? "Video"}</p>
                <h3 className="font-display text-2xl font-bold text-temple-900">{video.title}</h3>
                <p className="text-sm leading-7 text-slate-700">{video.excerpt}</p>
                <LinkButton href={`/videos/${video.slug}`} variant="secondary">
                  Ver video
                  <IconArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Próximos eventos"
          title="Calendario comunitario y festividades"
          description="Encuentros, conmemoraciones y jornadas de estudio con detalles completos."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-parchment-600">{event.category}</p>
                <p className="text-sm font-semibold text-temple-900">{formatDate(event.event_date)}</p>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-temple-900">{event.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{event.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <IconCalendar className="h-4 w-4" />
                {formatDate(event.event_date)}
              </div>
              <div className="mt-5">
                <LinkButton href={`/eventos/${event.slug}`} variant="secondary">
                  Ver detalle
                  <IconArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-temple-900 text-white">
            <div className="flex items-center gap-3 text-parchment-200">
              <IconHeart className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.28em]">Donaciones</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold">{donations.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-parchment-100/90">{donations.body}</p>
            <div className="mt-6">
              <LinkButton href="/donaciones" variant="secondary">
                Ver detalles
              </LinkButton>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 text-parchment-600">
              <IconPlay className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.28em]">Contacto rápido</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold text-temple-900">Comunicación abierta y directa</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-700">
              Usa el formulario de contacto o escribe por WhatsApp para consultas, estudios y coordinación.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/contacto">Ir al contacto</LinkButton>
              <a href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, "")}`} className="rounded-full border border-parchment-300 px-5 py-3 text-sm font-semibold text-temple-900 transition-colors hover:bg-parchment-100">
                WhatsApp
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
