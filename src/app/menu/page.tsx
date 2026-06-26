"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const allItems = [
  {
    id: 1,
    name: "Latte",
    category: "Coffee",
    description: "Smooth espresso with steamed milk",
    price: "85 ETB",
    image: "https://picsum.photos/400/400?random=10",
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Coffee",
    description: "Rich espresso with foamed milk",
    price: "90 ETB",
    image: "https://picsum.photos/400/400?random=11",
  },
  {
    id: 3,
    name: "Mocha",
    category: "Coffee",
    description: "Chocolate and espresso topped with cream",
    price: "95 ETB",
    image: "https://picsum.photos/400/400?random=12",
  },
  {
    id: 4,
    name: "Earl Grey Tea",
    category: "Tea",
    description: "Classic bergamot-infused black tea",
    price: "65 ETB",
    image: "https://picsum.photos/400/400?random=20",
  },
  {
    id: 5,
    name: "Green Tea",
    category: "Tea",
    description: "Light and refreshing Japanese sencha",
    price: "60 ETB",
    image: "https://picsum.photos/400/400?random=21",
  },
  {
    id: 6,
    name: "Mango Juice",
    category: "Juices",
    description: "Freshly squeezed mango delight",
    price: "70 ETB",
    image: "https://picsum.photos/400/400?random=30",
  },
  {
    id: 7,
    name: "Orange Juice",
    category: "Juices",
    description: "100% fresh oranges",
    price: "60 ETB",
    image: "https://picsum.photos/400/400?random=31",
  },
  {
    id: 8,
    name: "Scrambled Eggs",
    category: "Breakfast",
    description: "Fluffy eggs with toast",
    price: "120 ETB",
    image: "https://picsum.photos/400/400?random=40",
  },
  {
    id: 9,
    name: "Pancakes",
    category: "Breakfast",
    description: "Stack of buttermilk pancakes with syrup",
    price: "135 ETB",
    image: "https://picsum.photos/400/400?random=41",
  },
  {
    id: 10,
    name: "Club Sandwich",
    category: "Lunch",
    description: "Triple-decker with chicken and bacon",
    price: "150 ETB",
    image: "https://picsum.photos/400/400?random=50",
  },
  {
    id: 11,
    name: "Pasta Alfredo",
    category: "Lunch",
    description: "Creamy fettuccine with parmesan",
    price: "160 ETB",
    image: "https://picsum.photos/400/400?random=51",
  },
  {
    id: 12,
    name: "Croissant",
    category: "Bakery",
    description: "Buttery, flaky French pastry",
    price: "80 ETB",
    image: "https://picsum.photos/400/400?random=60",
  },
  {
    id: 13,
    name: "Blueberry Muffin",
    category: "Bakery",
    description: "Freshly baked with juicy blueberries",
    price: "85 ETB",
    image: "https://picsum.photos/400/400?random=61",
  },
  {
    id: 14,
    name: "Cheesecake",
    category: "Desserts",
    description: "New York style with berry topping",
    price: "120 ETB",
    image: "https://picsum.photos/400/400?random=70",
  },
  {
    id: 15,
    name: "Chocolate Cake",
    category: "Desserts",
    description: "Rich layered fudge cake",
    price: "130 ETB",
    image: "https://picsum.photos/400/400?random=71",
  },
];

const categories = [
  "All",
  "Coffee",
  "Tea",
  "Juices",
  "Breakfast",
  "Lunch",
  "Bakery",
  "Desserts",
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCart();

  const filtered = allItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center mb-10">
          Our Menu
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-5 py-3 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive focus:border-transparent text-dark font-sans shadow-sm"
          />
        </div>

        {/* Filters */}
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

        {/* Menu Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-dark/60 font-sans">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-serif font-semibold text-dark mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans text-dark/60 mb-3 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-gold font-sans font-bold text-lg">
                      {item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors"
                    >
                      Add to Cart
                    </button>
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