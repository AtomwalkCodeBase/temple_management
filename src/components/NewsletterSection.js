"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const NewsletterContainer = styled.section`
  padding: 6rem 0;
  background: ${(props) => props.theme.colors.gradient.temple};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 70%,
        rgba(255, 255, 255, 0.1),
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 30%,
        rgba(255, 255, 255, 0.05),
        transparent 50%
      );
  }
`;

const NewsletterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const NewsletterTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: ${(props) => props.theme.fonts.heading};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const NewsletterSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const NewsletterForm = styled(motion.form)`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 1rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    border-radius: 25px;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }

  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const NewsletterButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${(props) => props.theme.colors.gradient.primary};
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    border-radius: 15px;
  }
`;

const FloatingLotus = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  opacity: 0.3;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
`;

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <NewsletterContainer>
      {/* Floating Lotus Elements */}
      <FloatingLotus
        style={{ top: "20%", left: "10%" }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        🪷
      </FloatingLotus>

      <FloatingLotus
        style={{ bottom: "20%", right: "10%" }}
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        🕉️
      </FloatingLotus>

      <NewsletterContent>
        <NewsletterTitle
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Stay Connected with Divine
        </NewsletterTitle>

        <NewsletterSubtitle
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Subscribe to receive spiritual insights, festival updates, and
          exclusive temple offerings directly in your inbox
        </NewsletterSubtitle>

        <NewsletterForm
          onSubmit={handleSubmit}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {!isSubmitted ? (
            <>
              <NewsletterInput
                type="email"
                placeholder="Enter your email for divine blessings"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <NewsletterButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🙏 Subscribe
              </NewsletterButton>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "600",
                padding: "1rem",
                textAlign: "center",
                width: "100%",
              }}
            >
              ✨ Thank you! Divine blessings are on their way! ✨
            </motion.div>
          )}
        </NewsletterForm>
      </NewsletterContent>
    </NewsletterContainer>
  );
};

export default NewsletterSection;
