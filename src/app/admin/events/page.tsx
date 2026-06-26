"use client";

import { useState } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  capacity: number;
  location: string;
  description: string;
  status: "Upcoming" | "Past" | "Cancelled";
};

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Poetry Reading Night",
    date: "2026-06-28",
    time: "6:00 PM – 8:00 PM",
    capacity: 30,
    location: "Main Reading Room",
    description: "An evening of original poetry and spoken word.",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Book Club: The Midnight Library",
    date: "2026-07-05",
    time: "4:00 PM – 6:00 PM",
    capacity: 20,
    location: "Discussion Corner",
    description: "Join us for a lively discussion of Matt Haig's bestseller.",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    date: "2026-07-12",
    time: "10:00 AM – 1:00 PM",
    capacity: 15,
    location: "Workshop Room",
    description: "A hands-on workshop for writers of all levels.",
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Jazz & Coffee Evening",
    date: "2026-07-19",
    time: "7:00 PM – 9:00 PM",
    capacity: 40,
    location: "Café Lounge",
    description: "Live jazz trio and signature evening coffee.",
    status: "Upcoming",
  },
  {
    id: 5,
    title: "Silent Reading Hour",
    date: "2026-04-28",
    time: "5:00 PM – 6:00 PM",
    capacity: 30,
    location: "Main Reading Room",
    description: "A peaceful hour of silent reading.",
    status: "Past",
  },
  {
    id: 6,
    title: "Board Game Night",
    date: "2026-03-10",
    time: "6:00 PM – 9:00 PM",
    capacity: 40,
    location: "Café Lounge",
    description: "Chess, cards, and classic board games.",
    status: "Past",
  },
];

const statusFilters = ["All", "Upcoming", "Past", "Cancelled"];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    capacity: 0,
    location: "",
    description: "",
    status: "Upcoming" as Event["status"],
  });

  const filtered = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeStatus === "All" || event.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({
      title: "",
      date: "",
      time: "",
      capacity: 0,
      location: "",
      description: "",
      status: "Upcoming",
    });
    setShowModal(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      capacity: event.capacity,
      location: event.location,
      description: event.description,
      status: event.status,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.date) return;

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id ? { ...e, ...form } : e
        )
      );
    } else {
      const newId = Math.max(...events.map((e) => e.id), 0) + 1;
      setEvents((prev) => [
        ...prev,
        {
          id: newId,
          ...form,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-dark">Events Management</h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors"
        >
          + Create Event
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
        />
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                activeStatus === status
                  ? "bg-olive text-white"
                  : "bg-white text-dark border border-beige-dark hover:bg-beige"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left border-b border-beige-dark text-dark/60 bg-beige/30">
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Time</th>
                <th className="py-3 px-4 font-medium">Capacity</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-beige-dark/50 hover:bg-cream/50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-dark">{event.title}</td>
                  <td className="py-3 px-4 text-dark/70">{event.date}</td>
                  <td className="py-3 px-4 text-dark/70">{event.time}</td>
                  <td className="py-3 px-4 text-dark">{event.capacity}</td>
                  <td className="py-3 px-4 text-dark/70">{event.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        event.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : event.status === "Past"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="text-xs text-olive hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 mx-4">
            <h2 className="text-2xl font-serif font-bold text-dark mb-4">
              {editingEvent ? "Edit Event" : "Create Event"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Time</label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="e.g. 6:00 PM – 8:00 PM"
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Capacity</label>
                <input
                  type="number"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as Event["status"] })
                  }
                  className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Past">Past</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-olive text-white font-sans rounded-lg hover:bg-olive-dark transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-beige-dark text-dark font-sans rounded-lg hover:bg-beige transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}