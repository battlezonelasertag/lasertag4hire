import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get a quote or ask a question about laser tag hire. Call 1300 661 565 or send an enquiry and we'll reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
