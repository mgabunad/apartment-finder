// Tiny bilingual dictionary (English / Dutch). The language comes from the
// ?lang= query parameter, so every page can be shared in either language.
export type Lang = "en" | "nl";

export function getLang(value: string | string[] | undefined): Lang {
  return value === "nl" ? "nl" : "en";
}

const dict = {
  en: {
    appName: "Apartment Finder",
    tagline: "Find your next home and apply in one minute.",
    city: "City",
    allCities: "All cities",
    maxRent: "Max rent (€)",
    minBedrooms: "Min. bedrooms",
    any: "Any",
    search: "Search",
    reset: "Reset",
    perMonth: "/ month",
    bedroom: "bedroom",
    bedrooms: "bedrooms",
    results: "apartments found",
    noResults: "No apartments match your filters. Try widening your search.",
    back: "← Back to all apartments",
    applyTitle: "Apply for this apartment",
    fullName: "Full name",
    email: "Email",
    message: "Message to the landlord",
    messagePlaceholder: "Tell us a bit about yourself and when you'd like to move in.",
    submit: "Send application",
    sending: "Sending…",
    successTitle: "Application sent!",
    successText: "Thanks! The landlord will contact you by email.",
    errorRequired: "Please fill in your name, a valid email, and a message.",
    errorGeneric: "Something went wrong. Please try again.",
    admin: "Admin",
  },
  nl: {
    appName: "Woningzoeker",
    tagline: "Vind je volgende woning en reageer binnen een minuut.",
    city: "Stad",
    allCities: "Alle steden",
    maxRent: "Max. huur (€)",
    minBedrooms: "Min. slaapkamers",
    any: "Alle",
    search: "Zoeken",
    reset: "Wissen",
    perMonth: "/ maand",
    bedroom: "slaapkamer",
    bedrooms: "slaapkamers",
    results: "woningen gevonden",
    noResults: "Geen woningen gevonden. Probeer je filters aan te passen.",
    back: "← Terug naar alle woningen",
    applyTitle: "Reageer op deze woning",
    fullName: "Volledige naam",
    email: "E-mail",
    message: "Bericht aan de verhuurder",
    messagePlaceholder: "Vertel iets over jezelf en wanneer je wilt verhuizen.",
    submit: "Reactie versturen",
    sending: "Versturen…",
    successTitle: "Reactie verstuurd!",
    successText: "Bedankt! De verhuurder neemt per e-mail contact met je op.",
    errorRequired: "Vul je naam, een geldig e-mailadres en een bericht in.",
    errorGeneric: "Er ging iets mis. Probeer het opnieuw.",
    admin: "Beheer",
  },
} as const;

export type Dictionary = { [K in keyof (typeof dict)["en"]]: string };

export function t(lang: Lang): Dictionary {
  return dict[lang];
}

export function formatEuro(amount: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "nl" ? "nl-NL" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
