import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader } from '../ui/Loader';

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader size="lg" />
            </div>
        );
    }

    // In a real app, redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Not Authenticated (Mock Redirect)
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 focus:outline-none">
                    {children}
                </main>
            </div>
        </div>
    );
};
