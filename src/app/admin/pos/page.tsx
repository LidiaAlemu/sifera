"use client";

import { useState } from "react";

export default function POSPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "online">("manual");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-dark">POS</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-light">
        <button
          onClick={() => setActiveTab("manual")}
          className={`px-6 py-3 font-body text-sm transition-colors ${
            activeTab === "manual"
              ? "text-primary border-b-2 border-primary"
              : "text-dark/60 hover:text-dark"
          }`}
        >
          Manual Order Entry
        </button>
        <button
          onClick={() => setActiveTab("online")}
          className={`px-6 py-3 font-body text-sm transition-colors ${
            activeTab === "online"
              ? "text-primary border-b-2 border-primary"
              : "text-dark/60 hover:text-dark"
          }`}
        >
          Online Orders
        </button>
      </div>

      {/* Manual Order Entry */}
      {activeTab === "manual" && (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-semibold text-dark">
                Customer Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-body text-dark mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    className="w-full px-4 py-2 border border-light rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-dark mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 border border-light rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-dark mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full px-4 py-2 border border-light rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-semibold text-dark">
                Order Type
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border-2 border-primary bg-primary/5 rounded-md text-center hover:bg-primary/10 transition-colors">
                  <div className="text-2xl mb-2">🍽️</div>
                  <div className="font-body text-sm font-medium text-dark">
                    Dine In
                  </div>
                </button>
                <button className="p-4 border border-light rounded-md text-center hover:border-primary transition-colors">
                  <div className="text-2xl mb-2">🥡</div>
                  <div className="font-body text-sm font-medium text-dark">
                    Takeaway
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Add Items */}
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-semibold text-dark">
              Add Items
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search menu items..."
                className="flex-1 px-4 py-2 border border-light rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-md font-body text-sm hover:bg-secondary transition-colors">
                Add Item
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-light pt-6 space-y-4">
            <h2 className="text-lg font-heading font-semibold text-dark">
              Order Summary
            </h2>
            <div className="bg-light/50 rounded-md p-4 space-y-2">
              <div className="flex justify-between items-center text-sm font-body text-dark">
                <span>No items added yet</span>
                <span className="text-dark/60">$0.00</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-light">
              <span className="text-lg font-heading font-semibold text-dark">
                Total
              </span>
              <span className="text-2xl font-heading font-bold text-primary">
                $0.00
              </span>
            </div>
            <button className="w-full py-3 bg-primary text-white rounded-md font-body font-medium hover:bg-secondary transition-colors">
              Create Order
            </button>
          </div>
        </div>
      )}

      {/* Online Orders Tracking */}
      {activeTab === "online" && (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-dark">
              Online Orders
            </h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-light rounded-md font-body text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary">
                <option>All Status</option>
                <option>Pending</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            <div className="border border-light rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-body font-medium text-dark">
                    Order #1234
                  </div>
                  <div className="text-sm font-body text-dark/60">
                    2 minutes ago
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-body font-medium">
                  Pending
                </span>
              </div>
              <div className="text-sm font-body text-dark/80">
                2x Espresso, 1x Croissant
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-light">
                <span className="font-body font-medium text-dark">$12.50</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green text-white rounded-md text-xs font-body hover:bg-green/80 transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1 border border-light rounded-md text-xs font-body hover:bg-light transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-light rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-body font-medium text-dark">
                    Order #1233
                  </div>
                  <div className="text-sm font-body text-dark/60">
                    15 minutes ago
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-body font-medium">
                  Preparing
                </span>
              </div>
              <div className="text-sm font-body text-dark/80">
                1x Latte, 2x Muffins
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-light">
                <span className="font-body font-medium text-dark">$8.75</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-primary text-white rounded-md text-xs font-body hover:bg-secondary transition-colors">
                    Mark Ready
                  </button>
                  <button className="px-3 py-1 border border-light rounded-md text-xs font-body hover:bg-light transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center py-8 text-dark/60 font-body text-sm">
              No more online orders
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
