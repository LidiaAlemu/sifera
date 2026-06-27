"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  available: boolean;
  image: string;
};

const initialItems: MenuItem[] = [
  { id: 1, name: "Latte", category: "Coffee", price: "85", description: "Smooth espresso with steamed milk", available: true, image: "https://picsum.photos/400/400?random=10" },
  { id: 2, name: "Cappuccino", category: "Coffee", price: "90", description: "Rich espresso with foamed milk", available: true, image: "https://picsum.photos/400/400?random=11" },
  { id: 3, name: "Mocha", category: "Coffee", price: "95", description: "Chocolate and espresso topped with cream", available: true, image: "https://picsum.photos/400/400?random=12" },
  { id: 4, name: "Earl Grey Tea", category: "Tea", price: "65", description: "Classic bergamot-infused black tea", available: true, image: "https://picsum.photos/400/400?random=20" },
  { id: 5, name: "Green Tea", category: "Tea", price: "60", description: "Light and refreshing Japanese sencha", available: false, image: "https://picsum.photos/400/400?random=21" },
  { id: 6, name: "Mango Juice", category: "Juices", price: "70", description: "Freshly squeezed mango delight", available: true, image: "https://picsum.photos/400/400?random=30" },
  { id: 7, name: "Orange Juice", category: "Juices", price: "60", description: "100% fresh oranges", available: true, image: "https://picsum.photos/400/400?random=31" },
  { id: 8, name: "Scrambled Eggs", category: "Breakfast", price: "120", description: "Fluffy eggs with toast", available: true, image: "https://picsum.photos/400/400?random=40" },
  { id: 9, name: "Pancakes", category: "Breakfast", price: "135", description: "Stack of buttermilk pancakes with syrup", available: true, image: "https://picsum.photos/400/400?random=41" },
  { id: 10, name: "Club Sandwich", category: "Lunch", price: "150", description: "Triple-decker with chicken and bacon", available: true, image: "https://picsum.photos/400/400?random=50" },
  { id: 11, name: "Pasta Alfredo", category: "Lunch", price: "160", description: "Creamy fettuccine with parmesan", available: false, image: "https://picsum.photos/400/400?random=51" },
  { id: 12, name: "Croissant", category: "Bakery", price: "80", description: "Buttery, flaky French pastry", available: true, image: "https://picsum.photos/400/400?random=60" },
  { id: 13, name: "Blueberry Muffin", category: "Bakery", price: "85", description: "Freshly baked with juicy blueberries", available: true, image: "https://picsum.photos/400/400?random=61" },
  { id: 14, name: "Cheesecake", category: "Desserts", price: "120", description: "New York style with berry topping", available: true, image: "https://picsum.photos/400/400?random=70" },
  { id: 15, name: "Chocolate Cake", category: "Desserts", price: "130", description: "Rich layered fudge cake", available: true, image: "https://picsum.photos/400/400?random=71" },
];

const categories = ["All", "Coffee", "Tea", "Juices", "Breakfast", "Lunch", "Bakery", "Desserts"];

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "Coffee",
    price: "",
    description: "",
    available: true,
    image: "",
  });

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingItem(null);
    setForm({ name: "", category: "Coffee", price: "", description: "", available: true, image: "" });
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      available: item.available,
      image: item.image,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? { ...i, ...form, price: form.price }
            : i
        )
      );
    } else {
      const newId = Math.max(...items.map((i) => i.id), 0) + 1;
      setItems((prev) => [
        ...prev,
        {
          id: newId,
          name: form.name,
          category: form.category,
          price: form.price,
          description: form.description,
          available: form.available,
          image: form.image || "https://picsum.photos/400/400?random=99",
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this item?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const toggleAvailability = (id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i))
    );
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-dark">Menu Management</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search items..."
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
                <th className="py-3 px-4 font-medium">Image</th>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Price (ETB)</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-beige-dark/50 hover:bg-cream/50 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-dark">{item.name}</td>
                  <td className="py-3 px-4 text-dark/70">{item.category}</td>
                  <td className="py-3 px-4 text-dark">{item.price} ETB</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        item.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-xs text-olive hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-serif font-bold text-dark mb-4">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Price (ETB)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-2 h-32 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="accent-olive"
                />
                <label className="text-sm font-sans text-dark">Available</label>
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