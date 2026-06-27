"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

// Temporary admin credentials (will be replaced with Supabase auth later)
const ADMIN_EMAIL = "admin@sifera.et";
const ADMIN_PASSWORD = "sifera2026";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store admin session in localStorage for now
      localStorage.setItem("sifera-admin-session", JSON.stringify({ email, role: "Owner" }));
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-olive flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gold mb-2">Sifera</h1>
          <p className="text-cream font-sans text-sm">Admin Panel</p>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-serif font-bold text-dark mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-sans rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-sans font-medium text-dark mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sifera.et"
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-sans font-medium text-dark mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-olive text-white font-sans font-semibold rounded-lg hover:bg-olive-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs font-sans text-dark/40">
            Secure access for Sifera staff only.
          </p>
        </div>
      </div>
    </section>
  );
}