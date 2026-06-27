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
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-dark">Books Management</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors"
        >
          + Add Book
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-olive text-white"
                  : "bg-white text-dark border border-beige-dark hover:bg-beige"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left border-b border-beige-dark text-dark/60 bg-beige/30">
                <th className="py-3 px-4 font-medium">Cover</th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Author</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-beige-dark/50 hover:bg-cream/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-dark">{book.title}</td>
                  <td className="py-3 px-4 text-dark/70">{book.author}</td>
                  <td className="py-3 px-4 text-dark/70">{book.category}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleAvailability(book.id)}
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        book.availability === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {book.availability}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(book)}
                        className="text-xs text-olive hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="text-xs text-red-500 hover:underline"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 mx-4">
            <h2 className="text-2xl font-serif font-bold text-dark mb-4">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                >
                  {categories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">
                  Availability
                </label>
                <select
                  value={form.availability}
                  onChange={(e) =>
                    setForm({ ...form, availability: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                >
                  <option value="Available">Available</option>
                  <option value="Borrowed">Borrowed</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-beige-dark text-dark font-sans rounded-lg hover:bg-beige transition-colors"
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