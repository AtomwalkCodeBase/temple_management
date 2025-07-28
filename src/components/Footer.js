"use client"
import styled from "styled-components"
import { motion } from "framer-motion"

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.text}, #1a1a1a);
  color: white;
  padding: 3rem 0 1rem;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const FooterSection = styled(motion.div)`
  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  p, a {
    color: #cccccc;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.gold};
    transform: translateY(-2px);
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 2rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const OmSymbol = styled(motion.div)`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.gold};
  text-align: center;
  margin-bottom: 1rem;
`

const Copyright = styled.p`
  color: #999;
  font-size: 0.9rem;
`

const Footer = () => {
  const footerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <FooterContainer>
      <div className="container">
        <OmSymbol
          animate={{
            textShadow: ["0 0 10px #DAA520", "0 0 30px #DAA520", "0 0 10px #DAA520"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          ॐ
        </OmSymbol>

        <FooterContent>
          <FooterSection variants={footerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3>DevotionHub</h3>
            <p>
              Your spiritual companion for divine blessings, temple visits, and sacred experiences. Connect with the
              divine from anywhere in the world.
            </p>
            <SocialLinks>
              <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                📘
              </SocialLink>
              <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                📷
              </SocialLink>
              <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                🐦
              </SocialLink>
              <SocialLink href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                📺
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <br />
            <a href="/temples">Temples</a>
            <br />
            <a href="/book-puja">Book Puja</a>
            <br />
            <a href="/live-darshan">Live Darshan</a>
            <br />
            <a href="/shop">Shop</a>
            <br />
            <a href="/bhajans">Bhajans</a>
          </FooterSection>

          <FooterSection
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3>Services</h3>
            <a href="#">Online Puja Booking</a>
            <br />
            <a href="#">Prasad Delivery</a>
            <br />
            <a href="#">Live Temple Darshan</a>
            <br />
            <a href="#">Astrology Consultation</a>
            <br />
            <a href="#">Spiritual Guidance</a>
            <br />
            <a href="#">Festival Celebrations</a>
          </FooterSection>

          <FooterSection
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h3>Contact Us</h3>
            <p>📧 info@devotionhub.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 123 Temple Street, Sacred City, India</p>
            <p>🕐 24/7 Customer Support</p>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>© 2024 DevotionHub. All rights reserved. Made with 🙏 for devotees worldwide.</Copyright>
          <div>
            <a href="#" style={{ color: "#999", marginRight: "1rem" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: "#999", marginRight: "1rem" }}>
              Terms of Service
            </a>
            <a href="#" style={{ color: "#999" }}>
              Support
            </a>
          </div>
        </FooterBottom>
      </div>
    </FooterContainer>
  )
}

export default Footer
