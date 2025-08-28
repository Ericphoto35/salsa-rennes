-- Réactiver RLS avec des politiques sécurisées et fonctionnelles
-- D'abord, nettoyer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Réactiver RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 1. Permettre l'insertion de son propre profil (inscription)
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

-- 2. Permettre à chaque utilisateur de voir son propre profil
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING ( auth.uid() = id );

-- 3. Permettre aux utilisateurs de mettre à jour leur propre profil
-- MAIS empêcher la modification des champs is_admin et is_approved
CREATE POLICY "Users can update own profile basic fields"
    ON public.user_profiles FOR UPDATE
    USING ( auth.uid() = id )
    WITH CHECK ( 
        auth.uid() = id 
        AND is_admin = (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid())
        AND is_approved = (SELECT is_approved FROM public.user_profiles WHERE id = auth.uid())
    );

-- 4. Créer une fonction sécurisée pour vérifier le statut admin
-- Cette fonction utilise SECURITY DEFINER pour éviter la récursion RLS
CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT COALESCE(
        (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid() LIMIT 1),
        false
    );
$$;

-- 5. Politique pour les admins - voir tous les profils
CREATE POLICY "Admins can view all profiles"
    ON public.user_profiles FOR SELECT
    USING ( 
        public.current_user_is_admin() = true
    );

-- 6. Politique pour les admins - modifier tous les profils
CREATE POLICY "Admins can update all profiles"
    ON public.user_profiles FOR UPDATE
    USING ( 
        public.current_user_is_admin() = true
    );

-- 7. Politique pour les admins - supprimer des profils (optionnel)
CREATE POLICY "Admins can delete profiles"
    ON public.user_profiles FOR DELETE
    USING ( 
        public.current_user_is_admin() = true
    );

-- Vérifier que RLS est bien activé
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'user_profiles';
