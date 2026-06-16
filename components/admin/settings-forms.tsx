import { Card } from "@/components/card";
import type { DonationsInfo, SiteSettings } from "@/types/content";

export function SiteSettingsForm({
  settings,
  action,
}: {
  settings: SiteSettings;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card>
      <form action={action} className="space-y-6">
        <input type="hidden" name="id" value={settings.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nombre del sitio" name="site_name" defaultValue={settings.site_name} required />
          <Field label="Tagline" name="tagline" defaultValue={settings.tagline} required />
        </div>
        <Field label="Texto de bienvenida" name="welcome_text" defaultValue={settings.welcome_text} as="textarea" rows={4} required />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título principal" name="hero_title" defaultValue={settings.hero_title} required />
          <Field label="Descripción principal" name="hero_description" defaultValue={settings.hero_description} as="textarea" rows={4} required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Logo URL" name="logo_url" defaultValue={settings.logo_url} required />
          <Field label="Banner URL" name="banner_image_url" defaultValue={settings.banner_image_url} required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="WhatsApp" name="contact_whatsapp" defaultValue={settings.contact_whatsapp} required />
          <Field label="Correo" name="contact_email" defaultValue={settings.contact_email} required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Teléfono" name="contact_phone" defaultValue={settings.contact_phone ?? ""} />
          <Field label="Dirección" name="address" defaultValue={settings.address ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Facebook" name="facebook_url" defaultValue={settings.facebook_url ?? ""} />
          <Field label="Instagram" name="instagram_url" defaultValue={settings.instagram_url ?? ""} />
          <Field label="YouTube" name="youtube_url" defaultValue={settings.youtube_url ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Canal YouTube" name="youtube_channel" defaultValue={settings.youtube_channel ?? ""} />
          <Field label="Color principal" name="primary_color" defaultValue={settings.primary_color ?? ""} />
          <Field label="Color acento" name="accent_color" defaultValue={settings.accent_color ?? ""} />
        </div>
        <Field label="Llamado a apoyar" name="support_cta" defaultValue={settings.support_cta ?? ""} as="textarea" rows={3} />
        <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">Guardar ajustes</button>
      </form>
    </Card>
  );
}

export function DonationsForm({
  donations,
  action,
}: {
  donations: DonationsInfo;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card>
      <form action={action} className="space-y-6">
        <input type="hidden" name="id" value={donations.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Título" name="title" defaultValue={donations.title} required />
          <Field label="Subtítulo" name="subtitle" defaultValue={donations.subtitle} required />
        </div>
        <Field label="Texto principal" name="body" defaultValue={donations.body} as="textarea" rows={5} required />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Banco" name="bank_name" defaultValue={donations.bank_name ?? ""} />
          <Field label="Cuenta" name="bank_account" defaultValue={donations.bank_account ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Alias" name="bank_alias" defaultValue={donations.bank_alias ?? ""} />
          <Field label="SWIFT" name="bank_swift" defaultValue={donations.bank_swift ?? ""} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="URL de donación" name="donation_url" defaultValue={donations.donation_url ?? ""} />
          <Field label="QR URL" name="qr_code_url" defaultValue={donations.qr_code_url ?? ""} />
        </div>
        <Field label="Notas" name="notes" defaultValue={donations.notes ?? ""} as="textarea" rows={3} />
        <button className="rounded-full bg-temple-900 px-6 py-3 text-sm font-semibold text-white shadow-shrine">Guardar información</button>
      </form>
    </Card>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  as = "input",
  rows,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea";
  rows?: number;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-temple-900">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} rows={rows ?? 4} className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
      ) : (
        <input name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
      )}
    </label>
  );
}

