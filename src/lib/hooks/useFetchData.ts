import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api/apiClient';

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetchData<T>(endpoint: string, dependencies: unknown[] = []) {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    const fetchData = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const data = await apiClient.get<T>(endpoint);
            setState({ data, loading: false, error: null });
        } catch (err) {
            setState({ data: null, loading: false, error: err instanceof Error ? err : new Error('Unknown error') });
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData, ...dependencies]);

    return { ...state, refetch: fetchData };
}
