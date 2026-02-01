import React from 'react';
import { Badge } from '../ui/Badge';
import { Supplier } from '@/types';

interface SupplierBadgeProps {
    supplier: Pick<Supplier, 'name' | 'isVerified'>;
    className?: string;
}

export const SupplierBadge = ({ supplier, className }: SupplierBadgeProps) => {
    return (
        <div className={`inline-flex items-center space-x-2 ${className}`}>
            <span className="font-medium text-gray-900">{supplier.name}</span>
            {supplier.isVerified && (
                <Badge variant="success" className="ml-1">
                    Verified
                </Badge>
            )}
        </div>
    );
};
