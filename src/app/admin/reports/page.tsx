"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

const popularItems = [
  { name: "Latte", sold: 45, revenue: "3,825 ETB" },
  { name: "Cappuccino", sold: 38, revenue: "3,420 ETB" },
  { name: "Club Sandwich", sold: 30, revenue: "4,500 ETB" },
  { name: "Chocolate Cake", sold: 28, revenue: "3,640 ETB" },
  { name: "Mocha", sold: 25, revenue: "2,375 ETB" },
];

const hourlyOrders = [
  { hour: "7 AM", orders: 8 },
  { hour: "8 AM", orders: 15 },
  { hour: "9 AM", orders: 22 },
  { hour: "10 AM", orders: 18 },
  { hour: "11 AM", orders: 14 },
  { hour: "12 PM", orders: 25 },
  { hour: "1 PM", orders: 20 },
  { hour: "2 PM", orders: 12 },
  { hour: "3 PM", orders: 10 },
  { hour: "4 PM", orders: 16 },
  { hour: "5 PM", orders: 19 },
  { hour: "6 PM", orders: 13 },
];

const weeklyRevenue = [
  { day: "Mon", amount: 2100 },
  { day: "Tue", amount: 1850 },
  { day: "Wed", amount: 2400 },
  { day: "Thu", amount: 1900 },
  { day: "Fri", amount: 3200 },
  { day: "Sat", amount: 4100 },
  { day: "Sun", amount: 2800 },
];

const inventoryData = [
  { item: "Coffee Beans", stock: 45, unit: "kg", status: "good" },
  { item: "Milk", stock: 20, unit: "liters", status: "low" },
  { item: "Sugar", stock: 30, unit: "kg", status: "good" },
  { item: "Cups", stock: 500, unit: "pcs", status: "good" },
  { item: "Tea Bags", stock: 15, unit: "boxes", status: "low" },
];

const borrowingData = [
  { book: "The Great Gatsby", borrowed: 12, returned: 10, overdue: 2 },
  { book: "1984", borrowed: 18, returned: 16, overdue: 2 },
  { book: "To Kill a Mockingbird", borrowed: 15, returned: 15, overdue: 0 },
  { book: "Pride and Prejudice", borrowed: 20, returned: 18, overdue: 2 },
];

const maxHourly = Math.max(...hourlyOrders.map((h) => h.orders));
const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount));

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("Today");
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Reports</h1>
          <p className="text-text-secondary font-body mt-1">Admin-only comprehensive reports</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg text-sm font-body text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {["sales", "inventory", "borrowing", "daily", "monthly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-body border-b-2 transition-colors ${
              activeTab === tab
                ? "border-accent text-accent font-medium"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Reports
          </button>
        ))}
      </div>

      {/* Sales Reports */}
      {activeTab === "sales" && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-body text-text-secondary mb-1">Total Revenue</p>
              <p className="text-2xl font-heading font-bold text-foreground">18,350 ETB</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-body text-text-secondary mb-1">Total Orders</p>
              <p className="text-2xl font-heading font-bold text-foreground">142</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-body text-text-secondary mb-1">Avg. Order Value</p>
              <p className="text-2xl font-heading font-bold text-foreground">129 ETB</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs font-body text-text-secondary mb-1">Active Members</p>
              <p className="text-2xl font-heading font-bold text-accent">24</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                Revenue (Last 7 Days)
              </h2>
              <div className="flex items-end gap-2 h-48">
                {weeklyRevenue.map((day) => (
                  <div
                    key={day.day}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs font-body text-text-secondary">
                      {day.amount} ETB
                    </span>
                    <div
                      className="w-full bg-accent rounded-t-md transition-all"
                      style={{
                        height: `${(day.amount / maxRevenue) * 140}px`,
                      }}
                    />
                    <span className="text-xs font-body text-text-secondary">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Busy Hours */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                Busy Hours
              </h2>
              <div className="flex items-end gap-1 h-48">
                {hourlyOrders.map((h) => (
                  <div
                    key={h.hour}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <span className="text-[10px] font-body text-text-secondary">
                      {h.orders}
                    </span>
                    <div
                      className="w-full bg-primary rounded-t-sm transition-all"
                      style={{
                        height: `${(h.orders / maxHourly) * 140}px`,
                      }}
                    />
                    <span className="text-[10px] font-body text-text-secondary">
                      {h.hour.replace(" AM", "").replace(" PM", "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Items Table */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
              Most Sold Items
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="text-left border-b border-border text-text-secondary">
                    <th className="pb-2 font-medium">#</th>
                    <th className="pb-2 font-medium">Item</th>
                    <th className="pb-2 font-medium">Sold</th>
                    <th className="pb-2 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {popularItems.map((item, index) => (
                    <tr key={item.name} className="border-b border-border/50">
                      <td className="py-3 text-text-secondary">{index + 1}</td>
                      <td className="py-3 font-medium text-foreground">{item.name}</td>
                      <td className="py-3 text-foreground">{item.sold}</td>
                      <td className="py-3 text-accent font-semibold">{item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Inventory Reports */}
      {activeTab === "inventory" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Inventory Status
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-left border-b border-border text-text-secondary">
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 font-medium">Stock</th>
                  <th className="pb-2 font-medium">Unit</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.item} className="border-b border-border/50">
                    <td className="py-3 font-medium text-foreground">{item.item}</td>
                    <td className="py-3 text-foreground">{item.stock}</td>
                    <td className="py-3 text-text-secondary">{item.unit}</td>
                    <td className="py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "good"
                          ? "bg-success/10 text-success border border-success/30"
                          : "bg-warning/10 text-warning border border-warning/30"
                      }`}>
                        {item.status === "good" ? "In Stock" : "Low Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Borrowing Reports */}
      {activeTab === "borrowing" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Book Borrowing Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="text-left border-b border-border text-text-secondary">
                  <th className="pb-2 font-medium">Book</th>
                  <th className="pb-2 font-medium">Total Borrowed</th>
                  <th className="pb-2 font-medium">Returned</th>
                  <th className="pb-2 font-medium">Overdue</th>
                </tr>
              </thead>
              <tbody>
                {borrowingData.map((book) => (
                  <tr key={book.book} className="border-b border-border/50">
                    <td className="py-3 font-medium text-foreground">{book.book}</td>
                    <td className="py-3 text-foreground">{book.borrowed}</td>
                    <td className="py-3 text-success">{book.returned}</td>
                    <td className="py-3 text-error">{book.overdue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Daily Reports */}
      {activeTab === "daily" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Daily Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">Today's Orders</p>
              <p className="text-3xl font-heading font-bold text-foreground">24</p>
            </div>
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">Today's Revenue</p>
              <p className="text-3xl font-heading font-bold text-accent">3,450 ETB</p>
            </div>
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">Today's Borrowings</p>
              <p className="text-3xl font-heading font-bold text-foreground">8</p>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Reports */}
      {activeTab === "monthly" && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
            Monthly Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">Monthly Orders</p>
              <p className="text-3xl font-heading font-bold text-foreground">712</p>
            </div>
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">Monthly Revenue</p>
              <p className="text-3xl font-heading font-bold text-accent">92,450 ETB</p>
            </div>
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">Monthly Borrowings</p>
              <p className="text-3xl font-heading font-bold text-foreground">156</p>
            </div>
            <div>
              <p className="text-sm font-body text-text-secondary mb-2">New Members</p>
              <p className="text-3xl font-heading font-bold text-success">12</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}