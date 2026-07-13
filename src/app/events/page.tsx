import { getEventsData } from "@/actions/events";
import EventsClient from "@/components/EventsClient";

export default async function EventsPage() {
  const { upcoming, past } = await getEventsData();

  return (
    <section className="bg-background min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-body text-accent font-semibold tracking-wider uppercase mb-3">
            Community & Culture
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 text-balance">
            Community Events
          </h1>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Workshops, clubs, readings, and gatherings designed to bring people together around books, ideas, and shared moments.
          </p>
        </div>

        <EventsClient upcoming={upcoming} past={past} />
      </div>
    </section>
  );
}
