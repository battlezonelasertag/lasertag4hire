import type { Package, AddOn, EventType, Testimonial, FAQ, Stat, HowItWorksStep, Feature } from "./types";

export const PACKAGES: Package[] = [
  {
    id: "bolter-no-scope",
    name: "Bolter",
    tagline: "No scope",
    price: 549,
    taggers: 10,
    weight: "1.4kg",
    range: "50m",
    ageRange: "Ages 5+",
    bestFor: ["Younger kids", "Backyard parties", "Vacation care"],
    features: [
      "10 Bolter taggers",
      "Lightweight 1.4kg design",
      "Integrated body sensors",
      "2 medic boxes",
      "1 master controller",
      "Setup guides included",
      "Prepaid return courier",
    ],
  },
  {
    id: "bolter-scope",
    name: "Bolter",
    tagline: "With red-dot scope",
    price: 599,
    taggers: 10,
    weight: "1.6kg",
    range: "100m",
    ageRange: "Ages 6+",
    bestFor: ["Birthday parties", "School groups", "Vacation care"],
    features: [
      "10 Bolter taggers",
      "Real red-dot scope",
      "100m range in daylight",
      "Integrated body sensors",
      "2 medic boxes",
      "1 master controller",
      "Setup guides included",
      "Prepaid return courier",
    ],
    badge: "Popular",
  },
  {
    id: "predator",
    name: "Predator",
    tagline: "Premium kit",
    price: 649,
    taggers: 10,
    weight: "1.8kg",
    range: "100m",
    ageRange: "Ages 8+",
    bestFor: ["Teens & adults", "Corporate events", "Large outdoor battles"],
    features: [
      "10 Predator taggers",
      "Foregrip + red-dot scope",
      "100m outdoor range",
      "Multiple game modes",
      "Integrated body sensors",
      "2 medic boxes",
      "1 master controller",
      "Prepaid return courier",
    ],
    badge: "Best for big battles",
    featured: true,
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: "extra-taggers",
    name: "Extra taggers",
    description: "Add more players in groups of 4",
    price: null,
    priceLabel: "From $50 / group of 4",
  },
  {
    id: "bunkers",
    name: "Inflatable bunkers",
    description: "Pop-up cover for epic tactical battles",
    price: null,
    priceLabel: "Contact us for pricing",
  },
];

