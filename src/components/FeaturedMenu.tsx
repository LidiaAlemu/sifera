const featuredItems = [
  {
    id: 1,
    name: "Latte",
    price: "85 ETB",
    image: "https://picsum.photos/400/400?random=10",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: "90 ETB",
    image: "https://picsum.photos/400/400?random=11",
  },
  {
    id: 3,
    name: "Mocha",
    price: "95 ETB",
    image: "https://picsum.photos/400/400?random=12",
  },
  {
    id: 4,
    name: "Cheesecake",
    price: "120 ETB",
    image: "https://picsum.photos/400/400?random=13",
  },
  {
    id: 5,
    name: "Club Sandwich",
    price: "150 ETB",
    image: "https://picsum.photos/400/400?random=14",
  },
  {
    id: 6,
    name: "Chocolate Cake",
    price: "130 ETB",
    image: "https://picsum.photos/400/400?random=15",
  },
];

export default function FeaturedMenu() {
  return (
    <section className="bg-olive/5 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-dark mb-12">
          Featured Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-serif font-semibold text-dark">
                  {item.name}
                </h3>
                <span className="text-gold font-sans font-bold text-lg">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}