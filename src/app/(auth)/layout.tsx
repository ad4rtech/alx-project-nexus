'use client';

import { AuthenticatedNavbar } from '@/components/layout/AuthenticatedNavbar';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader } from '@/components/ui/Loader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) return null; // Or a specific redirecting state

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <AuthenticatedNavbar />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
