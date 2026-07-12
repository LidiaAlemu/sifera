import AdminSidebar from "./AdminSidebar";
import { getAdminUser } from "@/lib/admin-auth";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getAdminUser();

  // If no admin user, just render children without sidebar (for login page)
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