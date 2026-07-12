"use server";

import { createClient } from "@/lib/supabase/server";
import {
  assertOrderCanReceiveReceipt,
  buildReceiptStoragePath,
  normalizeOrderNumber,
  validateReceiptFile,
} from "@/lib/receipt-validation";

export async function uploadReceipt(formData: FormData) {
  const supabase = await createClient();

  const orderNumber = normalizeOrderNumber(formData.get("order_number"));
  const file = formData.get("receipt") as File;

  validateReceiptFile(file);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, order_number, payment_method")
    .eq("order_number", orderNumber)
    .single();

  if (orderError) {
    console.error("Receipt order lookup error:", orderError);
  }
  assertOrderCanReceiveReceipt(order, orderNumber);

  const fileName = buildReceiptStoragePath(order.id, orderNumber, file);
  const { error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error("Failed to upload receipt");
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("receipts").getPublicUrl(fileName);
  const receiptUrl = urlData.publicUrl;

  const { error: receiptError } = await supabase
    .from("payment_receipts")
    .insert({
      order_id: order.id,
      receipt_url: receiptUrl,
      storage_path: fileName,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      payment_reference: "",
      verification_status: "Pending",
    });

  if (receiptError) {
    console.error("Receipt record error:", receiptError);
    await supabase.storage.from("receipts").remove([fileName]);
    throw new Error("Failed to save receipt record");
  }

  return { success: true, receiptUrl };
}
