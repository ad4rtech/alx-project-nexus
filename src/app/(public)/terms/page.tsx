import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-blue-50 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 font-display mb-2">Terms of Service</h1>
                <p className="text-gray-500 text-sm">Last Updated: October 24, 2025</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">

                {/* Sidebar Navigation - Sticky */}
                <div className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</h3>
                        <ul className="space-y-3 text-sm border-l border-gray-200">
                            {[
                                '1. Introduction', '2. Eligibility', '3. User Roles', '4. Use of Platform',
                                '5. Orders & Transactions', '6. Suppliers', '7. Delivery & Warranty',
                                '8. Intellectual Property', '9. Termination', '10. Changes to Terms'
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={`#section-${idx + 1}`} className={`block pl-4 border-l-2 ${idx === 0 ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow max-w-3xl space-y-12">

                    <section id="section-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction & Acceptance</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Welcome to ElectroProcure. These Terms of Service ("Terms") govern your access to and use of our procurement platform and services.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing, registering for, or using ElectroProcure, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.
                        </p>
                    </section>

                    <section id="section-2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Eligibility & Accounts</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            You must be authorized to act on behalf of your organization to create an account. By registering, you represent that all information provided is accurate, current, and complete.
                        </p>

                        {/* Alert Box */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-900 mb-2">Account Security</h4>
                            <p className="text-sm text-gray-500">
                                You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
                            </p>
                        </div>
                    </section>

                    <section id="section-3">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Roles & Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Our platform distinguishes between different user roles, each with specific permissions and responsibilities:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                            <li><strong className="text-gray-900">Procurement Managers:</strong> Responsible for creating profiles, placing orders, and managing organizational budgets.</li>
                            <li><strong className="text-gray-900">IT Administrators:</strong> Responsible for reviewing technical specifications, tracking deployments, and managing inventory requests.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed">
                            Users must only access features relevant to their assigned role and authorized duties.
                        </p>
                    </section>

                    <section id="section-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Use of the Platform</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You agree to use the platform only for lawful business purposes. You are strictly prohibited from:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Misusing the platform to defraud or mislead the company.</li>
                            <li>Attempting to gain unauthorized access to other users' accounts or data.</li>
                            <li>Engaging in data scraping, reverse engineering, or burdening our infrastructure.</li>
                        </ul>
                    </section>

                    <section id="section-5">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. Orders & Transactions</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            All orders placed through ElectroProcure are binding offers to purchase. Confirmation of receipt does not constitute final acceptance of an order.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li><strong className="text-gray-900">Availability:</strong> Products and prices are subject to change without notice based on supplier inventory.</li>
                            <li><strong className="text-gray-900">State Orders:</strong> Incomplete orders remain open indefinitely pending clarification before processing.</li>
                            <li><strong className="text-gray-900">Accuracy:</strong> While we strive for accuracy, we do not warrant that product descriptions or prices are error-free.</li>
                        </ul>
                    </section>

                    {/* ... Additional Sections Simplified for brevity but following structure ... */}
                    <section id="section-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. Suppliers & Third Parties</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ElectroProcure acts as an intermediary connecting authorized buyers with verified electronics suppliers. We ensure the minimum standard of supplier quality. However, suppliers are responsible for product quality, safety, and regulatory compliance.
                        </p>
                    </section>

                    <section id="section-7">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">7. Delivery, Warranty & Returns</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            <strong className="text-gray-900">Delivery:</strong> Estimated delivery dates are provided for convenience and are not guaranteed. Delays may occur due to supplier logistics or external factors.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            <strong className="text-gray-900">Warranty:</strong> Warranty terms are governed strictly by the manufacturer or supplier. Please refer to individual product pages for specific warranty details.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Returns and cancellations are subject to the supplier's terms. Please contact support for assistance with returns or replacements.
                        </p>
                    </section>

                    <section id="section-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The ElectroProcure platform, including its code, design, logos, and content, is the exclusive property of ElectroProcure. You are granted a limited, non-exclusive license to use the platform for its intended business purpose.
                        </p>
                    </section>

                    <section id="section-9">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">9. Termination & Suspension</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to suspend or terminate your account at our sole discretion, without notice, if we believe you have violated these Terms or pose a security risk to the platform.
                        </p>
                    </section>

                    <section id="section-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update these Terms from time to time. The most current version will always be posted on this page. By continuing to use the platform after changes become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
