'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollSpy } from '@/lib/hooks/useScrollSpy';

// Reusable Help Card Component
const HelpCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>
        <div className="text-sm text-gray-600 space-y-2">
            {children}
        </div>
    </div>
);

export default function HelpPage() {
    const categoryIds = ['cat-0', 'cat-1', 'cat-2', 'cat-3', 'cat-4', 'cat-5'];
    const activeId = useScrollSpy(categoryIds);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-blue-50 py-16 text-center px-4">
                <h1 className="text-4xl font-bold text-gray-900 font-display mb-4">Help & Support</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Browse guides, find answers to common questions, and get in touch with our support team.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">

                {/* Sidebar Navigation */}
                <div className="hidden md:block w-48 shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
                        <ul className="space-y-3 text-sm font-medium text-gray-500">
                            {[
                                'Getting Started', 'Login & Account', 'Ordering', 'Tracking & Delivery',
                                'Products & Suppliers', 'Contact Support'
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={`#cat-${idx}`} className={`block hover:text-blue-600 transition-colors ${activeId === `cat-${idx}` ? 'text-blue-600 font-bold' : ''}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content Info */}
                <div className="grow space-y-12">

                    {/* Category: Getting Started */}
                    <section id="cat-0">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-blue-100"></div> {/* Icon Placeholder */}
                            <h2 className="text-xl font-bold text-gray-900">Getting Started</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <HelpCard title="Creating an Account">
                                <p>Register with your work email to get started. Select your role carefully as it determines your permissions.</p>
                            </HelpCard>
                            <HelpCard title="Choosing Your Role">
                                <p><strong className="text-gray-900">Procurement Manager:</strong> For buying and budget oversight.</p>
                                <p><strong className="text-gray-900">IT Administrator:</strong> For technical specs and asset management.</p>
                            </HelpCard>
                        </div>

                        {/* Full Width FAQ Card */}
                        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">How do I register my company?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Use the Sign Up page and select &quot;Create Organization Profile&quot; during onboarding.
                            </p>
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Which flow should I choose?</h3>
                            <p className="text-sm text-gray-600">
                                If you approve purchases, choose <strong>Procurement Manager</strong>. If you manage device specs, choose <strong>IT Admin</strong>.
                            </p>
                        </div>
                    </section>

                    {/* Category: Login & Account */}
                    <section id="cat-1" className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-blue-100"></div>
                            <h2 className="text-xl font-bold text-gray-900">Login & Account Issues</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <HelpCard title="Secure Login">
                                <p>We use secure session-based authentication. Passwords must be at least 6 characters with mixed case and symbols.</p>
                            </HelpCard>
                            <HelpCard title="Session Timeout">
                                <p>For security, sessions expire after 24 hours of inactivity. You will need to re-authenticate to continue.</p>
                            </HelpCard>
                        </div>
                        {/* FAQ list style */}
                        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    Forgot my password - what do I do?
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-50 text-yellow-700 uppercase tracking-wide border border-yellow-200">Future Feature</span>
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">Click &quot;Forgot Password&quot; on the login screen. We&apos;ll send a reset link to your registered email.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Why can&apos;t I see order history?</h3>
                                <p className="text-sm text-gray-600 mt-1">Some data is restricted by role. E.g., Only Procurement Managers can see billing history.</p>
                            </div>
                        </div>
                    </section>

                    {/* Category: Ordering */}
                    <section id="cat-2" className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-blue-100"></div>
                            <h2 className="text-xl font-bold text-gray-900">Ordering & Procurement</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <HelpCard title="Placing Orders">
                                <p>Browse the catalog, add items to your cart, and proceed to checkout. You can adjust quantities and bulk-purchase directly within cart.</p>
                            </HelpCard>
                            <HelpCard title="Approval Process">
                                <p>Orders over $5,000 may require secondary approval from your organization&apos;s admin before processing.</p>
                            </HelpCard>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">How do I place a bulk order?</h3>
                                <p className="text-sm text-gray-600 mt-1">In the product view, enter the desired quantity before adding to cart, or update in the cart summary.</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Can I edit an order after placing it?</h3>
                                <p className="text-sm text-gray-600 mt-1">Orders can only be edited while in &apos;Pending&apos; status. Contact support immediately for changes.</p>
                            </div>
                        </div>
                    </section>

                    {/* Category: Tracking */}
                    <section id="cat-3" className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-blue-100"></div>
                            <h2 className="text-xl font-bold text-gray-900">Orders, Delivery & Tracking</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <HelpCard title="Understanding Statuses">
                                <p><strong>Pending:</strong> Order received.<br /><strong>Shipped:</strong> Handed to courier.<br /><strong>Delivered:</strong> Arrived at your facility.</p>
                            </HelpCard>
                            <HelpCard title="Fulfillment">
                                <p>Orders are fulfilled directly by our verified suppliers. Tracking numbers are provided once shipped.</p>
                            </HelpCard>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900">How do I track an order?</h3>
                            <p className="text-sm text-gray-600 mt-1">Go to &apos;Orders&apos; board, select your order, and click the tracking number link.</p>
                        </div>
                    </section>

                    {/* Category: Product */}
                    <section id="cat-4" className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-blue-100"></div>
                            <h2 className="text-xl font-bold text-gray-900">Product & Supplier Info</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <HelpCard title="Verified Suppliers">
                                <p>The &quot;Verified Supplier&quot; badge indicates they have passed our strict business verification standards.</p>
                            </HelpCard>
                            <HelpCard title="Warranty">
                                <p>All electronics come with standard manufacturer warranty. Extended options are available on product pages.</p>
                            </HelpCard>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900">Where can I see technical details?</h3>
                            <p className="text-sm text-gray-600 mt-1">If you are an IT Admin, the &quot;Specs&quot; tab on product pages contains full technical usage.</p>
                        </div>
                    </section>

                    {/* Category: Contact */}
                    <section id="cat-5" className="pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded bg-blue-100"></div>
                            <h2 className="text-xl font-bold text-gray-900">Contact Support</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Email Support</h3>
                                <p className="text-sm text-blue-600 font-medium mb-1">support@electroprocure.com</p>
                                <p className="text-xs text-gray-500">Response time: Within 24 hours</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Support Hours</h3>
                                <p className="text-sm text-gray-700 font-medium mb-1">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                                <p className="text-xs text-gray-500">Global support teams handle priority.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
