-- Drop unused tables from the old schema.sql
-- These tables are not used by the current application

-- Drop child tables first (those with foreign keys)
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS customer_recommendations CASCADE;
DROP TABLE IF EXISTS menu_item_images CASCADE;
DROP TABLE IF EXISTS menu_item_tags CASCADE;
DROP TABLE IF EXISTS payment_receipts CASCADE;
DROP TABLE IF EXISTS order_status_history CASCADE;
DROP TABLE IF EXISTS book_views CASCADE;
DROP TABLE IF EXISTS event_checkins CASCADE;
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS event_gallery CASCADE;
DROP TABLE IF EXISTS payment_transactions CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;

-- Drop parent tables
DROP TABLE IF EXISTS customer_accounts CASCADE;
DROP TABLE IF EXISTS admin_accounts CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
