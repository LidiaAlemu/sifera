"use client";

import { useState } from "react";

type Event = {
  id: number;
  title: string;
  event_date: string;
  description: string;
  image_url: string;
  capacity: number;
  location: string;
  status: string;
};

export default function EventsClient({
  upcoming,
  past,
}: {
  upcoming: Event[];
  past: Event[];
}) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const handleRegister = (eventTitle: string) => {
    alert(
      `Registration for "${eventTitle}" will be available once accounts and the booking system are fully connected.`
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-10">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-card border border-border rounded-full p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
              activeTab === "upcoming"
                ? "bg-primary text-white shadow-md"
                : "text-foreground hover:text-accent"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
              activeTab === "past"
                ? "bg-primary text-white shadow-md"
                : "text-foreground hover:text-accent"
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      {activeTab === "upcoming" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcoming.map((event) => (
            <div
              key={event.id}
              className="group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden bg-muted aspect-video">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1.5 rounded-lg font-body font-semibold text-xs shadow-lg">
                  📅 {formatDate(event.event_date).split(" ").slice(0, 2).join(" ")}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-200">
                  {event.title}
                </h3>
                
                <p className="text-sm font-body text-text-secondary mb-5 flex-1">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 text-sm font-body text-text-secondary mb-5 py-4 border-y border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="text-accent">🕐</span>
                    <span>{formatTime(event.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent">👥</span>
                    <span>{event.capacity} seats available</span>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  onClick={() => handleRegister(event.title)}
                  className="w-full py-3 bg-primary text-white font-body font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-md"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Events */}
      {activeTab === "past" && (
        <div className="space-y-6">
          {past.map((event) => (
            <div
              key={event.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row p-6 gap-6"
            >
              {/* Image */}
              <div className="sm:w-48 flex-shrink-0">
                <div className="relative w-full aspect-video sm:aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                  {event.title}
                </h3>
                
                <p className="text-sm font-body text-text-secondary mb-2">
                  {formatDate(event.event_date)}
                </p>
                
                <p className="text-sm font-body text-text-secondary mb-4 flex-1">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-body font-semibold bg-primary/10 text-primary border border-primary/30 px-3 py-1 rounded-full">
                    📚 {event.capacity} capacity
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
