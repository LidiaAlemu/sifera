"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Order = {
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
    menu_item: { name: string };
  }[];
};

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(!!orderNumber);
  const [localOrders, setLocalOrders] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);

  useEffect(() => {
    if (orderNumber) {
      // Fetch the real order from Supabase
      import("@/actions/getOrder")
        .then((mod) => mod.getOrderByNumber(orderNumber))
        .then((data) => setOrder(data))
        .catch(() => setOrder(null))
        .finally(() => setLoading(false));

      // Fetch payment settings (Telebirr / CBE numbers)
      import("@/actions/settings")
        .then((mod) => mod.getPaymentSettings())
        .then(setPaymentSettings)
        .catch(() => {});
    } else {
      const saved = JSON.parse(localStorage.getItem("sifera-orders") || "[]");
      setLocalOrders(saved);
    }
  }, [orderNumber]);

  const handleReceiptUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptFile || !order) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("order_id", order.id);
    formData.append("receipt", receiptFile);

    try {
      const { uploadReceipt } = await import("@/actions/uploadReceipt");
      const res = await uploadReceipt(formData);
      setReceiptUrl(res.receiptUrl);
      setShowUpload(false);
      alert("Payment proof uploaded successfully! We'll verify it shortly.");
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // --- ORDER CONFIRMATION VIEW (when orderNumber is present) ---
  if (orderNumber) {
    if (loading) {
      return (
        <section className="bg-cream min-h-screen py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-dark/60 font-sans">Loading order…</p>
          </div>
        </section>
      );
    }

    if (!order) {
      return (
        <section className="bg-cream min-h-screen py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-serif font-bold text-dark mb-4">Order Not Found</h1>
            <p className="text-dark/60 font-sans mb-6">
              We couldn't find that order. It may have been removed or the link is incorrect.
            </p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
            >
              Back to Menu
            </Link>
          </div>
        </section>
      );
    }

    return (
      <section className="bg-cream min-h-screen py-12 md:py-16 print:py-0 print:bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Printable Receipt */}
          <div className="bg-white rounded-xl shadow-lg p-8 print:shadow-none print:border print:border-gray-300">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-serif font-bold text-dark mb-1">Sifera</h1>
              <p className="text-xs font-sans text-dark/60">Official Order Receipt</p>
              <p className="text-sm font-sans text-dark/60 mt-1">Order #{order.order_number}</p>
              <p className="text-sm font-sans text-dark/60">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            {/* Status */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg no-print">
              <p className="font-sans text-sm font-medium text-amber-800">
                Status: {order.order_status}
              </p>
              <p className="text-xs text-amber-600 mt-1">
                {order.payment_method === "Cash"
                  ? "Please pay at pickup."
                  : "Your order will be confirmed once payment is verified. Please show your receipt at pickup."}
              </p>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h2 className="text-xl font-serif font-semibold text-dark mb-3">Items</h2>
              <table className="w-full text-sm font-sans">
                <thead className="border-b border-beige-dark">
                  <tr className="text-left text-dark/60">
                    <th className="pb-2 font-medium">Item</th>
                    <th className="pb-2 font-medium text-center">Qty</th>
                    <th className="pb-2 font-medium text-right">Price</th>
                    <th className="pb-2 font-medium text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items.map((item, idx) => (
                    <tr key={idx} className="border-b border-beige-dark/50">
                      <td className="py-2">{item.menu_item?.name || "Item"}</td>
                      <td className="py-2 text-center">{item.quantity}</td>
                      <td className="py-2 text-right">{item.unit_price} ETB</td>
                      <td className="py-2 text-right">{item.unit_price * item.quantity} ETB</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan={3} className="pt-3 text-right">Total</td>
                    <td className="pt-3 text-right">{order.total_amount} ETB</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pickup & Payment Info */}
            <div className="text-sm font-sans text-dark/70 mb-6">
              <p>Pickup time: {new Date(order.pickup_time).toLocaleString()}</p>
              <p>Payment method: {order.payment_method}</p>
            </div>

            {/* Digital Payment Instructions (only for Telebirr or CBE) */}
            {(order.payment_method === "Telebirr" || order.payment_method === "CBE Mobile") && (
              <div className="mb-6 p-4 bg-olive/5 border border-olive/20 rounded-lg no-print">
                <h3 className="text-lg font-serif font-semibold text-dark mb-2">Payment Instructions</h3>
                {paymentSettings ? (
                  <>
                    {order.payment_method === "Telebirr" && (
                      <p className="text-sm font-sans">
                        Please transfer to Telebirr number:{" "}
                        <strong>{paymentSettings.telebirrNumber}</strong>
                      </p>
                    )}
                    {order.payment_method === "CBE Mobile" && (
                      <p className="text-sm font-sans">
                        Please transfer to CBE number:{" "}
                        <strong>{paymentSettings.cbeNumber}</strong>
                      </p>
                    )}
                    <p className="text-sm font-sans mt-2">{paymentSettings.instructions}</p>
                  </>
                ) : (
                  <p className="text-sm font-sans">
                    Please transfer to the café’s official number (shown in admin settings).
                  </p>
                )}

                {/* Receipt Upload Section */}
                <div className="mt-4">
                  {!receiptUrl && !showUpload && (
                    <button
                      onClick={() => setShowUpload(true)}
                      className="px-4 py-2 bg-gold text-dark font-sans rounded-lg hover:bg-gold-dark transition-colors text-sm"
                    >
                      Upload Payment Proof
                    </button>
                  )}

                  {showUpload && !receiptUrl && (
                    <form onSubmit={handleReceiptUpload} className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                        className="text-sm"
                      />
                      <button
                        type="submit"
                        disabled={uploading || !receiptFile}
                        className="px-4 py-2 bg-olive text-white rounded-lg text-sm disabled:opacity-50"
                      >
                        {uploading ? "Uploading…" : "Submit Payment Proof"}
                      </button>
                    </form>
                  )}

                  {receiptUrl && (
                    <p className="text-sm text-green-700 font-medium mt-2">
                      Payment proof uploaded successfully!
                    </p>
                  )}

                  <p className="text-xs text-dark/50 mt-2">
                    Payment proofs are stored securely and automatically deleted after 10 days.
                  </p>
                </div>
              </div>
            )}

            {/* Legal Note (visible only on screen) */}
            <div className="mt-6 text-xs text-dark/60 text-center no-print">
              This receipt is issued by Sifera. Retain it for your records.
            </div>

            {/* Action Buttons (visible only on screen) */}
            <div className="flex gap-4 flex-wrap mt-6 no-print">
              <button
                onClick={handlePrint}
                className="px-6 py-2 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
              >
                Print / Download Receipt
              </button>
              <Link
                href="/menu"
                className="px-6 py-2 border border-olive text-olive font-sans rounded-lg hover:bg-olive/10 transition-colors"
              >
                Order More
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- ORDER LIST VIEW (no orderNumber) ---
  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-dark mb-8">My Orders</h1>
        {localOrders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark/60 font-sans text-lg mb-4">No orders yet.</p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {localOrders.reverse().map((order: any, index: number) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-serif font-semibold text-dark">
                      Order {order.orderNumber}
                    </h2>
                    <p className="text-sm font-sans text-dark/60">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${
                      order.status === "Waiting Verification"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm font-sans">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-sans text-sm text-dark/60">
                    {order.paymentMethod} · Pickup:{" "}
                    {new Date(order.pickupTime).toLocaleString()}
                  </span>
                  <span className="font-serif font-bold text-dark">{order.subtotal}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}