import React, { useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import TeamSection from './TeamSection';
import { ArrowRight } from 'lucide-react';
import AboutUsHero from './AboutUsHero';
import { useLocation } from 'react-router-dom';


// Enhanced Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(138, 43, 226, 0.5); }
  50% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.8); }
  100% { box-shadow: 0 0 5px rgba(138, 43, 226, 0.5); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCursor = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: #8a2be2; }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 80px 0;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: -1;
`;

const OrbDecoration = styled.div`
  position: absolute;
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.4), rgba(70, 130, 180, 0.4));
  filter: blur(20px);
  top: ${props => props.top || '10%'};
  left: ${props => props.left || '10%'};
  animation: ${floatAnimation} ${props => props.duration || '6s'} ease-in-out infinite;
  z-index: -1;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  z-index: 2;
`;

const TypewriterContainer = styled.div`
  display: inline-block;
  margin-bottom: 30px;
`;

const TypewriterText = styled.h1`
  font-size: 62px;
  font-weight: 800;
  /* color: transparent; */
  background: linear-gradient(45deg, #8a2be2, #4682b0, #ff1493);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  animation: ${shimmerAnimation} 5s linear infinite;
  overflow: hidden;
  white-space: nowrap;
  border-right: 4px solid #8a2be2;
  animation: 
    ${typewriter} 3.5s steps(30) 1s 1 normal both,
    ${blinkCursor} 0.7s steps(30) infinite;
  
  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 40px;
  /* color: rgba(255, 255, 255, 0.8); */
  animation: ${fadeInUp} 1s ease forwards 1.5s;
  opacity: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const GradientButton = styled.button`
  padding: 16px 32px;
  background: linear-gradient(45deg, #8a2be2, #4682b0);
  background-size: 200% auto;
  /* color: white; */
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease forwards 2s;
  opacity: 0;
  
  &:hover {
    background-position: right center;
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(138, 43, 226, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transform: rotate(30deg);
    transition: all 0.3s ease;
    opacity: 0;
  }
  
  &:hover::after {
    opacity: 1;
    transform: rotate(30deg) translate(10%, 10%);
  }
`;

const Section = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  color:#4169E1;
  font-weight: 700;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #8a2be2, #4682b0);
    border-radius: 2px;
  }
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StoryContent = styled.div`
  max-width: 800px;
  text-align: center;
  margin-bottom: 60px;
`;

const StoryText = styled.p`
  font-size: 20px;
  line-height: 1.8;
  color:#454545;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  font-weight: 400;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 60px;
  width: 100%;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  width: 220px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, #8a2be2, #4682b0, #ff1493);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  
  &:hover {
    transform: translateY(-10px);
    animation: ${glowAnimation} 2s infinite;
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #8a2be2, #4682b0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const StatNumber = styled.div`
  font-size: 44px;
  font-weight: 700;
  background: linear-gradient(45deg, #8a2be2, #4682b0, #ff1493);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  /* color: transparent; */
  margin-bottom: 10px;
  animation: ${shimmerAnimation} 3s linear infinite;
`;

const StatLabel = styled.div`
  font-size: 18px;
  color:#454545;
  font-weight: 500;
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ValueCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, #8a2be2, #4682b0, #ff1493);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:hover ${StatIcon} {
    transform: rotate(360deg);
  }
`;

const ValueIconContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 30px;
`;


const ValueIconRing = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #8a2be2;
  animation: ${rotateAnimation} 8s linear infinite;
`;

const ValueIcon = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  background: linear-gradient(45deg, #8a2be2, #4682b0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const ValueTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  /* color: white; */
  font-weight: 600;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(to right, #8a2be2, #4682b0);
    border-radius: 1.5px;
  }
`;

const ValueDescription = styled.p`
  font-size: 16px;
  color:#454545;
  font-weight: 500;
  line-height: 1.6;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
`;

const TeamMember = styled.div`
  width: 250px;
  text-align: center;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover img {
    transform: scale(1.05);
    border-color: #8a2be2;
  }
  
  &:hover h3 {
    color: #8a2be2;
  }
`;

const TeamMemberImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 25px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(45deg, #8a2be2, #4682b0, #ff1493);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const TeamMemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.4s ease;
  filter: grayscale(20%);
  border: 5px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    filter: grayscale(0%);
  }
