import AdminSidebar from "./AdminSidebar";
import { getAdminUser } from "@/lib/admin-auth";
import { canAccessAdminRoute } from "@/lib/admin-permissions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname");

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const adminUser = await getAdminUser();

  if (!adminUser) {
    redirect("/admin/login");
  }

  const canAccess = canAccessAdminRoute({
    pathname,
    role: adminUser.staff.role,
    permissions: adminUser.permissions.map((permission) => permission.name),
  });

  if (!canAccess) {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <AdminSidebar adminUser={adminUser} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
