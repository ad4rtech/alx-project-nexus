'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Shield } from 'lucide-react';

export default function LandingPage() {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-white flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                        {/* Left Content */}
                        <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left pt-6">
                            {/* Badge */}
                            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2" />
                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                    New: IT Admin Dashboard 2.0
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
                                Smart Electronics Procurement for
                                <br className="hidden lg:block" /> Modern Teams
                            </h1>

                            {/* Subheader */}
                            <p className="mt-4 text-base text-gray-500 sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                                Streamline device ordering and asset management. Empower
                                Procurement Managers and IT Administrators with a unified,
                                role-based platform.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                <Link href="/register">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold
                                            bg-blue-600 text-white border-2 border-blue-600
                                            hover:bg-white hover:text-blue-600 transition-all"
                                    >
                                        Get Started Free
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Image (FIXED – NO SKEWING) */}
                        <div className="lg:col-span-6 flex justify-center items-center mt-12 lg:mt-0">
                            <div className="w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
                                {!imageError ? (
                                 <Image
    src="/assets/welcome.png"
    alt="Welcome to ElectroProcure"
    width={900}
    height={600}
    priority
    className="w-full h-auto object-contain"
    onError={() => setImageError(true)}
/>

                                ) : (
                                    <div className="w-full aspect-video bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                        <div className="text-white text-center p-8">
                                            <p className="text-lg font-semibold">
                                                Welcome to ElectroProcure
                                            </p>
                                            <p className="text-sm mt-2 opacity-90">
                                                Smart Procurement Dashboard
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Role Section */}
            <section className="bg-blue-50 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                            Tailored for Your Role
                        </h2>
                        <p className="text-lg text-gray-600">
                            Whether you&apos;re managing budgets or configuring devices, we
                            have the tools you need to succeed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Procurement */}
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <ShoppingCart className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Procurement Managers
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                Create secure accounts, manage vendor relationships, and
                                streamline bulk ordering processes with ease.
                            </p>
                        </div>

                        {/* IT Admin */}
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                IT Administrators
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                Access specialized admin tools, manage device lifecycles,
                                and ensure organizational compliance securely.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
