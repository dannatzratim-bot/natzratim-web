import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Comunidad Natzratim",
    template: "%s | Comunidad Natzratim",
  },
  description: "Plataforma oficial de estudio, publicaciones, videos, eventos y contacto de la Comunidad Natzratim.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
