import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { EventForm } from "@/components/admin/event-form";
import { getEventById } from "@/lib/data";
import { saveEventAction } from "@/app/admin/(protected)/events/actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  if (id === "nuevo") return { title: "Nuevo evento" };
  const event = await getEventById(id);
  if (!event) return { title: "Editar evento" };
  return { title: `Editar: ${event.title}` };
}

export default async function EventEditorPage({ params }: PageProps) {
  const { id } = await params;
  const event = id === "nuevo" ? null : await getEventById(id);
  if (id !== "nuevo" && !event) notFound();

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Editor" title={id === "nuevo" ? "Crear evento" : "Editar evento"} description="Fecha, hora, lugar y bloques de contenido." />
      <EventForm event={event} action={saveEventAction} />
    </div>
  );
}

