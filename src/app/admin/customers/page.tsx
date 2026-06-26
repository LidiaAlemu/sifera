"use client";

import { useState } from "react";

const initialCustomers = [
  {
    id: 1,
    name: "Abebe Kebede",
    phone: "+251 911 123456",
    email: "abebe@example.com",
    totalOrders: 12,
    lastOrderDate: "2026-06-25",
    membership: "Monthly",
  },
  {
    id: 2,
    name: "Meron Tadesse",
    phone: "+251 922 654321",
    email: "meron@example.com",
    totalOrders: 5,
    lastOrderDate: "2026-06-24",
    membership: "None",
  },
  {
    id: 3,
    name: "Dawit Assefa",
    phone: "+251 933 112233",
    email: "dawit@example.com",
    totalOrders: 8,
    lastOrderDate: "2026-06-26",
    membership: "Weekly",
  },
  {
    id: 4,
    name: "Betelhem Alemu",
    phone: "+251 944 445566",
    email: "betty@example.com",
    totalOrders: 3,
    lastOrderDate: "2026-06-20",
    membership: "None",
  },
  {
    id: 5,
    name: "Yonas Girma",
    phone: "+251 955 778899",
    email: "yonas@example.com",
    totalOrders: 20,
    lastOrderDate: "2026-06-26",
    membership: "Monthly",
  },
];

export default function CustomersPage() {
  const [customers] = useState(initialCustomers);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-dark">Customers</h1>
        <button className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors">
          + Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left border-b border-beige-dark text-dark/60 bg-beige/30">
                <th className="py-3 px-6 font-medium">Name</th>
                <th className="py-3 px-6 font-medium">Phone</th>
                <th className="py-3 px-6 font-medium">Email</th>
                <th className="py-3 px-6 font-medium">Total Orders</th>
                <th className="py-3 px-6 font-medium">Last Order</th>
                <th className="py-3 px-6 font-medium">Membership</th>
                <th className="py-3 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-beige-dark/50 hover:bg-cream/50 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-dark">
                    {customer.name}
                  </td>
                  <td className="py-4 px-6 text-dark/70">{customer.phone}</td>
                  <td className="py-4 px-6 text-dark/70">{customer.email}</td>
                  <td className="py-4 px-6 text-dark">{customer.totalOrders}</td>
                  <td className="py-4 px-6 text-dark/70">
                    {customer.lastOrderDate}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        customer.membership === "Monthly"
                          ? "bg-gold/20 text-gold-dark"
                          : customer.membership === "Weekly"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {customer.membership}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="text-xs text-olive hover:underline">
                        View
                      </button>
                      <button className="text-xs text-red-500 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}