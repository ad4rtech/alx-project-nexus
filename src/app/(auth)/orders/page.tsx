'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/business/StatusBadge';
import { ITAdminOrdersTable } from '@/components/business/ITAdminOrdersTable';
import { Search, Package, Building2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { fetchOrders } from '@/lib/actions/orders';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Order = {
    id: string;
    order_number: string;
    created_at: string;
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'DEPLOYED';
    total_amount: number;
    ship_to_department: string;
    estimated_delivery?: string;
    items: any[];
};

export default function OrdersPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const isITAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        // Only load orders after auth has finished loading and user is available
        if (!loading && user?.id) {
            loadOrders();
        } else if (!loading && !user) {
            setLoadingOrders(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user?.id]);

    const loadOrders = async () => {
        setLoadingOrders(true);
        try {
            const result = await fetchOrders(user?.id, user?.role);

            if (result.error) {
                console.error('Error loading orders:', result.error);
            }

            if (result.orders) {
                setOrders(result.orders);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('Exception loading orders:', error);
            setOrders([]);
        } finally {
            setLoadingOrders(false);
        }
    };

    // Filter orders based on search
    const filteredOrders = orders.filter(order =>
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.ship_to_department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading || loadingOrders) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading orders...</div>
            </div>
        );
    }

    // IT Admin View
    if (isITAdmin) {
        return (
            <div className="space-y-8 pb-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">
                        Order Management
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Review and update order statuses across the organization.
                    </p>
                </div>

                {/* Search */}
                <div className="relative max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order Number</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            {searchQuery ? 'No orders found matching your search.' : 'No orders yet.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <Link
                                                    href={`/orders/${order.id}`}
                                                    className="text-sm font-bold text-blue-600 hover:text-blue-800"
                                                >
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {order.ship_to_department}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-sm text-gray-900">
                                                {order.items && order.items.length > 0 ? (
                                                    <div className="flex flex-col gap-1">
                                                        {order.items.map((item: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <span className="font-medium">{item.title || item.name || 'Unknown Product'}</span>
                                                                <span className="text-gray-500">×{item.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">No items</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${order.total_amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // BUYER View
    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">
                        My Orders
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Track your procurement orders and delivery status.
                    </p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push('/products')}
                >
                    + New Order
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by Order Number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order Number</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ship To</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12">
                                        <div className="text-center">
                                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 mb-4">
                                                {searchQuery ? 'No orders found matching your search.' : 'You haven\'t placed any orders yet.'}
                                            </p>
                                            {!searchQuery && (
                                                <Button
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    onClick={() => router.push('/products')}
                                                >
                                                    Browse Products
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                {order.order_number}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.ship_to_department}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {order.items && order.items.length > 0 ? (
                                                <div className="flex flex-col gap-1">
                                                    {order.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <span className="font-medium">{item.title || item.name || 'Unknown Product'}</span>
                                                            <span className="text-gray-500">×{item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">No items</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${order.total_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <Link href={`/orders/${order.id}`}>
                                                <button className="text-gray-600 hover:text-gray-900 font-medium border border-gray-200 rounded px-3 py-1 text-xs hover:bg-gray-50">
                                                    View Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
