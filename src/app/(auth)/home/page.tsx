'use client';

import { Card } from '@/components/ui/Card';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { ShoppingCart, Laptop, Package, ArrowRight, ExternalLink, Calendar, CheckSquare, Users, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { fetchOrders } from '@/lib/actions/orders';
import { StatusBadge } from '@/components/business/StatusBadge';

export default function DashboardHome() {
    const { user, loading } = useAuth();
    const isITAdmin = user?.role === 'ADMIN';
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (!loading && user?.id) {
            loadRecentOrders();
        } else if (!loading && !user) {
            setLoadingOrders(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user?.id]);

    const loadRecentOrders = async () => {
        setLoadingOrders(true);
        const result = await fetchOrders(user?.id, user?.role);
        if (result.orders) {
            // Get only the 3 most recent orders
            setRecentOrders(result.orders.slice(0, 3));
        }
        setLoadingOrders(false);
    };

    // Show loading state while auth is loading
    if (loading || loadingOrders) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (isITAdmin) {
        return (
            <div className="max-w-7xl mx-auto py-8">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                        Oversee IT infrastructure & deployment.
                    </h1>
                    <p className="text-gray-500 text-lg max-w-3xl mb-8 leading-relaxed">
                        Track incoming equipment orders, verify specifications, and manage device
                        rollouts across your organization from one central dashboard.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/orders">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 h-auto text-base font-medium rounded-lg">
                                View Incoming Orders
                            </Button>
                        </Link>
                        <Link href="/deployments">
                            <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 px-6 py-2.5 h-auto text-base font-medium rounded-lg">
                                Manage Deployments
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 px-6 py-2.5 h-auto text-base font-medium rounded-lg">
                                Browse Catalog
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Incoming Orders Card (Left) */}
                    <Card className="p-0 overflow-hidden border border-gray-100 shadow-sm h-full">
                        <div className="p-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Incoming Orders</h2>
                                <p className="text-gray-500 text-sm">Recent procurement orders pending arrival.</p>
                            </div>
                            <Link href="/orders">
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 font-medium">
                                    View all
                                </button>
                            </Link>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {loadingOrders ? (
                                <div className="p-12 text-center">
                                    <p className="text-gray-500 text-sm">Loading orders...</p>
                                </div>
                            ) : recentOrders.length === 0 ? (
                                <div className="p-12 text-center">
                                    <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm mb-2">No incoming orders yet</p>
                                    <p className="text-gray-400 text-xs">Orders placed by Procurement Managers will appear here</p>
                                </div>
                            ) : (
                                recentOrders.map((order) => (
                                    <Link key={order.id} href={`/orders/${order.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1 flex-1">
                                                <div className="font-medium text-gray-900">
                                                    {order.order_number}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.items && order.items.length > 0 ? (
                                                        order.items.map((item: any, idx: number) => (
                                                            <span key={idx}>
                                                                {item.title || item.name}
                                                                {idx < order.items.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        'No items'
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <StatusBadge status={order.status} />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </Card>

                    {/* Device Deployment Card (Right) */}
                    <Card className="p-0 overflow-hidden border border-gray-100 shadow-sm">
                        <div className="p-6 pb-2">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Device Deployment</h2>
                            <p className="text-gray-500 text-sm">Manage rollout to teams.</p>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Action 1 */}
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">Plan New Deployment</h3>
                                        <p className="text-gray-500 text-sm">Assign delivered devices to users.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action 2 */}
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <CheckSquare className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">View Completed</h3>
                                        <p className="text-gray-500 text-sm">History of past rollouts.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action 3 */}
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer group">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">Team Assignments</h3>
                                        <p className="text-gray-500 text-sm">Manage department allocations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Footer Help Text */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        Need technical specifications or warranty info? Visit the <span className="text-gray-600 font-medium">Products</span> page or check <span className="text-gray-600 font-medium">Help & Support</span> for guides.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Hero Section */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                    Manage electronics procurement in one place.
                </h1>
                <p className="text-gray-500 text-lg max-w-3xl mb-8 leading-relaxed">
                    Start by browsing approved devices, reviewing open orders, or jumping
                    back into your cart to finish a purchase.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/products">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 h-auto text-base font-medium rounded-lg">
                            Browse Products
                        </Button>
                    </Link>
                    <Link href="/orders">
                        <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 px-6 py-2.5 h-auto text-base font-medium rounded-lg">
                            View Orders
                        </Button>
                    </Link>
                    <Link href="/checkout">
                        <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 px-6 py-2.5 h-auto text-base font-medium rounded-lg">
                            Go to Cart
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Key Actions Card */}
                <Card className="p-0 overflow-hidden border border-gray-100 shadow-sm">
                    <div className="p-6 pb-2">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Key actions</h2>
                        <p className="text-gray-500 text-sm">Jump straight into the workflows you use most.</p>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {/* Action 1 */}
                        <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <Laptop className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-base font-semibold text-gray-900">Browse electronics catalog</h3>
                                        <Link href="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                            Open
                                        </Link>
                                    </div>
                                    <p className="text-gray-500 text-sm">View all verified devices and compare options.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action 2 */}
                        <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <ShoppingCart className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-base font-semibold text-gray-900">Review your cart</h3>
                                        <Link href="/checkout" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                            Open
                                        </Link>
                                    </div>
                                    <p className="text-gray-500 text-sm">Confirm quantities before placing a bulk order.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action 3 */}
                        <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-base font-semibold text-gray-900">Check order status</h3>
                                        <Link href="/orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                            View
                                        </Link>
                                    </div>
                                    <p className="text-gray-500 text-sm">See which orders are pending, shipped, or delivered.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Recent Orders Card */}
                <Card className="p-0 overflow-hidden border border-gray-100 shadow-sm h-full">
                    <div className="p-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Recent orders</h2>
                            <p className="text-gray-500 text-sm">Last 3 orders placed by you or your team.</p>
                        </div>
                        <Link href="/orders">
                            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded px-3 py-1 hover:bg-gray-50 transition-colors">
                                View all
                            </button>
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {loadingOrders ? (
                            <div className="p-12 text-center">
                                <p className="text-gray-500 text-sm">Loading orders...</p>
                            </div>
                        ) : recentOrders.length === 0 ? (
                            <div className="p-12 text-center">
                                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm mb-2">No orders yet</p>
                                <p className="text-gray-400 text-xs mb-4">Start by browsing products and adding items to your cart</p>
                                <Link href="/products">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
                                        Browse Products
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            recentOrders.map((order) => (
                                <Link key={order.id} href={`/orders/${order.id}`} className="block p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1 flex-1">
                                            <div className="font-medium text-gray-900">
                                                {order.order_number}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.items && order.items.length > 0 ? (
                                                    order.items.map((item: any, idx: number) => (
                                                        <span key={idx}>
                                                            {item.title || item.name}
                                                            {idx < order.items.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))
                                                ) : (
                                                    'No items'
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })} · ${order.total_amount.toFixed(2)}
                                            </div>
                                        </div>
                                        <StatusBadge status={order.status} />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </Card>
            </div>

            {/* Footer Help Text */}
            <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm">
                    Need help with login, orders, or supplier details? Use the Help & Support link in the top navigation or footer to find quick answers or contact support.
                </p>
            </div>
        </div>
    );
}
