-- Debug et test des politiques RLS pour user_profiles
-- Vérifier l'état actuel de RLS et des politiques

-- 1. Vérifier si RLS est activé
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'user_profiles';

-- 2. Lister toutes les politiques existantes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- 3. Tester l'insertion directe (à exécuter en tant qu'utilisateur authentifié)
-- Cette requête devrait échouer si les politiques bloquent
-- INSERT INTO public.user_profiles (id, email, full_name, is_admin, is_approved) 
-- VALUES (auth.uid(), 'test@example.com', 'Test User', false, false);

-- 4. Désactiver temporairement RLS pour tester
-- ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- 5. Solution alternative : Créer un trigger pour auto-créer le profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, is_admin, is_approved)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), false, false);
  RETURN NEW;
END;
$$;

-- Créer le trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
