import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="bg-cream min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-dark mb-4">
            Sign Up
          </h1>
          <p className="text-sm font-sans text-dark/70 mb-6">
            Create your Sifera account to order ahead, register for events, and join our membership.
          </p>
          <p className="text-sm font-sans text-dark/50 mb-6">
            Registration coming soon.
          </p>
          <Link
            href="/login"
            className="text-sm font-sans text-olive hover:text-olive-dark underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </section>
  );
}