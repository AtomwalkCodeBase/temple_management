import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaHeart, FaStar, FaClock, FaFile, FaDesktop, FaBookmark, FaLessThan, FaGreaterThan, FaLightbulb, FaGavel, FaFlask, FaUsers } from 'react-icons/fa';
import { FaGraduationCap } from "react-icons/fa";
import { FaGlobe,FaGlobeAmericas, FaHandshake } from 'react-icons/fa';
// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotateIn = keyframes`
  from { transform: perspective(1000px) rotateY(30deg); opacity: 0; }
  to { transform: perspective(1000px) rotateY(0); opacity: 1; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 53px auto;
  padding: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
  transform: translateY(30px);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.2s;
  
  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.4s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  background: linear-gradient(45deg, #333, #666, #333);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 6s ease infinite;
`;

const SubText = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.6s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GetStartedButton = styled.button`
  background: linear-gradient(135deg, #333, #555);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease, background 0.3s ease;
  transition-delay: 0.8s;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(210, 192, 192, 0.2), transparent);
    transform: rotate(45deg);
    transition: 0.6s;
    animation: ${shimmer} 3s infinite linear;
    background-size: 200% 100%;
  }
  
  &:hover {
    background: linear-gradient(135deg, #444, #666);
    animation: ${pulse} 0.8s infinite;
    transform: translateY(-2px);
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.2);
  }
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StatsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.4s;
  
  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  opacity: 0;
  transform: scale(0.9);
  transition-delay: ${props => props.delay || '0s'};
  backdrop-filter: blur(5px);
  
  &.visible {
    opacity: 1;
    transform: scale(1);
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
`;

const IconContainer = styled.div`
  width: 65px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  background: linear-gradient(135deg, ${props => props.bgColor}, ${props => props.bgColorEnd || props.bgColor});
  color: white;
  font-size: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
  
  &:hover {
    transform: rotate(10deg);
  }
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  position: relative;
  transition: transform 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, ${props => props.accentColor || '#4285F4'}, transparent);
    transition: width 0.5s ease;
  }
  
  ${StatCard}:hover & {
    transform: translateY(-2px);
    
    &::after {
      width: 100%;
    }
  }
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
  transition: color 0.3s ease;
  
  ${StatCard}:hover & {
    color: #555;
  }
`;

const FeaturesSection = styled.section`
  margin-top: 30px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s ease, transform 1s ease;
  transition-delay: 0.6s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  position: relative;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  background-color: ${props => props.bgColor};
  color: white;
  overflow: hidden;
  transition: all 0.5s ease;
  opacity: 0;
  transform: perspective(1000px) rotateY(30deg);
  transform-origin: ${props => props.index % 2 === 0 ? 'left' : 'right'};
  transition-delay: ${props => 0.8 + (props.index * 0.1)}s;
  
  &.visible {
    opacity: 1;
    transform: perspective(1000px) rotateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => `url(${props.bgImage})`} center/cover no-repeat;
    opacity: 0.8;
    z-index: 0;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: scale(1.02) translateY(-5px);
    z-index: 1;
    
    &::before {
      transform: scale(1.1);
    }
  }
`;

const FeatureIcon = styled.div`
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  margin-bottom: 15px;
  opacity: 0.9;
  transition: transform 0.5s ease;
  
  ${FeatureItem}:hover & {
    transform: translateY(-5px) scale(1.1);
  }
`;

const FeatureText = styled.p`
  position: relative;
  z-index: 1;
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-weight: 400;
  ${FeatureItem}:hover & {
    transform: translateY(-3px);
  }
