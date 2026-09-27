import Link from "next/link";
import Header from "./Header";
import { getLang, t, formatEuro } from "@/lib/i18n";
import { listApartments, listCities, parseFilters } from "@/lib/apartments";

// Always fetch fresh data from Supabase on each request.
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const d = t(lang);
  const filters = parseFilters(params);

  const [apartments, cities] = await Promise.all([listApartments(filters), listCities()]);

  return (
    <>
      <Header lang={lang} path="/" />
      <main className="container">
        <section className="hero">
          <h1>{d.appName}</h1>
          <p>{d.tagline}</p>
        </section>

        {/* A plain GET form: filters end up in the URL, so results are shareable. */}
        <form className="filters" method="get">
          <input type="hidden" name="lang" value={lang} />
          <div>
            <label htmlFor="city">{d.city}</label>
            <select id="city" name="city" defaultValue={filters.city ?? ""}>
              <option value="">{d.allCities}</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="maxRent">{d.maxRent}</label>
            <input id="maxRent" name="maxRent" type="number" min={0} step={50} placeholder="2000"
              defaultValue={filters.maxRent ?? ""} />
          </div>
          <div>
            <label htmlFor="minBedrooms">{d.minBedrooms}</label>
            <select id="minBedrooms" name="minBedrooms" defaultValue={String(filters.minBedrooms ?? "")}>
              <option value="">{d.any}</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n}+</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button className="btn" type="submit">{d.search}</button>
            <Link className="btn btn-ghost" href={`/?lang=${lang}`}>{d.reset}</Link>
          </div>
        </form>

        <p className="count">{apartments.length} {d.results}</p>

        {apartments.length === 0 ? (
          <div className="empty">{d.noResults}</div>
        ) : (
          <div className="grid">
            {apartments.map((apt) => (
              <Link key={apt.id} href={`/apartments/${apt.id}?lang=${lang}`} className="card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={apt.image_url ?? ""} alt={apt.title} loading="lazy" />
                <div className="card-body">
                  <h3>{apt.title}</h3>
                  <div className="meta">
                    {apt.city} · {apt.bedrooms} {apt.bedrooms === 1 ? d.bedroom : d.bedrooms} · {apt.size_m2} m²
                  </div>
                  <div className="price">
                    {formatEuro(apt.rent, lang)} <span className="meta">{d.perMonth}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
