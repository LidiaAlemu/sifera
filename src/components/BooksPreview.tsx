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
    <section className="bg-cream py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-dark mb-12">
          Explore Our Books
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/books?category=${cat.slug}`}
              className="bg-primary text-white rounded-xl shadow-sm hover:shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl mb-3 block">{cat.icon}</span>
              <h3 className="text-sm font-body font-medium text-white">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-primary font-body font-medium hover:text-secondary transition-colors"
          >
            Browse all books
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}