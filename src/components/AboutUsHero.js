"use client";

import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Keyframes for animated gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg,rgb(255, 255, 255),rgb(13, 3, 93));
  /* background: linear-gradient(45deg, #4361EE, #FF3366, #FFCC33, #33CC33); */
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  color: white;
  overflow: hidden;
  padding: 20px;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  padding: 40px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg,rgb(247, 247, 247),rgb(255, 248, 251));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${floatAnimation} 4s ease-in-out infinite;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  opacity: 0.8;
  margin-bottom: 30px;
  font-weight: 500;
`;

const Button = styled(motion.button)`
  background: linear-gradient(90deg, #ff758c, #ff7eb3);
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 10px;
  &:hover {
    box-shadow: 0 10px 20px rgba(255, 118, 148, 0.5);
    transform: scale(1.1) rotate(3deg);
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const AboutUsHero = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const particleCount = 100;
    container.innerHTML = "";
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.position = "absolute";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      particle.style.background = "rgba(255, 255, 255, 0.2)";
      particle.style.borderRadius = "50%";
      particle.style.transition = "transform 0.1s ease-out";
      container.appendChild(particle);
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const particles = container.children;
      for (let particle of particles) {
        const speed = Math.random() * 2 + 1;
        const x = (clientX / window.innerWidth) * 100 * speed;
        const y = (clientY / window.innerHeight) * 100 * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <HeroSection>
      <ParticlesContainer ref={particlesRef} />
      <Content initial="hidden" animate="visible" variants={fadeInUp}>
        <Title variants={fadeInUp}>About <span style={{ color: "#00c6ff" }}>Us</span></Title>
        <Subtitle variants={fadeInUp}>
        To deliver world-class technological and IP solutions with high confidentiality standards, encompassing ideation, protection, and management, while safeguarding the interests of our clients and employees.
        </Subtitle>
        <Button whileHover={{ scale: 1.15, rotate: 5 }}>Learn More</Button>
      </Content>
    </HeroSection>
  );
};

export default AboutUsHero;
