import styled from "styled-components"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import companyimage from "../assets/img/company_logo.png"
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
            LifeIntelect is a Bangalore based technology and intellectual property consulting firm helping businesses
            protect their innovations and achieve their strategic goals.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Facebook size={18} />
            </SocialLink>
            <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Twitter size={18} />
            </SocialLink>
            <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Linkedin size={18} />
            </SocialLink>
            <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Instagram size={18} />
            </SocialLink>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Quick Links</ColumnTitle>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/aboutus.html">About Us</FooterLink>
          <FooterLink href="/services.html">Services</FooterLink>
          <FooterLink href="#team">Our Team</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="/contact.html">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Our Services</ColumnTitle>
          <FooterLink href="#">IP Protection</FooterLink>
          <FooterLink href="#">Innovation Strategy</FooterLink>
          <FooterLink href="#">IP Portfolio Management</FooterLink>
          <FooterLink href="#">Market Analysis</FooterLink>
          <FooterLink href="#">Patent Drafting</FooterLink>
          <FooterLink href="#">Global IP Strategy</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Contact Us</ColumnTitle>
          <ContactItem>
            <ContactIcon>
              <MapPin size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>123 Innovation Street, Bangalore, Karnataka, India</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <Phone size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>+91 1234567890</ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <Mail size={18} color="#FF4500" />
            </ContactIcon>
            <ContactText>info@lifeintelect.com</ContactText>
          </ContactItem>
        </FooterColumn>
      </FooterContent>

      <Divider />
      <Copyright>© {new Date().getFullYear()} LifeIntelect. All rights reserved.</Copyright>
    </FooterContainer>
  )
}

