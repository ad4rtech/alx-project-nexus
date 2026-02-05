'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/business/ProductCard';
import { Search, ChevronDown } from 'lucide-react';
import { products } from '@/lib/data/mockProducts';

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Get unique categories from products
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
        return ['All categories', ...uniqueCategories];
    }, []);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = searchQuery === '' ||
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'All categories' ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

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
                <div className="relative flex-grow max-w-md w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products by name or category"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="relative w-full sm:w-auto">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full sm:w-auto flex items-center justify-between space-x-2 px-4 py-2 border border-gray-200 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <span>{selectedCategory}</span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedCategory === category ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                                            }`}
                                        role="menuitem"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            category={product.category}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-sm">No products found matching your criteria.</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('All categories');
                        }}
                        className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
