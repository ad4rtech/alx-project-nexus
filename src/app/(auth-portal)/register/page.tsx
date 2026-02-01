'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShoppingCart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function RegisterPage() {
    const [role, setRole] = useState<'BUYER' | 'ADMIN'>('BUYER');

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 font-display">
                    Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Join ElectroProcure to start managing orders
                </p>
            </div>

            {/* Toggle */}
            <div className="bg-gray-50 p-1 rounded-lg flex">
                <Link href="/login" className="flex-1">
                    <button className="w-full py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all text-center">
                        Log In
                    </button>
                </Link>
                <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm transition-all text-center border-gray-200 border">
                    Sign Up
                </button>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setRole('BUYER')}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 border rounded-xl transition-all",
                            role === 'BUYER'
                                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600"
                                : "border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600"
                        )}
                    >
                        <ShoppingCart className={cn("h-6 w-6 mb-2", role === 'BUYER' ? "text-blue-600" : "text-gray-400")} />
                        <span className="text-xs font-semibold">Procurement Manager</span>
                    </button>

                    <button
                        onClick={() => setRole('ADMIN')}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 border rounded-xl transition-all",
                            role === 'ADMIN'
                                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600"
                                : "border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600"
                        )}
                    >
                        <Shield className={cn("h-6 w-6 mb-2", role === 'ADMIN' ? "text-blue-600" : "text-gray-400")} />
                        <span className="text-xs font-semibold">IT Administrator</span>
                    </button>
                </div>
            </div>

            <div className="mt-2 space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Jane Doe"
                />
                <Input
                    label="Work Email"
                    type="email"
                    placeholder="manager@techco.com"
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••••••"
                />

                <Link href="/home">
                    <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 shadow-md">
                        Create Account
                    </Button>
                </Link>
            </div>

            <p className="mt-6 text-xs text-center text-gray-400">
                By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}
