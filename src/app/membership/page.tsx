"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const plans = [
  {
    name: "Hourly",
    description: "Perfect for a short visit, a quick work session, or a relaxing coffee break.",
    details: [
      "1 hour – 100 Birr",
      "2 hours – 250 Birr",
      "3 hours – 300 Birr",
      "4+ hours – 400 Birr",
    ],
    benefits: [
      "Read any book you like",
      "Wi‑Fi access",
      "Reserved spot (subject to availability)",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Weekly",
    description: "Ideal for a project sprint, a reading retreat, or a week of focused work.",
    details: [
      "1 week – 1000 Birr",
      "2 weeks – 1200 Birr",
      "3 weeks – 1500 Birr",
    ],
    benefits: [
      "Read any book you like",
      "Wi‑Fi access",
      "Reserved spot",
      "Access to member‑only events",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    name: "Monthly",
    description: "The best value for regulars — unlimited access, guaranteed seat, and full community perks.",
    details: [
      "1 month – 2000 Birr",
      "2 months – 4000 Birr",
      "3 months – 6000 Birr",
    ],
    benefits: [
      "Read any book you like",
      "Wi‑Fi access",
      "Reserved spot",
      "Priority event access",
      "Free drink per visit",
    ],
    featured: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

export default function MembershipPage() {
  const { user, loading } = useAuth();

  const handleJoinClick = () => {
    if (!user) {
      alert("Please create an account or login to join a membership plan.");
    } else {
      alert("Membership joining will be fully available once the backend is connected. In the meantime, you can speak to our staff at the café.");
    }
  };

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
            Sifera Membership
          </h1>
          <p className="text-lg font-sans text-dark/70 max-w-2xl mx-auto">
            Choose a plan that fits your rhythm. Members enjoy unlimited reading,
            reliable Wi‑Fi, and a dedicated space to call your own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "bg-gold text-dark shadow-2xl scale-105"
                  : "bg-white text-dark shadow-md"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark text-gold text-xs font-sans font-semibold px-4 py-1 rounded-full">
                  Best Value
                </span>
              )}

              <div className="mb-4 text-olive">{plan.icon}</div>
              <h3 className="text-2xl font-serif font-bold mb-1">{plan.name}</h3>
              <p className="text-sm font-sans text-dark/60 mb-6">
                {plan.description}
              </p>

              <div className="mb-6">
                <ul className="space-y-1 text-sm font-sans">
                  {plan.details.map((detail) => (
                    <li key={detail} className="font-medium">{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 flex-1">
                <p className="text-sm font-sans font-semibold mb-2">Benefits:</p>
                <ul className="space-y-1">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm font-sans">
                      <svg className="h-5 w-5 flex-shrink-0 mt-0.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleJoinClick}
                className={`w-full py-3 rounded-lg font-sans font-semibold transition-colors ${
                  plan.featured
                    ? "bg-dark text-gold hover:bg-dark/90"
                    : "bg-olive text-white hover:bg-olive-dark"
                }`}
              >
                Join {plan.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm font-sans text-dark/50 mt-10">
          Not sure which plan suits you? Visit us at the café and our staff will help you choose.
        </p>
      </div>
    </section>
  );
}