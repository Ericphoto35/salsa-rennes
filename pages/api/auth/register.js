import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  console.log('API Register: Méthode reçue:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Retourner une réponse simple pour tester si l'API fonctionne
    return res.status(200).json({ 
      success: true, 
      message: 'API d\'inscription fonctionnelle' 
    });
    
    // Le code ci-dessous ne sera pas exécuté pour le moment
    // Une fois que nous aurons confirmé que l'API fonctionne, nous pourrons réactiver ce code
    
    /*
    console.log('API Register: Corps de la requête:', req.body);
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password) {
      console.log('API Register: Données manquantes', { name, email, password: !!password });
      return res.status(400).json({ error: 'Données d\'inscription incomplètes' });
    }

    // Vérifier si l'email est déjà utilisé
    console.log('API Register: Vérification de l\'email', email);
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('API Register: Email déjà utilisé', email);
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    console.log('API Register: Hashage du mot de passe');
    const hashedPassword = await hash(password, 10);

    // Créer l'utilisateur
    console.log('API Register: Création de l\'utilisateur');
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: "STUDENT",
      }
    });

    console.log('API Register: Utilisateur créé avec succès', user.id);
    
    // Retourner les informations de l'utilisateur
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      success: true,
      message: 'Inscription réussie. Vous pouvez maintenant vous connecter.'
    });
    */
  } catch (error) {
    console.error('Erreur d\'inscription détaillée:', error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'inscription', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
