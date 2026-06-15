-- ============================================
-- SIFERA DATABASE SCHEMA
-- ============================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- USER MANAGEMENT MODULE
-- ============================================

-- Profiles (shared between customers and admins)
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text,
  email text unique,
  phone text,
  avatar_url text,
  date_of_birth date,
  gender text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

-- Customer accounts
create table customer_accounts (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  account_status text default 'active',
  last_login timestamptz,
  total_orders int default 0,
  total_spent decimal(10,2) default 0,
  reward_points int default 0,
  favorite_category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  branch_id uuid
);

-- Admin accounts
create table admin_accounts (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  role text check (role in ('Owner', 'Manager', 'Cashier', 'Staff', 'Marketing')) not null,
  permissions jsonb default '[]',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  branch_id uuid
);

-- ============================================
-- MENU MANAGEMENT MODULE
-- ============================================

create table menu_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  sort_order int default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

create table menu_items (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references menu_categories(id) on delete set null,
  name text not null,
  slug text not null,
  description text,
  price decimal(10,2) not null,
  cost_price decimal(10,2),
  image_url text,
  calories int,
  ingredients text,
  preparation_time int,
  featured boolean default false,
  available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

create table menu_item_images (
  id uuid primary key default uuid_generate_v4(),
  menu_item_id uuid references menu_items(id) on delete cascade not null,
  image_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table menu_item_tags (
  id uuid primary key default uuid_generate_v4(),
  menu_item_id uuid references menu_items(id) on delete cascade not null,
  tag_name text not null
);

-- ============================================
-- ORDER MANAGEMENT MODULE
-- ============================================

create table orders (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customer_accounts(id) on delete set null,
  guest_name text,
  guest_phone text,
  guest_email text,
  order_number text unique not null,
  subtotal decimal(10,2) not null,
  tax_amount decimal(10,2) default 0,
  discount_amount decimal(10,2) default 0,
  total_amount decimal(10,2) not null,
  payment_method text,
  order_status text default 'Waiting Verification',
  pickup_time timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  menu_item_id uuid references menu_items(id) on delete set null,
  quantity int not null,
  unit_price decimal(10,2) not null,
  subtotal decimal(10,2) not null,
  created_at timestamptz default now()
);

create table payment_receipts (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  receipt_url text not null,
  payment_reference text,
  verification_status text default 'Pending',
  verified_by uuid references profiles(id),
  verified_at timestamptz,
  created_at timestamptz default now()
);

create table order_status_history (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  old_status text,
  new_status text not null,
  changed_by uuid references profiles(id),
  changed_at timestamptz default now()
);

-- ============================================
-- CUSTOMER EXPERIENCE MODULE
-- ============================================

create table favorites (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customer_accounts(id) on delete cascade not null,
  menu_item_id uuid references menu_items(id) on delete cascade not null,
  created_at timestamptz default now()
);

create table carts (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customer_accounts(id) on delete cascade,
  session_id text,
  created_at timestamptz default now()
);

create table cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references carts(id) on delete cascade not null,
  menu_item_id uuid references menu_items(id) on delete cascade not null,
  quantity int not null default 1
);

create table customer_recommendations (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customer_accounts(id) on delete cascade not null,
  recommended_item_id uuid references menu_items(id) on delete cascade not null,
  reason text,
  created_at timestamptz default now()
);

-- ============================================
-- MEMBERSHIP MODULE
-- ============================================

create table membership_plans (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price decimal(10,2) not null,
  duration_days int not null,
  discount_percentage decimal(5,2) default 0,
  priority_event_access boolean default false,
  free_drinks int default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

create table memberships (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customer_accounts(id) on delete cascade not null,
  plan_id uuid references membership_plans(id) on delete set null,
  start_date date not null,
  end_date date,
  status text default 'Active',
  renewal_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  branch_id uuid
);

create table membership_history (
  id uuid primary key default uuid_generate_v4(),
  membership_id uuid references memberships(id) on delete cascade not null,
  action text not null,
  performed_at timestamptz default now()
);

-- ============================================
-- BOOK LIBRARY MODULE
-- ============================================

create table book_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique
);

create table books (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references book_categories(id) on delete set null,
  title text not null,
  author text,
  publisher text,
  publication_year int,
  description text,
  cover_url text,
  availability_status text default 'Available',
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

create table book_views (
  id uuid primary key default uuid_generate_v4(),
  book_id uuid references books(id) on delete cascade not null,
  customer_id uuid references customer_accounts(id) on delete set null,
  viewed_at timestamptz default now()
);

-- ============================================
-- EVENTS MODULE
-- ============================================

create table events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text,
  image_url text,
  capacity int not null,
  event_date timestamptz not null,
  registration_deadline timestamptz,
  location text,
  price decimal(10,2) default 0,
  status text default 'Upcoming',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  is_deleted boolean default false,
  created_by uuid references profiles(id),
  updated_by uuid references profiles(id),
  branch_id uuid
);

create table event_registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade not null,
  customer_id uuid references customer_accounts(id) on delete set null,
  guest_name text,
  guest_phone text,
  guest_email text,
  registration_code text unique not null,
  qr_code text,
  status text default 'Registered',
  registered_at timestamptz default now(),
  branch_id uuid
);

create table event_checkins (
  id uuid primary key default uuid_generate_v4(),
  registration_id uuid references event_registrations(id) on delete cascade not null,
  checked_in_by uuid references profiles(id),
  checked_in_at timestamptz default now()
);

create table event_gallery (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade not null,
  image_url text not null,
  caption text
);

-- ============================================
-- PAYMENT MODULE
-- ============================================

create table payment_methods (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  active boolean default true
);

create table payment_transactions (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  payment_method text not null,
  amount decimal(10,2) not null,
  transaction_reference text,
  status text default 'Pending',
  created_at timestamptz default now()
);

-- ============================================
-- NOTIFICATION SYSTEM
-- ============================================

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  message text,
  read_status boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- ACTIVITY & AUDIT LOGS
-- ============================================

create table activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  action text not null,
  target_record text,
  target_id uuid,
  details jsonb,
  created_at timestamptz default now(),
  branch_id uuid
);

-- Audit log for financial/value changes
create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  table_name text not null,
  record_id uuid not null,
  field_name text not null,
  old_value text,
  new_value text,
  changed_at timestamptz default now(),
  branch_id uuid
);

-- ============================================
-- SETTINGS MODULE
-- ============================================

create table settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id)
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- (You can later define specific policies)
-- ============================================

-- Enabling RLS
alter table profiles enable row level security;
alter table customer_accounts enable row level security;
alter table admin_accounts enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table menu_item_images enable row level security;
alter table menu_item_tags enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payment_receipts enable row level security;
alter table order_status_history enable row level security;
alter table favorites enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table customer_recommendations enable row level security;
alter table membership_plans enable row level security;
alter table memberships enable row level security;
alter table membership_history enable row level security;
alter table book_categories enable row level security;
alter table books enable row level security;
alter table book_views enable row level security;
alter table events enable row level security;
alter table event_registrations enable row level security;
alter table event_checkins enable row level security;
alter table event_gallery enable row level security;
alter table payment_methods enable row level security;
alter table payment_transactions enable row level security;
alter table notifications enable row level security;
alter table activity_logs enable row level security;
alter table audit_logs enable row level security;
alter table settings enable row level security;

-- ============================================
-- BASIC POLICIES (example for admin access)
-- ============================================

-- Allow admins full access to all tables
-- (you will refine these based on auth later)
create policy "Allow admin full access" on profiles for all using (
  exists (select 1 from admin_accounts where profile_id = auth.uid() and is_active = true)
);
