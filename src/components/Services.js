import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --primary-gradient: linear-gradient(to right, #8b5cf6, #d946ef);
    --secondary-gradient: linear-gradient(to right, #a78bfa, #f0abfc);
    --bg-gradient: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
    --card-bg: rgba(255, 255, 255, 0.9);
    --dark-text: #1e293b;
    --light-text: #64748b;
    --primary-glow: rgba(139, 92, 246, 0.2);
    --white: #ffffff;
    --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  /* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    color: var(--dark-text);
    line-height: 1.6;
    background: var(--bg-gradient);
    overflow-x: hidden;
  } */
`;

// Container component
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Keyframes
const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Hero Section Components
const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: var(--primary-gradient);
    opacity: 0.05;
    filter: blur(120px);
    animation: ${float} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: var(--secondary-gradient);
    opacity: 0.05;
    filter: blur(80px);
    animation: ${float} 12s ease-in-out infinite alternate;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 850px;
  margin: 0 auto;
  margin-top: 100px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${fadeUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  max-width: 700px;
  margin: 0 auto 2.5rem;
  font-size: 1.1rem;
  color: var(--light-text);
  animation: ${fadeUp} 1s ease-out 0.2s backwards;
`;

const FormContainer = styled.div`
  background: var(--white);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 3rem;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid rgba(209, 213, 219, 0.5);
  animation: ${fadeUp} 1s ease-out 0.4s backwards;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e5e7eb;
  background-color: var(--white);
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }
`;

const Button = styled.button`
  background: var(--primary-gradient);
  color: var(--white);
  border: none;
  cursor: pointer;
  font-weight: 600;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

// Section Components
const Section = styled.section`
  padding: 100px 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: var(--light-text);
  max-width: 700px;
  margin: 0 auto 4rem;
`;

// Info Card Components
const InfoCard = styled.div`
  background: var(--card-bg);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: var(--primary-gradient);
    opacity: 0.05;
    filter: blur(40px);
    z-index: -1;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const InfoContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const InfoImage = styled.div`
  flex: 0 0 200px;
  position: relative;

  img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: var(--shadow-sm);
    border: 4px solid white;
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
    background: var(--primary-gradient);
    border-radius: 1rem;
    z-index: 0;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    order: -1;
    margin-bottom: 1.5rem;
  }
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--dark-text);
`;

const InfoText = styled.p`
  color: var(--light-text);
  margin-bottom: 1rem;
  line-height: 1.8;
`;

// Process Section Components
const ProcessSection = styled(Section)`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: -5%;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: var(--primary-gradient);
    opacity: 0.05;
    filter: blur(70px);
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10%;
    right: -5%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: var(--secondary-gradient);
    opacity: 0.05;
    filter: blur(100px);
    z-index: -1;
  }
`;

const ProcessCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const ProcessCard = styled.div`
  background-color: var(--white);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-md);
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(209, 213, 219, 0.5);
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--primary-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  margin: 0 auto 2rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 1rem;
  transition: transform 0.3s ease;

  ${ProcessCard}:hover & {
    transform: scale(1.1);
    background: var(--primary-gradient);
  }
`;

const Icon = styled.svg`
  color: #8b5cf6;
  transition: all 0.3s ease;
  
  ${ProcessCard}:hover & {
    filter: brightness(10);
  }
`;

const ProcessCardTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ProcessCardText = styled.p`
  color: var(--light-text);
  line-height: 1.7;
`;

// Service Card Components
const ServiceCard = styled.div`
  background: var(--card-bg);
  margin-bottom: 4rem;
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(209, 213, 219, 0.5);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const ServiceContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ServiceImage = styled.div`
  flex: 0 0 250px;
  text-align: center;
  position: relative;

  img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: var(--shadow-sm);
    transition: transform 0.3s ease;
  }

  ${ServiceCard}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    order: -1;
    margin-bottom: 1.5rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: var(--dark-text);
`;

const ServiceText = styled.p`
  color: var(--light-text);
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: var(--primary-gradient);
  color: var(--white);
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

// Icons
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2"></path>
  </svg>
);

