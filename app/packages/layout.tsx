import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laser tag hire packages",
  description:
    "Compare the Bolter, Bolter with red-dot scope and Predator packages. 10 taggers, medic boxes and a controller, delivered charged from $549.",
  alternates: { canonical: "/packages" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
