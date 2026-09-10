import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Laser Tag 4 Hire | Laser Tag Equipment Hire, Delivered to You",
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
      "Equipment delivered charged, set up in about ten minutes, returned with a prepaid courier. Hired for birthdays, school events and corporate days since 2007.",
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
    </html>
  );
}
