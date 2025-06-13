import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import presentationImg from "../assets/img/persentation1.png";
import presentationImg1 from "../assets/img/persentation.png";
import { Eye, Download, X, Play, Calendar, Users, Presentation, ArrowRight, Sparkles } from "lucide-react";

// Mock data - fixed duplicate id and ensured unique entries
const presentations = [
  {
    id: 1,
    title: "Company Profile 2025",
    description: "Comprehensive overview of our company's vision, mission, and achievements for the year 2025.",
    image: presentationImg,
    pdfUrl: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Lifeintelect_NewsEvent/Document/companyprofile.pdf",
    date: "March 2025",
    category: "Corporate",
    duration: "15 min",
  },
];

const Wrapper = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 113, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 113, 181, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  }
`;

const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  @media (max-width: 968px) {
    order: 2;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    color: #fbbf24;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #7c3aed, #ec4899, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroDescription = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 500px;
`;

const HeroCTA = styled.button`
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.4);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 968px) {
    order: 1;
  }
`;

const IllustrationSVG = styled.svg`
  width: 100%;
  max-width: 500px;
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  .floating-delayed {
    animation: float 6s ease-in-out infinite 2s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

// Main Content
const MainContent = styled.main`
  background: #fafafa;
  padding: 5rem 0;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, #7c3aed, #ec4899);
      border-radius: 2px;
    }
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    max-width: 600px;
    margin: 2rem auto 0;
    line-height: 1.7;
  }
`;

const PresentationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PresentationCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border: 1px solid rgba(226, 232, 240, 0.8);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(45deg, #667eea, #764ba2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${PresentationCard}:hover & {
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  svg {
    color: #667eea;
    margin-left: 2px;
  }
`;

const CardCategory = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.85rem;

  svg {
    width: 16px;
    height: 16px;
    color: #94a3b8;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #5a6fd8, #6a4190);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }
  }

  &.secondary {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #e2e8f0;
      transform: translateY(-2px);
    }
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// PDF Modal
const PDFModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.3s ease-out;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(10px);
    }
  }
`;

const ModalHeader = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;

  .icon-wrapper {
    background: linear-gradient(135deg, #7c3aed, #ec4899);
    border-radius: 12px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: white;
      width: 20px;
      height: 20px;
    }
  }

  .title-content {
    h3 {
      color: #0f172a;
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0 0 0.25rem 0;
    }

    p {
      color: #64748b;
      font-size: 0.9rem;
      margin: 0;
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.close {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
  }

  &.download {
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #f1f5f9;
      transform: translateY(-1px);
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PDFContainer = styled.div`
  flex: 1;
  position: relative;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #64748b;
  background: #f8fafc;
  z-index: 10;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top: 3px solid #7c3aed;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: #64748b;
  text-align: center;
  padding: 2rem;

  .error-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 40px;
      height: 40px;
      color: #d97706;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  p {
    font-size: 1rem;
    margin: 0;
    max-width: 400px;
    line-height: 1.6;
  }
