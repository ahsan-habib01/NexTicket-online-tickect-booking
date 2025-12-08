import React from 'react';
import HeroSection from './HeroSection';
import AdvertisedTickets from './AdvertisedTickets';
import LatestTickets from './LatestTickets';
import WhyChooseUs from './WhyChooseUs';
import PopularRoutes from './PopularRoutes';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Banner/Slider */}
      <HeroSection />

      {/* Advertisement Section - Exactly 6 tickets chosen by Admin */}
      <AdvertisedTickets />

      {/* Latest Tickets Section - 6-8 recently added tickets */}
      <LatestTickets />

      {/* Extra Section 1 - Why Choose Us */}
      <WhyChooseUs />

      {/* Extra Section 2 - Popular Routes */}
      <PopularRoutes />
    </div>
  );
};

export default Home;
