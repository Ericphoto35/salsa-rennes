export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID; // ID de votre établissement sur Google

    if (!GOOGLE_PLACES_API_KEY || !PLACE_ID) {
      throw new Error('Google Places API key or Place ID not configured');
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}&language=fr`
    );

    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      return res.status(200).json({ reviews: [] });
    }

    // Trier les avis par date et prendre les 6 plus récents
    const sortedReviews = data.result.reviews
      .sort((a, b) => b.time - a.time)
      .slice(0, 6);

    res.status(200).json({ reviews: sortedReviews });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
}
