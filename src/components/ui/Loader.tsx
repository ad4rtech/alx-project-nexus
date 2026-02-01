import React from 'react';
import { cn } from '@/lib/utils/cn';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loader = ({ size = 'md', className }: LoaderProps) => {
    const sizes = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-4',
        lg: 'h-12 w-12 border-4',
    };

    return (
        <div className="flex justify-center items-center">
            <div
                className={cn(
                    'animate-spin rounded-full border-gray-200 border-t-primary-600',
                    sizes[size],
                    className
                )}
            />
        </div>
    );
};
