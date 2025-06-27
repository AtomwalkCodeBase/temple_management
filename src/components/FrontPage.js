import React from 'react'
import Herosection from './Herosection'
import ServicesSection from './ServicesSection'
import AboutSection from './AboutSection'
import ContactPage from './ContactPage'
import TestimonialAndCustomersPage from './TestimonialAndCustomersPage'
// import Herosection1 from './Herosection1'

const FrontPage = () => {
  // Array of your hero section components
  const heroSections = [
    <Herosection key="hero1" />,
    // <Herosection1 key="hero2" />,
    // <Herosection2 key="hero3" />,
    // <Herosection4 key="hero4" />
  ];

  // Select a random hero section
  const randomIndex = Math.floor(Math.random() * heroSections.length);
  const selectedHero = heroSections[randomIndex];

  return (
    <div>
      {selectedHero}
      <AboutSection></AboutSection>
      <ServicesSection></ServicesSection>
      <TestimonialAndCustomersPage></TestimonialAndCustomersPage>
      <ContactPage></ContactPage>
    </div>
  )
}

export default FrontPage;
