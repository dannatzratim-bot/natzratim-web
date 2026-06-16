import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getSiteSettings } from "@/lib/data";
import { submitContactMessage } from "@/app/(site)/contacto/actions";

export default async function ContactoPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        kicker="Contacto"
        title="Escribe a la comunidad"
        description="El formulario guarda el mensaje en Supabase y también puedes usar WhatsApp."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <form action={submitContactMessage} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required placeholder="Nombre" className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
              <input name="email" type="email" required placeholder="Correo electrónico" className="rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
            </div>
            <input name="phone" placeholder="Teléfono" className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
            <input name="subject" required placeholder="Asunto" className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
            <textarea name="message" required rows={6} placeholder="Mensaje" className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
            <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">Enviar mensaje</button>
          </form>
        </Card>
        <Card className="bg-parchment-50">
          <h3 className="font-display text-3xl font-bold text-temple-900">Canales directos</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">El contacto queda registrado para seguimiento administrativo.</p>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <p>WhatsApp: {settings.contact_whatsapp}</p>
            <p>Correo: {settings.contact_email}</p>
            <p>Dirección: {settings.address}</p>
          </div>
          <div className="mt-6">
            <a href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, "")}`} className="rounded-full border border-parchment-300 bg-white px-5 py-3 text-sm font-semibold text-temple-900">
              Abrir WhatsApp
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
