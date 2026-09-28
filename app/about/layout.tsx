import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Laser tag equipment hire from the team behind Battlezone Laser Tag in Port Stephens NSW, delivered across Australia. How we started, and how we work.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
