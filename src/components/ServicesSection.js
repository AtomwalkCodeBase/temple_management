import { useRef } from "react";
import styled from "styled-components";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Shield, Lightbulb, BookOpen, BarChart3, FileText, Globe } from "lucide-react";

const ServicesContainer = styled.section`
  padding: 8rem 5%;
  background: linear-gradient(135deg, #fcfcfd 0%, #f8f9fb 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 10% 20%, rgba(0, 71, 171, 0.03) 0%, transparent 40%),
                      radial-gradient(circle at 90% 80%, rgba(3, 6, 17, 0.03) 0%, transparent 40%);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  color: #667085;
  max-width: 700px;
  margin: 0 auto 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Divider = styled(motion.div)`
  height: 5px;
  width: 100px;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 60%, #FF4500 100%);
  margin: 0 auto 2rem;
  border-radius: 20px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(234, 236, 240, 0.8);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background:  linear-gradient(90deg, #0047AB 0%, #4169E1 60%, #FF4500 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 50px rgba(0, 71, 171, 0.1);
    
    &::before {
      transform: scaleX(1);
    }
    
    ${props => props.$hoverAnimation && `
      .icon-wrapper {
        transform: translateY(-10px) scale(1.1);
        background: linear-gradient(135deg, #cce5ff 0%, #e6f0ff 100%);
      }
    `}
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #e6f0ff 0%, #f0f7ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
  transition: all 0.4s ease;
  box-shadow: 0 10px 20px rgba(0, 71, 171, 0.05);
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(0, 71, 171, 0.08);
    bottom: -5px;
    right: -5px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0047AB;
  position: relative;
  display: inline-block;
`;

const ServiceDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4A5568;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(0, 71, 171, 0.05) 100%);
  border-radius: 50%;
  z-index: 0;
`;

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1] 
      },
    },
  };

  const services = [
    {
      icon: <Shield size={36} color="#0047AB" />,
      title: "IP Protection",
      description:
        "We help you protect your intellectual property through patents, trademarks, copyrights, and trade secrets.",
    },
    {
      icon: <Lightbulb size={36} color="#0047AB" />,
      title: "Innovation Strategy",
      description:
        "Develop comprehensive innovation strategies aligned with your business goals and market opportunities.",
    },
    {
      icon: <BookOpen size={36} color="#0047AB" />,
      title: "IP Portfolio Management",
      description: "Manage and optimize your IP portfolio to maximize value and strategic advantage in the market.",
    },
    {
      icon: <BarChart3 size={36} color="#0047AB" />,
      title: "Market Analysis",
      description:
        "In-depth market analysis to identify opportunities, threats, and competitive positioning for your innovations.",
    },
    {
      icon: <FileText size={36} color="#0047AB" />,
      title: "Patent Drafting",
      description: "Expert patent drafting services to ensure comprehensive protection for your inventions.",
    },
    {
      icon: <Globe size={36} color="#0047AB" />,
      title: "Global IP Strategy",
      description: "Navigate international IP laws and develop global protection strategies for your innovations.",
    },
  ];

  return (
    <ServicesContainer id="services" ref={ref}>
      <FloatingShape 
        style={{
          width: 200,
          height: 200,
          top: "10%",
          right: "5%",
          opacity: 0.5,
          y,
        }}
      />
      <FloatingShape 
        style={{
          width: 300,
          height: 300,
          bottom: "15%",
          left: "2%",
          opacity: 0.3,
          y: useTransform(scrollYProgress, [0, 1], [-30, 30]),
        }}
      />
      
      <ContentWrapper>
        <motion.div 
          style={{ opacity }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <SectionTitle variants={titleVariants}>
            Our Services
          </SectionTitle>
          <Divider
            initial={{ width: 0 }}
            animate={isInView ? { width: 100 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <SectionSubtitle variants={titleVariants}>
            Comprehensive solutions to protect and maximize the value of your intellectual property
          </SectionSubtitle>
          <ServicesGrid
            as={motion.div}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                variants={itemVariants} 
                whileHover={{ scale: 1.03 }}
                $hoverAnimation={true}
              >
                <IconWrapper className="icon-wrapper">{service.icon}</IconWrapper>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </motion.div>
      </ContentWrapper>
    </ServicesContainer>
  );
}