# Supabase Authentication Integration

This project uses **Supabase** for authentication and user profile management.

## Features

- ✅ Email/Password authentication
- ✅ User profile management
- ✅ Role-based access control (BUYER, ADMIN)
- ✅ Automatic profile creation on signup
- ✅ Row Level Security (RLS)
- ✅ Session persistence
- ✅ Profile settings page

## Quick Start

### 1. Set Up Supabase

Follow the detailed guide in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run the Application

```bash
npm run dev
```

### 4. Test Authentication

1. Navigate to `http://localhost:3000/register`
2. Create an account
3. Log in
4. Visit `/settings` to view/edit your profile

## Architecture

### Database Schema

```
auth.users (Supabase managed)
└── profiles (custom table)
    ├── id (references auth.users.id)
    ├── email
    ├── name
    ├── role (BUYER | ADMIN)
    ├── organization_id
    ├── avatar_url
    ├── created_at
    └── updated_at
```

### File Structure

```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Supabase client singleton
│   │   ├── auth.ts            # Auth service (signup, signin, signout)
│   │   └── profiles.ts        # Profile CRUD operations
│   └── hooks/
│       └── useAuth.ts         # React hook for auth state
├── app/
│   ├── (auth-portal)/
│   │   ├── login/             # Login page
│   │   └── register/          # Registration page
│   └── (auth)/
│       └── settings/          # Profile settings page
└── types/
    └── index.ts               # TypeScript types

supabase/
└── migrations/
    └── 001_create_profiles.sql  # Database schema
```

## API Reference

### Auth Service (`src/lib/supabase/auth.ts`)

```typescript
// Sign up a new user
await signUp({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  role: 'BUYER'
});

// Sign in
await signIn({
  email: 'user@example.com',
  password: 'password123'
});

// Sign out
await signOut();

// Get current user
const user = await getCurrentUser();

// Listen to auth changes
const { data: { subscription } } = onAuthStateChange((user) => {
  console.log('Auth state changed:', user);
});
```

### Profile Service (`src/lib/supabase/profiles.ts`)

```typescript
// Get a profile
const profile = await getProfile(userId);

// Update a profile
await updateProfile(userId, {
  name: 'Jane Doe',
  role: 'ADMIN'
});

// Get current user's profile
const profile = await getCurrentUserProfile();
```

### useAuth Hook

```typescript
const { user, loading, isAuthenticated, login, signup, logout } = useAuth();

// Login
await login('user@example.com', 'password123');

// Signup
await signup('user@example.com', 'password123', 'John Doe', 'BUYER');

// Logout
await logout();
```

## Security

### Row Level Security (RLS)

All data access is protected by RLS policies:

- Users can only view their own profile
- Users can only update their own profile
- Policies are enforced at the database level

### Environment Variables

- Never commit `.env.local` to version control
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Supabase anon key is safe for client-side use (protected by RLS)

## Development vs Production

### Development
- Email confirmation can be disabled
- Use test accounts
- Monitor auth events in Supabase dashboard

### Production
- Enable email confirmation
- Set up custom SMTP
- Configure proper error logging
- Monitor usage and performance
- Set up backup strategies

## Troubleshooting

See [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) for detailed troubleshooting steps.

## Migration from Mock Auth

The previous mock authentication system has been completely replaced with Supabase. Key changes:

- ❌ Removed: `MOCK_USERS` constant
- ❌ Removed: localStorage-based auth
- ❌ Removed: Role switching for demo
- ✅ Added: Real Supabase authentication
- ✅ Added: Database-backed profiles
- ✅ Added: Proper session management
- ✅ Added: Profile settings page

## Next Steps

1. **Email Verification**: Enable in Supabase settings
2. **Password Reset**: Add UI for password reset flow
3. **OAuth Providers**: Add Google, GitHub login
4. **Profile Pictures**: Implement avatar upload with Supabase Storage
5. **Organization Management**: Create organizations table and link users

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Discord](https://discord.supabase.com)
