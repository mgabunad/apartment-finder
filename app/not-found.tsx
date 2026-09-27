import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "60px 16px", textAlign: "center" }}>
      <h1>Apartment not found</h1>
      <p className="meta">It may have been rented out or removed.</p>
      <Link className="btn" href="/">Back to all apartments</Link>
    </main>
  );
}
