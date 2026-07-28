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
    bestFor: ["Teens & adults", "Corporate events", "Large battles"],
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
  "2000", "2006", "2007", "2008", "2009", "2010",
  "2011", "2015", "2016", "2017", "2018", "2019",
  "2020", "2021", "2022", "2023", "2024", "2025",
  "2026", "2027", "2028", "2029", "2030", "2031",
  "2032", "2033", "2034", "2035", "2036", "2037",
  "2038", "2039", "2040", "2041", "2042", "2043",
  "2044", "2045", "2046", "2047", "2048", "2049",
  "2050", "2052", "2060", "2061", "2062", "2063",
  "2064", "2065", "2066", "2067", "2068", "2069",
  "2070", "2071", "2072", "2073", "2074", "2075",
  "2076", "2077", "2079", "2080", "2081", "2082",
  "2083", "2084", "2085", "2086", "2087", "2088",
  "2089", "2090", "2092", "2093", "2094", "2095",
  "2096", "2097", "2099", "2100", "2101", "2102",
  "2103", "2104", "2105", "2106", "2107", "2108",
  "2109", "2110", "2111", "2112", "2113", "2114",
  "2115", "2116", "2117", "2118", "2119", "2120",
  "2121", "2122", "2125", "2126", "2127", "2128",
  "2129", "2130", "2131", "2132", "2133", "2134",
  "2135", "2136", "2137", "2138", "2139", "2140",
  "2141", "2142", "2143", "2144", "2145", "2146",
  "2147", "2148", "2150", "2151", "2152", "2153",
  "2154", "2155", "2156", "2157", "2158", "2159",
  "2160", "2161", "2162", "2163", "2164", "2165",
  "2166", "2167", "2168", "2170", "2171", "2172",
  "2173", "2174", "2175", "2176", "2177", "2178",
  "2179", "2190", "2191", "2192", "2193", "2194",
  "2195", "2196", "2197", "2198", "2199", "2200",
  "2203", "2204", "2205", "2206", "2207", "2208",
  "2209", "2210", "2211", "2212", "2213", "2214",
  "2216", "2217", "2218", "2219", "2220", "2221",
  "2222", "2223", "2224", "2225", "2226", "2227",
  "2228", "2229", "2230", "2231", "2232", "2233",
  "2234", "2250", "2251", "2256", "2257", "2258",
  "2259", "2260", "2261", "2262", "2263", "2264",
  "2265", "2267", "2278", "2280", "2281", "2282",
  "2283", "2284", "2285", "2286", "2287", "2289",
  "2290", "2291", "2292", "2293", "2294", "2295",
  "2296", "2297", "2298", "2299", "2300", "2302",
  "2303", "2304", "2305", "2306", "2307", "2308",
  "2314", "2315", "2316", "2317", "2318", "2319",
  "2320", "2321", "2322", "2323", "2324", "2325",
  "2326", "2327", "2330", "2333", "2334", "2335",
  "2351", "2421", "2444", "2465", "2466", "2471",
  "2472", "2473", "2477", "2478", "2479", "2480",
  "2481", "2482", "2483", "2484", "2485", "2486",
  "2487", "2488", "2489", "2490", "2500", "2508",
  "2515", "2516", "2517", "2518", "2519", "2548",
  "2555", "2556", "2557", "2558", "2559", "2560",
  "2563", "2564", "2565", "2566", "2567", "2568",
  "2569", "2600", "2601", "2602", "2603", "2604",
  "2605", "2606", "2607", "2609", "2611", "2612",
  "2614", "2615", "2617", "2618", "2619", "2625",
  "2645", "2678", "2702", "2747", "2748", "2749",
  "2753", "2754", "2756", "2757", "2759", "2760",
  "2761", "2762", "2763", "2765", "2766", "2767",
  "2768", "2769", "2770", "2775", "2797", "2807",
  "2878", "2898", "2900", "2902", "2903", "2904",
  "2905", "2906", "2911", "2912", "2913", "2914",
  // VIC (Melbourne metro and surrounds)
  "3000", "3002", "3003", "3004", "3005", "3006",
  "3008", "3010", "3011", "3012", "3013", "3015",
  "3016", "3018", "3019", "3020", "3021", "3022",
  "3023", "3025", "3026", "3027", "3028", "3029",
  "3031", "3032", "3033", "3034", "3036", "3037",
  "3038", "3039", "3040", "3041", "3042", "3043",
  "3044", "3045", "3046", "3047", "3048", "3049",
  "3051", "3052", "3053", "3054", "3055", "3056",
  "3057", "3058", "3059", "3060", "3061", "3062",
  "3063", "3064", "3065", "3066", "3067", "3068",
  "3070", "3071", "3072", "3073", "3074", "3075",
  "3076", "3078", "3079", "3081", "3082", "3083",
  "3084", "3085", "3086", "3087", "3088", "3090",
  "3093", "3094", "3095", "3101", "3102", "3103",
  "3104", "3105", "3106", "3107", "3108", "3109",
  "3111", "3113", "3114", "3115", "3116", "3121",
  "3122", "3123", "3124", "3125", "3126", "3127",
  "3128", "3129", "3130", "3131", "3132", "3133",
  "3134", "3135", "3136", "3137", "3138", "3140",
  "3141", "3142", "3143", "3144", "3145", "3146",
  "3147", "3148", "3149", "3150", "3151", "3152",
  "3153", "3154", "3155", "3156", "3158", "3159",
  "3160", "3161", "3162", "3163", "3165", "3166",
  "3167", "3168", "3169", "3170", "3171", "3172",
  "3173", "3174", "3175", "3177", "3178", "3179",
  "3180", "3181", "3182", "3183", "3184", "3185",
  "3186", "3187", "3188", "3189", "3190", "3191",
  "3192", "3193", "3194", "3195", "3196", "3197",
  "3198", "3199", "3200", "3201", "3202", "3204",
  "3205", "3206", "3207", "3217", "3232", "3270",
  "3328", "3396", "3412", "3483", "3485", "3509",
  "3580", "3588", "3687", "3711", "3746", "3750",
  "3752", "3765", "3766", "3767", "3779", "3781",
  "3782", "3785", "3786", "3787", "3788", "3789",
  "3791", "3792", "3793", "3795", "3796", "3800",
  "3802", "3803", "3804", "3805", "3806", "3807",
  "3808", "3809", "3810", "3865", "3878", "3890",
  "3892", "3910", "3911", "3912", "3913", "3915",
  "3930", "3931", "3933", "3934", "3965", "3975",
  "3976", "3977", "3978",
];
