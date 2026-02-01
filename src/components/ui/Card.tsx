import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, noPadding = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('bg-white overflow-hidden shadow rounded-lg border border-gray-100', className)}
                {...props}
            >
                <div className={cn(!noPadding && 'px-4 py-5 sm:p-6')}>{children}</div>
            </div>
        );
    }
);

Card.displayName = 'Card';
