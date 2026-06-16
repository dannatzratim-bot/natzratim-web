import Link from "next/link";
import { defaultNavItems } from "@/lib/site";
import type { DonationsInfo, SiteSettings } from "@/types/content";
import { Logo } from "@/components/logo";
import { IconHeart, IconMail } from "@/components/icons";

type SiteFooterProps = {
  settings: SiteSettings;
  donations: DonationsInfo;
};

export function SiteFooter({ settings, donations }: SiteFooterProps) {
  return (
    <footer className="border-t border-parchment-200 bg-temple-900 text-parchment-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-5">
          <Logo compact />
          <p className="max-w-md text-sm leading-7 text-parchment-100/90">{settings.welcome_text}</p>
          <div className="flex items-center gap-3 text-sm text-parchment-100/90">
            <IconHeart className="h-4 w-4 text-parchment-300" />
            <span>{donations.subtitle}</span>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-parchment-300">Navegación</h3>
          <ul className="space-y-3 text-sm text-parchment-100/90">
            {defaultNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-parchment-300">Contacto</h3>
          <div className="space-y-3 text-sm text-parchment-100/90">
            <p>{settings.address}</p>
            <a className="flex items-center gap-2 transition-colors hover:text-white" href={`mailto:${settings.contact_email}`}>
              <IconMail className="h-4 w-4" />
              {settings.contact_email}
            </a>
            <p>{donations.notes}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-parchment-100/75 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {settings.site_name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}

