import { useRef } from "react"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"
import shantha from "../assets/img/shantha.png"
import syamanand from "../assets/img/syamanand.png"
import img_3 from "../assets/img/img_3.jpg"
import img_4 from "../assets/img/img_4.jpg"
import img_5 from "../assets/img/img_5.jpg"
import { Linkedin, Twitter, Mail } from "lucide-react"

const TeamContainer = styled.section`
  /* padding: 6rem 5%; */
  background-color: white;
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Divider = styled(motion.div)`
  height: 4px;
  width: 80px;
  background: linear-gradient(90deg, #0047AB 0%, #FF4500 100%);
  margin: 0 auto 3rem;
  border-radius: 2px;
`

const TeamDescription = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.1rem;
  line-height: 1.8;
  font-weight: 600;
  color: #454545;
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const MemberCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 71, 171, 0.1);
  }
`

const ImageContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  overflow: hidden;
`

const MemberInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`

const MemberName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #0047AB;
`

const MemberRole = styled.p`
  font-size: 1rem;
  color: #FF4500;
  margin-bottom: 1rem;
`

const MemberBio = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0047AB;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #0047AB;
    color: white;
  }
`

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const team = [
    {
      name: "Dr. Lipika Sahoo",
      role: "Founder & CEO",
      bio: "Dr. Lipika Sahoo, Founder and CEO of Life Intellect, is a registered Indian Patent and Trademarks Agent with 16 years of experience in technology, innovation, and intellectual property.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Ymw-5cE07bTTFruRyanos0J-R7xziNdB_w&s",
    },
    {
      name: "Shantha Shankar",
      role: "Director and Chief Technology Officer",
      bio: "Dr. Shantha Shankar, Director and CTO of Life Intellect, is an expert in patent analytics, strategic IP management, and nanotechnology.",
      image: shantha,
    },
    {
      name: "Syam Anand",
      role: "Technical Specialist and US Patent Agent",
      bio: "Dr. Syam Anand, Technical Specialist and US Patent Agent, has over 20 years of expertise in molecular biology, biochemistry, and intellectual property.",
      image: syamanand,
    },
    {
      name: "Samartha Srinivasa",
      role: "Legal Expert",
      bio: "Mr. Samartha Srinivasa, Legal Expert, holds an L.L.B from Bangalore University and an L.L.M in International Trade Law from Essex University.",
      image: img_3,
    },
    {
      name: "K. Prashanthi",
      role: "Technical Specialist",
      bio: "Dr. K. Prashanthi, Technical Specialist, has over 16 years of experience in host-pathogen interactions, virology, and computational biology.",
      image: img_4,
    },
    {
      name: "T. Bhavani",
      role: "Technical and IP Specialist",
      bio: "Dr. T. Bhavani, Technical and IP Specialist, is a registered Indian Patent Agent with expertise in chemical, biotech, pharmaceutical, and software-related technologies.",
      image: img_5,
    },
  ]

  return (
    <TeamContainer id="team" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Our Team
      </SectionTitle>
      <Divider
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : { width: 0 }}
        transition={{ duration: 0.8 }}
      />

      <TeamDescription
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        LifeIntelect is proficient in knowledge processes and is managed by a seasoned team of PhDs, experts and Patent agents. Our professionals help you in establishing strategic research and business processes.
        As one of the leading technology and IP service companies in India, we offer services that are cost-effective and of highest quality standards. Our services help you grow and nurture your idea to global standards.

      </TeamDescription>

      <TeamGrid variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} as={motion.div}>
        {team.map((member, index) => (
          <MemberCard key={index} variants={itemVariants}>
            <ImageContainer>
              <img src={member.image || "/placeholder.svg"} alt={member.name} fill style={{ objectFit: "cover" }} />
            </ImageContainer>
            <MemberInfo>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
              <SocialLinks>
                <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Linkedin size={18} />
                </SocialLink>
                <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Twitter size={18} />
                </SocialLink>
                <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Mail size={18} />
                </SocialLink>
              </SocialLinks>
            </MemberInfo>
          </MemberCard>
        ))}
      </TeamGrid>
    </TeamContainer>
  )
}

