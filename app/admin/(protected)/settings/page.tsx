import { SectionHeading } from "@/components/section-heading";
import { getDonationsInfo, getSiteSettings } from "@/lib/data";
import { DonationsForm, SiteSettingsForm } from "@/components/admin/settings-forms";
import { saveDonationsAction, saveSiteSettingsAction } from "@/app/admin/(protected)/settings/actions";

export default async function SettingsPage() {
  const [settings, donations] = await Promise.all([getSiteSettings(), getDonationsInfo()]);

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Configuración" title="Ajustes del sitio" description="Logo, banner, contacto, redes y donaciones editables desde el panel." />
      <div className="grid gap-6 xl:grid-cols-2">
        <SiteSettingsForm settings={settings} action={saveSiteSettingsAction} />
        <DonationsForm donations={donations} action={saveDonationsAction} />
      </div>
    </div>
  );
}

