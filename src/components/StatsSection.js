"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const StatsContainer = styled.section`
  padding: 5rem 0;
  background: ${(props) => props.theme.colors.darkBackground};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 50%,
        rgba(255, 153, 51, 0.1),
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 50%,
        rgba(59, 89, 152, 0.1),
        transparent 50%
      );
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 153, 51, 0.1),
      transparent
    );
    transition: left 0.8s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(255, 153, 51, 0.2);
    border-color: rgba(255, 153, 51, 0.3);
  }
`;

const StatIcon = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  background: ${(props) => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px rgba(255, 153, 51, 0.5));
`;

const StatNumber = styled(motion.div)`
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 0.5rem;
  font-family: ${(props) => props.theme.fonts.heading};
  text-shadow: 0 0 20px rgba(255, 153, 51, 0.3);
`;

const StatLabel = styled.h3`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StatDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  font-size: 0.95rem;
`;

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count.toLocaleString();
};

const StatsSection = () => {
  const stats = [
    {
      icon: "🏛️",
      number: 500,
      suffix: "+",
      label: "Sacred Temples",
      description: "Connected temples across India offering divine services",
    },
    {
      icon: "🙏",
      number: 50000,
      suffix: "+",
      label: "Pujas Completed",
      description: "Successful puja bookings with blessed outcomes",
    },
    {
      icon: "👥",
      number: 100000,
      suffix: "+",
      label: "Happy Devotees",
      description: "Satisfied souls experiencing divine blessings",
    },
    {
      icon: "📦",
      number: 25000,
      suffix: "+",
      label: "Prasad Delivered",
      description: "Sacred offerings delivered to devotees worldwide",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <StatsContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <StatIcon
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                {stat.icon}
              </StatIcon>

              <StatNumber>
                <AnimatedCounter end={stat.number} />
                {stat.suffix}
              </StatNumber>

              <StatLabel>{stat.label}</StatLabel>
              <StatDescription>{stat.description}</StatDescription>
            </StatCard>
          ))}
        </StatsGrid>
      </motion.div>
    </StatsContainer>
  );
};

export default StatsSection;
