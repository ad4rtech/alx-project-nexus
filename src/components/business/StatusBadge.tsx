import React from 'react';
import { cn } from '@/lib/utils/cn';

interface StatusBadgeProps {
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'DEPLOYED' | 'In Transit' | 'Shipped' | 'Delivered' | 'Pending' | 'Processing';
    className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    const styles = {
        // Database statuses with updated colors to match tracking page
        'PENDING': 'bg-orange-100 text-orange-700',
        'SHIPPED': 'bg-blue-100 text-blue-700',
        'DELIVERED': 'bg-green-100 text-green-700',
        'DEPLOYED': 'bg-purple-100 text-purple-700',
        // Legacy statuses (for backward compatibility)
        'In Transit': 'bg-blue-100 text-blue-700',
        'Shipped': 'bg-blue-100 text-blue-700',
        'Delivered': 'bg-green-100 text-green-700',
        'Pending': 'bg-orange-100 text-orange-700',
        'Processing': 'bg-gray-100 text-gray-700',
    };

    // Display text mapping for database statuses
    const displayText = {
        'PENDING': 'Pending',
        'SHIPPED': 'Shipped',
        'DELIVERED': 'Delivered',
        'DEPLOYED': 'Deployed',
    };

    const displayStatus = (displayText as Record<string, string>)[status] || status;

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            styles[status] || 'bg-gray-100 text-gray-800',
            className
        )}>
            {displayStatus}
        </span>
    );
};
