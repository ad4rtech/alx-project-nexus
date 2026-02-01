'use client';

import React, { use } from 'react';
import { adminOrders } from '@/lib/data/mockAdminOrders';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Box, Truck, MapPin, Building2, CheckCircle, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // Decode ID if necessary (e.g. %23 -> #)
    const decodedId = decodeURIComponent(id);
    const order = adminOrders.find(o => o.id === decodedId);
    const router = useRouter();

    if (!order || !order.details || !order.details.items) {
        // Fallback for orders without details in mock
        if (order && !order.details?.items) {
            return (
                <div className="text-center py-20">
                    <h2 className="text-xl font-bold">Details not available for this mock order.</h2>
                    <Button variant="ghost" onClick={() => router.back()}>Go Back</Button>
                </div>
            )
        }
        notFound();
    }

    const { items, techRequirements, delivery, supplier, shipTo } = order.details;

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
                        Order {order.id}
                    </h1>
                    <p className="text-sm text-gray-400">
                        Placed on {order.date} by {order.placedBy}
                    </p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Truck className="w-3 h-3 mr-1.5" />
                    {order.status || 'Processing'}
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

                        <div className="space-y-6">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                    {/* Thumbnail Placeholder */}
                                    <div className="w-16 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center flex-shrink-0">
                                        <div className="w-8 h-8 bg-gray-300 rounded opacity-20"></div>
                                    </div>

                                    <div className="flex-grow">
                                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.spec}</p>
                                    </div>

                                    <div className="text-sm font-semibold text-gray-900">
                                        Qty: {item.qty}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical Requirements Check */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Technical Requirements Check</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">IT Approval Status</span>
                                <span className="text-green-600 font-bold">{techRequirements?.approvalStatus}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Standard Compliant</span>
                                <span className="text-gray-900 font-semibold">{techRequirements?.standardCompliant}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Deployment Schedule</span>
                                <span className="text-gray-900 font-semibold">{techRequirements?.deploymentSchedule}</span>
                            </div>
                        </div>
                    </div>

                </div>


                {/* RIGHT COLUMN (1/3) */}
                <div className="space-y-6">

                    {/* Delivery Status */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Delivery Status</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Current Status</span>
                                <span className="text-gray-900 font-semibold text-right">{delivery?.status}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Est. Delivery</span>
                                <span className="text-gray-900 font-semibold text-right">{delivery?.estDelivery}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Carrier</span>
                                <span className="text-gray-900 font-semibold text-right">{delivery?.carrier}</span>
                            </div>
                            <div className="flex justify-between text-sm border-t border-gray-50 pt-3">
                                <span className="text-gray-500 font-medium">Tracking ID</span>
                                <Link href="#" className="text-blue-600 font-bold hover:underline text-right">{delivery?.trackingId}</Link>
                            </div>
                        </div>
                    </div>

                    {/* Supplier Details */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Supplier Details</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Vendor</span>
                                <span className="text-gray-900 font-semibold text-right">{supplier?.vendor}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Verification</span>
                                <span className="text-blue-600 font-bold text-right flex items-center justify-end">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {supplier?.verification}
                                </span>
                            </div>

                            <div className="pt-4 mt-2 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">{supplier?.email}</p>
                                        <p className="text-xs text-gray-400">{supplier?.contactType}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ship To */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Truck className="w-5 h-5 text-gray-500" />
                            <h3 className="text-base font-bold text-gray-900">Ship To</h3>
                        </div>

                        <div className="text-xs text-gray-600 leading-relaxed font-medium">
                            <p className="font-bold text-gray-900 mb-0.5">{shipTo?.department}</p>
                            <p>{shipTo?.attn}</p>
                            <p>{shipTo?.address1}</p>
                            <p>{shipTo?.address2}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
