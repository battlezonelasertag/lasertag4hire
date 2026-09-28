import type { Metadata } from "next";
import { PACKAGES } from "@/lib/data";

const TAGGER_PHRASES: Record<string, string> = {
  "bolter-no-scope": "Bolter taggers",
  "bolter-scope":    "Bolter taggers with red-dot scopes",
  "predator":        "Predator taggers",
};

const FULL_NAMES: Record<string, string> = {
  "bolter-no-scope": "Bolter (no scope)",
  "bolter-scope":    "Bolter with red-dot scope",
  "predator":        "Predator",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) return {};

  const name = FULL_NAMES[pkg.id] ?? pkg.name;
  return {
    title: { absolute: `${name} laser tag hire | Laser Tag 4 Hire` },
    description: `Hire ${pkg.taggers} ${TAGGER_PHRASES[pkg.id] ?? `${pkg.name} taggers`}: ${pkg.range} range, ${pkg.weight}, ${pkg.ageRange.toLowerCase()}. Delivered charged with medic boxes and a controller, from $${pkg.price}.`,
    alternates: { canonical: `/packages/${pkg.id}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
