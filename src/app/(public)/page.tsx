import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Shield, Lock, Play, CheckCircle } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="bg-white flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16">

                        {/* Left Content */}
                        <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left pt-6">
                            {/* Badge */}
                            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                                    New: IT Admin Dashboard 2.0
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl font-display mb-6">
                                Smart Electronics Procurement for <br className="hidden lg:block" /> Modern Teams
                            </h1>

                            {/* Subheader */}
                            <p className="mt-4 text-base text-gray-500 sm:text-lg lg:text-xl font-sans leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                                Streamline device ordering and asset management. Empower Procurement Managers and IT Administrators with a unified, role-based platform.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                <Link href="/register">
                                    <Button size="lg" className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link href="/features">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold flex items-center justify-center gap-2">
                                        <Play className="h-4 w-4" />
                                        View Demo
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Signals */}
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>14-day free trial</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Image / Placeholder */}
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md overflow-hidden bg-gray-100 aspect-square flex items-center justify-center border border-gray-200">
                                {/* Checkerboard / Transparent BG placeholder style from mockup */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="grid grid-cols-2 gap-2 p-4 w-full h-full opacity-50">
                                    <div className="bg-white rounded h-full"></div>
                                    <div className="bg-white rounded h-full"></div>
                                    <div className="bg-white rounded h-full"></div>
                                    <div className="bg-white rounded h-full"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Role Section */}
            <section className="bg-blue-50 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display mb-4">
                            Tailored for Your Role
                        </h2>
                        <p className="text-lg text-gray-600">
                            Whether you're managing budgets or configuring devices, we have the tools you need to succeed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <ShoppingCart className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Procurement Managers</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Create secure accounts, manage vendor relationships, and streamline bulk ordering processes with ease.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">IT Administrators</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Access specialized admin tools, manage device lifecycles, and ensure organizational compliance securely.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <Lock className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Security</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Built with industry-leading security standards. Your data is encrypted, backed up, and protected 24/7.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
