import React from 'react';
import { Badge, BadgeProps } from '../ui/Badge';
import { OrderStatus } from '@/types';

interface StatusPillProps {
    status: OrderStatus;
    className?: string;
}

const statusMap: Record<OrderStatus, { label: string; variant: BadgeProps['variant'] }> = {
    PENDING: { label: 'Pending', variant: 'warning' },
    APPROVED: { label: 'Approved', variant: 'success' },
    PROCESSING: { label: 'Processing', variant: 'default' },
    SHIPPED: { label: 'Shipped', variant: 'default' },
    DELIVERED: { label: 'Delivered', variant: 'success' },
    CANCELLED: { label: 'Cancelled', variant: 'error' },
};

export const StatusPill = ({ status, className }: StatusPillProps) => {
    const config = statusMap[status] || { label: status, variant: 'neutral' };

    return (
        <Badge variant={config.variant} className={className}>
            {config.label}
        </Badge>
    );
};
