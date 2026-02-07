import React from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CartItemProps {
  id: string;
  title: string;
  sku?: string;
  price: number;
  quantity: number;
  image?: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem = ({
  id,
  title,
  sku,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const total = price * quantity;
  const productImage = image && image.trim() !== '' ? image : null;

  return (
    <div className="flex items-center py-6 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <div className="relative h-16 w-16 shrink-0 rounded-md border border-gray-100 overflow-hidden bg-gray-50">
        {productImage ? (
          <Image
            src={productImage}
            alt={title}
            fill
            sizes="64px"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="ml-4 flex-1">
        <Link
          href={`/products/${id}`}
          className="font-semibold text-gray-900 hover:text-blue-600 block"
        >
          {title}
        </Link>
        {sku && (
          <div className="text-xs text-gray-400 mt-1">SKU: {sku}</div>
        )}
      </div>

      {/* Price */}
      <div className="w-32 text-right text-sm font-medium text-gray-900">
        KSh {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>

      {/* Quantity */}
      <div className="w-32 flex justify-center">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            onQuantityChange(Math.max(1, Number(e.target.value)))
          }
          className="w-16 text-center border border-gray-200 rounded-md py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Total */}
      <div className="w-32 text-right text-sm font-bold text-gray-900">
        KSh {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>

      {/* Remove */}
      <div className="w-16 flex justify-end">
        <button
          onClick={onRemove}
          aria-label="Remove item"
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
