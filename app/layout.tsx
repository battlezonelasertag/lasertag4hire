import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/data";

// Production deployment only: keeps local dev and Vercel preview traffic out of the reports.
const loadAnalytics = Boolean(GA_MEASUREMENT_ID) && process.env.VERCEL_ENV === "production";

// Self-hosted (latin variable files from Google Fonts, OFL). next/font/google fetches from Google
// at build time and intermittently fails the build on Vercel, so the files live in the repo.
const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin-var.woff2",
  variable: "--font-syne",
  weight: "400 700",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin-var.woff2",
  variable: "--font-dm-sans",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Laser Tag 4 Hire | Laser Tag Equipment Hire, Delivered to You",
    template: "%s | Laser Tag 4 Hire",
  },
  alternates: { canonical: "/" },
  description:
    "Hire laser tag equipment for birthdays, school events, corporate team days and more. Delivered to your door across Australia. Three packages from $549, book online today.",
  keywords: [
    "laser tag hire",
    "laser tag rental",
    "laser tag equipment",
    "laser tag birthday party",
    "laser tag hire Australia",
    "NSW laser tag",
    "Port Stephens laser tag",
    "mobile laser tag",
  ],
  openGraph: {
    title: "Laser Tag 4 Hire | Laser Tag. Delivered.",
    description:
      "Equipment delivered charged, set up in about ten minutes, returned with a prepaid courier. Hired for birthdays, school events and corporate days, from the team behind Battlezone Laser Tag.",
    siteName: "Laser Tag 4 Hire",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        {children}
      </body>
      {loadAnalytics && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
