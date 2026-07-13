import { getMenuData } from "@/actions/menu";
import MenuClient from "@/components/MenuClient";

export default async function MenuPage() {
  const { categories, items } = await getMenuData();

  return (
    <section className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-body text-accent font-semibold tracking-wider uppercase mb-3">
            Crafted Selections
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 text-balance">
            Explore Our Menu
          </h1>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Discover our carefully crafted coffee beverages, pastries, and light fare, prepared with premium ingredients.
          </p>
        </div>

        <MenuClient categories={categories} items={items} />
      </div>
    </section>
  );
}
