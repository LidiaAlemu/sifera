import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="bg-cream min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-dark mb-4">
            Login
          </h1>
          <p className="text-sm font-sans text-dark/70 mb-6">
            Sign in to your Sifera account to manage orders, events, and membership.
          </p>
          <p className="text-sm font-sans text-dark/50 mb-6">
            Authentication coming soon.
          </p>
          <Link
            href="/signup"
            className="text-sm font-sans text-olive hover:text-olive-dark underline"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}