import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useOrganization } from '@/lib/hooks/useOrganization';
import { Loader } from '@/components/ui/Loader';

export const Header = () => {
    const { user } = useAuth();
    const { organization, loading } = useOrganization(user?.organizationId);

    return (
        <header className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Search bar could go here */}
                        <div className="flex-shrink-0 flex items-center">
                            {/* Mobile menu button? */}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:ml-4 md:flex md:items-center">
                            <div className="ml-3 relative">
                                <div className="text-sm text-gray-500 flex flex-col items-end">
                                    <span className="font-medium text-gray-900">{user?.name}</span>
                                    <span className="text-xs">
                                        {loading ? '...' : organization?.name || 'No Organization'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
