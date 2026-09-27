"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container" style={{ padding: "60px 16px", textAlign: "center" }}>
      <h1>Something went wrong</h1>
      <p className="meta">{error.message}</p>
      <button className="btn" onClick={reset}>Try again</button>
    </main>
  );
}
