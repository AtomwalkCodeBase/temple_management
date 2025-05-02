import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  FaLock,
  FaSyncAlt,
  FaLaptopCode,
  FaLightbulb,
  FaUsers,
  FaGavel,
  FaGraduationCap,
  FaGlobeAmericas,
  FaHome,
  FaTimes,
  FaChevronRight,
  FaFlask,
  FaLaptop
} from "react-icons/fa";
import Carousel1 from "./Carousel1";
import Section1Image from "../assets/img/section1.png";
import Section2Image from "../assets/img/section2.png";
import Section3Image from "../assets/img/KYB_Brain_Basics_Brain040522.png";
import Section4Image from "../assets/img/Picture9-removebg-preview.png";
import { useNavigate } from "react-router-dom";

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
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 10px;
  border-radius: 10px;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
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

  ${(props) =>
    props.active &&
    `
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
  min-height: 100vh;
  background-color: ${(props) => props.bgColor || "#fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    min-height: auto;
    padding: 60px 20px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const SectionContent = styled.div`
  flex: 1;
  padding: 40px;
  color: ${(props) => props.textColor || "#fff"};

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    text-align: center;
  }
`;

const SectionMedia = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin-top: 30px;
  }
`;

const Head = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: ${(props) => (props.center ? "50%" : "0")};
    transform: ${(props) => (props.center ? "translateX(-50%)" : "none")};
    width: 80px;
    height: 4px;
    background: ${(props) => props.accentColor || "#0368ff"};
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
  }
`;

const SubHead = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
    text-align: center;
  }
`;

const Button = styled.button`
  background: ${(props) => props.bgColor || "#0368ff"};
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${(props) => props.hoverColor || "#0254cc"};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CarouselWrapper = styled.div``;

// New Split Section Styles
const SplitSection = styled.section`
  width: 100%;
  min-height: 480px;
  display: flex;
  background: linear-gradient(90deg, #98D8EF 55%, #98D8EF 45%);
  @media (max-width: 900px) {
    flex-direction: column;
    background: linear-gradient(180deg, #8E2D8D 55%, #FFB200 45%);
  }
  padding:50px;
`;

const LeftPanel = styled.div`
  margin-top: 12px;
  flex: 1;
  padding: 64px 6vw 64px 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  @media (max-width: 900px) {
    padding: 48px 6vw 24px 6vw;
    align-items: center;
    text-align: center;
  }
`;

const IPHeading = styled.h1`
  font-size: 2.8rem;
  font-weight: 900;
  color: #222831;
  margin-bottom: 18px;
  letter-spacing: -1px;
  line-height: 1.08;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.2s;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const IPSubText = styled.p`
  font-size: 1.18rem;
  color: #222831;
  margin-bottom: 32px;
  max-width: 420px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.3s;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 900px) {
    margin: 0 auto 32px auto;
  }
`;

const IPCTAButton = styled.button`
  background: #fff;
  color: #222831;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 14px 38px;
  border: none;
  border-radius: 40px;
  margin-top: 12px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease, background 0.3s ease;
  transition-delay: 0.4s;

  &:hover {
    background: #3674B5;
    color: #fff;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const RightPanel = styled.div`
  flex: 1.1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 48px 4vw 48px 0;
  @media (max-width: 900px) {
    padding: 0 0 48px 0;
    width: 100%;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  width: 100%;
  max-width: 480px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  transition-delay: 0.5s;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
    max-width: 95vw;
  }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.82);
  border-radius: 18px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.10);
  padding: 0px;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  cursor: pointer;
  border: 2px solid #fffbe0;
  transition: box-shadow 0.2s, transform 0.2s, border 0.2s;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.95);
  transition-delay: ${(props) => props.delay || "0s"};

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,0.16);
    transform: translateY(-4px) scale(1.03);
    border: 2px solid #ffe066;
    
    .card-image {
      transform: scale(1.05);
    }
  }
`;
const CardImage = styled.div`
  height: 120px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
`;

const CardContent = styled.div`
  padding: 16px 22px 20px;
`;
const CardIcon = styled.div`
  font-size: 2.2rem;
  color: #3674B5;
  margin-bottom: 12px;
`;

const CardTitle = styled.div`
  font-size: 1.12rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 2px;
