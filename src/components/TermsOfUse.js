import { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Modern animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
    padding-top: 24px;
    padding-bottom: 8px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotateBack = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

// Modern global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f8fafc;
    margin: 0;
    padding: 0;
    color: #1e293b;
    line-height: 1.6;
  }

  * {
    box-sizing: border-box;
  }
`;

// Modern container with subtle max-width constraint
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
  animation: ${fadeIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

// Modern title with gradient text
const Title = styled.h1`
  color: transparent;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 64px 0 48px;
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin-top: 230px;
  
  @media (max-width: 640px) {
    font-size: 2rem;
    margin: 48px 0 32px;
  }
`;

const SectionsContainer = styled.div`
  margin-bottom: 64px;
`;

// Modern section wrapper with smooth transition
const SectionWrapper = styled.div`
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.highlighted ? '#e0e7ff' : '#f1f5f9'};
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border-color: ${props => props.highlighted ? '#c7d2fe' : '#e2e8f0'};
  }
`;

// Modern header with better spacing
const SectionHeader = styled.div`
  padding: 20px 24px;
  background: ${props => props.highlighted ? '#f8fafc' : 'white'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.highlighted ? '#f1f5f9' : '#f8fafc'};
  }
`;

// Modern section title with better typography
const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.highlighted ? '#3b82f6' : '#1e293b'};
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

// Modern content area with better spacing
const SectionContent = styled.div`
  padding: ${props => props.isActive ? '0 24px 24px' : '0 24px'};
  max-height: ${props => props.isActive ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
  border-top: ${props => props.isActive ? '1px solid #f1f5f9' : 'none'};
`;

// Modern paragraph with better readability
const Paragraph = styled.p`
  margin: 0 0 16px;
  line-height: 1.7;
  color: #475569;
  font-size: 0.9375rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// Modern arrow icon with better styling
const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.isActive ? '#e0e7ff' : '#f1f5f9'};
  transition: all 0.3s ease;
  animation: ${props => props.isActive ? rotate : rotateBack} 0.3s forwards;
  
  svg {
    width: 16px;
    height: 16px;
    stroke: ${props => props.isActive ? '#3b82f6' : '#64748b'};
    stroke-width: 2.5px;
  }
`;

// Main component
export default function TermsOfUse() {
  const [activeSection, setActiveSection] = useState(null);
  
  // Animation for entry of elements
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle section click
  const handleSectionClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Terms of Use</Title>
        
        <SectionsContainer>
          <Section 
            title="Terms of Use" 
            isActive={activeSection === 'general'} 
            onClick={() => handleSectionClick('general')}
          >
            <Paragraph>Access to and use of this website ("www.lifeintelect.com") is subject to the Terms and Conditions set forth herein. Any use of this website shall constitute acceptance of these Terms and Conditions. 'LifeIntelect' reserves the right to modify the Terms and Conditions for the website at any time.</Paragraph>
            <Paragraph>Lifeintelect Website contains materials such as case studies, articles, news, photos, infographics, blogs, product and service description. All intellectual property rights contained in this website belong to 'LifeIntelect'. This material includes, but is not limited to the text, layout, look, design, appearance and graphics.</Paragraph>
            <Paragraph>Lifeintelect owns all intellectual property rights including, without limitation, rights to invention, copyrights and related rights, trademark, rights in design, goodwill, business names, domain names, database rights, rights to use, confidentiality information, technical know-how, in each case whether registered or unregistered in the website.</Paragraph>
            <Paragraph>You may not delete or alter in any manner any text, trademark, other proprietary rights or in any documents or content supplied to you. You are not permitted to use the Lifeintelect trademarks, trade names, designs and logos present on Lifeintelect Website or incorporated in any materials.</Paragraph>
            <Paragraph>Without prior written consent, you shall not copy, post, display, translate, republish, transmit, reproduce or distribute any content appearing on the Website. The material may be viewed, reproduced or re-used only for private, non-commercial purposes only and with proper attribution.</Paragraph>
          </Section>

          <Section 
            title="Disclaimer" 
            isActive={activeSection === 'disclaimer'} 
            onClick={() => handleSectionClick('disclaimer')}
            highlighted={true}
          >
            <Paragraph>The materials provided in this website are solely for the purposes of informing, assisting, and guiding our clients, associates and other professionals and are not in anyway a substitute for professional opinion or advice.</Paragraph>
            <Paragraph>This website is meant solely for the purpose of information and not for the purpose of advertising or solicitation. We do not take responsibility for decisions taken by the reader based solely on the information provided in the website. It is not and does not claim to be legal or other advice.</Paragraph>
            <Paragraph>The transmission of this website, and/or communication with 'LifeIntelect' via e-mail through this website shall not constitute or create a client-consultant relationship between you and 'LifeIntelect'. While we endeavour to ensure that the contents of the site are accurate and are true to the best of our knowledge, errors or omissions may occur and we do not accept any liability in respect of them. If there is any discrepancy, please do feel free to bring it to our notice.</Paragraph>
            <Paragraph>Any links provided on the site are provided for your convenience and for informational purpose only– their inclusion does not imply any approval or endorsement by us. We have no control over the content of those sites and 'LifeIntelect' disclaims all liability with regard to your access of such linked web sites.</Paragraph>
          </Section>

          <Section 
            title="Privacy Policy" 
            isActive={activeSection === 'privacy'} 
            onClick={() => handleSectionClick('privacy')}
            highlighted={true}
          >
            <Paragraph>The personal data provided by the clients at the beginning of, or during the course of, consultation and training process shall be processed and stored. All your personnel data including, names, phone numbers and email addresses entered in this site will be used exclusively for the stated purpose only and will not be made available to any other party.</Paragraph>
          </Section>
        </SectionsContainer>
      </Container>
    </>
  );
}

// Section component with animation
const Section = ({ title, children, isActive, onClick, highlighted = false }) => {
  return (
    <SectionWrapper highlighted={highlighted}>
      <SectionHeader highlighted={highlighted} onClick={onClick}>
        <SectionTitle highlighted={highlighted}>{title}</SectionTitle>
        <ArrowIcon isActive={isActive}>
          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </ArrowIcon>
      </SectionHeader>
      <SectionContent isActive={isActive}>
        {children}
      </SectionContent>
    </SectionWrapper>
  );
};