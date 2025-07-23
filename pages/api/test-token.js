// API pour tester et valider le token Instagram
export default async function handler(req, res) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    console.log('=== TEST TOKEN INSTAGRAM ===');
    console.log('Token existe:', !!accessToken);
    
    if (!accessToken) {
      return res.status(400).json({ 
        error: 'INSTAGRAM_ACCESS_TOKEN manquant dans .env.local',
        help: 'Ajoutez votre token dans le fichier .env.local'
      });
    }
    
    // Afficher des infos sur le token (sans révéler le token complet)
    console.log('Longueur du token:', accessToken.length);
    console.log('Commence par:', accessToken.substring(0, 10) + '...');
    console.log('Finit par:', '...' + accessToken.substring(accessToken.length - 10));
    
    // Test 1: Vérifier les infos du compte
    console.log('Test 1: Récupération des infos du compte...');
    const accountResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`
    );
    
    if (!accountResponse.ok) {
      const accountError = await accountResponse.json();
      console.error('Erreur compte:', accountError);
      return res.status(accountResponse.status).json({
        error: 'Token invalide - impossible de récupérer les infos du compte',
        details: accountError,
        help: 'Vérifiez que votre token est valide et non expiré'
      });
    }
    
    const accountData = await accountResponse.json();
    console.log('Infos compte:', accountData);
    
    // Test 2: Vérifier l'accès aux médias
    console.log('Test 2: Test d\'accès aux médias...');
    const mediaResponse = await fetch(
      `https://graph.instagram.com/me/media?fields=id&limit=1&access_token=${accessToken}`
    );
    
    if (!mediaResponse.ok) {
      const mediaError = await mediaResponse.json();
      console.error('Erreur médias:', mediaError);
      return res.status(mediaResponse.status).json({
        error: 'Token valide mais pas d\'accès aux médias',
        details: mediaError,
        help: 'Vérifiez les permissions de votre app (instagram_basic, instagram_content_read)'
      });
    }
    
    const mediaData = await mediaResponse.json();
    console.log('Nombre de médias accessibles:', mediaData.data?.length || 0);
    
    // Succès !
    return res.status(200).json({
      success: true,
      message: 'Token Instagram valide !',
      account: {
        id: accountData.id,
        username: accountData.username,
        account_type: accountData.account_type
      },
      media_count: mediaData.data?.length || 0,
      help: 'Votre token fonctionne correctement. Les publications devraient s\'afficher.'
    });
    
  } catch (error) {
    console.error('Erreur test token:', error);
    return res.status(500).json({
      error: 'Erreur lors du test du token',
      message: error.message,
      help: 'Vérifiez votre connexion internet et la validité de votre token'
    });
  }
}
