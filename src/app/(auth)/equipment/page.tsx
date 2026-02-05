'use client';

import React, { useState, useEffect } from 'react';
import { ITAdminProductCard } from '@/components/business/ITAdminProductCard';
import { Search } from 'lucide-react';
import { fetchProducts, Product } from '@/lib/actions/products';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function EquipmentPage() {
    const { user, loading } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!loading) {
            loadProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const loadProducts = async () => {
        setLoadingProducts(true);
        const result = await fetchProducts();
        if (result.products) {
            setProducts(result.products);
        }
        setLoadingProducts(false);
    };

    // RBAC Protection - return null early to prevent flash
    if (loading || loadingProducts) {
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                    .filter(product =>
                        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((product) => (
                        <ITAdminProductCard
                            key={product.id}
                            id={parseInt(product.id)}
                            category={product.category}
                            title={product.name}
                            features={product.features}
                            warranty={product.warranty || 'Standard Warranty'}
                            image={product.image_url}
                        />
                    ))}
            </div>

            {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && searchQuery && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
}
