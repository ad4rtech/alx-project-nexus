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

    // Serialize dependencies to avoid reference equality issues in useEffect
    const depsKey = JSON.stringify(dependencies);

    const fetchData = useCallback(async () => {
        // Use a microtask to ensure state update is not synchronous within useEffect
        await Promise.resolve();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, depsKey]);

    return { ...state, refetch: fetchData };
}
