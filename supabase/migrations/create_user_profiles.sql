-- Create the user_profiles table
create table public.user_profiles (
    id uuid references auth.users on delete cascade not null primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null,
    full_name text,
    phone text,
    is_admin boolean default false not null,
    is_approved boolean default false not null
);

-- Create indexes
create index user_profiles_email_idx on public.user_profiles(email);

-- Set up Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- Create policies
-- Allow authenticated users to insert their own profile
create policy "Users can insert own profile"
    on public.user_profiles for insert
    with check ( auth.uid() = id );

-- Allow users to view their own profile
create policy "Users can view own profile"
    on public.user_profiles for select
    using ( auth.uid() = id );

-- Allow admins to view all profiles
create policy "Admins can view all profiles"
    on public.user_profiles for select
    using ( 
        exists (
            select 1 from public.user_profiles
            where id = auth.uid() and is_admin = true
        )
    );

-- Allow admins to update all profiles
create policy "Admins can update all profiles"
    on public.user_profiles for update
    using ( 
        exists (
            select 1 from public.user_profiles
            where id = auth.uid() and is_admin = true
        )
    );

-- Allow users to update their own non-admin fields
create policy "Users can update own profile"
    on public.user_profiles for update
    using ( auth.uid() = id )
    with check ( 
        auth.uid() = id 
        and is_admin = (select is_admin from public.user_profiles where id = auth.uid())
        and is_approved = (select is_approved from public.user_profiles where id = auth.uid())
    );
