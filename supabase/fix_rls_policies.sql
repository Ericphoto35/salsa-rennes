-- Fix RLS policies to avoid infinite recursion
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Create corrected policies without recursion

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING ( auth.uid() = id );

-- Allow admins to view all profiles (using auth.jwt() to avoid recursion)
CREATE POLICY "Admins can view all profiles"
    ON public.user_profiles FOR SELECT
    USING ( 
        (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
        OR auth.uid() = id
    );

-- Allow admins to update all profiles (using auth.jwt() to avoid recursion)
CREATE POLICY "Admins can update all profiles"
    ON public.user_profiles FOR UPDATE
    USING ( 
        (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true'
        OR auth.uid() = id
    );

-- Allow users to update their own profile (non-admin fields only)
CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING ( auth.uid() = id )
    WITH CHECK ( 
        auth.uid() = id 
        AND (
            -- If user is not admin, they cannot change admin status
            (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' != 'true' 
            OR (is_admin = OLD.is_admin AND is_approved = OLD.is_approved)
        )
    );
