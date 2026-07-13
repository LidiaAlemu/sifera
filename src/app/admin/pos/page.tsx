"use client";

import { useState } from "react";

export default function POSPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "online">("manual");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Point of Sale</h1>
        <p className="text-text-secondary font-body mt-1">Process orders and manage transactions</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("manual")}
          className={`px-6 py-3.5 font-body text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === "manual"
              ? "text-accent border-accent"
              : "text-text-secondary border-transparent hover:text-foreground"
          }`}
        >
          Manual Order Entry
        </button>
        <button
          onClick={() => setActiveTab("online")}
          className={`px-6 py-3.5 font-body text-sm font-medium transition-all duration-200 border-b-2 ${
            activeTab === "online"
              ? "text-accent border-accent"
              : "text-text-secondary border-transparent hover:text-foreground"
          }`}
        >
          Online Orders
        </button>
      </div>

      {/* Manual Order Entry */}
      {activeTab === "manual" && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-foreground bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-foreground bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-semibold text-foreground mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-foreground bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Add Items */}
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Add Items
                </h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    className="flex-1 px-4 py-2.5 border border-border rounded-lg font-body text-foreground bg-background placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  />
                  <button className="px-6 py-2.5 bg-accent text-primary rounded-lg font-body text-sm font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Order Type
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <button className="p-5 border-2 border-primary bg-primary text-white rounded-lg text-center hover:bg-primary-dark transition-all duration-200 hover:shadow-md">
                  <div className="text-3xl mb-2">🍽️</div>
                  <div className="font-body text-sm font-medium">
                    Dine In
                  </div>
                </button>
                <button className="p-5 border-2 border-border bg-card text-foreground rounded-lg text-center hover:border-accent transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="text-3xl mb-2">🥡</div>
                  <div className="font-body text-sm font-medium">
                    Takeaway
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-border pt-8 space-y-6 bg-primary/5 -mx-6 -mb-6 px-6 py-6 rounded-b-xl">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Order Summary
            </h2>
            <div className="bg-background border border-border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center text-sm font-body text-text-secondary">
                <span>No items added yet</span>
                <span className="text-foreground font-semibold">0.00 ETB</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading font-semibold text-foreground">
                Total
              </span>
              <span className="text-3xl font-heading font-bold text-accent">
                0.00 ETB
              </span>
            </div>
            <button className="w-full py-3.5 bg-accent text-primary rounded-lg font-body font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              Create Order
            </button>
          </div>
        </div>
      )}

      {/* Online Orders Tracking */}
      {activeTab === "online" && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Online Orders Queue
            </h2>
            <select className="px-4 py-2.5 border border-border rounded-lg font-body text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 max-w-xs">
              <option>All Status</option>
              <option>Pending</option>
              <option>Preparing</option>
              <option>Ready</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {/* Order 1 */}
            <div className="bg-card border-2 border-warning rounded-lg p-5 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-body font-semibold text-foreground text-lg">
                    Order #1234
                  </div>
                  <div className="text-sm font-body text-text-secondary">
                    2 minutes ago
                  </div>
                </div>
                <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/30 rounded-full text-xs font-body font-semibold">
                  Pending
                </span>
              </div>
              <div className="text-sm font-body text-foreground">
                2x Espresso, 1x Croissant
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-body font-semibold text-foreground text-lg">250.00 ETB</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-success text-white rounded-lg text-xs font-body font-semibold hover:bg-success/90 transition-all duration-200 hover:shadow-md">
                    Accept Order
                  </button>
                  <button className="px-4 py-2 border border-border text-foreground rounded-lg text-xs font-body font-semibold hover:bg-primary/5 transition-all duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Order 2 */}
            <div className="bg-card border-2 border-primary rounded-lg p-5 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-body font-semibold text-foreground text-lg">
                    Order #1233
                  </div>
                  <div className="text-sm font-body text-text-secondary">
                    15 minutes ago
                  </div>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs font-body font-semibold">
                  Preparing
                </span>
              </div>
              <div className="text-sm font-body text-foreground">
                1x Latte, 2x Muffins
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-body font-semibold text-foreground text-lg">175.00 ETB</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-accent text-primary rounded-lg text-xs font-body font-semibold hover:bg-accent/90 transition-all duration-200 hover:shadow-md">
                    Mark Ready
                  </button>
                  <button className="px-4 py-2 border border-border text-foreground rounded-lg text-xs font-body font-semibold hover:bg-primary/5 transition-all duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-text-secondary font-body">No more online orders at this time</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
