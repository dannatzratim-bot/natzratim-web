import Link from "next/link";
import { Card } from "@/components/card";
import { LinkButton } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { IconArrowRight, IconPlay, IconSearch } from "@/components/icons";
import { getVideoCategories, listVideos } from "@/lib/data";
import { youtubeThumbnailUrl } from "@/lib/format";

type VideoPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function VideosPage({ searchParams }: VideoPageProps) {
  const params = await searchParams;
  const [categories, videos] = await Promise.all([
    getVideoCategories(),
    listVideos({ search: params.q, categorySlug: params.category }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        kicker="Videos"
        title="Biblioteca audiovisual"
        description="Contenido conectado a YouTube con miniaturas automáticas, filtros y páginas individuales."
      />

      <form className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar videos</span>
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Buscar videos"
            className="w-full rounded-full border border-parchment-300 bg-white/90 py-3 pl-12 pr-4 text-sm shadow-sm focus:border-temple-400 focus:outline-none focus:ring-2 focus:ring-temple-500/20"
          />
        </label>
        <button className="rounded-full bg-temple-900 px-5 py-3 text-sm font-semibold text-white shadow-shrine">Buscar</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/videos" className="rounded-full border border-parchment-300 bg-white px-4 py-2 text-sm font-semibold text-temple-900">
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/videos?category=${category.slug}`}
            className="rounded-full border border-parchment-300 bg-white px-4 py-2 text-sm font-semibold text-temple-900"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden p-0">
            <div className="relative aspect-video">
              <img src={video.thumbnail_url || youtubeThumbnailUrl(video.youtube_id)} alt={video.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(10,26,36,0.62))]" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-temple-900">
                <IconPlay className="h-3.5 w-3.5" />
                YouTube
              </div>
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
    </div>
  );
}

