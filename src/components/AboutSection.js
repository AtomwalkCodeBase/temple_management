
import { useRef } from "react"
import styled from "styled-components"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const AboutContainer = styled.section`
  padding: 8rem 5%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
  position: relative;
`

const BackgroundElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(0, 71, 171, 0.05), rgba(65, 105, 225, 0.08));
  z-index: 1;
  
  &.circle1 {
    width: 40vw;
    height: 40vw;
    top: -15vw;
    left: -10vw;
  }
  
  &.circle2 {
    width: 25vw;
    height: 25vw;
    bottom: -10vw;
    right: -5vw;
  }
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const SectionHeader = styled.div`
  margin-bottom: 5rem;
  position: relative;
`

const SectionTag = styled(motion.span)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #0047AB;
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
`

const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 70%, #5E85FC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AboutText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.9;
  color: #444;
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 3px;
    background: linear-gradient(to bottom, #0047AB, #5E85FC);
    border-radius: 3px;
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0047AB, #FF4500);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 71, 171, 0.1);
    
    &::after {
      transform: scaleX(1);
    }
  }
`

const StatIcon = styled.div`
  margin-bottom: 1rem;
  color: #0047AB;
  font-size: 1.8rem;
`

const StatNumber = styled(motion.div)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #0047AB 0%, #FF4500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StatLabel = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export default function AboutSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  
  const statItems = [
    { number: "12+", label: "Years of Experience", icon: "🏆" },
    { number: "2500+", label: "Successful Projects", icon: "📊" },
    { number: "99.9%", label: "success rate", icon: "🎯" },
    { number: "500+", label: "Happy Clients", icon: "😊" }
  ]

  return (
    <AboutContainer id="about" ref={containerRef}>
      <BackgroundElement 
        className="circle1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ y: backgroundY }}
      />
      <BackgroundElement 
        className="circle2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      <ContentContainer>
        <SectionHeader>
          <SectionTag
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </SectionTag>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We Transform Ideas Into Intellectual Assets
          </SectionTitle>
        </SectionHeader>
      
        <ContentWrapper>
          <TextContent>
            <AboutText
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              LifeIntelect is a Bangalore based technology and intellectual property consulting firm. We help you protect
              your ideas and achieve your business goals with our in-depth understanding of the industry, relevant market,
              technological requirements and business implications of your innovation.
            </AboutText>
            <AboutText
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              We provide services maximizing the synergy among Technology, IP Law and Business which gives us the
              advantage to add value to every customer we work with. By systematically analyzing problems and providing
              solutions we enable generation of valuable intellectual property, be it an invention, a design, an
              algorithm, a brand or a creative work.
            </AboutText>
          </TextContent>
          
          <StatsContainer>
            {statItems.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + (index * 0.15),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.03 }}
              >
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + (index * 0.15) 
                  }}
                >
                  {stat.number}
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsContainer>
        </ContentWrapper>
      </ContentContainer>
    </AboutContainer>
  )
}