"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log admin errors specifically
    console.error("Admin panel error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-serif font-bold text-dark mb-2">
          Admin Error
        </h1>
        <p className="text-dark/60 font-sans text-sm mb-6">
          {error.message || "An error occurred in the admin panel"}
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full py-3 bg-olive text-white font-sans font-semibold rounded-lg hover:bg-olive-dark transition-colors"
          >
            Try again
          </button>
          <a
            href="/admin"
            className="block w-full py-3 border border-olive text-olive font-sans font-semibold rounded-lg hover:bg-olive/5 transition-colors"
          >
            Go to Admin Dashboard
          </a>
          <a
            href="/admin/login"
            className="block w-full py-3 text-sm font-sans text-dark/40 hover:text-dark transition-colors"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
