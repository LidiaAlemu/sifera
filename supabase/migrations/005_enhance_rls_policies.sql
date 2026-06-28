-- Enhanced RLS Policies for all tables
-- This ensures data security at the database level

-- Enable RLS on all tables if not already enabled
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS books ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS book_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS settings ENABLE ROW LEVEL SECURITY;

-- ORDERS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can create orders" ON orders;
DROP POLICY IF EXISTS "Staff can view orders" ON orders;
DROP POLICY IF EXISTS "Staff can manage orders" ON orders;
DROP POLICY IF EXISTS "Service role bypass" ON orders;

-- Public can create orders
CREATE POLICY "Public can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Staff with can_view_orders can read all orders
CREATE POLICY "Staff can view orders"
  ON orders FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_orders'
    )
  );

-- Staff with can_manage_orders can update orders
CREATE POLICY "Staff can manage orders"
  ON orders FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_orders'
    )
  );

-- ORDER_ITEMS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can create order items" ON order_items;
DROP POLICY IF EXISTS "Staff can view order items" ON order_items;
DROP POLICY IF EXISTS "Service role bypass" ON order_items;

-- Public can create order items (when creating order)
CREATE POLICY "Public can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Staff with can_view_orders can read order items
CREATE POLICY "Staff can view order items"
  ON order_items FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_orders'
    )
  );

-- MENU_ITEMS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view available menu items" ON menu_items;
DROP POLICY IF EXISTS "Staff can view all menu items" ON menu_items;
DROP POLICY IF EXISTS "Staff can insert menu items" ON menu_items;
DROP POLICY IF EXISTS "Staff can update menu items" ON menu_items;
DROP POLICY IF EXISTS "Staff can delete menu items" ON menu_items;
DROP POLICY IF EXISTS "Service role bypass" ON menu_items;

-- Public can view available menu items
CREATE POLICY "Public can view available menu items"
  ON menu_items FOR SELECT
  USING (available = true);

-- Staff with can_view_menu can view all menu items
CREATE POLICY "Staff can view all menu items"
  ON menu_items FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_menu'
    )
  );

-- Staff with can_manage_menu can insert menu items
CREATE POLICY "Staff can insert menu items"
  ON menu_items FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_menu'
    )
  );

-- Staff with can_manage_menu can update menu items
CREATE POLICY "Staff can update menu items"
  ON menu_items FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_menu'
    )
  );

-- Staff with can_manage_menu can delete menu items
CREATE POLICY "Staff can delete menu items"
  ON menu_items FOR DELETE
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_menu'
    )
  );

-- MENU_CATEGORIES TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active categories" ON menu_categories;
DROP POLICY IF EXISTS "Staff can view all categories" ON menu_categories;
DROP POLICY IF EXISTS "Staff can manage categories" ON menu_categories;
DROP POLICY IF EXISTS "Service role bypass" ON menu_categories;

-- Public can view active categories
CREATE POLICY "Public can view active categories"
  ON menu_categories FOR SELECT
  USING (active = true);

-- Staff with can_view_menu can view all categories
CREATE POLICY "Staff can view all categories"
  ON menu_categories FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_menu'
    )
  );

-- Staff with can_manage_menu can manage categories
CREATE POLICY "Staff can manage categories"
  ON menu_categories FOR ALL
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_menu'
    )
  );

-- BOOKS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view books" ON books;
DROP POLICY IF EXISTS "Staff can view all books" ON books;
DROP POLICY IF EXISTS "Staff can manage books" ON books;
DROP POLICY IF EXISTS "Service role bypass" ON books;

-- Public can view books
CREATE POLICY "Public can view books"
  ON books FOR SELECT
  USING (true);

-- Staff with can_view_books can view all books
CREATE POLICY "Staff can view all books"
  ON books FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_books'
    )
  );

-- Staff with can_manage_books can manage books
CREATE POLICY "Staff can manage books"
  ON books FOR ALL
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_books'
    )
  );

-- BOOK_CATEGORIES TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view book categories" ON book_categories;
DROP POLICY IF EXISTS "Staff can view book categories" ON book_categories;
DROP POLICY IF EXISTS "Service role bypass" ON book_categories;

-- Public can view book categories
CREATE POLICY "Public can view book categories"
  ON book_categories FOR SELECT
  USING (true);

