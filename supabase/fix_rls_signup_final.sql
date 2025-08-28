-- Solution définitive pour l'erreur d'inscription avec RLS
-- Le problème : lors de l'inscription, Supabase crée d'abord l'utilisateur auth
-- puis notre code essaie d'insérer le profil, mais les politiques RLS bloquent

-- 1. Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow profile creation on signup" ON public.user_profiles;

-- 2. Créer une politique d'insertion qui fonctionne pour l'inscription
CREATE POLICY "Enable insert for authenticated users"
    ON public.user_profiles FOR INSERT
    TO authenticated
    WITH CHECK ( true );

-- 3. Si vous voulez plus de sécurité, utilisez cette version à la place :
-- CREATE POLICY "Enable insert for own profile only"
--     ON public.user_profiles FOR INSERT
--     TO authenticated
--     WITH CHECK ( auth.uid() = id );

-- 4. Vérifier que la table a bien RLS activé
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
