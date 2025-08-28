-- Fix RLS policies to avoid infinite recursion
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Create simplified policies without recursion

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING ( auth.uid() = id );

-- Allow users to update their own profile (excluding admin fields)
CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING ( auth.uid() = id )
    WITH CHECK ( 
        auth.uid() = id 
        AND is_admin = (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid() LIMIT 1)
        AND is_approved = (SELECT is_approved FROM public.user_profiles WHERE id = auth.uid() LIMIT 1)
    );

-- Create a function to check admin status safely
CREATE OR REPLACE FUNCTION public.is_admin_user(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.user_profiles WHERE id = user_id LIMIT 1),
    false
  );
$$;

-- Admin policies using the function
CREATE POLICY "Admins can view all profiles"
    ON public.user_profiles FOR SELECT
    USING ( 
        public.is_admin_user(auth.uid()) = true
        OR auth.uid() = id
    );

CREATE POLICY "Admins can update all profiles"
    ON public.user_profiles FOR UPDATE
    USING ( 
        public.is_admin_user(auth.uid()) = true
        OR auth.uid() = id
    );
