"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } =
    useCart();

  return (
    <section className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-2">
            Your Cart
          </h1>
          <p className="text-text-secondary font-body">
            Review your order before checkout
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-xl">
            <p className="text-text-secondary font-body text-lg mb-6">
              Your cart is currently empty.
            </p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 bg-primary text-white font-body font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              Explore Our Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Image */}
                <div className="w-full sm:w-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 object-cover rounded-lg"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm font-body text-accent font-semibold">
                    {item.price}
                  </p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center gap-3 bg-primary/5 border border-border rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-primary/10 rounded transition-colors duration-200"
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-body text-foreground font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-primary/10 rounded transition-colors duration-200"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex-shrink-0 p-2 text-error hover:bg-error/10 rounded-lg transition-colors duration-200"
                  title="Remove item"
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

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              {/* Divider */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-body text-foreground">
                    Order Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-3xl font-heading font-bold text-accent">
                    {subtotal}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 border border-error text-error font-body font-semibold rounded-lg hover:bg-error/10 transition-colors duration-200"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 px-6 py-3 bg-accent text-primary font-body font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 text-center hover:shadow-md hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                </Link>
              </div>

              {/* Continue Shopping */}
              <div className="text-center pt-2">
                <Link
                  href="/menu"
                  className="text-sm font-body text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  Continue browsing menu →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
