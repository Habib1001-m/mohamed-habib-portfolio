export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://habib.systems").replace(/\/$/, "");

export const SITE_NAME = "Mohamed Habib Portfolio";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
