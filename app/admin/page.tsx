import Header from "../Header";
import { getSupabase } from "@/lib/supabase";
import { APPLICATION_STATUSES, type Application } from "@/lib/types";
import { updateStatus } from "./actions";

// Protected by the password check in proxy.ts.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Join each application with its apartment (Supabase follows the foreign key).
  const { data, error } = await getSupabase()
    .from("applications")
    .select("*, apartments(title, city)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const applications = (data ?? []) as Application[];

  const counts = APPLICATION_STATUSES.map((s) => ({
    status: s,
    total: applications.filter((a) => a.status === s).length,
  }));

  return (
    <>
      <Header lang="en" path="/admin" />
      <main className="container">
        <section className="hero">
          <h1>Applications</h1>
          <p>Every application submitted through the site. Update the status as you work each lead.</p>
          <div className="stats">
            {counts.map((c) => (
              <div key={c.status} className="stat">
                <strong>{c.total}</strong>
                {c.status}
              </div>
            ))}
          </div>
        </section>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Applicant</th>
                <th>Apartment</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="meta">No applications yet. Submit one from any apartment page.</td>
                </tr>
              )}
              {applications.map((a) => (
                <tr key={a.id}>
                  <td>{new Date(a.created_at).toLocaleDateString("en-GB")}</td>
                  <td>
                    <strong>{a.full_name}</strong>
                    <br />
                    <a href={`mailto:${a.email}`}>{a.email}</a>
                  </td>
                  <td>
                    {a.apartments?.title ?? "—"}
                    <br />
                    <span className="meta">{a.apartments?.city}</span>
                  </td>
                  <td style={{ maxWidth: 320 }}>{a.message}</td>
                  <td>
                    <span className="badge">{a.status}</span>
                    <form action={updateStatus} className="status-form" style={{ marginTop: 6 }}>
                      <input type="hidden" name="id" value={a.id} />
                      {/* key forces the dropdown to reset to the saved status after each update */}
                      <select key={a.status} name="status" defaultValue={a.status} aria-label="New status">
                        {APPLICATION_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button className="btn" type="submit">Save</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
