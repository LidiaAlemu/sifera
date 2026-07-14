"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Customer", status: "active", joinDate: "2024-01-10", borrowings: 5 },
    { id: 2, name: "Bob Williams", email: "bob@example.com", role: "Customer", status: "active", joinDate: "2024-02-15", borrowings: 3 },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Customer", status: "suspended", joinDate: "2024-03-01", borrowings: 8 },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Customer", status: "active", joinDate: "2024-03-20", borrowings: 2 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSuspendUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "suspended" } : u));
  };

  const handleReactivateUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "active" } : u));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">User Management</h1>
          <p className="text-text-secondary font-body mt-1">View, suspend, and reactivate user accounts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm font-body text-text-secondary">Total Users</p>
          <p className="text-2xl font-heading font-bold text-foreground">{users.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm font-body text-text-secondary">Active Users</p>
          <p className="text-2xl font-heading font-bold text-success">{users.filter(u => u.status === "active").length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm font-body text-text-secondary">Suspended Users</p>
          <p className="text-2xl font-heading font-bold text-error">{users.filter(u => u.status === "suspended").length}</p>
        </div>
      </div>

      {/* User List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border bg-primary/5 text-text-secondary font-medium text-xs uppercase tracking-wider">
                <th className="pb-3 text-left px-6">Name</th>
                <th className="pb-3 text-left px-6">Email</th>
                <th className="pb-3 text-left px-6">Role</th>
                <th className="pb-3 text-left px-6">Status</th>
                <th className="pb-3 text-left px-6">Join Date</th>
                <th className="pb-3 text-left px-6">Borrowings</th>
                <th className="pb-3 text-center px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary/5 transition-colors duration-200">
                  <td className="py-4 px-6 text-foreground font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-foreground">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-foreground border border-border/30">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-success/10 text-success border border-success/30"
                        : "bg-error/10 text-error border border-error/30"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{user.joinDate}</td>
                  <td className="py-4 px-6 text-foreground">{user.borrowings}</td>
                  <td className="py-4 px-6 text-center">
                    {user.status === "active" ? (
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className="text-error hover:text-error/80 text-xs font-medium"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReactivateUser(user.id)}
                        className="text-success hover:text-success/80 text-xs font-medium"
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary font-body">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
