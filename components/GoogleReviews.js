import { FaStar, FaGoogle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function GoogleReviews({ reviews = [] }) {
  if (!reviews.length) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
        <FaGoogle className="text-[#f6bc7c] text-2xl md:text-3xl" />
        <p className="text-xl md:text-2xl font-semibold text-[#f6bc7c]">Avis Google</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        a11y={{
          prevSlideMessage: 'Avis précédent',
          nextSlideMessage: 'Avis suivant',
        }}
        breakpoints={{
          480: { slidesPerView: 1.2, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="py-4 md:py-8"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#1e1e1e] border border-white/7 p-4 md:p-6 rounded-2xl h-full">
              <div className="flex items-center mb-4">
                <div className="w-11 h-11 rounded-full bg-[#f6bc7c]/20 border border-[#f6bc7c]/30 flex items-center justify-center text-[#f6bc7c] font-bold text-lg flex-shrink-0">
                  {review.author_name?.[0] || '?'}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white text-sm">{review.author_name}</p>
                  <div className="flex text-[#f6bc7c] mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xs ${i < review.rating ? 'text-[#f6bc7c]' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed">{review.text}</p>
              <p className="text-xs text-white/30 mt-3">
                {new Date(review.time * 1000).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
