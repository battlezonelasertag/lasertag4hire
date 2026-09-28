import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick start guide",
  description:
    "How to switch on the controller, medic boxes and taggers, start and stop a game, where to aim, reloading, fire modes and respawning, with a short clip for each step.",
  alternates: { canonical: "/quick-start" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
