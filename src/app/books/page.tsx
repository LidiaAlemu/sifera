"use client";

import { useState } from "react";

const allBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=100",
  },
  {
    id: 2,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    category: "Fiction",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=101",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    availability: "Borrowed",
    cover: "https://picsum.photos/300/450?random=102",
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=103",
  },
  {
    id: 5,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Self Development",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=104",
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Self Development",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=105",
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    availability: "Borrowed",
    cover: "https://picsum.photos/300/450?random=106",
  },
  {
    id: 8,
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=107",
  },
  {
    id: 9,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=108",
  },
  {
    id: 10,
    title: "Good to Great",
    author: "Jim Collins",
    category: "Business",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=109",
  },
  {
    id: 11,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Educational",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=110",
  },
  {
    id: 12,
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Educational",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=111",
  },
  {
    id: 13,
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    category: "Children's Books",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=112",
  },
  {
    id: 14,
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    category: "Children's Books",
    availability: "Available",
    cover: "https://picsum.photos/300/450?random=113",
  },
];

const categories = [
  "All",
  "Fiction",
  "Educational",
  "Business",
  "History",
  "Children's Books",
  "Self Development",
];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center mb-4">
          Our Book Collection
        </h1>
        <p className="text-center text-dark/60 font-sans mb-10 max-w-2xl mx-auto">
          Books are for reading in the café, not for sale. Find a cozy corner and
          lose yourself in a great story.
        </p>

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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-olive text-white shadow-md"
                  : "bg-white text-dark border border-beige-dark hover:bg-beige"
              }`}
            >
              {cat}
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
      </div>
    </section>
  );
}