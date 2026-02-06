'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollSpy } from '@/lib/hooks/useScrollSpy';

export default function PrivacyPage() {
    const sectionIds = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8'];
    const activeId = useScrollSpy(sectionIds);

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-blue-50 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 font-display mb-2">Privacy Policy</h1>
                <p className="text-gray-500 text-sm">Last Updated: 06/02/2026</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-12">

                {/* Sidebar Navigation */}
                <div className="hidden md:block w-64 shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</h3>
                        <ul className="space-y-3 text-sm border-l border-gray-200">
                            {[
                                '1. Introduction', '2. Info We Collect', '3. How We Use Info', '4. Data Sharing',
                                '5. Data Security', '6. Data Retention', '7. User Rights', '8. Policy Updates'
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={`#section-${idx + 1}`} className={`block pl-4 border-l-2 ${activeId === `section-${idx + 1}` ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grow max-w-3xl space-y-12">

                    <section id="section-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            This Privacy Policy explains how ElectroProcure (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your information when you use our platform. We are committed to ensuring that your data is handled securely and transparently.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            This policy applies to all users of the ElectroProcure platform, including Procurement Managers, IT Administrators, and Organization Representatives.
                        </p>
                    </section>

                    <section id="section-2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                        <h3 className="text-base font-bold text-gray-900 mb-2">a) Account Information</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            To create and maintain your account, we collect necessary details when you register:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                            <li>Full Name and Email Address</li>
                            <li>Job Role (e.g., Procurement Manager, IT Administrator)</li>
                            <li>Company Name and Business Contact Details</li>
                        </ul>

                        <h3 className="text-base font-bold text-gray-900 mb-2">b) Usage Information</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We collect technical data about interactions with platform performance and security:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                            <li>Pages visited and session duration</li>
                            <li>Device type, browser version, and IP address (for security)</li>
                        </ul>

                        <h3 className="text-base font-bold text-gray-900 mb-2">c) Order Information</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            When you place orders, we process transactional data:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Products ordered and quantities</li>
                            <li>Order history and approval records</li>
                            <li>Delivery addresses and fulfillment details</li>
                        </ul>
                    </section>

                    <section id="section-3">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We use the collected data for the following specific purposes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Account Management: To create and authenticate your user account.</li>
                            <li>Order Processing: To fulfill requests and manage transactions.</li>
                            <li>Communication: To send order updates, security alerts, and support responses.</li>
                            <li>Platform Improvement: To analyze usage patterns and optimize user experience.</li>
                        </ul>
                    </section>

                    <section id="section-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Sharing & Disclosure</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We respect your privacy. We do not sell your personal data. We only share information with third parties when necessary for service delivery.
                        </p>
                        {/* Alert Box */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-900 mb-2">Authorized Third Parties</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                                <li>Verified Suppliers: Only necessary order details (items, delivery address) are shared to fulfill purchases.</li>
                                <li>Logistics Partners: Contact and address information is shared with shipping providers.</li>
                                <li>Legal Authorities: We may disclose data if required by law or valid legal process.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="section-5">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We implement robust technical and organizational measures to protect your data from unauthorized access, loss, or misuse:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Secure session-based authentication (JWT method)</li>
                            <li>Encrypted data storage and transmission</li>
                            <li>Role-based access controls within organizations</li>
                        </ul>
                    </section>

                    <section id="section-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-4">
                            <li>Active Accounts: Active until you request account removal.</li>
                            <li>Order Records: Transaction history is retained for auditing, tax, and legal compliance purposes even after account closure.</li>
                        </ul>
                    </section>

                    <section id="section-7">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">7. User Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Depending on your jurisdiction, you have specific rights regarding your data:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Right to Access: Request a copy of the personal data we hold about you.</li>
                            <li>Right to Correction: Request correction of inaccurate or incomplete information.</li>
                            <li>Right to Deletion: Request deletion of your personal data, subject to legal retention obligations.</li>
                        </ul>
                    </section>

                    <section id="section-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">8. Policy Updates</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Updated versions will be posted on this page with a revised &quot;Last Updated&quot; date.
                        </p>

                        {/* Contact Alert Box */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-900 mb-2">Contact Us</h4>
                            <p className="text-sm text-gray-600">
                                If you have questions about this policy, please contact our Data Protection Officer at privacy@electroprocure.com
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
