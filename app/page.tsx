"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import BenefitsTicker from "@/components/home/BenefitsTicker";
import HowItWorks from "@/components/home/HowItWorks";
import EventTypes from "@/components/home/EventTypes";
import PackageTeaser from "@/components/home/PackageTeaser";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import ServiceArea from "@/components/home/ServiceArea";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";
import EnquiryModal from "@/components/ui/EnquiryModal";
import SectionDivider from "@/components/ui/SectionDivider";

const CREAM = "#f7f9fb";
const DARK  = "#09090B";
const SKY   = "#dce8f5";

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuoteClick={() => setQuoteOpen(true)} />
        <BenefitsTicker />
        <HowItWorks />
        <SectionDivider from={CREAM} to={SKY} variant="wave" flip />
        <EventTypes />
        <SectionDivider from={SKY} to={CREAM} variant="organic" />
        <PackageTeaser />
        <SectionDivider from={CREAM} to={DARK} variant="splash" flip />
        <WhyChooseUs />
        <SectionDivider from={DARK} to={CREAM} variant="organic" />
        <Testimonials />
        <SectionDivider from={CREAM} to={SKY} variant="organic" flip />
        <ServiceArea />
        <SectionDivider from={SKY} to={CREAM} variant="wave" />
        <FAQPreview />
        <FinalCTA onQuoteClick={() => setQuoteOpen(true)} />
      </main>
      <div style={{ background: "var(--crimson)", padding: "0 clamp(12px,1.8vw,24px)" }}>
        <Footer />
      </div>
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
