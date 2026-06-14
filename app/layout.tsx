import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Laser Tag 4 Hire | Laser Tag Equipment Hire — Delivered to You",
  description:
    "Hire laser tag equipment for birthdays, school events, corporate team days and more. Delivered to your door across NSW. Three packages from $549 — book online today.",
  keywords: [
    "laser tag hire",
    "laser tag rental",
    "laser tag equipment",
    "laser tag birthday party",
    "NSW laser tag",
    "Port Stephens laser tag",
    "mobile laser tag",
  ],
  openGraph: {
    title: "Laser Tag 4 Hire | Laser Tag. Delivered.",
    description:
      "Equipment delivered, set up in minutes, returned with a prepaid courier. Epic battles for birthdays, school events and corporate days.",
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
      className={`${syne.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
