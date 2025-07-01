import React from 'react';

// Move the imports for your homepage sections here
import HeroSection from './components/Hero';
import Benefits from './components/Benefits';
import Action from './components/action';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Benefits />
      <Action />
    </>
  );
};

export default HomePage;