`;

// Card data
const cards = [
  {
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1920&auto=format&fit=crop",
    title: "IP Solutions",
    icon: <FaLock />
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    title: "IP Lifecycle Management",
    icon: <FaSyncAlt />
  },
  {
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=1920&auto=format&fit=crop",
    title: "Technology Transfer Solutions",
    icon: <FaLaptopCode />
  },
  {
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1920&auto=format&fit=crop",
    title: "IP Rights Solutions for Startups",
    icon: <FaLightbulb />
  }
];

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  backdrop-filter: blur(5px);

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

const PopupContent = styled.div`
  background: #fff;
  border-radius: 16px;
  max-width: 650px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  box-shadow: 0 15px 40px rgba(20, 40, 100, 0.3);
  transform: translateY(30px) scale(0.95);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-top: 5px solid rgba(100, 100, 200, 0.8);

  ${PopupOverlay}.open & {
    transform: translateY(0) scale(1);
  }

  @media (max-width: 768px) {
    padding: 25px;
    max-width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(248, 137, 137, 0.15);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: rgba(248, 137, 137, 1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background: rgba(248, 137, 137, 0.25);
    transform: rotate(90deg);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 100, 200, 0.3);
  }
`;

const PopupTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2rem);
  color: rgba(20, 40, 100, 0.9);
  margin: 0 0 15px 0;
  text-align: center;
  font-weight: 700;
`;

const PopupPunchline = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: rgba(20, 40, 100, 0.7);
  text-align: center;
  margin: 0 0 30px 0;
  line-height: 1.6;
`;

const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 25px;
`;

