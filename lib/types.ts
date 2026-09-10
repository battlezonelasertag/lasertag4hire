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
  name: string;
  role: string;
  location: string;
  category: "birthday" | "school" | "corporate" | "community";
  rating: number;
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