`;

const TeamMemberName = styled.h3`
  font-size: 22px;
  margin-bottom: 5px;
  /* color: white; */
  font-weight: 600;
  transition: all 0.3s ease;
`;

const TeamMemberRole = styled.p`
  font-size: 16px;
  color: #8a2be2;
  margin-bottom: 10px;
  font-weight: 500;
`;

const TeamMemberBio = styled.p`
  font-size: 14px;
  /* color: rgba(255, 255, 255, 0.7); */
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
`;
const TeamCTA = styled.div`
    margin: 41px;
  background: linear-gradient(135deg, #0047AB 0%, #4169E1 100%);
  padding: 4rem;
  border-radius: 24px;
  text-align: center;
  margin-top: 6rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 71, 171, 0.2);
  
  &::before, &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    z-index: 0;
  }
  
  &::before {
    top: -150px;
    right: -50px;
  }
  
  &::after {
    bottom: -150px;
    left: -50px;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  color: #0047AB;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    
    svg {
      transform: translateX(5px);
    }
  }
`;
const SocialLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: white; */
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #8a2be2, #4682b0);
    transform: translateY(-3px);
  }
`;

// Pulse animation specifically for backgrounds
const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const ValueIconBg = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8a2be2, #4682b0);
  opacity: 0.2;
  animation: ${pulseAnimation} 2s infinite;
