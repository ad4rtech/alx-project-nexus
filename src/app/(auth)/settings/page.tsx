'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/useAuth';
import { updateProfile } from '@/lib/supabase/profiles';
import { User, ShoppingCart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!user) return;

        setIsSaving(true);
        try {
            await updateProfile(user.id, {
                name,
            });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Not Authenticated</h2>
                <p className="text-gray-500">Please log in to view your settings.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-500 mt-2">Manage your account information and preferences</p>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Placeholder */}
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-10 w-10 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Member since {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Name Field */}
                    <div>
                        <Input
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email Field (Read-only) */}
                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            disabled
                            className="bg-gray-50 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Role Display (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                            <div className="flex items-center gap-2">
                                {user.role === 'ADMIN' ? (
                                    <Shield className="h-5 w-5 text-blue-600" />
                                ) : (
                                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                                )}
                                <span className="text-sm font-medium text-gray-900">
                                    {user.role === 'ADMIN' ? 'IT Administrator' : 'Procurement Manager'}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                    </div>

                    {/* Success/Error Message */}
                    {message && (
                        <div className={cn(
                            "px-4 py-3 rounded-md text-sm",
                            message.type === 'success' ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"
                        )}>
                            {message.text}
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="px-6"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Account Info */}
            <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">User ID</span>
                        <span className="text-gray-900 font-mono text-xs">{user.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Organization ID</span>
                        <span className="text-gray-900 font-mono text-xs">{user.organizationId || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Current Role</span>
                        <span className="text-gray-900 font-medium">
                            {user.role === 'ADMIN' ? 'IT Administrator' : 'Procurement Manager'}
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
