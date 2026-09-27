"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/types";

// Server Action: moves an application to a new pipeline status (mini CRM).
export async function updateStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as ApplicationStatus;

  if (!Number.isInteger(id) || !APPLICATION_STATUSES.includes(status)) return;

  const { error } = await getSupabase().from("applications").update({ status }).eq("id", id);
  if (error) console.error("Failed to update status:", error.message);

  revalidatePath("/admin");
}
