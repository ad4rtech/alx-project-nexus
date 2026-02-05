import { supabase } from './client';
import { Role } from '@/types';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: Role;
    organizationId?: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface SignUpData {
    email: string;
    password: string;
    name: string;
    role: Role;
}

export interface SignInData {
    email: string;
    password: string;
}

/**
 * Sign up a new user with email and password
 * Creates both auth user and profile record
 */
export async function signUp({ email, password, name, role }: SignUpData): Promise<AuthUser> {
    console.log('Auth service: Starting signup...', { email, name, role });

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                role,
            },
        },
    });

    console.log('Auth service: Supabase signup response:', { data, error });

    if (error) {
        console.error('Auth service: Signup error:', error);
        throw new Error(error.message);
    }

    if (!data.user) {
        throw new Error('Failed to create user');
    }

    console.log('Auth service: User created, fetching profile...');

    // Wait a bit for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fetch the created profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    console.log('Auth service: Profile fetch result:', { profile, profileError });

    if (profileError) {
        console.error('Auth service: Profile fetch error:', profileError);
        throw new Error(`Failed to fetch user profile: ${profileError.message}`);
    }

    if (!profile) {
        throw new Error('Profile not found after signup');
    }

    return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as Role,
        organizationId: profile.organization_id,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
    };
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn({ email, password }: SignInData): Promise<AuthUser> {
    console.log('Auth service: Starting signin...', { email });

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    console.log('Auth service: Signin response:', { data, error });

    if (error) {
        console.error('Auth service: Signin error:', error);
        throw new Error(error.message);
    }

    if (!data.user) {
        throw new Error('Failed to sign in');
    }

    // Fetch the user's profile
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    console.log('Auth service: Profile fetch result:', { profile, profileError });

    if (profileError || !profile) {
        console.error('Auth service: Profile fetch error:', profileError);
        throw new Error('Failed to fetch user profile');
    }

    return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as Role,
        organizationId: profile.organization_id,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
    };
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    // Fetch the user's profile
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error || !profile) {
        return null;
    }

    return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as Role,
        organizationId: profile.organization_id,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
    };
}

/**
 * Get the current session
 */
export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
            const user = await getCurrentUser();
            callback(user);
        } else {
            callback(null);
        }
    });
}
