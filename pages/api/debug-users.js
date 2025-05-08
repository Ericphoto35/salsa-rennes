import { PrismaClient } from '@prisma/client';

// Initialiser Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Récupérer tous les utilisateurs (sans exposer les mots de passe)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        // Ne pas inclure le mot de passe pour des raisons de sécurité
      }
    });

    // Retourner la liste des utilisateurs
    return res.status(200).json({ 
      users,
      count: users.length,
      message: 'Liste des utilisateurs récupérée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération des utilisateurs', 
      message: error.message 
    });
  }
}
