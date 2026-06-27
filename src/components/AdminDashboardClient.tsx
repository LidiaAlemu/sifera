"use client";

import { useEffect, useState } from "react";
import { getAdminOrders } from "@/actions/admin/orders";

export default function AdminDashboardClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminOrders()
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-dark/60 font-sans">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-sans">Error: {error}</p>
      </div>
    );
  }

  const pendingCount = orders.filter(
    (o) => o.order_status === "Waiting Verification"
  ).length;
  const todayOrders = orders.length; // Will be refined to today's date later
  const todayRevenue = orders
    .filter((o) => o.order_status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const activeMembers = 24; // Mock for now; will connect to DB later

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-dark mb-8">
        Dashboard Overview
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Pending Orders</p>
          <p className="text-3xl font-serif font-bold text-amber-600">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Active Members</p>
          <p className="text-3xl font-serif font-bold text-blue-600">
            {activeMembers}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Orders Today</p>
          <p className="text-3xl font-serif font-bold text-green-600">
            {todayOrders}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Today's Revenue</p>
          <p className="text-3xl font-serif font-bold text-gold">
            {todayRevenue} ETB
          </p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-serif font-semibold text-dark mb-4">
          Recent Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-sm font-sans text-dark/60">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left border-b border-beige-dark text-dark/60">
                  <th className="pb-2 font-medium">Order #</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Method</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-beige-dark/50"
                  >
                    <td className="py-3 text-dark font-medium">
                      {order.order_number}
                    </td>
                    <td className="py-3 text-dark">{order.guest_name}</td>
                    <td className="py-3 text-dark">{order.payment_method}</td>
                    <td className="py-3 text-dark">
                      {order.total_amount} ETB
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          order.order_status === "Waiting Verification"
                            ? "bg-amber-100 text-amber-700"
                            : order.order_status === "Verified"
                            ? "bg-blue-100 text-blue-700"
                            : order.order_status === "Preparing"
                            ? "bg-purple-100 text-purple-700"
                            : order.order_status === "Ready"
                            ? "bg-green-100 text-green-700"
                            : order.order_status === "Completed"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
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
  );
}