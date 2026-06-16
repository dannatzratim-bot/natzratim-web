export function formatDate(value?: string | null) {
  if (!value) return "Por definir";
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value?: string | null) {
  if (!value) return "Por definir";
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatTime(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 5);
}

export function youtubeIdFromUrl(url?: string | null) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.replace("/", "");
    if (parsed.searchParams.get("v")) return parsed.searchParams.get("v") || "";
    if (parsed.pathname.includes("/embed/")) return parsed.pathname.split("/embed/")[1] || "";
  } catch {
    return url;
  }
  return url;
}

export function youtubeEmbedUrl(urlOrId?: string | null) {
  if (!urlOrId) return "";
  const id = urlOrId.includes("youtube") || urlOrId.includes("youtu.be") ? youtubeIdFromUrl(urlOrId) : urlOrId;
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

export function youtubeThumbnailUrl(urlOrId?: string | null) {
  if (!urlOrId) return "";
  const id = urlOrId.includes("youtube") || urlOrId.includes("youtu.be") ? youtubeIdFromUrl(urlOrId) : urlOrId;
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}
