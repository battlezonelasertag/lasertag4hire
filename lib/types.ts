export interface Package {
  id: string;
  name: string;
  tagline: string;
  price: number;
  taggers: number;
  weight: string;
  range: string;
  ageRange: string;
  bestFor: string[];
  features: string[];
  badge?: string;
  featured?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number | null;
  priceLabel: string;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  gradient: string;
  image: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  /** First name and surname initial, as the reviewer appears on Google. */
  name: string;
  /** What they hired the gear for, taken from the review. */
  event: string;
  category: "birthday" | "school" | "community" | "groups";
  rating: number;
  source: "Google";
  /** The reviewer's exact words, pasted from Google. Empty shows a "Read on Google" card instead. */
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  numeric: number;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ConfiguratorState {
  packageId: string;
  taggerCount: number;
  addBunkers: boolean;
}
