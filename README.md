# Comunidad Natzratim

Plataforma web para la Comunidad Natzratim construida con Next.js 15, TypeScript, Tailwind CSS y Supabase.

## Incluye

- Inicio con banner, publicaciones, videos y eventos.
- Blog con categorías, búsqueda y página individual.
- Biblioteca de videos con integración a YouTube.
- Eventos y festividades con calendario mensual.
- Nosotros, contacto y donaciones.
- Panel de administración con autenticación y roles.
- Editor visual tipo CMS basado en bloques.
- SEO básico con sitemap, robots y Open Graph.

## Estructura principal

- `app/` rutas públicas y administrativas.
- `components/` UI compartida.
- `lib/` acceso a datos, auth y utilidades.
- `supabase/schema.sql` esquema de base de datos.
- `supabase/seed.sql` datos semilla.
- `docs/deployment.md` guía de despliegue.

## Nota de entorno

Este workspace no trae las dependencias instaladas, así que el proyecto queda preparado para instalarse y ejecutarse en un entorno con acceso a paquetes de npm.
