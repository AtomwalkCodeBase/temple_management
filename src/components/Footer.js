"use client"
import styled from "styled-components"
import { motion } from "framer-motion"
import footerTree from '../assets/img/footer_01.png';
import footerTemple from '../assets/img/footer_02.png';
import testimonialBg from '../assets/img/testimonial_01.png';

const FooterContainer = styled.footer`
  background-image: url(${testimonialBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: #EDEDED;
  padding: 0;
  overflow: hidden;
  min-height: 600px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.82);
    z-index: 1;
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 60px 0;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 80px;
`;

const BrandSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
`;

const Logo = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #FFFFFF;
  margin: 0;
  
  span {
    color: #F59E0B;
  }
`;

const Tagline = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #F3F4F6;
  max-width: 280px;
  line-height: 1.5;
  margin: 0;
`;

const NewsletterSection = styled.div`
  text-align: right;
`;

const NewsletterTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #FFFFFF;
  margin-bottom: 20px;
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NewsletterInput = styled.input`
  padding: 15px 20px;
  border-radius: 30px;
  border: none;
  width: 300px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  background-color: #FFFFFF;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #F59E0B;
  }
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6A00, #FF8C00);
  border: none;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 106, 0, 0.3);
  }
`;

const LinksSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  margin-bottom: 80px;
`;

const LinksColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #FFFFFF;
  margin-bottom: 20px;
`;

const LinkItem = styled.a`
  display: block;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #F3F4F6;
  margin-bottom: 12px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #F59E0B;
  }
`;

const FooterBottomBar = styled.div`
  background: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0;
  position: relative;
  z-index: 4;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid rgba(255,255,255,0.2);
  margin-top: 0;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 12px;
    padding: 20px 0 0 0;
  }
`;

const FooterBottomItem = styled.span`
  font-family: 'Inter', 'Roboto', 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #f3f4f6;
  margin: 0 12px;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #f59e0b;
  }

  @media (max-width: 700px) {
    font-size: 14px;
    margin: 0 6px;
  }
`;

const TreeImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
  z-index: 3;
  opacity: 0.8;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TempleImg = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 300px;
  z-index: 3;
  opacity: 0.8;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <TreeImg src={footerTemple} alt="Small Temple Illustration" />
      <TempleImg src={footerTree} alt="Big Temple Illustration" />
      <FooterContent>
        <TopSection>
          <BrandSection>
            <Logo>TEMPLE<span>NAME</span></Logo>
            <Tagline>Because we take you to the most peaceful and divine places.</Tagline>
          </BrandSection>

          <NewsletterSection>
            <NewsletterTitle>Get Updates</NewsletterTitle>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Enter your email..." />
              <SubmitButton type="submit">→</SubmitButton>
            </NewsletterForm>
          </NewsletterSection>
        </TopSection>

        <LinksSection>
          <LinksColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <LinkItem href="#">Why Temple?</LinkItem>
            <LinkItem href="#">Articles</LinkItem>
            <LinkItem href="#">Shop</LinkItem>
            <LinkItem href="#">Bookings</LinkItem>
          </LinksColumn>

          <LinksColumn>
            <ColumnTitle>Company</ColumnTitle>
            <LinkItem href="#">About us</LinkItem>
            <LinkItem href="#">Gallery</LinkItem>
            <LinkItem href="#">Temple List</LinkItem>
            <LinkItem href="#">Contact Us</LinkItem>
          </LinksColumn>

          <LinksColumn>
            <ColumnTitle>Get latens</ColumnTitle>
            <LinkItem href="#">Facebook</LinkItem>
            <LinkItem href="#">Twitter</LinkItem>
            <LinkItem href="#">LinkedIn</LinkItem>
            <LinkItem href="#">YouTube</LinkItem>
          </LinksColumn>

          <LinksColumn>
            <ColumnTitle>Social</ColumnTitle>
            <LinkItem href="#">Facebook</LinkItem>
            <LinkItem href="#">Twitter</LinkItem>
            <LinkItem href="#">LinkedIn</LinkItem>
            <LinkItem href="#">YouTube</LinkItem>
          </LinksColumn>
        </LinksSection>
        <FooterBottomBar>
          <FooterBottomItem>© 2024 Temple</FooterBottomItem>
          <FooterBottomItem>Support</FooterBottomItem>
          <FooterBottomItem>Privacy Policy</FooterBottomItem>
          <FooterBottomItem>Terms of Use</FooterBottomItem>
          <FooterBottomItem>Cookie Policy</FooterBottomItem>
          <FooterBottomItem>Cookie Policy</FooterBottomItem>
        </FooterBottomBar>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer