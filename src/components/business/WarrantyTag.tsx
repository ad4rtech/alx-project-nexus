import React from 'react';
import { Badge } from '../ui/Badge';
import { Warranty } from '@/types';

interface WarrantyTagProps {
    warranty: Warranty;
    className?: string;
}

export const WarrantyTag = ({ warranty, className }: WarrantyTagProps) => {
    return (
        <div className={`inline-flex items-center space-x-1 ${className}`}>
            <span className="text-sm text-gray-500">Warranty:</span>
            <Badge variant="neutral">
                {warranty.durationMonths} Months - {warranty.coverageType}
            </Badge>
        </div>
    );
};
