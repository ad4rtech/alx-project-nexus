'use client';

import React, { useState } from 'react';
import { CartItem } from '@/components/business/CartItem';
import { OrderSummary } from '@/components/business/OrderSummary';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Mock initial state based on mockup
const INITIAL_CART = [
    {
        id: 1,
        title: 'ProBook Elite G9',
        sku: 'LP-9023-EL',
        price: 1499.00,
        quantity: 5
    },
    {
        id: 2,
        title: 'UltraView 27" 4K Display',
        sku: 'MN-4001-UV',
        price: 429.00,
        quantity: 10
    },
    {
        id: 4,
        title: 'Wireless Desktop Set',
        sku: 'AC-2200-WD',
        price: 129.00,
        quantity: 20
    }
];

export default function CartPage() {
    const [items, setItems] = useState(INITIAL_CART);

    const updateQuantity = (id: number, newQty: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
        ));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Calculations
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
                                items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        {...item}
                                        onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                                        onRemove={() => removeItem(item.id)}
                                    />
                                ))
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
