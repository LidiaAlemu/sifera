"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState("audit");

  const auditLogs = [
    { id: 1, user: "admin@sifera.et", action: "Created manager account", details: "Created manager: john@sifera.et", timestamp: "2024-01-15 10:30:00", ip: "192.168.1.100" },
    { id: 2, user: "john@sifera.et", action: "Updated menu item", details: "Updated price for Latte", timestamp: "2024-01-15 11:45:00", ip: "192.168.1.101" },
    { id: 3, user: "admin@sifera.et", action: "Suspended user", details: "Suspended user: charlie@example.com", timestamp: "2024-01-15 14:20:00", ip: "192.168.1.100" },
    { id: 4, user: "john@sifera.et", action: "Processed order", details: "Order #1234 marked as completed", timestamp: "2024-01-15 15:30:00", ip: "192.168.1.101" },
    { id: 5, user: "admin@sifera.et", action: "System settings changed", details: "Updated business hours", timestamp: "2024-01-15 16:00:00", ip: "192.168.1.100" },
    { id: 6, user: "system", action: "Database backup", details: "Automatic daily backup completed", timestamp: "2024-01-15 23:00:00", ip: "localhost" },
  ];

  const systemMetrics = [
    { metric: "Database Size", value: "245 MB", status: "good" },
    { metric: "Active Sessions", value: "12", status: "good" },
    { metric: "Server Uptime", value: "99.9%", status: "good" },
    { metric: "Response Time", value: "120ms", status: "good" },
    { metric: "Error Rate", value: "0.02%", status: "good" },
    { metric: "Storage Used", value: "45%", status: "good" },
  ];

  const recentBackups = [
    { id: 1, date: "2024-01-15 23:00:00", size: "245 MB", type: "Automatic", status: "completed" },
    { id: 2, date: "2024-01-14 23:00:00", size: "242 MB", type: "Automatic", status: "completed" },
    { id: 3, date: "2024-01-13 23:00:00", size: "238 MB", type: "Automatic", status: "completed" },
    { id: 4, date: "2024-01-12 18:30:00", size: "235 MB", type: "Manual", status: "completed" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Security</h1>
          <p className="text-text-secondary font-body mt-1">Audit logs and system monitoring</p>
        </div>
      </div>

      {/* Security Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {["audit", "monitoring", "backups"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-body border-b-2 transition-colors ${
              activeTab === tab
                ? "border-accent text-accent font-medium"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Audit Logs */}
      {activeTab === "audit" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-heading font-semibold text-foreground">Audit Logs</h2>
            <button className="px-4 py-2 text-sm font-body text-accent hover:text-accent/80">
              Export Logs
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border bg-primary/5 text-text-secondary font-medium text-xs uppercase tracking-wider">
                  <th className="pb-3 text-left px-6">Timestamp</th>
                  <th className="pb-3 text-left px-6">User</th>
                  <th className="pb-3 text-left px-6">Action</th>
                  <th className="pb-3 text-left px-6">Details</th>
                  <th className="pb-3 text-left px-6">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-primary/5 transition-colors duration-200">
                    <td className="py-4 px-6 text-text-secondary font-mono text-xs">{log.timestamp}</td>
                    <td className="py-4 px-6 text-foreground font-medium">{log.user}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/30">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-text-secondary">{log.details}</td>
                    <td className="py-4 px-6 text-text-secondary font-mono text-xs">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* System Monitoring */}
      {activeTab === "monitoring" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric) => (
              <div key={metric.metric} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-body text-text-secondary">{metric.metric}</p>
                  <span className={`w-2 h-2 rounded-full ${
                    metric.status === "good" ? "bg-success" : "bg-warning"
                  }`} />
                </div>
                <p className="text-2xl font-heading font-bold text-foreground">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">System Health</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-body text-text-secondary">CPU Usage</span>
                  <span className="text-sm font-body text-foreground">45%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-body text-text-secondary">Memory Usage</span>
                  <span className="text-sm font-body text-foreground">62%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "62%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-body text-text-secondary">Disk Usage</span>
                  <span className="text-sm font-body text-foreground">45%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Database Backups */}
      {activeTab === "backups" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-heading font-semibold text-foreground">Database Backups</h2>
              <button className="px-4 py-2 bg-accent text-white text-sm font-body rounded-lg hover:bg-accent/90 transition-colors">
                Create Backup
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="text-left border-b border-border text-text-secondary font-medium text-xs uppercase tracking-wider">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Size</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBackups.map((backup) => (
                    <tr key={backup.id} className="border-b border-border/50">
                      <td className="py-3 text-foreground font-mono text-xs">{backup.date}</td>
                      <td className="py-3 text-foreground">{backup.size}</td>
                      <td className="py-3">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-foreground border border-border/30">
                          {backup.type}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/30">
                          {backup.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-accent hover:text-accent/80 text-xs font-medium">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Backup Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body font-medium text-foreground">Automatic Daily Backups</p>
                  <p className="text-xs font-body text-text-secondary">Create backups at 11:00 PM daily</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body font-medium text-foreground">Retention Period</p>
                  <p className="text-xs font-body text-text-secondary">Keep backups for 30 days</p>
                </div>
                <select className="px-3 py-1 border border-border rounded-lg text-sm font-body text-foreground bg-card">
                  <option>7 days</option>
                  <option selected>30 days</option>
                  <option>90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
