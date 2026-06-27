"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <section className="bg-cream min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-serif font-bold text-dark mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-sm font-sans text-dark/60 text-center mb-8">
            Sign in to your Sifera account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-sans rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-sans font-medium text-dark mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-sans font-medium text-dark mb-1"
              >
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

          <p className="mt-6 text-center text-sm font-sans text-dark/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-olive hover:text-olive-dark underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}