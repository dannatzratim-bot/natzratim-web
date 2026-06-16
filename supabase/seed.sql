insert into public.roles (slug, name)
values
  ('super_admin', 'Super Administrador')
on conflict (slug) do nothing;

insert into public.roles (slug, name)
values
  ('admin', 'Administrador')
on conflict (slug) do nothing;

insert into public.article_categories (name, slug, description, sort_order)
values
  ('Estudio', 'estudio', 'Enseñanzas y reflexión bíblica', 1),
  ('Historia', 'historia', 'Contexto histórico y memoria', 2),
  ('Comunidad', 'comunidad', 'Vida comunitaria y anuncios', 3)
on conflict (slug) do nothing;

insert into public.video_categories (name, slug, description, sort_order)
values
  ('Estudio', 'estudio', 'Grabaciones de estudio', 1),
  ('Enseñanzas', 'ensenanzas', 'Mensajes y reflexiones', 2),
  ('Eventos', 'eventos', 'Videos de encuentros', 3)
on conflict (slug) do nothing;

insert into public.site_settings (
  site_name,
  tagline,
  welcome_text,
  logo_url,
  banner_image_url,
  hero_title,
  hero_description,
  contact_whatsapp,
  contact_email,
  contact_phone,
  address,
  facebook_url,
  instagram_url,
  youtube_url,
  youtube_channel,
  primary_color,
  accent_color,
  support_cta
)
values (
  'Comunidad Natzratim',
  'Estudio, tradición y comunidad con raíces hebreas.',
  'Una comunidad dedicada al estudio de las Escrituras, la memoria de Israel y la vida comunitaria con reverencia y claridad.',
  '/brand/natzratim-logo.jpg',
  '/brand/natzratim-logo.jpg',
  'Comunidad Natzratim',
  'Un espacio contemporáneo para enseñar, publicar, compartir videos, organizar eventos y acompañar a la comunidad.',
  '+0000000000',
  'contacto@natzratim.org',
  null,
  'Jerusalén, Israel',
  'https://facebook.com',
  'https://instagram.com',
  'https://youtube.com',
  'https://youtube.com',
  '#153a5b',
  '#b08d57',
  'Apoya la obra de estudio y servicio de la comunidad.'
);

insert into public.donations_info (
  title,
  subtitle,
  body,
  bank_name,
  bank_account,
  bank_alias,
  bank_swift,
  qr_code_url,
  donation_url,
  notes
)
values (
  'Apoyar a la comunidad',
  'Cada contribución fortalece el estudio, la difusión y la atención comunitaria.',
  'Puedes apoyar mediante transferencia, donación digital o escaneando el código QR. Toda la información puede actualizarse desde el panel administrativo.',
  'Banco comunitario',
  '000-000000-0',
  'NATZRATIM',
  'NATZ0000',
  null,
  null,
  'Las donaciones se administran con transparencia y se destinan al servicio comunitario.'
);

-- Ejemplo:
-- Crea primero el usuario en Supabase Auth.
-- Luego inserta su perfil en public.users usando el id real de auth.users.
