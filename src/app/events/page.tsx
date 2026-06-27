import { getEventsData } from "@/actions/events";
import EventsClient from "@/components/EventsClient";

export default async function EventsPage() {
  const { upcoming, past } = await getEventsData();

  return (
    <section className="bg-cream min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center mb-2">
          Community Events
        </h1>
        <p className="text-center text-dark/60 font-sans mb-10 max-w-2xl mx-auto">
          Workshops, clubs, readings, and gatherings — all designed to bring
          people together around books, ideas, and shared moments.
        </p>
        <EventsClient upcoming={upcoming} past={past} />
      </div>
    </section>
  );
}