-- Staff with can_view_books can view categories
CREATE POLICY "Staff can view book categories"
  ON book_categories FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_books'
    )
  );

-- EVENTS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view events" ON events;
DROP POLICY IF EXISTS "Staff can view all events" ON events;
DROP POLICY IF EXISTS "Staff can insert events" ON events;
DROP POLICY IF EXISTS "Staff can update events" ON events;
DROP POLICY IF EXISTS "Staff can delete events" ON events;
DROP POLICY IF EXISTS "Service role bypass" ON events;

-- Public can view events
CREATE POLICY "Public can view events"
  ON events FOR SELECT
  USING (true);

-- Staff with can_view_events can view all events
CREATE POLICY "Staff can view all events"
  ON events FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_events'
    )
  );

-- Staff with can_manage_events can insert events
CREATE POLICY "Staff can insert events"
  ON events FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_events'
    )
  );

-- Staff with can_manage_events can update events
CREATE POLICY "Staff can update events"
  ON events FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_events'
    )
  );

-- Staff with can_delete_events can delete events
CREATE POLICY "Staff can delete events"
  ON events FOR DELETE
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_delete_events'
    )
  );

-- MEMBERSHIP_PLANS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view membership plans" ON membership_plans;
DROP POLICY IF EXISTS "Staff can view membership plans" ON membership_plans;
DROP POLICY IF EXISTS "Staff can manage membership plans" ON membership_plans;
DROP POLICY IF EXISTS "Service role bypass" ON membership_plans;

-- Public can view membership plans
CREATE POLICY "Public can view membership plans"
  ON membership_plans FOR SELECT
  USING (true);

-- Staff with can_view_memberships can view all plans
CREATE POLICY "Staff can view membership plans"
  ON membership_plans FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_memberships'
    )
  );

-- Staff with can_manage_memberships can manage plans
CREATE POLICY "Staff can manage membership plans"
  ON membership_plans FOR ALL
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_memberships'
    )
  );

-- MEMBERSHIPS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Staff can view memberships" ON memberships;
DROP POLICY IF EXISTS "Staff can manage memberships" ON memberships;
DROP POLICY IF EXISTS "Service role bypass" ON memberships;

-- Staff with can_view_memberships can view memberships
CREATE POLICY "Staff can view memberships"
  ON memberships FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_memberships'
    )
  );

-- Staff with can_manage_memberships can manage memberships
CREATE POLICY "Staff can manage memberships"
  ON memberships FOR ALL
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_memberships'
    )
  );

-- SETTINGS TABLE POLICIES
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view payment settings" ON settings;
DROP POLICY IF EXISTS "Staff can view all settings" ON settings;
DROP POLICY IF EXISTS "Staff can manage settings" ON settings;
DROP POLICY IF EXISTS "Service role bypass" ON settings;

-- Public can view payment settings
CREATE POLICY "Public can view payment settings"
  ON settings FOR SELECT
  USING (key IN ('telebirr_number', 'cbe_number', 'payment_instructions'));

-- Staff with can_view_settings can view all settings
CREATE POLICY "Staff can view all settings"
  ON settings FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_view_settings'
    )
  );

-- Staff with can_manage_settings can manage settings
CREATE POLICY "Staff can manage settings"
  ON settings FOR ALL
  USING (
    auth.uid() IN (
      SELECT s.user_id 
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_settings'
    )
  );

-- Service role bypass for all operations
DROP POLICY IF EXISTS "Service role bypass" ON orders;
DROP POLICY IF EXISTS "Service role bypass" ON order_items;
DROP POLICY IF EXISTS "Service role bypass" ON menu_items;
DROP POLICY IF EXISTS "Service role bypass" ON menu_categories;
DROP POLICY IF EXISTS "Service role bypass" ON books;
DROP POLICY IF EXISTS "Service role bypass" ON book_categories;
DROP POLICY IF EXISTS "Service role bypass" ON events;
DROP POLICY IF EXISTS "Service role bypass" ON membership_plans;
DROP POLICY IF EXISTS "Service role bypass" ON memberships;
DROP POLICY IF EXISTS "Service role bypass" ON settings;

CREATE POLICY "Service role bypass"
  ON orders FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON order_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON menu_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON menu_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON books FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON book_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON membership_plans FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON memberships FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role bypass"
  ON settings FOR ALL USING (auth.role() = 'service_role');
