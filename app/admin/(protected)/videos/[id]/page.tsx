import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { VideoForm } from "@/components/admin/video-form";
import { getVideoById, getVideoCategories } from "@/lib/data";
import { saveVideoAction } from "@/app/admin/(protected)/videos/actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (id === "nuevo") return { title: "Nuevo video" };
  const video = await getVideoById(id);
  if (!video) return { title: "Editar video" };
  return { title: `Editar: ${video.title}` };
}

export default async function VideoEditorPage({ params }: PageProps) {
  const { id } = await params;
  const [categories, video] = await Promise.all([
    getVideoCategories(),
    id === "nuevo" ? Promise.resolve(null) : getVideoById(id),
  ]);

  if (id !== "nuevo" && !video) notFound();

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Editor" title={id === "nuevo" ? "Crear video" : "Editar video"} description="Video de YouTube, miniatura y bloques de apoyo." />
      <VideoForm video={video} categories={categories} action={saveVideoAction} />
    </div>
  );
}

