import type { MetadataRoute } from "next";
import { PACKAGES, SITE_URL } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/packages", priority: 0.9 },
    ...PACKAGES.map((p) => ({ path: `/packages/${p.id}`, priority: 0.8 })),
    { path: "/quick-start", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/terms", priority: 0.2 },
    { path: "/privacy", priority: 0.2 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    priority,
  }));
}
