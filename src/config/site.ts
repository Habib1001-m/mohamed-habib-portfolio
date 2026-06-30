export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohamed-habib-portfolio-opal.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Mohamed Habib Portfolio";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
