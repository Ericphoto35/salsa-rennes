import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

// Initialiser Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('API Register-User: Méthode reçue:', req.method);
  
  // Accepter uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Extraire les données du corps de la requête
    console.log('API Register-User: Corps de la requête:', req.body);
    const { name, email, password, phone } = req.body;
    
    // Vérifier que les données requises sont présentes
    if (!name || !email || !password) {
      console.log('API Register-User: Données manquantes', { name, email, password: !!password });
      return res.status(400).json({ error: 'Données d\'inscription incomplètes' });
    }

    try {
      // Vérifier si l'email est déjà utilisé
      console.log('API Register-User: Vérification de l\'email', email);
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        console.log('API Register-User: Email déjà utilisé', email);
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      // Hasher le mot de passe
      console.log('API Register-User: Hashage du mot de passe');
      const hashedPassword = await hash(password, 10);

      // Créer l'utilisateur
      console.log('API Register-User: Création de l\'utilisateur');
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role: "STUDENT",
        }
      });

      console.log('API Register-User: Utilisateur créé avec succès', user.id);
      
      // Retourner les informations de l'utilisateur
      return res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        success: true,
        message: 'Inscription réussie. Vous pouvez maintenant vous connecter.'
      });
    } catch (prismaError) {
      console.error('Erreur Prisma:', prismaError);
      return res.status(500).json({ 
        error: 'Erreur lors de l\'interaction avec la base de données', 
        message: prismaError.message 
      });
    }
  } catch (error) {
    console.error('Erreur générale d\'inscription:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'inscription', 
      message: error.message 
    });
  }
}
