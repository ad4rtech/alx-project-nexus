import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    taxRate: number; // e.g., 0.085 for 8.5%
    itemCount: number;
}

export const OrderSummary = ({ subtotal, shipping, taxRate, itemCount }: OrderSummaryProps) => {
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>



            {/* Breakdown */}
            <div className="space-y-3 py-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-gray-900">KSh {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping Estimate</span>
                    <span className="font-medium text-gray-900">KSh {shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax ({(taxRate * 100).toFixed(1)}%)</span>
                    <span className="font-medium text-gray-900">KSh {tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-6 border-t border-gray-100">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">KSh {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {/* Action */}
            <Link href="/checkout">
                <Button className="w-full py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700">
                    Confirm Order
                </Button>
            </Link>

            {/* Footer Metadata */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Orders are created with PENDING status</p>
            </div>
        </div>
    );
};
