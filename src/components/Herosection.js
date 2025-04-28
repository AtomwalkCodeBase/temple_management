import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaLock, FaFlask, FaLaptop, FaLightbulb, FaUsers, FaGavel, FaGraduationCap, FaGlobeAmericas, FaHome } from 'react-icons/fa';
import Carousel1 from './Carousel1';
import Section1Image from "../assets/img/Picture4-removebg-preview.png"
import Section2Image from "../assets/img/Picture5.jpg"
import Section3Image from "../assets/img/Picture7-removebg-preview.png"
import Section4Image from "../assets/img/Picture9-removebg-preview.png"

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
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const NavBar = styled.nav`
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1001;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 10px;
  border-radius: 10px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 30px;
  }
`;

const NavItem = styled.a`
  position: relative;
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #333, #555);
  }

  ${props => props.active && `
    background: linear-gradient(135deg, #333, #555);
    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: #fff;
    }
  `}

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 15px;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  left: 50px;
  background: linear-gradient(135deg, #333, #555);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  pointer-events: none;

  ${NavItem}:hover & {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    position: static;
    opacity: 1;
    transform: none;
    background: none;
    font-size: 18px;
    margin-left: 10px;
  }
`;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.bgColor || '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
  flex-direction: column;
    padding: 20px 0;
    min-height: auto;
  }
`;

const SectionLeft = styled.div`
  flex: 1;
  max-width: 600px;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 1;
    max-width: 50%;
    padding: 15px;
    text-align: left;
  }

  @media (max-width: 480px) {
    max-width: 45%;
    padding: 10px;
  }
`;

const SectionRight = styled.div`
  flex: 1;
  max-width: 600px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1;
    max-width: 50%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    max-width: 55%;
    padding: 10px;
  }
`;

const Head = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }
`;

