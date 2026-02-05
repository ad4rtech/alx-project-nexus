# Supabase Setup Guide

This guide will walk you through setting up Supabase authentication for Project Nexus.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (or create an account)
4. Click "New Project"
5. Fill in the project details:
   - **Name**: `project-nexus` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is fine for development
6. Click "Create new project"
7. Wait for the project to be provisioned (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear) in the left sidebar
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public**: A long JWT token

## Step 3: Configure Environment Variables

1. In your project root, create a file called `.env.local`:

```bash
# In the project root directory
touch .env.local
```

2. Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Important**: Make sure `.env.local` is in your `.gitignore` file (it should be by default in Next.js projects)

## Step 4: Set Up the Database

1. In your Supabase dashboard, click on the **SQL Editor** icon in the left sidebar
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/migrations/001_create_profiles.sql`
4. Click **Run** (or press Ctrl/Cmd + Enter)
5. You should see a success message

### What This Does:
- Creates a `profiles` table linked to Supabase's `auth.users`
- Enables Row Level Security (RLS)
- Creates policies so users can only access their own profiles
- Sets up a trigger to automatically create a profile when a user signs up
- Adds an `updated_at` trigger for tracking changes

## Step 5: Verify the Setup

1. In Supabase dashboard, click **Table Editor** in the left sidebar
2. You should see a `profiles` table
3. Click on the table to see its structure:
   - `id` (uuid, primary key)
   - `email` (text)
   - `name` (text)
   - `role` (text)
   - `organization_id` (uuid, nullable)
   - `avatar_url` (text, nullable)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## Step 6: Test Authentication

1. **Restart your development server** to load the new environment variables:
   ```bash
   # Stop the current dev server (Ctrl+C)
   npm run dev
   ```

2. Navigate to `http://localhost:3000/register`

3. Create a test account:
   - Choose a role (Procurement Manager or IT Administrator)
   - Enter your name
   - Enter a valid email
   - Enter a password (minimum 6 characters)
   - Click "Create Account"

4. If successful, you should be:
   - Redirected to `/home`
   - Logged in with your new account
   - See your name in the navbar

5. Test the profile page:
   - Click "Settings" in the navbar
   - You should see your profile information
   - Try updating your name
   - Click "Save Changes"
   - Verify the changes persist

## Step 7: Verify Database Records

1. Go back to Supabase dashboard
2. Click **Table Editor** > **profiles**
3. You should see your newly created profile record
4. Click **Authentication** in the left sidebar
5. Click **Users**
6. You should see your user account listed

## Troubleshooting

### "Missing Supabase environment variables" Error

**Problem**: The app can't find your Supabase credentials.

**Solution**:
1. Make sure `.env.local` exists in your project root
2. Make sure the file has the correct variable names (they must start with `NEXT_PUBLIC_`)
3. Restart your dev server after creating/modifying `.env.local`

### "Failed to create user" Error

**Problem**: The database trigger isn't working.

**Solution**:
1. Go to Supabase SQL Editor
2. Run this query to check if the trigger exists:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
3. If it doesn't exist, re-run the migration SQL
4. Make sure there are no syntax errors in the SQL

### "Failed to fetch user profile" Error

**Problem**: RLS policies might be blocking access.

**Solution**:
1. Go to Supabase Table Editor
2. Click on `profiles` table
3. Click the **RLS** tab
4. Make sure you see two policies:
   - "Users can view their own profile"
   - "Users can update their own profile"
5. If not, re-run the migration SQL

### Email Confirmation Required

**Problem**: Supabase requires email confirmation by default.

**Solution** (for development):
1. Go to **Authentication** > **Settings** in Supabase
2. Scroll to **Email Auth**
3. Toggle **OFF** "Enable email confirmations"
4. Click **Save**

**Note**: For production, keep email confirmation enabled!

## Security Best Practices

### For Development:
- ✅ Use `.env.local` for environment variables
- ✅ Never commit `.env.local` to git
- ✅ Use the anon key (it's safe for client-side use)
- ✅ RLS policies protect your data

### For Production:
- ✅ Enable email confirmation
- ✅ Set up email templates in Supabase
- ✅ Configure custom SMTP (optional)
- ✅ Set up proper error logging
- ✅ Monitor auth events in Supabase dashboard
- ✅ Regularly review RLS policies

## Next Steps

Now that authentication is working, you can:

1. **Add Password Reset**:
   - Supabase provides built-in password reset
   - Just need to add a UI for it

2. **Add OAuth Providers**:
   - Google, GitHub, etc.
   - Configure in Supabase Authentication settings

3. **Add Email Verification**:
   - Enable in Supabase settings
   - Customize email templates

4. **Add Profile Pictures**:
   - Use Supabase Storage
   - Upload avatars and store URLs in `avatar_url`

5. **Add Organization Management**:
   - Create `organizations` table
   - Link via `organization_id` in profiles

## Support

If you run into issues:
- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase Discord](https://discord.supabase.com)
- Check the browser console for error messages
- Check the Network tab for failed API calls
