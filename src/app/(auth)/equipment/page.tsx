'use client';

import React from 'react';
import { ITAdminProductCard } from '@/components/business/ITAdminProductCard';
import { Search } from 'lucide-react';
import { products } from '@/lib/data/mockProducts';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function EquipmentPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Protect route - Redirect if not admin
    React.useEffect(() => {
        if (!loading && user?.role !== 'ADMIN') {
            router.push('/products');
        }
    }, [user, loading, router]);

    if (loading || user?.role !== 'ADMIN') return null;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Equipment Catalog
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Review technical specifications and warranty details for organization-approved electronics.
                </p>
            </div>

            {/* IT Admin Toolbar: Simplified, Right Aligned Search */}
            <div className="w-full flex justify-end">
                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products by name or spec..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ITAdminProductCard
                        key={product.id}
                        id={product.id}
                        category={product.category}
                        title={product.title}
                        features={product.features}
                        warranty={product.warranty}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="py-8 flex items-center justify-center space-x-2">
                <button className="px-3 py-2 border border-gray-200 bg-white text-xs font-semibold text-gray-500 rounded hover:bg-gray-50 disabled:opacity-50">
                    &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white text-xs font-bold rounded">
                    1
                </button>
                <button className="px-3 py-2 border border-gray-200 bg-white text-xs font-semibold text-gray-500 rounded hover:bg-gray-50 shadow-sm">
                    &gt;
                </button>
            </div>
        </div>
    );
}
