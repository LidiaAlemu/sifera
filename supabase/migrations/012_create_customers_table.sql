-- Separate table for website customers (not admin users)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Customers can view own record" ON customers;
DROP POLICY IF EXISTS "Staff can view customers" ON customers;

-- Customers can view their own record
CREATE POLICY "Customers can view own record"
  ON customers FOR SELECT
  USING (auth.uid() = user_id);

-- Customers can update their own record
CREATE POLICY "Customers can update own record"
  ON customers FOR UPDATE
  USING (auth.uid() = user_id);

-- Admin/Manager can view all customers
CREATE POLICY "Staff can view customers"
  ON customers FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id FROM staff s WHERE s.status = 'active'
    )
  );

-- Admin/Manager can manage all customers
CREATE POLICY "Staff can manage customers"
  ON customers FOR ALL
  USING (
    auth.uid() IN (
      SELECT s.user_id FROM staff s WHERE s.status = 'active'
    )
  );

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
