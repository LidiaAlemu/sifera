"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminUser } from "@/lib/admin-auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/pos", label: "POS", icon: "🧾" },
  { href: "/admin/menu", label: "Menu Management", icon: "☕" },
  { href: "/admin/customers", label: "Customers & Members", icon: "👥" },
  { href: "/admin/books", label: "Books", icon: "📚" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/payments", label: "Payments", icon: "💳" },
  { href: "/admin/analytics", label: "Analytics", icon: "📈" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ adminUser }: { adminUser: AdminUser }) {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-primary text-white flex flex-col h-screen sticky top-0 border-r border-border/10 shadow-lg">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/10">
        <Link href="/admin" className="text-xl font-heading font-bold text-accent hover:text-accent/90 transition-colors duration-200">
          Sifera
        </Link>
        <span className="text-xs font-body text-white/60 bg-accent/10 px-2 py-1 rounded">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-body transition-all duration-200 relative ${
                isActive
                  ? "bg-accent/10 text-accent font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent before:rounded-r-lg"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/10 space-y-3">
        {/* Admin info */}
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
          <div className="w-9 h-9 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
            {adminUser.user.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body text-white/80 truncate">{adminUser.user.email}</p>
            <p className="text-xs font-body text-white/50">{adminUser.staff.role}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2 border-t border-border/10">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-body text-white/70 hover:text-accent hover:bg-accent/10 rounded-lg transition-all duration-200"
          >
            <span>🔗</span>
            View Website
          </a>
          <a
            href="/admin/login"
            className="flex items-center gap-2 px-3 py-2 text-xs font-body text-white/70 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200"
          >
            <span>🚪</span>
            Logout
          </a>
        </div>
      </div>
    </aside>
  );
}
