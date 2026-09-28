import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";

// Unlisted share page: not linked from the nav, footer or sitemap, and kept out of search results.
const title = "Predator showreel";
const description =
  "40 seconds of the Predator, our flagship laser tagger: red-dot scope, built-in sensors, 100 m range and two teams going head to head.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/showreel" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: `${title} | Laser Tag 4 Hire`,
    description,
    url: "/showreel",
    siteName: "Laser Tag 4 Hire",
    locale: "en_AU",
    type: "video.other",
    videos: [{ url: `${SITE_URL}/video/predator-showreel.mp4`, type: "video/mp4", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Laser Tag 4 Hire`,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
