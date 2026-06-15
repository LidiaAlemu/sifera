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
    <section className="bg-olive/5 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-dark mb-12">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-serif font-semibold text-dark mb-3">
                  {event.title}
                </h3>
                <div className="space-y-1 mb-4 flex-1">
                  <p className="text-sm font-sans text-dark/70 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </p>
                  <p className="text-sm font-sans text-dark/70 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </p>
                  <p className="text-sm font-sans text-dark/70 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.seatsLeft} seats remaining
                  </p>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-gold text-dark font-sans font-semibold rounded-lg hover:bg-gold-dark transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-olive font-sans font-medium hover:text-olive-dark transition-colors"
          >
            View all events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}