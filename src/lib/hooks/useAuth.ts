import { useState, useEffect } from 'react';
import { User, Role } from '@/types';

// Mock user for development
const MOCK_USER: User = {
    id: 'user_123',
    email: 'buyer@example.com',
    name: 'Jane Doe',
    role: 'BUYER',
    organizationId: 'org_123',
    createdAt: new Date().toISOString(),
};

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate auth check
        const timer = setTimeout(() => {
            setUser(MOCK_USER);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const login = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser(MOCK_USER);
            setLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
    };

    return { user, loading, isAuthenticated: !!user, login, logout };
}
