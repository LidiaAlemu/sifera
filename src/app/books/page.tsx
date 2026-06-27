import { getBooksData } from "@/actions/books";
import BooksClient from "@/components/BooksClient";

export default async function BooksPage() {
  const { categories, books } = await getBooksData();

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center mb-4">
          Our Book Collection
        </h1>
        <p className="text-center text-dark/60 font-sans mb-10 max-w-2xl mx-auto">
          Books are for reading in the café, not for sale. Find a cozy corner and
          lose yourself in a great story.
        </p>
        <BooksClient categories={categories} books={books} />
      </div>
    </section>
  );
}