import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const courses = await prisma.course.findMany();
        res.status(200).json(courses);
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des cours' });
      }
      break;

    case 'POST':
      try {
        const courseData = req.body;
        const course = await prisma.course.create({
          data: courseData,
        });
        res.status(201).json(course);
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du cours' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Méthode ${method} non autorisée`);
  }
}
