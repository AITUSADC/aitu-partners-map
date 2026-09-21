export type PartnerCategory =
  | "food"
  | "coffee"
  | "sport"
  | "education"
  | "entertainment"
  | "services";

export type CategoryFilter = PartnerCategory | "all";

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  discount: string;
  offerLabel: string;
  description: string;
  terms: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  logo?: string;
}
