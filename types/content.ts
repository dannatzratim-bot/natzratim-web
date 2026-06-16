export type RoleSlug = "super_admin" | "admin";

export type ContentBlock =
  | {
      id: string;
      type: "heading";
      level: 1 | 2 | 3 | 4;
      text: string;
    }
  | {
      id: string;
      type: "paragraph";
      text: string;
    }
  | {
      id: string;
      type: "list";
      items: string[];
    }
  | {
      id: string;
      type: "quote";
      text: string;
      cite?: string;
    }
  | {
      id: string;
      type: "verse";
      text: string;
      reference?: string;
    }
  | {
      id: string;
      type: "highlight";
      text: string;
    }
  | {
      id: string;
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      id: string;
      type: "link";
      text: string;
      href: string;
    }
  | {
      id: string;
      type: "separator";
    };

export type NavItem = {
  label: string;
  href: string;
};

export type ArticleCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type VideoCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type SiteSettings = {
  id?: string;
  site_name: string;
  tagline: string;
  welcome_text: string;
  logo_url: string;
  banner_image_url: string;
  hero_title: string;
  hero_description: string;
  contact_whatsapp: string;
  contact_email: string;
  contact_phone?: string | null;
  address?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  youtube_channel?: string | null;
  primary_color?: string | null;
  accent_color?: string | null;
  support_cta?: string | null;
};

export type DonationsInfo = {
  id?: string;
  title: string;
  subtitle: string;
  body: string;
  bank_name?: string | null;
  bank_account?: string | null;
  bank_alias?: string | null;
  bank_swift?: string | null;
  qr_code_url?: string | null;
  donation_url?: string | null;
  notes?: string | null;
};

export type ArticleRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  featured_image_url?: string | null;
  featured_image_alt?: string | null;
  category?: ArticleCategory | null;
  category_id?: string | null;
  author_name: string;
  author_id?: string | null;
  published: boolean;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  reading_time_minutes?: number | null;
  created_at: string;
  updated_at: string;
};

export type VideoRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  youtube_url: string;
  youtube_id: string;
  thumbnail_url?: string | null;
  category?: VideoCategory | null;
  category_id?: string | null;
  published: boolean;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  content: ContentBlock[];
  created_at: string;
  updated_at: string;
};

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  event_date: string;
  start_time?: string | null;
  end_time?: string | null;
  location?: string | null;
  location_label?: string | null;
  category: string;
  published: boolean;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessageRecord = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  read_at?: string | null;
  created_at: string;
};

export type AdminProfile = {
  id: string;
  auth_user_id: string;
  username: string;
  full_name: string;
  email: string;
  role_slug: RoleSlug;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
};
