import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking terms & conditions",
  description:
    "Laser Tag 4 Hire booking terms: deposits and payment, cancellations and transfers, equipment damage, delivery, collection and returns.",
  alternates: { canonical: "/terms" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
