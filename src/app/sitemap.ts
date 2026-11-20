import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/lib/seo";

const pages = [""];
const LAST_MODIFIED = new Date("2026-11-20"); 

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${path}`])),
      },
    })),
  );
}