import React from 'react';
import { adminOrders } from '@/lib/data/mockAdminOrders';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const ITAdminOrdersTable = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Company / Department</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {adminOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <Link href={`/orders/${encodeURIComponent(order.id)}`} className="text-sm font-bold text-blue-600 hover:text-blue-800">
                                        {order.id}
                                    </Link>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                                            <order.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">
                                            {order.department}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                                    {order.date}
                                </td>
                                <td className="px-6 py-6 whitespace-nowrap text-right">
                                    <Button variant="ghost" size="sm" className="h-8 px-4 text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 rounded">
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
