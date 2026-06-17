import { createClient } from "@supabase/supabase-js";
import type {
  AdminProfile,
  ArticleCategory,
  ArticleRecord,
  ContactMessageRecord,
  DonationsInfo,
  EventRecord,
  RoleSlug,
  SiteSettings,
  VideoCategory,
  VideoRecord,
} from "@/types/content";
import { defaultDonationsInfo, defaultSiteSettings } from "@/lib/site";
import { mockData } from "@/lib/mock-data";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);
const fallbackRoles = [
  { id: "role-super", slug: "super_admin", name: "Super Administrador" },
  { id: "role-admin", slug: "admin", name: "Administrador" },
];

function publicClient() {
  if (!hasSupabase) return null;
  try {
    return createSupabaseServerClient();
  } catch {
    return createClient(supabaseUrl, supabaseAnonKey);
  }
}

function jsonParse<T>(value: unknown, fallback: T): T {
  if (!value) return fallback;
  if (Array.isArray(value) || typeof value === "object") return value as T;
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function normalizeArticle(row: any, categories: ArticleCategory[] = []): ArticleRecord {
  const category = row.category ?? categories.find((item) => item.id === row.category_id) ?? null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: jsonParse(row.content, []),
    featured_image_url: row.featured_image_url ?? null,
    featured_image_alt: row.featured_image_alt ?? null,
    category,
    category_id: row.category_id ?? category?.id ?? null,
    author_name: row.author_name ?? row.author?.full_name ?? "Comunidad Natzratim",
    author_id: row.author_id ?? null,
    published: Boolean(row.published),
    published_at: row.published_at ?? null,
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
    reading_time_minutes: row.reading_time_minutes ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function normalizeVideo(row: any, categories: VideoCategory[] = []): VideoRecord {
  const category = row.category ?? categories.find((item) => item.id === row.category_id) ?? null;
  const youtubeId = row.youtube_id || youtubeIdFromUrl(row.youtube_url);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    youtube_url: row.youtube_url,
    youtube_id: youtubeId,
    thumbnail_url: row.thumbnail_url ?? youtubeThumbnailUrl(youtubeId),
    category,
    category_id: row.category_id ?? category?.id ?? null,
    published: Boolean(row.published),
    published_at: row.published_at ?? null,
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
    content: jsonParse(row.content, []),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function normalizeEvent(row: any): EventRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: jsonParse(row.content, []),
    event_date: row.event_date,
    start_time: row.start_time ?? null,
    end_time: row.end_time ?? null,
    location: row.location ?? null,
    location_label: row.location_label ?? null,
    category: row.category ?? "Evento",
    published: Boolean(row.published),
    published_at: row.published_at ?? null,
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function settingsFromRow(row: any | null): SiteSettings {
  if (!row) return defaultSiteSettings;
  return {
    id: row.id,
    site_name: row.site_name ?? defaultSiteSettings.site_name,
    tagline: row.tagline ?? defaultSiteSettings.tagline,
    welcome_text: row.welcome_text ?? defaultSiteSettings.welcome_text,
    logo_url: row.logo_url ?? defaultSiteSettings.logo_url,
    banner_image_url: row.banner_image_url ?? defaultSiteSettings.banner_image_url,
    hero_title: row.hero_title ?? defaultSiteSettings.hero_title,
    hero_description: row.hero_description ?? defaultSiteSettings.hero_description,
    contact_whatsapp: row.contact_whatsapp ?? defaultSiteSettings.contact_whatsapp,
    contact_email: row.contact_email ?? defaultSiteSettings.contact_email,
    contact_phone: row.contact_phone ?? null,
    address: row.address ?? null,
    facebook_url: row.facebook_url ?? null,
    instagram_url: row.instagram_url ?? null,
    youtube_url: row.youtube_url ?? null,
    youtube_channel: row.youtube_channel ?? null,
    primary_color: row.primary_color ?? defaultSiteSettings.primary_color,
    accent_color: row.accent_color ?? defaultSiteSettings.accent_color,
    support_cta: row.support_cta ?? defaultSiteSettings.support_cta,
  };
}

function donationsFromRow(row: any | null): DonationsInfo {
  if (!row) return defaultDonationsInfo;
  return {
    id: row.id,
    title: row.title ?? defaultDonationsInfo.title,
    subtitle: row.subtitle ?? defaultDonationsInfo.subtitle,
    body: row.body ?? defaultDonationsInfo.body,
    bank_name: row.bank_name ?? null,
    bank_account: row.bank_account ?? null,
    bank_alias: row.bank_alias ?? null,
    bank_swift: row.bank_swift ?? null,
    qr_code_url: row.qr_code_url ?? null,
    donation_url: row.donation_url ?? null,
    notes: row.notes ?? null,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSupabase) return defaultSiteSettings;
  const client = publicClient();
  const { data } = await client!.from("site_settings").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  return settingsFromRow(data);
}

export async function getDonationsInfo(): Promise<DonationsInfo> {
  if (!hasSupabase) return defaultDonationsInfo;
  const client = publicClient();
  const { data } = await client!.from("donations_info").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle();
  return donationsFromRow(data);
}

export async function getArticleCategories(): Promise<ArticleCategory[]> {
  if (!hasSupabase) return mockData.articleCategories;
  const client = publicClient();
  const { data } = await client!.from("article_categories").select("*").order("sort_order", { ascending: true }).order("name");
  return data ?? [];
}

export async function getVideoCategories(): Promise<VideoCategory[]> {
  if (!hasSupabase) return mockData.videoCategories;
  const client = publicClient();
  const { data } = await client!.from("video_categories").select("*").order("sort_order", { ascending: true }).order("name");
  return data ?? [];
}

export async function getRoles() {
  if (!hasSupabase) return fallbackRoles;
  const client = publicClient();
  const { data } = await client!.from("roles").select("*").order("name");
  return data ?? fallbackRoles;
}

export async function listArticles(options: { search?: string; categorySlug?: string; limit?: number; includeDrafts?: boolean } = {}) {
  const { search = "", categorySlug = "", limit, includeDrafts = false } = options;
  if (!hasSupabase) {
    let rows = mockData.articles;
    if (!includeDrafts) rows = rows.filter((item) => item.published);
    if (search) {
      const term = search.toLowerCase();
      rows = rows.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.excerpt.toLowerCase().includes(term) ||
          item.author_name.toLowerCase().includes(term),
      );
    }
    if (categorySlug) {
      rows = rows.filter((item) => item.category?.slug === categorySlug);
    }
    return limit ? rows.slice(0, limit) : rows;
  }

  const client = publicClient();
  let query = client!.from("articles").select("*, category:article_categories(*), author:users(full_name, username)").order("published_at", { ascending: false });
  if (!includeDrafts) query = query.eq("published", true);
  if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  if (categorySlug) {
    const categories = await getArticleCategories();
    const category = categories.find((item) => item.slug === categorySlug);
    if (category) query = query.eq("category_id", category.id);
  }
  if (limit) query = query.limit(limit);
  const { data } = await query;
  const categories = await getArticleCategories();
  return (data ?? []).map((row) => normalizeArticle(row, categories));
}

export async function getArticleBySlug(slug: string): Promise<ArticleRecord | null> {
  if (!hasSupabase) {
    return mockData.articles.find((item) => item.slug === slug) ?? null;
  }
  const client = publicClient();
  const categories = await getArticleCategories();
  const { data } = await client!.from("articles").select("*, category:article_categories(*), author:users(full_name, username)").eq("slug", slug).maybeSingle();
  return data ? normalizeArticle(data, categories) : null;
}

export async function getArticleById(id: string): Promise<ArticleRecord | null> {
  if (!hasSupabase) return mockData.articles.find((item) => item.id === id) ?? null;
  const client = publicClient();
  const categories = await getArticleCategories();
  const { data } = await client!.from("articles").select("*, category:article_categories(*), author:users(full_name, username)").eq("id", id).maybeSingle();
  return data ? normalizeArticle(data, categories) : null;
}

export async function listVideos(options: { search?: string; categorySlug?: string; limit?: number; includeDrafts?: boolean } = {}) {
  const { search = "", categorySlug = "", limit, includeDrafts = false } = options;
  if (!hasSupabase) {
    let rows = mockData.videos;
    if (!includeDrafts) rows = rows.filter((item) => item.published);
    if (search) {
      const term = search.toLowerCase();
      rows = rows.filter((item) => item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term));
    }
    if (categorySlug) rows = rows.filter((item) => item.category?.slug === categorySlug);
    return limit ? rows.slice(0, limit) : rows;
  }

  const client = publicClient();
  let query = client!.from("videos").select("*, category:video_categories(*)").order("published_at", { ascending: false });
  if (!includeDrafts) query = query.eq("published", true);
  if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  if (categorySlug) {
    const categories = await getVideoCategories();
    const category = categories.find((item) => item.slug === categorySlug);
    if (category) query = query.eq("category_id", category.id);
  }
  if (limit) query = query.limit(limit);
  const { data } = await query;
  const categories = await getVideoCategories();
  return (data ?? []).map((row) => normalizeVideo(row, categories));
}

export async function getVideoBySlug(slug: string): Promise<VideoRecord | null> {
  if (!hasSupabase) return mockData.videos.find((item) => item.slug === slug) ?? null;
  const client = publicClient();
  const categories = await getVideoCategories();
  const { data } = await client!.from("videos").select("*, category:video_categories(*)").eq("slug", slug).maybeSingle();
  return data ? normalizeVideo(data, categories) : null;
}

export async function getVideoById(id: string): Promise<VideoRecord | null> {
  if (!hasSupabase) return mockData.videos.find((item) => item.id === id) ?? null;
  const client = publicClient();
  const categories = await getVideoCategories();
  const { data } = await client!.from("videos").select("*, category:video_categories(*)").eq("id", id).maybeSingle();
  return data ? normalizeVideo(data, categories) : null;
}

export async function listEvents(options: { search?: string; month?: string; limit?: number; includeDrafts?: boolean } = {}) {
  const { search = "", month = "", limit, includeDrafts = false } = options;
  if (!hasSupabase) {
    let rows = mockData.events;
    if (!includeDrafts) rows = rows.filter((item) => item.published);
    if (search) {
      const term = search.toLowerCase();
      rows = rows.filter((item) => item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term));
    }
    if (month) {
      rows = rows.filter((item) => item.event_date.startsWith(month));
    }
    return limit ? rows.slice(0, limit) : rows;
  }
  const client = publicClient();
  let query = client!.from("events").select("*").order("event_date", { ascending: true });
  if (!includeDrafts) query = query.eq("published", true);
  if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,location.ilike.%${search}%`);
  if (month) {
    const [year, monthIndex] = month.split("-").map(Number);
    if (Number.isFinite(year) && Number.isFinite(monthIndex)) {
      const startDate = new Date(Date.UTC(year, monthIndex - 1, 1));
      const endDate = new Date(Date.UTC(year, monthIndex, 1));
      query = query.gte("event_date", startDate.toISOString().slice(0, 10)).lt("event_date", endDate.toISOString().slice(0, 10));
    }
  }
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data ?? []).map(normalizeEvent);
}

export async function getEventBySlug(slug: string): Promise<EventRecord | null> {
  if (!hasSupabase) return mockData.events.find((item) => item.slug === slug) ?? null;
  const client = publicClient();
  const { data } = await client!.from("events").select("*").eq("slug", slug).maybeSingle();
  return data ? normalizeEvent(data) : null;
}

export async function getEventById(id: string): Promise<EventRecord | null> {
  if (!hasSupabase) return mockData.events.find((item) => item.id === id) ?? null;
  const client = publicClient();
  const { data } = await client!.from("events").select("*").eq("id", id).maybeSingle();
  return data ? normalizeEvent(data) : null;
}

export async function listContactMessages() {
  if (!hasSupabase) return [] as ContactMessageRecord[];
  const client = publicClient();
  const { data } = await client!.from("contact_messages").select("*").order("created_at", { ascending: false });
  return (data ?? []) as ContactMessageRecord[];
}

export async function getAdmins(): Promise<AdminProfile[]> {
  if (!hasSupabase) return [];
  const client = publicClient();
  const { data } = await client!.from("users").select("*, role:roles(slug)").order("created_at", { ascending: false });
  return (data ?? []).map((row: any) => ({
    id: row.id,
    auth_user_id: row.auth_user_id,
    username: row.username,
    full_name: row.full_name,
    email: row.email,
    role_slug: (row.role?.slug ?? "admin") as RoleSlug,
    avatar_url: row.avatar_url ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}
