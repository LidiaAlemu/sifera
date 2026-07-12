-- Recreate payment receipts for digital order verification.
-- Migration 006 removed the old table; the current application uploads receipts.

CREATE TABLE IF NOT EXISTS payment_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  receipt_url TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image/jpeg', 'image/png', 'image/webp', 'application/pdf')),
  file_size INTEGER NOT NULL CHECK (file_size > 0 AND file_size <= 5242880),
  payment_reference TEXT,
  verification_status TEXT NOT NULL DEFAULT 'Pending'
    CHECK (verification_status IN ('Pending', 'Verified', 'Rejected')),
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '10 days') NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payment_receipts_order_id ON payment_receipts(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_receipts_status ON payment_receipts(verification_status);
CREATE INDEX IF NOT EXISTS idx_payment_receipts_expires_at ON payment_receipts(expires_at);

ALTER TABLE payment_receipts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can create payment receipts" ON payment_receipts;
DROP POLICY IF EXISTS "Staff can view payment receipts" ON payment_receipts;
DROP POLICY IF EXISTS "Staff can manage payment receipts" ON payment_receipts;
DROP POLICY IF EXISTS "Service role bypass" ON payment_receipts;

CREATE POLICY "Public can create payment receipts"
  ON payment_receipts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM orders o
      WHERE o.id = order_id
      AND o.payment_method <> 'Cash'
    )
  );

CREATE POLICY "Staff can view payment receipts"
  ON payment_receipts FOR SELECT
  USING (
    auth.uid() IN (
      SELECT s.user_id
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name IN ('can_view_payments', 'can_view_orders')
    )
  );

CREATE POLICY "Staff can manage payment receipts"
  ON payment_receipts FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT s.user_id
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name = 'can_manage_payments'
    )
  );

CREATE POLICY "Service role bypass"
  ON payment_receipts FOR ALL USING (auth.role() = 'service_role');

DROP TRIGGER IF EXISTS update_payment_receipts_updated_at ON payment_receipts;
CREATE TRIGGER update_payment_receipts_updated_at
  BEFORE UPDATE ON payment_receipts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

INSERT INTO storage.buckets (id, name, public)
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can upload receipts" ON storage.objects;
DROP POLICY IF EXISTS "Staff can read receipts" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage receipts" ON storage.objects;

CREATE POLICY "Public can upload receipts"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'receipts'
    AND auth.role() IN ('anon', 'authenticated')
  );

CREATE POLICY "Staff can read receipts"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'receipts'
    AND auth.uid() IN (
      SELECT s.user_id
      FROM staff s
      JOIN role_permissions rp ON s.role = rp.role
      JOIN permissions p ON rp.permission_id = p.id
      WHERE s.user_id = auth.uid()
      AND s.status = 'active'
      AND p.name IN ('can_view_payments', 'can_view_orders')
    )
  );

CREATE POLICY "Service role can manage receipts"
  ON storage.objects FOR ALL
  USING (bucket_id = 'receipts' AND auth.role() = 'service_role');
