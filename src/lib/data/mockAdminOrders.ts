import { HardHat, Briefcase, Globe, Monitor, Users, FlaskConical } from 'lucide-react';

export const adminOrders = [
    {
        id: '#ORD-2025-084',
        department: 'Engineering Dept.',
        icon: HardHat,
        date: 'Oct 24, 2025',
        placedBy: 'Engineering Dept.',
        status: 'Shipped',
        details: {
            items: [
                {
                    name: 'Dell Latitude 7440 Laptop',
                    spec: 'i7-1365U / 16GB RAM / 512GB SSD',
                    qty: 5,
                    image: 'laptop'
                },
                {
                    name: 'Dell UltraSharp 27 Monitor',
                    spec: '4K USB-C Hub Monitor - U2723QE',
                    qty: 10,
                    image: 'monitor'
                },
                {
                    name: 'Dell Thunderbolt Dock',
                    spec: 'WD22TB4 - 180W Power Delivery',
                    qty: 5,
                    image: 'dock'
                }
            ],
            techRequirements: {
                approvalStatus: 'Approved',
                standardCompliant: 'Yes (Enterprise Grade A)',
                deploymentSchedule: 'Scheduled for Nov 2, 2025'
            },
            delivery: {
                status: 'Shipped',
                estDelivery: 'Oct 30, 2025',
                carrier: 'FedEx Express',
                trackingId: '7823 4291 0022'
            },
            supplier: {
                vendor: 'TechGlobal Solutions',
                verification: 'Verified',
                email: 'support@techglobal.com',
                contactType: 'Primary Contact'
            },
            shipTo: {
                department: 'Engineering Department',
                attn: 'Attn: Sarah Jenkins',
                address1: '100 Tech Park Blvd, Suite 400',
                address2: 'San Francisco, CA 94105'
            }
        }
    },
    {
        id: '#ORD-2025-083',
        department: 'Marketing Team',
        icon: Briefcase,
        date: 'Oct 23, 2025',
        details: {} // Placeholder
    },
    {
        id: '#ORD-2025-082',
        department: 'Regional Office (NY)',
        icon: Globe,
        date: 'Oct 21, 2025',
        details: {}
    },
    {
        id: '#ORD-2025-081',
        department: 'IT Support Wing',
        icon: Monitor,
        date: 'Oct 19, 2025',
        details: {}
    },
    {
        id: '#ORD-2025-080',
        department: 'HR Department',
        icon: Users,
        date: 'Oct 18, 2025',
        details: {}
    },
    {
        id: '#ORD-2025-079',
        department: 'R&D Lab',
        icon: FlaskConical,
        date: 'Oct 15, 2025',
        details: {}
    }
];
