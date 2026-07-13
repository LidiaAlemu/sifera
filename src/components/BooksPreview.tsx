import Link from "next/link";

const categories = [
  { name: "Fiction", slug: "fiction", icon: "📚" },
  { name: "Educational", slug: "educational", icon: "📖" },
  { name: "Business", slug: "business", icon: "💼" },
  { name: "History", slug: "history", icon: "🏛️" },
  { name: "Children's Books", slug: "children", icon: "🧒" },
  { name: "Self Development", slug: "self-development", icon: "🌱" },
];

export default function BooksPreview() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm font-body text-accent font-semibold tracking-wider uppercase mb-3">
            Book Collection
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 text-balance">
            Explore Our Books by Category
          </h2>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Discover our carefully curated selection across all genres and interests.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/books?category=${cat.slug}`}
              className="group relative bg-card border border-border rounded-xl hover:border-accent/50 hover:shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center min-h-32"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="text-5xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <h3 className="text-sm font-body font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                {cat.name}
              </h3>

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/0 transition-all duration-300 rounded-xl" />
            </Link>
          ))}
        </div>

        {/* Browse All Link */}
        <div className="text-center mt-12">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 text-primary font-body font-semibold hover:text-accent transition-colors duration-200 group"
          >
            Browse all books
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
