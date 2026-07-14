"use client";

import { useState } from "react";

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const [cafeDetails, setCafeDetails] = useState({
    name: "Sifera",
    tagline: "A quiet place in a noisy world.",
    address: "Addis Ababa, Ethiopia",
    phone: "+251 900 000 000",
    email: "hello@sifera.et",
  });

  const [paymentSettings, setPaymentSettings] = useState({
    telebirrNumber: "+251 9XX XXX XXX",
    cbeNumber: "+251 9XX XXX XXX",
    instructions: "Upload your payment receipt for verification.",
  });

  const [eventDefaults, setEventDefaults] = useState({
    capacity: 25,
    registrationLimit: 2,
    rules: "Please arrive 10 minutes early. Cancellations allowed up to 24 hours before the event.",
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: "07:00", close: "20:00", closed: false },
    tuesday: { open: "07:00", close: "20:00", closed: false },
    wednesday: { open: "07:00", close: "20:00", closed: false },
    thursday: { open: "07:00", close: "20:00", closed: false },
    friday: { open: "07:00", close: "21:00", closed: false },
    saturday: { open: "08:00", close: "22:00", closed: false },
    sunday: { open: "08:00", close: "20:00", closed: false },
  });

  const [websiteSettings, setWebsiteSettings] = useState({
    maintenanceMode: false,
    allowRegistrations: true,
    maxBorrowingDays: 14,
    maxBooksPerUser: 3,
    lateFeePerDay: 5,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Will be saved to Supabase later
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
          <p className="text-text-secondary font-body mt-1">Manage café and system settings</p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-accent text-white text-sm font-body rounded-lg hover:bg-accent/90 transition-colors"
        >
          {saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Café Details */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            Café Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Café Name
              </label>
              <input
                type="text"
                value={cafeDetails.name}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={cafeDetails.tagline}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, tagline: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Address
              </label>
              <input
                type="text"
                value={cafeDetails.address}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, address: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="text"
                value={cafeDetails.phone}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={cafeDetails.email}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
          </div>
        </div>

        {/* Business Hours (Admin Only) */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Business Hours
            </h2>
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-body rounded-full">Admin Only</span>
          </div>
          <div className="space-y-3">
            {Object.entries(businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-32 capitalize text-sm font-body text-foreground font-medium">
                  {day}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!hours.closed}
                    onChange={(e) =>
                      setBusinessHours({
                        ...businessHours,
                        [day]: { ...hours, closed: !e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm font-body text-text-secondary">Open</span>
                </div>
                {!hours.closed && (
                  <>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, open: e.target.value },
                        })
                      }
                      className="px-3 py-2 border border-border rounded-lg text-sm font-body text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-text-secondary">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, close: e.target.value },
                        })
                      }
                      className="px-3 py-2 border border-border rounded-lg text-sm font-body text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </>
                )}
                {hours.closed && (
                  <span className="text-sm font-body text-error">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            Payment Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Telebirr Number
              </label>
              <input
                type="text"
                value={paymentSettings.telebirrNumber}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    telebirrNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                CBE Mobile Number
              </label>
              <input
                type="text"
                value={paymentSettings.cbeNumber}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    cbeNumber: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Payment Instructions
              </label>
              <textarea
                value={paymentSettings.instructions}
                onChange={(e) =>
                  setPaymentSettings({
                    ...paymentSettings,
                    instructions: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body resize-none"
              />
            </div>
          </div>
        </div>

        {/* Website Settings (Admin Only) */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Website Settings
            </h2>
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-body rounded-full">Admin Only</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-body font-medium text-foreground">Maintenance Mode</p>
                <p className="text-xs font-body text-text-secondary">Disable public access to the website</p>
              </div>
              <div className="w-12 h-6 bg-border rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-body font-medium text-foreground">Allow User Registrations</p>
                <p className="text-xs font-body text-text-secondary">Enable new user sign-ups</p>
              </div>
              <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Max Borrowing Days
                </label>
                <input
                  type="number"
                  value={websiteSettings.maxBorrowingDays}
                  onChange={(e) =>
                    setWebsiteSettings({
                      ...websiteSettings,
                      maxBorrowingDays: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Max Books Per User
                </label>
                <input
                  type="number"
                  value={websiteSettings.maxBooksPerUser}
                  onChange={(e) =>
                    setWebsiteSettings({
                      ...websiteSettings,
                      maxBooksPerUser: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Late Fee (ETB/day)
                </label>
                <input
                  type="number"
                  value={websiteSettings.lateFeePerDay}
                  onChange={(e) =>
                    setWebsiteSettings({
                      ...websiteSettings,
                      lateFeePerDay: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Defaults */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            Event Defaults
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Default Capacity
              </label>
              <input
                type="number"
                value={eventDefaults.capacity}
                onChange={(e) =>
                  setEventDefaults({
                    ...eventDefaults,
                    capacity: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">
                Registration Limit Per Person
              </label>
              <input
                type="number"
                value={eventDefaults.registrationLimit}
                onChange={(e) =>
                  setEventDefaults({
                    ...eventDefaults,
                    registrationLimit: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1">
              Registration Rules
            </label>
            <textarea
              value={eventDefaults.rules}
              onChange={(e) =>
                setEventDefaults({
                  ...eventDefaults,
                  rules: e.target.value,
                })
              }
              rows={2}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground font-body resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}