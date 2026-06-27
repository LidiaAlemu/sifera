"use server";

import { createClient } from "@/lib/supabase/server";

export async function placeOrder(formData: {
  name: string;
  phone: string;
  email?: string;
  pickupTime: string;
  paymentMethod: string;
  items: { id: number; name: string; quantity: number; price: string }[];
}) {
  const supabase = await createClient();

  // Generate a simple order number
  const orderNumber = `SIF-${Date.now()}`;

  // Calculate total
  const subtotal = formData.items.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + priceNum * item.quantity;
  }, 0);

  // Insert order (as guest – no customer_id for now)
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      guest_name: formData.name,
      guest_phone: formData.phone,
      guest_email: formData.email || null,
      order_number: orderNumber,
      subtotal,
      total_amount: subtotal,
      payment_method: formData.paymentMethod,
      order_status: "Waiting Verification",
      pickup_time: formData.pickupTime,
      notes: "",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Order creation error:", orderError);
    throw new Error("Failed to place order");
  }

  // Insert order items
  const orderItems = formData.items.map((item) => ({
    order_id: order.id,
    menu_item_id: item.id,
    quantity: item.quantity,
    unit_price: parseFloat(item.price.replace(/[^0-9.]/g, "")),
    subtotal: parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Order items insert error:", itemsError);
    // Optionally roll back order (but for now we log)
  }

  return { orderNumber };
}