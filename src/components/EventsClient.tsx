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
    <>
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
          {upcoming.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <img
                src={event.image_url}
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
                    <span>📅</span> {formatDate(event.event_date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>⏰</span> {formatTime(event.event_date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📍</span> {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>👥</span> {event.capacity} seats total
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
          {past.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-5"
            >
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full sm:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-serif font-semibold text-dark mb-1">
                  {event.title}
                </h3>
                <p className="text-sm font-sans text-dark/50 mb-2">
                  {formatDate(event.event_date)}
                </p>
                <p className="text-sm font-sans text-dark/70 mb-3">
                  {event.description}
                </p>
                <span className="text-xs font-sans font-medium bg-olive/10 text-olive px-3 py-1 rounded-full">
                  {event.capacity} capacity
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}