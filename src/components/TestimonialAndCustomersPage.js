import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronLeft, ChevronRight, Star, Quote, Users, Award, Heart } from 'lucide-react';
import company   from '../assets/img/LOGO/Agrimaa biosciences.png'
import company2  from '../assets/img/LOGO/Adityavani.jpg'
import company3  from '../assets/img/LOGO/AI Robotx.png'
import company4  from '../assets/img/LOGO/ALL INDIA INSTITUTE OF MEDICAL SCIENCES.jpg'
import company5  from '../assets/img/LOGO/Althera.jpg'
import company6  from '../assets/img/LOGO/Anand diagnostic laboratory.png'
import company7  from '../assets/img/LOGO/Ariel LTD.(ASI).png'
import company8  from '../assets/img/LOGO/Aristogen biosciences.png'
import company9  from '../assets/img/LOGO/Atomwalk.png'
import company10 from '../assets/img/LOGO/Balya group.jpg'
import company11 from '../assets/img/LOGO/Bio-gen.png'
import company12 from '../assets/img/LOGO/Bioinnovation center.png'
import company13 from '../assets/img/LOGO/Birla institute of technology.png'
import company14 from '../assets/img/LOGO/C-CAMP.png'
import company15 from '../assets/img/LOGO/CfHE.png'
import company16 from '../assets/img/LOGO/CII.png'
import company17 from '../assets/img/LOGO/CMR college of engineering and technology.png'
import company18 from '../assets/img/LOGO/DQ labs.png'
import company19 from '../assets/img/LOGO/E-Merg tech.jpg'
import company20 from '../assets/img/LOGO/FKCCI.jpg'
import company21 from '../assets/img/LOGO/Fluxgen.png'
import company22 from '../assets/img/LOGO/FTG bio.png'
import company23 from '../assets/img/LOGO/gh.png'
import company24 from '../assets/img/LOGO/I stem.jpg'
import company25 from '../assets/img/LOGO/Iaomr.png'
import company26 from '../assets/img/LOGO/IIMB.png'
import company27 from '../assets/img/LOGO/IIS.png'
import company28 from '../assets/img/LOGO/ILS.png'
import company29 from '../assets/img/LOGO/Impactful visionaries.jpg'
import company30 from '../assets/img/LOGO/India biosciences.png'
import company31 from '../assets/img/LOGO/Indian academy of sciences.png'
import company32 from '../assets/img/LOGO/Indian institute of technology bombay.png'
import company33 from '../assets/img/LOGO/Inofininty.jpg'
import company34 from '../assets/img/LOGO/institue of life sciences bhubaneswar.jpg'
import company35 from '../assets/img/LOGO/IQ soft.png'
import company36 from '../assets/img/LOGO/Jarkhand university of technology.jpg'
import company37 from '../assets/img/LOGO/Jeltek.png'
import company38 from '../assets/img/LOGO/jOIS.png'
import company39 from '../assets/img/LOGO/KMCT dental college.png'
import company40 from '../assets/img/LOGO/Kristu jayanti college.jpg'
import company41 from '../assets/img/LOGO/leo packers and movers.png'
import company42 from '../assets/img/LOGO/Leucinerichbio.png'
import company43 from '../assets/img/LOGO/Logic clutch.jpg'
import company44 from '../assets/img/LOGO/Molsys scientific.jpg'
import company45 from '../assets/img/LOGO/MSMF.jpg'
import company46 from '../assets/img/LOGO/National university of singapore.png'
import company47 from '../assets/img/LOGO/NBM.png'
import company48 from '../assets/img/LOGO/NCBS.jpg'
import company49 from '../assets/img/LOGO/Neharu group of institution.jpg'
import company50 from '../assets/img/LOGO/neurovizr.png'
import company51 from '../assets/img/LOGO/Odisha bigyan Academy.png'
import company52 from '../assets/img/LOGO/OMMPL.png'
import company53 from '../assets/img/LOGO/Procto labs.png'
import company54 from '../assets/img/LOGO/Radome technologies & services private limited.png'
import company55 from '../assets/img/LOGO/Ramaiah.png'
import company56 from '../assets/img/LOGO/Red prince.png'
import company57 from '../assets/img/LOGO/Rephyx.png'
import company58 from '../assets/img/LOGO/S.png'
import company59 from '../assets/img/LOGO/saigram.jpg'
import company60 from '../assets/img/LOGO/Saptha innovations pvt ltd.jpg'
import company61 from '../assets/img/LOGO/SCS.jpg'
import company62 from '../assets/img/LOGO/SDUA.jpg'
import company63 from '../assets/img/LOGO/selectorshub.png'
import company64 from '../assets/img/LOGO/Spotter mobility.jpg'
import company65 from '../assets/img/LOGO/Spura technology for growth.png'
import company66 from '../assets/img/LOGO/Strategi.png'
import company67 from '../assets/img/LOGO/superbrewed food.jpg'
import company68 from '../assets/img/LOGO/Svaim.png'
import company69 from '../assets/img/LOGO/TATA trusts.png'
import company70 from '../assets/img/LOGO/The live green.png'
import company71 from '../assets/img/LOGO/Tiami.jpg'
import company72 from '../assets/img/LOGO/TRIPURA UNIVERSITY.png'
import company73 from '../assets/img/LOGO/Trumed.png'
import company74 from '../assets/img/LOGO/University of agricultural sciences.png'
import company75 from '../assets/img/LOGO/University of Gauhati.png'
import company76 from '../assets/img/LOGO/venture bean.png'
import company77 from '../assets/img/LOGO/Vivanta.png'
import company78 from '../assets/img/LOGO/Wellotree.png'
import company79 from '../assets/img/LOGO/xavier institue of management, bhubaneshwR.png'
import company80 from '../assets/img/LOGO/yenepoya technology incubator.png'
import company81 from '../assets/img/LOGO/Yenepoya.png'
import company82 from '../assets/img/LOGO/ZOFRA.jpg'



// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 4px 20px rgba(58, 108, 217, 0.2); }
  50% { transform: scale(1.05); box-shadow: 0 10px 30px rgba(58, 108, 217, 0.4); }
  100% { transform: scale(1); box-shadow: 0 4px 20px rgba(58, 108, 217, 0.2); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(80, 102, 225, 0.5); }
  50% { box-shadow: 0 0 20px rgba(80, 102, 225, 0.8); }
  100% { box-shadow: 0 0 5px rgba(80, 102, 225, 0.5); }
`;

const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

// // Global Styles
// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
//   body {
//     font-family: 'Poppins', sans-serif;
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     overflow-x: hidden;
//   }
  
//   *, *:before, *:after {
//     box-sizing: inherit;
//   }
  
//   @keyframes blob {
//     0% { transform: translate(0px, 0px) scale(1); }
//     33% { transform: translate(30px, -50px) scale(1.1); }
//     66% { transform: translate(-20px, 20px) scale(0.9); }
//     100% { transform: translate(0px, 0px) scale(1); }
//   }
// `;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%);
  color: #333;
  position: relative;
  overflow: hidden;
`;

// Background Elements
const BackgroundBlob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  z-index: 0;
  
  &:nth-child(1) {
    top: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: rgba(78, 84, 200, 0.2);
    animation: blob 15s infinite alternate;
  }
  
  &:nth-child(2) {
    top: 30%;
    right: -150px;
    width: 350px;
    height: 350px;
    background: rgba(111, 134, 245, 0.15);
    animation: blob 20s infinite alternate-reverse;
  }
  
  &:nth-child(3) {
    bottom: 10%;
    left: 10%;
    width: 300px;
    height: 300px;
    background: rgba(144, 102, 246, 0.15);
    animation: blob 18s infinite alternate;
  }
`;

// Header Section
const Header = styled.header`
  text-align: center;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 1s ease forwards;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #0047AB 0%, #FF4500 100%);;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 650px;
  margin: 0 auto;
  color: #5a6887;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards 0.3s;
`;

// Brands Section
const BrandsSection = styled.section`
  padding: 60px 0;
  position: relative;
  background: white;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 50px;
  background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #0047AB 0%, #FF4500 100%);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const BrandScrollContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
  position: relative;
  
  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }
  
  &:before {
    left: 0;
    background: linear-gradient(90deg, white, transparent);
  }
  
  &:after {
    right: 0;
    background: linear-gradient(-90deg, white, transparent);
  }
`;

