export type Apartment = {
  id: number;
  title: string;
  city: string;
  rent: number;
  bedrooms: number;
  size_m2: number;
  description: string;
  image_url: string | null;
  created_at: string;
};

export const APPLICATION_STATUSES = ["new", "contacted", "viewing", "accepted", "rejected"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type Application = {
  id: number;
  apartment_id: number;
  full_name: string;
  email: string;
  message: string;
  status: ApplicationStatus;
  created_at: string;
  apartments: { title: string; city: string } | null;
};
