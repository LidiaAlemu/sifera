-- This script creates the initial admin staff record
-- Run this in Supabase SQL Editor after creating your first user via Supabase Auth

-- Insert staff record for the admin user
INSERT INTO staff (user_id, role, status, hire_date)
VALUES ('cb787b30-417b-4c67-b071-69977ae178ac', 'Owner', 'active', CURRENT_DATE)
ON CONFLICT (user_id) DO UPDATE
SET role = 'Owner', status = 'active', updated_at = NOW();

-- Verify the staff record was created
SELECT 
  u.email,
  s.role,
  s.status,
  s.hire_date
FROM auth.users u
JOIN staff s ON u.id = s.user_id
WHERE s.user_id = 'cb787b30-417b-4c67-b071-69977ae178ac';
