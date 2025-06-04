import styled from "styled-components"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import companyimage from "../assets/img/company_logo.png"
import { FaCalendarCheck } from 'react-icons/fa';
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0a2342 0%, #0047AB 100%);
  color: white;
  padding: 5rem 5% 2rem;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 0.5rem;
  background: linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const FooterDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e0e0e0;
  margin-bottom: 1.5rem;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #FF4500;
  }
`

const ColumnTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: #FF4500;
  }
`

const FooterLink = styled.a`
  color: #e0e0e0;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    color: #FF4500;
    transform: translateX(5px);
  }
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const ContactIcon = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContactText = styled.p`
  font-size: 0.95rem;
  color: #e0e0e0;
`

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`

const Copyright = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #e0e0e0;
`

export default function Footer2() {
  return (
    <FooterContainer id="contact">
      <FooterContent>
        <FooterColumn>
          <Logo>
            {/* <img src={companyimage} alt="LifeIntelect Logo" width={40} height={40} /> */}
            <LogoText>LifeIntelect</LogoText>
          </Logo>
          <FooterDescription>
            LifeIntelect Consultancy Pvt. Ltd. is a trusted technolegal firm at the forefront of Intellectual Property (IP) rights, technology commercialization, strategic business consulting, and regulatory compliance.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/Lifeintelect" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Facebook size={18} />
            </SocialLink>
            <SocialLink href="https://x.com/Lifeintelect" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Twitter size={18} />
            </SocialLink>
            <SocialLink href="http://www.linkedin.com/company/lifeintelect-consultancy-pvt-ltd-?trk=top_nav_home" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Linkedin size={18} />
            </SocialLink>
            <SocialLink href="http://instagram.com/lifeintelect_consultancy/" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Instagram size={18} />
            </SocialLink>
            <SocialLink href="https://youtube.com/@lifeintelect_13?feature=shared" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Youtube size={18} />
            </SocialLink>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Quick Links</ColumnTitle>
          {/* <FooterLink href="/careers">Careers</FooterLink> */}
          <FooterLink href="/about">About Us</FooterLink>
          {/* <FooterLink href="/services.html">Services</FooterLink> */}
          <FooterLink href="/about#team">Our Team</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Our Services</ColumnTitle>
          <FooterLink href="/patent">IP Solutions</FooterLink>
          <FooterLink href="/ip-audit">IP Lifecycle Management</FooterLink>
          <FooterLink href="/Scientific-&-Technology-Solutions">Scientific & Technology Solutions</FooterLink>
          <FooterLink href="/ip-strategy-development">Strategic & Legal Advisory</FooterLink>
          <FooterLink href="/IP-Strategy-&-Roadmap-for-Startups">IPR Solutions for Startups</FooterLink>
          <FooterLink href="/Custom-IP-Workshops-for-Teams">IP education and training</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Contact Us</ColumnTitle>
          <ContactItem>
            <ContactIcon>
              <MapPin size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>Gopalan Millennium Tower, 1st Floor, No 133,
              ITPL Main Road, Kundalahalli, Brookefield,
              Bengaluru, Karnataka 560037</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <Phone size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>+(91)-9591600666</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <Mail size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>info@lifeintelect.com</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <FaCalendarCheck  size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>Meeting by Appointment Only</ContactText>
          </ContactItem>
        </FooterColumn>
      </FooterContent>

      <Divider />
      <Copyright>© {new Date().getFullYear()} LifeIntelect. All rights reserved.</Copyright>
      <Copyright style={{ marginTop: "10px", cursor: "pointer" }} onClick={() => window.location.href = "/terms"}>Privacy Policy | Terms & Conditions | Disclaimer | Made with ♥ LifeIntelect</Copyright>
    </FooterContainer>
  )
}

