import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Poetry Reading Night",
    date: "June 28, 2026",
    time: "6:00 PM – 8:00 PM",
    seatsLeft: 12,
    image: "https://picsum.photos/400/300?random=30",
  },
  {
    id: 2,
    title: "Book Club: The Midnight Library",
    date: "July 5, 2026",
    time: "4:00 PM – 6:00 PM",
    seatsLeft: 5,
    image: "https://picsum.photos/400/300?random=31",
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    date: "July 12, 2026",
    time: "10:00 AM – 1:00 PM",
    seatsLeft: 8,
    image: "https://picsum.photos/400/300?random=32",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm font-body text-accent font-semibold tracking-wider uppercase mb-3">
            Community & Culture
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 text-balance">
            Upcoming Events
          </h2>
          <p className="text-lg font-body text-text-secondary max-w-2xl mx-auto">
            Join us for curated events featuring readings, workshops, and community gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-muted aspect-video">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-accent text-primary px-3 py-1.5 rounded-lg font-body font-semibold text-xs shadow-lg">
                  📅 {event.date.split(" ").slice(0, 2).join(" ")}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-200">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2.5 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-sm font-body text-text-secondary">
                    <span className="text-accent">🕐</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-body text-text-secondary">
                    <span className="text-accent">👥</span>
                    <span>{event.seatsLeft} seats remaining</span>
                  </div>
                </div>

                {/* Register Button */}
                <Link
                  href={`/events/${event.id}`}
                  className="w-full px-4 py-3 bg-primary text-white text-center font-body font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All Link */}
        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 text-primary font-body font-semibold hover:text-accent transition-colors duration-200 group"
          >
            View all events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
