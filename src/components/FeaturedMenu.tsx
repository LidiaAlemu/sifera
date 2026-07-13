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
];

export default function FeaturedMenu() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm font-body text-accent font-semibold tracking-wider uppercase mb-3">
            Signature Selection
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 text-balance">
            Our Most Loved Coffees
          </h2>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Handpicked favorites crafted to perfection by our expert baristas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container with Overlay */}
              <div className="relative overflow-hidden bg-muted aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* "View Details" button on hover */}
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-6 py-2 bg-accent text-primary font-body font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                    View Details
                  </span>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-lg font-body font-bold text-accent whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-body font-medium rounded-lg transition-colors duration-200 border border-primary/20 hover:border-primary/40">
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/menu"
            className="inline-block px-8 py-3.5 bg-primary text-white font-body font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}
