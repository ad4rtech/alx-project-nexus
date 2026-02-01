import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        className={cn(
                            'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                            error
                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 text-gray-900',
                            props.disabled && 'bg-gray-100 cursor-not-allowed text-gray-500',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                {!error && helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
