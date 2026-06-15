import Link from "next/link";

const quickLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/books", label: "Books" },
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-olive text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Tagline */}
          <div>
            <Link
              href="/"
              className="text-2xl font-serif font-bold text-gold hover:text-gold-light transition-colors"
            >
              Sifera
            </Link>
            <p className="mt-3 text-sm font-sans text-cream leading-relaxed">
              A quiet book café and alternative space where coffee, books, and community meet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-wider text-gold mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-cream hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-sans font-semibold uppercase tracking-wider text-gold mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm font-sans text-cream">
              <li>📍 Addis Ababa, Ethiopia</li>
              <li>📞 +251 900 000 000</li>
              <li>✉️ hello@sifera.et</li>
            </ul>
            <div className="mt-6">
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-sans text-cream/70 hover:text-gold-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/20 text-center">
          <p className="text-xs font-sans text-cream/60">
            &copy; {currentYear} Sifera. All rights reserved. &mdash; A quiet place in a noisy world.
          </p>
        </div>
      </div>
    </footer>
  );
}