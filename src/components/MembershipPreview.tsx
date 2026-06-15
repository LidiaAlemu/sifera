import Link from "next/link";

const plans = [
  {
    name: "Hourly",
    duration: "1 – 12 hours",
    startingPrice: "100 Birr",
    description: "Perfect for a short visit, a quick work session, or a relaxing coffee break.",
    benefits: [
      "Read any book you like",
      "Wi‑Fi access",
      "Reserved spot (subject to availability)",
    ],
    cta: "Join Hourly",
  },
  {
    name: "Weekly",
    duration: "1 – 3 weeks",
    startingPrice: "1000 Birr",
    description: "Ideal for a project sprint, a reading retreat, or a week of focused work.",
    benefits: [
      "Read any book you like",
      "Wi‑Fi access",
      "Reserved spot",
    ],
    cta: "Join Weekly",
  },
  {
    name: "Monthly",
    duration: "1 – 3 months",
    startingPrice: "2000 Birr / month",
    description: "The best value for regulars — unlimited access, guaranteed seat, and full community perks.",
    benefits: [
      "Read any book you like",
      "Wi‑Fi access",
      "Reserved spot",
      "Priority event access",
    ],
    cta: "Become a Monthly Member",
    featured: true,
  },
];

export default function MembershipPreview() {
  return (
    <section className="bg-olive py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Sifra Membership
          </h2>
          <p className="text-cream font-sans max-w-2xl mx-auto">
            Choose a plan that fits your rhythm. Members enjoy unlimited reading, reliable Wi‑Fi, and a dedicated space to call your own.
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
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-serif font-bold mb-1">{plan.name}</h3>
              <p className="text-sm font-sans text-dark/60 mb-4">{plan.duration}</p>

              <p className="text-3xl font-serif font-bold mb-2">{plan.startingPrice}</p>
              <p className="text-sm font-sans text-dark/70 mb-6">{plan.description}</p>

              <ul className="space-y-2 mb-8 flex-1">
                {plan.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-sans">
                    <svg
                      className="h-5 w-5 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="/membership"
                className={`w-full text-center py-3 rounded-lg font-sans font-semibold transition-colors ${
                  plan.featured
                    ? "bg-dark text-gold hover:bg-dark/90"
                    : "bg-olive text-white hover:bg-olive-dark"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 text-gold font-sans font-medium hover:text-gold-light transition-colors"
          >
            View all membership details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}