const LogoScroll = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${marquee} 240s linear infinite;
  width: calc(140px * ${190 * 2});
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;
  padding: 0 10px;
  min-width: 140px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const BrandText = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #c0c5d0;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.4;
  
  ${BrandLogo}:hover & {
    opacity: 1;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 80px 24px;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const TestimonialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  position: relative;
`;

const TestimonialControl = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:focus {
    outline: none;
  }
  
  ${props => props.prev ? 'left: 0;' : 'right: 0;'}
  
  @media (max-width: 768px) {
    ${props => props.prev ? 'left: 10px;' : 'right: 10px;'}
  }
`;

const TestimonialArrow = styled.div`
  color: #3a6cd9;
`;

const TestimonialSlider = styled.div`
  position: relative;
  height: 400px;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    height: 450px;
  }
`;

const TestimonialCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  opacity: ${props => (props.active ? 1 : 0)};
  transform: ${props => 
    props.active 
      ? 'translateX(0) rotateY(0) scale(1)' 
      : props.direction === 'next' 
        ? 'translateX(50px) rotateY(5deg) scale(0.9)'
        : 'translateX(-50px) rotateY(-5deg) scale(0.9)'
  };
  pointer-events: ${props => (props.active ? 'all' : 'none')};
  z-index: ${props => (props.active ? 2 : 1)};
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
    border-radius: 25px;
    z-index: -1;
    opacity: 0.2;
    transition: all 0.3s ease;
  }
  
  &:hover:before {
    opacity: 0.3;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
  }
`;

const QuoteIconWrapper = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  color: rgba(58, 108, 217, 0.1);
  transform: scaleX(-1);
`;

const TestimonialProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
    border-radius: 50%;
    z-index: -1;
    animation: ${pulse} 2s infinite;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url('/api/placeholder/80/80');
  background-size: cover;
  background-position: center;
  border: 3px solid white;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 5px;
  color: #3a6cd9;
`;

const ProfilePosition = styled.p`
  font-size: 0.9rem;
  color: #8a94a6;
  margin: 0;
`;

const TestimonialRating = styled.div`
  display: flex;
  margin-bottom: 20px;
  color: #ffc107;
`;

const TestimonialContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #5a6887;
  flex: 1;
  position: relative;
  font-style: italic;
  margin: 0;
  
  &:before, &:after {
    font-size: 1.5rem;
    color: #3a6cd9;
    opacity: 0.3;
  }
  
  &:before {
    content: '"';
    margin-right: 4px;
  }
  
  &:after {
    content: '"';
    margin-left: 4px;
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: 60px 24px;
  position: relative;
  z-index: 1;
`;

const StatsCard = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
  border-radius: 20px;
  padding: 60px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(58, 108, 217, 0.2);
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    animation: ${rotate} 30s linear infinite;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  position: relative;
  color: white;
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${props => 0.2 + props.index * 0.2}s;
`;

const StatIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin-bottom: 20px;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation: ${pulse} 2s infinite;
  }
`;

const StatValue = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const StatLabel = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
`;

// CTA Section
const CTASection = styled.section`
  padding: 100px 24px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const CTAContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #2d3748;
  animation: ${fadeIn} 1s ease forwards;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 15px 35px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(58, 108, 217, 0.3);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease forwards 0.3s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(58, 108, 217, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(135deg, #3a6cd9 0%, #8662f7 100%);
    z-index: -1;
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 0.7;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shimmer} 2s infinite;
  }
