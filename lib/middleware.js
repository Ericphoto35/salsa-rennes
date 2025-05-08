import jwt from 'jsonwebtoken';
import prisma from './prisma';

// Middleware pour vérifier l'authentification
export async function authMiddleware(req, res, handler, requiredRoles = []) {
  try {
    // Récupérer le token depuis les headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Non autorisé - Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ error: 'Non autorisé - Utilisateur non trouvé' });
    }

    // Vérifier les rôles si nécessaire
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Accès refusé - Rôle insuffisant' });
    }

    // Ajouter l'utilisateur à la requête
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    // Continuer avec le gestionnaire de route
    return handler(req, res);
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Non autorisé - Token invalide' });
    }
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

// Fonction utilitaire pour créer un gestionnaire de route protégé
export function withAuth(handler, requiredRoles = []) {
  return async (req, res) => {
    return authMiddleware(req, res, handler, requiredRoles);
  };
}
