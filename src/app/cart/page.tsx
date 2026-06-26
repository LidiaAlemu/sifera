"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } =
    useCart();

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-dark mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark/60 font-sans text-lg mb-4">
              Your cart is empty.
            </p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-semibold text-dark">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans text-dark/60">{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-beige-dark text-dark hover:bg-beige transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-sans text-dark">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-beige-dark text-dark hover:bg-beige transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-dark font-sans">Items ({totalItems})</span>
                <span className="text-xl font-serif font-bold text-dark">
                  {subtotal}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-red-300 text-red-600 font-sans text-sm rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 px-6 py-3 bg-gold text-dark font-sans font-semibold rounded-lg hover:bg-gold-dark transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}