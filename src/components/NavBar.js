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
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: ${props => props.isScrolled ? '2.5rem' : '4rem'};
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(40, 40, 45, 0.95), rgba(30, 30, 35, 0.98));
    backdrop-filter: blur(10px);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    
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
  
  @media (max-width: 768px) {
    color: white;
    padding: 1rem 0;
    font-size: 1.2rem;
    opacity: 0.8;
    width: 100%;
    text-align: center;
    
    &::after {
      bottom: -5px;
      height: 3px;
    }
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
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
  
  @media (max-width: 768px) {
    margin-top: 30px;
    padding: 12px 25px;
    font-size: 1rem;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItem, setActiveItem] = useState('home');
  const navRef = useRef(null);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };
  
  // Close menu when clicking outside
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };
  
  // Change navbar background on scroll and update progress bar
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      
      // Change navbar style on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active menu item based on scroll position
      // This is a simplified example - you would need to adjust based on your sections
      if (window.scrollY < 300) {
        setActiveItem('home');
      } else if (window.scrollY < 800) {
        setActiveItem('about');
      } else if (window.scrollY < 1200) {
        setActiveItem('services');
      } else {
        setActiveItem('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];
  const navigationmenu =(data)=>{
    if(data=='home'){
      window.location.href = '/';
    }
    else if(data=='about'){
      window.location.href = '/aboutus.html';
    }
    else if(data=='services'){
      window.location.href = '/services.html';
    }
    else if(data=='contact'){
      window.location.href = '/contact.html';
    }
    else{
      window.location.href = '/';
    }

  }
  return (
    <>
      <ProgressBar scrollProgress={scrollProgress} />
      <Nav isScrolled={isScrolled} ref={navRef}>
        <LogoWrapper onClick={() => window.location.href = '/'}>
          <Logo src={companylogo} isScrolled={isScrolled}></Logo>
        </LogoWrapper>
        
        <Hamburger isOpen={isOpen} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        
        <Overlay isOpen={isOpen} onClick={closeMenu} />
        
        <Menu isOpen={isOpen} isScrolled={isScrolled}>
          {menuItems.map((item, index) => (
            <MenuItem 
              key={item.id}
              // href={`#${item.id}`}
              isScrolled={isScrolled}
              // isActive={activeItem === item.id}
              index={index}
              onClick={() => {
                // setActiveItem(item.id);
                navigationmenu(item.id);
                closeMenu();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
          <ActionButton isScrolled={isScrolled}>Get Started</ActionButton>
        </Menu>
      </Nav>
    </>
  );
};

export default NavBar;