'use client';

import React, { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Box, Truck, MapPin, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/business/StatusBadge';
import { useAuth } from '@/lib/hooks/useAuth';
import { fetchOrderById, updateOrderStatus, OrderStatus } from '@/lib/actions/orders';
import { useToast } from '@/lib/context/ToastContext';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Define roughly the shape we need, or just use a looser type to avoid 'any'
    interface Order {
        id: string;
        order_number: string;
        created_at: string;
        status: OrderStatus;
        total_amount: number;
        items: {
            title: string;
            name: string;
            quantity: number;
            price: number;
            image?: string;
            sku?: string;
        }[];
        status_history: {
            id: string; // Added id
            status: string;
            created_at: string;
            notes?: string;
            from_status?: string; // Added from_status
            to_status?: string; // Added to_status
        }[];
        shipped_at?: string;
        delivered_at?: string;
        deployed_at?: string;
        carrier?: string;
        tracking_number?: string;
        estimated_delivery?: string;
        ship_to_department: string;
        ship_to_contact: string;
        ship_to_address: {
            address1: string;
            address2?: string; // Added address2
            city: string;
            state: string;
            zip: string;
        };
        created_by_profile?: { name: string; email: string };
    }

    const { id } = use(params);
    const { user } = useAuth();
    const { showToast } = useToast();
    // router removed as it was unused

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const isAdmin = user?.role === 'ADMIN';

    const loadOrder = React.useCallback(async () => {
        // setLoading(true); // Removed to avoid set-state-in-effect warning
        const result = await fetchOrderById(id);
        if (result.error || !result.order) {
            notFound();
        } else {
            setOrder(result.order);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        loadOrder();
    }, [loadOrder]);

    const handleStatusUpdate = async (newStatus: OrderStatus) => {
        if (!confirm(`Update order status to ${newStatus}?`)) return;

        setUpdating(true);
        const result = await updateOrderStatus(id, newStatus);

        if (result.error) {
            showToast(result.error, 'error');
        } else {
            showToast('Order status updated successfully', 'success');
            loadOrder(); // Reload order
        }
        setUpdating(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-gray-500">Loading order...</div>
            </div>
        );
    }

    if (!order) {
        notFound();
    }

    const currentStatus = order.status as OrderStatus;

    // Determine next allowed status
    const nextStatus = {
        PENDING: 'SHIPPED',
        SHIPPED: 'DELIVERED',
        DELIVERED: 'DEPLOYED',
        DEPLOYED: null,
    }[currentStatus];

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Back Nav */}
            <div className="mb-6">
                <Link href="/orders" className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Orders
                </Link>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display mb-1">
                        Order {order.order_number}
                    </h1>
                    <p className="text-sm text-gray-400">
                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                        {order.created_by_profile && ` by ${order.created_by_profile.name}`}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <StatusBadge status={currentStatus} />

                    {/* Admin Status Update Button */}
                    {isAdmin && nextStatus && (
                        <Button
                            onClick={() => handleStatusUpdate(nextStatus as OrderStatus)}
                            disabled={updating}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {updating ? 'Updating...' : `Mark as ${nextStatus}`}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Box className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Order Items</h3>
                        </div>

                        <div className="space-y-4">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    {/* Thumbnail */}
                                    <div className="w-16 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center shrink-0">
                                        <Package2 className="w-6 h-6 text-gray-400" />
                                    </div>

                                    <div className="grow">
                                        <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">SKU: {item.sku}</p>
                                        <p className="text-xs text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">Qty: {item.quantity}</p>
                                        <p className="text-sm font-bold text-gray-900 mt-1">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-base font-bold text-gray-900">Order Total</span>
                            <span className="text-xl font-bold text-gray-900">${order.total_amount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Status History (Admin only) */}
                    {isAdmin && order.status_history && order.status_history.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Status History</h3>
                            <div className="space-y-3">
                                {order.status_history.map((history) => (
                                    <div key={history.id} className="flex justify-between items-start text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {history.from_status ? `${history.from_status} → ${history.to_status}` : `Created as ${history.to_status}`}
                                            </p>
                                            {history.notes && (
                                                <p className="text-gray-500 text-xs mt-1">{history.notes}</p>
                                            )}
                                        </div>
                                        <p className="text-gray-500 text-xs whitespace-nowrap ml-4">
                                            {new Date(history.created_at).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN (1/3) */}
                <div className="space-y-6">
                    {/* Delivery Status */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Truck className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Delivery Status</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Current Status</span>
                                <span className="text-gray-900 font-semibold text-right">{currentStatus}</span>
                            </div>

                            {order.shipped_at && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Shipped</span>
                                    <span className="text-gray-900 font-semibold text-right">
                                        {new Date(order.shipped_at).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                            {order.delivered_at && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Delivered</span>
                                    <span className="text-gray-900 font-semibold text-right">
                                        {new Date(order.delivered_at).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                            {order.deployed_at && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Deployed</span>
                                    <span className="text-gray-900 font-semibold text-right">
                                        {new Date(order.deployed_at).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                            {order.carrier && (
                                <div className="flex justify-between text-sm border-t border-gray-50 pt-3">
                                    <span className="text-gray-500 font-medium">Carrier</span>
                                    <span className="text-gray-900 font-semibold text-right">{order.carrier}</span>
                                </div>
                            )}

                            {order.tracking_number && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Tracking ID</span>
                                    <span className="text-blue-600 font-bold text-right">{order.tracking_number}</span>
                                </div>
                            )}

                            {order.estimated_delivery && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Est. Delivery</span>
                                    <span className="text-gray-900 font-semibold text-right">
                                        {new Date(order.estimated_delivery).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ship To */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Ship To</h3>
                        </div>

                        <div className="text-xs text-gray-600 leading-relaxed font-medium">
                            <p className="font-bold text-gray-900 mb-0.5">{order.ship_to_department}</p>
                            <p>{order.ship_to_contact}</p>
                            <p>{order.ship_to_address?.address1}</p>
                            {order.ship_to_address?.address2 && <p>{order.ship_to_address.address2}</p>}
                            <p>
                                {order.ship_to_address?.city}, {order.ship_to_address?.state} {order.ship_to_address?.zip}
                            </p>
                        </div>
                    </div>

                    {/* Order Info */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4">Order Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Order Number</span>
                                <span className="font-semibold text-gray-900">{order.order_number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Items</span>
                                <span className="font-semibold text-gray-900">{order.items?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Created</span>
                                <span className="font-semibold text-gray-900">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            {order.created_by_profile && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created By</span>
                                    <span className="font-semibold text-gray-900">{order.created_by_profile.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
