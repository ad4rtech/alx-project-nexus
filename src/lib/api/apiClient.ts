import { ApiResponse } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...init } = options;

    let url = `${BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }

    const headers = {
        'Content-Type': 'application/json',
        ...init.headers,
    };

    try {
        const response = await fetch(url, {
            ...init,
            headers,
        });

        const data: ApiResponse<T> = await response.json();

        if (!response.ok) {
            throw new ApiError(response.status, data.error || data.message || 'An error occurred');
        }

        if (!data.success) {
            throw new ApiError(response.status, data.error || data.message || 'API responded with failure');
        }

        return data.data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, error instanceof Error ? error.message : 'Network error');
    }
}

export const apiClient = {
    get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};
