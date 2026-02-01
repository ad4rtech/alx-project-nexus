import React from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface CartItemProps {
    id: number;
    title: string;
    sku: string;
    price: number;
    quantity: number;
    onUpdateQuantity: (newQuantity: number) => void;
    onRemove: () => void;
}

export const CartItem = ({ id, title, sku, price, quantity, onUpdateQuantity, onRemove }: CartItemProps) => {
    const total = price * quantity;

    return (
        <div className="flex items-center py-6 border-b border-gray-100 last:border-0">
            {/* Product Image Placeholder */}
            <div className="h-16 w-16 bg-gray-50 rounded-md border border-gray-100 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                    backgroundPosition: '0 0, 5px 5px',
                    backgroundSize: '10px 10px'
                }}></div>
            </div>

            {/* details */}
            <div className="ml-4 flex-1">
                <Link href={`/products/${id}`} className="font-bold text-gray-900 hover:text-blue-600 block">
                    {title}
                </Link>
                <div className="text-xs text-gray-400 mt-1">SKU: {sku}</div>
            </div>

            {/* Price */}
            <div className="w-32 text-right text-sm font-medium text-gray-900">
                ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            {/* Quantity */}
            <div className="w-32 flex justify-center">
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border border-gray-200 rounded-md py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Total */}
            <div className="w-32 text-right text-sm font-bold text-gray-900">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            {/* Remove */}
            <div className="w-16 flex justify-end">
                <button
                    onClick={onRemove}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
