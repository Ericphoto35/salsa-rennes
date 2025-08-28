-- Simple RLS policies without recursion
-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Disable RLS temporarily to avoid issues
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create basic policies
-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING ( auth.uid() = id );

-- Users can update their own profile (basic fields only)
CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING ( auth.uid() = id )
    WITH CHECK ( auth.uid() = id );

-- For admin operations, we'll handle permissions in the application layer
-- This avoids RLS recursion issues
