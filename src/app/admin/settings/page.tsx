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

  const [membershipSettings, setMembershipSettings] = useState({
    terms:
      "Membership is non-transferable. Benefits are valid for the duration of the selected plan.",
    hourlyFrom: "100 Birr",
    weeklyFrom: "1000 Birr",
    monthlyFrom: "2000 Birr",
  });

  const [eventDefaults, setEventDefaults] = useState({
    capacity: 25,
    registrationLimit: 2,
    rules: "Please arrive 10 minutes early. Cancellations allowed up to 24 hours before the event.",
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
        <h1 className="text-3xl font-serif font-bold text-dark">Settings</h1>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors"
        >
          {saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Café Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-semibold text-dark mb-4">
            Café Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Café Name
              </label>
              <input
                type="text"
                value={cafeDetails.name}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={cafeDetails.tagline}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, tagline: e.target.value })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Address
              </label>
              <input
                type="text"
                value={cafeDetails.address}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, address: e.target.value })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Phone
              </label>
              <input
                type="text"
                value={cafeDetails.phone}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Email
              </label>
              <input
                type="email"
                value={cafeDetails.email}
                onChange={(e) =>
                  setCafeDetails({ ...cafeDetails, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-semibold text-dark mb-4">
            Payment Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
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
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
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
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-sans font-medium text-dark mb-1">
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
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans resize-none"
              />
            </div>
          </div>
        </div>

        {/* Membership Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-semibold text-dark mb-4">
            Membership Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Hourly (from)
              </label>
              <input
                type="text"
                value={membershipSettings.hourlyFrom}
                onChange={(e) =>
                  setMembershipSettings({
                    ...membershipSettings,
                    hourlyFrom: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Weekly (from)
              </label>
              <input
                type="text"
                value={membershipSettings.weeklyFrom}
                onChange={(e) =>
                  setMembershipSettings({
                    ...membershipSettings,
                    weeklyFrom: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
                Monthly (from)
              </label>
              <input
                type="text"
                value={membershipSettings.monthlyFrom}
                onChange={(e) =>
                  setMembershipSettings({
                    ...membershipSettings,
                    monthlyFrom: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-sans font-medium text-dark mb-1">
              Membership Terms
            </label>
            <textarea
              value={membershipSettings.terms}
              onChange={(e) =>
                setMembershipSettings({
                  ...membershipSettings,
                  terms: e.target.value,
                })
              }
              rows={3}
              className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans resize-none"
            />
          </div>
        </div>

        {/* Event Defaults */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-serif font-semibold text-dark mb-4">
            Event Defaults
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
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
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-medium text-dark mb-1">
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
                className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-sans font-medium text-dark mb-1">
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
              className="w-full px-4 py-2 border border-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-olive text-dark font-sans resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}