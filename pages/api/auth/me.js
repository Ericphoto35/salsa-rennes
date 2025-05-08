import prisma from '../../../lib/prisma';
import { withAuth } from '../../../lib/middleware';

async function handler(req, res) {
  // L'utilisateur est déjà vérifié par le middleware withAuth
  // et ajouté à req.user
  try {
    // Récupérer les informations complètes de l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        // Ne pas inclure le mot de passe dans la réponse
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
}

// Cette route nécessite une authentification
export default withAuth(handler);
