import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const HeaderBadge = styled.div`
  display: inline-block;
  background-color: #e0e7ff;
  color: #4338ca;
  font-weight: 500;
  border-radius: 9999px;
  padding: 0.25rem 1rem;
  margin-bottom: 1rem;
`;

const HeaderWrapper = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 36rem;
  margin-top: 90px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #312e81;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
`;

const CardsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 80rem;
  width: 100%;
`;

const Card = styled(motion.div)`
  background-color: ${props => {
    const city = props.city.toLowerCase();
    if (city.includes('ardmore')) return '#fee2e2';
    if (city.includes('bengaluru')) return '#fce7f3';
    if (city.includes('bhubaneswar')) return '#e0f2fe';
    return '#f3f4f6';
  }};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
  border: 1px solid #f3f4f6;
  position: relative;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const BackgroundIcon = styled(motion.div)`
  position: absolute;
  right: -1.25rem;
  top: -1.25rem;
  opacity: 0.1;
`;

const CityName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #666666;
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactText = styled.p`
  color: #4b5563;
`;

// const LocationButton = styled(motion.button)`
//   width: 100%;
//   margin-top: 1.5rem;
//   border: 1px solid #d1d5db;
//   border-radius: 0.5rem;
//   padding: 0.75rem 1rem;
//   color: #1f2937;
//   font-weight: 500;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 0.5rem;
//   background-color: white;
//   cursor: pointer;
  
//   &:hover {
//     background-color: #1a202c;
//     color: white;
//   }
// `;

// const ArrowIcon = styled(motion.svg)`
//   width: 16px;
//   height: 16px;
// `;

const ContactHero = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const locations = [
    {
      id: 1,
      city: '2100 East County Line Rd, Ardmore, PA, 19003. USA',
      email: 'contact@lifeintelect.com',
      icon: 'castle'
    },
    {
      id: 2,
      city: 'ITPL Main Road, Kundalahalli, Brookefield,Bengaluru, Karnataka, India-560037',
      email: 'support@lifeintelect.com',
      icon: 'eiffel'
    },
    {
      id: 3,
      city: 'Chandrasekharpur, Bhubaneswar, Odisha, India-751024',
      email: 'info@lifeintelect.com',
      icon: 'pyramid'
    }
  ];

  const IconComponent = ({ type }) => {
    switch(type) {
      case 'castle':
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="25" width="48" height="40" stroke="#151515" strokeWidth="2"/>
            <rect x="22" y="45" width="10" height="20" stroke="#151515" strokeWidth="2"/>
            <rect x="48" y="45" width="10" height="20" stroke="#151515" strokeWidth="2"/>
            <rect x="33" y="35" width="14" height="30" stroke="#151515" strokeWidth="2"/>
            <rect x="16" y="15" width="6" height="10" stroke="#151515" strokeWidth="2"/>
            <rect x="58" y="15" width="6" height="10" stroke="#151515" strokeWidth="2"/>
            <line x1="16" y1="24" x2="64" y2="24" stroke="#151515" strokeWidth="2"/>
          </svg>
        );
      case 'eiffel':
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 15L35 65H45L40 15Z" stroke="#151515" strokeWidth="2"/>
            <path d="M40 15L25 40H55L40 15Z" stroke="#151515" strokeWidth="2"/>
            <path d="M40 15L15 50H65L40 15Z" stroke="#151515" strokeWidth="2"/>
            <line x1="30" y1="65" x2="50" y2="65" stroke="#151515" strokeWidth="2"/>
            <circle cx="55" cy="20" r="2" fill="#151515"/>
            <circle cx="60" cy="35" r="2" fill="#151515"/>
            <circle cx="45" cy="25" r="2" fill="#151515"/>
          </svg>
        );
      case 'pyramid':
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 60L40 20L65 60H15Z" stroke="#151515" strokeWidth="2"/>
            <circle cx="50" cy="40" r="8" stroke="#151515" strokeWidth="2"/>
            <circle cx="50" cy="40" r="4" fill="#151515"/>
            <line x1="30" y1="50" x2="50" y2="50" stroke="#151515" strokeWidth="2" strokeDasharray="2 2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, type: "spring" }
    }
  };

  return (
    <Container>
      <HeaderWrapper
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <HeaderBadge>✦ CONTACT PAGE</HeaderBadge>
        <Heading>Get in touch with us for more information</Heading>
        <SubHeading>If you need help or have a question, we're here for you</SubHeading>
      </HeaderWrapper>

      <CardsContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {locations.map((location) => (
          <Card
            key={location.id}
            city={location.city}
            variants={cardVariants}
            whileHover="hover"
            onMouseEnter={() => setHoveredCard(location.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <BackgroundIcon
              animate={{
                rotate: hoveredCard === location.id ? 10 : 0,
                scale: hoveredCard === location.id ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent type={location.icon} />
            </BackgroundIcon>
            
            <IconWrapper>
              <IconComponent type={location.icon} />
            </IconWrapper>
            
            <CityName>{location.city}</CityName>
            
            <ContactInfo>
              <ContactText>{location.email}</ContactText>
              <ContactText>{location.phone}</ContactText>
              
              {/* <LocationButton
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                View Location
                <ArrowIcon 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{
                    x: hoveredCard === location.id ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </ArrowIcon>
              </LocationButton> */}
            </ContactInfo>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default ContactHero;