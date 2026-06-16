# Despliegue en Vercel

## 1. Preparar Supabase

1. Crear un proyecto nuevo en Supabase.
2. Ejecutar `supabase/schema.sql` en el SQL Editor.
3. Ejecutar `supabase/seed.sql` para cargar roles, categorías y configuración inicial.
4. Crear los usuarios administradores desde **Authentication > Users**.
5. Insertar sus perfiles en `public.users` o usar la acción de creación desde el panel si ya está configurado el servicio.

## 2. Variables de entorno

Configura estas variables en Vercel y en local:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3. Publicar en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Configura las variables de entorno.
4. Despliega.

## 4. Rutas principales

- `/` inicio
- `/blog`
- `/videos`
- `/eventos`
- `/nosotros`
- `/contacto`
- `/donaciones`
- `/admin`
- `/admin/login`

## 5. Notas operativas

- El editor de contenido usa bloques JSON en `content`.
- Las miniaturas de video se generan desde la URL de YouTube si no hay miniatura manual.
- El logo oficial debe mantenerse en `public/brand/natzratim-logo.jpg`.
- Puedes cambiar colores e imágenes desde `Configuración del sitio` en el panel.
