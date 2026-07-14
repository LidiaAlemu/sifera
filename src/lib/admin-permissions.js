const ROUTE_PERMISSIONS = {
  "/admin": ["can_view_analytics"],
  "/admin/orders": ["can_view_orders"],
  "/admin/menu": ["can_view_menu"],
  "/admin/customers": ["can_view_customers"],
  "/admin/books": ["can_view_books"],
  "/admin/events": ["can_view_events"],
  "/admin/payments": ["can_view_payments"],
  "/admin/analytics": ["can_view_analytics"],
  "/admin/settings": ["can_view_settings"],
  // Admin-only routes
  "/admin/staff": ["can_manage_staff"],
  "/admin/users": ["can_manage_users"],
  "/admin/reports": ["can_view_reports"],
  "/admin/security": ["can_view_security"],
};

function getRequiredPermissions(pathname) {
  if (!pathname || pathname === "/admin/login") {
    return [];
  }

  const matchingRoute = Object.keys(ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(`${route}/`));

  return matchingRoute ? ROUTE_PERMISSIONS[matchingRoute] : [];
}

function canAccessAdminRoute({ pathname, role, permissions }) {
  if (pathname === "/admin/login") {
    return true;
  }

  if (!role || role === "Customer") {
    return false;
  }

  const requiredPermissions = getRequiredPermissions(pathname);
  if (requiredPermissions.length === 0) {
    return role === "Admin" || role === "Manager";
  }

  return requiredPermissions.some((permission) =>
    (permissions || []).includes(permission)
  );
}

module.exports = {
  ROUTE_PERMISSIONS,
  getRequiredPermissions,
  canAccessAdminRoute,
};