`;

// Main Component
const TestimonialAndCustomersPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isInView, setIsInView] = useState(false);
  const statsRef = useRef(null);
  const [stats, setStats] = useState([
    { icon: <Users size={28} />, value: 0, target: 500, label: "Happy Clients", index: 0 },
    { icon: <Award size={28} />, value: 0, target: 2500, label: "Projects Completed", index: 1 },
    { icon: <Heart size={28} />, value: 0, target: 99, label: "Satisfaction Rate %", index: 2 }
  ]);

  const testimonials = [
    {
      text: "We recently availed the services of LifeIntelect Consultancy Pvt Ltd for our company trademark registration. Dr. Lipika Sahoo guided us through the process with professionalism and expertise. The service was exceptional, and we received our trademark on time. The team was very responsive and helpful with our queries. We highly recommend LifeIntelect Consultancy to our business associates and clients for their outstanding service. We wish them all success in their business endeavours.",
      name: "Unknown",
      position: "Representative, Total Solutions",
      stars: 5,
    },
    {
      text: "I recently availed the services of Lifeintelect for getting my Trademark registered. I was very impressed with Dr. Lipika’s professional and positive approach. She ensured that I understood the entire process and categories well and completed the registration in record time and at a reasonable cost. I would definitely recommend her services to my friends and acquaintances.",
      name: "Rajesh Bansal",
      position: "Managing Partner, ENVIVA",
      stars: 5,
    },
    {
      text: "We recently worked with LifeIntelect Consultancy Pvt Ltd for a trademark registration for a product branding project. Dr. Lipika Sahoo provided exceptional guidance throughout the entire process. Her wealth of knowledge, experience and expertise ensured that all our queries were addressed promptly and clearly. The service was efficient, cost-effective, and thoroughly professional. We were very impressed with the timely and effective solutions provided. I highly recommend LifeIntelect Consultancy to anyone seeking to secure their intellectual property rights. Thank you, Dr. Lipika, for your excellent work. Wishing you continued success.",
      name: "Gayatri",
      position: "Director, Raj Viha Tours and Travels P Ltd",
      stars: 5,
    },
    {
      text: "We are a twenty-year-old government regulated registered Chit Fund Company that enables monthly savers to borrow multiples of their savings in times of need. Recently, my son Sandeep required trademark services for his e-commerce business. I referred him to Dr. Lipika Sahoo of LifeIntelect Consultancy. Sandeep had this to say after the assignment was completed: 'Dad, thanks for referring Dr. Lipika Sahoo’s services. She displayed in-depth knowledge of the subject and handled the assignment professionally and quickly.' I strongly recommend Dr. Lipika Sahoo’s services for trademark and copyright-related matters.",
      name: "Sridhar Alampalli",
      position: "Chairman, Shanthala Chits Pvt Ltd",
      stars: 5,
    },
    {
      text: "At Olety CARZ PRIVATE LIMITED, a premium one-stop shop for pre-owned cars and two-wheelers in Bangalore with 25 years of experience, we would like to express our gratitude to LifeIntelect Consultancy Pvt Ltd for their outstanding services. We recently sought their assistance in registering our brand, and their support was timely and invaluable. Their expert advice guided us through the entire process seamlessly, providing us with all the necessary information and ensuring a smooth experience. The team's efficiency and responsiveness allowed us to complete the registration in a matter of days. We highly appreciate the excellent work done by LifeIntelect Consultancy and are more than happy to recommend their services to our contacts. We wish them continued success in their future endeavours.",
      name: "Santosh Olety",
      position: "Managing Director, Olety CARZ PRIVATE LIMITED",
      stars: 5,
    },
    {
      text: "Total Solutions, established in 1995, specializes in accounting and indirect taxation, providing comprehensive solutions with flexibility, precision, and quick responses. We have utilized Dr. Lipika Sahoo's expertise for trademark registrations, benefiting from her in-depth knowledge and professional approach. Our clients have consistently expressed satisfaction with her services. We highly recommend Dr. Lipika Sahoo and LifeIntelect Consultancy for their exceptional trademark services.",
      name: "Unknown",
      position: "Representative, Total Solutions",
      stars: 5,
    },
    {
      text: "We, M/S. INNOVA DIESEL GENERATORS PVT. LIMITED, manufacturers and suppliers of Mahindra Powerol Brand Diesel Generating Sets, recently engaged LifeIntelect Consultancy Pvt Ltd for trademark registration, intellectual property rights, and non-disclosure agreement drafting services. Dr. Lipika Sahoo, Founder & CEO, demonstrated extensive knowledge and provided valuable guidance throughout the process. The services rendered were excellent and greatly benefited our organization. We highly recommend LifeIntelect Consultancy to our BNI members and other friends and customers.",
      name: "Prashanth Shetty",
      position: "Director, Innova Diesel Generators Pvt. Limited",
      stars: 5,
    },
    {
      text: "At RAAGA, we focus on providing top-quality construction solutions within committed timelines, driven by customer satisfaction and long-term relationships. We are pleased to certify the excellent service offered by Dr. Lipika Sahoo for our trademark registration. Dr. Lipika is a thorough expert in this field and provides hassle-free solutions. She diligently followed up with the authorities and kept us informed about the various stages of the logo registration process. It was indeed special to have our first trademark done, thanks to Dr. Lipika Sahoo. We have no hesitation in recommending her to our contacts and wish her continued success in her career.",
      name: "Ranganath Kuntumalla",
      position: "Representative, RAAGA Constructions",
      stars: 5,
    },
    {
      text: "We, Universe Power Systems partners with Emerson Network Power (India) Pvt Ltd, offering UPS, batteries, server racks, and data centre solutions. We recently applied for a trademark for our company through LifeIntelect Consultancy. Dr Lipika Sahoo handled the process very professionally, ensuring a smooth and efficient experience. I strongly recommend Ms. Lipika Sahoo to others and wish her all the very best in her future endeavours.",
      name: "V. Jeyalakshmi",
      position: "Proprietrix, Universe Power Systems",
      stars: 5,
    },
    {
      text: "We at Hydrilla® specialize in Aquaponics and Hydroponics farming, consulting, and system manufacturing. For our invention, the 'Modular mineralization biofilter system,' we turned to Dr. Lipika Sahoo of LifeIntelect Consultancy Pvt Ltd to file a patent. Dr. Lipika understood the urgency of our request and efficiently filed the patent in just three weeks, ensuring a smooth and thorough process. We highly recommend the services of LifeIntelect Consultancy Pvt Ltd to our friends and contacts.",
      name: "Mamatha Kamireddy",
      position: "Founder & CEO, Hydrilla®",
      stars: 5,
      patentRelated: true,
    },
    {
      text: "We've worked with LifeIntelect Consultancy Pvt Ltd for years. Dr. Lipika Sahoo and her team are exceptionally professional, responsive, and efficient in IP matters. Their extensive knowledge and excellent service have always met our expectations. We highly recommend them to anyone in need of expert IP services.",
      name: "Sridhar Aalampalli",
      position: "Chairman, Shantala Chits Pvt Ltd",
      stars: 5,
    },
    {
      text: "Veekay Cooolers, established in 1986, is a leading air conditioning solutions provider in Bangalore. We recommended LifeIntelect Consultancy to a pharmaceutical company for IP protection and technology transfer. Dr. Lipika Sahoo and her team handled the entire process professionally and efficiently, providing regular updates and ensuring a smooth experience. We highly recommend LifeIntelect for their excellent services.",
      name: "V.K. Shanmuga Vel",
      position: "CEO, Veekay Cooolers",
      stars: 5,
      patentRelated: true,
    },
    {
      text: "Universe Power Systems, with 27 years of experience, offers DG UPS, HVAC, Datacenter, and infrastructure solutions. LifeIntelect Consultancy Pvt Ltd has efficiently handled all our trademark and patent filings, including international patents, under the expert guidance of Dr. Lipika Sahoo. Their thorough and timely service has been invaluable. We highly appreciate their support and wish them success in future projects.",
      name: "Jayalakshmi Venkatanarayanan",
      position: "Founder, Universe Power Systems",
      stars: 5,
      patentRelated: true,
    },
    {
      text: "At Kanika - The Jewellery Boutique, we believe in creating unique and customized gold and diamond jewels. I had the privilege of working with Dr. Lipika Sahoo for legal drafting work for Meteonic Innovation Pvt Ltd and trademark protection for Kanika. Dr. Lipika’s knowledge and competence are outstanding. She handled our case with remarkable speed and fought diligently to protect our brand name from being claimed by someone in Agra. Dr. Lipika and her team conducted thorough research and analysis, keeping us well-informed throughout the process. Her communication and responsiveness were beyond my expectations. We highly recommend Dr. Lipika Sahoo for all legal and trademark needs.",
      name: "Ankur",
      position: "Representative, Kanika - The Jewellery Boutique",
      stars: 5,
    },
    {
      text: "Kanika - The Jewellery Boutique, where you dream, we design, and I deliver. We believe you are a star and deserve something unique, so we focus on customized jewels in gold and diamond. We wanted to register a trademark for Kanika Jewels. Dr. Lipika Sahoo advised us on the right categories and guided us through each step. We are truly happy with her speed and domain knowledge and are pleased to recommend her to our friends and family.",
      name: "Ankur",
      position: "Representative, Kanika - The Jewellery Boutique",
      stars: 5,
    },
    {
      text: "This is Hitesh from Surgeway Biosciences, a pharmaceutical export house. We contacted LifeIntelect Consultancy Pvt Ltd for trademark registration and were impressed by their professionalism and quick service. We highly recommend their services and wish them all the best.",
      name: "Hitesh Kumar M",
      position: "Vice President, Surgeway Biosciences",
      stars: 5,
    },
    {
      text: "Vidruma, a leading gemstone boutique in Bangalore, recommended Dr. Lipika Sahoo of LifeIntelect Consultancy Pvt Ltd for trademark and patent filings. Dr. Lipika provided thorough solutions with exceptional knowledge and timely service. We and our clients are very satisfied with her expertise. We highly recommend LifeIntelect Consultancy for their dedication and excellent service.",
      name: "Srilatha V",
      position: "Founder & Director, Vidruma Gemstones & Laboratory",
      stars: 5,
      patentRelated: true,
    },
    {
      text: "Saptha Innovations Pvt Ltd, an authorized distributor for Grundfos pumps and AO Smith heat pumps, availed the services of LifeIntelect Consultancy Pvt Ltd, headed by Dr. Lipika Sahoo, for our trademark registration. We appreciate the valuable advice received from the team during the process. We thank the team for their support and wish them the very best in their business.",
      name: "Unknown",
      position: "Representative, Saptha Innovations Pvt Ltd",
      stars: 5,
    },
  ];

  const brands = [
    { name: "Adityavani", logo: company },
    { name: "Adityavani", logo: company2 },
    { name: "Adityavani", logo: company3 },
    { name: "Adityavani", logo: company4 },
    { name: "Adityavani", logo: company5 },
    { name: "Adityavani", logo: company6 },
    { name: "Adityavani", logo: company7 },
    { name: "Adityavani", logo: company8 },
    { name: "Adityavani", logo: company9 },
    { name: "Adityavani", logo: company10 },
    { name: "Adityavani", logo: company11 },
    { name: "Adityavani", logo: company12 },
    { name: "Adityavani", logo: company13 },
    { name: "Adityavani", logo: company14 },
    { name: "Adityavani", logo: company15 },
    { name: "Adityavani", logo: company16 },
    { name: "Adityavani", logo: company17 },
    { name: "Adityavani", logo: company18 },
    { name: "Adityavani", logo: company19 },
    { name: "Adityavani", logo: company20 },
    { name: "Adityavani", logo: company21 },
    { name: "Adityavani", logo: company22 },
    { name: "Adityavani", logo: company23 },
    { name: "Adityavani", logo: company24 },
    { name: "Adityavani", logo: company25 },
    { name: "Adityavani", logo: company26 },
    { name: "Adityavani", logo: company27 },
    { name: "Adityavani", logo: company28 },
    { name: "Adityavani", logo: company29 },
    { name: "Adityavani", logo: company30 },
    { name: "Adityavani", logo: company31 },
    { name: "Adityavani", logo: company32 },
    { name: "Adityavani", logo: company33 },
    { name: "Adityavani", logo: company34 },
    { name: "Adityavani", logo: company35 },
    { name: "Adityavani", logo: company36 },
    { name: "Adityavani", logo: company37 },
    { name: "Adityavani", logo: company38 },
    { name: "Adityavani", logo: company39 },
    { name: "Adityavani", logo: company40 },
    { name: "Adityavani", logo: company41 },
    { name: "Adityavani", logo: company42 },
    { name: "Adityavani", logo: company43 },
    { name: "Adityavani", logo: company44 },
    { name: "Adityavani", logo: company45 },
    { name: "Adityavani", logo: company46 },
    { name: "Adityavani", logo: company47 },
    { name: "Adityavani", logo: company48 },
    { name: "Adityavani", logo: company49 },
    { name: "Adityavani", logo: company50 },
    { name: "Adityavani", logo: company51 },
    { name: "Adityavani", logo: company52 },
    { name: "Adityavani", logo: company53 },
    { name: "Adityavani", logo: company54 },
    { name: "Adityavani", logo: company55 },
    { name: "Adityavani", logo: company56 },
    { name: "Adityavani", logo: company57 },
    { name: "Adityavani", logo: company58 },
    { name: "Adityavani", logo: company59 },
    { name: "Adityavani", logo: company60 },
    { name: "Adityavani", logo: company61 },
    { name: "Adityavani", logo: company62 },
    { name: "Adityavani", logo: company63 },
    { name: "Adityavani", logo: company64 },
    { name: "Adityavani", logo: company65 },
    { name: "Adityavani", logo: company66 },
    { name: "Adityavani", logo: company67 },
    { name: "Adityavani", logo: company68 },
    { name: "Adityavani", logo: company69 },
    { name: "Adityavani", logo: company70 },
    { name: "Adityavani", logo: company71 },
    { name: "Adityavani", logo: company72 },
    { name: "Adityavani", logo: company73 },
    { name: "Adityavani", logo: company74 },
    { name: "Adityavani", logo: company75 },
    { name: "Adityavani", logo: company76 },
    { name: "Adityavani", logo: company77 },
    { name: "Adityavani", logo: company78 },
    { name: "Adityavani", logo: company79 },
    { name: "Adityavani", logo: company80 },
    { name: "Adityavani", logo: company81 },
    { name: "Adityavani", logo: company82 },

  ];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          startCountUp();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const startCountUp = () => {
    const duration = 2000; // ms
    const steps = 50;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          const increment = stat.target / steps;
          const newValue = Math.min(stat.value + increment, stat.target);
          return {
            ...stat,
            value: newValue === stat.target ? stat.target : Math.floor(newValue)
          };
        })
      );
      
      if (stats.every(stat => stat.value >= stat.target)) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setDirection('next');
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('prev');
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <PageContainer>
        {/* Background Blobs */}
        <BackgroundBlob />
        <BackgroundBlob />
        <BackgroundBlob />
        
        {/* Header */}
        <Header>
          <Title>OUR CLIENTS TRUST US</Title>
          <Subtitle>
            Discover why hundreds of companies trust us with their business needs and hear their success stories directly from the source.
          </Subtitle>
        </Header>
        
        {/* Brands Section */}
        <BrandsSection>
          <SectionTitle>Trusted by Industry Leaders</SectionTitle>
          <BrandScrollContainer>
            <LogoScroll>
              {[...brands, ...brands].map((brand, index) => (
                <BrandLogo key={index}>
                  <img src={brand.logo} alt={brand.name} style={{ width: '100px', height: 'auto' }} />
                </BrandLogo>
              ))}
            </LogoScroll>
          </BrandScrollContainer>
        </BrandsSection>
        
        {/* Testimonials Section */}
        <TestimonialsSection>
          <SectionTitle>Client Testimonials</SectionTitle>
          <TestimonialContainer>
            <TestimonialControl prev onClick={prevTestimonial}>
              <TestimonialArrow>
                <ChevronLeft size={24} />
              </TestimonialArrow>
            </TestimonialControl>
            
            <TestimonialSlider>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index} 
                  active={index === activeTestimonial}
                  direction={direction}
                >
                  <QuoteIconWrapper>
                    <Quote size={48} />
                  </QuoteIconWrapper>
                  
                  <TestimonialProfile>
                    <ProfileImageWrapper>
                      <ProfileImage />
                    </ProfileImageWrapper>
                    
                    <ProfileInfo>
                      <ProfileName>{testimonial.name}</ProfileName>
                      <ProfilePosition>{testimonial.position}</ProfilePosition>
                    </ProfileInfo>
                  </TestimonialProfile>
                  
                  <TestimonialRating>
                    {Array(testimonial.stars).fill().map((_, i) => (
                      <Star key={i} size={18} fill="#ffc107" />
                    ))}
                  </TestimonialRating>
                  
                  <TestimonialContent>
                    {testimonial.text}
                  </TestimonialContent>
                </TestimonialCard>
              ))}
            </TestimonialSlider>
            
            <TestimonialControl onClick={nextTestimonial}>
              <TestimonialArrow>
                <ChevronRight size={24} />
              </TestimonialArrow>
            </TestimonialControl>
          </TestimonialContainer>
        </TestimonialsSection>
        
        {/* Stats Section */}
        <StatsSection ref={statsRef}>
          <StatsCard>
            {stats.map((stat) => (
              <StatItem key={stat.label} index={stat.index}>
                <StatIconWrapper>
                  {stat.icon}
                </StatIconWrapper>
                <StatValue>{Math.round(stat.value)}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsCard>
        </StatsSection>
        
        {/* CTA Section */}
        <CTASection>
          <CTAContent>
            <CTATitle>Ready to join our list of happy customers?</CTATitle>
            <CTAButton>Get Started Today</CTAButton>
          </CTAContent>
        </CTASection>
      </PageContainer>
    </>
  );
};

export default TestimonialAndCustomersPage;