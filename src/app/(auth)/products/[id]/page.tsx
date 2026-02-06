'use client';

import React, { use } from 'react';
import { Button } from '@/components/ui/Button';
import { SupplierSidebar } from '@/components/business/SupplierSidebar';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { products } from '@/lib/data/mockProducts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';
import { useToast } from '@/lib/context/ToastContext';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);
    const { addItem } = useCart();
    const { showToast } = useToast();

    if (!product) {
        notFound();
    }

    // Fallback specs 
    const specs = product.specs || {
        processor: 'N/A',
        os: 'N/A',
        graphics: 'N/A',
        memory: 'N/A',
        storage: 'N/A'
    };

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            sku: product.model || `PROD-${product.id}`,
            price: product.price,
            image: product.image
        });
        showToast(`${product.title} added to cart!`, 'success');
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 space-x-2">
                <Link href="/products" className="hover:text-gray-900">Products</Link>
                <ChevronRight className="h-4 w-4 text-gray-300" />
                <span>{product.category}</span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
                <span className="text-gray-900 font-medium">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-display mb-2">
                            Product Details
                        </h1>
                        <p className="text-sm text-gray-500">
                            Review specifications, warranty, and supplier details before ordering.
                        </p>
                    </div>

                    {/* Product Header Card */}
                    <div className="bg-white rounded-lg p-6 border border-gray-100 flex flex-col md:flex-row gap-8">
                        {/* Product Image Area */}
                        <div className="w-full md:w-1/2 bg-gray-50 rounded-lg aspect-square border border-gray-100 relative overflow-hidden">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-8"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                    No image available
                                </div>
                            )}
                        </div>

                        {/* Info Area */}
                        <div className="w-full md:w-1/2 flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                {product.title}
                            </h2>
                            <div className="flex items-center gap-4 mt-4 text-sm">
                                <span className="text-gray-500">Model: {product.model || 'N/A'}</span>
                                <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-xs">In Stock</span>
                            </div>

                            <div className="mt-6">
                                <span className="text-3xl font-bold text-blue-600">
                                    KSh {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                            <p className="mt-6 text-gray-500 text-sm leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specs - Dynamically rendered if available, else static placeholders or hidden */}
                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-base font-bold text-gray-900">Technical Specifications</h3>
                        </div>
                        <div className="p-6 space-y-4 text-sm">
                            {/* Render specs map */}
                            {Object.entries(specs).map(([key, value]) => (
                                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0 capitalize">
                                    <dt className="text-gray-400 font-medium">{key}</dt>
                                    <dd className="sm:col-span-2 text-gray-900 font-medium text-right sm:text-right">{value}</dd>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warranty Info */}
                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-base font-bold text-gray-900">Warranty Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm font-bold text-gray-900">{product.warranty}</span>
                                {product.supportProvider && (
                                    <span className="text-xs text-gray-500">• {product.supportProvider}</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {product.warrantyDescription ||
                                    `This product comes with ${product.warranty} warranty coverage. For detailed warranty terms and conditions, please contact our support team.`}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Sidebar - Right Column */}
                <div className="lg:col-span-1 space-y-6">
                    <SupplierSidebar />
                </div>

            </div>
        </div>
    );
}