`;

// Main Component
const Herosection = () => {
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statCardRefs = useRef([]);
  const featuresSectionRef = useRef(null);
  const featureItemRefs = useRef([]);

  useEffect(() => {
    // Main animation sequence
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animateElements = () => {
      // Initial container animation
      if (containerRef.current) {
        containerRef.current.classList.add('visible');
      }

      // Sequence for hero section
      setTimeout(() => {
        if (heroSectionRef.current) heroSectionRef.current.classList.add('visible');
      }, 200);

      setTimeout(() => {
        if (heroContentRef.current) heroContentRef.current.classList.add('visible');
      }, 400);

      setTimeout(() => {
        if (headingRef.current) headingRef.current.classList.add('visible');
      }, 600);

      setTimeout(() => {
        if (subTextRef.current) subTextRef.current.classList.add('visible');
      }, 800);

      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.classList.add('visible');
      }, 1000);

      // Stats container
      setTimeout(() => {
        if (statsContainerRef.current) statsContainerRef.current.classList.add('visible');
      }, 1200);

      // Staggered animation for stat cards
      statCardRefs.current.forEach((card, index) => {
        setTimeout(() => {
          if (card) card.classList.add('visible');
        }, 1400 + (index * 100));
      });

      // Features section
      setTimeout(() => {
        if (featuresSectionRef.current) featuresSectionRef.current.classList.add('visible');
      }, 1800);

      // Staggered animation for feature items
      featureItemRefs.current.forEach((feature, index) => {
        setTimeout(() => {
          if (feature) feature.classList.add('visible');
        }, 2000 + (index * 150));
      });
    };

    // Execute animations immediately for initial view
    animateElements();

    // Add scroll-triggered animations for elements further down the page
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that might be below the fold
    if (featuresSectionRef.current) {
      observer.observe(featuresSectionRef.current);
    }

    featureItemRefs.current.forEach(feature => {
      if (feature) observer.observe(feature);
    });

    return () => {
      // Clean up observer on component unmount
      if (featuresSectionRef.current) {
        observer.unobserve(featuresSectionRef.current);
      }

      featureItemRefs.current.forEach(feature => {
        if (feature) observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <HeroSection ref={heroSectionRef}>
        <HeroContent ref={heroContentRef}>
          <Heading ref={headingRef}>Powering Your Innovations</Heading>
          <SubText ref={subTextRef}>
            Lifeintelect is a Bangalore-based technology and intellectual property consulting firm. We help protect your ideas and achieve your business goals by maximizing the synergy among Technology, Law, and Business.
          </SubText>
          <GetStartedButton ref={buttonRef}>Learn More</GetStartedButton>
        </HeroContent>

        <StatsContainer ref={statsContainerRef}>
          <StatCard ref={el => statCardRefs.current[0] = el} delay="0.2s" className="stat-card">
            <IconContainer bgColor="#4285F4" bgColorEnd="#5E97F7">
              <FaUsers />  {/* Team/group icon */}
            </IconContainer>
            <StatContent>
              <StatValue accentColor="#4285F4">500+ </StatValue>
              <StatLabel>clients in patent and design</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard ref={el => statCardRefs.current[1] = el} delay="0.3s" className="stat-card">
            <IconContainer bgColor="#F5B7B1" bgColorEnd="#F8CFC9">
              <FaGavel />
            </IconContainer>
            <StatContent>
              <StatValue accentColor="#F5B7B1">4000+</StatValue>
              <StatLabel>IP Fillings</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard ref={el => statCardRefs.current[2] = el} delay="0.4s" className="stat-card">
            <IconContainer bgColor="#F4D03F" bgColorEnd="#F7DC6F">
              <FaGraduationCap />  {/* Best for training stats */}
            </IconContainer>
            <StatContent>
              <StatValue accentColor="#F4D03F">6550+</StatValue>
              <StatLabel>Total People Trained</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard ref={el => statCardRefs.current[3] = el} delay="0.5s" className="stat-card">
            <IconContainer bgColor="#58D68D" bgColorEnd="#82E0AB">
              <FaGlobeAmericas />
              {/* <FaHandsHelping />  // For service emphasis */}
            </IconContainer>
            <StatContent>
              <StatValue accentColor="#58D68D">2500+</StatValue>
              <StatLabel>Globally Projects Executed</StatLabel>
            </StatContent>
          </StatCard>
        </StatsContainer>
      </HeroSection>

      <FeaturesSection ref={featuresSectionRef}>
        <FeatureGrid>
          <FeatureItem ref={el => featureItemRefs.current[0] = el} bgColor="rgba(100, 100, 200, 0.8)" index={0}>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureText>IP solutions</FeatureText>
          </FeatureItem>

          <FeatureItem ref={el => featureItemRefs.current[1] = el} bgColor="rgba(20, 40, 100, 0.8)" index={1}>
            <FeatureIcon>🔬</FeatureIcon>
            <FeatureText>IP Lifecycle management</FeatureText>
          </FeatureItem>

          <FeatureItem ref={el => featureItemRefs.current[2] = el} bgColor="rgba(248, 137, 137, 0.8)" index={2}>
            <FeatureIcon>💻</FeatureIcon>
            <FeatureText>Scientific and technology solutions</FeatureText>
          </FeatureItem>

          <FeatureItem ref={el => featureItemRefs.current[3] = el} bgColor="rgba(200, 100, 200, 0.8)" index={3}>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureText>Strategy & Advisory</FeatureText>
          </FeatureItem>
        </FeatureGrid>
      </FeaturesSection>
    </Container>

  );
};

export default Herosection;