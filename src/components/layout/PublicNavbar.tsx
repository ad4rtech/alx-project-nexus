import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import Image from 'next/image';


export const PublicNavbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-28 items-center">
                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                           <Image
                                                              src="/assets/electro-procure-logo.png"
                                                              alt="ElectroProcure"
                                                              width={160}
                                                              height={40}
                                                              priority
                                                              className="h-10 w-auto"
                                                          />
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                            Log in
                        </Link>
                        <Link href="/register">
                            <Button size="md" className="px-5 font-semibold bg-blue-600 hover:bg-blue-700">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
