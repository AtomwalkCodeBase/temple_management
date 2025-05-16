import { useRef, useState } from "react"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"
import shantha from "../assets/img/shantha.png"
import Lipika from "../assets/img/ lipika2.png"
import syamanand from "../assets/img/syamanand.png"
import Jagannath from "../assets/img/mr.png"
import img_3 from "../assets/img/img_3.jpg"
import img_4 from "../assets/img/img_4.jpg"
import img_5 from "../assets/img/img_5.jpg"
import Bharat from "../assets/img/Bharat.jpg"
import prasanti from "../assets/img/Prashanthi.jpg"
import HR from "../assets/img/freepik__enhance__57693.png"
import Samartha from "../assets/img/Samartha.jpg"

const TeamContainer = styled.section`
  padding: 4rem 5%;
  background-color: white;
  max-width: 1200px;
  margin: 0 auto;
`

const MemberCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 71, 171, 0.1);
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 71, 171, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 71, 171, 0.15);
  }
`

const MemberImage = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  
  @media (min-width: 768px) {
    width: 300px;
    height: 300px;
    flex-shrink: 0;
  }

  img {
    width: 100%;
    // height: 90%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`

const MemberInfo = styled.div`
  padding: 2rem;
  flex-grow: 1;
`

const MemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0047AB;
`

const MemberRole = styled.p`
  font-size: 1.1rem;
  color: #FF4500;
  margin-bottom: 1.5rem;
  font-weight: 600;
`

const MemberBio = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, #0047AB 0%, #4169E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Divider = styled(motion.div)`
  height: 4px;
  width: 80px;
  background: linear-gradient(90deg, #0047AB 0%, #FF4500 100%);
  margin: 1rem auto 3rem;
  border-radius: 2px;
`

const TeamDescription = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  font-weight: 500;
`

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const team = [
    {
      name: "Dr. Lipika Sahoo",
      role: "Founder & CEO",
      bio: "Founder and CEO of LifeIntelect, is a registered Indian Patent and Trademark Attorney with over two decades of experience spanning academia, industry, and management consulting in the domains of technology, innovation, and intellectual property. She holds a Ph.D. from the Indian Institute of Science (IISc) and LLB from KSLU. She holds triple masters; MSc from Sambalpur University, Odisha; PGDIPR from National Law School of India University (NLSIU), Bangalore; PGCBM from Xavier Institute of management (XIMB), Bhubaneswar, alongside advanced Certifications from World Intellectual Property Organization (WIPO).",
      image: Lipika,
    },
    {
      name: "Mr Bharat Kishore Sahoo",
      role: "Co-founder & Director",
      bio: "Mr. Bharath Sahoo is the Co-Founder and Director of LifeIntelect Consultancy Pvt. Ltd., bringing over five decades of senior leadership experience in planning, project execution, and public utilities. A civil engineering graduate from Sambalpur University and a Master's degree holder from the Indian Institute of Science (IISc), Bangalore, he served the Government of Odisha in various capacities, ultimately retiring as Chief Engineer (Public Health). His expertise spans large-scale water supply, sewerage, and sanitation projects, including strategic planning, implementation, and governance.",
      image: Bharat,
    },
    {
      name: "Dr. T. Bhavani",
      role: "Technical and IP Specialist",
      bio: "Dr. T. Bhavani is a Technical and IP Specialist at LifeIntelect Consultancy Pvt. Ltd., with extensive expertise in chemistry and intellectual property. She holds a Ph.D. in Chemistry from IICT-Hyderabad, a PGDIPRL from NLSIU-Bangalore, and an M.Sc. in Analytical Chemistry. A qualified Indian Patent Agent (IN/PA-1295), Dr. Bhavani has over 5 research publications in leading journals. Since becoming part of LifeIntelect in 2017, she has been instrumental in assisting clients with navigating the complexities of intellectual property management.",
      image: img_5,
    },
    {
      name: "Dr. M R Jagganath",
      role: "Technology & Innovation Leader",
      bio: "Dr. Jagannath is an accomplished scientific leader with a strong track record in drug discovery and healthcare innovation. As the former Chief Scientific Officer at Connexios Life Sciences, he led multidisciplinary teams in developing novel therapeutics for chronic diseases such as type 2 diabetes. He holds a PhD from the Indian Institute of Science and has published extensively across diverse scientific domains. With a background spanning agriculture, microbiology, finance, and startup advisory.",
      image: "https://home.atomwalk.com/static/media/sk2.7c9fc7c4395d941a8f1bcca5c65f2b7c.svg",
    },
    {
      name: "Dr. K. Prashanthi",
      role: "Technical Specialist",
      bio: "Dr. K. Prashanthi is a seasoned researcher with deep expertise in virology, systems biology, and cancer biology. She holds a Ph.D. from the Indian Institute of Science and has led advanced research in host-pathogen interactions and therapeutic target discovery. With a strong publication record in high-impact journals, she brings rigorous scientific insight to innovation and technology assessment. Her contributions are recognized through prestigious fellowships and leadership roles in national scientific associations.",
      image: prasanti,
    },
    {
      name: "Jayanthi S Vel",
      role: "Human Resources Officer (HRO)",
      bio: "Ms. Jayanthi is an accomplished human resource professional responsible for leading and shaping the organization's people strategy. She manages a broad spectrum of HR functions, including talent sourcing, employee relations, learning and development, compensation planning, and organizational design. Her work ensures that HR initiatives are effectively aligned with business goals. She is also instrumental in designing performance management frameworks, defining Key Performance Indicators (KPIs).",
      image: HR,
    },
    {
      name: "Dr. Syam Anand",
      role: "Technical Specialist and US Patent Agent",
      bio: "is a Technical Specialist and US Patent Agent with over 20 years of expertise in molecular biology, biochemistry, and intellectual property. He specializes in patent drafting, prosecution, and strategy, focusing on life sciences and biotechnology innovations. Dr. Anand provides strategic guidance on patent portfolio development, helping clients secure and protect their intellectual property. His deep scientific knowledge and understanding of IP law enable him to effectively navigate complex patent issues.",
      image: syamanand,
    },
    {
      name: "Samartha Srinivasa",
      role: "Legal Expert",
      bio: "Mr. Samartha Srinivasa is a skilled legal professional with deep expertise in intellectual property, international trade law, and regulatory compliance. He holds an L.L.B. from Bangalore University and an L.L.M. in International Trade Law from the University of Essex, UK. At LifeIntelect, Mr. Srinivasa provides expert legal advice on intellectual property, contract law, and regulatory strategy, helping clients navigate global legal complexities. His expertise ensures practical, legally sound solutions for startups.",
      image: Samartha,
    },
  ]

  return (
    <TeamContainer id="team" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        OUR TEAM
      </SectionTitle>
      
      <Divider
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : { width: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      <TeamDescription
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        LifeIntelect excels in knowledge processes, guided by a skilled team of PhDs, experts, and patent agents. Our diverse professionals—patent attorneys, innovation strategists, and IP specialists—bring decades of expertise to your challenges. Meet the team dedicated to protecting and maximizing your innovations.
      </TeamDescription>

      <div>
        {team.map((member, index) => (
          <MemberCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <MemberImage>
              <img src={member.image} alt={member.name} loading="lazy" />
            </MemberImage>
            <MemberInfo>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
            </MemberInfo>
          </MemberCard>
        ))}
      </div>
    </TeamContainer>
  )
}