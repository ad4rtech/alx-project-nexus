import React, { ThHTMLAttributes, TdHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface TableProps {
    children: React.ReactNode;
    className?: string;
}

export const Table = ({ children, className }: TableProps) => (
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className={cn('shadow overflow-hidden border-b border-gray-200 sm:rounded-lg', className)}>
                    <table className="min-w-full divide-y divide-gray-200">{children}</table>
                </div>
            </div>
        </div>
    </div>
);

export const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <thead className={cn('bg-gray-50', className)}>{children}</thead>
);

export const TableBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <tbody className={cn('bg-white divide-y divide-gray-200', className)}>{children}</tbody>
);

export const TableRow = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <tr className={cn(onClick && 'cursor-pointer hover:bg-gray-50', className)} onClick={onClick}>
        {children}
    </tr>
);

export const TableHeaderCell = ({ children, className, ...props }: ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
        scope="col"
        className={cn(
            'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
            className
        )}
        {...props}
    >
        {children}
    </th>
);

export const TableCell = ({ children, className, ...props }: TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)} {...props}>
        {children}
    </td>
);
