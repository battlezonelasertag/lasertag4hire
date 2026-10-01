import type { NextConfig } from "next";

// Addresses from the previous (Webflow) site, so old links and search results land on the new pages.
const OLD_SITE_REDIRECTS: [string, string][] = [
  ["/about-us", "/about"],
  ["/bolter-no-scopes", "/packages/bolter-no-scope"],
  ["/bolter-scopes", "/packages/bolter-scope"],
  ["/predator", "/packages/predator"],
  ["/privacy-policy", "/privacy"],
  ["/quick-start-guide", "/quick-start"],
  ["/terms-and-conditions", "/terms"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return OLD_SITE_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
