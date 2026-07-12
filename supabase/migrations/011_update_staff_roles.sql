-- Update staff table to remove Customer role
-- Customer role will be removed (website users use customers table instead)

-- Convert Customer role staff to Manager (or delete if preferred)
-- Here we convert to Manager to preserve data
UPDATE staff SET role = 'Manager' WHERE role = 'Customer';

-- Update constraint to only allow Admin and Manager
ALTER TABLE staff DROP CONSTRAINT IF EXISTS staff_role_check;
ALTER TABLE staff ADD CONSTRAINT staff_role_check 
  CHECK (role IN ('Admin', 'Manager'));
