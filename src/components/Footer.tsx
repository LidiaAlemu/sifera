import Link from "next/link";

const quickLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/books", label: "Books" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Tagline */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-heading font-bold text-accent hover:text-accent/90 transition-colors duration-200"
            >
              Sifera
            </Link>
            <p className="mt-4 text-sm font-body text-white/70 leading-relaxed">
              Where exceptional coffee, curated books, and vibrant community converge. Your sanctuary for meaningful moments.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {[
                { label: "Instagram", icon: "📷" },
                { label: "Facebook", icon: "📘" },
                { label: "Twitter", icon: "𝕏" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-all duration-200 flex items-center justify-center"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-accent mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-white/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Location */}
          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-accent mb-4">
              Hours & Location
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-white/70">
              <li className="hover:text-accent transition-colors duration-200">
                📍 Addis Ababa, Ethiopia
              </li>
              <li className="hover:text-accent transition-colors duration-200">
                ☕ Mon-Fri: 7am–9pm
              </li>
              <li className="hover:text-accent transition-colors duration-200">
                📚 Sat-Sun: 9am–10pm
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-accent mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-white/70">
              <li>
                <a href="tel:+251900000000" className="hover:text-accent transition-colors duration-200">
                  📞 +251 900 000 000
                </a>
              </li>
              <li>
                <a href="mailto:hello@sifera.et" className="hover:text-accent transition-colors duration-200">
                  ✉️ hello@sifera.et
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs font-body text-white/50 hover:text-accent transition-colors duration-200"
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
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs font-body text-white/40">
            &copy; {currentYear} Sifera. All rights reserved. A quiet place in a noisy world.
          </p>
        </div>
      </div>
    </footer>
  );
}