const ServiceItem = styled.div`
  background: rgba(100, 100, 200, 0.1);
  border: 2px solid rgba(100, 100, 200, 0.2);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  font-weight: 600;
  color: rgba(20, 40, 100, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background: rgba(200, 100, 200, 0.1);
    border-color: rgba(200, 100, 200, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(200, 100, 200, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 100, 200, 0.3);
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
  const splitSectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const cardGridRef = useRef(null);
  const cardRefs = useRef([]);
  
  const [activeSection, setActiveSection] = useState("carousel");
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -20% 0px",
    };

    const animateElements = () => {
      if (containerRef.current) containerRef.current.classList.add("visible");
      setTimeout(() => {
        if (heroSectionRef.current) heroSectionRef.current.classList.add("visible");
      }, 100);
      setTimeout(() => {
        if (heroContentRef.current) heroContentRef.current.classList.add("visible");
      }, 200);
      setTimeout(() => {
        if (headingRef.current) headingRef.current.classList.add("visible");
      }, 300);
      setTimeout(() => {
        if (subTextRef.current) subTextRef.current.classList.add("visible");
      }, 400);
      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.classList.add("visible");
      }, 500);
      setTimeout(() => {
        if (statsContainerRef.current) statsContainerRef.current.classList.add("visible");
      }, 600);
      statCardRefs.current.forEach((card, index) => {
        setTimeout(() => {
          if (card) card.classList.add("visible");
        }, 700 + index * 100);
      });
      setTimeout(() => {
        if (featuresSectionRef.current) featuresSectionRef.current.classList.add("visible");
      }, 900);
      featureItemRefs.current.forEach((feature, index) => {
        setTimeout(() => {
          if (feature) feature.classList.add("visible");
        }, 1000 + index * 100);
      });
      sectionRefs.current.forEach((section, index) => {
        setTimeout(() => {
          if (section) section.classList.add("visible");
        }, 200 + index * 200);
      });
      // New split section animations
      setTimeout(() => {
        if (splitSectionRef.current) splitSectionRef.current.classList.add("visible");
      }, 100);
      setTimeout(() => {
        if (leftPanelRef.current) leftPanelRef.current.classList.add("visible");
      }, 200);
      setTimeout(() => {
        if (rightPanelRef.current) rightPanelRef.current.classList.add("visible");
      }, 300);
      setTimeout(() => {
        if (cardGridRef.current) cardGridRef.current.classList.add("visible");
      }, 400);
      cardRefs.current.forEach((card, index) => {
        setTimeout(() => {
          if (card) card.classList.add("visible");
        }, 500 + index * 100);
      });
    };

    animateElements();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target === carouselRef.current) {
            setActiveSection("carousel");
          } else if (entry.target === heroSectionRef.current) {
            setActiveSection("more");
          } else if (entry.target === splitSectionRef.current) {
            setActiveSection("ip-solutions");
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
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }
    featureItemRefs.current.forEach((feature) => {
      if (feature) observer.observe(feature);
    });
    if (splitSectionRef.current) {
      observer.observe(splitSectionRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
      featureItemRefs.current.forEach((feature) => {
        if (feature) observer.unobserve(feature);
      });
      if (splitSectionRef.current) {
        observer.unobserve(splitSectionRef.current);
      }
    };
  }, []);

  const scrollToSection = (target) => {
    if (target === "carousel") {
      carouselRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (target === "section4") {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (target === "ip-solutions") {
      splitSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      const index = parseInt(target.replace("section", "")) - 1;
      sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openPopup = (data) => {
    setPopupData(data);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const handleServiceClick = (service) => {
    const serviceToPathMap = {
      // IP Solutions
      "Industrial Design": "/design",
      Copyright: "/copyright",
      "Geographical Indication": "/geographical-indication",
      "National Biodiversity Authority Approval": null,
      // IP Lifecycle Management
      "IP Audit of the Company": "/ip-audit",
      "IP Policy and Process Setup": "/ip-policy",
      "IP Portfolio Management": "/ip-portfolio",
      "IP Valuation": "/ip-valuation",
      // Scientific and Technology Solutions
      "Technology Transfer": "/technology-transfer",
      "Patent Valuation": "/patent-valuations",
      "Patent Due Diligence & Variability Analysis": "/patent-due-diligence",
      "Competitive Landscape & Industry Trends": "/competitive-landscape",
      // Strategy & Advisory (Startups)
      "IP Strategy & Roadmap for Startups": "/IP-Strategy-&-Roadmap-for-Startups",
      "Cost-Effective IP Protection": "/Cost-Effective-IP-Protection",
      "IP Due Diligence for Investors": "/IP-Due-Diligence-for-Investors",
      "IP Licensing & Commercialization": "/IP-Licensing-&-Commercialization",
      "Raising Awareness and Funding with IP": "/Raising-Awareness-and-Funding-with-IP",
      "Startup IP Portfolio Management": "/Startup-IP-Portfolio-Management",
      "IP Risk Management for Startups": "/IP-Risk-Management-for-Startups",
    };

    const path = serviceToPathMap[service];
    if (path) {
      navigate(path);
    } else {
      console.warn(`No route defined for service: ${service}`);
    }
    closePopup();
  };

  const sections = [
    {
      bgColor: "#AB6604",
      head: "STRATEGY AND ADVISORY",
      subHead: "Strategic protection for patents, trademarks, and beyond",
      image: Section1Image,
      alt: "IP Solutions Hero Image",
      reverse: false,
      link: "/IP-Strategy-Development",
    },
    {
      bgColor: "#0271B1",
      head: "SCIENTIFIC & TECHNOLOGY SOLUTIONS ",
      subHead: "Unlocking potential through research, analysis, and precision.",
      image: Section2Image,
      alt: "IP Lifecycle Hero Image",
      reverse: true,
      link: "/Scientific-&-Technology-Solutions",
    },
    {
      bgColor: "#8E2D8D",
      head: "Intellectual Property Rights Education & Training ",
      subHead: "Building IP Expertise: Training for Protection & Growth",
      image: Section3Image,
      alt: "Tech Solutions Hero Image",
      reverse: false,
      link: "/Custom-IP-Workshops-for-Teams",
    },
  ];

  const navItems = [
    {
      id: "carousel",
      icon: <FaHome />,
      label: "Go to Next Section",
      ref: carouselRef,
    },
    {
      id: "ip-solutions",
      icon: <FaGavel />,
      label: "Intellectual Property",
      ref: splitSectionRef,
    },
    {
      id: "section1",
      icon: <FaLightbulb />,
      label: "STRATEGY",
      ref: sectionRefs.current[0],
    },
    {
      id: "section2",
      icon: <FaFlask />,
      label: "SCIENTIFIC",
      ref: sectionRefs.current[1],
    },
    {
      id: "section3",
      icon: <FaLaptop />,
      label: "Intellectual",
      ref: sectionRefs.current[2],
    },
  ];

  const backgroundPatterns = {
    "IP Solutions": "url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1920&auto=format&fit=crop')",
    "IP Lifecycle Management": "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop')",
    "Technology Transfer Solutions": "url('https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=1920&auto=format&fit=crop')",
    "Intellectual Property Rights Solutions for Startups": "url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1920&auto=format&fit=crop')",
  };

  const featureData = [
    {
      text: "IP Solutions",
      icon: "🔒",
      punchline: "Protecting ideas, preserving value, powering progress.",
      services: [
        "Industrial Design",
        "Copyright",
        "Geographical Indication",
        "National Biodiversity Authority Approval",
      ],
      imageIdea: "Icons or images representing patents, copyrights, or trademarks.",
    },
    {
      text: "IP Lifecycle Management",
      icon: "🔬",
      punchline: "Manage your IP from inception to monetization.",
      services: [
        "IP Audit of the Company",
        "IP Policy and Process Setup",
        "IP Portfolio Management",
        "IP Valuation",
      ],
      imageIdea: "Flowchart or lifecycle diagram of IP management.",
    },
    {
      text: "Technology Transfer Solutions",
      icon: "💻",
      punchline: "Seamlessly transfer technology with IP protection.",
      services: [
        "Technology Transfer",
        "Patent Valuation",
        "Patent Due Diligence & Variability Analysis",
        "Competitive Landscape & Industry Trends",
      ],
      imageIdea: "A bird mid-flight carrying a twig between two different trees.",
    },
    {
      text: "Intellectual Property Rights Solutions for Startups",
      icon: "💡",
      punchline: "Navigate complex IP landscapes with expert guidance.",
      services: [
        "IP Strategy & Roadmap for Startups",
        "Cost-Effective IP Protection",
        "IP Due Diligence for Investors",
        "IP Licensing & Commercialization",
        "Raising Awareness and Funding with IP",
        "Startup IP Portfolio Management",
        "IP Risk Management for Startups",
      ],
      imageIdea: "Lightbulb with gears or a roadmap illustration.",
    },
  ];

  return (
    <div style={{backgroundColor:"#8E2D8D"}}>
      <CarouselWrapper ref={carouselRef}>
        <Carousel1 />
      </CarouselWrapper>
      <NavBar isOpen={isOpen}>
        {navItems.map((item) => (
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
            onKeyDown={(e) => e.key === "Enter" && scrollToSection(item.id)}
          >
            {item.icon}
            <Tooltip>{item.label}</Tooltip>
          </NavItem>
        ))}
      </NavBar>

      {/* New Split Section Implementation */}
      <SplitSection ref={splitSectionRef} id="ip-solutions">
        <LeftPanel ref={leftPanelRef}>
          <IPHeading ref={headingRef} className="visible">
            Intellectual Property (IP) Solutions
          </IPHeading>
          <IPSubText ref={subTextRef} className="visible">
            Protect, manage, and maximize your intellectual assets with our expert solutions for innovators, businesses, and startups.
          </IPSubText>
          <IPCTAButton
            ref={buttonRef}
            className="visible"
            onClick={() => navigate("/ip-solutions")}
          >
            Learn More
          </IPCTAButton>
        </LeftPanel>
        <RightPanel ref={rightPanelRef}>
  <CardGrid ref={cardGridRef} className="visible">
    {cards.map((card, i) => (
      <Card 
        key={i}
        ref={el => cardRefs.current[i] = el}
        className="visible"
        onClick={() => openPopup(featureData[i])}
      >
        <CardImage className="card-image" image={card.image} />
        <CardContent>
          <CardIcon>{card.icon}</CardIcon>
          <CardTitle>{card.title}</CardTitle>
        </CardContent>
      </Card>
    ))}
  </CardGrid>
</RightPanel>
      </SplitSection>

      {sections.map((section, index) => (
        <Section
          key={index}
          bgColor={section.bgColor}
          ref={(el) => (sectionRefs.current[index] = el)}
        >
          <SectionContainer reverse={section.reverse}>
            <SectionContent textColor={section.textColor}>
              <Head
                accentColor={section.accentColor}
                center={window.innerWidth <= 768}
              >
                {section.head}
              </Head>
              <SubHead>{section.subHead}</SubHead>
              <Button
                bgColor={section.bgColor}
                hoverColor={section.buttonHover}
                aria-label={`Read more about ${section.head}`}
                onClick={() => navigate(section.link)}
              >
                Read More <FaChevronRight />
              </Button>
            </SectionContent>
            <SectionMedia>
              <Image src={section.image} alt={section.alt} />
            </SectionMedia>
          </SectionContainer>
        </Section>
      ))}

      {popupData && (
        <PopupOverlay className={popupData ? "open" : ""}>
          <PopupContent>
            <CloseButton onClick={closePopup} aria-label="Close popup">
              <FaTimes />
            </CloseButton>
            <PopupTitle>{popupData.text}</PopupTitle>
            <PopupPunchline>{popupData.punchline}</PopupPunchline>
            <ServiceList>
              {popupData.services.map((service, index) => (
                <ServiceItem
                  key={index}
                  onClick={() => handleServiceClick(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    handleServiceClick(service)
                  }
                  aria-label={`Go to ${service} page`}
                >
                  {service}
                </ServiceItem>
              ))}
            </ServiceList>
          </PopupContent>
        </PopupOverlay>
      )}
    </div>
  );
};

export default Herosection;