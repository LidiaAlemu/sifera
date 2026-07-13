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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Menu Management</h1>
          <p className="text-text-secondary font-body mt-1">Add, edit, or remove menu items</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-2.5 bg-accent text-primary text-sm font-body font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 w-fit"
        >
          + Add Item
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search items by name..."
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

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left border-b border-border text-text-secondary font-medium text-xs uppercase tracking-wider bg-primary/5">
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (ETB)</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 font-semibold text-foreground">{item.name}</td>
                  <td className="py-4 px-4 text-text-secondary">{item.category}</td>
                  <td className="py-4 px-4 font-semibold text-foreground">{item.price} ETB</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                        item.available
                          ? "bg-success/10 text-success border border-success/30 hover:bg-success/20"
                          : "bg-error/10 text-error border border-error/30 hover:bg-error/20"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-xs font-body font-semibold text-accent hover:text-accent/80 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg p-6 mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background placeholder-text-secondary transition-all duration-200"
                  placeholder="e.g., Vanilla Latte"
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
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Price (ETB)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background placeholder-text-secondary transition-all duration-200"
                  placeholder="85"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background placeholder-text-secondary transition-all duration-200 resize-none"
                  placeholder="Describe the item..."
                />
              </div>
              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground font-body bg-background placeholder-text-secondary transition-all duration-200"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-3 h-32 w-full object-cover rounded-lg border border-border"
                  />
                )}
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="available-check"
                  checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-accent"
                />
                <label htmlFor="available-check" className="text-sm font-body text-foreground">Mark as available</label>
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
