'use client';

import { Card } from '@/components/ui/Card';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { ShoppingCart, Package, Clock, ShieldCheck } from 'lucide-react';

export default function DashboardHome() {
    const { user } = useAuth();

    const stats = [
        { name: 'Pending Orders', stat: '3', icon: Clock, href: '/orders?status=PENDING', color: 'bg-yellow-500' },
        { name: 'Active Shipments', stat: '12', icon: Package, href: '/orders?status=SHIPPED', color: 'bg-blue-500' },
        { name: 'Total Spend (Mo)', stat: '$45,200', icon: ShoppingCart, href: '/orders', color: 'bg-green-500' },
        { name: 'Verified Suppliers', stat: '8', icon: ShieldCheck, href: '/products', color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
                <span className="text-sm text-gray-500">Organization: {user?.organizationId}</span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{item.stat}</dd>
                                    </dl>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="min-h-[300px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="flex items-center justify-center h-48 text-gray-400 border-2 border-dashed rounded-lg">
                        Chart Placeholder
                    </div>
                </Card>
                <Card className="min-h-[300px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/products" className="block p-4 border rounded-lg hover:bg-gray-50 text-center">
                            <span className="block font-medium">Browse Catalog</span>
                        </Link>
                        <Link href="/orders" className="block p-4 border rounded-lg hover:bg-gray-50 text-center">
                            <span className="block font-medium">Track Orders</span>
                        </Link>
                        <Link href="/profile" className="block p-4 border rounded-lg hover:bg-gray-50 text-center">
                            <span className="block font-medium">Manage Team</span>
                        </Link>
                        <Link href="/help" className="block p-4 border rounded-lg hover:bg-gray-50 text-center">
                            <span className="block font-medium">Contact Support</span>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
