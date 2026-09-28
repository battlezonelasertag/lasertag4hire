"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import PageHero from "@/components/ui/PageHero";
import LegalDocument, { type LegalSection } from "@/components/ui/LegalDocument";

// Booking terms as supplied by Laser Tag 4 Hire (version dated March 2025).
// Wording is reproduced as written; only headings and lists are formatted for the web.
const TERMS: LegalSection[] = [
  {
    id: "bookings",
    title: "1. Bookings",
    blocks: [{
      paragraphs: [
        "Bookings can be made online, by phone, or via email. When you book, we will register your booking as tentative until confirmed with a deposit. Bookings requiring delivery must be made at least two weeks before the event to allow for scheduling. Once booked, you will receive an email with your booking details. Please review this carefully, as we cannot be held responsible for incorrect information.",
        "We accept bookings up to 12 months in advance, subject to availability. A booking is secured only when the deposit is received. We recommend booking at least four weeks prior to your event to avoid disappointment. A Tax Invoice is available upon request. No booking is final until payment is received. Terms & Conditions have been accepted by the customer when your booking is confirmed.",
      ],
    }],
  },
  {
    id: "payment",
    title: "2. Payment",
    blocks: [{
      paragraphs: [
        "Full payment is due 10 days before dispatch. Equipment will not be shipped without full payment. Payment methods include Visa, Amex (with a surcharge), Afterpay or Direct Deposit. Direct deposits must be cleared two days before the due date.",
      ],
    }],
  },
  {
    id: "cancellations",
    title: "3. Transfers, refunds & cancellations",
    blocks: [{
      paragraphs: [
        "Booking transfers are subject to availability. Once the equipment is packed or shipped, bookings cannot be transferred or cancelled. If cancellation occurs after shipping, no refund is provided. If cancelled at least 14 days before the event (or shipping date), no extra fees apply unless the package is in transit. A $25 processing fee applies for postponements within 14 days but before packing. Cancellations within 14 days forfeit 50% of the booking. All cancellations or transfers must be confirmed via email.",
      ],
    }],
  },
  {
    id: "liability",
    title: "4. Liability release & assumption of risk",
    blocks: [{
      paragraphs: [
        "Laser Tag 4 Hire involves inherent risks. We recommend reviewing the provided safety guide, particularly enforcing a no-running rule. By accepting these terms, you acknowledge responsibility for any injury, damage, or loss arising from the equipment's use. The hirer is responsible for proper use and for any damages incurred.",
      ],
    }],
  },
  {
    id: "conduct",
    title: "5. Conduct & equipment damage",
    blocks: [{
      bullets: [
        "Physical contact must be avoided to prevent injury.",
        "Supervisors must ensure safe play, hydration, and breaks.",
        "Inflatable objects are NOT for jumping. Any damage requiring replacement will be charged to the hirer.",
        "Equipment is checked before dispatch and includes limited damage insurance ($50 for an 10 pack or larger). Damage beyond this coverage is the hirer's responsibility.",
        "The hirer must cover repair/replacement costs within seven days of damage assessment. Repairs are costed at $88p.h. Parts are costed at current rates.",
      ],
    }],
  },
  {
    id: "shipping",
    title: "6. Shipping & returns",
    blocks: [
      {
        heading: "6.1 Hire pick-up/return in person",
        paragraphs: [
          "Standard hire is overnight, with FREE Sunday when hiring for Saturday. Equipment must be collected Friday and returned Monday unless otherwise arranged. ID with an address is required at pickup. Late returns incur daily hire fees (up to 20% of rental per day).",
        ],
      },
      {
        heading: "6.2 Courier delivery & collection",
        paragraphs: [
          "Delivery occurs 1-3 business days before your event. Someone must be available to sign for the package. If missed, re-delivery may be required and a possible courier fee attached. No refunds will be provided for failed deliveries due to incorrect addresses or unavailability.",
          "For courier returns, equipment must be packed with return labels included. Pick-up is the first business day after your event between 9 AM and 5 PM. If pick-up is missed or the equipment is not ready, late fees apply (up to 20% of rental per day). We recommend using a business address to avoid waiting for the courier.",
        ],
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "7. Troubleshooting",
    blocks: [{
      paragraphs: ["Equipment is pre-set to different modes depending on your package. 24/7 support is available if needed."],
    }],
  },
  {
    id: "jurisdiction",
    title: "8. Jurisdiction",
    blocks: [{
      paragraphs: ["This agreement is governed by the laws of New South Wales, Australia. Any disputes must be resolved in NSW courts."],
    }],
  },
  {
    id: "amendments",
    title: "9. Amendments",
    blocks: [{
      paragraphs: ["We reserve the right to update these terms at any time. Please check our website for the latest version. Continued use of our services implies agreement to the updated terms."],
    }],
  },
];

export default function TermsPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh] section-cream">
        <PageHero image="/images/page_header_tandc.jpg" title="Booking terms & conditions">
          These terms apply to every hire. Questions about any of them?{" "}
          <a href="tel:1300661565" className="text-white/80 hover:text-white underline">Call 1300 661 565</a>.
        </PageHero>

        <LegalDocument sections={TERMS} version="Version dated March 2025" />
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
