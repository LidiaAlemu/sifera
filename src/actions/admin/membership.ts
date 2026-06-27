"use server";

import { createClient } from "@/lib/supabase/server";

export async function getMembershipData() {
  const supabase = await createClient();

  // Get all plans (active and inactive)
  const { data: plans, error: plansError } = await supabase
    .from("membership_plans")
    .select("*")
    .order("price");

  if (plansError) throw new Error("Failed to load plans");

  // Get active memberships (join with customer_accounts and profiles for name)
  // For now, we'll just get memberships with customer id; we'll fetch names separately
  const { data: memberships, error: membershipsError } = await supabase
    .from("memberships")
    .select(`
      id,
      start_date,
      end_date,
      status,
      customer_id,
      plan_id
    `)
    .eq("status", "Active");

  if (membershipsError) throw new Error("Failed to load memberships");

  // To get customer names, we'd need to join profiles. For simplicity, we'll mock names later.
  // We'll return the raw data and handle display on the client with a mapping.

  return { plans, memberships };
}

export async function updatePlan(planId: string, data: any) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("membership_plans")
    .update(data)
    .eq("id", planId);

  if (error) throw new Error("Failed to update plan");
  return { success: true };
}

export async function addPlan(data: any) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("membership_plans")
    .insert(data);

  if (error) throw new Error("Failed to add plan");
  return { success: true };
}