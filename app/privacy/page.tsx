"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import PageHero from "@/components/ui/PageHero";
import LegalDocument, { type LegalSection } from "@/components/ui/LegalDocument";

// Written against what the site and booking terms actually do with personal information
// (enquiry forms, FareHarbor bookings, courier delivery, in-person pick-up, hosting and email
// providers, the postcode checker). Update it whenever a new tool or process handles personal data.
const LAST_UPDATED = "29 September 2026";

const email = <a href="mailto:info@lasertag4hire.com.au" className="underline hover:text-[var(--ink)]">info@lasertag4hire.com.au</a>;
const phone = <a href="tel:1300661565" className="underline hover:text-[var(--ink)]">1300 661 565</a>;

const POLICY: LegalSection[] = [
  {
    id: "about",
    title: "About this policy",
    blocks: [{
      paragraphs: [
        "CJR Sweeney Pty Ltd trading as Laser Tag 4 Hire (“we”, “us”) hires out laser tag equipment from Port Stephens, NSW, and delivers it across Australia. This policy explains what personal information we collect, why we collect it, who we share it with, and how you can access or correct it.",
        "We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. The policy covers this website, enquiries, bookings, delivery and collection, and anything you tell us by phone or email.",
      ],
    }],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    blocks: [{
      paragraphs: ["We only collect what we need to answer your enquiry and run your hire. Depending on how you deal with us, that can include:"],
      bullets: [
        "Contact details: your name, email address and phone number.",
        "Event details: the date, type of event, postcode, number of players, the package you're interested in, and anything you write in a message.",
        "Delivery and collection details: the address the equipment goes to and is collected from, and who will be there to sign for it.",
        "Booking and payment details: what you booked, amounts paid and payment status. Online card and Afterpay payments are handled by our booking and payment providers. If you give us card details over the phone, we use them only to process that payment and don't write them down or store them anywhere.",
        "Identification: if you collect equipment in person, our booking terms require ID showing your address. We look at it to confirm who is hiring the equipment, and we don't copy, record or store it.",
        "Newsletter subscriptions: your name and email address if you subscribe to our emails.",
        "Our communications with you, including emails, social media messages and notes from phone calls.",
        "Technical information when you use the website, such as your IP address, browser type and the pages you visit, which our hosting provider records in standard server logs and Google Analytics measures on our behalf (see Cookies and website data below).",
      ],
    }],
  },
  {
    id: "how-we-collect",
    title: "How we collect it",
    blocks: [{
      bullets: [
        "Directly from you: through the quote and contact forms on this site, our online booking system, by phone, by email, through social media, when you subscribe to our emails, or in person.",
        "From someone booking on your behalf, such as a school, vacation care service or event organiser who gives us your details as the contact on the day.",
        "Automatically, when your browser loads this website or uses the delivery-area map and postcode checker.",
      ],
    }, {
      paragraphs: [
        "You can ask general questions without telling us who you are. To quote for or book a hire we need your contact and event details, and we can't deliver without an address.",
      ],
    }],
  },
  {
    id: "why",
    title: "Why we use it",
    blocks: [{
      bullets: [
        "To reply to enquiries and prepare quotes.",
        "To take, confirm and manage bookings, including deposits and payments.",
        "To arrange delivery, collection and returns with our couriers.",
        "To support you during your hire if something isn't working.",
        "To deal with late returns, lost or damaged equipment, and anything else covered by our booking terms.",
        "To keep business and tax records we're required to keep by law.",
        "To look after and improve this website, and keep it secure.",
        "To send occasional newsletters and offers to people who've subscribed (see Marketing below).",
      ],
    }, {
      paragraphs: ["We don't sell or rent personal information to anyone."],
    }],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    blocks: [{
      paragraphs: ["We share personal information only with the businesses that help us run the service, and only what each needs to do its job:"],
      bullets: [
        "Our online booking system (FareHarbor) and payment providers, including Afterpay if you choose it, to take bookings and process payments.",
        "Courier companies, who receive your name, delivery address and phone number to deliver and collect the equipment.",
        "Our email service (Resend), which sends the messages generated by the enquiry forms.",
        "Our email hosting provider, which stores the emails we send and receive.",
        "Our email marketing service, which stores subscribers' names and email addresses to send our newsletters.",
        "Our accounting software, which holds invoices and payment records.",
        "Social media platforms such as Facebook and Instagram, when you contact us through them. Those messages are also handled under the platform's own privacy policy.",
        "Our website host (Vercel), which runs this site and keeps server logs.",
        "Google Analytics, which measures how visitors use this website.",
        "Map and location services (OpenStreetMap), which receive your IP address when the delivery map loads, and any postcode or suburb you type into the postcode checker.",
        "Professional advisers such as our accountant, and government agencies or authorities when the law requires it.",
      ],
    }],
  },
  {
    id: "overseas",
    title: "Information sent overseas",
    blocks: [{
      paragraphs: [
        "Some of the providers above store or process information outside Australia, mainly in the United States and Europe. We choose established providers with their own privacy and security obligations, and we take reasonable steps to make sure they handle your information in a way that's consistent with the Australian Privacy Principles.",
      ],
    }],
  },
  {
    id: "cookies",
    title: "Cookies and website data",
    blocks: [{
      paragraphs: [
        "We use Google Analytics to understand how people find and use this website, such as which pages are visited, how long people stay, roughly where they are (to city level), what device and browser they use, and whether an enquiry form was sent. It uses cookies and your IP address to do this. We don't send Google your name, email address, phone number or anything you type into our forms, and we don't use Google Analytics for advertising.",
        <>You can stop Google Analytics collecting data about your visits by installing the{" "}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--ink)]">Google Analytics opt-out browser add-on</a>, or by blocking or clearing cookies in your browser settings.</>,
        "Some embedded services, such as the booking calendar and the delivery map, may set their own cookies or collect technical information under their own privacy policies. Parts of the booking calendar may not work if you block cookies.",
        "This website doesn't use advertising cookies. If we add advertising tools in future, we'll update this policy first.",
      ],
    }],
  },
  {
    id: "marketing",
    title: "Marketing",
    blocks: [{
      paragraphs: [
        "We send occasional email newsletters and offers to people who've subscribed. In line with the Spam Act 2003, we only send them with your consent, and every one identifies us and includes an unsubscribe link. You can also ask us to stop at any time by email or phone, and we'll remove you promptly.",
        "Messages about a booking you've made, such as confirmations and delivery details, aren't marketing and will still be sent.",
      ],
    }],
  },
  {
    id: "children",
    title: "Children and photos",
    blocks: [{
      paragraphs: [
        "Our hires are booked by adults. Children often play at events, but we don't need their personal information, so please don't include it in enquiry forms or messages.",
        "The photos and videos on this website come from our own promotional shoots, where everyone taking part gave consent, with a parent or guardian consenting for anyone under 18.",
        "We only post photos from customers' events when the customer has shared them with us to post. If you'd like a photo of you or your child taken down, contact us and we'll remove it.",
      ],
    }],
  },
  {
    id: "security",
    title: "Storage, security and how long we keep it",
    blocks: [{
      paragraphs: [
        "We take reasonable steps to protect personal information from misuse, loss and unauthorised access, including limiting access to the people who need it and using providers with appropriate security.",
        "We keep information for as long as we need it for the purposes above. Business and tax records are generally kept for five years, as the law requires. After that, we securely delete or de-identify it.",
        "If a data breach is likely to cause you serious harm, we'll let you know and tell the Office of the Australian Information Commissioner where required.",
      ],
    }],
  },
  {
    id: "access",
    title: "Accessing and correcting your information",
    blocks: [{
      paragraphs: [
        <>You can ask for a copy of the personal information we hold about you, or ask us to correct it, by contacting us at {email} or {phone}. We may need to confirm your identity first. We&apos;ll respond within 30 days, and there&apos;s no charge to make a request.</>,
      ],
    }],
  },
  {
    id: "complaints",
    title: "Complaints",
    blocks: [{
      paragraphs: [
        <>If you&apos;re concerned about how we&apos;ve handled your personal information, please contact us first at {email} and we&apos;ll respond within 30 days.</>,
        <>If you&apos;re not satisfied with our response, you can complain to the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--ink)]">oaic.gov.au</a> or on 1300 363 992.</>,
      ],
    }],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [{
      paragraphs: [
        <>We&apos;ll update this policy when the way we handle personal information changes. The latest version is always on this page. For how bookings work, see our <Link href="/terms" className="underline hover:text-[var(--ink)]">booking terms</Link>.</>,
      ],
    }],
  },
  {
    id: "contact",
    title: "Contact us",
    blocks: [{
      paragraphs: [<>CJR Sweeney Pty Ltd trading as Laser Tag 4 Hire. Email {email} or call {phone}.</>],
    }],
  },
];

export default function PrivacyPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <main className="min-h-[100dvh] section-cream">
        <PageHero image="/images/page_header_privacy.jpg" title="Privacy policy">
          What we collect, why, and who sees it. The short version: only what we need to run your hire, and we never sell it.
        </PageHero>
        <LegalDocument sections={POLICY} version={`Last updated ${LAST_UPDATED}`} />
      </main>
      <Footer />
      <EnquiryModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
