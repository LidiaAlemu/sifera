"use client";

import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "@/actions/admin/orders";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminOrders()
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch (err: any) {
      alert(`Failed to update: ${err.message}`);
    }
  };

  const pendingCount = orders.filter((o) => o.order_status === "Waiting Verification").length;
  const activeCount = orders.filter((o) =>
    ["Verified", "Preparing", "Ready"].includes(o.order_status)
  ).length;
  const completedCount = orders.filter((o) => o.order_status === "Completed").length;
  const todayRevenue = orders
    .filter((o) => o.order_status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-dark mb-8">
        Dashboard Overview
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Pending Verifications</p>
          <p className="text-3xl font-serif font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Active Orders</p>
          <p className="text-3xl font-serif font-bold text-blue-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Completed Today</p>
          <p className="text-3xl font-serif font-bold text-green-600">{completedCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-sans text-dark/50 mb-1">Today&apos;s Revenue</p>
          <p className="text-3xl font-serif font-bold text-gold">{todayRevenue} ETB</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-dark/60">Loading orders...</p>
      ) : (
        <>
          {/* Pending Verifications */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-serif font-semibold text-dark mb-4">Pending Verifications</h2>
            {orders.filter((o) => o.order_status === "Waiting Verification").length === 0 ? (
              <p className="text-sm font-sans text-dark/60">No pending verifications.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="text-left border-b border-beige-dark text-dark/60">
                      <th className="pb-2 font-medium">Order #</th>
                      <th className="pb-2 font-medium">Customer</th>
                      <th className="pb-2 font-medium">Method</th>
                      <th className="pb-2 font-medium">Total</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((o) => o.order_status === "Waiting Verification")
                      .map((order) => (
                        <tr key={order.id} className="border-b border-beige-dark/50">
                          <td className="py-3 text-dark font-medium">{order.order_number}</td>
                          <td className="py-3 text-dark">{order.guest_name}</td>
                          <td className="py-3 text-dark">{order.payment_method}</td>
                          <td className="py-3 text-dark">{order.total_amount} ETB</td>
                          <td className="py-3 flex gap-2">
                            <button
                              onClick={() => handleAction(order.id, "Verified")}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors"
                            >
                              ✓ Verify
                            </button>
                            <button
                              onClick={() => handleAction(order.id, "Cancelled")}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors"
                            >
                              ✗ Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* All Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-serif font-semibold text-dark mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="text-left border-b border-beige-dark text-dark/60">
                    <th className="pb-2 font-medium">Order #</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Method</th>
                    <th className="pb-2 font-medium">Total</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-beige-dark/50">
                      <td className="py-3 text-dark font-medium">{order.order_number}</td>
                      <td className="py-3 text-dark">{order.guest_name}</td>
                      <td className="py-3 text-dark">{order.payment_method}</td>
                      <td className="py-3 text-dark">{order.total_amount} ETB</td>
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
                      <td className="py-3 text-dark/60">
                        {new Date(order.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}