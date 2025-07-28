"use client";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  background: ${(props) =>
    props.scrolled ? "rgba(255, 248, 231, 0.95)" : "rgba(255, 248, 231, 0.8)"};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 153, 51, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.scrolled ? "0 10px 40px rgba(0, 0, 0, 0.1)" : "none"};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${(props) => props.theme.colors.gradient.primary};
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: opacity 0.5s ease;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(motion.div)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 2.2rem;
  font-weight: 800;
  background: ${(props) => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${(props) => props.theme.colors.gradient.primary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const OmSymbol = styled(motion.span)`
  font-size: 2.8rem;
  background: ${(props) => props.theme.colors.gradient.divine};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px rgba(218, 165, 32, 0.5));
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem 1rem;
  border-radius: 25px;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: rgba(255, 153, 51, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
    background: rgba(255, 153, 51, 0.15);
    box-shadow: 0 5px 15px rgba(255, 153, 51, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: ${(props) => props.theme.colors.gradient.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover::before,
  &.active::before {
    width: 80%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: ${(props) => props.theme.colors.gradient.primary};
  color: white;
  font-size: 1.5rem;
  padding: 0.8rem;
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.button};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 248, 231, 0.98);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 153, 51, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 1.5rem 0;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  border-bottom: 1px solid rgba(255, 153, 51, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover,
  &.active {
    color: ${(props) => props.theme.colors.primary};
    padding-left: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 100%;
    background: rgba(255, 153, 51, 0.1);
    transition: width 0.3s ease;
  }

  &:hover::before,
  &.active::before {
    width: 4px;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/temples", label: "Temples" },
    { path: "/book-puja", label: "Book Puja" },
    { path: "/live-darshan", label: "Live Darshan" },
    { path: "/shop", label: "Shop" },
    { path: "/bhajans", label: "Bhajans" },
    { path: "/blogs", label: "Blogs" },
  ];

  return (
    <NavbarContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <NavContent>
        <Logo whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <OmSymbol
            animate={{
              filter: [
                "drop-shadow(0 0 10px rgba(218, 165, 32, 0.5))",
                "drop-shadow(0 0 20px rgba(255, 153, 51, 0.8))",
                "drop-shadow(0 0 10px rgba(218, 165, 32, 0.5))",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            ॐ
          </OmSymbol>
          DevotionHub
        </Logo>

        <NavLinks>
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </NavLinks>

        <MobileMenuButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ☰
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MobileNavLink
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </MobileNavLink>
              </motion.div>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
