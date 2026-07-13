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

  const rawOrderNumber = formData.get("order_number");
  if (!rawOrderNumber || typeof rawOrderNumber !== "string") {
    throw new Error("Order number is required");
  }

  const orderNumber = normalizeOrderNumber(rawOrderNumber);

  const fileVal = formData.get("receipt");
  if (!fileVal) {
    throw new Error("Receipt file is required");
  }

  // In Next server actions, File is available; do a best-effort type check
  const file = fileVal as File;
  if (typeof (file as any).size !== "number") {
    throw new Error("Invalid receipt file");
  }

  validateReceiptFile(file);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, order_number, payment_method")
    .eq("order_number", orderNumber)
    .single();

  if (orderError || !order) {
    console.error("Receipt order lookup error:", orderError);
    throw new Error("Order not found");
  }

  assertOrderCanReceiveReceipt(order, orderNumber);

  const fileName = buildReceiptStoragePath(order.id, orderNumber, file);
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("receipts")
    .upload(fileName, file, {
      contentType: (file as any).type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error("Failed to upload receipt");
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("receipts").getPublicUrl(fileName);
  const receiptUrl = urlData?.publicUrl;
  if (!receiptUrl) {
    // Attempt cleanup
    try {
      await supabase.storage.from("receipts").remove([fileName]);
    } catch {
      // ignore
    }
    throw new Error("Failed to obtain receipt URL");
  }

  const { error: receiptError } = await supabase
    .from("payment_receipts")
    .insert({
      order_id: order.id,
      receipt_url: receiptUrl,
      storage_path: fileName,
      file_name: (file as any).name,
      file_type: (file as any).type,
      file_size: (file as any).size,
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
