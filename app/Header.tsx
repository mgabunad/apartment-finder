import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";

// Site header with a language switch. `path` is the current page so the
// switch keeps you on the same page in the other language.
export default function Header({ lang, path = "/" }: { lang: Lang; path?: string }) {
  const d = t(lang);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href={`/?lang=${lang}`} className="logo">
          🏠 {d.appName.split(" ")[0]} <span>{d.appName.split(" ")[1] ?? ""}</span>
        </Link>
        <nav className="nav" aria-label="Language">
          <Link href={`${path}?lang=en`} className={lang === "en" ? "active" : ""}>EN</Link>
          <Link href={`${path}?lang=nl`} className={lang === "nl" ? "active" : ""}>NL</Link>
          <Link href="/admin">{d.admin}</Link>
        </nav>
      </div>
    </header>
  );
}
