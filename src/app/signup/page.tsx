"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      // Optionally: create a profile entry via server
      router.push("/login?message=Check your email to confirm your account");
      router.refresh();
    }
  };

  return (
    <section className="bg-cream min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-serif font-bold text-dark mb-2 text-center">
            Join Sifera
          </h1>
          <p className="text-sm font-sans text-dark/60 text-center mb-8">
            Create your account and become part of our community.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-sans rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-sans font-medium text-dark mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
              />
            </div>

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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-olive text-white font-sans font-semibold rounded-lg hover:bg-olive-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-sans text-dark/60">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-olive hover:text-olive-dark underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}