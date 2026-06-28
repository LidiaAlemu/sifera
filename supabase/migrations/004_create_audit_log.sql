-- Drop existing audit_logs table if it exists (to ensure clean schema)
DROP TABLE IF EXISTS audit_logs CASCADE;

-- Create audit log table for tracking admin actions
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- e.g., 'create', 'update', 'delete'
  table_name TEXT NOT NULL, -- e.g., 'orders', 'menu_items', 'membership_plans'
  record_id UUID, -- ID of the affected record
  old_values JSONB, -- Previous values (for updates/deletes)
  new_values JSONB, -- New values (for creates/updates)
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_staff_id ON audit_logs(staff_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Service role can manage all audit logs
CREATE POLICY "Service role can manage audit logs"
  ON audit_logs FOR ALL
  USING (auth.role() = 'service_role');

-- Application-level security will handle audit log access
-- Server actions will check permissions before allowing access
-- This provides more granular control than RLS for audit logs
CREATE POLICY "No direct access via RLS"
  ON audit_logs FOR ALL
  USING (false);

-- Function to automatically log actions (can be called from app)
CREATE OR REPLACE FUNCTION log_audit_action(
  p_user_id UUID,
  p_staff_id UUID,
  p_action TEXT,
  p_table_name TEXT,
  p_record_id UUID,
  p_old_values JSONB,
  p_new_values JSONB,
  p_ip_address TEXT,
  p_user_agent TEXT
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO audit_logs (
    user_id,
    staff_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address,
    user_agent
  ) VALUES (
    p_user_id,
    p_staff_id,
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values,
    p_ip_address,
    p_user_agent
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
