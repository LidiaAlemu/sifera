# Admin Authentication & Authorization Setup Guide

## Overview
This implementation uses a **permission-based authentication system** with database tables instead of auth metadata for scalability.

## Database Schema

### Tables Created

#### 1. `staff` Table
Stores staff member information separate from auth metadata:
- `id` - UUID primary key
- `user_id` - Reference to auth.users
- `role` - Owner, Manager, Cashier, Staff, Marketing
- `branch` - Branch assignment (optional)
- `status` - active, suspended, terminated
- `hire_date` - Date hired
- `created_at`, `updated_at` - Timestamps

#### 2. `permissions` Table
Granular permissions for fine-grained access control:
- `id` - UUID primary key
- `name` - Permission identifier (e.g., can_manage_menu)
- `description` - Human-readable description
- `category` - Group (menu, orders, customers, etc.)

#### 3. `role_permissions` Junction Table
Maps roles to permissions:
- `role` - Staff role
- `permission_id` - Reference to permissions table

## Permission Categories

### Menu
- `can_view_menu` - View menu items
- `can_manage_menu` - Add, edit, delete menu items

### Orders
- `can_view_orders` - View orders
- `can_manage_orders` - Process and modify orders
- `can_refund_orders` - Process refunds

### Customers
- `can_view_customers` - View customer information
- `can_manage_customers` - Add and edit customers
- `can_delete_customers` - Delete customers

### Memberships
- `can_view_memberships` - View membership information
- `can_manage_memberships` - Create and edit memberships

### Books
- `can_view_books` - View books
- `can_manage_books` - Add, edit, delete books

### Events
- `can_view_events` - View events
- `can_manage_events` - Create and edit events
- `can_delete_events` - Delete events

### Payments
- `can_view_payments` - View payment information
- `can_manage_payments` - Process payments
- `can_refund_payments` - Process payment refunds

### Analytics
- `can_view_analytics` - View analytics and reports
- `can_export_analytics` - Export analytics data

### Staff
- `can_view_staff` - View staff information
- `can_manage_staff` - Add and edit staff
- `can_delete_staff` - Delete staff
- `can_manage_permissions` - Assign roles and permissions

### Settings
- `can_view_settings` - View settings
- `can_manage_settings` - Modify settings

## Role Permissions Matrix

| Permission | Owner | Manager | Cashier | Staff | Marketing |
|------------|-------|---------|---------|-------|-----------|
| can_view_menu | ✅ | ✅ | ✅ | ✅ | ✅ |
| can_manage_menu | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_view_orders | ✅ | ✅ | ✅ | ✅ | ❌ |
| can_manage_orders | ✅ | ✅ | ✅ | ❌ | ❌ |
| can_refund_orders | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_view_customers | ✅ | ✅ | ✅ | ✅ | ✅ |
| can_manage_customers | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_delete_customers | ✅ | ❌ | ❌ | ❌ | ❌ |
| can_view_memberships | ✅ | ✅ | ✅ | ✅ | ✅ |
| can_manage_memberships | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_view_books | ✅ | ✅ | ❌ | ✅ | ✅ |
| can_manage_books | ✅ | ✅ | ❌ | ❌ | ✅ |
| can_view_events | ✅ | ✅ | ❌ | ✅ | ✅ |
| can_manage_events | ✅ | ✅ | ❌ | ❌ | ✅ |
| can_delete_events | ✅ | ❌ | ❌ | ❌ | ✅ |
| can_view_payments | ✅ | ✅ | ✅ | ✅ | ❌ |
| can_manage_payments | ✅ | ✅ | ✅ | ❌ | ❌ |
| can_refund_payments | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_view_analytics | ✅ | ✅ | ❌ | ❌ | ✅ |
| can_export_analytics | ✅ | ❌ | ❌ | ❌ | ✅ |
| can_view_staff | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_manage_staff | ✅ | ❌ | ❌ | ❌ | ❌ |
| can_delete_staff | ✅ | ❌ | ❌ | ❌ | ❌ |
| can_manage_permissions | ✅ | ❌ | ❌ | ❌ | ❌ |
| can_view_settings | ✅ | ✅ | ❌ | ❌ | ❌ |
| can_manage_settings | ✅ | ❌ | ❌ | ❌ | ❌ |

## Setup Instructions

### 1. Run Database Migrations
Execute the SQL migration files in Supabase SQL Editor in order:
```bash
supabase/migrations/001_create_staff_table.sql
supabase/migrations/002_create_permissions_table.sql
```

### 2. Create Initial Admin User
1. Go to Supabase Dashboard → Authentication → Users
2. Create a new user with email (e.g., admin@sifera.et)
3. Run the script `supabase/migrations/003_create_initial_admin.sql` in SQL Editor
4. Update the email in the script to match your admin user

