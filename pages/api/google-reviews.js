import { getGoogleReviews } from '../../lib/getGoogleReviews';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { reviews, rating, userRatingsTotal } = await getGoogleReviews();
  res.status(200).json({ reviews, rating, userRatingsTotal });
}
