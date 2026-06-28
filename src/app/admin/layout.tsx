import AdminSidebar from "./AdminSidebar";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Temporarily skip auth check to test login
  // TODO: Re-enable auth check after fixing redirect loop
  const adminUser = user ? {
    user,
    staff: { id: "temp", user_id: user.id, role: "Owner" as const, branch: null, status: "active" as const, hire_date: null, created_at: "", updated_at: "" },
    permissions: [
      // Temporary: grant all permissions to test the UI
      { id: "1", name: "can_view_analytics", description: null, category: "analytics", created_at: "" },
      { id: "2", name: "can_view_orders", description: null, category: "orders", created_at: "" },
      { id: "3", name: "can_manage_orders", description: null, category: "orders", created_at: "" },
      { id: "4", name: "can_view_menu", description: null, category: "menu", created_at: "" },
      { id: "5", name: "can_manage_menu", description: null, category: "menu", created_at: "" },
      { id: "6", name: "can_view_customers", description: null, category: "customers", created_at: "" },
      { id: "7", name: "can_manage_customers", description: null, category: "customers", created_at: "" },
      { id: "8", name: "can_view_memberships", description: null, category: "memberships", created_at: "" },
      { id: "9", name: "can_manage_memberships", description: null, category: "memberships", created_at: "" },
      { id: "10", name: "can_view_books", description: null, category: "books", created_at: "" },
      { id: "11", name: "can_manage_books", description: null, category: "books", created_at: "" },
      { id: "12", name: "can_view_events", description: null, category: "events", created_at: "" },
      { id: "13", name: "can_manage_events", description: null, category: "events", created_at: "" },
      { id: "14", name: "can_view_payments", description: null, category: "payments", created_at: "" },
      { id: "15", name: "can_manage_payments", description: null, category: "payments", created_at: "" },
      { id: "16", name: "can_view_settings", description: null, category: "settings", created_at: "" },
      { id: "17", name: "can_manage_settings", description: null, category: "settings", created_at: "" },
      { id: "18", name: "can_manage_permissions", description: null, category: "admin", created_at: "" },
    ]
  } : null;

  // If no user, just render children without sidebar (for login page)
  if (!adminUser) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <AdminSidebar adminUser={adminUser} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}