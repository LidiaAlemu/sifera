"use client";

import { useState } from "react";

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

const maxHourly = Math.max(...hourlyOrders.map((h) => h.orders));
const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount));

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("Today");

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-dark">Reports</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-beige-dark rounded-lg text-sm font-sans text-dark bg-white focus:outline-none focus:ring-2 focus:ring-olive"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Total Revenue</p>
          <p className="text-2xl font-serif font-bold text-dark">18,350 ETB</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Total Orders</p>
          <p className="text-2xl font-serif font-bold text-dark">142</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Avg. Order Value</p>
          <p className="text-2xl font-serif font-bold text-dark">129 ETB</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Active Members</p>
          <p className="text-2xl font-serif font-bold text-gold">24</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart (Simple bar) */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-serif font-semibold text-dark mb-4">
            Revenue (Last 7 Days)
          </h2>
          <div className="flex items-end gap-2 h-48">
            {weeklyRevenue.map((day) => (
              <div
                key={day.day}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-xs font-sans text-dark/60">
                  {day.amount} ETB
                </span>
                <div
                  className="w-full bg-gold rounded-t-md transition-all"
                  style={{
                    height: `${(day.amount / maxRevenue) * 140}px`,
                  }}
                />
                <span className="text-xs font-sans text-dark/60">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Busy Hours (Simple bar) */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-serif font-semibold text-dark mb-4">
            Busy Hours
          </h2>
          <div className="flex items-end gap-1 h-48">
            {hourlyOrders.map((h) => (
              <div
                key={h.hour}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-[10px] font-sans text-dark/50">
                  {h.orders}
                </span>
                <div
                  className="w-full bg-olive rounded-t-sm transition-all"
                  style={{
                    height: `${(h.orders / maxHourly) * 140}px`,
                  }}
                />
                <span className="text-[10px] font-sans text-dark/50">
                  {h.hour.replace(" AM", "").replace(" PM", "")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Items Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-serif font-semibold text-dark mb-4">
          Most Sold Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left border-b border-beige-dark text-dark/60">
                <th className="pb-2 font-medium">#</th>
                <th className="pb-2 font-medium">Item</th>
                <th className="pb-2 font-medium">Sold</th>
                <th className="pb-2 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {popularItems.map((item, index) => (
                <tr key={item.name} className="border-b border-beige-dark/50">
                  <td className="py-3 text-dark/50">{index + 1}</td>
                  <td className="py-3 font-medium text-dark">{item.name}</td>
                  <td className="py-3 text-dark">{item.sold}</td>
                  <td className="py-3 text-gold font-semibold">{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}