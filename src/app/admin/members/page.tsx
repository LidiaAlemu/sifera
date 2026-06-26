"use client";

import { useState } from "react";

const initialMembers = [
  {
    id: 1,
    name: "Abebe Kebede",
    plan: "Monthly",
    startDate: "2026-06-01",
    endDate: "2026-07-01",
    status: "Active",
    phone: "+251 911 123456",
    email: "abebe@example.com",
  },
  {
    id: 2,
    name: "Dawit Assefa",
    plan: "Weekly",
    startDate: "2026-06-20",
    endDate: "2026-06-27",
    status: "Active",
    phone: "+251 933 112233",
    email: "dawit@example.com",
  },
  {
    id: 3,
    name: "Yonas Girma",
    plan: "Monthly",
    startDate: "2026-05-15",
    endDate: "2026-06-15",
    status: "Expired",
    phone: "+251 955 778899",
    email: "yonas@example.com",
  },
  {
    id: 4,
    name: "Sara Mohammed",
    plan: "Hourly",
    startDate: "2026-06-26",
    endDate: "2026-06-26",
    status: "Active",
    phone: "+251 966 112244",
    email: "sara@example.com",
  },
  {
    id: 5,
    name: "Bethelehem Alemu",
    plan: "Monthly",
    startDate: "2026-06-10",
    endDate: "2026-07-10",
    status: "Active",
    phone: "+251 944 445566",
    email: "betty@example.com",
  },
  {
    id: 6,
    name: "Henok Tesfaye",
    plan: "Weekly",
    startDate: "2026-06-15",
    endDate: "2026-06-22",
    status: "Expired",
    phone: "+251 977 556677",
    email: "henok@example.com",
  },
];

const planFilters = ["All", "Hourly", "Weekly", "Monthly"];
const statusFilters = ["All", "Active", "Expired"];

export default function MembersPage() {
  const [members] = useState(initialMembers);
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const filtered = members.filter((m) => {
    const matchPlan = planFilter === "All" || m.plan === planFilter;
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    return matchPlan && matchStatus;
  });

  const activeCount = members.filter((m) => m.status === "Active").length;
  const expiredCount = members.filter((m) => m.status === "Expired").length;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-dark">Members</h1>
        <button className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors">
          + Add Membership
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Total Members</p>
          <p className="text-2xl font-serif font-bold text-dark">{members.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Active</p>
          <p className="text-2xl font-serif font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Expired</p>
          <p className="text-2xl font-serif font-bold text-red-500">{expiredCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-xs font-sans text-dark/50 mb-1">Monthly Active</p>
          <p className="text-2xl font-serif font-bold text-gold">
            {members.filter((m) => m.plan === "Monthly" && m.status === "Active").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-xs font-sans text-dark/60 mb-1">Plan</label>
          <div className="flex flex-wrap gap-2">
            {planFilters.map((f) => (
              <button
                key={f}
                onClick={() => setPlanFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-sans transition-colors ${
                  planFilter === f
                    ? "bg-olive text-white"
                    : "bg-white text-dark border border-beige-dark hover:bg-beige"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-sans text-dark/60 mb-1">Status</label>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-sans transition-colors ${
                  statusFilter === f
                    ? "bg-olive text-white"
                    : "bg-white text-dark border border-beige-dark hover:bg-beige"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left border-b border-beige-dark text-dark/60 bg-beige/30">
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Plan</th>
                <th className="py-3 px-4 font-medium">Start Date</th>
                <th className="py-3 px-4 font-medium">End Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-beige-dark/50 hover:bg-cream/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-dark">
                    {member.name}
                  </td>
                  <td className="py-3 px-4 text-dark/70">{member.plan}</td>
                  <td className="py-3 px-4 text-dark/70">{member.startDate}</td>
                  <td className="py-3 px-4 text-dark/70">{member.endDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="text-xs text-olive hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-4">
            <h2 className="text-xl font-serif font-bold text-dark mb-4">
              {selectedMember.name}
            </h2>
            <div className="space-y-3 text-sm font-sans">
              <div className="flex justify-between">
                <span className="text-dark/60">Phone</span>
                <span className="text-dark">{selectedMember.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">Email</span>
                <span className="text-dark">{selectedMember.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">Plan</span>
                <span className="text-dark">{selectedMember.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">Start Date</span>
                <span className="text-dark">{selectedMember.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">End Date</span>
                <span className="text-dark">{selectedMember.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  selectedMember.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {selectedMember.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedMember(null)}
              className="mt-6 w-full py-2 border border-beige-dark text-dark font-sans rounded-lg hover:bg-beige transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}