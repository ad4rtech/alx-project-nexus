'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/context/ToastContext';
import { Shield, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type LoginMode = 'BUYER' | 'ADMIN';

// Component that uses searchParams - must be wrapped in Suspense
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const { showToast } = useToast();

    const [loginMode, setLoginMode] = useState<LoginMode>('BUYER');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // IT Admin credentials (autofilled)
    const IT_ADMIN_NAME = 'TechSource Solutions';
    const IT_ADMIN_EMAIL = 'sales@techsourcesolutions.com';

    useEffect(() => {
        const registered = searchParams.get('registered');
        if (registered === 'true') {
            // Small delay to ensure ToastProvider is ready
            setTimeout(() => {
                showToast('Account created successfully! Please log in with your credentials.', 'success');
            }, 100);
        }
    }, [searchParams, showToast]);

    // Autofill IT Admin credentials when switching to ADMIN mode
    useEffect(() => {
        if (loginMode === 'ADMIN') {
            setName(IT_ADMIN_NAME);
            setEmail(IT_ADMIN_EMAIL);
            setPassword(''); // Password must be manually entered
        } else {
            setName('');
            setEmail('');
            setPassword('');
        }
    }, [loginMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            showToast('Please enter both email and password', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const authUser = await login(email, password);
            showToast('Welcome back! Login successful!', 'success');

            // Immediate redirect based on role
            router.push('/home');
        } catch (err: any) {
            const errorMessage = err.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            showToast(errorMessage, 'error');
            setIsLoading(false); // Only reset loading on error
        }
    };

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

            <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-6">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Login as...</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setLoginMode('BUYER')}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 border rounded-xl transition-all",
                                    loginMode === 'BUYER'
                                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600"
                                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600"
                                )}
                            >
                                <ShoppingCart className={cn("h-6 w-6 mb-2", loginMode === 'BUYER' ? "text-blue-600" : "text-gray-400")} />
                                <span className="text-xs font-semibold">Procurement Manager</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setLoginMode('ADMIN')}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 border rounded-xl transition-all",
                                    loginMode === 'ADMIN'
                                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600"
                                        : "border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600"
                                )}
                            >
                                <Shield className={cn("h-6 w-6 mb-2", loginMode === 'ADMIN' ? "text-blue-600" : "text-gray-400")} />
                                <span className="text-xs font-semibold">IT Administrator</span>
                            </button>
                        </div>
                    </div>

                    {/* Full Name Field - Only for IT Admin */}
                    {loginMode === 'ADMIN' && (
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder={IT_ADMIN_NAME}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={true}
                            required
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    )}

                    {/* Email Field */}
                    <Input
                        label="Work Email"
                        type="email"
                        placeholder={loginMode === 'BUYER' ? "manager@techco.com" : IT_ADMIN_EMAIL}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loginMode === 'ADMIN'}
                        required
                        className={loginMode === 'ADMIN' ? 'bg-gray-100 cursor-not-allowed' : ''}
                    />

                    {/* Password Field */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            {loginMode === 'BUYER' && (
                                <Link href="#" className="text-xs text-blue-500 hover:text-blue-600">Forgot password?</Link>
                            )}
                        </div>
                        <Input
                            type="password"
                            placeholder={loginMode === 'ADMIN' ? "Enter: TechSource" : "••••••••••••"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {loginMode === 'ADMIN' && (
                            <p className="text-xs text-gray-500 mt-1">
                                Password: <span className="font-mono font-semibold">TechSource</span>
                            </p>
                        )}
                    </div>

                    {loginMode === 'BUYER' && (
                        <div className="flex items-center">
                            <Checkbox id="remember-me" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                                Keep me logged in for this session
                            </label>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 shadow-md"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? 'Signing in...'
                            : loginMode === 'ADMIN'
                                ? 'Sign in as IT Administrator'
                                : 'Sign In'
                        }
                    </Button>
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
                    By clicking continue, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </p>
            </form>
        </div>
    );
}

// Main component with Suspense wrapper
export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading...</div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
