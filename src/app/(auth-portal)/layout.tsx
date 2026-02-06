import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function AuthPortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Dark Branding Area */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative flex-col justify-between p-12 overflow-hidden">
                {/* Background Pattern/Overlay */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute inset-0 z-0 bg-linear-to-br from-gray-900 to-blue-900 opacity-90"></div>

                {/* Checkerboard Pattern Placeholder */}
                <div className="absolute inset-0 z-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                  <Image
    src="/assets/electro-procure-logo.png"
    alt="ElectroProcure"
    width={160}
    height={40}
    priority
    className="h-10 w-auto"
/>

                </div>

                {/* Quote */}
                <div className="relative z-10 max-w-lg">
                    <blockquote className="text-2xl font-medium text-white leading-relaxed font-display">
                        &quot;Streamline your organization&apos;s electronics procurement with role-based access control and secure ordering workflows.&quot;
                    </blockquote>
                    <p className="mt-4 text-sm text-gray-400 font-sans">
                        Designed for Procurement Managers & IT Administrators
                    </p>
                </div>
            </div>

            {/* Right Side - Form Area */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white w-full lg:w-1/2 relative">
                {/* Top Right Help Link */}
                <div className="absolute top-8 right-8 hidden sm:block">
                    <Link href="/help" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
                        Help & Support
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {children}
                </div>
            </div>
        </div>
    );
}
