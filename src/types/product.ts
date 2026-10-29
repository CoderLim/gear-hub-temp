export type ProductCategory =
  | "Headphones"
  | "Keyboards"
  | "Mice"
  | "Speakers"
  | "Accessories";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
};

export const CATEGORIES = [
  "All",
  "Headphones",
  "Keyboards",
  "Mice",
  "Speakers",
  "Accessories",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];
