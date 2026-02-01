import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface ProductCardProps {
    id: number;
    category: string;
    title: string;
    description: string;
    price: number;
}

export const ProductCard = ({ id, category, title, description, price }: ProductCardProps) => {
    return (
        <Link href={`/products/${id}`} className="block group h-full">
            <div className="bg-white rounded-lg p-4 border border-gray-100 group-hover:shadow-lg transition-shadow h-full flex flex-col">
                {/* Image Placeholder - Checkerboard */}
                <div className="aspect-[4/3] w-full rounded-md bg-gray-50 mb-4 overflow-hidden relative border border-gray-100">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                        backgroundPosition: '0 0, 10px 10px',
                        backgroundSize: '20px 20px'
                    }}></div>
                    {/* White blocks to simulate the transparent/checker look in mockup specifically */}
                    <div className="grid grid-cols-4 grid-rows-4 h-full w-full absolute inset-0 opacity-20">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={`bg-gray-200 ${i % 2 === 0 ? 'opacity-50' : 'opacity-0'}`}></div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 flex-grow">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {category}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                        {title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="pt-4 flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">
                        ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <Button variant="ghost" size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 h-8 px-4 text-xs font-semibold">
                        Details
                    </Button>
                </div>
            </div>
        </Link>
    );
};
