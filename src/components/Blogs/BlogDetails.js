import React from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBlog } from '../hooks/UseBlog';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Main Container
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

// Hero Section
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 120px 0 80px 0;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #ffffff);
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 140px 20px 80px 20px;
  }
`;

const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
  width: 100%;
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  max-width: 900px;
  margin: 0 auto;
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 30px;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 25px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: ${slideInLeft} 1s ease-out 0.2s both;
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 300;
  animation: ${slideInLeft} 1s ease-out 0.4s both;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const MetaSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 50px;
  animation: ${fadeIn} 1s ease-out 0.6s both;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;

const MetaCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .value {
    font-size: 1.1rem;
    color: white;
    font-weight: 600;
  }
`;

const HeroImageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  animation: ${scaleIn} 1s ease-out 0.8s both;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    border-radius: 30px;
    filter: blur(20px);
    z-index: -1;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

// Content Section
const ContentSection = styled.section`
  background: #ffffff;
  position: relative;
  z-index: 3;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 60px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const ContentBlock = styled.div`
  margin-bottom: 80px;
  animation: ${fadeIn} 0.8s ease-out;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
  position: relative;
  line-height: 1.2;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 50px 0 25px 0;
  line-height: 1.3;
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 4px;
    height: 40px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    padding-left: 16px;
    
    &::before {
      height: 32px;
      top: 6px;
    }
  }
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444444;
  margin-bottom: 30px;
  text-align: justify;
  font-weight: 400;
  
  &:first-letter {
    font-size: 3.5rem;
    font-weight: 700;
    float: left;
    line-height: 1;
    margin: 8px 8px 0 0;
    color: #667eea;
    font-family: serif;
  }
`;

const RegularParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444444;
  margin-bottom: 30px;
  text-align: justify;
  font-weight: 400;
`;

const ModernList = styled.ul`
  margin: 40px 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 20px 0 20px 60px;
    margin-bottom: 16px;
    font-size: 1.2rem;
    line-height: 1.7;
    color: #444444;
    background: #f8f9ff;
    border-radius: 16px;
    border-left: 4px solid #667eea;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);

    &::before {
      content: '';
      position: absolute;
      left: 20px;
      top: 28px;
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    }

    &:hover {
      transform: translateX(8px);
      background: #f0f2ff;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
    }
  }
`;

const ModernOrderedList = styled.ol`
  margin: 40px 0;
  padding: 0;
  list-style: none;
  counter-reset: step-counter;

  li {
    counter-increment: step-counter;
    position: relative;
    padding: 25px 25px 25px 80px;
    margin-bottom: 20px;
    font-size: 1.2rem;
    line-height: 1.7;
    color: #444444;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
    border-radius: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
    border: 1px solid rgba(102, 126, 234, 0.1);

    &::before {
      content: counter(step-counter);
      position: absolute;
      left: 20px;
      top: 20px;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.2);
      background: linear-gradient(135deg, #f0f2ff 0%, #e8ebff 100%);
    }
  }
`;

const ContentImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  margin: 50px 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
  }
`;

// Loading States
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-bottom: 30px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.7) 25%, white 50%, rgba(255, 255, 255, 0.7) 75%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 2s infinite;
  font-weight: 300;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 0 20px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
  }
`;

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, blogContent, loading, error } = useBlog(id);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading amazing content...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
      </ErrorContainer>
    );
  }

  if (!blog || !blogContent) {
    return (
      <ErrorContainer>
        <h2>Content Not Found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
      </ErrorContainer>
    );
  }

  const renderContent = (content, isFirst = false) => {
    switch (content.type) {
      case 'paragraph':
        return isFirst ? 
          <StyledParagraph>{content.data}</StyledParagraph> :
          <RegularParagraph>{content.data}</RegularParagraph>;
      case 'bullets':
        return (
          <ModernList>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ModernList>
        );
      case 'steps':
        return (
          <ModernOrderedList>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ModernOrderedList>
        );
      case 'image':
        return <ContentImage src={content.data} alt="" />;
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <CategoryBadge>{blog.category}</CategoryBadge>
            <HeroTitle>{blogContent.header.title}</HeroTitle>
            <HeroSubtitle>{blogContent.header.tagline}</HeroSubtitle>
            
            <MetaSection>
              <MetaCard>
                <div className="label">Published</div>
                <div className="value">{blog.date}</div>
              </MetaCard>
            </MetaSection>

            <HeroImageContainer>
              <HeroImage
                src={blogContent.header.coverImage}
                alt={blogContent.header.title}
              />
            </HeroImageContainer>
          </HeroContent>
        </HeroContainer>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          {blogContent.sections.map((section, sectionIndex) => (
            <ContentBlock key={sectionIndex}>
              {section.title && <SectionTitle>{section.title}</SectionTitle>}
              {section.subtitle && <SectionSubtitle>{section.subtitle}</SectionSubtitle>}
              <div>
                {section.contents.map((content, contentIndex) => (
                  <div key={contentIndex}>
                    {renderContent(content, sectionIndex === 0 && contentIndex === 0)}
                  </div>
                ))}
              </div>
            </ContentBlock>
          ))}
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default BlogDetail;