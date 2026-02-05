-- ==========================================
-- Products Table Migration
-- Migrates products from mock data to database
-- ==========================================

-- 1️⃣ Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2️⃣ Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Info
  name text NOT NULL,
  model text NOT NULL UNIQUE,
  category text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  
  -- Specifications (JSON)
  specifications jsonb NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  
  -- Warranty
  warranty text,
  warranty_description text,
  support_provider text,
  
  -- Inventory
  stock_quantity integer DEFAULT 100,
  is_available boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3️⃣ Create indexes
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category);
CREATE INDEX IF NOT EXISTS products_is_available_idx ON public.products(is_available);
CREATE INDEX IF NOT EXISTS products_model_idx ON public.products(model);

-- 4️⃣ Disable RLS for testing
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- 5️⃣ Seed products data
INSERT INTO public.products (name, model, category, description, price, image_url, specifications, features, warranty, warranty_description, support_provider, stock_quantity)
VALUES
  -- Product 1: ThinkPad X1 Carbon Gen 11
  (
    'ThinkPad X1 Carbon Gen 11',
    'TP-X1-G11',
    'Laptops',
    'Engineered for corporate productivity, the ThinkPad X1 Carbon Gen 11 combines ultralight portability with heavy-duty performance. Features enterprise-grade security, long battery life, and comprehensive connectivity options suitable for hybrid work environments.',
    1849.00,
    '/assets/ThinkPad X1 Carbon Gen 11.webp',
    '{"processor": "Intel Core i7-1355U vPro", "os": "Windows 11 Pro 64", "graphics": "Integrated Intel Iris Xe Graphics", "memory": "32GB LPDDR5 6000MHz", "storage": "1TB SSD M.2 2280 PCIe Gen4", "display": "14\" WUXGA (1920x1200) IPS, Anti-glare", "battery": "57Whr, up to 14 hours", "weight": "Starting at 1.12kg (2.48lbs)"}',
    ARRAY['Intel Core i7-1355U vPro', '32GB LPDDR5 6000MHz', '1TB SSD PCIe Gen4', '14" WUXGA (1920x1200) IPS'],
    '3 Yr Premier Support',
    'This product comes with a 3-Year Premier Support package. Coverage includes next-business-day onsite service for hardware issues, 24/7 priority technical support, and accidental damage protection for one incident per year.',
    'Lenovo Enterprise Services',
    25
  ),
  
  -- Product 2: Dell UltraSharp U2723QE
  (
    'Dell UltraSharp U2723QE',
    'DL-U2723QE',
    'Monitors',
    'Experience pure productivity on a 27-inch 4K monitor with extensive connectivity and ComfortView Plus.',
    619.00,
    '/assets/Dell UltraSharp U2723QE.jpg',
    '{"processor": "USB-C hub controller built-in", "graphics": "4K UHD (3840 × 2160) resolution", "memory": "Internal firmware/EDID memory", "display": "27\" IPS Black panel", "brightness": "400cd/m²"}',
    ARRAY['27" 4K UHD (3840 x 2160)', '400 nits Brightness', 'USB-C Hub, HDMI, DP', '98% DCI-P3 Color Gamut'],
    '3 Yr Adv Exchange',
    NULL,
    NULL,
    40
  ),
  
  -- Product 3: HP Z2 Mini G9
  (
    'HP Z2 Mini G9',
    'HP-Z2-MINI',
    'Workstations',
    'Incredibly high performance packed into an obscenely small PC. Easily fits on your desk or behind your monitor.',
    1249.00,
    '/assets/HP Z2 Mini G9.webp',
    '{"processor": "Intel Core i9-13900K", "os": "Windows 11 Pro", "graphics": "NVIDIA RTX A2000 12GB", "memory": "64GB DDR5 5600MHz", "storage": "Gen4 M.2 SSD"}',
    ARRAY['Intel Core i9-13900K', '64GB DDR5 5600MHz', 'NVIDIA RTX A2000 12GB', 'Wi-Fi 6E + Bluetooth 5.3'],
    '5 Yr Onsite Support',
    NULL,
    NULL,
    15
  ),
  
  -- Product 4: iPad Pro 12.9-inch (M2)
  (
    'iPad Pro 12.9-inch (M2)',
    'APL-IPAD-PRO',
    'Tablets',
    'Astonishing performance, incredibly advanced displays, and superfast wireless connectivity.',
    1099.00,
    '/assets/iPad Pro 12.9-inch (M2).jpg',
    '{"processor": "Apple M2 Chip", "os": "iPadOS 16", "graphics": "10-core GPU", "memory": "8GB RAM", "storage": "256GB Storage"}',
    ARRAY['Apple M2 Chip (8-core)', '256GB Storage', 'Liquid Retina XDR Display', '10 Hr Battery Life'],
    '2 Yr AppleCare+',
    NULL,
    NULL,
    30
  ),
  
  -- Product 5: Cisco Meraki MX85
  (
    'Cisco Meraki MX85',
    'CSCO-MX85',
    'Networking',
    'Enterprise SD-WAN and security appliance for medium-sized branches. Cloud-managed.',
    2400.00,
    '/assets/Cisco Meraki MX85.avif',
    '{"os": "Meraki OS", "firewall": "Throughput 1 Gbps", "vpn": "Throughput 500 Mbps", "management": "Cloud-based Cisco Meraki Dashboard", "wan ports": "2 × 1 GbE SFP, 2 × 1 GbE RJ45 (1 with PoE+)"}',
    ARRAY['1 Gbps Stateful Firewall', 'SD-WAN Capable', 'Advanced Security License', 'Up to 250 Users'],
    'Lifetime Hardware',
    NULL,
    NULL,
    10
  ),
  
  -- Product 6: Logitech MX Master 3S
  (
    'Logitech MX Master 3S',
    'LOGI-MXM3S',
    'Peripherals',
    'An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance.',
    99.00,
    '/assets/Logitech MX Master 3S.jpg',
    '{"battery": "Rechargeable Li-Po 500 mAh", "sensor type": "Darkfield high-precision optical sensor", "scroll wheel": "MagSpeed electromagnetic wheel with smart-shift", "wireless": "Bluetooth Low Energy & Logi Bolt USB receiver", "dimensions": "~124.9 × 84.3 × 51 mm"}',
    ARRAY['8000 DPI Sensor', 'Multi-Device Bluetooth', 'USB-C Fast Charging', 'Quiet Clicks'],
    '1 Yr Standard',
    NULL,
    NULL,
    50
  )
ON CONFLICT (model) DO NOTHING;

-- 6️⃣ Trigger for updated_at
CREATE TRIGGER on_product_updated
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_updated_at();

-- 7️⃣ Verification
SELECT 
  id,
  name,
  model,
  category,
  price,
  stock_quantity
FROM public.products
ORDER BY category, name;
