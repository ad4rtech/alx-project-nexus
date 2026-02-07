'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useCart } from '@/lib/context/CartContext';
import { cn } from '@/lib/utils/cn';
import { Button } from '../ui/Button';
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react';

export const AuthenticatedNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const role = user?.role;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Role display mapping
    const roleDisplay = role === 'ADMIN' ? 'IT Administrator' : 'Procurement Manager';
    const roleBadgeInitial = role === 'ADMIN' ? 'IT' : 'PM';

    const isActive = (href: string) => pathname === href || pathname.startsWith(href);

    // Define navigation items based on role
    const getNavItems = () => {
        const items = [
            { name: 'Home', href: '/home' },
        ];

        if (role === 'ADMIN') {
            items.push(
                { name: 'Catalog', href: '/equipment' },
                { name: 'Orders', href: '/orders' },
                { name: 'Deployments', href: '/deployments' },
                { name: 'Tracking', href: '/tracking' }
            );
        } else {
            // BUYER / Procurement Manager
            items.push(
                { name: 'Products', href: '/products' },
                { name: 'Cart', href: '/cart' },
                { name: 'Orders', href: '/orders' }
            );
        }

        // Settings is always last
        items.push({ name: 'Settings', href: '/settings' });
        return items;
    };

    const navItems = getNavItems();

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
                        <div className="shrink-0 flex items-center mr-8">
                            <Link href="/home" className="flex items-center gap-2">
                                <Image
                                    src="/assets/electro-procure-logo.png"
                                    alt="ElectroProcure"
                                    width={120}
                                    height={30}
                                    priority
                                    className="h-8 w-auto"
                                />

                            </Link>
                        </div>
                        <div className="hidden sm:-my-px sm:flex sm:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors',
                                        isActive(item.href)
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    {item.name === 'Cart' ? (
                                        <span className="flex items-center gap-2">
                                            <span className="relative">
                                                <ShoppingCart className="h-5 w-5" />
                                                {itemCount > 0 && (
                                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                        {itemCount}
                                                    </span>
                                                )}
                                            </span>
                                            <span>Cart</span>
                                        </span>
                                    ) : (
                                        item.name
                                    )}
                                </Link>
                            ))}
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
                            </div>
                            {/* Logout button */}
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                size="sm"
                                className="ml-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 flex items-center gap-1"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden md:inline">Sign out</span>
                            </Button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 ml-2"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        'block px-3 py-2 rounded-md text-base font-medium',
                                        isActive(item.href)
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    {item.name === 'Cart' ? (
                                        <span className="flex items-center justify-between w-full">
                                            <span className="flex items-center gap-2">
                                                <ShoppingCart className="h-5 w-5" />
                                                Cart
                                            </span>
                                            {itemCount > 0 && (
                                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                    {itemCount}
                                                </span>
                                            )}
                                        </span>
                                    ) : (
                                        item.name
                                    )}
                                </Link>
                            ))}
                        </div>
                        {/* Mobile user section */}
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                    {role === 'ADMIN' ? 'IT' : 'PM'}
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{user?.name || 'User'}</div>
                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <Link
                                    href="/settings"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
