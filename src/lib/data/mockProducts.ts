export const products = [
    {
        id: 1,
        category: 'Laptops',
        title: 'ThinkPad X1 Carbon Gen 11',
        model: 'TP-X1-G11',
        description: 'Engineered for corporate productivity, the ThinkPad X1 Carbon Gen 11 combines ultralight portability with heavy-duty performance. Features enterprise-grade security, long battery life, and comprehensive connectivity options suitable for hybrid work environments.',
        price: 1849.00,
        specs: {
            processor: 'Intel Core i7-1355U vPro',
            os: 'Windows 11 Pro 64',
            graphics: 'Integrated Intel Iris Xe Graphics',
            memory: '32GB LPDDR5 6000MHz',
            storage: '1TB SSD M.2 2280 PCIe Gen4',
            display: '14" WUXGA (1920x1200) IPS, Anti-glare',
            battery: '57Whr, up to 14 hours',
            weight: 'Starting at 1.12kg (2.48lbs)'
        },
        features: [
            'Intel Core i7-1355U vPro',
            '32GB LPDDR5 6000MHz',
            '1TB SSD PCIe Gen4',
            '14" WUXGA (1920x1200) IPS'
        ],
        warranty: '3 Yr Premier Support',
        warrantyDescription: 'This product comes with a 3-Year Premier Support package. Coverage includes next-business-day onsite service for hardware issues, 24/7 priority technical support, and accidental damage protection for one incident per year.',
        supportProvider: 'Lenovo Enterprise Services'
    },
    // ... other products (keeping them compatible but less detailed for now)
    {
        id: 2,
        category: 'Monitors',
        title: 'Dell UltraSharp U2723QE',
        model: 'DL-U2723QE',
        description: 'Experience pure productivity on a 27-inch 4K monitor with extensive connectivity and ComfortView Plus.',
        price: 619.00,
        specs: { processor: 'N/A', os: 'N/A', graphics: 'N/A', memory: 'N/A', storage: 'N/A' },
        features: ['27" 4K UHD (3840 x 2160)', '400 nits Brightness', 'USB-C Hub, HDMI, DP', '98% DCI-P3 Color Gamut'],
        warranty: '3 Yr Adv Exchange'
    },
    {
        id: 3,
        category: 'Workstations',
        title: 'HP Z2 Mini G9',
        model: 'HP-Z2-MINI',
        description: 'Incredibly high performance packed into an obscenely small PC. Easily fits on your desk or behind your monitor.',
        price: 1249.00,
        specs: { processor: 'Intel Core i9-13900K', os: 'Windows 11 Pro', graphics: 'NVIDIA RTX A2000 12GB', memory: '64GB DDR5 5600MHz', storage: 'Gen4 M.2 SSD' },
        features: ['Intel Core i9-13900K', '64GB DDR5 5600MHz', 'NVIDIA RTX A2000 12GB', 'Wi-Fi 6E + Bluetooth 5.3'],
        warranty: '5 Yr Onsite Support'
    },
    {
        id: 4,
        category: 'Tablets',
        title: 'iPad Pro 12.9-inch (M2)',
        model: 'APL-IPAD-PRO',
        description: 'Astonishing performance, incredibly advanced displays, and superfast wireless connectivity.',
        price: 1099.00,
        specs: { processor: 'Apple M2 Chip', os: 'iPadOS 16', graphics: '10-core GPU', memory: '8GB RAM', storage: '256GB Storage' },
        features: ['Apple M2 Chip (8-core)', '256GB Storage', 'Liquid Retina XDR Display', '10 Hr Battery Life'],
        warranty: '2 Yr AppleCare+'
    },
    {
        id: 5,
        category: 'Networking',
        title: 'Cisco Meraki MX85',
        model: 'CSCO-MX85',
        description: 'Enterprise SD-WAN and security appliance for medium-sized branches. Cloud-managed.',
        price: 2400.00,
        specs: { processor: 'N/A', os: 'Meraki OS', graphics: 'N/A', memory: 'N/A', storage: 'N/A' },
        features: ['1 Gbps Stateful Firewall', 'SD-WAN Capable', 'Advanced Security License', 'Up to 250 Users'],
        warranty: 'Lifetime Hardware'
    },
    {
        id: 6,
        category: 'Peripherals',
        title: 'Logitech MX Master 3S',
        model: 'LOGI-MXM3S',
        description: 'An icon remastered. Feel every moment of your workflow with even more precision, tactility, and performance.',
        price: 99.00,
        specs: { processor: 'N/A', os: 'N/A', graphics: 'N/A', memory: 'N/A', storage: 'N/A' },
        features: ['8000 DPI Sensor', 'Multi-Device Bluetooth', 'USB-C Fast Charging', 'Quiet Clicks'],
        warranty: '1 Yr Standard'
    }
];