const SubHead = styled.p`
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  color: #fff;
  line-height: 1.6;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 2vw, 1rem);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #333, #555);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  align-self: flex-start;

  &:hover, &:focus {
    background: linear-gradient(135deg, #444, #666);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    animation: ${pulse} 0.8s infinite;
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    align-self: flex-start;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

const CarouselWrapper = styled.div`
 
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 100px auto 40px;
  padding: 20px 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    margin-top: 80px;
    padding: 15px 10px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 0;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
  transform: translateY(20px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.1s;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  @media (min-width: 768px) {
    margin-right: 40px;
  }
`;

const Heading = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.2s;

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
  font-size: clamp(1.1rem, 3vw, 1.2rem);
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.3s;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GetStartedButton = styled.button`
  background: linear-gradient(135deg, #333, #555);
  color: white;
  border: none;
  padding: 12px 35px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease, background 0.3s ease;
  transition-delay: 0.4s;

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

  &:hover, &:focus {
    background: linear-gradient(135deg, #444, #666);
    transform: translateY(-2px);
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.2);
    animation: ${pulse} 0.8s infinite;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid #666;
    outline-offset: 2px;
  }
`;

const StatsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.5s;

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  opacity: 0;
  transform: scale(0.95);
  transition-delay: ${props => props.delay || '0s'};
  backdrop-filter: blur(5px);

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: linear-gradient(135deg, ${props => props.bgColor}, ${props => props.bgColorEnd || props.bgColor});
  color: white;
  font-size: 1.8rem;
  animation: ${float} 2s ease-in-out infinite;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(8deg);
  }
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  position: relative;
  transition: transform 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, ${props => props.accentColor || '#4285F4'}, transparent);
    transition: width 0.4s ease;
  }

  ${StatCard}:hover & {
    transform: translateY(-2px);

    &::after {
      width: 100%;
    }
  }
`;

const StatLabel = styled.span`
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  color: #777;
  transition: color 0.3s ease;

  ${StatCard}:hover & {
    color: #555;
  }
`;

const FeaturesSection = styled.section`
  margin-top: 40px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.6s;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  position: relative;
  min-height: 170px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 20px 25px;
  background-color: ${props => props.bgColor};
  color: white;
  overflow: hidden;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(20px);
  transition-delay: ${props => 0.7 + (props.index * 0.1)}s;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    transform: scale(1.02) translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  position: relative;
  z-index: 1;
  font-size: 2.2rem;
  margin-bottom: 12px;
  opacity: 0.9;
  transition: transform 0.4s ease;

  ${FeatureItem}:hover & {
    transform: translateY(-4px) scale(1.1);
  }
`;

const FeatureText = styled.p`
  position: relative;
  z-index: 1;
  font-size: clamp(0.95rem, 2.5vw, 1rem);
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
  transition: transform 0.3s ease;

  ${FeatureItem}:hover & {
    transform: translateY(-2px);
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
  const sectionRefs = useRef([]);
  const carouselRef = useRef(null);
  const [activeSection, setActiveSection] = useState('carousel');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px'
    };

    const animateElements = () => {
      if (containerRef.current) containerRef.current.classList.add('visible');
      setTimeout(() => {
        if (heroSectionRef.current) heroSectionRef.current.classList.add('visible');
      }, 100);
      setTimeout(() => {
        if (heroContentRef.current) heroContentRef.current.classList.add('visible');
      }, 200);
      setTimeout(() => {
        if (headingRef.current) headingRef.current.classList.add('visible');
      }, 300);
      setTimeout(() => {
        if (subTextRef.current) subTextRef.current.classList.add('visible');
      }, 400);
      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.classList.add('visible');
      }, 500);
      setTimeout(() => {
        if (statsContainerRef.current) statsContainerRef.current.classList.add('visible');
      }, 600);
      statCardRefs.current.forEach((card, index) => {
        setTimeout(() => {
          if (card) card.classList.add('visible');
        }, 700 + (index * 100));
      });
      setTimeout(() => {
        if (featuresSectionRef.current) featuresSectionRef.current.classList.add('visible');
      }, 900);
      featureItemRefs.current.forEach((feature, index) => {
        setTimeout(() => {
          if (feature) feature.classList.add('visible');
        }, 1000 + (index * 100));
      });
      sectionRefs.current.forEach((section, index) => {
        setTimeout(() => {
          if (section) section.classList.add('visible');
        }, 200 + (index * 200));
      });
    };

    animateElements();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target === carouselRef.current) {
            setActiveSection('carousel');
          } else if (entry.target === heroSectionRef.current) {
            setActiveSection('more');
          } else {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveSection(`section${index + 1}`);
            }
          }
        }
      });
    }, observerOptions);

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });
    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }
    featureItemRefs.current.forEach(feature => {
      if (feature) observer.observe(feature);
    });

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
      featureItemRefs.current.forEach(feature => {
        if (feature) observer.unobserve(feature);
      });
    };
  }, []);

  const scrollToSection = (target) => {
    if (target === 'carousel') {
      carouselRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'more') {
      heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const index = parseInt(target.replace('section', '')) - 1;
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    {
      bgColor: '#AB6604',
      head: 'Intellectual Property Right Solutions',
      subHead: 'Protecting ideas, preserving value, powering progress.',
      image: Section1Image,
      alt: 'IP Solutions Hero Image',
      reverse: false
    },
    {
      bgColor: '#0271B1',
      head: 'IP Lifecycle Management',
      subHead: 'Streamline your IP strategy from creation to monetization.',
      image: Section2Image,
      alt: 'IP Lifecycle Hero Image',
      reverse: true
    },
    {
      bgColor: '#8E2D8D',
      head: 'Scientific & Technology Solutions',
      subHead: 'Innovate with cutting-edge research and IP protection.',
      image: Section3Image,
      alt: 'Tech Solutions Hero Image',
      reverse: false
    },
    {
      bgColor: '#5050A0',
      head: 'Strategic & Legal Advisory',
      subHead: 'Navigate complex IP landscapes with expert guidance.',
      image: Section4Image,
      alt: 'Advisory Hero Image',
      reverse: true
    }
  ];

  const navItems = [
    { id: 'carousel', icon: <FaHome />, label: 'Go to Next Section', ref: carouselRef },
    { id: 'section1', icon: <FaLightbulb />, label: 'Section 1', ref: sectionRefs.current[0] },
    { id: 'section2', icon: <FaFlask />, label: 'Section 2', ref: sectionRefs.current[1] },
    { id: 'section3', icon: <FaLaptop />, label: 'Section 3', ref: sectionRefs.current[2] },
    { id: 'section4', icon: <FaGavel />, label: 'Section 4', ref: sectionRefs.current[3] },
    // { id: 'more', icon: <FaHome />, label: 'More Info', ref: heroSectionRef },
  ];

  const statColors = [
    { bgColor: '#4285F4', bgColorEnd: '#5E97F7', accentColor: '#4285F4' },
    { bgColor: '#F5B7B1', bgColorEnd: '#F8CFC9', accentColor: '#F5B7B1' },
    { bgColor: '#F4D03F', bgColorEnd: '#F7DC6F', accentColor: '#F4D03F' },
    { bgColor: '#58D68D', bgColorEnd: '#82E0AB', accentColor: '#58D68D' }
  ];

  const featureColors = [
    { bgColor: 'rgba(100, 100, 200, 0.8)' },
    { bgColor: 'rgba(20, 40, 100, 0.8)' },
    { bgColor: 'rgba(248, 137, 137, 0.8)' },
    { bgColor: 'rgba(200, 100, 200, 0.8)' }
  ];

  return (
    <>
      <CarouselWrapper ref={carouselRef}>
        <Carousel1 />
      </CarouselWrapper>
      <NavBar isOpen={isOpen}>
        {navItems.map(item => (
          <NavItem
            key={item.id}
            active={activeSection === item.id}
            onClick={() => {
              scrollToSection(item.id);
              setIsOpen(false);
            }}
            aria-label={`Navigate to ${item.label}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToSection(item.id)}
          >
            {item.icon}
            <Tooltip>{item.label}</Tooltip>
          </NavItem>
        ))}
      </NavBar>
      {sections.map((section, index) => (
        <Section
          key={index}
          bgColor={section.bgColor}
          reverse={section.reverse}
          ref={el => sectionRefs.current[index] = el}
        >
          <SectionLeft>
            <Head>{section.head}</Head>
            <SubHead>{section.subHead}</SubHead>
            <Button aria-label={`Read more about ${section.head}`}>Read More</Button>
          </SectionLeft>
          <SectionRight>
            <Image src={section.image} alt={section.alt} />
          </SectionRight>
        </Section>
      ))}
      <Container ref={containerRef}>
        <HeroSection ref={heroSectionRef}>
          <HeroContent ref={heroContentRef}>
            <Heading ref={headingRef}>Powering Your Innovations</Heading>
            <SubText ref={subTextRef}>
              Lifeintelect is a Bangalore-based technology and intellectual property consulting firm. We help protect your ideas and achieve your business goals by maximizing the synergy among Technology, Law, and Business.
            </SubText>
            <GetStartedButton ref={buttonRef} aria-label="Learn more about Lifeintelect services">Learn More</GetStartedButton>
          </HeroContent>

          <StatsContainer ref={statsContainerRef}>
            <StatCard ref={el => statCardRefs.current[0] = el} delay="0.1s">
              <IconContainer bgColor={statColors[0].bgColor} bgColorEnd={statColors[0].bgColorEnd} aria-hidden="true">
                <FaUsers />
              </IconContainer>
              <StatContent>
                <StatValue accentColor={statColors[0].accentColor}>500+</StatValue>
                <StatLabel>Clients in Patent and Design</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard ref={el => statCardRefs.current[1] = el} delay="0.2s">
              <IconContainer bgColor={statColors[1].bgColor} bgColorEnd={statColors[1].bgColorEnd} aria-hidden="true">
                <FaGavel />
              </IconContainer>
              <StatContent>
                <StatValue accentColor={statColors[1].accentColor}>4000+</StatValue>
                <StatLabel>IP Filings</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard ref={el => statCardRefs.current[2] = el} delay="0.3s">
              <IconContainer bgColor={statColors[2].bgColor} bgColorEnd={statColors[2].bgColorEnd} aria-hidden="true">
                <FaGraduationCap />
              </IconContainer>
              <StatContent>
                <StatValue accentColor={statColors[2].accentColor}>6550+</StatValue>
                <StatLabel>Total People Trained</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard ref={el => statCardRefs.current[3] = el} delay="0.4s">
              <IconContainer bgColor={statColors[3].bgColor} bgColorEnd={statColors[3].bgColorEnd} aria-hidden="true">
                <FaGlobeAmericas />
              </IconContainer>
              <StatContent>
                <StatValue accentColor={statColors[3].accentColor}>2500+</StatValue>
                <StatLabel>Global Projects Executed</StatLabel>
              </StatContent>
            </StatCard>
          </StatsContainer>
        </HeroSection>

        <FeaturesSection ref={featuresSectionRef}>
          <FeatureGrid>
            <FeatureItem ref={el => featureItemRefs.current[0] = el} bgColor={featureColors[0].bgColor} index={0}>
              <FeatureIcon><FaLock /></FeatureIcon>
              <FeatureText>IP Solutions</FeatureText>
            </FeatureItem>

            <FeatureItem ref={el => featureItemRefs.current[1] = el} bgColor={featureColors[1].bgColor} index={1}>
              <FeatureIcon><FaFlask /></FeatureIcon>
              <FeatureText>IP Lifecycle Management</FeatureText>
            </FeatureItem>

            <FeatureItem ref={el => featureItemRefs.current[2] = el} bgColor={featureColors[2].bgColor} index={2}>
              <FeatureIcon><FaLaptop /></FeatureIcon>
              <FeatureText>Scientific and Technology Solutions</FeatureText>
            </FeatureItem>

            <FeatureItem ref={el => featureItemRefs.current[3] = el} bgColor={featureColors[3].bgColor} index={3}>
              <FeatureIcon><FaLightbulb /></FeatureIcon>
              <FeatureText>Strategy & Advisory</FeatureText>
            </FeatureItem>
          </FeatureGrid>
        </FeaturesSection>
      </Container>
    </>
  );
};

export default Herosection;
