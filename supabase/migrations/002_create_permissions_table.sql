-- Create permissions table for granular access control
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL, -- e.g., 'menu', 'orders', 'customers', 'staff', 'analytics'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  role TEXT NOT NULL CHECK (role IN ('Owner', 'Manager', 'Cashier', 'Staff', 'Marketing')),
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (role, permission_id)
);

-- Enable RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for permissions
CREATE POLICY "Service role can manage permissions"
  ON permissions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view permissions"
  ON permissions FOR SELECT
  USING (auth.role() = 'authenticated');

-- RLS Policies for role_permissions
CREATE POLICY "Service role can manage role_permissions"
  ON role_permissions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated users can view role_permissions"
  ON role_permissions FOR SELECT
  USING (auth.role() = 'authenticated');

-- Insert granular permissions
INSERT INTO permissions (name, description, category) VALUES
  -- Menu permissions
  ('can_view_menu', 'Can view menu items', 'menu'),
  ('can_manage_menu', 'Can add, edit, and delete menu items', 'menu'),
  
  -- Orders permissions
  ('can_view_orders', 'Can view orders', 'orders'),
  ('can_manage_orders', 'Can process and modify orders', 'orders'),
  ('can_refund_orders', 'Can process refunds', 'orders'),
  
  -- Customers permissions
  ('can_view_customers', 'Can view customer information', 'customers'),
  ('can_manage_customers', 'Can add and edit customers', 'customers'),
  ('can_delete_customers', 'Can delete customers', 'customers'),
  
  -- Memberships permissions
  ('can_view_memberships', 'Can view membership information', 'memberships'),
  ('can_manage_memberships', 'Can create and edit memberships', 'memberships'),
  
  -- Books permissions
  ('can_view_books', 'Can view books', 'books'),
  ('can_manage_books', 'Can add, edit, and delete books', 'books'),
  
  -- Events permissions
  ('can_view_events', 'Can view events', 'events'),
  ('can_manage_events', 'Can create and edit events', 'events'),
  ('can_delete_events', 'Can delete events', 'events'),
  
  -- Payments permissions
  ('can_view_payments', 'Can view payment information', 'payments'),
  ('can_manage_payments', 'Can process payments', 'payments'),
  ('can_refund_payments', 'Can process payment refunds', 'payments'),
  
  -- Analytics permissions
  ('can_view_analytics', 'Can view analytics and reports', 'analytics'),
  ('can_export_analytics', 'Can export analytics data', 'analytics'),
  
  -- Staff permissions
  ('can_view_staff', 'Can view staff information', 'staff'),
  ('can_manage_staff', 'Can add and edit staff', 'staff'),
  ('can_delete_staff', 'Can delete staff', 'staff'),
  ('can_manage_permissions', 'Can assign roles and permissions', 'staff'),
  
  -- Settings permissions
  ('can_view_settings', 'Can view settings', 'settings'),
  ('can_manage_settings', 'Can modify settings', 'settings')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles
-- Owner: All permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'Owner', id FROM permissions
ON CONFLICT DO NOTHING;

-- Manager: Most permissions except staff management and settings
INSERT INTO role_permissions (role, permission_id)
SELECT 'Manager', id FROM permissions 
WHERE name NOT IN ('can_manage_staff', 'can_delete_staff', 'can_manage_permissions', 'can_manage_settings')
ON CONFLICT DO NOTHING;

-- Cashier: Orders, payments, and basic customer access
INSERT INTO role_permissions (role, permission_id)
SELECT 'Cashier', id FROM permissions 
WHERE name IN (
  'can_view_menu',
  'can_view_orders',
  'can_manage_orders',
  'can_view_customers',
  'can_view_memberships',
  'can_view_payments',
  'can_manage_payments'
)
ON CONFLICT DO NOTHING;

-- Staff: View-only access to most areas
INSERT INTO role_permissions (role, permission_id)
SELECT 'Staff', id FROM permissions 
WHERE name IN (
  'can_view_menu',
  'can_view_orders',
  'can_view_customers',
  'can_view_memberships',
  'can_view_books',
  'can_view_events',
  'can_view_payments'
)
ON CONFLICT DO NOTHING;

-- Marketing: Events, books, and analytics
INSERT INTO role_permissions (role, permission_id)
SELECT 'Marketing', id FROM permissions 
WHERE name IN (
  'can_view_menu',
  'can_view_customers',
  'can_view_memberships',
  'can_view_books',
  'can_manage_books',
  'can_view_events',
  'can_manage_events',
  'can_delete_events',
  'can_view_analytics',
  'can_export_analytics'
)
ON CONFLICT DO NOTHING;
