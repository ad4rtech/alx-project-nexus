import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, id, ...props }, ref) => {
        return (
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    ref={ref}
                    className={cn(
                        "h-4 w-4 bg-white border-gray-300 rounded text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer",
                        className
                    )}
                    {...props}
                />
                {label && (
                    <label htmlFor={id} className="ml-2 block text-sm text-gray-900 cursor-pointer">
                        {label}
                    </label>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
