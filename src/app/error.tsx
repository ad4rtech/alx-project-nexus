'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="text-3xl font-bold text-gray-900">Something went wrong!</h2>
                <p className="mt-2 text-gray-500 mb-6">{error.message || "An unexpected error occurred."}</p>
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </div>
    );
}
