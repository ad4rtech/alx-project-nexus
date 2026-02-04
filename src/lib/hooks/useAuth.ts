import { useState, useEffect } from 'react';
import { User, Role } from '@/types';
import * as authService from '@/lib/supabase/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        checkUser();

        // Listen for auth state changes
        const { data: { subscription } } = authService.onAuthStateChange((authUser) => {
            if (authUser) {
                setUser({
                    id: authUser.id,
                    email: authUser.email,
                    name: authUser.name,
                    role: authUser.role,
                    organizationId: authUser.organizationId || '',
                    avatarUrl: authUser.avatarUrl,
                    createdAt: authUser.createdAt,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function checkUser() {
        try {
            console.log('🔐 Checking user authentication...');
            const authUser = await authService.getCurrentUser();
            if (authUser) {
                console.log('✅ User authenticated:', authUser.email, 'Role:', authUser.role);
                setUser({
                    id: authUser.id,
                    email: authUser.email,
                    name: authUser.name,
                    role: authUser.role,
                    organizationId: authUser.organizationId || '',
                    avatarUrl: authUser.avatarUrl,
                    createdAt: authUser.createdAt,
                });
            } else {
                console.log('❌ No user authenticated');
            }
        } catch (error) {
            console.error('❌ Error checking user:', error);
        } finally {
            setLoading(false);
            console.log('✅ Auth loading complete');
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const authUser = await authService.signIn({ email, password });
            setUser({
                id: authUser.id,
                email: authUser.email,
                name: authUser.name,
                role: authUser.role,
                organizationId: authUser.organizationId || '',
                avatarUrl: authUser.avatarUrl,
                createdAt: authUser.createdAt,
            });
            setLoading(false); // Reset loading state on success
            return authUser;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const signup = async (email: string, password: string, name: string, role: Role) => {
        setLoading(true);
        try {
            const authUser = await authService.signUp({ email, password, name, role });
            setUser({
                id: authUser.id,
                email: authUser.email,
                name: authUser.name,
                role: authUser.role,
                organizationId: authUser.organizationId || '',
                avatarUrl: authUser.avatarUrl,
                createdAt: authUser.createdAt,
            });
            setLoading(false); // Reset loading state on success
            return authUser;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.signOut();
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
    };
}
