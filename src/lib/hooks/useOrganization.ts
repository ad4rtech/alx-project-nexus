import { useFetchData } from './useFetchData';
import { Organization } from '@/types';

export function useOrganization(orgId?: string) {
    const { data, loading, error, refetch } = useFetchData<Organization>(
        orgId ? `/organizations/${orgId}` : ''
    );

    return { organization: data, loading, error, refetch };
}
