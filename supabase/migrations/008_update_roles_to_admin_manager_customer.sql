-- Update staff roles from old system to new system
-- Old roles: Owner, Manager, Cashier, Staff, Marketing
-- New roles: Admin, Manager, Customer

-- Map Owner → Admin
UPDATE staff SET role = 'Admin' WHERE role = 'Owner';

-- Manager stays as Manager (no change needed)

-- Convert Cashier, Staff, Marketing to Customer
-- These users will have no admin permissions (website users only)
UPDATE staff SET role = 'Customer' WHERE role IN ('Cashier', 'Staff', 'Marketing');

-- Note: If you want to delete Cashier, Staff, Marketing records instead of converting them,
-- use: DELETE FROM staff WHERE role IN ('Cashier', 'Staff', 'Marketing');
