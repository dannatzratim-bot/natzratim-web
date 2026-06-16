import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { ContentRenderer } from "@/components/content-renderer";
import { getVideoBySlug, listVideos } from "@/lib/data";
import { youtubeEmbedUrl } from "@/lib/format";
import { LinkButton } from "@/components/button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) return { title: "Video no encontrado" };
  return {
    title: video.seo_title ?? video.title,
    description: video.seo_description ?? video.excerpt,
    openGraph: {
      title: video.seo_title ?? video.title,
      description: video.seo_description ?? video.excerpt,
      type: "video.other",
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) notFound();

  const related = (await listVideos({ categorySlug: video.category?.slug, limit: 3 })).filter((item) => item.slug !== video.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">{video.category?.name ?? "Video"}</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-temple-900 md:text-5xl">{video.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-slate-700">{video.excerpt}</p>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-video">
              <iframe
                src={youtubeEmbedUrl(video.youtube_url) || youtubeEmbedUrl(video.youtube_id)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="p-6 md:p-8">
              <ContentRenderer blocks={video.content} />
            </div>
          </Card>
          {video.youtube_url ? (
            <LinkButton href={video.youtube_url} variant="secondary">
              Abrir en YouTube
            </LinkButton>
          ) : null}
        </article>
        <aside className="space-y-6">
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">Relacionados</p>
            <div className="mt-4 space-y-4">
              {related.map((item) => (
                <a key={item.id} href={`/videos/${item.slug}`} className="block rounded-2xl border border-parchment-200 p-4 transition-colors hover:bg-parchment-50">
                  <h3 className="font-display text-lg font-semibold text-temple-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.excerpt}</p>
                </a>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

