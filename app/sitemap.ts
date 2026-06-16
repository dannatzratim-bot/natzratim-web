import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";
import { listArticles, listEvents, listVideos } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, videos, events] = await Promise.all([listArticles(), listVideos(), listEvents()]);
  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
    { url: `${siteUrl}/videos`, lastModified: new Date() },
    { url: `${siteUrl}/eventos`, lastModified: new Date() },
    { url: `${siteUrl}/nosotros`, lastModified: new Date() },
    { url: `${siteUrl}/contacto`, lastModified: new Date() },
    { url: `${siteUrl}/donaciones`, lastModified: new Date() },
    ...articles.map((article) => ({ url: `${siteUrl}/blog/${article.slug}`, lastModified: new Date(article.updated_at) })),
    ...videos.map((video) => ({ url: `${siteUrl}/videos/${video.slug}`, lastModified: new Date(video.updated_at) })),
    ...events.map((event) => ({ url: `${siteUrl}/eventos/${event.slug}`, lastModified: new Date(event.updated_at) })),
  ];
}
