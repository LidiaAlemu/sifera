"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  slug: string;
};

type MenuCategory = {
  id: number;
  name: string;
  slug: string;
};

export default function MenuClient({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCart();

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.slug === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: `${item.price} ETB`,
      image: item.image,
    });
  };

  return (
    <div className="space-y-10">
      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search menu items..."
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
          All Items
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.slug
                ? "bg-primary text-white shadow-md"
                : "bg-card border border-border text-foreground hover:border-accent/50 hover:bg-primary/5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-secondary font-body text-lg">No items found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-muted aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                  {item.name}
                </h3>
                <p className="text-sm font-body text-text-secondary mb-4 flex-1 line-clamp-2">
                  {item.description}
                </p>

                {/* Price & Button */}
                <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-border/50">
                  <span className="text-2xl font-heading font-bold text-accent">
                    {item.price} ETB
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2.5 bg-primary text-white text-sm font-body font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 transform"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
