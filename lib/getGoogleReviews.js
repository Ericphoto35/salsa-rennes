const EMPTY = { reviews: [], rating: null, userRatingsTotal: 0 };

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return EMPTY;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=fr`
    );
    const data = await res.json();
    if (!data.result) return EMPTY;

    const reviews = (data.result.reviews ?? [])
      .sort((a, b) => b.time - a.time)
      .slice(0, 6);

    return {
      reviews,
      rating: data.result.rating ?? null,
      userRatingsTotal: data.result.user_ratings_total ?? 0,
    };
  } catch {
    return EMPTY;
  }
}
