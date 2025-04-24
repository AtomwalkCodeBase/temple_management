import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import companylogo from '../assets/img/company_logo.png';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${props => props.isScrolled ? '0.8rem 2rem' : '1rem 2rem'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.isScrolled 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'linear-gradient(135deg, rgba(248, 248, 248, 0.2), rgba(255, 255, 255, 0.1))'};
  backdrop-filter: blur(${props => props.isScrolled ? '20px' : '10px'}) saturate(180%);
  box-shadow: ${props => props.isScrolled 
    ? '0 5px 20px rgba(0, 0, 0, 0.1)' 
    : '0 2px 10px rgba(0, 0, 0, 0.05)'};
  border-bottom: ${props => props.isScrolled 
    ? '1px solid rgba(255, 255, 255, 0.2)' 
    : 'none'};
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1000;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${props => props.isScrolled ? '3px' : '0px'};
    background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
    background-size: 200% 200%;
    animation: ${gradientShift} 3s ease infinite;
    transition: height 0.3s ease;
    overflow-y: hidden;
  }

  @media (max-width: 1199px) {
    padding: ${props => props.isScrolled ? '0.6rem 1.5rem' : '0.8rem 1.5rem'};
  }

  @media (max-width: 768px) {
    padding: ${props => props.isScrolled ? '0.5rem 1rem' : '0.7rem 1rem'};
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.8s ease forwards;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 100px;
  position: relative;
  transition: all 0.3s ease;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
    opacity: ${props => props.isScrolled ? '1' : '0.6'};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    
    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 19;
  
  span {
    height: 3px;
    width: 28px;
    border-radius: 10px;
    background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
    margin: 5px;
    transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }
  
  ${props => props.isOpen && css`
    span:nth-child(1) {
      transform: rotate(45deg) translate(10px, 5px);
      width: 20px;
    }
    
    span:nth-child(2) {
      opacity: 0;
      transform: translateX(20px);
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translate(10px, -5px);
      width: 20px;
    }
  `}
  
  @media (max-width: 991px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: ${props => props.isScrolled ? '2.5rem' : '4rem'};
  transition: all 0.3s ease;
  align-items: center;

  @media (max-width: 1199px) {
    gap: ${props => props.isScrolled ? '1.5rem' : '2.5rem'};
  }

  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 350px;
    height: 100vh;
    background: linear-gradient(135deg, rgba(40, 40, 45, 0.95), rgba(30, 30, 35, 0.98));
    backdrop-filter: blur(10px);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0;
    padding: 70px 0 2rem;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    overflow-y: auto;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(to bottom, #FF3CAC, #784BA0, #2B86C5);
    }
  }
`;

const MenuItemWrapper = styled.div`
  position: relative;
  width: ${props => props.isMobile ? '100%' : 'auto'};

  @media (max-width: 991px) {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const MenuItem = styled.a`
  color: ${props => props.isScrolled ? '#333' : '#333'};
  font-size: ${props => props.isScrolled ? '16px' : '18px'};
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 5px 0;
  opacity: 0.75;
  position: relative;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  cursor: pointer;
  display: block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
    transition: all 0.3s ease;
  }
  
  &:hover {
    opacity: 1;
    transform: translateY(-3px);
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    
    &::after {
      width: 100%;
      left: 0;
    }
  }
  
  ${props => props.isActive && css`
    opacity: 1;
    &::after {
      width: 100%;
      left: 0;
    }
  `}
  
  @media (max-width: 991px) {
    color: white;
    padding: 15px 20px;
    font-size: 16px;
    opacity: 0.8;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &::after {
      display: none;
    }

    &:hover {
      transform: none;
      background: rgba(255, 255, 255, 0.05);
    }
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 991px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 18;
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: ${props => props.scrollProgress}%;
  background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
  background-size: 200% 200%;
  z-index: 1001;
  animation: ${gradientShift} 3s ease infinite;
  transition: width 0.1s ease;
`;

const ActionButton = styled.button`
  background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
  background-size: 200% 200%;
  animation: ${gradientShift} 3s ease infinite;
  color: white;
  border: none;
  padding: ${props => props.isScrolled ? '8px 16px' : '10px 20px'};
  border-radius: 50px;
  font-weight: 600;
  font-size: ${props => props.isScrolled ? '14px' : '16px'};
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    animation: ${pulseAnimation} 1.5s infinite;
  }
  
  @media (max-width: 991px) {
    margin: 20px auto;
    padding: 12px 25px;
    font-size: 1rem;
    width: 80%;
    display: block;
  }
`;

// New improved mega menu styles
const MegaDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ isScrolled }) => isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(248, 249, 250, 0.95)'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-top: 3px solid #3498db;
  padding: 30px 30px 40px; /* Increased bottom padding for scrollable content */
  z-index: 1000;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.3s ease forwards;
  transform-origin: top center;
  max-height: calc(100vh - 100px); /* Limit height to viewport minus navbar */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  
  /* Custom Scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #FF3CAC, #784BA0, #2B86C5);
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #FF3CAC, #784BA0, #2B86C5);
    opacity: 0.9;
  }
  
  /* Custom Scrollbar for Firefox */
  scrollbar-width: thin;
  scrollbar-color: #784BA0 rgba(0, 0, 0, 0.05);

  @media (max-width: 1199px) {
    padding: 20px 20px 30px;
    max-height: calc(100vh - 80px); /* Adjust for smaller navbar height */
  }
