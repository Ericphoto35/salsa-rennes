-- Solution automatique : Trigger pour créer automatiquement le profil utilisateur
-- Cette approche évite les problèmes de RLS lors de l'inscription

-- 1. Supprimer le trigger existant s'il existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Créer la fonction qui sera appelée par le trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insérer automatiquement le profil utilisateur
  INSERT INTO public.user_profiles (id, email, full_name, phone, is_admin, is_approved)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'fullName', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    false, 
    false
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- En cas d'erreur, on continue sans bloquer la création de l'utilisateur
    RAISE LOG 'Erreur lors de la création du profil pour %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$;

-- 3. Créer le trigger sur la table auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Optionnel : Nettoyer les politiques RLS pour simplifier
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable insert for own profile only" ON public.user_profiles;

-- 5. Créer une politique simple pour les mises à jour manuelles si nécessaire
CREATE POLICY "Allow manual profile updates"
    ON public.user_profiles FOR INSERT
    TO authenticated
    WITH CHECK ( auth.uid() = id );
