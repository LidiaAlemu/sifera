"use server";

import { createClient } from "@/lib/supabase/server";

export async function getOrderByNumber(orderNumber: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
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

  if (error || !data) {
    throw new Error("Order not found");
  }

  // Transform order_items so that each item has a single menu_item object, not an array
  const transformedOrder = {
    ...data,
    order_items: data.order_items.map((item: any) => ({
      quantity: item.quantity,
      unit_price: item.unit_price,
      menu_item: Array.isArray(item.menu_item) ? item.menu_item[0] : item.menu_item,
    })),
  };

  return transformedOrder;
}