`;

export default function PresentationPage() {
  const [showPdf, setShowPdf] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [currentPresentation, setCurrentPresentation] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const memoizedPresentations = useMemo(() => presentations, []);

  const handleViewPdf = useCallback((presentation) => {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(presentation.pdfUrl)}&embedded=true`;
    setCurrentPdf(viewerUrl);
    setCurrentPresentation(presentation);
    setPdfLoading(true);
    setPdfError(false);
    setShowPdf(true);
  }, []);

  const handleClosePdf = useCallback(() => {
    setShowPdf(false);
    setCurrentPdf(null);
    setCurrentPresentation(null);
    setPdfLoading(false);
    setPdfError(false);
  }, []);

  const scrollToPresentations = useCallback(() => {
    document.getElementById("presentations").scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showPdf) {
        handleClosePdf();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showPdf, handleClosePdf]);

  return (
    <Wrapper>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroBadge>
              <Sparkles size={18} />
              New presentations available
            </HeroBadge>

            <HeroTitle>
              Explore Our <span>Professional</span> Presentations
            </HeroTitle>

            <HeroDescription>
              Discover comprehensive insights, strategic roadmaps, and detailed analysis through our curated collection of presentations designed for modern businesses.
            </HeroDescription>

            <HeroCTA onClick={scrollToPresentations}>
              View All Presentations
              <ArrowRight size={20} />
            </HeroCTA>
          </HeroContent>

          <HeroVisual>
            <IllustrationSVG viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" aria-label="Illustration of a presentation dashboard">
              <circle cx="100" cy="100" r="60" fill="url(#gradient1)" opacity="0.3" className="floating" />
              <circle cx="400" cy="150" r="40" fill="url(#gradient2)" opacity="0.4" className="floating-delayed" />
              <circle cx="350" cy="300" r="50" fill="url(#gradient3)" opacity="0.3" className="floating" />
              <rect x="150" y="120" width="200" height="130" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <rect x="160" y="130" width="180" height="80" rx="6" fill="url(#gradient4)" />
              <rect x="170" y="140" width="60" height="8" rx="4" fill="#ffffff" opacity="0.8" />
              <rect x="170" y="155" width="40" height="6" rx="3" fill="#ffffff" opacity="0.6" />
              <rect x="170" y="170" width="80" height="6" rx="3" fill="#ffffff" opacity="0.7" />
              <rect x="260" y="180" width="8" height="20" rx="2" fill="#ffffff" opacity="0.8" />
              <rect x="275" y="170" width="8" height="30" rx="2" fill="#ffffff" opacity="0.9" />
              <rect x="290" y="160" width="8" height="40" rx="2" fill="#ffffff" />
              <rect x="305" y="175" width="8" height="25" rx="2" fill="#ffffff" opacity="0.8" />
              <g className="floating">
                <rect x="80" y="200" width="40" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <rect x="85" y="210" width="30" height="3" rx="1" fill="#cbd5e1" />
                <rect x="85" y="220" width="25" height="2" rx="1" fill="#e2e8f0" />
                <rect x="85" y="230" width="30" height="2" rx="1" fill="#e2e8f0" />
              </g>
              <g className="floating-delayed">
                <rect x="380" y="80" width="35" height="45" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <rect x="385" y="90" width="25" height="3" rx="1" fill="#cbd5e1" />
                <rect x="385" y="100" width="20" height="2" rx="1" fill="#e2e8f0" />
                <rect x="385" y="110" width="25" height="2" rx="1" fill="#e2e8f0" />
              </g>
              <rect x="240" y="250" width="20" height="40" rx="2" fill="#64748b" />
              <ellipse cx="250" cy="300" rx="30" ry="8" fill="#94a3b8" />
              <circle cx="50" cy="300" r="4" fill="#7c3aed" opacity="0.6" className="floating" />
              <circle cx="450" cy="50" r="6" fill="#ec4899" opacity="0.5" className="floating-delayed" />
              <circle cx="420" cy="350" r="5" fill="#06b6d4" opacity="0.7" className="floating" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </IllustrationSVG>
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      <MainContent>
        <ContentContainer>
          <SectionHeader id="presentations">
            <h2>Featured Presentations</h2>
            <p>
              Browse through our carefully curated collection of presentations covering various aspects of business strategy, market insights, and company updates.
            </p>
          </SectionHeader>

          <PresentationsGrid>
            {memoizedPresentations.map((presentation) => (
              <PresentationCard key={presentation.id}>
                <CardImageContainer>
                  <img src={presentation.image} alt={`Cover image for ${presentation.title} presentation`} loading="lazy" />
                  <CardCategory>{presentation.category}</CardCategory>
                  <CardOverlay>
                    <PlayButton onClick={() => handleViewPdf(presentation)} aria-label={`View ${presentation.title} presentation`}>
                      <Play size={24} />
                    </PlayButton>
                  </CardOverlay>
                </CardImageContainer>

                <CardContent>
                  <CardTitle>{presentation.title}</CardTitle>
                  <CardDescription>{presentation.description}</CardDescription>

                  <CardMeta>
                    <MetaItem>
                      <Calendar />
                      <span>{presentation.date}</span>
                    </MetaItem>
                    <MetaItem>
                      <Users />
                      <span>{presentation.duration}</span>
                    </MetaItem>
                  </CardMeta>

                  <CardActions>
                    <ActionButton className="primary" onClick={() => handleViewPdf(presentation)} aria-label={`View ${presentation.title}`}>
                      <Eye />
                      View
                    </ActionButton>
                    <ActionButton
                      className="secondary"
                      as="a"
                      href={presentation.pdfUrl}
                      download={`${presentation.title}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Download ${presentation.title}`}
                    >
                      <Download />
                      Download
                    </ActionButton>
                  </CardActions>
                </CardContent>
              </PresentationCard>
            ))}
          </PresentationsGrid>
        </ContentContainer>
      </MainContent>

      {showPdf && currentPresentation && (
        <PDFModal>
          <ModalHeader>
            <ModalTitle>
              <div className="icon-wrapper">
                <Presentation />
              </div>
              <div className="title-content">
                <h3>{currentPresentation.title}</h3>
                <p>
                  {currentPresentation.category} • {currentPresentation.date}
                </p>
              </div>
            </ModalTitle>

            <ModalActions>
              <ModalButton
                className="download"
                as="a"
                href={currentPresentation.pdfUrl}
                download={`${currentPresentation.title}.pdf`}
                aria-label={`Download ${currentPresentation.title}`}
              >
                <Download size={16} />
                Download
              </ModalButton>
              <ModalButton className="close" onClick={handleClosePdf} aria-label="Close PDF viewer">
                <X size={16} />
                Close
              </ModalButton>
            </ModalActions>
          </ModalHeader>

          <PDFContainer>
            {pdfLoading && (
              <LoadingSpinner>
                <div className="spinner"></div>
                <p>Loading presentation...</p>
              </LoadingSpinner>
            )}

            {pdfError ? (
              <ErrorState>
                <div className="error-icon">
                  <X size={24} />
                </div>
                <h3>Failed to Load Presentation</h3>
                <p>We're having trouble loading this presentation. Please try again later or download it directly.</p>
              </ErrorState>
            ) : (
              <PDFViewer
                src={currentPdf}
                onLoad={() => setPdfLoading(false)}
                onError={() => {
                  setPdfLoading(false);
                  setPdfError(true);
                }}
              />
            )}
          </PDFContainer>
        </PDFModal>
      )}
    </Wrapper>
  );
}