'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCart } from '@/lib/context/CartContext';
import { cn } from '@/lib/utils/cn';
import { Button } from '../ui/Button';
import { ShoppingCart, User } from 'lucide-react';

export const AuthenticatedNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const role = user?.role;

    const isActive = (href: string) => pathname === href || pathname.startsWith(href);

    // Common links
    const links = [
        { name: 'Home', href: '/home' },
        // Conditional Catalog Link
        ...(role === 'ADMIN'
            ? [{ name: 'Catalog', href: '/equipment' }]
            : [{ name: 'Products', href: '/products' }]
        ),
        { name: 'Orders', href: '/orders' },
    ];

    // Role display mapping
    const roleDisplay = role === 'ADMIN' ? 'IT Administrator' : role === 'APPROVER' ? 'Approver' : 'Procurement Manager';
    const roleBadgeInitial = role === 'ADMIN' ? 'IT' : role === 'APPROVER' ? 'AP' : 'PM';

    // Specific links
    if (role === 'BUYER' || role === 'APPROVER') {
        links.push({ name: 'Cart', href: '/cart' });
    }

    if (role === 'ADMIN') {
        links.push({ name: 'Deployments', href: '/deployments' });
        links.push({ name: 'Tracking', href: '/tracking' });
    }

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left & Center: Brand + Nav */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center mr-8">
                            <Link href="/home" className="flex items-center gap-2">
                                <div className="border-2 border-dashed border-blue-600 rounded p-0.5">
                                    <div className="h-4 w-4 bg-transparent"></div>
                                </div>
                                <span className="text-xl font-bold text-gray-900 tracking-tight font-display">
                                    ElectroProcure
                                </span>
                            </Link>
                        </div>
                        <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                                        isActive(link.href)
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {/* Cart Icon - Only for BUYER/APPROVER */}
                            {(role === 'BUYER' || role === 'APPROVER') && (
                                <Link
                                    href="/cart"
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                                        isActive('/cart')
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    )}
                                >
                                    <span className="relative">
                                        <ShoppingCart className="h-5 w-5" />
                                        {itemCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                {itemCount}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right: Role Badge & Profile */}
                    <div className="flex items-center gap-4">
                        {/* Role Pill */}
                        <div className="hidden md:flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                            {roleDisplay}
                        </div>

                        {/* Profile Dropdown Area (Simulated) */}
                        <div className="ml-3 relative flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs ring-2 ring-white shadow-sm">
                                {roleBadgeInitial}
                            </div>
                            <div className="hidden md:block text-left">
                                <div className="text-sm font-semibold text-gray-900 leading-none">{user?.name || 'User'}</div>
                                <div className="text-xs text-gray-400 mt-0.5">Profile</div>
                            </div>
                            {/* Logout button */}
                            <button
                                onClick={handleLogout}
                                className="ml-2 text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
