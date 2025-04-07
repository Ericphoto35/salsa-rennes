import { useState, useEffect } from 'react';
import { FaStar, FaGoogle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error('Erreur lors de la récupération des avis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#f6bc7c] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-center gap-2 mb-8">
        <FaGoogle className="text-[#f6bc7c] text-3xl" />
        <h2 className="text-2xl font-semibold text-[#f6bc7c]">Avis de nos clients</h2>
      </div>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="py-8"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#363636] p-6 rounded-lg shadow-lg h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#f6bc7c] flex items-center justify-center text-[#2b2b2b] font-bold text-xl">
                  {review.author_name?.[0] || '?'}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">{review.author_name}</h3>
                  <div className="flex text-[#f6bc7c]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-[#f6bc7c]' : 'text-gray-400'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/90">{review.text}</p>
              <p className="text-sm text-white/60 mt-2">
                {new Date(review.time * 1000).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
