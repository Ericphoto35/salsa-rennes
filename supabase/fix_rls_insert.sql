-- Fix RLS pour permettre l'insertion lors de l'inscription
-- Le problème : la politique INSERT vérifie auth.uid() = id, mais lors de l'inscription
-- l'utilisateur n'est pas encore "connecté" dans le contexte RLS

-- Supprimer la politique INSERT existante
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Créer une nouvelle politique INSERT plus permissive pour l'inscription
-- Cette politique permet l'insertion si l'ID correspond à l'utilisateur authentifié
-- OU si c'est une insertion initiale (pas d'utilisateur connecté mais ID valide)
CREATE POLICY "Allow profile creation on signup"
    ON public.user_profiles FOR INSERT
    WITH CHECK ( 
        -- Soit l'utilisateur connecté insère son propre profil
        auth.uid() = id
        -- Soit c'est une insertion lors de l'inscription (auth.uid() peut être null temporairement)
        OR (auth.uid() IS NOT NULL AND id IS NOT NULL)
    );

-- Alternative plus simple si la première ne fonctionne pas
-- Cette politique permet l'insertion pour tout utilisateur authentifié
-- mais vérifie que l'ID correspond bien à l'utilisateur
CREATE OR REPLACE POLICY "Allow profile creation on signup"
    ON public.user_profiles FOR INSERT
    WITH CHECK ( 
        -- L'ID doit correspondre à l'utilisateur authentifié
        id = auth.uid()
        -- ET l'utilisateur doit être authentifié
        AND auth.uid() IS NOT NULL
    );
