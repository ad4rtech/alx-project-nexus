'use client';

import React, { useEffect } from 'react';
import { CartItem as CartItemComponent } from '@/components/business/CartItem';
import { OrderSummary } from '@/components/business/OrderSummary';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { selectCartItems, selectCartCount, selectCartTotal, removeFromCart, updateQuantity, initializeCart } from '@/lib/redux/slices/cartSlice';
import { useAuth } from '@/lib/hooks/useAuth';

export default function CartPage() {
    const { user } = useAuth();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const itemCount = useAppSelector(selectCartCount);
    const subtotal = useAppSelector(selectCartTotal);

    // Initialize cart from localStorage when component mounts
    useEffect(() => {
        if (user?.id) {
            dispatch(initializeCart(user.id));
        }
    }, [user?.id, dispatch]);

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Order Placement
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Review your bulk electronics order before submitting for approval.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Header Row */}
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <div className="flex-1">Product</div>
                            <div className="w-32 text-right">Unit Price</div>
                            <div className="w-32 text-center">Quantity</div>
                            <div className="w-32 text-right">Total</div>
                            <div className="w-16"></div>
                        </div>

                        {/* Items */}
                        <div className="px-6">
                            {items.length === 0 ? (
                                <div className="py-12 text-center text-gray-500">
                                    Your cart is empty.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <CartItemComponent
                                            key={item.id}
                                            {...item}
                                            onQuantityChange={(newQty) => dispatch(updateQuantity({ id: item.id, quantity: newQty, userId: user?.id }))}
                                            onRemove={() => dispatch(removeFromCart({ id: item.id, userId: user?.id }))}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                    <OrderSummary
                        subtotal={subtotal}
                        shipping={150.00}
                        taxRate={0.085}
                        itemCount={itemCount}
                    />
                </div>
            </div>
        </div>
    );
}
