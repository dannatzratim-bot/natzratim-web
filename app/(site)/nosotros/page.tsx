import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getSiteSettings } from "@/lib/data";

export default async function NosotrosPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading kicker="Nosotros" title="Historia, misión y valores" description="Una comunidad guiada por el estudio, la reverencia y el servicio." />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="font-display text-2xl font-bold text-temple-900">Historia</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            La Comunidad Natzratim surge como respuesta al deseo de reunir estudio, práctica y memoria hebrea en un solo espacio accesible.
          </p>
        </Card>
        <Card>
          <h3 className="font-display text-2xl font-bold text-temple-900">Misión</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Publicar contenido claro, formar a la comunidad y crear puentes entre tradición, educación y vida cotidiana.
          </p>
        </Card>
        <Card>
          <h3 className="font-display text-2xl font-bold text-temple-900">Visión</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Ser un sitio de referencia para la enseñanza, el acompañamiento y la preservación digna de las raíces hebreas.
          </p>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h3 className="font-display text-2xl font-bold text-temple-900">Valores</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <li>• Sabiduría y estudio constante.</li>
            <li>• Respeto por la tradición y el lenguaje hebreo.</li>
            <li>• Servicio comunitario.</li>
            <li>• Transparencia en la administración.</li>
            <li>• Hospitalidad y cuidado mutuo.</li>
          </ul>
        </Card>
        <Card className="bg-temple-900 text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-parchment-200">Contexto</p>
          <h3 className="mt-4 font-display text-3xl font-bold">{settings.site_name}</h3>
          <p className="mt-3 text-sm leading-7 text-parchment-100/90">{settings.welcome_text}</p>
        </Card>
      </div>
    </div>
  );
}

