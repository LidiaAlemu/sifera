"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminUser } from "@/lib/admin-auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/menu", label: "Menu Management", icon: "☕" },
  { href: "/admin/customers", label: "Customers & Members", icon: "👥" },
  { href: "/admin/members", label: "Memberships", icon: "⭐" },
  { href: "/admin/books", label: "Books", icon: "📚" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/payments", label: "Payments", icon: "💳" },
  { href: "/admin/analytics", label: "Analytics", icon: "📈" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ adminUser }: { adminUser: AdminUser }) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-olive text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-olive-dark">
          <Link href="/admin" className="text-xl font-serif font-bold text-gold">
            Sifera
          </Link>
          <span className="text-xs font-sans text-cream ml-2">Admin</span>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-sans transition-colors ${
                pathname === item.href
                  ? "bg-olive-dark text-gold border-r-2 border-gold"
                  : "text-cream hover:bg-olive-dark hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-olive-dark space-y-3">
          {/* Admin info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold/30 rounded-full flex items-center justify-center text-xs font-bold text-gold">
              {adminUser.user.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-xs font-sans text-cream">{adminUser.user.email}</p>
              <p className="text-xs font-sans text-cream/60">{adminUser.staff.role}</p>
            </div>
          </div>
          {/* View Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs font-sans text-gold hover:text-gold-light transition-colors"
          >
            🔗 View Website
          </a>
          {/* Logout */}
          <a
            href="/admin/login"
            className="text-xs font-sans text-cream hover:text-gold-light transition-colors"
          >
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content Header */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center px-6 border-b border-beige-dark">
          <h1 className="text-lg font-serif font-semibold text-dark">
            {navItems.find((i) => i.href === pathname)?.label || "Dashboard"}
          </h1>
        </header>
      </div>
    </>
  );
}
