'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';

export default function LoginPage() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 font-display">
                    Welcome back
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Enter your credentials to access the platform
                </p>
            </div>

            {/* Toggle */}
            <div className="bg-gray-50 p-1 rounded-lg flex">
                <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm transition-all text-center border-gray-200 border">
                    Log In
                </button>
                <Link href="/register" className="flex-1">
                    <button className="w-full py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all text-center">
                        Sign Up
                    </button>
                </Link>
            </div>

            <div className="mt-8">
                <div className="space-y-6">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="manager@techco.com"
                    />

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Link href="#" className="text-xs text-blue-500 hover:text-blue-600">Forgot password?</Link>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••••••"
                        />
                    </div>

                    <div className="flex items-center">
                        <Checkbox id="remember-me" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                            Keep me logged in for this session
                        </label>
                    </div>

                    <Link href="/home">
                        <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 shadow-md">
                            Sign In
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative get-center text-sm">
                        <span className="bg-white px-2 text-gray-300 text-xs uppercase tracking-widest mx-auto block text-center w-max">Secure Access</span>
                    </div>
                </div>

                <p className="mt-8 text-xs text-center text-gray-400">
                    By clicking continue, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
