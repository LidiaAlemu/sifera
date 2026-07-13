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
    <div className="space-y-10">
      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl px-6 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-card placeholder-text-secondary shadow-sm transition-all duration-200"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 ${
            activeCategory === "All"
              ? "bg-primary text-white shadow-md"
              : "bg-card border border-border text-foreground hover:border-accent/50 hover:bg-primary/5"
          }`}
        >
          All Genres
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.name
                ? "bg-primary text-white shadow-md"
                : "bg-card border border-border text-foreground hover:border-accent/50 hover:bg-primary/5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-secondary font-body text-lg">No books found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-heading font-semibold text-foreground leading-snug mb-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs font-body text-text-secondary mb-3 line-clamp-1">
                  by {book.author}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                  <span className="text-xs font-body text-muted flex-1 truncate">
                    {book.category}
                  </span>
                  <span
                    className={`text-xs font-body font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                      book.availability === "Available"
                        ? "bg-success/10 text-success border border-success/30"
                        : "bg-warning/10 text-warning border border-warning/30"
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
    </div>
  );
}
