import "server-only";
import { getSupabase } from "./supabase";
import type { Apartment } from "./types";

export type ApartmentFilters = {
  city?: string;
  maxRent?: number;
  minBedrooms?: number;
};

// Shared query used by both the home page and the JSON API route.
export async function listApartments(filters: ApartmentFilters = {}): Promise<Apartment[]> {
  let query = getSupabase().from("apartments").select("*").order("created_at", { ascending: false });

  if (filters.city) query = query.eq("city", filters.city);
  if (filters.maxRent) query = query.lte("rent", filters.maxRent);
  if (filters.minBedrooms) query = query.gte("bedrooms", filters.minBedrooms);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Apartment[];
}

export async function listCities(): Promise<string[]> {
  const { data, error } = await getSupabase().from("apartments").select("city");
  if (error) throw new Error(error.message);
  return [...new Set((data ?? []).map((row) => row.city as string))].sort();
}

export async function getApartment(id: number): Promise<Apartment | null> {
  const { data, error } = await getSupabase().from("apartments").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as Apartment | null;
}

// Turns raw ?city=&maxRent=&minBedrooms= values into safe, typed filters.
export function parseFilters(params: Record<string, string | string[] | undefined>): ApartmentFilters {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const toPositiveInt = (v: string | undefined) => {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : undefined;
  };
  return {
    city: one(params.city)?.trim() || undefined,
    maxRent: toPositiveInt(one(params.maxRent)),
    minBedrooms: toPositiveInt(one(params.minBedrooms)),
  };
}
