import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// const slideIn = keyframes`
//   from { transform: translateX(-50px); opacity: 0; }
//   to { transform: translateX(0); opacity: 1; }
// `;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled.div`
  color: #333;
  max-width: 100%;
  overflow-x: hidden;
`;

const Hero = styled.section`
  height: 80vh;
  background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-simple-e-commerce-jobs-cooperation-image_21195.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  opacity: 0;
`;

const ScrollDownIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${pulse} 2s infinite;
  cursor: pointer;
  
  &::after {
    content: "↓";
    color: white;
    font-size: 2rem;
  }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 4px;
    background-color: #4568dc;
  }
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #4568dc;
`;

const JobLocation = styled.div`
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: "📍";
    margin-right: 5px;
  }
`;

const JobDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ApplyButton = styled.button`
  background: linear-gradient(135deg, #4568dc, #b06ab3);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TeamSection = styled(Section)`
  /* background-color: #f8f9fa; */
`;

const TeamMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled.div`
  text-align: center;
  width: 250px;
`;

const TeamMemberAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ddd;
  margin: 0 auto 1rem;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(69, 104, 220, 0.2), rgba(176, 106, 179, 0.2));
  }
`;

const TeamMemberName = styled.h3`
  margin-bottom: 0.5rem;
`;

const TeamMemberRole = styled.p`
  color: #666;
  font-style: italic;
`;

const BenefitsSection = styled(Section)`
  /* background: linear-gradient(135deg, #f6f9fc, #eef1f5); */
`;

const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BenefitItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(69, 104, 220, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const BenefitTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const BenefitDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const CallToAction = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #4568dc, #b06ab3);
  color: white;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    animation: ${fadeIn} 1s ease-out;
  }
  
  p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto 2rem;
    animation: ${fadeIn} 1s ease-out 0.3s forwards;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #4568dc;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// const Footer = styled.footer`
//   padding: 3rem 2rem;
//   background-color: #333;
//   color: #fff;
//   text-align: center;
// `;

// Main Component
const CareersPage = () => {
  const sectionRefs = useRef([]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  const scrollToOpenings = () => {
    const openingsSection = document.getElementById('openings');
    openingsSection.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <Hero>
        <HeroContent>
          <HeroTitle>Join Our Team</HeroTitle>
          <HeroSubtitle>
            Discover your next career opportunity and make an impact with innovative technology
          </HeroSubtitle>
        </HeroContent>
        <ScrollDownIndicator onClick={scrollToOpenings} />
      </Hero>
      
      <Section ref={addToRefs} id="openings">
        <SectionTitle>Open Positions</SectionTitle>
        <p>We're looking for talented individuals to join our growing team. Check out our current openings below.</p>
        
        <JobsGrid>
          <JobCard>
            <JobTitle>Senior React Developer</JobTitle>
            <JobLocation>San Francisco, CA</JobLocation>
            <JobDescription>
              We're looking for an experienced React developer to join our frontend team and help build amazing user experiences.
            </JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
          
          <JobCard>
            <JobTitle>UX/UI Designer</JobTitle>
            <JobLocation>Remote</JobLocation>
            <JobDescription>
              Join our design team to create intuitive and beautiful interfaces for our products that delight our users.
            </JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
          
          <JobCard>
            <JobTitle>Backend Engineer</JobTitle>
            <JobLocation>New York, NY</JobLocation>
            <JobDescription>
              Help us build scalable and robust backend systems using modern technologies and best practices.
            </JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
          
          <JobCard>
            <JobTitle>Product Manager</JobTitle>
            <JobLocation>Austin, TX</JobLocation>
            <JobDescription>
              Drive product strategy and execution, working closely with engineering, design, and marketing teams.
            </JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
          
          <JobCard>
            <JobTitle>DevOps Engineer</JobTitle>
            <JobLocation>Remote</JobLocation>
            <JobDescription>
              Build and maintain our infrastructure, deployment pipelines, and ensure reliability of our systems.
            </JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
          
          <JobCard>
            <JobTitle>Data Scientist</JobTitle>
            <JobLocation>Seattle, WA</JobLocation>
            <JobDescription>
              Analyze complex datasets to drive insights and product improvements using advanced statistical methods.
            </JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
        </JobsGrid>
      </Section>
      
      <TeamSection ref={addToRefs}>
        <SectionTitle>Meet Our Team</SectionTitle>
        <p>Get to know the people you'll be working with and the culture we've built together.</p>
        
        <TeamMembers>
          <TeamMember>
            <TeamMemberAvatar />
            <TeamMemberName>Sarah Johnson</TeamMemberName>
            <TeamMemberRole>CTO</TeamMemberRole>
          </TeamMember>
          
          <TeamMember>
            <TeamMemberAvatar />
            <TeamMemberName>David Chen</TeamMemberName>
            <TeamMemberRole>Engineering Lead</TeamMemberRole>
          </TeamMember>
          
          <TeamMember>
            <TeamMemberAvatar />
            <TeamMemberName>Emma Rodriguez</TeamMemberName>
            <TeamMemberRole>Design Director</TeamMemberRole>
          </TeamMember>
          
          <TeamMember>
            <TeamMemberAvatar />
            <TeamMemberName>Michael Lee</TeamMemberName>
            <TeamMemberRole>Product Manager</TeamMemberRole>
          </TeamMember>
        </TeamMembers>
      </TeamSection>
      
      <BenefitsSection ref={addToRefs}>
        <SectionTitle>Why Join Us?</SectionTitle>
        <p>We offer a range of benefits to support your personal and professional growth.</p>
        
        <BenefitsList>
          <BenefitItem>
            <BenefitIcon>🌱</BenefitIcon>
            <BenefitTitle>Professional Growth</BenefitTitle>
            <BenefitDescription>
              Dedicated learning budget and time for conferences, courses, and workshops.
            </BenefitDescription>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>🏖️</BenefitIcon>
            <BenefitTitle>Flexible PTO</BenefitTitle>
            <BenefitDescription>
              Take time off when you need it, with our unlimited PTO policy.
            </BenefitDescription>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>🏡</BenefitIcon>
            <BenefitTitle>Remote-Friendly</BenefitTitle>
            <BenefitDescription>
              Work from anywhere with our flexible remote work policy.
            </BenefitDescription>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>🩺</BenefitIcon>
            <BenefitTitle>Health Coverage</BenefitTitle>
            <BenefitDescription>
              Comprehensive health, dental, and vision insurance for you and your family.
            </BenefitDescription>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>💰</BenefitIcon>
            <BenefitTitle>Competitive Compensation</BenefitTitle>
            <BenefitDescription>
              Salary and equity packages that reward your contributions.
            </BenefitDescription>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitIcon>🧠</BenefitIcon>
            <BenefitTitle>Mental Wellness</BenefitTitle>
            <BenefitDescription>
              Access to mental health resources and wellness programs.
            </BenefitDescription>
          </BenefitItem>
        </BenefitsList>
      </BenefitsSection>
      
      <CallToAction ref={addToRefs}>
        <h2>Ready to Take the Next Step?</h2>
        <p>Join our team and help us build the future of technology.</p>
        <CTAButton onClick={scrollToOpenings}>View Open Positions</CTAButton>
      </CallToAction>
    </PageContainer>
  );
};

export default CareersPage;