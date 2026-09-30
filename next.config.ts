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

// PostHog reverse proxy: analytics requests go through our own domain so ad blockers don't drop
// them. The path must match POSTHOG_PROXY_PATH in lib/analytics.ts.
const POSTHOG_PROXY_PATH = "/relay-lt4h";
const POSTHOG_REGION = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  // PostHog's API paths end in a slash; Next's trailing-slash redirect would break them.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return OLD_SITE_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async rewrites() {
    return [
      { source: `${POSTHOG_PROXY_PATH}/static/:path*`, destination: `https://${POSTHOG_REGION}-assets.i.posthog.com/static/:path*` },
      { source: `${POSTHOG_PROXY_PATH}/array/:path*`, destination: `https://${POSTHOG_REGION}-assets.i.posthog.com/array/:path*` },
      { source: `${POSTHOG_PROXY_PATH}/:path*`, destination: `https://${POSTHOG_REGION}.i.posthog.com/:path*` },
    ];
  },
};

export default nextConfig;
