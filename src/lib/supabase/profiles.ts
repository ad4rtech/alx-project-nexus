import { supabase } from './client';
import { Role } from '@/types';

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: Role;
  organizationId?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdateData {
  name?: string;
  role?: Role;
  organizationId?: string;
  avatarUrl?: string;
}

/**
 * Get a user's profile by ID
 */
export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  if (!data) {
    throw new Error('Profile not found');
  }

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role as Role,
    organizationId: data.organization_id,
    avatarUrl: data.avatar_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Update a user's profile
 */
export async function updateProfile(
  userId: string,
  updates: ProfileUpdateData
): Promise<Profile> {
  const updateData: any = {};

  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.role !== undefined) updateData.role = updates.role;
  if (updates.organizationId !== undefined) updateData.organization_id = updates.organizationId;
  if (updates.avatarUrl !== undefined) updateData.avatar_url = updates.avatarUrl;

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  if (!data) {
    throw new Error('Profile not found');
  }

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role as Role,
    organizationId: data.organization_id,
    avatarUrl: data.avatar_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Get the current user's profile
 */
export async function getCurrentUserProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  try {
    return await getProfile(user.id);
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    return null;
  }
}
