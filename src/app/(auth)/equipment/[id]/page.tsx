'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { products } from '@/lib/data/mockProducts';
import { ChevronLeft, Monitor, Cpu, HardDrive, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function EquipmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);
    const { user, loading } = useAuth();
    const router = useRouter();

    if (!product) {
        notFound();
    }

    // Protect route styling
    if (!loading && user?.role !== 'ADMIN') {
        // Optional: redirect or just render standard layou
        // For strictness, let's keep it accessible but visual style is IT Admin
    }

    const breadcrumbs = [
        { name: 'Products', href: '/equipment' },
        { name: product.category, href: '#' },
        { name: product.title, href: '#' },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-xs text-gray-500 font-medium">
                <button onClick={() => router.back()} className="mr-4 flex items-center hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    Global Back
                </button>
                {breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={crumb.name}>
                        {idx > 0 && <span className="mx-2 text-gray-300">/</span>}
                        {idx === breadcrumbs.length - 1 ? (
                            <span className="text-gray-900 font-semibold">{crumb.name}</span>
                        ) : (
                            <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                                {crumb.name}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Product Image (Large) */}
                <div className="bg-white rounded-lg border border-gray-100 p-8 shadow-sm">
                    <div className="aspect-[4/3] w-full bg-gray-50 rounded-lg relative overflow-hidden flex items-center justify-center">
                        {/* Placeholder for Next/Image */}
                        <div className="w-full h-full bg-gray-200 rounded opacity-20 transform scale-90"></div>
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}></div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="space-y-8">
                    {/* Header Info */}
                    <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                            {product.category === 'Laptops' ? 'BUSINESS LAPTOP' : product.category.toUpperCase()}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
                            {product.title}
                        </h1>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-sm text-gray-400 font-medium">
                                / unit (Corporate Pricing)
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                        {product.description}
                    </p>

                    {/* Tech Specs Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Cpu className="w-5 h-5 text-blue-600" />
                            <h3 className="text-base font-bold text-gray-900">Technical Specifications</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Processor</h4>
                                <p className="text-sm font-medium text-gray-900">{product.specs.processor}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Memory</h4>
                                <p className="text-sm font-medium text-gray-900">{product.specs.memory}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Storage</h4>
                                <p className="text-sm font-medium text-gray-900">{product.specs.storage}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Display</h4>
                                <p className="text-sm font-medium text-gray-900">
                                    {(product.specs as any).display || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Graphics</h4>
                                <p className="text-sm font-medium text-gray-900">{product.specs.graphics}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Operating System</h4>
                                <p className="text-sm font-medium text-gray-900">{product.specs.os}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Battery</h4>
                                <p className="text-sm font-medium text-gray-900">
                                    {(product.specs as any).battery || 'Standard Cell'}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-400 mb-1">Weight</h4>
                                <p className="text-sm font-medium text-gray-900">
                                    {(product.specs as any).weight || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Warranty Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                            <h3 className="text-base font-bold text-gray-900">Warranty & Support</h3>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed mb-4">
                            {(product as any).warrantyDescription || 'Includes standard manufacturer warranty.'}
                        </p>
                        <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-1">Support Provider</h4>
                            <p className="text-sm font-medium text-gray-900">
                                {(product as any).supportProvider || 'Manufacturer Support'}
                            </p>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                            <Printer className="w-4 h-4" />
                            Print Specs
                        </Button>
                        <Button variant="outline" onClick={() => router.push('/equipment')} className="flex-[2] flex items-center justify-center border-gray-200 text-gray-700 hover:bg-gray-50">
                            Return to Catalog
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
