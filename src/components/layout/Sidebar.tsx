import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Suppliers', href: '/suppliers', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
            <div className="flex items-center justify-center h-16 px-4 bg-gray-900 border-b border-gray-800">
                <div className="flex items-center justify-center py-4">
                 <Image
    src="/assets/electro-procure-logo.png"
    alt="ElectroProcure"
    width={160}
    height={40}
    priority
    className="h-10 w-auto"
/>

                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                    {navigation.map((item) => {
                        // Simple active check: strictly equal or starts with for nested routes (except root)
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-300',
                                        'mr-3 shrink-0 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="shrink-0 flex border-t border-gray-800 p-4">
                <button
                    onClick={logout}
                    className="shrink-0 w-full group block"
                >
                    <div className="flex items-center">
                        <div className="ml-3">
                            <div className="flex items-center text-sm font-medium text-gray-300 group-hover:text-white">
                                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};
