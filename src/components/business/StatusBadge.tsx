import React from 'react';
import { cn } from '@/lib/utils/cn';

interface StatusBadgeProps {
    status: 'In Transit' | 'Shipped' | 'Delivered' | 'Pending' | 'Processing';
    className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    const styles = {
        'In Transit': 'bg-blue-100 text-blue-800',
        'Shipped': 'bg-blue-50 text-blue-700',
        'Delivered': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Processing': 'bg-gray-100 text-gray-800',
    };

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            styles[status] || 'bg-gray-100 text-gray-800',
            className
        )}>
            {status}
        </span>
    );
};
