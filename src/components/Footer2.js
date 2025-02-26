import React from "react";
import styled from "styled-components";
import logo from "../assets/img/Lifeintelect.png";
import Email from "../assets/img/email.png";
import Phone from "../assets/img/telephone-call.png";
// import Footer from "../assets/img/Footer-1.jpg";
import Footer from "../assets/img/footer-bg.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
const FooterContainer = styled.footer`
 background-color: rgb(13, 11, 62); /* Dark background color */
  /* background-image: url(${Footer}); */
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #ffffff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterLeft = styled.div`
  flex: 1;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  h1 {
    font-size: 2em;
    margin-left: 35px;
    color: #ffffff;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }

  div {
    margin: 10px 20px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: 500;
    cursor:pointer;
    display:flex ;
  }
img{
  width: 20px;
  margin-right: 10px;
}
`;

const FooterLinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const FooterLinks = styled.div`
  margin: 10px 20px;

  h3 {
    font-size: 1.2em;
    margin-bottom: 15px;
    color: #ffffff;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 8px 0;
      font-size: 1em;
      color: #a7a9ac;

      a {
        color: #a7a9ac;
        text-decoration: none;

        &:hover {
          color: #55e6a5;
        }
      }
    }
  }
`;

const FooterBottom = styled.div`
  /* margin-top: 20px; */
  font-size: 0.8em;
  text-align: center;
  background-color: rgb(13, 11, 62);

  @media (min-width: 768px) {
    /* margin-top: 20px; */
    text-align: center;
  }

  span {
    color: #55e6a5;
  }
`;
// Main Container
const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(13, 11, 62);
  padding: 20px;
  color: white;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    /* padding: 40px; */
  }
`;

// Logo Container
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    display: none;
  }

  img {
    /* height: 100px; */
    margin-right: 15px;
    width: 150px;
  }
`;

// Text Container
const TextContainer = styled.div`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
    max-width: 209px;
  }
`;

// Form Container
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

// Input Field
const InputField = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80%;
  max-width: 300px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
    width: 250px;
  }
`;

// Submit Button
const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ea5c49;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #d04b38;
  }
`;

// Disclaimer Text
const DisclaimerText = styled.p`
  margin-top: 10px;
  font-size: 0.8em;
  color: #ccc;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    margin-top: 0;
  }

  a {
    color: #ccc;
    text-decoration: underline;

    &:hover {
      color: white;
    }
  }
`;

export default function Footer2() {
  return (
    <>
    
    <FooterContainer>
      <FooterLeft>
      <NewsletterContainer>
      <LogoContainer>
        <img src={logo} alt="AtomWalk Logo" />
      </LogoContainer>
      
      <TextContainer>
        Stay up-to-date with AtomWalk Newsletter!
      </TextContainer>
      
      <FormContainer>
        <InputField type="email" placeholder="Email*" required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>

    </NewsletterContainer>
    <ContactInfo>
        <div> <img src={Email} alt="AtomWalk Logo" />info@atomwalk.com</div>
        <div><img src={Phone} alt="AtomWalk Logo" />+91-7259555003</div>
      </ContactInfo>
    {/* <DisclaimerText>
        By providing your information, you hereby consent to the AtomWalk <a href="#">Cookie Policy</a> and <a href="#">Privacy Policy</a>.
      </DisclaimerText> */}
      </FooterLeft>



      <FooterLinksContainer>
        <FooterLinks>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/aboutUs.html">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="/contactUs.html">Contact Us</a>
            </li>
          </ul>
        </FooterLinks>

        <FooterLinks>
          <h3>Services</h3>
          <ul>
            <li>
              <a href="#webdev">Manufacturing Business</a>
            </li>
            <li>
              <a href="#appdev">Consultancy Business</a>
            </li>
            <li>
              <a href="#maintenance">Chemical Industry</a>
            </li>
            <li>
              <a href="#marketing">Lab Management</a>
            </li>
          </ul>
        </FooterLinks>
        <FooterLinks>
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="/Blog.html">Blog</a>
            </li>
            <li>
              <a href="#appdev">Support</a>
            </li>
            <li>
              <a href="#maintenance">Tutorials</a>
            </li>
            <li>
              <a href="#marketing">FAQs</a>
            </li>
          </ul>
        </FooterLinks>
      </FooterLinksContainer>
    </FooterContainer>
    <FooterBottom>
      <div style={{padding:"25px"}}>
        <p>© 2024 Atomwalk. All Rights Reserved.</p>
        <p>
          Privacy Policy | Terms & Conditions | Made with <span>♥</span> Atomwalk
        </p>
        <div className="social-icon">
              <a href="https://www.linkedin.com/company/atomwalk-technologies/"><img src={navIcon1} alt="Icon" /></a>
              <a href="#"><img src={navIcon2} alt="Icon" /></a>
              <a href="#"><img src={navIcon3} alt="Icon" /></a>
            </div>
            </div>
      </FooterBottom>
      </>
  );
}
