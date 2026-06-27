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

  // Flatten menu_item so it's never an array
  const transformedOrder = {
    ...data,
    order_items: data.order_items.map((item: any) => ({
      quantity: item.quantity,
      unit_price: item.unit_price,
      menu_item: Array.isArray(item.menu_item) ? item.menu_item[0] : item.menu_item,
    })),
  };

  return transformedOrder as {
    id: string;
    order_number: string;
    guest_name: string;
    guest_phone: string;
    guest_email: string;
    subtotal: number;
    total_amount: number;
    payment_method: string;
    order_status: string;
    pickup_time: string;
    created_at: string;
    notes: string;
    order_items: {
      quantity: number;
      unit_price: number;
      menu_item: { name: string } | null;
    }[];
  };
}
