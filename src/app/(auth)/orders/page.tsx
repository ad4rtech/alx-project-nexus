'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/business/StatusBadge';
import { OrderTracker } from '@/components/business/OrderTracker';
import { ITAdminOrdersTable } from '@/components/business/ITAdminOrdersTable';
import { Search } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

const orders = [
    {
        id: '#ORD-2023-8894',
        date: 'Oct 24, 2023',
        shipTo: 'TechCorp HQ, SF',
        status: 'Shipped',
        estDelivery: 'Oct 28, 2023',
        amount: 15736.03,
    },
    {
        id: '#ORD-2023-8812',
        date: 'Oct 15, 2023',
        shipTo: 'TechCorp Branch, NY',
        status: 'Delivered',
        estDelivery: 'Oct 18, 2023',
        amount: 2450.00,
    },
    {
        id: '#ORD-2023-8750',
        date: 'Oct 10, 2023',
        shipTo: 'TechCorp HQ, SF',
        status: 'Delivered',
        estDelivery: 'Oct 14, 2023',
        amount: 8900.50,
    },
    {
        id: '#ORD-2023-8711',
        date: 'Oct 08, 2023',
        shipTo: 'TechCorp Remote, TX',
        status: 'Pending',
        estDelivery: 'TBD',
        amount: 1299.00,
    },
    {
        id: '#ORD-2023-8600',
        date: 'Sep 28, 2023',
        shipTo: 'TechCorp HQ, SF',
        status: 'Processing',
        estDelivery: 'Oct 01, 2023',
        amount: 54000.00,
    },
];

export default function OrdersPage() {
    const { user } = useAuth();
    const isITAdmin = user?.role === 'ADMIN';

    if (isITAdmin) {
        return (
            <div className="space-y-8 pb-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">
                        Order Management
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Review and track procurement orders across the organization.
                    </p>
                </div>
                <ITAdminOrdersTable />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">
                        Order Tracking & History
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor electronics orders and delivery statuses across your organization.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    + New Order
                </Button>
            </div>

            {/* Active Order Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Order #ORD-2023-8894</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Placed on Oct 24, 2023 · 35 Items · Total: $15,736.03
                        </p>
                    </div>
                    <div className="text-right">
                        <StatusBadge status="In Transit" />
                        <p className="text-xs font-bold text-gray-900 mt-2">Est. Delivery: Oct 28, 2023</p>
                    </div>
                </div>

                <div className="px-4 md:px-12">
                    <OrderTracker currentStep={2} /> {/* 2 = Shipped/In Transit */}
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-grow max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Order ID or Product..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button className="px-4 py-2 border border-gray-200 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Filter Status
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ship To</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Est. Delivery</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shipTo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* @ts-ignore status string checking */}
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.estDelivery}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${order.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-gray-600 hover:text-gray-900 font-medium border border-gray-200 rounded px-3 py-1 text-xs hover:bg-gray-50">
                                            {order.status === 'Shipped' ? 'Track' : order.status === 'Pending' ? 'Manage' : order.status === 'Processing' ? 'Update Status' : 'View Invoice'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
