"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate submission – will be connected to backend later
    setSubmitted(true);
  };

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center mb-4">
          Contact Sifera
        </h1>
        <p className="text-center text-dark/60 font-sans mb-10 max-w-xl mx-auto">
          We’d love to hear from you. Whether you have a question, a suggestion, or just
          want to say hello — reach out.
        </p>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-2">
              Message Sent
            </h2>
            <p className="text-dark/60 font-sans">
              Thank you for reaching out. We’ll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-sans font-medium text-dark mb-1">
                Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-sans font-medium text-dark mb-1">
                Email *
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
              <label htmlFor="message" className="block text-sm font-sans font-medium text-dark mb-1">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans resize-none"
              />
            </div>

            {error && (
              <p className="text-sm font-sans text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-olive text-white font-sans font-semibold rounded-lg hover:bg-olive-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-serif font-semibold text-dark mb-1">Address</h3>
            <p className="text-sm font-sans text-dark/60">Addis Ababa, Ethiopia</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-3xl mb-2">📞</div>
            <h3 className="font-serif font-semibold text-dark mb-1">Phone</h3>
            <p className="text-sm font-sans text-dark/60">+251 900 000 000</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-3xl mb-2">✉️</div>
            <h3 className="font-serif font-semibold text-dark mb-1">Email</h3>
            <p className="text-sm font-sans text-dark/60">hello@sifera.et</p>
          </div>
        </div>
      </div>
    </section>
  );
}