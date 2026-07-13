"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  availability: string;
  cover: string;
};

const initialBooks: Book[] = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", category: "Fiction", availability: "Available", cover: "https://picsum.photos/300/450?random=100" },
  { id: 2, title: "Where the Crawdads Sing", author: "Delia Owens", category: "Fiction", availability: "Available", cover: "https://picsum.photos/300/450?random=101" },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", availability: "Borrowed", cover: "https://picsum.photos/300/450?random=102" },
  { id: 4, title: "Atomic Habits", author: "James Clear", category: "Self Development", availability: "Available", cover: "https://picsum.photos/300/450?random=103" },
  { id: 5, title: "The Power of Now", author: "Eckhart Tolle", category: "Self Development", availability: "Available", cover: "https://picsum.photos/300/450?random=104" },
  { id: 6, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Self Development", availability: "Available", cover: "https://picsum.photos/300/450?random=105" },
  { id: 7, title: "Sapiens", author: "Yuval Noah Harari", category: "History", availability: "Borrowed", cover: "https://picsum.photos/300/450?random=106" },
  { id: 8, title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", availability: "Available", cover: "https://picsum.photos/300/450?random=107" },
  { id: 9, title: "The Lean Startup", author: "Eric Ries", category: "Business", availability: "Available", cover: "https://picsum.photos/300/450?random=108" },
  { id: 10, title: "Good to Great", author: "Jim Collins", category: "Business", availability: "Available", cover: "https://picsum.photos/300/450?random=109" },
  { id: 11, title: "A Brief History of Time", author: "Stephen Hawking", category: "Educational", availability: "Available", cover: "https://picsum.photos/300/450?random=110" },
  { id: 12, title: "The Selfish Gene", author: "Richard Dawkins", category: "Educational", availability: "Available", cover: "https://picsum.photos/300/450?random=111" },
  { id: 13, title: "The Very Hungry Caterpillar", author: "Eric Carle", category: "Children's Books", availability: "Available", cover: "https://picsum.photos/300/450?random=112" },
  { id: 14, title: "Goodnight Moon", author: "Margaret Wise Brown", category: "Children's Books", availability: "Available", cover: "https://picsum.photos/300/450?random=113" },
];

const categories = ["All", "Fiction", "Educational", "Business", "History", "Children's Books", "Self Development"];

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    availability: "Available",
    cover: "",
  });

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingBook(null);
    setForm({ title: "", author: "", category: "Fiction", availability: "Available", cover: "" });
    setShowModal(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      availability: book.availability,
      cover: book.cover,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.author) return;

    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editingBook.id
            ? { ...b, ...form }
            : b
        )
      );
    } else {
      const newId = Math.max(...books.map((b) => b.id), 0) + 1;
      setBooks((prev) => [
        ...prev,
        {
          id: newId,
          ...form,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const toggleAvailability = (id: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              availability:
                b.availability === "Available" ? "Borrowed" : "Available",
            }
          : b
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Books Management</h1>
          <p className="text-text-secondary font-body mt-1">Manage library inventory and availability</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-2.5 bg-accent text-primary text-sm font-body font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 w-fit"
        >
          + Add Book
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-card placeholder-text-secondary transition-all duration-200"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border border-border text-foreground hover:border-accent/50 hover:bg-primary/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left border-b border-border text-text-secondary font-medium text-xs uppercase tracking-wider bg-primary/5">
                <th className="py-4 px-4">Cover</th>
                <th className="py-4 px-4">Title</th>
                <th className="py-4 px-4">Author</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-primary/5 transition-colors duration-200"
                >
                  <td className="py-4 px-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 font-semibold text-foreground">{book.title}</td>
                  <td className="py-4 px-4 text-text-secondary">{book.author}</td>
                  <td className="py-4 px-4 text-text-secondary">{book.category}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleAvailability(book.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                        book.availability === "Available"
                          ? "bg-success/10 text-success border border-success/30 hover:bg-success/20"
                          : "bg-warning/10 text-warning border border-warning/30 hover:bg-warning/20"
                      }`}
                    >
                      {book.availability}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(book)}
                        className="text-xs font-body font-semibold text-accent hover:text-accent/80 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="text-xs font-body font-semibold text-error hover:text-error/80 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 mx-4 animate-scale-in">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background placeholder-text-secondary transition-all duration-200"
                  placeholder="Book title"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background placeholder-text-secondary transition-all duration-200"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background transition-all duration-200"
                >
                  {categories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">
                  Availability Status
                </label>
                <select
                  value={form.availability}
                  onChange={(e) =>
                    setForm({ ...form, availability: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background transition-all duration-200"
                >
                  <option value="Available">Available</option>
                  <option value="Borrowed">Borrowed</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-accent text-primary font-body font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-border text-foreground font-body font-semibold rounded-lg hover:bg-primary/5 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
