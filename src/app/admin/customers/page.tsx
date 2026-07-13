"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

const initialCustomers = [
  {
    id: 1,
    name: "Abebe Kebede",
    phone: "+251 911 123456",
    email: "abebe@example.com",
    totalOrders: 12,
    lastOrderDate: "2026-06-25",
  },
  {
    id: 2,
    name: "Meron Tadesse",
    phone: "+251 922 654321",
    email: "meron@example.com",
    totalOrders: 5,
    lastOrderDate: "2026-06-24",
  },
  {
    id: 3,
    name: "Dawit Assefa",
    phone: "+251 933 112233",
    email: "dawit@example.com",
    totalOrders: 8,
    lastOrderDate: "2026-06-26",
  },
  {
    id: 4,
    name: "Betelhem Alemu",
    phone: "+251 944 445566",
    email: "betty@example.com",
    totalOrders: 3,
    lastOrderDate: "2026-06-20",
  },
  {
    id: 5,
    name: "Yonas Girma",
    phone: "+251 955 778899",
    email: "yonas@example.com",
    totalOrders: 20,
    lastOrderDate: "2026-06-26",
  },
];

export default function CustomersPage() {
  const [customers] = useState(initialCustomers);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Customer Management</h1>
          <p className="text-text-secondary font-body mt-1">View and manage registered customers</p>
        </div>
        <button className="px-6 py-2.5 bg-accent text-primary text-sm font-body font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 w-fit">
          + Add Customer
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left border-b border-border text-text-secondary font-medium text-xs uppercase tracking-wider bg-primary/5">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6 text-center">Orders</th>
                <th className="py-4 px-6">Last Order</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-primary/5 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-semibold text-foreground">
                    {customer.name}
                  </td>
                  <td className="py-4 px-6 text-text-secondary font-body">{customer.phone}</td>
                  <td className="py-4 px-6 text-text-secondary font-body">{customer.email}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full text-xs font-semibold">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary font-body">
                    {customer.lastOrderDate}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button className="text-xs font-body font-semibold text-accent hover:text-accent/80 transition-colors duration-200">
                        View Profile
                      </button>
                      <button className="text-xs font-body font-semibold text-error hover:text-error/80 transition-colors duration-200">
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
