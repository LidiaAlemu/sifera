const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const EXTENSIONS_BY_TYPE = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

function validateReceiptFile(file) {
  if (!file) {
    throw new Error("Receipt file is required");
  }

  if (typeof file.size !== "number" || file.size <= 0) {
    throw new Error("Receipt file is empty");
  }

  if (file.size > MAX_RECEIPT_BYTES) {
    throw new Error("Receipt file must be 5MB or smaller");
  }

  if (!ALLOWED_RECEIPT_TYPES.has(file.type)) {
    throw new Error("Receipt must be a JPG, PNG, WebP, or PDF file");
  }
}

function getReceiptExtension(file) {
  return EXTENSIONS_BY_TYPE[file.type];
}

function normalizeOrderNumber(orderNumber) {
  if (!orderNumber || typeof orderNumber !== "string") {
    throw new Error("Order number is required");
  }

  const normalized = orderNumber.trim();
  if (!/^SIF-\d{6,}$/.test(normalized)) {
    throw new Error("Invalid order number");
  }

  return normalized;
}

function assertOrderCanReceiveReceipt(order, orderNumber) {
  if (!order || order.order_number !== orderNumber) {
    throw new Error("Order not found");
  }

  if (order.payment_method === "Cash") {
    throw new Error("Receipt upload is not available for cash orders");
  }
}

function buildReceiptStoragePath(orderId, orderNumber, file, now = Date.now()) {
  const extension = getReceiptExtension(file);
  return `${orderId}/${orderNumber}_${now}.${extension}`;
}

module.exports = {
  MAX_RECEIPT_BYTES,
  ALLOWED_RECEIPT_TYPES,
  validateReceiptFile,
  normalizeOrderNumber,
  assertOrderCanReceiveReceipt,
  buildReceiptStoragePath,
};
