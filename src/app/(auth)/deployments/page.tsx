'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { pendingDeployments, historyDeployments } from '@/lib/data/mockDeployments';

export default function DeploymentsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Protect Route
    React.useEffect(() => {
        if (!loading && user?.role !== 'ADMIN') {
            router.push('/home');
        }
    }, [user, loading, router]);

    if (loading || user?.role !== 'ADMIN') return null;

    return (
        <div className="space-y-10 pb-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-display">
                        Device Deployment
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage device assignments and track deployment history across the organization.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 font-semibold px-6">
                    New Deployment Plan
                </Button>
            </div>

            {/* Pending Deployments Table */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Deployments</h2>
                <div className="bg-white rounded-lg border border-blue-100 overflow-hidden shadow-sm">
                    <table className="min-w-full">
                        <thead className="bg-blue-50 border-b border-blue-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Device</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Target Location</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Assigned Team</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-blue-800 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingDeployments.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">{item.device}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">Tag: {item.tag}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">{item.location}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">{item.team}</td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right">
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs px-4 h-8">
                                            Deploy
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Deployment History Table */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Deployment History</h2>
                <div className="bg-white rounded-lg border border-blue-100 overflow-hidden shadow-sm">
                    <table className="min-w-full">
                        <thead className="bg-blue-50 border-b border-blue-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Device</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Deployed Location</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Assigned Team</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-blue-800 uppercase tracking-wider">Date Deployed</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-blue-800 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyDeployments.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">{item.device}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">Tag: {item.tag}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">{item.location}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">{item.team}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">{item.date}</td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-sm">
                                            {item.status}
                                        </span>
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
