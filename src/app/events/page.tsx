"use client";

import { useState } from "react";

const upcomingEvents = [
  {
    id: 1,
    title: "Poetry Reading Night",
    date: "June 28, 2026",
    time: "6:00 PM – 8:00 PM",
    capacity: 30,
    seatsLeft: 12,
    location: "Main Reading Room",
    description:
      "An evening of original poetry and spoken word. Come share your work or simply listen and enjoy the rhythm of words.",
    image: "https://picsum.photos/600/400?random=200",
  },
  {
    id: 2,
    title: "Book Club: The Midnight Library",
    date: "July 5, 2026",
    time: "4:00 PM – 6:00 PM",
    capacity: 20,
    seatsLeft: 5,
    location: "Discussion Corner",
    description:
      "Join us for a lively discussion of Matt Haig's bestseller. All perspectives welcome, whether you loved it or had mixed feelings.",
    image: "https://picsum.photos/600/400?random=201",
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    date: "July 12, 2026",
    time: "10:00 AM – 1:00 PM",
    capacity: 15,
    seatsLeft: 8,
    location: "Workshop Room",
    description:
      "A hands-on workshop for writers of all levels. Bring a notebook and your imagination. Exercises, prompts, and gentle feedback included.",
    image: "https://picsum.photos/600/400?random=202",
  },
  {
    id: 4,
    title: "Jazz & Coffee Evening",
    date: "July 19, 2026",
    time: "7:00 PM – 9:00 PM",
    capacity: 40,
    seatsLeft: 18,
    location: "Café Lounge",
    description:
      "Live jazz trio, candlelit tables, and our signature evening coffee menu. A perfect mid‑year wind‑down.",
    image: "https://picsum.photos/600/400?random=203",
  },
];

const pastEvents = [
  {
    id: 101,
    title: "Author Talk: Lelissa Demissie",
    date: "May 15, 2026",
    summary:
      "A fascinating conversation about storytelling, identity, and the writing life. Over 35 attendees joined us for an intimate evening of insight and inspiration.",
    attendance: 35,
    image: "https://picsum.photos/600/400?random=300",
  },
  {
    id: 102,
    title: "Silent Reading Hour",
    date: "April 28, 2026",
    summary:
      "A peaceful hour of silent reading with coffee and soft background music. A simple, beloved gathering that brought together 28 quiet companions.",
    attendance: 28,
    image: "https://picsum.photos/600/400?random=301",
  },
  {
    id: 103,
    title: "Board Game Night",
    date: "March 10, 2026",
    summary:
      "Chess, cards, and classic board games over coffee. A playful evening that filled the café with laughter and friendly competition.",
    attendance: 42,
    image: "https://picsum.photos/600/400?random=302",
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const handleRegister = (eventTitle: string) => {
    alert(
      `Registration for "${eventTitle}" will be available once accounts and the booking system are fully connected.`
    );
  };

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

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-beige-dark">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
                activeTab === "upcoming"
                  ? "bg-olive text-white"
                  : "text-dark hover:text-olive"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
                activeTab === "past"
                  ? "bg-olive text-white"
                  : "text-dark hover:text-olive"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        {activeTab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
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
                  <h3 className="text-xl font-serif font-semibold text-dark mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm font-sans text-dark/70 mb-4 flex-1">
                    {event.description}
                  </p>
                  <div className="space-y-1 text-sm font-sans text-dark/60 mb-4">
                    <p className="flex items-center gap-2">
                      <span className="text-olive">📅</span> {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-olive">⏰</span> {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-olive">📍</span> {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-olive">👥</span> {event.seatsLeft}{" "}
                      seats left of {event.capacity}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegister(event.title)}
                    className="w-full py-2 bg-gold text-dark font-sans font-semibold rounded-lg hover:bg-gold-dark transition-colors"
                  >
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Events */}
        {activeTab === "past" && (
          <div className="space-y-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-5"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-semibold text-dark mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm font-sans text-dark/50 mb-2">
                    {event.date}
                  </p>
                  <p className="text-sm font-sans text-dark/70 mb-3">
                    {event.summary}
                  </p>
                  <span className="text-xs font-sans font-medium bg-olive/10 text-olive px-3 py-1 rounded-full">
                    {event.attendance} attendees
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}