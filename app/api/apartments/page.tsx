import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../Header";
import ApplyForm from "./ApplyForm";
import { getLang, t, formatEuro } from "@/lib/i18n";
import { getApartment } from "@/lib/apartments";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ApartmentPage({ params, searchParams }: Props) {
  const { id } = await params;
  const lang = getLang((await searchParams).lang);
  const d = t(lang);

  const apartmentId = Number(id);
  if (!Number.isInteger(apartmentId)) notFound();

  const apt = await getApartment(apartmentId);
  if (!apt) notFound();

  return (
    <>
      <Header lang={lang} path={`/apartments/${apt.id}`} />
      <main className="container">
        <Link className="back" href={`/?lang=${lang}`}>{d.back}</Link>
        <div className="detail">
          <section>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={apt.image_url ?? ""} alt={apt.title} />
            <h1>{apt.title}</h1>
            <p className="meta">
              {apt.city} · {apt.bedrooms} {apt.bedrooms === 1 ? d.bedroom : d.bedrooms} · {apt.size_m2} m²
            </p>
            <p className="price">
              {formatEuro(apt.rent, lang)} <span className="meta">{d.perMonth}</span>
            </p>
            <p>{apt.description}</p>
          </section>
          <aside className="panel">
            <h2>{d.applyTitle}</h2>
            <ApplyForm apartmentId={apt.id} d={d} />
          </aside>
        </div>
      </main>
    </>
  );
}
