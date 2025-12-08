import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      title: 'Book Your Journey Today',
      subtitle: 'Travel with comfort and convenience',
      description:
        'Book bus, train, launch & flight tickets easily. Your journey starts here!',
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=800&fit=crop',
      cta: 'Browse All Tickets',
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      id: 2,
      title: 'Explore New Destinations',
      subtitle: 'Adventure awaits at every corner',
      description:
        'Discover amazing places with our seamless booking experience',
      image:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop',
      cta: 'Start Exploring',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 3,
      title: 'Safe & Secure Travel',
      subtitle: 'Your safety is our priority',
      description: 'Book with confidence using our secure payment system',
      image:
        'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1920&h=800&fit=crop',
      cta: 'Book Now',
      gradient: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <section className="relative h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto">
                  {/* Animated Badge */}
                  <div className="inline-block mb-4 animate-bounce">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Title with Animation */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeInUp animation-delay-200">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to="/all-tickets"
                    className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl animate-fadeInUp animation-delay-400"
                  >
                    {slide.cta} →
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        /* Swiper custom styles */
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 20px;
          font-weight: bold;
        }

        :global(.swiper-pagination-bullet) {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }

        :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