### 3. Set Environment Variables
Ensure these are in your `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Test the Implementation
See Testing section below.

## Files Modified/Created

### Created Files
- `supabase/migrations/001_create_staff_table.sql` - Staff table schema
- `supabase/migrations/002_create_permissions_table.sql` - Permissions and role mapping
- `supabase/migrations/003_create_initial_admin.sql` - Initial admin setup script
- `src/lib/admin-auth.ts` - Admin auth utility functions
- `src/app/admin/AdminSidebar.tsx` - Client sidebar component

### Modified Files
- `src/app/admin/layout.tsx` - Converted to Server Component with auth check
- `src/app/admin/login/page.tsx` - Updated to use Supabase auth
- `src/middleware.ts` - Added admin route protection

## Auth Utility Functions

Located in `src/lib/admin-auth.ts`:

- `getStaffByUserId(userId)` - Get staff record for a user
- `getPermissionsByRole(role)` - Get all permissions for a role
- `getAdminUser()` - Get complete admin user info with permissions
- `hasPermission(permissionName)` - Check if user has specific permission
- `hasAnyPermission(permissionNames[])` - Check if user has any of the permissions
- `hasRole(role)` - Check if user has specific role
- `hasAnyRole(roles[])` - Check if user has any of the roles
- `hasRoleAtLeast(minRole)` - Check if user's role is at least specified level
- `canAccessRoute(pathname)` - Check if user can access a specific route

## Usage Examples

### Check Permission in Server Component
```typescript
import { hasPermission } from "@/lib/admin-auth";

export default async function MenuPage() {
  const canManage = await hasPermission("can_manage_menu");
  
  if (!canManage) {
    return <div>Access Denied</div>;
  }
  
  return <MenuManagement />;
}
```

### Check Permission in Client Component
```typescript
"use client";
import { useEffect, useState } from "react";
import { hasPermission } from "@/lib/admin-auth";

export default function MenuButton() {
  const [canManage, setCanManage] = useState(false);
  
  useEffect(() => {
    hasPermission("can_manage_menu").then(setCanManage);
  }, []);
  
  if (!canManage) return null;
  
  return <button>Add Menu Item</button>;
}
```

## Testing

### 1. Test Admin Login
1. Navigate to `/admin/login`
2. Enter admin credentials (created in Supabase Auth)
3. Should redirect to `/admin` on success
4. Should show error if user has no staff record

### 2. Test Route Protection
1. Try to access `/admin` while logged out → should redirect to login
2. Try to access `/admin` as non-admin user → should redirect to login
3. Try to access `/admin` as suspended staff → should redirect to login

### 3. Test Role-Based Access
Create test users with different roles and verify:
- Owner can access all admin routes
- Manager cannot manage staff or settings
- Cashier can only access orders, payments, and basic customer info
- Staff has view-only access
- Marketing can access events, books, and analytics

### 4. Test Permission Checks
Use the utility functions to verify permissions are correctly assigned based on roles.

## Security Features

1. **Server-Side Auth Checks**: All admin routes protected at middleware level
2. **Database-Based Roles**: Roles stored in database, not auth metadata
3. **Granular Permissions**: Fine-grained control over what each role can do
4. **Status Checks**: Suspended/terminated staff cannot access admin panel
5. **RLS Policies**: Row Level Security on all tables with permission-based access
6. **Session Management**: Automatic session refresh via middleware
7. **Server Action Authorization**: Every data-modifying action checks permissions
8. **Audit Logging**: All admin actions logged with IP, user agent, and changes
9. **Input Validation**: Comprehensive validation on all user inputs
10. **Error Handling**: Centralized error pages and handling

## Additional Security Files

### Migration Files (Run in Order)
- `001_create_staff_table.sql` - Staff table with RLS
- `002_create_permissions_table.sql` - Permissions and role mappings
- `003_create_initial_admin.sql` - Initial admin setup helper
- `004_create_audit_log.sql` - Audit logging system
- `005_enhance_rls_policies.sql` - RLS for all tables

### Utility Files
- `src/lib/admin-auth.ts` - Permission checking functions
- `src/lib/audit-log.ts` - Audit logging utilities
- `src/lib/validation.ts` - Input validation functions

### Error Handling
- `src/app/error.tsx` - Global error page
- `src/app/admin/error.tsx` - Admin-specific error page

## Server Action Security Pattern

```typescript
export async function someAction(data: any) {
  // 1. Check authorization
  const adminUser = await getAdminUser();
  if (!adminUser || !(await hasPermission("can_do_something"))) {
    throw new Error("Unauthorized");
  }

  // 2. Validate input
  if (!data || typeof data !== "object") {
    throw new Error("Invalid input");
  }

  // 3. Perform operation
  const result = await supabase.from("table").update(data).eq("id", id);

  // 4. Log audit trail
  await logAuditAction({
    user_id: adminUser.user.id,
    staff_id: adminUser.staff.id,
    action: "update",
    table_name: "table",
    record_id: id,
    old_values: previousData,
    new_values: data,
  });

  return result;
}
```

## Troubleshooting

### "You do not have admin access" error
- Verify user exists in `staff` table
- Check `status` is 'active'
- Ensure user ID matches between auth.users and staff tables

### Middleware redirect loop
- Check that `/admin/login` is excluded from auth checks
- Verify environment variables are set correctly

### Permissions not working
- Run migration 002 to ensure permissions are created
- Check role_permissions table has correct mappings
- Verify RLS policies allow authenticated users to read permissions
