import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apartment Finder",
  description: "A bilingual apartment listing and application demo built with Next.js, TypeScript, and Supabase, deployed on Netlify.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
