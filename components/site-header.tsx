import Link from "next/link";
import { defaultNavItems } from "@/lib/site";
import { Logo } from "@/components/logo";
import { LinkButton } from "@/components/button";
import { IconMenu } from "@/components/icons";
import type { SiteSettings } from "@/types/content";

type SiteHeaderProps = {
  settings: SiteSettings;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-parchment-200/80 bg-[rgba(246,240,227,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {defaultNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-temple-900 transition-colors hover:bg-parchment-100 hover:text-temple-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LinkButton href="/contacto" variant="secondary">
            Contacto
          </LinkButton>
          <LinkButton href="/donaciones">Donar</LinkButton>
        </div>
        <details className="relative lg:hidden">
          <summary className="list-none inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-parchment-300 bg-white text-temple-900 shadow-sm">
            <IconMenu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 top-14 w-64 rounded-3xl border border-parchment-200 bg-white p-3 shadow-shrine">
            <div className="grid gap-1">
              {defaultNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-temple-900 transition-colors hover:bg-parchment-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2 border-t border-parchment-200 pt-3">
              <LinkButton href="/contacto" variant="secondary">
                Contacto
              </LinkButton>
              <LinkButton href="/donaciones">Donar</LinkButton>
            </div>
          </div>
        </details>
      </div>
      <div className="border-t border-parchment-200 bg-parchment-50/80 px-4 py-2 text-center text-xs tracking-[0.25em] text-temple-700 sm:px-6 lg:px-8">
        {settings.tagline}
      </div>
    </header>
  );
}
