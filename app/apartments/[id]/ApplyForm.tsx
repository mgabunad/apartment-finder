"use client";

import { useActionState } from "react";
import { submitApplication, type ApplyState } from "./actions";
import type { Dictionary } from "@/lib/i18n";

const initialState: ApplyState = { status: "idle" };

// Client component: handles loading, error, and success states for the form.
export default function ApplyForm({ apartmentId, d }: { apartmentId: number; d: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);

  if (state.status === "success") {
    return (
      <div className="alert alert-success" role="status">
        <strong>{d.successTitle}</strong>
        <br />
        {d.successText}
      </div>
    );
  }

  return (
    <form action={formAction}>
      {state.status === "error" && state.errorKey && (
        <div className="alert alert-error" role="alert">{d[state.errorKey]}</div>
      )}
      <input type="hidden" name="apartment_id" value={apartmentId} />
      <div className="form-row">
        <label htmlFor="full_name">{d.fullName}</label>
        <input id="full_name" name="full_name" required maxLength={120} autoComplete="name" />
      </div>
      <div className="form-row">
        <label htmlFor="email">{d.email}</label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
      </div>
      <div className="form-row">
        <label htmlFor="message">{d.message}</label>
        <textarea id="message" name="message" rows={4} required maxLength={2000} placeholder={d.messagePlaceholder} />
      </div>
      <button className="btn" type="submit" disabled={pending} style={{ width: "100%" }}>
        {pending ? d.sending : d.submit}
      </button>
    </form>
  );
}
