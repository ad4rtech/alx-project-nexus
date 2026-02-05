-- ==========================================
-- Orders & Order Status History Migration
-- Supports testing with RLS disabled
-- ==========================================

-- 1️⃣ Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2️⃣ Create order_status enum (skip if exists)
DO $$
BEGIN
  CREATE TYPE order_status AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED', 'DEPLOYED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 3️⃣ Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text UNIQUE NOT NULL,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  organization_id uuid,
  status order_status DEFAULT 'PENDING' NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  items jsonb NOT NULL,
  ship_to_address jsonb NOT NULL,
  ship_to_department text,
  ship_to_contact text,
  carrier text,
  tracking_number text,
  estimated_delivery date,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  shipped_at timestamp with time zone,
  delivered_at timestamp with time zone,
  deployed_at timestamp with time zone
);

-- 4️⃣ Indexes
CREATE INDEX IF NOT EXISTS orders_created_by_idx ON public.orders(created_by);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders(status);

-- 5️⃣ Disable RLS temporarily for testing
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history DISABLE ROW LEVEL SECURITY;

-- 6️⃣ Sequence for order numbers
DO $$ BEGIN CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000; EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- 7️⃣ Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number() RETURNS text AS $$
DECLARE new_number text;
BEGIN
  new_number := 'ORD-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('order_number_seq')::text, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- 8️⃣ Trigger function to auto-set order number
CREATE OR REPLACE FUNCTION set_order_number() RETURNS trigger AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9️⃣ Trigger for order number
DROP TRIGGER IF EXISTS set_order_number_trigger ON public.orders;
CREATE TRIGGER set_order_number_trigger
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE PROCEDURE set_order_number();

-- 🔹 Trigger function to auto-set created_by and default status
CREATE OR REPLACE FUNCTION set_order_created_by() RETURNS trigger AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by := auth.uid();
    IF NEW.created_by IS NULL THEN
      NEW.created_by := '00000000-0000-0000-0000-000000000000'; -- placeholder for SQL Editor testing
    END IF;
  END IF;
  IF NEW.status IS NULL THEN
    NEW.status := 'PENDING';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for created_by and status
DROP TRIGGER IF EXISTS set_order_created_by_trigger ON public.orders;
CREATE TRIGGER set_order_created_by_trigger
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE PROCEDURE set_order_created_by();

-- 10️⃣ Trigger for updated_at timestamp
DROP TRIGGER IF EXISTS on_order_updated ON public.orders;
CREATE TRIGGER on_order_updated
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE PROCEDURE public.handle_updated_at();

-- 11️⃣ Order status history table
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  from_status order_status,
  to_status order_status NOT NULL,
  changed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS order_status_history_order_id_idx ON public.order_status_history(order_id);

-- ==========================================
-- Optional: Policies for RLS (re-enable later)
-- ==========================================

-- Drop old policies
DROP POLICY IF EXISTS "Buyers can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Buyers can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update order status" ON public.orders;
DROP POLICY IF EXISTS "Users can view status history for accessible orders" ON public.order_status_history;
DROP POLICY IF EXISTS "Admins can insert status history" ON public.order_status_history;

-- Buyers can see only their own orders
CREATE POLICY "Buyers can view their own orders"
ON public.orders
FOR SELECT
USING (auth.uid() = created_by);

-- Admins can see all orders
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'ADMIN'
));

-- Buyers can insert orders
CREATE POLICY "Buyers can create orders"
ON public.orders
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'BUYER'
));

-- Admins can update order status
CREATE POLICY "Admins can update order status"
ON public.orders
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'ADMIN'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'ADMIN'
));

-- Users can view status history
CREATE POLICY "Users can view status history for accessible orders"
ON public.order_status_history
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.orders
  WHERE orders.id = order_status_history.order_id
));

-- Admins can insert status history
CREATE POLICY "Admins can insert status history"
ON public.order_status_history
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'ADMIN'
));
