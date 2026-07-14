"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function StaffManagementPage() {
  const [staff, setStaff] = useState([
    { id: 1, name: "John Doe", email: "john@sifera.et", role: "Manager", status: "active", branch: "Main Branch", hireDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@sifera.et", role: "Manager", status: "active", branch: "Main Branch", hireDate: "2024-02-20" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "Manager",
    branch: "Main Branch",
  });

  const handleAddStaff = () => {
    const staffMember = {
      id: staff.length + 1,
      ...newStaff,
      status: "active",
      hireDate: new Date().toISOString().split('T')[0],
    };
    setStaff([...staff, staffMember]);
    setShowAddModal(false);
    setNewStaff({ name: "", email: "", role: "Manager", branch: "Main Branch" });
  };

  const handleDisableStaff = (id: number) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: "suspended" } : s));
  };

  const handleEnableStaff = (id: number) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status: "active" } : s));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Staff Management</h1>
          <p className="text-text-secondary font-body mt-1">Create and manage manager accounts</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-accent text-white text-sm font-body rounded-lg hover:bg-accent/90 transition-colors"
        >
          + Add Manager
        </button>
      </div>

      {/* Staff List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border bg-primary/5 text-text-secondary font-medium text-xs uppercase tracking-wider">
                <th className="pb-3 text-left px-6">Name</th>
                <th className="pb-3 text-left px-6">Email</th>
                <th className="pb-3 text-left px-6">Role</th>
                <th className="pb-3 text-left px-6">Branch</th>
                <th className="pb-3 text-left px-6">Status</th>
                <th className="pb-3 text-left px-6">Hire Date</th>
                <th className="pb-3 text-center px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-primary/5 transition-colors duration-200">
                  <td className="py-4 px-6 text-foreground font-medium">{member.name}</td>
                  <td className="py-4 px-6 text-foreground">{member.email}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/30">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{member.branch}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      member.status === "active"
                        ? "bg-success/10 text-success border border-success/30"
                        : "bg-error/10 text-error border border-error/30"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{member.hireDate}</td>
                  <td className="py-4 px-6 text-center">
                    {member.status === "active" ? (
                      <button
                        onClick={() => handleDisableStaff(member.id)}
                        className="text-error hover:text-error/80 text-xs font-medium"
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnableStaff(member.id)}
                        className="text-success hover:text-success/80 text-xs font-medium"
                      >
                        Enable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">Add New Manager</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">Branch</label>
                <input
                  type="text"
                  value={newStaff.branch}
                  onChange={(e) => setNewStaff({ ...newStaff, branch: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground font-body hover:bg-primary/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStaff}
                  className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-body hover:bg-accent/90 transition-colors"
                >
                  Add Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
