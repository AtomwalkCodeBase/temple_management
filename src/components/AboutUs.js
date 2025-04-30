import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAnimation } from 'framer-motion';
import { ArrowRight, Award, Eye, Glasses, Globe, Leaf, Lightbulb, RefreshCw, Rocket, ShieldCheck, Target, TrendingUp, User, Users } from 'lucide-react';
import AboutUsHero from './AboutUsHero';
import TeamSection from './TeamSection';
import { useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Base Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
`;

const Section = styled.section`
  padding: 100px 0;
  position: relative;
`;

// Mission & Vision Section
const MissionVisionSection = styled(Section)`
  background: linear-gradient(to bottom, #f8faff, #ffffff);
  position: relative;
  overflow: hidden;
`;

const MissionVisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const MissionVisionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 15px 40px rgba(65, 105, 225, 0.08);
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(65, 105, 225, 0.12);
  }
`;

const MissionVisionHeader = styled.div`
  position: relative;

`;

const MissionVisionTitle = styled.h2`
   font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MissionVisionContent = styled.div`
  p {
    font-size: 18px;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
    position: relative;
    padding-left: 25px;
    text-align: center;
    
    &::before {
      position: absolute;
      left: 0;
      color: #8a2be2;
      font-weight: bold;
    }
  }
`;
const MissionVisionContents = styled.div`
  p {
    font-size: 18px;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
    position: relative;
    padding-left: 25px;
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #8a2be2;
      font-weight: bold;
    }
  }
`;

const DecorativeCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    background: #4169E1;
    top: -150px;
    right: -150px;
  }
  
  &:nth-child(2) {
    width: 200px;
    height: 200px;
    background: #8a2be2;
    bottom: -100px;
    left: -100px;
  }
`;

// Core Values Section
const CoreValuesSection = styled(Section)`
  background: linear-gradient(to bottom, #ffffff, #f9f9ff);
`;

const ElegantSectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Divider = styled(motion.div)`
  height: 4px;
  width: 80px;
  background: linear-gradient(90deg, #0047AB 0%, #FF4500 100%);
  margin: 1rem auto 3rem;
  border-radius: 2px;
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const ValueCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(65, 105, 225, 0.05);
  border-top: 4px solid transparent;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(65, 105, 225, 0.1);
    border-top-color: #4169E1;
    
    .value-icon {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4169E1, #8a2be2);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.4s ease;
  opacity: 0.9;

  svg {
    color: #4169E1;
    width: 28px;
    height: 28px;
  }
`;

const ValueTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background: #8a2be2;
    transition: width 0.3s ease;
  }

  ${ValueCard}:hover &::after {
    width: 50px;
  }
`;

const ValueDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #555;
`;

// Stats Section
const StatsSection = styled(Section)`
  background: linear-gradient(120deg, #2a3b8f 0%, #5b4e9a 50%, #8a2be2 100%);
  position: relative;
  overflow: hidden;
`;

const StatsContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsTitle = styled.h2`
  font-size: 42px;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 70px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 2px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-15px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 250%;
    height: 250%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    transform: rotate(45deg);
    transition: all 0.8s ease;
    opacity: 0;
  }
  
  &:hover::before {
    opacity: 1;
    animation: shine 2s infinite;
  }
  
  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
`;

const StatIconWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  position: relative;
  transition: all 0.4s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    top: 0;
    left: 0;
    animation: pulse 2s infinite;
  }
  
  ${StatCard}:hover & {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const StatIcon = styled.div`
  font-size: 36px;
  color: white;
  display: inline-block;
`;

const StatNumber = styled.div`
  font-size: 52px;
  font-weight: 800;
  margin-bottom: 15px;
  background: linear-gradient(to right, #ffffff, #e0e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  
  ${StatCard}:hover & {
    transform: scale(1.05);
  }
`;

const StatLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const BackgroundElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  
  &:nth-child(1) {
    width: 400px;
    height: 400px;
    top: -150px;
    right: -100px;
  }
  
  &:nth-child(2) {
    width: 300px;
    height: 300px;
    bottom: -50px;
    left: 10%;
  }
  
  &:nth-child(3) {
    width: 200px;
    height: 200px;
    top: 30%;
    left: -100px;
  }
`;

// Why Choose Us Section
const WhyChooseUsSection = styled(Section)`
  background: linear-gradient(to bottom, #f8faff, #ffffff);
  position: relative;
  overflow: hidden;
`;

const WhyChooseUsContainer = styled.div`
  position: relative;
  z-index: 2;
`;

const SectionIntro = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
`;

const SectionTitle = styled.h2`
   font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.8;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(65, 105, 225, 0.07);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(65, 105, 225, 0.12);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(135deg, #4169E1, #8a2be2);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
  }
  
  &:hover::after {
    opacity: 0.03;
  }
`;

const FeatureIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    border: 2px solid transparent;
    background: linear-gradient(135deg, #4169E1, #8a2be2) border-box;
    -webkit-mask: 
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.3;
  }
  
  svg {
    color: #4169E1;
    font-size: 32px;
    transition: all 0.3s ease;
  }
  
  ${FeatureCard}:hover & {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(65, 105, 225, 0.15) 0%, rgba(138, 43, 226, 0.15) 100%);
    
    svg {
      color: #8a2be2;
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 15px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #4169E1, #8a2be2);
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  ${FeatureCard}:hover &::after {
    width: 60px;
  }
`;

const FeatureDescription = styled.p`
  color: #555;
  line-height: 1.8;
  font-size: 17px;
  margin: 0;
  flex-grow: 1;
`;

const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 60px;
  }
  
  .shape-fill {
    fill: #FFFFFF;
  }
`;

const BackgroundGraphic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .circle1 {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(65, 105, 225, 0.03) 0%, rgba(138, 43, 226, 0.03) 100%);
    top: -100px;
    right: -100px;
  }
  
  .circle2 {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    border: 2px dashed rgba(65, 105, 225, 0.1);
    bottom: -200px;
    left: -200px;
  }
  
  .dots {
    position: absolute;
    width: 200px;
    height: 200px;
    background-image: radial-gradient(rgba(65, 105, 225, 0.2) 2px, transparent 2px);
    background-size: 20px 20px;
    top: 20%;
    right: 10%;
  }
`;

// Clients Section
const ModernSection = styled(Section)`
  padding: 80px 0;
`;

const ClientsContainer = styled.div`
  margin-top: 60px;
`;

const ClientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

const MinimalClientTag = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  color: #4169E1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(65, 105, 225, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #4169E1 0%, #8a2be2 100%);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

// USP Section
const USPContainer = styled.div`
  margin-top: 60px;
`;

const CleanUSPCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.03);
  padding: 30px;
  margin-bottom: 30px;
  border-left: 4px solid #4169E1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
`;

const USPHeading = styled.h4`
  font-size: 22px;
  font-weight: 600;
  color: #4169E1;
  margin-bottom: 15px;
`;

const USPPoints = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

const USPPoint = styled.li`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// CTA Section
const MinimalTeamCTA = styled.div`
  margin: 80px auto;
  background: linear-gradient(135deg, #0047AB 0%, #4169E1 100%);
  border-radius: 12px;
  padding: 50px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 71, 171, 0.1);
  position: relative;
  overflow: hidden;
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h3`
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 24px;
`;

const CTADescription = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto 32px;
  line-height: 1.7;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background: white;
  color: #0047AB;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  svg {
    margin-left: 10px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    
    svg {
      transform: translateX(5px);
    }
  }
`;

// Main Component
const AboutUs = () => {
  const { hash } = useLocation();
  const missionVisionRef = useRef(null);
  const coreValuesRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const clientsRef = useRef(null);
  const uspRef = useRef(null);

  const missionVisionInView = useInView(missionVisionRef, { once: true, amount: 0.1 });
  const coreValuesInView = useInView(coreValuesRef, { once: true, amount: 0.1 });
  const whyChooseUsInView = useInView(whyChooseUsRef, { once: true, amount: 0.1 });
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.1 });
  const uspInView = useInView(uspRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  
  const stats = [
    { number: '506+', label: 'Happy Clients', icon: '😊' },
    { number: '2050+', label: 'IP Filings', icon: '📑' },
    { number: '6750+', label: 'People Trained', icon: '🎓' },
    { number: '3001+', label: 'Projects Executed', icon: '✅' }
  ];
  
  const missionContent = [
    "To deliver insightful, creative, and actionable technological, IP & business solutions tailored to each client's unique challenges.",
    "To foster innovation by integrating deep industry knowledge, human-centric approach, and sustainable practices.",
    "Committed to protect IP rights of our clients and build IP portfolios that drive investment and growth"
  ];

  const valuesContent = [
    { 
      title: "HONESTY & INTEGRITY", 
      description: "Strong work ethics guiding all our actions.", 
      icon: <ShieldCheck size={28} /> 
    },
    { 
      title: "INNOVATION & EXCELLENCE", 
      description: "Continuously improving our services.", 
      icon: <Rocket size={28} /> 
    },
    { 
      title: "ADAPTABILITY", 
      description: "Positive attitude to constantly improve ourselves and strive to be the best.", 
      icon: <RefreshCw size={28} /> 
    },
    { 
      title: "TRUSTWORTHY", 
      description: "Trustworthy and Transparency in all our transactions.", 
      icon: <Glasses size={28} /> 
    },
    { 
      title: "SUSTAINABILITY", 
      description: "Engage, analyse and creatively protect sustainable technologies.", 
      icon: <Leaf size={28} /> 
    },
    { 
      title: "FUTURE-FOCUSED", 
      description: "Bringing insight and impact on future technologies.", 
      icon: <TrendingUp size={28} /> 
    }
  ];

  const whyChooseUs = [
    { 
      title: 'Client-Centric Approach', 
      description: 'We listen, understand, and tailor solutions to fit your unique needs.', 
      icon: <User size={24} />  
    },
    { 
      title: 'Expert Team', 
      description: 'Experienced professionals from diverse technical, legal, and business backgrounds.', 
      icon: <Users size={24} />
    },
    {
      title: 'Strategic Insights',
      description: "We don't just protect your ideas—we help you monetize and scale them.",
      icon: <Lightbulb size={24} /> 
    },
    { 
      title: 'Global Outlook', 
      description: 'Extensive experience handling domestic and international IP matters.', 
      icon: <Globe size={24} />
    },
    { 
      title: 'Commitment to Excellence', 
      description: 'Your success is our measure of achievement.', 
      icon: <Award size={24} /> 
    }
  ];
  
  const clients = [
    'Startups and Entrepreneurs',
    'Universities and Research Institutions',
    'Small and Medium Enterprises (SMEs)',
    'Corporates and Multinationals',
    'Incubators and Innovation Hubs'
  ];
  
  const usps = [
    {
      title: 'Specialized Focus on Life Sciences and Technology Innovation', 
      points: [
        'Unlike general IP and business consultancies, LifeIntelect has specialized expertise in life sciences, biotechnology, healthcare, and tech-driven industries.',
        'This sharp focus allows for tailored, technically sound solutions that generalist firms often miss.'
      ]
    },
    {
      title: 'End-to-End Innovation Support', 
      points: [
        'LifeIntelect doesn\'t stop at IP registration. We support the full innovation lifecycle — from idea validation and protection to commercialization, funding readiness, and market strategy.',
        'Most competitors either specialize only in IP or business growth, but rarely both.'
      ]
    },
    {
      title: 'Scientific and Legal Synergy', 
      points: [
        'Our team blends scientific research backgrounds with legal and business acumen — ensuring technical precision while protecting and growing your business value.',
        'Competitors often lack this cross-functional expertise, leading to gaps in strategy.'
      ]
    },
    {
      title: 'Client-First, Custom Approach', 
      points: [
        'Every client engagement at LifeIntelect is highly personalized. We co-create strategies aligned to your vision rather than offering cookie-cutter solutions.',
        'Many large firms take a templated, one-size-fits-all approach — but we believe your innovation deserves a unique strategy.'
      ]
    },
    {
      title: 'Trusted Partner for Startups and Institutions', 
      points: [
        'LifeIntelect has a proven record with startups, incubators, research centers, and SMEs, understanding their constraints and ambitions.',
        'We offer scalable, cost-effective models that big consulting houses often cannot match.'
      ]
    },
    {
      title: 'Training the Innovators of Tomorrow', 
      points: [
        'Beyond consulting, LifeIntelect invests in building future innovation leaders through workshops, IP awareness programs, and entrepreneurship mentoring — something few competitors actively provide.'
      ]
    },
    {
      title: 'Global Outlook with Local Expertise', 
      points: [
        'We operate with an international perspective on IP and business landscapes, while staying deeply rooted in local regulatory and business environments.'
      ]
    }
  ];
  
  return (
    <>
    <AboutUsHero />

    

    <MissionVisionSection>
    <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Who We Are
          </SectionTitle>
          <motion.p
            style={{ 
              fontSize: '18px', 
              lineHeight: '1.8', 
              textAlign: 'center', 
              maxWidth: '800px', 
              margin: '0 auto 50px',
              color: '#64748b'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            LifeIntelect Consultancy Pvt. Ltd. is a leading advisory firm focused on Intellectual Property rights, 
            technology commercialization, business consulting, and regulatory support. With a team of seasoned IP attorneys, 
            business strategists, scientists, and legal experts, we bring a multidisciplinary approach to protecting and growing your ideas.
          </motion.p>
      <DecorativeCircle />
      <DecorativeCircle />
      <MissionVisionContainer>
        {/* Vision Card */}
        <MissionVisionCard ref={missionVisionRef}>
          <MissionVisionHeader>
            <MissionVisionTitle>Our Vision</MissionVisionTitle>
            <Divider
              initial={{ width: 0 }}
              animate={missionVisionInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </MissionVisionHeader>
          <MissionVisionContent>
            <p>
              To be the most trusted partner for innovation-driven businesses, providing world-class IP and business consulting solutions that foster growth and sustainability.
            </p>
          </MissionVisionContent>
        </MissionVisionCard>


        {/* Mission Card */}
        <MissionVisionCard>
          <MissionVisionHeader>
            <MissionVisionTitle>Our Mission</MissionVisionTitle>
            <Divider
              initial={{ width: 0 }}
              animate={missionVisionInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </MissionVisionHeader>
          <MissionVisionContents>
            {missionContent.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </MissionVisionContents>
        </MissionVisionCard>
      </MissionVisionContainer>
    </MissionVisionSection>

    <CoreValuesSection ref={coreValuesRef}>
      <Container>
        <ElegantSectionTitle>Our Core Values</ElegantSectionTitle>
        <Divider
          initial={{ width: 0 }}
          animate={coreValuesInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <ValuesGrid>
          {valuesContent.map((value, index) => (
            <ValueCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <ValueIcon className="value-icon">{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Container>
    </CoreValuesSection>

    <StatsSection>
      <BackgroundElements>
        <Circle />
        <Circle />
        <Circle />
      </BackgroundElements>
      <Container>
        <StatsContainer>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index} data-aos="zoom-in" data-aos-delay={index * 150}>
                <StatIconWrapper>
                  <StatIcon>{stat.icon}</StatIcon>
                </StatIconWrapper>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </StatsContainer>
      </Container>
    </StatsSection>

    <WhyChooseUsSection>
      <BackgroundGraphic>
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="dots"></div>
      </BackgroundGraphic>
      <Container>
        <WhyChooseUsContainer>
          <SectionIntro ref={whyChooseUsRef}>
            <SectionTitle>Why Choose LifeIntelect?</SectionTitle>
            <Divider
              initial={{ width: 0 }}
              animate={whyChooseUsInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <SectionSubtitle>
              Partner with us to experience a unique blend of expertise, innovation, and personalized service
              that puts your business goals at the center of everything we do.
            </SectionSubtitle>
          </SectionIntro>
          <FeatureGrid>
            {whyChooseUs.map((feature, index) => (
              <FeatureCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <FeatureIconWrapper>{feature.icon}</FeatureIconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </WhyChooseUsContainer>
      </Container>
      <ShapeDivider>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </ShapeDivider>
    </WhyChooseUsSection>

    <ModernSection style={{ background: '#f8fafc' }} ref={clientsRef}>
      <Container>
        <ElegantSectionTitle>Clients & Partners</ElegantSectionTitle>
        <Divider
          initial={{ width: 0 }}
          animate={clientsInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <ClientsContainer>
          <ClientsList>
            {clients.map((client, index) => (
              <MinimalClientTag key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                {client}
              </MinimalClientTag>
            ))}
          </ClientsList>
        </ClientsContainer>
      </Container>
    </ModernSection>

    <ModernSection ref={uspRef}>
      <Container>
        <ElegantSectionTitle>What Sets Us Apart</ElegantSectionTitle>
        <Divider
          initial={{ width: 0 }}
          animate={uspInView ? { width: 80 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <SectionSubtitle>
        In a crowded market of consulting firms, LifeIntelect Consultancy Pvt. Ltd. stands
out through a powerful combination of deep expertise, customized strategies,
and a future-forward approach. Here&#39;s how our USP compares to others:
            </SectionSubtitle>
        <USPContainer>
          {usps.map((usp, index) => (
            <CleanUSPCard key={index} data-aos="fade-up" data-aos-delay={index * 50}>
              <USPHeading>{index + 1 + '. ' + usp.title}</USPHeading>
              <USPPoints>
                {usp.points.map((point, pointIndex) => (
                  <USPPoint key={pointIndex}>{point}</USPPoint>
                ))}
              </USPPoints>
            </CleanUSPCard>
          ))}
        </USPContainer>
      </Container>
    </ModernSection>

    <TeamSection id="team" />

    <ModernSection>
      <Container>
        <MinimalTeamCTA>
          <CTAContent data-aos="zoom-in">
            <CTATitle>Meet Our Team of Experts</CTATitle>
            <CTADescription>
              Our diverse team of patent attorneys, innovation strategists, and IP specialists brings decades of combined experience to your challenges. Get to know the people who will help protect and leverage your innovations.
            </CTADescription>
            <CTAButton href="/team">
              Meet The Team <ArrowRight size={20} />
            </CTAButton>
          </CTAContent>
        </MinimalTeamCTA>
      </Container>
    </ModernSection>
  </>
  );
};

export default AboutUs;