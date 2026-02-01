'use client';

import React from 'react';
import { ProductCard } from '@/components/business/ProductCard';
import { Search, ChevronDown } from 'lucide-react';
import { products } from '@/lib/data/mockProducts';

export default function ProductsPage() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Electronics Catalog
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Browse and search for approved equipment for your organization.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products by name or category"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="relative">
                    <button className="w-full sm:w-auto flex items-center justify-between space-x-2 px-4 py-2 border border-gray-200 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>All categories</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        category={product.category}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="py-8 flex items-center justify-center space-x-2">
                <button className="px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 rounded-md hover:bg-gray-50 disabled:opacity-50">
                    Previous
                </button>
                <span className="text-sm text-gray-500 font-medium px-2">Page 1 of 5</span>
                <button className="px-4 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 shadow-sm">
                    Next
                </button>
            </div>
        </div>
    );
}
