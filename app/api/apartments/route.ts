import { NextResponse, type NextRequest } from "next/server";
import { listApartments, parseFilters } from "@/lib/apartments";

// Public JSON API: GET /api/apartments?city=Amsterdam&maxRent=2000&minBedrooms=2
export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  try {
    const apartments = await listApartments(parseFilters(params));
    return NextResponse.json({ count: apartments.length, apartments });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not load apartments" }, { status: 500 });
  }
}
