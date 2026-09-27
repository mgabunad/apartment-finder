"use server";

import { getSupabase } from "@/lib/supabase";

export type ApplyState = { status: "idle" | "success" | "error"; errorKey?: "errorRequired" | "errorGeneric" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server Action: validates the form on the server and saves the application.
export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const apartmentId = Number(formData.get("apartment_id"));
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();

  if (!Number.isInteger(apartmentId) || !fullName || !EMAIL_PATTERN.test(email) || !message) {
    return { status: "error", errorKey: "errorRequired" };
  }
  if (fullName.length > 120 || email.length > 200 || message.length > 2000) {
    return { status: "error", errorKey: "errorRequired" };
  }

  const { error } = await getSupabase().from("applications").insert({
    apartment_id: apartmentId,
    full_name: fullName,
    email,
    message,
  });

  if (error) {
    console.error("Failed to save application:", error.message);
    return { status: "error", errorKey: "errorGeneric" };
  }
  return { status: "success" };
}
