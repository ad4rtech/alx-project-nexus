'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TrackingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Assuming ADMIN is the IT Admin role
        if (!loading && user?.role !== 'ADMIN') {
            router.push('/home');
        }
    }, [user, loading, router]);

    if (loading || user?.role !== 'ADMIN') return null;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Technical Tracking</h1>
            <Card>
                <p className="text-gray-600">
                    Real-time telemetry and delivery tracking for orders.
                </p>
                <div className="mt-8 h-64 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    Map / Tracking Module
                </div>
            </Card>
        </div>
    );
}