`;

const DropdownContainer = styled.div`
  max-width: 1400px;
  width: 100%;
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  width: 100%;

  @media (max-width: 1199px) {
    gap: 20px;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

// Mobile dropdown enhancements
const MobileDropdown = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  transition: max-height 0.5s ease-in-out;
`;

const MobileServiceCategoryContainer = styled.div`
  margin-bottom: 10px;
`;

const MobileServiceTitle = styled.div`
  color: #fff;
  font-weight: 600;
  margin-bottom: 5px;
  padding: 10px 20px 10px 35px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
    border-radius: 50%;
  }
`;

const MobileServiceList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileServiceItem = styled.div`
  padding: 10px 20px 10px 45px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 14px;
  position: relative;
  transition: all 0.2s ease;

  &::before {
    content: '•';
    position: absolute;
    left: 30px;
    color: #3498db;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

// Desktop dropdown improvements
const ServiceColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e1e1e1;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
  }

  @media (max-width: 1199px) {
    font-size: 16px;
  }
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ServiceItem = styled.li`
  position: relative;
  padding-left: 15px;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3498db;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  a {
    color: #34495e;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 15px;
    padding: 5px 0;
    display: block;
    text-decoration: none;
    
    &:hover {
      color: #3498db;
    }
  }
  
  &:hover {
    transform: translateX(5px);

    &::before {
      background: linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5);
      opacity: 1;
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: 1199px) {
    a {
      font-size: 14px;
    }
  }
`;

