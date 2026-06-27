"use client";

import { useEffect, useState } from "react";
import { getMembershipData, updatePlan, addPlan } from "@/actions/admin/membership";

export const dynamic = 'force-dynamic';

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  discount_percentage: number;
  priority_event_access: boolean;
  free_drinks: number;
  active: boolean;
};

type Membership = {
  id: string;
  customer_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: string;
  // We'll add customer name after fetching
  customer_name?: string;
};

export default function AdminMembersPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For editing a plan
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: 0,
    duration_days: 0,
    discount_percentage: 0,
    priority_event_access: false,
    free_drinks: 0,
    active: true,
  });

  // For adding a new plan
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    price: 0,
    duration_days: 0,
    discount_percentage: 0,
    priority_event_access: false,
    free_drinks: 0,
    active: true,
  });

  const fetchData = async () => {
    try {
      const data = await getMembershipData();
      setPlans(data.plans);
      // For memberships, we don't have customer names yet; we'll add placeholder names
      const membershipsWithNames = data.memberships.map((m: any) => ({
        ...m,
        customer_name: "Member " + m.customer_id?.slice(0, 4) || "N/A",
      }));
      setMemberships(membershipsWithNames);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setEditForm({
      name: plan.name,
      description: plan.description || "",
      price: plan.price,
      duration_days: plan.duration_days,
      discount_percentage: plan.discount_percentage || 0,
      priority_event_access: plan.priority_event_access || false,
      free_drinks: plan.free_drinks || 0,
      active: plan.active,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingPlan) return;
    try {
      await updatePlan(editingPlan.id, editForm);
      setPlans((prev) =>
        prev.map((p) => (p.id === editingPlan.id ? { ...p, ...editForm } : p))
      );
      setEditingPlan(null);
    } catch (err: any) {
      alert("Failed to update plan: " + err.message);
    }
  };

  const handleAddPlan = async () => {
    if (!addForm.name || addForm.price <= 0) return;
    try {
      await addPlan(addForm);
      setShowAddForm(false);
      setAddForm({ name: "", description: "", price: 0, duration_days: 0, discount_percentage: 0, priority_event_access: false, free_drinks: 0, active: true });
      // Refetch to get the new plan (or we could manually add it)
      fetchData();
    } catch (err: any) {
      alert("Failed to add plan: " + err.message);
    }
  };

  if (loading) return <p className="p-6 text-dark/60">Loading memberships…</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-dark mb-8">Membership Management</h1>

      {/* PLANS SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif font-semibold text-dark">Membership Plans</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-olive text-white text-sm font-sans rounded-lg hover:bg-olive-dark transition-colors"
          >
            + New Plan
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 border border-beige-dark rounded-lg">
            <h3 className="text-lg font-serif font-semibold mb-3">Add New Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Name" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} className="border rounded px-3 py-1 text-sm" />
              <input placeholder="Description" value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} className="border rounded px-3 py-1 text-sm" />
              <input type="number" placeholder="Price" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: +e.target.value })} className="border rounded px-3 py-1 text-sm" />
              <input type="number" placeholder="Duration (days)" value={addForm.duration_days} onChange={(e) => setAddForm({ ...addForm, duration_days: +e.target.value })} className="border rounded px-3 py-1 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={addForm.priority_event_access} onChange={(e) => setAddForm({ ...addForm, priority_event_access: e.target.checked })} /> Priority Event Access</label>
              <input type="number" placeholder="Free drinks" value={addForm.free_drinks} onChange={(e) => setAddForm({ ...addForm, free_drinks: +e.target.value })} className="border rounded px-3 py-1 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={addForm.active} onChange={(e) => setAddForm({ ...addForm, active: e.target.checked })} /> Active</label>
            </div>
            <button onClick={handleAddPlan} className="mt-3 px-4 py-2 bg-gold text-dark rounded-lg text-sm">Save Plan</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="text-left border-b border-beige-dark text-dark/60">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Price (Birr)</th>
                <th className="pb-2 font-medium">Duration (days)</th>
                <th className="pb-2 font-medium">Perks</th>
                <th className="pb-2 font-medium">Active</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-beige-dark/50">
                  <td className="py-3 font-medium">{plan.name}</td>
                  <td className="py-3">{plan.price}</td>
                  <td className="py-3">{plan.duration_days}</td>
                  <td className="py-3 text-xs">
                    {plan.priority_event_access && "⭐ Priority, "}
                    {plan.free_drinks > 0 && `🍹 ${plan.free_drinks} free`}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${plan.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {plan.active ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-3">
                    <button onClick={() => handleEditPlan(plan)} className="text-xs text-olive hover:underline mr-2">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Plan Modal */}
        {editingPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-4">
              <h2 className="text-xl font-serif font-bold text-dark mb-4">Edit {editingPlan.name}</h2>
              <div className="space-y-3">
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" className="w-full border rounded px-3 py-1 text-sm" />
                <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} placeholder="Description" className="w-full border rounded px-3 py-1 text-sm" />
                <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: +e.target.value })} placeholder="Price" className="w-full border rounded px-3 py-1 text-sm" />
                <input type="number" value={editForm.duration_days} onChange={(e) => setEditForm({ ...editForm, duration_days: +e.target.value })} placeholder="Duration (days)" className="w-full border rounded px-3 py-1 text-sm" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editForm.priority_event_access} onChange={(e) => setEditForm({ ...editForm, priority_event_access: e.target.checked })} /> Priority Event Access</label>
                <input type="number" value={editForm.free_drinks} onChange={(e) => setEditForm({ ...editForm, free_drinks: +e.target.value })} placeholder="Free drinks" className="w-full border rounded px-3 py-1 text-sm" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editForm.active} onChange={(e) => setEditForm({ ...editForm, active: e.target.checked })} /> Active</label>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleSaveEdit} className="flex-1 py-2 bg-olive text-white rounded-lg text-sm">Save</button>
                <button onClick={() => setEditingPlan(null)} className="flex-1 py-2 border rounded-lg text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACTIVE MEMBERSHIPS SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-serif font-semibold text-dark mb-4">Active Memberships</h2>
        {memberships.length === 0 ? (
          <p className="text-sm text-dark/60">No active memberships.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left border-b border-beige-dark text-dark/60">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Plan</th>
                  <th className="pb-2 font-medium">Start Date</th>
                  <th className="pb-2 font-medium">End Date</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((m) => (
                  <tr key={m.id} className="border-b border-beige-dark/50">
                    <td className="py-3">{m.customer_name}</td>
                    <td className="py-3">{plans.find(p => p.id === m.plan_id)?.name || "Unknown"}</td>
                    <td className="py-3">{new Date(m.start_date).toLocaleDateString()}</td>
                    <td className="py-3">{new Date(m.end_date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}