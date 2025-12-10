import React from 'react';
import HeroSection from './HeroSection';
import AdvertisedTickets from './AdvertisedTickets';
import LatestTickets from './LatestTickets';
import WhyChooseUs from './WhyChooseUs';
import PopularRoutes from './PopularRoutes';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <HeroSection />
      <AdvertisedTickets />
      <LatestTickets />
      <WhyChooseUs />
      <PopularRoutes />
    </div>
  );
};

export default Home;
