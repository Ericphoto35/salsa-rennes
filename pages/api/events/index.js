import prisma from '../../../lib/prisma';
import { withAuth } from '../../../lib/middleware';

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const events = await prisma.event.findMany({
          orderBy: {
            date: 'asc'
          }
        });
        res.status(200).json(events);
      } catch (error) {
        console.error('Erreur récupération événements:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
      }
      break;

    case 'POST':
      try {
        // Vérifier si l'utilisateur est un admin (cette vérification est déjà faite dans le middleware)
        const eventData = req.body;
        const event = await prisma.event.create({
          data: eventData
        });
        res.status(201).json(event);
      } catch (error) {
        console.error('Erreur création événement:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'événement' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Méthode ${method} non autorisée`);
  }
}

// Route GET accessible à tous, POST uniquement pour les admins
export default function eventsHandler(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  } else {
    return withAuth(handler, ['ADMIN'])(req, res);
  }
}
