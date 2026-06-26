"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  orderNumber: string;
  customer: { name: string; phone: string };
  pickupTime: string;
  paymentMethod: string;
  items: { id: number; name: string; quantity: number; price: string }[];
  subtotal: string;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("sifera-orders") || "[]"
    );
    setOrders(saved);
  }, []);

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-dark mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark/60 font-sans text-lg mb-4">
              No orders yet.
            </p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
            >
              Start Ordering
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.reverse().map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6"
              >
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
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Verified"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Preparing"
                        ? "bg-purple-100 text-purple-800"
                        : order.status === "Ready"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm font-sans"
                    >
                      <span className="text-dark">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-dark/70">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-beige-dark pt-3 flex justify-between">
                  <span className="font-sans text-sm text-dark/60">
                    {order.paymentMethod} · Pickup:{" "}
                    {new Date(order.pickupTime).toLocaleString()}
                  </span>
                  <span className="font-serif font-bold text-dark">
                    {order.subtotal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}