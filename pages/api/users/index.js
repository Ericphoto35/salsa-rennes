import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany({
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
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      }
      break;

    case 'POST':
      try {
        const { name, email, password, role } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });
        
        if (existingUser) {
          return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà' });
        }
        
        // Hasher le mot de passe
        const hashedPassword = password ? await hash(password, 10) : null;
        
        // Créer l'utilisateur
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: role || 'STUDENT',
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            // Ne pas inclure le mot de passe dans la réponse
          }
        });
        
        res.status(201).json(user);
      } catch (error) {
        console.error('Erreur création utilisateur:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Méthode ${method} non autorisée`);
  }
}
