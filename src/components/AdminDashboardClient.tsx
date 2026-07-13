"use client";

import React from "react";

export default function AdminDashboardClient({ serverOrders }: { serverOrders: any[] }) {
  const orders = serverOrders ?? [];


  const pendingCount = orders.filter(
    (o) => o.order_status === "Waiting Verification"
  ).length;
  const todayOrders = orders.length; // Will be refined to today's date later
  const todayRevenue = orders
    .filter((o) => o.order_status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const activeMembers = 24; // Mock for now; will connect to DB later

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-text-secondary font-body">
          Welcome back! Here&apos;s what&apos;s happening at Sifera today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Pending Orders",
            value: pendingCount,
            icon: "📋",
            color: "warning",
          },
          {
            label: "Active Members",
            value: activeMembers,
            icon: "👥",
            color: "accent",
          },
          {
            label: "Orders Today",
            value: todayOrders,
            icon: "☕",
            color: "success",
          },
          {
            label: "Today's Revenue",
            value: `${todayRevenue} ETB`,
            icon: "💰",
            color: "accent",
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-body text-text-secondary mb-3">
                  {kpi.label}
                </p>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {kpi.value}
                </p>
              </div>
              <div className="text-2xl opacity-50">{kpi.icon}</div>
            </div>
            {/* Subtle accent line */}
            <div className="mt-4 h-1 w-12 bg-gradient-to-r from-accent to-accent/0 rounded-full" />
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 bg-primary/5">
          <h2 className="text-xl font-heading font-semibold text-foreground flex items-center gap-3">
            <span>📊</span>
            Recent Orders
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary font-body">No orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border text-text-secondary font-medium text-xs uppercase tracking-wider">
                    <th className="pb-3 text-left">Order #</th>
                    <th className="pb-3 text-left">Customer</th>
                    <th className="pb-3 text-left">Method</th>
                    <th className="pb-3 text-right">Total</th>
                    <th className="pb-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {orders.slice(0, 5).map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-primary/5 transition-colors duration-200"
                    >
                      <td className="py-4 text-foreground font-medium">
                        #{order.order_number}
                      </td>
                      <td className="py-4 text-foreground">{order.guest_name}</td>
                      <td className="py-4 text-text-secondary">
                        {order.payment_method}
                      </td>
                      <td className="py-4 text-right font-semibold text-foreground">
                        {order.total_amount} ETB
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            order.order_status === "Waiting Verification"
                              ? "bg-warning/10 text-warning border border-warning/30"
                              : order.order_status === "Verified"
                              ? "bg-accent/10 text-accent border border-accent/30"
                              : order.order_status === "Preparing"
                              ? "bg-secondary/10 text-secondary border border-secondary/30"
                              : order.order_status === "Ready"
                              ? "bg-success/10 text-success border border-success/30"
                              : order.order_status === "Completed"
                              ? "bg-muted/10 text-muted border border-muted/30"
                              : "bg-error/10 text-error border border-error/30"
                          }`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
