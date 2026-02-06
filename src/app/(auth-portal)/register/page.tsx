'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/context/ToastContext';

export default function RegisterPage() {
    const router = useRouter();
    const { signup } = useAuth();
    const { showToast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            showToast('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        setIsLoading(true);
        try {
            await signup(email, password, name, 'BUYER');
            showToast('Account created successfully! Redirecting to login...', 'success');
            // Redirect after showing toast
            setTimeout(() => router.push('/login?registered=true'), 2000);
       } catch (err: unknown) {
    let errorMessage = 'Registration failed. Please try again.';

    if (err instanceof Error) {
        errorMessage = err.message;
    }

    setError(errorMessage);
    showToast(errorMessage, 'error');
}
finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 font-display">
                    Create Account
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Join as a Procurement Manager to start ordering equipment
                </p>
            </div>

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

            {/* Role Badge */}
            <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Procurement Manager Account</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        label="Work Email"
                        type="email"
                        placeholder="manager@techco.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="mt-2">
                        <Checkbox
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            label="Show password"
                        />
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 6 characters</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start gap-2">
                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </div>

                <p className="mt-6 text-xs text-center text-gray-400">
                    By joining, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </p>
            </form>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                    <strong>IT Administrators:</strong> Please contact your system administrator for access credentials.
                </p>
            </div>
        </div>
    );
}
