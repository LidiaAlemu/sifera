import { getBooksData } from "@/actions/books";
import BooksClient from "@/components/BooksClient";

export default async function BooksPage() {
  const { categories, books } = await getBooksData();

  return (
    <section className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-body text-accent font-semibold tracking-wider uppercase mb-3">
            Curated Collection
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 text-balance">
            Our Book Collection
          </h1>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Browse our thoughtfully curated selection of books. Find a cozy corner and lose yourself in a great story while enjoying your favorite beverage.
          </p>
        </div>

        <BooksClient categories={categories} books={books} />
      </div>
    </section>
  );
}