// Icon for dropdown
const DropdownIcon = styled.span`
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItem, setActiveItem] = useState('home');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 992); // Adjust breakpoint as needed
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowServicesDropdown(false); // Close dropdown when opening menu
    }
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  // Close menu when clicking outside
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
    setShowServicesDropdown(false);
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const servicesData = [
    {
      id: 'ip-solutions',
      title: 'IP Solutions',
      subServices: [
        { id: 'patent', name: 'Patent' },
        { id: 'copyright', name: 'Copyright' },
        { id: 'design', name: 'Design' },
        { id: 'trademark', name: 'Trademark' },
        { id: 'geographical-indication', name: 'Geographical Indication' }
      ]
    },
    {
      id: 'ip-lifecycle',
      title: 'IP Lifecycle Management',
      subServices: [
        { id: 'ip-audit', name: 'IP Audit of the Company' },
        { id: 'ip-policy', name: 'IP Policy and Process Setup' },
        { id: 'ip-portfolio', name: 'IP Portfolio Management' },
        { id: 'ip-valuation', name: 'IP Valuation' },
        { id: 'technology-transfer', name: 'Technology Transfer' },
        { id: 'analysis-diligence', name: 'Analysis and Due Diligence' },
        // { id: 'ip-education', name: 'IP Education and Training' }
      ]
    },
    {
      id: 'scientific-tech',
      title: 'Scientific & Technology Solutions',
      subServices: [
        { id: 'Scientific-&-Technology-Solutions', name: 'Scientific & Technology Solutions' },
        { id: 'patent-valuations', name: 'Patent Valuations' },
        { id: 'drug-discovery', name: 'Drug Discovery and Development' },
        { id: 'patent-due-diligence', name: 'Patent Due Diligence & Variability Analysis' },
        { id: 'clinical-potential', name: 'Assessment of Clinical & Commercial Potential' },
        { id: 'competitive-landscape', name: 'Competitive Landscape & Industry Trends' },
        { id: 'management-consulting', name: 'Management Consulting' },
        { id: 'market-research', name: 'Market Research' },
        { id: 'scientific-writing', name: 'Scientific Writing and Editing' },
        { id: 'non-patent-searches', name: 'Non-Patent Searches and Analysis' }
      ]
    },
    // Additional services can be added here
    {
      id: 'Strategic',
      title: 'Strategic & Legal Advisory',
      subServices: [
        { id: 'IP-Strategy-Development', name: 'IP Strategy Development' },
        { id: 'IP-Litigation-&-Enforcement-Support', name: 'IP Litigation & Enforcement Support' },
        { id: 'Licensing-&-IP-Agreements', name: 'Licensing & IP Agreements' },
        { id: 'Cross-Border-IP-Strategy-&-Compliance', name: 'Cross-Border IP Strategy & Compliance' },
        { id: 'Trade-Secret-Protection-&-Confidentiality', name: 'Trade Secret Protection & Confidentiality' },
        { id: 'IP-Exit-Strategy-&-Monetization', name: 'IP Exit Strategy & Monetization' },
        { id: 'Corporate-IP-Governance-&-Risk-Mitigation', name: 'Corporate IP Governance & Risk Mitigation' },
        { id: 'Patent-&-Trademark-Portfolio-Optimization', name: 'Patent & Trademark Portfolio Optimization' },
        { id: 'Government-and-Policy-Advocacy', name: 'Government and Policy Advocacy' },
      ]
    },
    {
      id: 'IPR Solutions',
      title: 'IPR Solutions for Startups',
      subServices: [
        { id: 'IP-Strategy-&-Roadmap-for-Startups', name: 'IP Strategy & Roadmap for Startups' },
        { id: 'Cost-Effective-IP-Protection', name: 'Cost-Effective IP Protection' },
        { id: 'IP-Due-Diligence-for-Investors', name: 'IP Due Diligence for Investors' },
        { id: 'IP-Licensing-&-Commercialization', name: 'IP Licensing & Commercialization' },
        { id: 'Raising-Awareness-and-Funding-with-IP', name: 'Raising Awareness and Funding with IP' },
        { id: 'Startup-IP-Portfolio-Management', name: 'Startup IP Portfolio Management' },
        { id: 'IP-Risk-Management-for-Startups', name: 'IP Risk Management for Startups' },
      ]
    },
    {
      id: 'IP education and training',
      title: 'IP education and training',
      subServices: [
        { id: 'Custom-IP-Workshops-for-Teams', name: 'Custom IP Workshops for Teams' },
        { id: 'IP-Fundamentals-for-Startups-and-Entrepreneurs', name: 'IP Fundamentals for Startups and Entrepreneurs' },
        { id: 'IP-Law-&-Policy-Updates', name: 'IP Law & Policy Updates' },
        { id: 'IP-Management-Best-Practices', name: 'IP Management Best Practices' },
        { id: 'IP-Strategy-for-Product-Development', name: 'IP Strategy for Product Development' },
        { id: 'IP-Commercialization-&-Licensing-Training', name: 'IP Commercialization & Licensing Training' },
        { id: 'IP-Dispute-Resolution-&-Enforcement', name: 'IP Dispute Resolution & Enforcement' },
        { id: 'Sector-Specific-IP-Training', name: 'Sector-Specific IP Training' },
      ]
    }
  ];

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const navigateTo = (path) => {
    window.location.href = `/${path}`;
    setShowServicesDropdown(false);
    closeMenu();
  };

  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
  };

  return (
    <>
      <ProgressBar scrollProgress={scrollProgress} />
      <Nav isScrolled={isScrolled} ref={navRef}>
        <LogoWrapper onClick={() => window.location.href = '/'}>
          <Logo src={companylogo} isScrolled={isScrolled} alt="Company Logo" />
        </LogoWrapper>
        
        <Hamburger isOpen={isOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        
        <Overlay isOpen={isOpen} onClick={closeMenu} />
        
        <Menu isOpen={isOpen} isScrolled={isScrolled}>
          {menuItems.map((item, index) => (
            <MenuItemWrapper key={item.id} isMobile={isMobile}>
              <MenuItem 
                isScrolled={isScrolled}
                index={index}
                onClick={() => {
                  if (item.id !== 'services') {
                    window.location.href = `/${item.id === 'home' ? '' : item.id}`;
                    closeMenu();
                  } else {
                    toggleServicesDropdown();
                  }
                }}
                onMouseEnter={() => !isMobile && item.id === 'services' && setShowServicesDropdown(true)}
              >
                {item.label}
                {item.id === 'services' && (
                  <DropdownIcon isOpen={showServicesDropdown}>▼</DropdownIcon>
                )}
              </MenuItem>

              {/* Mobile Services Dropdown */}
              {isMobile && item.id === 'services' && (
                <MobileDropdown isOpen={showServicesDropdown}>
                  {servicesData.map((service) => (
                    <MobileServiceCategoryContainer key={service.id}>
                      <MobileServiceTitle>{service.title}</MobileServiceTitle>
                      <MobileServiceList>
                        {service.subServices.map((subservice) => (
                          <MobileServiceItem 
                            key={subservice.id}
                            onClick={() => navigateTo(subservice.id)}
                          >
                            {subservice.name}
                          </MobileServiceItem>
                        ))}
                      </MobileServiceList>
                    </MobileServiceCategoryContainer>
                  ))}
                </MobileDropdown>
              )}
            </MenuItemWrapper>
          ))}
          <ActionButton isScrolled={isScrolled}>Get Started</ActionButton>
        </Menu>

        {/* Desktop Mega Dropdown Menu */}
        {!isMobile && showServicesDropdown && (
          <MegaDropdown 
            ref={dropdownRef}
            isScrolled={isScrolled}
            onMouseLeave={() => setShowServicesDropdown(false)}
          >
            <DropdownContainer>
              <DropdownGrid>
                {servicesData.map((service) => (
                  <ServiceColumn key={service.id}>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceList>
                      {service.subServices.map((subservice) => (
                        <ServiceItem key={subservice.id}>
                          <a onClick={() => navigateTo(subservice.id)}>
                            {subservice.name}
                          </a>
                        </ServiceItem>
                      ))}
                    </ServiceList>
                  </ServiceColumn>
                ))}
              </DropdownGrid>
            </DropdownContainer>
          </MegaDropdown>
        )}
      </Nav>
    </>
  );
};

export default NavBar;