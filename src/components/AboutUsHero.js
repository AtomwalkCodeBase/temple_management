import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import SpaceImage_2 from "../assets/img/aboutus_image.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } }
};

// Image and background styles remain the same
const ImageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background-image: url(${SpaceImage_2});
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* <-- Add this line for blackish transparent overlay */
    /* You can adjust the 0.8 value for more/less darkness */
  }
`;

const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  padding: 20px;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  padding: 40px;
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Updated Title styles with PLANET/EARTH design
const Title = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const PlanetText = styled(motion.span)`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #FFFFFF;
`;

const EarthText = styled(motion.span)`
  font-size: 64px;
  font-weight: 900;
  font-family: 'Playfair Display', serif;
  color: #FFFFFF;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

// Updated Subtitle styles
const Subtitle = styled(motion.p)`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  color: #ffffff;
  max-width: 600px;
  margin-bottom: 30px;
`;

// Updated Button styles
const Button = styled(motion.button)`
  background: #FFFFFF;
  color: #000000;
  border: none;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Tagline = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
`;

const TaglineItem = styled.span`
  background-color: #f1f5f9;
  color: #334155;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.04);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(15, 23, 42, 0.08);
    background-color: #e0e7ff;
    color: #4f46e5;
  }
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
      particle.style.background = " #fff";
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
      <ImageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ backgroundImage: <img src={SpaceImage_2} alt="Test" style={{ width: "100px" }} /> }}
      />

      {/* <ParticlesContainer ref={particlesRef} /> */}

      <Content initial="hidden" animate="visible" variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } }
      }}>
        <Title variants={fadeInUp}>
          <PlanetText>PLANET</PlanetText>
          <EarthText>About <span style={{ color: "#00c6ff" }}>Us</span></EarthText>
        </Title>
        <Subtitle variants={fadeInUp}>
          LifeIntelect is a distinguished technology and IP consulting firm founded by IIScians, having a track record of 99.9% patent grant success for our clients.
        </Subtitle>
        {/* <Button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </Button> */}

        <Tagline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <TaglineItem>Empowering Ideas</TaglineItem>
          <TaglineItem>Protecting Innovation</TaglineItem>
          <TaglineItem>Transforming Futures</TaglineItem>
        </Tagline>
      </Content>
    </HeroSection>
  );
};

export default AboutUsHero;