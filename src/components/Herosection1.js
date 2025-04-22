import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  color: white;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1rem;
    text-align: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.1;
  animation: ${fadeIn} 0.8s ease-out forwards;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  span {
    display: inline-block;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: ${props => props.delay || '0s'};
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  line-height: 1.6;
  margin: 0;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out 0.3s forwards;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CtaButton = styled.button`
  background: white;
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out 0.6s forwards;
  align-self: flex-start;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 25%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 75%
    );
    background-size: 400% 400%;
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::after {
    transform: translateX(100%);
  }

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: ${props => props.circle ? '50%' : '20px'};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  animation: ${float} ${props => props.duration || '10s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0.8;
  
  &:nth-child(1) {
    width: 150px;
    height: 150px;
    top: 10%;
    right: 15%;
    border-radius: 30px;
    transform: rotate(45deg);
  }
  
  &:nth-child(2) {
    width: 250px;
    height: 250px;
    bottom: 15%;
    left: 10%;
    border-radius: 50%;
  }
  
  &:nth-child(3) {
    width: 100px;
    height: 100px;
    top: 50%;
    right: 20%;
    border-radius: 20px;
    transform: rotate(20deg);
  }
  
  &:nth-child(4) {
    width: 180px;
    height: 180px;
    bottom: 20%;
    right: 10%;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Component
const ModernHero = () => {
  return (
    <HeroContainer>
      <ContentWrapper>
        <Title>
          <span style={{ animationDelay: '0s' }}>Create</span>{' '}
          <span style={{ animationDelay: '0.5s' }}>Beautiful</span>{' '}
          <span style={{ animationDelay: '1s' }}>Experiences</span>
        </Title>
        
        <Subtitle>
          We design and build stunning digital experiences that captivate your 
          audience and drive real results for your business.
        </Subtitle>
        
        <CtaButton>Get Started</CtaButton>
      </ContentWrapper>
      
      <FloatingShapes>
        <Shape duration="12s" delay="0s" />
        <Shape duration="15s" delay="2s" circle />
        <Shape duration="8s" delay="1s" />
        <Shape duration="18s" delay="3s" circle />
      </FloatingShapes>
    </HeroContainer>
  );
};

export default ModernHero;