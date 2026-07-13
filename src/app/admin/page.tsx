import AdminDashboardClient from "@/components/AdminDashboardClient";

import { getAdminOrders } from "@/actions/admin/orders";

export default async function AdminDashboardPage() {
  const orders = await getAdminOrders();
  return <AdminDashboardClient serverOrders={orders} />;
}