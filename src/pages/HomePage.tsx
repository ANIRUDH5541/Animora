import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
import ExploreSection from '../components/ExploreSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ExploreSection />
      <FeaturedProducts />
      <CategorySection />
    </>
  );
};

export default HomePage;