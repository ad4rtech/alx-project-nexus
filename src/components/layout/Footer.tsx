import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-8 xl:col-span-1">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/electro-procure-logo.png"
                                alt="ElectroProcure"
                                width={120}
                                height={30}
                                priority
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="text-base text-gray-500 max-w-xs">
                            Role-aware electronics procurement for modern organizations.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                    Legal
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li>
                                        <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                                    Connect
                                </h3>
                                <div className="mt-4 flex space-x-4">
                                    <Link href="#" className="text-gray-400 hover:text-gray-500 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <Twitter className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-gray-500 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-gray-500 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <Github className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-gray-400 text-center md:text-left">
                        &copy; {new Date().getFullYear()} ElectroProcure. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
