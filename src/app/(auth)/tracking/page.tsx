'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '@/lib/actions/orders';
import { useToast } from '@/lib/context/ToastContext';
import { Search, CheckCircle2, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TrackingPage() {
    interface Order {
        id: string;
        order_number: string;
        created_at: string;
        ship_to_address?: { address1: string };
        ship_to_department: string;
        status: string;
        total_amount: number;
        items: { title: string; name: string }[];
        estimated_delivery?: string;
    }

    const { user, loading } = useAuth();
    const { showToast } = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);


    useEffect(() => {
        if (!loading && user?.id) {
            loadOrders();
        } else if (!loading && !user) {
            setLoadingOrders(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user?.id]);

    const loadOrders = async () => {
        setLoadingOrders(true);
        const result = await fetchOrders(user?.id, user?.role);
        if (result.orders) {
            setOrders(result.orders);
            // Set most recent order as selected for timeline display
            if (result.orders.length > 0) {
                setSelectedOrder(result.orders[0]); // Most recent order
            }
        }
        setLoadingOrders(false);
    };

    const handleStatusChange = async (orderId: string, newStatus: 'PENDING' | 'SHIPPED' | 'DELIVERED') => {
        const result = await updateOrderStatus(orderId, newStatus);
        if (result.success) {
            showToast(`Order status updated to ${newStatus}`, 'success');
            await loadOrders();
        } else {
            showToast(result.error || 'Failed to update status', 'error');
        }
    };

    // RBAC Protection - return early to prevent flash
    if (loading || loadingOrders) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (user?.role !== 'ADMIN') {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-500">This page is only accessible to IT Administrators.</p>
            </div>
        );
    }

    // Filter orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.ship_to_department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { bg: string; text: string; label: string }> = {
            PENDING: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Pending' },
            SHIPPED: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Shipped' },
            DELIVERED: { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' },
            DEPLOYED: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Deployed' },
        };
        const badge = badges[status] || badges.PENDING;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {badge.label}
            </span>
        );
    };

    const getTimelineSteps = (currentStatus: string) => {
        const steps = [
            { status: 'PENDING', label: 'Order Placed', icon: CheckCircle2 },
            { status: 'SHIPPED', label: 'Shipped', icon: Truck },
            { status: 'DELIVERED', label: 'Delivered', icon: Home },
        ];

        const statusOrder = ['PENDING', 'SHIPPED', 'DELIVERED'];
        const currentIndex = statusOrder.indexOf(currentStatus);

        return steps.map((step, index) => ({
            ...step,
            completed: index <= currentIndex,
            active: index === currentIndex,
        }));
    };

    return (
        <div className="space-y-8 pb-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">
                        Order Tracking & History
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor electronics orders and delivery statuses across your organization.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 font-semibold px-6">
                    + New Order
                </Button>
            </div>

            {/* Order Timeline - Show selected order */}
            {selectedOrder && (
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Order {selectedOrder.order_number}</h2>
                            <p className="text-sm text-gray-500">
                                Placed on {new Date(selectedOrder.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items[0].title || selectedOrder.items[0].name : 'Unknown item'} • Total: KSh {selectedOrder.total_amount.toFixed(2)}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-blue-600 font-medium">In Transit</span>
                            <p className="text-sm text-gray-900 font-medium">
                                Est. Delivery: {selectedOrder.estimated_delivery ? new Date(selectedOrder.estimated_delivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div className="flex justify-between items-center">
                            {getTimelineSteps(selectedOrder.status).map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.status} className="flex flex-col items-center flex-1 relative">
                                        {/* Connector line */}
                                        {index < 2 && (
                                            <div className={`absolute top-5 left-1/2 w-full h-0.5 ${step.completed ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ zIndex: 0 }} />
                                        )}

                                        {/* Icon */}
                                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                            <Icon className={`w-5 h-5 ${step.completed ? 'text-white' : 'text-gray-400'}`} />
                                        </div>

                                        {/* Label */}
                                        <p className={`mt-2 text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {step.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            )}

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Order ID or Product..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="relative w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                    >
                        <option value="ALL">Filter: Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="DEPLOYED">Deployed</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ship To</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Item</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        {searchQuery || statusFilter !== 'ALL' ? 'No orders found matching your criteria.' : 'No orders yet.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-blue-600">
                                            {order.order_number}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {order.ship_to_address?.address1 || 'TechCorp HQ'}, {order.ship_to_department}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {order.items && order.items.length > 0 ? order.items[0].title || order.items[0].name : 'Unknown item'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            KSh {order.total_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            {order.status !== 'DEPLOYED' && (
                                                <div className="flex gap-2">
                                                    {order.status !== 'PENDING' && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-xs px-2 py-1 border border-gray-200 hover:bg-gray-50"
                                                            onClick={() => handleStatusChange(order.id, 'PENDING')}
                                                        >
                                                            Pending
                                                        </Button>
                                                    )}
                                                    {order.status !== 'SHIPPED' && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-xs px-2 py-1 border border-gray-200 hover:bg-gray-50"
                                                            onClick={() => handleStatusChange(order.id, 'SHIPPED')}
                                                        >
                                                            Ship
                                                        </Button>
                                                    )}
                                                    {order.status !== 'DELIVERED' && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-xs px-2 py-1 border border-gray-200 hover:bg-gray-50"
                                                            onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                                                        >
                                                            Deliver
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                            {order.status === 'DEPLOYED' && (
                                                <span className="text-xs text-gray-400">Deployed</span>
                                            )}
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
