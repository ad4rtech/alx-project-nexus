'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        // Optional: redirect or just render standard layout
        // For strictness, let's keep it accessible but visual style is IT Admin
    }

    const breadcrumbs = [
        { name: 'Products', href: '/equipment' },
        { name: product.category, href: '#' },
        { name: product.title, href: '#' },
    ];

    // Get all specs as an array of key-value pairs
    const specs = product.specs || {};
    const specEntries = Object.entries(specs);

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
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain p-8"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <>
                                <div className="w-full h-full bg-gray-200 rounded opacity-20 transform scale-90"></div>
                                <div className="absolute inset-0 opacity-5" style={{
                                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}></div>
                            </>
                        )}
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

                    {/* Tech Specs Card - Dynamic */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Cpu className="w-5 h-5 text-blue-600" />
                            <h3 className="text-base font-bold text-gray-900">Technical Specifications</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                            {specEntries.map(([key, value]) => (
                                <div key={key}>
                                    <h4 className="text-xs font-semibold text-gray-400 mb-1 capitalize">{key}</h4>
                                    <p className="text-sm font-medium text-gray-900">{value}</p>
                                </div>
                            ))}
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