export const EVENT_TYPES: EventType[] = [
  {
    id: "birthday",
    name: "Birthday parties",
    description:
      "Make it a birthday they'll talk about for years. No venue hire, no travel — the battle comes to your backyard.",
    gradient: "from-[#E11D48] to-[#9f0a2a]",
    highlights: ["Ages 6+", "Works in any backyard", "No heavy vests"],
  },
  {
    id: "vacation-care",
    name: "Vacation care",
    description:
      "Keep kids engaged all day. One delivery, hours of structured gameplay with multiple game modes.",
    gradient: "from-[#2563EB] to-[#1e40af]",
    highlights: ["Multiple game modes", "Easy staff setup", "All ages"],
  },
  {
    id: "corporate",
    name: "Corporate team days",
    description:
      "Skip the trust-falls. Laser tag gets teams competing, laughing and communicating — fast.",
    gradient: "from-[#E11D48] to-[#2563EB]",
    highlights: ["No age limit", "Scales to large groups", "Includes support"],
  },
  {
    id: "school",
    name: "School fetes & camps",
    description:
      "Add a crowd-puller to your next fete or end-of-term camp. Easy to run, impossible to ignore.",
    gradient: "from-[#2563EB] to-[#0ea5e9]",
    highlights: ["Low supervision needed", "Risk assessment included", "Safe IR tech"],
  },
  {
    id: "community",
    name: "Community events",
    description:
      "Council days, sports carnivals, youth programs — we bring equipment that gets everyone moving.",
    gradient: "from-[#7c3aed] to-[#E11D48]",
    highlights: ["Scales to any size", "Includes setup guide", "All weather"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Melissa K.",
    role: "Mum — 11th birthday party",
    location: "Maitland, NSW",
    category: "birthday",
    rating: 5,
    quote:
      "Honestly the best party we've ever thrown. The equipment arrived perfectly packed, set up took 10 minutes, and the kids didn't stop playing for 3 hours straight. Will absolutely book again.",
  },
  {
    id: "t2",
    name: "Jordan T.",
    role: "Vacation care coordinator",
    location: "Nelson Bay, NSW",
    category: "school",
    rating: 5,
    quote:
      "We've used Laser Tag 4 Hire twice now for vac care. The kids love it, the staff can actually manage it without stress, and the return process couldn't be simpler. Can't fault it.",
  },
  {
    id: "t3",
    name: "Daniel W.",
    role: "HR Manager, corporate team day",
    location: "Newcastle, NSW",
    category: "corporate",
    rating: 5,
    quote:
      "Our team of 24 played for two hours straight. The Predator taggers were a massive hit — even the most reluctant team members got into it. Genuinely a great bonding activity.",
  },
  {
    id: "t4",
    name: "Sarah G.",
    role: "Events coordinator, community fair",
    location: "Cessnock, NSW",
    category: "community",
    rating: 5,
    quote:
      "Set up a laser tag zone at our community fair and it was one of the most popular attractions on the day. Simple to organise, great phone support on the day. Highly recommend.",
  },
  {
    id: "t5",
    name: "Ben R.",
    role: "Dad — 14th birthday party",
    location: "Raymond Terrace, NSW",
    category: "birthday",
    rating: 5,
    quote:
      "My son specifically asked for laser tag and I'm so glad I found this. Way better value than a venue — the kids had way more fun running around our yard for 4 hours.",
  },
  {
    id: "t6",
    name: "Annette F.",
    role: "Primary school teacher, end-of-year camp",
    location: "Port Stephens, NSW",
    category: "school",
    rating: 5,
    quote:
      "Perfect for our Year 6 camp. The risk assessment was already included which made getting approval easy, and the kids absolutely loved it. Equipment quality was excellent.",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 2–3 weeks in advance, especially for popular weekend dates. That said, if you need something sooner, get in touch directly — we'll always try to help with shorter notice.",
  },
  {
    question: "Is the equipment safe for kids?",
    answer:
      "Completely safe. Our taggers use infrared light — the same technology used in TV remotes and household appliances. There are no projectiles, no pain, and no mess. The equipment is suitable from age 6 up.",
  },
  {
    question: "When does the equipment arrive?",
    answer:
      "Equipment is delivered by courier 2 business days before your event, between 9am and 5pm. You'll need someone home to sign for it. If your home address doesn't work, a workplace or alternate address is fine.",
  },
  {
    question: "How do I send the equipment back?",
    answer:
      "We include everything you need in the box. Return paperwork is pre-filled, and we book the courier pickup for the business day after your event. You don't need to arrange anything — just pack it back up and leave it out for collection.",
  },
  {
    question: "What if I need more than 10 taggers?",
    answer:
      "No problem — you can add taggers in groups of 4. Just let us know how many players you're expecting when you book or enquire, and we'll sort the pricing for you.",
  },
  {
    question: "Does it work indoors and outdoors?",
    answer:
      "Yes. Our equipment works in both environments. Outdoors, the Bolter and Predator taggers have a range of up to 100m. Indoors, you'll want some obstacles for cover — furniture, boxes or inflatable bunkers work great.",
  },
  {
    question: "What's included in the Saturday booking deal?",
    answer:
      "If your event is on a Saturday, Sunday is included at no extra cost. That means you get a two-day hire for the price of one — ideal if your party runs late or you want an extra day of play.",
  },
  {
    question: "What if there's a shipping delay?",
    answer:
      "In the rare event of a courier delay, we'll work with you on a solution — whether that's a rental extension, partial refund, or expedited redelivery. We'll always be in contact and won't leave you without options.",
  },
  {
    question: "What game modes are available?",
    answer:
      "Our master controller supports multiple game modes including Team Deathmatch, Solo Survival, Last Man Standing, and Protect the Medic. Full instructions are included, and we're a phone call away if you need help setting them up.",
  },
  {
    question: "What's your battery life?",
    answer:
      "The taggers provide 12+ hours of continuous play on a full charge — we send them fully charged. Control units and medic boxes have comparable battery life, so you won't need to charge anything for a standard event.",
  },
];

export const STATS: Stat[] = [
  { value: "500", suffix: "+", label: "Events run", numeric: 500 },
  { value: "18", suffix: "", label: "Years in business", numeric: 18 },
  { value: "12", suffix: "hr", label: "Battery life", numeric: 12 },
  { value: "100", suffix: "m", label: "Outdoor range", numeric: 100 },
  { value: "4.9", suffix: "★", label: "Customer rating", numeric: 4.9 },
];

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    number: "01",
    title: "Choose your setup",
    description:
      "Pick a package, set your player count, and add any extras. Book online or send us a quote request — we'll confirm within 24 hours.",
  },
  {
    number: "02",
    title: "We ship it to you",
    description:
      "Equipment arrives fully charged 2 business days before your event. Someone just needs to be home to sign for the delivery.",
  },
  {
    number: "03",
    title: "You run the battle",
    description:
      "Setup takes minutes. Game modes are all pre-configured. We're on the phone the whole time if you need us.",
  },
  {
    number: "04",
    title: "We collect it",
    description:
      "Pack everything back in the case. We've already booked the return courier — they'll pick it up the next business day. Done.",
  },
];

export const FEATURES: Feature[] = [
  {
    title: "Delivery included",
    description:
      "Equipment arrives at your door, fully charged and ready to play. No pickup, no van hire.",
    icon: "truck",
  },
  {
    title: "No heavy vests",
    description:
      "Sensors are built into the taggers. Lighter, faster, and better for younger kids.",
    icon: "shield",
  },
  {
    title: "Phone support included",
    description:
      "We stay on the line during your event. If anything comes up, we're a call away.",
    icon: "phone",
  },
  {
    title: "Saturday = Sunday free",
    description:
      "Book for Saturday and keep the equipment through Sunday at no extra cost.",
    icon: "calendar",
  },
  {
    title: "12+ hour battery",
    description:
      "All equipment arrives fully charged. Enough power for the longest parties.",
    icon: "battery",
  },
  {
    title: "Indoors or outdoors",
    description:
      "Works in backyards, parks, halls and anywhere in between. Flexible for any event type.",
    icon: "map",
  },
];

export const FREE_POSTCODES: string[] = [
  "2300", "2301", "2302", "2303", "2304", "2305",
  "2306", "2307", "2308", "2310", "2311", "2312",
  "2315", "2316", "2317", "2318", "2319", "2320",
  "2321", "2322", "2323", "2324", "2325", "2326",
  "2327", "2328", "2330", "2332", "2333", "2334",
  "2335", "2336", "2337", "2338", "2340", "2430",
  "2431", "2440", "2441", "2443", "2444", "2445",
];
