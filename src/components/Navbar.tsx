"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/books", label: "Books" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-primary text-white border-b border-border/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-heading font-bold text-accent hover:text-accent transition-colors duration-200"
          >
            Sifera
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-body font-medium relative transition-colors duration-200 pb-1 ${
                  pathname === link.href
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent"
                    : "text-white hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-white hover:text-accent transition-colors duration-200 hover:scale-110 transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>

            {loading ? (
              <div className="w-16 h-8 bg-secondary rounded animate-pulse" />
            ) : user ? (
              <>
                <span className="text-sm font-body text-white">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm font-body text-white hover:text-accent transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-body text-white hover:text-accent transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-accent text-primary text-sm font-body font-medium rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:text-accent"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-in-down border-t border-border/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-body transition-colors duration-200 ${
                  pathname === link.href
                    ? "bg-secondary/30 text-accent border-l-2 border-accent"
                    : "text-white hover:bg-secondary/20 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Cart in mobile */}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-base font-body text-white hover:bg-secondary/20 hover:text-accent rounded-lg transition-colors duration-200"
            >
              Cart ({totalItems})
            </Link>
            <div className="pt-3 border-t border-border/20 mt-3 flex flex-col gap-2">
              {loading ? (
                <div className="px-4 py-2.5 text-sm text-white">Loading…</div>
              ) : user ? (
                <>
                  <span className="px-4 py-2.5 text-sm text-white">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="px-4 py-2.5 text-sm text-left text-white hover:bg-secondary/20 hover:text-accent rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-sm font-body text-white hover:bg-secondary/20 hover:text-accent rounded-lg transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-sm font-body font-medium bg-accent text-primary rounded-lg hover:bg-accent/90 transition-all duration-200 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
