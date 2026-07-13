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
    <aside className="w-64 bg-primary text-white flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-secondary">
        <Link href="/admin" className="text-xl font-heading font-bold text-accent">
          Sifera
        </Link>
        <span className="text-xs font-body text-cream ml-2">Admin</span>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-body transition-colors ${
              pathname === item.href
                ? "bg-secondary text-accent border-r-2 border-accent"
                : "text-cream hover:bg-secondary hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-secondary space-y-3">
        {/* Admin info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent/30 rounded-full flex items-center justify-center text-xs font-bold text-accent">
            {adminUser.user.email?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-xs font-body text-cream">{adminUser.user.email}</p>
            <p className="text-xs font-body text-cream/60">{adminUser.staff.role}</p>
          </div>
        </div>
        {/* View Website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs font-body text-accent hover:text-accent/80 transition-colors"
        >
          🔗 View Website
        </a>
        {/* Logout */}
        <a
          href="/admin/login"
          className="text-xs font-body text-cream hover:text-accent transition-colors"
        >
          Logout
        </a>
      </div>
    </aside>
  );
}
