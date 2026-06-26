"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const mockOrders = [
  {
    id: "SIF-001",
    customer: "Abebe Kebede",
    paymentMethod: "Telebirr",
    total: "170 ETB",
    status: "Waiting Verification",
    receiptUrl: "#",
    time: "10:30 AM",
  },
  {
    id: "SIF-002",
    customer: "Meron Tadesse",
    paymentMethod: "CBE Mobile",
    total: "95 ETB",
    status: "Verified",
    receiptUrl: "#",
    time: "11:15 AM",
  },
  {
    id: "SIF-003",
    customer: "Dawit Assefa",
    paymentMethod: "Cash",
    total: "320 ETB",
    status: "Preparing",
    time: "12:00 PM",
  },
  {
    id: "SIF-004",
    customer: "Betelhem Alemu",
    paymentMethod: "Telebirr",
    total: "85 ETB",
    status: "Ready",
    time: "12:45 PM",
  },
  {
    id: "SIF-005",
    customer: "Yonas Girma",
    paymentMethod: "CBE Mobile",
    total: "210 ETB",
    status: "Waiting Verification",
    receiptUrl: "#",
    time: "1:20 PM",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    const session = localStorage.getItem("sifera-admin-session");
    if (!session) {
      router.push("/admin/login");
    } else {
      setAdmin(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sifera-admin-session");
    router.push("/admin/login");
  };

  const handleVerify = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Verified" } : o))
    );
  };

  const handleReject = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
    );
  };

  const pendingCount = orders.filter((o) => o.status === "Waiting Verification").length;
  const activeCount = orders.filter((o) =>
    ["Verified", "Preparing", "Ready"].includes(o.status)
  ).length;
  const completedCount = orders.filter((o) => o.status === "Completed").length;
  const todayRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + parseFloat(o.total.replace(" ETB", "")), 0);

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-olive/5">
      {/* Admin Navbar */}
      <header className="bg-olive text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/admin" className="text-xl font-serif font-bold text-gold">
            Sifera Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-sans text-cream">{admin.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-sans text-white hover:text-gold-light transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold text-dark mb-8">Dashboard</h1>

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
            <p className="text-sm font-sans text-dark/50 mb-1">Today's Revenue</p>
            <p className="text-3xl font-serif font-bold text-gold">{todayRevenue} ETB</p>
          </div>
        </div>

        {/* Pending Verifications */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-serif font-semibold text-dark mb-4">
            Pending Verifications
          </h2>
          {orders.filter((o) => o.status === "Waiting Verification").length === 0 ? (
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
                    .filter((o) => o.status === "Waiting Verification")
                    .map((order) => (
                      <tr key={order.id} className="border-b border-beige-dark/50">
                        <td className="py-3 text-dark font-medium">{order.id}</td>
                        <td className="py-3 text-dark">{order.customer}</td>
                        <td className="py-3 text-dark">{order.paymentMethod}</td>
                        <td className="py-3 text-dark">{order.total}</td>
                        <td className="py-3 flex gap-2">
                          <button
                            onClick={() => handleVerify(order.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors"
                          >
                            ✓ Verify
                          </button>
                          <button
                            onClick={() => handleReject(order.id)}
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
          <h2 className="text-xl font-serif font-semibold text-dark mb-4">All Orders Today</h2>
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
                    <td className="py-3 text-dark font-medium">{order.id}</td>
                    <td className="py-3 text-dark">{order.customer}</td>
                    <td className="py-3 text-dark">{order.paymentMethod}</td>
                    <td className="py-3 text-dark">{order.total}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          order.status === "Waiting Verification"
                            ? "bg-amber-100 text-amber-700"
                            : order.status === "Verified"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Preparing"
                            ? "bg-purple-100 text-purple-700"
                            : order.status === "Ready"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Completed"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-dark/60">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}