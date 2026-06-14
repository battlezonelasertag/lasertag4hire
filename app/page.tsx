"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import HowItWorks from "@/components/home/HowItWorks";
import EventTypes from "@/components/home/EventTypes";
import PackageTeaser from "@/components/home/PackageTeaser";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Gallery from "@/components/home/Gallery";
import VideoSection from "@/components/home/VideoSection";
import Testimonials from "@/components/home/Testimonials";
import ServiceArea from "@/components/home/ServiceArea";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuoteClick={() => setQuoteOpen(true)} />
        <StatsBar />
        <HowItWorks />
        <EventTypes />
        <PackageTeaser />
        <WhyChooseUs />
        <Gallery />
        <VideoSection />
        <Testimonials />
        <ServiceArea />
        <FAQPreview />
        <FinalCTA onQuoteClick={() => setQuoteOpen(true)} />
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
