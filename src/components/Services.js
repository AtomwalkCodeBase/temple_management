"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 8rem 0;
  background: ${(props) => props.theme.colors.gradient.mystical};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
    opacity: 0.3;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 153, 51, 0.8)
    );
    border-radius: 2px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 3rem 2rem;
  border-radius: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.8s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 153, 51, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ServiceIcon = styled(motion.div)`
  font-size: 5rem;
  margin-bottom: 2rem;
  background: ${(props) => props.theme.colors.gradient.divine};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 153, 51, 0.6));
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      rgba(255, 153, 51, 0.2),
      transparent 70%
    );
    border-radius: 50%;
    z-index: -1;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-family: ${(props) => props.theme.fonts.heading};
`;

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
`;

const ServiceButton = styled(motion.button)`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: ${(props) => props.theme.colors.gradient.primary};
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 153, 51, 0.4);
  }
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 153, 51, 0.1), transparent 70%);
  filter: blur(40px);
`;

const Services = () => {
  const services = [
    {
      id: 1,
      icon: "🙏",
      title: "Sacred Puja Booking",
      description:
        "Book personalized pujas and rituals at your favorite temples with experienced priests. Choose from various ceremonies tailored to your spiritual needs.",
    },
    {
      id: 2,
      icon: "📺",
      title: "Live Temple Darshan",
      description:
        "Experience divine darshan from anywhere in the world with our high-quality live streaming service. Join thousands in spiritual communion.",
    },
    {
      id: 3,
      icon: "🎁",
      title: "Blessed Prasad Delivery",
      description:
        "Receive sacred prasad and blessed items directly from temples to your doorstep. Each package is prepared with devotion and care.",
    },
    {
      id: 4,
      icon: "🎵",
      title: "Divine Bhajans & Mantras",
      description:
        "Listen to soul-stirring bhajans and powerful mantras for spiritual upliftment. Curated collection from renowned artists and temples.",
    },
    {
      id: 5,
      icon: "⭐",
      title: "Vedic Astrology",
      description:
        "Get personalized astrological guidance and remedies from expert astrologers. Discover your spiritual path and divine purpose.",
    },
    {
      id: 6,
      icon: "📚",
      title: "Spiritual Wisdom",
      description:
        "Read inspiring articles and stories about spirituality, festivals, and ancient traditions. Deepen your understanding of divine knowledge.",
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
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Section>
      {/* Floating Orbs */}
      <FloatingOrb
        style={{ top: "10%", left: "5%" }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <FloatingOrb
        style={{ bottom: "10%", right: "5%" }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Divine Services
          </SectionTitle>
          <SectionSubtitle
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the sacred through our comprehensive spiritual services
            designed to connect you with the divine
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ServiceIcon
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                >
                  {service.icon}
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Service
                </ServiceButton>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </motion.div>
      </div>
    </Section>
  );
};

export default Services;
