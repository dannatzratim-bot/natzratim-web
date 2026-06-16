export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(value: string, length = 140) {
  if (value.length <= length) return value;
  return `${value.slice(0, Math.max(0, length - 1)).trimEnd()}…`;
}
