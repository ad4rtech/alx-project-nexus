'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { fetchOrders, updateOrderStatus } from '@/lib/actions/orders';
import { useToast } from '@/lib/context/ToastContext';

export default function DeploymentsPage() {
    const { user, loading } = useAuth();
    const { showToast } = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);


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
        }
        setLoadingOrders(false);
    };

    const handleDeploy = async (orderId: string) => {
        const result = await updateOrderStatus(orderId, 'DEPLOYED');
        if (result.success) {
            showToast('Order deployed successfully!', 'success');
            // Reload orders to update the UI
            await loadOrders();
        } else {
            showToast(result.error || 'Failed to deploy order', 'error');
        }
    };

    // RBAC Protection - return null early to prevent flash
    if (loading || loadingOrders) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
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

    // Split orders into pending and deployed
    const pendingDeployments = orders.filter(order =>
        order.status === 'PENDING' || order.status === 'SHIPPED'
    );
    const deploymentHistory = orders.filter(order =>
        order.status === 'DELIVERED' || order.status === 'DEPLOYED'
    );

    const getStatusBadge = (status: string) => {
        if (status === 'PENDING' || status === 'SHIPPED') {
            return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Planned</span>;
        }
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Deployed</span>;
    };

    return (
        <div className="space-y-10 pb-12 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Device Deployment
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage device assignments and track deployment history across the organization.
                </p>
            </div>

            {/* Pending Deployments */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Deployments</h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-blue-50 border-b border-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Device</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Target Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Assigned Team</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingDeployments.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No pending deployments
                                        </td>
                                    </tr>
                                ) : (
                                    pendingDeployments.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.items && order.items.length > 0 ? order.items[0].title || order.items[0].name : 'Unknown Device'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Tag: {order.order_number}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {order.ship_to_address?.address1 || 'HQ'} - {order.ship_to_department}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {order.ship_to_department}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button
                                                    size="sm"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-xs font-medium"
                                                    onClick={() => handleDeploy(order.id)}
                                                >
                                                    Deploy
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Deployment History */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Deployment History</h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-blue-50 border-b border-blue-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Device</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Deployed Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Assigned Team</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date Deployed</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {deploymentHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No deployment history yet
                                        </td>
                                    </tr>
                                ) : (
                                    deploymentHistory.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.items && order.items.length > 0 ? order.items[0].title || order.items[0].name : 'Unknown Device'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Tag: {order.order_number}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {order.ship_to_address?.address1 || 'HQ'} - {order.ship_to_department}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {order.ship_to_department}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {order.delivered_at ? new Date(order.delivered_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                }) : new Date(order.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(order.status)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
