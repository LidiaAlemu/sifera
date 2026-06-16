"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/books", label: "Books" },
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  return (
    <header className="bg-olive text-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-gold hover:text-gold-light transition-colors"
          >
            Sifera
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-sans font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-gold border-b-2 border-gold pb-1"
                    : "text-white hover:text-gold-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-16 h-8 bg-olive-dark rounded animate-pulse" />
            ) : user ? (
              <>
                <span className="text-sm font-sans text-cream">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm font-sans text-white hover:text-gold-light transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-sans text-white hover:text-gold-light transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-beige text-dark text-sm font-sans rounded-lg hover:bg-beige-dark transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:text-gold-light"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-sans ${
                  pathname === link.href
                    ? "bg-olive-dark text-gold"
                    : "text-white hover:bg-olive-dark hover:text-gold-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-2">
              {loading ? (
                <div className="px-3 py-2 text-sm text-cream">Loading…</div>
              ) : user ? (
                <>
                  <span className="px-3 py-2 text-sm text-cream">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="px-3 py-2 text-sm text-left text-white hover:bg-olive-dark rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-sm font-sans text-white hover:bg-olive-dark rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 text-sm font-sans bg-beige text-dark rounded-md hover:bg-beige-dark text-center"
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