-- Simplify permission system
-- Remove Customer role from role_permissions (Customer won't be in staff table)
-- Update role_permissions to only include Admin and Manager

-- Remove any Customer role entries from role_permissions
DELETE FROM role_permissions WHERE role = 'Customer';

-- Update role_permissions CHECK constraint to only allow Admin and Manager
ALTER TABLE role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_check;
ALTER TABLE role_permissions ADD CONSTRAINT role_permissions_role_check 
  CHECK (role IN ('Admin', 'Manager'));
