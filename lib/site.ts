import type { DonationsInfo, NavItem, SiteSettings } from "@/types/content";

export const defaultNavItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Videos", href: "/videos" },
  { label: "Eventos", href: "/eventos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Donaciones", href: "/donaciones" },
];

export const defaultSiteSettings: SiteSettings = {
  site_name: "Comunidad Natzratim",
  tagline: "Estudio, tradición y comunidad con raíces hebreas.",
  welcome_text:
    "Una comunidad dedicada al estudio de las Escrituras, la memoria de Israel y la vida comunitaria con reverencia y claridad.",
  logo_url: "/brand/natzratim-logo.jpg",
  banner_image_url: "/brand/natzratim-logo.jpg",
  hero_title: "Comunidad Natzratim",
  hero_description:
    "Un espacio contemporáneo para enseñar, publicar, compartir videos, organizar eventos y acompañar a la comunidad.",
  contact_whatsapp: "+0000000000",
  contact_email: "contacto@natzratim.org",
  contact_phone: null,
  address: "Jerusalén, Israel",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  youtube_url: "https://youtube.com",
  youtube_channel: "https://youtube.com",
  primary_color: "#153a5b",
  accent_color: "#b08d57",
  support_cta: "Apoya la obra de estudio y servicio de la comunidad.",
};

export const defaultDonationsInfo: DonationsInfo = {
  title: "Apoyar a la comunidad",
  subtitle: "Cada contribución fortalece el estudio, la difusión y la atención comunitaria.",
  body:
    "Puedes apoyar mediante transferencia, donación digital o escaneando el código QR. Toda la información puede actualizarse desde el panel administrativo.",
  bank_name: "Banco comunitario",
  bank_account: "000-000000-0",
  bank_alias: "NATZRATIM",
  bank_swift: "NATZ0000",
  qr_code_url: null,
  donation_url: null,
  notes: "Las donaciones se administran con transparencia y se destinan al servicio comunitario.",
};
