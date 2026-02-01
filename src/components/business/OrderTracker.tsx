import React from 'react';
import { Check, Truck, Package } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface OrderTrackerProps {
    currentStep: number; // 0: Placed, 1: Processing, 2: Shipped, 3: Delivered
}

const steps = [
    { name: 'Order Placed', icon: Check },
    { name: 'Processing', icon: Check },
    { name: 'Shipped', icon: Truck },
    { name: 'Delivered', icon: Package },
];

export const OrderTracker = ({ currentStep }: OrderTrackerProps) => {
    return (
        <div className="w-full py-6">
            <div className="relative flex items-center justify-between w-full">
                {/* Progress Line Background */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>

                {/* Active Progress Line */}
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 -z-10 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isActive = index === currentStep;

                    return (
                        <div key={step.name} className="flex flex-col items-center bg-white px-2">
                            <div
                                className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                                    isCompleted ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-gray-300 text-gray-300"
                                )}
                            >
                                {index < currentStep ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-4 h-4" />
                                )}
                            </div>
                            <span className={cn(
                                "mt-2 text-xs font-medium",
                                isCompleted ? "text-gray-900" : "text-gray-400"
                            )}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
