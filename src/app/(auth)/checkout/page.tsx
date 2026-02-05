'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { selectCartItems, selectCartCount, selectCartTotal, clearCart, initializeCart } from '@/lib/redux/slices/cartSlice';
import { useToast } from '@/lib/context/ToastContext';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/actions/orders';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, Package } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { user, loading } = useAuth();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const itemCount = useAppSelector(selectCartCount);
    const subtotal = useAppSelector(selectCartTotal);
    const { showToast } = useToast();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    // Shipping form state
    const [shippingAddress, setShippingAddress] = useState({
        department: '',
        contact: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    });

    // Initialize cart from localStorage
    useEffect(() => {
        if (!loading && user?.id) {
            dispatch(initializeCart(user.id));
        }

        // Fallback: if loading takes too long, assume not authenticated
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn('⚠️ Auth loading timeout - assuming not authenticated');
            }
        }, 3000);

        return () => clearTimeout(timeout);
    }, [loading, user, dispatch]);

    // RBAC Protection
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (user?.role === 'ADMIN') {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-500">Only procurement managers can create orders.</p>
                <Button
                    variant="ghost"
                    onClick={() => router.push('/products')}
                    className="mt-4"
                >
                    Browse Products
                </Button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add some products to get started</p>
                <Button onClick={() => router.push('/products')} className="bg-blue-600 hover:bg-blue-700">
                    Browse Products
                </Button>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Ensure user is authenticated
            if (!user?.id) {
                showToast('You must be logged in to place an order', 'error');
                return;
            }


            const result = await createOrder(user.id, items, shippingAddress);

            if (result.error) {
                showToast(result.error, 'error');
            } else {
                showToast('Order placed successfully! Status: PENDING', 'success');
                dispatch(clearCart(user.id));
                router.push('/orders');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            showToast('Failed to place order', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setShippingAddress(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-5xl mx-auto pb-12 space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/cart"
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Cart
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 font-display">Checkout</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Complete your order information to submit for processing
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address Form */}
                        <Card>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Engineering Department"
                                        required
                                        value={shippingAddress.department}
                                        onChange={(e) => handleInputChange('department', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full name of recipient"
                                        required
                                        value={shippingAddress.contact}
                                        onChange={(e) => handleInputChange('contact', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Line 1 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Street address"
                                        required
                                        value={shippingAddress.address1}
                                        onChange={(e) => handleInputChange('address1', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Suite, building, floor (optional)"
                                        value={shippingAddress.address2}
                                        onChange={(e) => handleInputChange('address2', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            required
                                            value={shippingAddress.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            required
                                            value={shippingAddress.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ZIP Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ZIP Code"
                                        required
                                        value={shippingAddress.zip}
                                        onChange={(e) => handleInputChange('zip', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <Card>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            {/* Items List */}
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm pb-3 border-b border-gray-100 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                            <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-900">$150.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (8.5%)</span>
                                    <span className="font-medium text-gray-900">${(subtotal * 0.085).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-gray-200">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <span className="text-base font-bold text-gray-900">
                                        ${(subtotal + 150 + (subtotal * 0.085)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                            >
                                {submitting ? 'Placing Order...' : 'Place Order'}
                            </Button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Order will be created with status: <span className="font-bold">PENDING</span>
                            </p>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
