import { getMenuData } from "@/actions/menu";
import MenuClient from "@/components/MenuClient";

export default async function MenuPage() {
  const { categories, items } = await getMenuData();

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center mb-10">
          Our Menu
        </h1>
        <MenuClient categories={categories} items={items} />
      </div>
    </section>
  );
}