"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAdminOrders() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      guest_name,
      guest_phone,
      guest_email,
      subtotal,
      total_amount,
      payment_method,
      order_status,
      pickup_time,
      created_at,
      notes,
      order_items (
        quantity,
        unit_price,
        menu_item:menu_items(name)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin orders fetch error:", error);
    throw new Error("Failed to load orders");
  }

  return orders ?? [];
}