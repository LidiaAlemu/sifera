"use client";

import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  availability: string;
  category: string;
};

type BookCategory = {
  id: number;
  name: string;
};

export default function BooksClient({
  categories,
  books,
}: {
  categories: BookCategory[];
  books: Book[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-5 py-3 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans shadow-sm"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors ${
            activeCategory === "All"
              ? "bg-olive text-white shadow-md"
              : "bg-white text-dark border border-beige-dark hover:bg-beige"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors ${
              activeCategory === cat.name
                ? "bg-olive text-white shadow-md"
                : "bg-white text-dark border border-beige-dark hover:bg-beige"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-dark/60 font-sans text-lg">No books found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-serif font-semibold text-dark leading-snug mb-1">
                  {book.title}
                </h3>
                <p className="text-xs font-sans text-dark/50 mb-2">
                  {book.author}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-sans text-dark/40">
                    {book.category}
                  </span>
                  <span
                    className={`text-xs font-sans font-medium px-2 py-0.5 rounded-full ${
                      book.availability === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {book.availability}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}