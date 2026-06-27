"use server";

import { createClient } from "@/lib/supabase/server";

export async function getOrderByNumber(orderNumber: string) {
  const supabase = await createClient();

  const { data: order, error } = await supabase
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
    .eq("order_number", orderNumber)
    .single();

  if (error || !order) {
    console.error("Order fetch error:", error);
    throw new Error("Order not found");
  }

  return order;
}