// Main App Component
const Services = () => {
  return (
    <>
      <GlobalStyle />
      
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroTitle>Take our Service to Patent your Idea</HeroTitle>
            <HeroText>
              Secure your innovation and intellectual property with our comprehensive patent services. 
              We guide you through every step of the patenting process to protect what matters most: your ideas.
            </HeroText>
            
            <FormContainer>
              <FormGroup>
                <Input type="text" placeholder="Full Name" required />
                <Input type="email" placeholder="Email Address" required />
                <Button type="submit">
                  Get Started
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Button>
              </FormGroup>
            </FormContainer>
          </HeroContent>
        </Container>
      </HeroSection>
      
      {/* Info Section */}
      <Section>
        <Container>
          <InfoCard>
            <InfoContent>
              <InfoTitle>What is a Patent?</InfoTitle>
              <InfoText>
                A patent is a monopoly right granted by the State to an inventor to exclude others from commercially 
                exploiting the invention for a limited period, in return for the disclosure of the invention, 
                so that others may gain benefit of the invention.
              </InfoText>
              <InfoText>
                Patents give patentee the right to prevent third parties from making, using, or offering for sale 
                the patented product or process. Patents are territorial rights. This monopoly lasts 20 years 
                from the date of filing (subject to grant and the payment of annual renewal fees).
              </InfoText>
            </InfoContent>
            <InfoImage>
              <img src="https://brainiac.co.in/wp-content/uploads/2023/08/Idea-Generation-1024x1024.png" alt="Patent Certificate" />
            </InfoImage>
          </InfoCard>
        </Container>
      </Section>
      
      {/* Process Section */}
      <ProcessSection>
        <Container>
          <SectionTitle>How you can Patent your product & process</SectionTitle>
          <SectionSubtitle>To successfully patent your innovation, it must meet these three essential criteria.</SectionSubtitle>
          
          <ProcessCards>
            <ProcessCard>
              <IconContainer>
                <PlusIcon />
              </IconContainer>
              <ProcessCardTitle>It must be new</ProcessCardTitle>
              <ProcessCardText>
                Your invention must be novel and not previously disclosed to the public in any form, 
                anywhere in the world. This novelty requirement ensures you're bringing something genuinely new to the field.
              </ProcessCardText>
            </ProcessCard>
            
            <ProcessCard>
              <IconContainer>
                <StarIcon />
              </IconContainer>
              <ProcessCardTitle>It must be inventive</ProcessCardTitle>
              <ProcessCardText>
                Your invention must involve an inventive step that would not be obvious to someone with knowledge and experience 
                in the subject. This demonstrates creative problem-solving beyond standard solutions.
              </ProcessCardText>
            </ProcessCard>
            
            <ProcessCard>
              <IconContainer>
                <StarIcon />
              </IconContainer>
              <ProcessCardTitle>It must be industrially applicable</ProcessCardTitle>
              <ProcessCardText>
                Your invention must be capable of being made or used in some kind of industry, demonstrating practical utility. 
                This ensures your patent has real-world value and implementation potential.
              </ProcessCardText>
            </ProcessCard>
          </ProcessCards>
        </Container>
      </ProcessSection>
      
      {/* Services Section */}
      <Section>
        <Container>
          <SectionTitle>Our Services</SectionTitle>
          <SectionSubtitle>We offer comprehensive patent services to protect your intellectual property and maximize its value.</SectionSubtitle>
          
          <ServiceCard>
            <ServiceContent>
              <ServiceTitle>Patent Search Services</ServiceTitle>
              <ServiceText>
                A patentability search enables to check the patentability of an invention before applying for patent protection. 
                Patentability evaluation helps in drafting a patent specification in highlighting the true novelty and usefulness 
                of the invention. A full documentation of all the patentability searches is provided in form of a patent search report.
              </ServiceText>
              <StyledLink href="#">
                Know more
                <ArrowIcon />
              </StyledLink>
            </ServiceContent>
            <ServiceImage>
              <img src="https://images.yourstory.com/cs/1/b3c9758f-ab5e-11e8-8691-f70342131e20/patent-law-gavel-book_(1)1564577705723.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75" alt="Patent Search" />
            </ServiceImage>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceContent>
              <ServiceTitle>Patent Preparation and Execution</ServiceTitle>
              <ServiceText>
                A patentability search enables to check the patentability of an invention before applying for patent protection. 
                Patentability evaluation helps in drafting a patent specification in highlighting the true novelty and usefulness 
                of the invention. A full documentation of all the patentability searches is provided in form of a patent search report.
              </ServiceText>
              <StyledLink href="#">
                Know more
                <ArrowIcon />
              </StyledLink>
            </ServiceContent>
            <ServiceImage>
              <img src="https://fastercapital.com/i/Patent-attorney--Guiding-Inventors-through-the-First-to-File-Rule--Navigating-the-Patent-Application-Process.webp" alt="Patent Preparation" />
            </ServiceImage>
          </ServiceCard>
        </Container>
      </Section>
    </>
  );
};

export default Services;


