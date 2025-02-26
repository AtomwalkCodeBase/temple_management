import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.isScrolled ? '#ffffff1a' : 'transparent')};
  border: 1px solid #1a050520;
  background: #ffffff1a;
  backdrop-filter: blur(16px) saturate(120%);
  border-radius: 2px;
  transition: background-color 0.3s ease;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 19;
  span {
    height: 3px;
    width: 25px;
    background-color: #000;
    margin: 4px;
    transition: all 0.3s ease;
  }

  ${(props) =>
    props.isOpen &&
    `span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 0%;
    left: 0;
    right: 0;
    background-color: silver;
    flex-direction: column;
    text-align: center;
    padding: 1rem;
    transform: ${(props) => (props.isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    transition: transform 0.3s ease;
  }
`;

const MenuItem = styled.a`
    color: #ffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: .8px;
    opacity: .75;
    padding: 0 25px;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    width: 100%;
    font-size: 1.5rem;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
      <Logo>MyLogo</Logo>
      <Hamburger onClick={toggleMenu} isOpen={isOpen}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuItem href="#">Home</MenuItem>
        <MenuItem href="#">About</MenuItem>
        <MenuItem href="#">Services</MenuItem>
        <MenuItem href="#">Contact</MenuItem>
      </Menu>
    </Nav>
  );
};

export default NavBar;
