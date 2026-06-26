"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <section className="bg-cream min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold text-dark mb-4">
            Checkout
          </h1>
          <p className="text-dark/60 font-sans mb-6">Your cart is empty.</p>
          <Link
            href="/menu"
            className="inline-block px-6 py-3 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setSubmitting(true);

    // Simulate order submission (we'll connect to Supabase later)
    const order = {
      orderNumber: `SIF-${Date.now()}`,
      customer: { name, phone },
      pickupTime,
      paymentMethod,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal,
      status: "Waiting Verification",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage for now
    const existingOrders = JSON.parse(
      localStorage.getItem("sifera-orders") || "[]"
    );
    existingOrders.push(order);
    localStorage.setItem("sifera-orders", JSON.stringify(existingOrders));

    clearCart();
    router.push("/orders");
  };

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-dark mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-serif font-semibold text-dark mb-4">
                Your Details
              </h2>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-sans font-medium text-dark mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-sans font-medium text-dark mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 9XX XXX XXX"
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="pickupTime"
                  className="block text-sm font-sans font-medium text-dark mb-1"
                >
                  Pickup Time *
                </label>
                <input
                  id="pickupTime"
                  type="datetime-local"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-serif font-semibold text-dark mb-4">
                Payment Method *
              </h2>
              <div className="space-y-3">
                {["Cash", "Telebirr", "CBE Mobile"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method
                        ? "border-olive bg-olive/5"
                        : "border-beige-dark hover:border-olive/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-olive"
                    />
                    <span className="text-dark font-sans">{method}</span>
                  </label>
                ))}
              </div>

              {error && (
                <p className="mt-3 text-sm font-sans text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gold text-dark font-sans font-semibold rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {submitting ? "Placing Order…" : "Place Order"}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-serif font-semibold text-dark mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm font-sans">
                    <span className="text-dark">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-dark/70">
                      {parseFloat(item.price.replace(/[^0-9.]/g, "")) *
                        item.quantity}{" "}
                      ETB
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-beige-dark pt-3 flex justify-between">
                <span className="font-sans font-semibold text-dark">Total</span>
                <span className="font-serif font-bold text-xl text-dark">
                  {subtotal}
                </span>
              </div>
              <p className="text-xs font-sans text-dark/50 mt-2">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}