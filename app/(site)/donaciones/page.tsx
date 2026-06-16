import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getDonationsInfo, getSiteSettings } from "@/lib/data";

export default async function DonacionesPage() {
  const [donations, settings] = await Promise.all([getDonationsInfo(), getSiteSettings()]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading kicker="Donaciones" title={donations.title} description={donations.subtitle} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card>
          <p className="text-base leading-8 text-slate-700">{donations.body}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Info label="Banco" value={donations.bank_name} />
            <Info label="Cuenta" value={donations.bank_account} />
            <Info label="Alias" value={donations.bank_alias} />
            <Info label="SWIFT" value={donations.bank_swift} />
          </div>
          {donations.donation_url ? (
            <a href={donations.donation_url} className="mt-6 inline-flex rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">
              Donar ahora
            </a>
          ) : null}
        </Card>
        <Card className="bg-temple-900 text-white">
          <p className="text-xs uppercase tracking-[0.28em] text-parchment-200">Apoyo comunitario</p>
          <h3 className="mt-4 font-display text-3xl font-bold">{settings.site_name}</h3>
          <p className="mt-3 text-sm leading-7 text-parchment-100/90">{settings.support_cta}</p>
          {donations.qr_code_url ? (
            <div className="mt-6 overflow-hidden rounded-3xl bg-white p-4">
              <img src={donations.qr_code_url} alt="Código QR de donación" className="h-64 w-full object-contain" />
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-parchment-100/80">
              Código QR opcional disponible desde administración.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-2xl border border-parchment-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-parchment-600">{label}</p>
      <p className="mt-2 text-sm font-semibold text-temple-900">{value ?? "No configurado"}</p>
    </div>
  );
}