`;
// Main Component
const AboutUs = () => {
  const storyRefs = useRef([]);
  const valueRefs = useRef([]);
  const teamRefs = useRef([]);
  const statRefs = useRef([]);
  const { hash } = useLocation();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    valueRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    teamRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    statRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      storyRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      
      valueRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      
      teamRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      
      statRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  
  const teamMembers = [
    { 
      name: 'Lipika Sahoo', 
      role: 'CEO & Founder', 
      image: 'https://www.lifeintelect.com/uploads/lifeintelect/lipikasahoo%20Founder%20%26%20CEO.jpg', 
      bio: 'Visionary leader with 15+ years of experience in tech innovation.'
    },
    { 
      name: 'Sophia Chen', 
      role: 'Creative Director', 
      image: 'https://via.placeholder.com/200', 
      bio: 'Award-winning designer bringing brands to life with stunning visuals.'
    },
    { 
      name: 'Marcus Williams', 
      role: 'Lead Developer', 
      image: 'https://via.placeholder.com/200', 
      bio: 'Code wizard who transforms complex ideas into elegant solutions.'
    },
    { 
      name: 'Ava Rodriguez', 
      role: 'Strategy Lead', 
      image: 'https://via.placeholder.com/200', 
      bio: 'Marketing genius with a knack for spotting trends before they happen.'
    },
  ];
  
  const values = [
    { 
      title: 'Excellence in Service', 
      description: 'We strive for excellence in everything we do, delivering high-quality services with precision and efficiency to exceed client expectations.', 
      icon: '✨' 
    },
    { 
      title: 'Confidentiality and Security', 
      description: 'We understand the importance of protecting sensitive information. We are committed to maintaining the highest levels of confidentiality and security for all client data and intellectual assets.', 
      icon: '🔒' 
    },
    {
      title: 'Client Centric Approach',
      description: 'Our clients’ success is our priority. We offer tailored solutions that protect their intellectual property and help them achieve their business objectives.',
      icon: '🎯' 
    },
    { 
      title: 'Integrity and Transparency', 
      description: 'We believe in honesty and openness in all our dealings, ensuring that our clients receive reliable, ethical advice and services every time.', 
      icon: '🛡️' 
    },
    { 
      title: 'Adaptibility and Agility', 
      description: 'We are committed to being flexible and responsive, adapting our strategies and services to meet the dynamic challenges of the ever-changing intellectual property landscape.', 
      icon: '🔄' 
    },
    { 
      title: 'Collaboration and Partnership', 
      description: 'We work closely with our clients, fostering long-term relationships built on trust and mutual success. We view our clients as partners and collaborate to achieve the best outcomes for their intellectual property.', 
      icon: '🤝' 
    },
  ];
  
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: '😊' },
    { number: '12+', label: 'Years Experience', icon: '⏳' },
    { number: '99.9%', label: 'Success Rate', icon: '🏆' },
    { number: '2500+', label: 'Successful Projects', icon: '✅' }
  ];
  
  const storyParagraphs = [
    "Founded in 2012, LifeIntelect has been at the forefront of helping innovators, startups, and businesses protect and maximize the value of their intellectual property (IP). With a focus on providing tailored IP solutions, we have earned the trust of clients across various industries, guiding them through the complexities of IP protection, management, and commercialization.",
    "As we continue to evolve, LifeIntelect remains dedicated to empowering our clients with innovative strategies that drive business success. Our journey is marked by a passion for turning ideas into valuable assets, ensuring that intellectual property remains a powerful tool for growth in an increasingly competitive global market. With each milestone, we look forward to the future, excited about the opportunities to help businesses scale and thrive."
  ];
  
  return (
    <>
      {/* <Hero>
        <BackgroundGradient />
        <OrbDecoration size="200px" top="10%" left="10%" duration="8s" />
        <OrbDecoration size="150px" top="70%" left="80%" duration="6s" />
        <OrbDecoration size="100px" top="40%" left="70%" duration="10s" />
        <OrbDecoration size="120px" top="80%" left="20%" duration="7s" />
        
        <Container>
          <HeroContent>
            <TypewriterContainer>
              <TypewriterText>Empowering Innovation</TypewriterText>
            </TypewriterContainer>
            <HeroSubtitle>
            To deliver world-class technological and IP solutions with high confidentiality standards, encompassing ideation, protection, and management, while safeguarding the interests of our clients and employees.
            </HeroSubtitle>
            <GradientButton>Discover Our Story</GradientButton>
          </HeroContent>
        </Container>
      </Hero> */}
      <AboutUsHero></AboutUsHero>
      <Section>
        <Container>
          <SectionTitle>Our Journey</SectionTitle>
          <StoryContainer>
            {storyParagraphs.map((paragraph, index) => (
              <StoryText 
                key={index} 
                ref={el => storyRefs.current[index] = el}
              >
                {paragraph}
              </StoryText>
            ))}
            
            <StatsContainer>
              {stats.map((stat, index) => (
                <StatCard 
                  key={index} 
                  ref={el => statRefs.current[index] = el}
                  style={{
                    transitionDelay: `${0.2 * index}s`
                  }}
                >
                  <StatIcon>{stat.icon}</StatIcon>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsContainer>
          </StoryContainer>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <SectionTitle>Our Core Values</SectionTitle>
          <ValuesContainer>
            {values.map((value, index) => (
              <ValueCard 
                key={index} 
                ref={el => valueRefs.current[index] = el}
                style={{
                  transitionDelay: `${0.2 * index}s`
                }}
              >
                <ValueIconContainer>
                  <ValueIconBg />
                  <ValueIconRing />
                  <ValueIcon>{value.icon}</ValueIcon>
                </ValueIconContainer>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesContainer>
        </Container>
      </Section>
      
      <Section>
        <Container>
          {/* <SectionTitle>The Dream Team</SectionTitle> */}
          <TeamSection id="team"></TeamSection>
          {/* <TeamContainer>
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index} 
                ref={el => teamRefs.current[index] = el}
                style={{
                  transitionDelay: `${0.2 * index}s`
                }}
              >
                <TeamMemberImageContainer>
                  <TeamMemberImage src={member.image} alt={member.name} />
                </TeamMemberImageContainer>
                <TeamMemberName>{member.name}</TeamMemberName>
                <TeamMemberRole>{member.role}</TeamMemberRole>
                <TeamMemberBio>{member.bio}</TeamMemberBio>
                <SocialLinks>
                  <SocialLink href="#">in</SocialLink>
                  <SocialLink href="#">tw</SocialLink>
                  <SocialLink href="#">ig</SocialLink>
                </SocialLinks>
              </TeamMember>
            ))}
          </TeamContainer> */}
        </Container>
      </Section>
      <TeamCTA 
            initial={{ opacity: 0, y: 50 }}
            // animate={isCTAInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <CTAContent>
              <CTATitle>Meet Our Team of Experts</CTATitle>
              <CTADescription>
                Our diverse team of patent attorneys, innovation strategists, and IP specialists brings decades of combined experience to your challenges. Get to know the people who will help protect and leverage your innovations.
              </CTADescription>
              <CTAButton 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Meet The Team <ArrowRight size={18} />
              </CTAButton>
            </CTAContent>
          </TeamCTA>
    </>
  );
};

export default AboutUs;