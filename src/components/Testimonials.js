"use client"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import testimonialImage from "../assets/img/testimonial_01.png"

const Section = styled.section`
  width: 100%;
  height: 88vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${testimonialImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 153, 51, 0.3), rgba(255, 193, 7, 0.2));
    z-index: 1;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  text-align: center;
`

const Title = styled(motion.h2)`
  font-family: 'Lora', serif;
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
  text-align: center;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: white;
    margin: 1rem auto;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 380px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TestimonialCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9933, #ffcc33);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }
`

const ProfileName = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.25rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const ProfileLocation = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  opacity: 0.7;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`

const Rating = styled.div`
  text-align: center;
  
  .stars {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  
  .label {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    opacity: 0.8;
  }
`

const ReviewText = styled.p`
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  font-size: 1rem;
  font-style: italic;
  max-width: 600px;
  margin: 0.5rem 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
    padding: 0;
  }
`

const NavigationContainer = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 10;
  
  @media (min-width: 768px) {
    width: calc(100% - 100px);
    left: 50px;
  }
`

const NavigationButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ffc464ff;
  border: 2px solid white;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: #ff8c1a;
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, India",
      text: "The live darshan feature is absolutely amazing! I could participate in the morning aarti at Tirupati from my home. The video quality is excellent and the experience felt so divine.",
      avatar: "PS",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      text: "Booking puja online was so convenient. The priests performed the ritual with complete devotion and I received the prasad within 3 days. Highly recommended service!",
      avatar: "RK",
    },
    {
      id: 3,
      name: "Meera Patel",
      location: "Ahmedabad, Gujarat",
      text: "The bhajan collection is soul-stirring. I listen to them during my daily prayers and meditation. The quality of audio and the selection of bhajans is outstanding.",
      avatar: "MP",
    },
    {
      id: 4,
      name: "Suresh Reddy",
      location: "Hyderabad, Telangana",
      text: "As someone living abroad, this platform helps me stay connected to my roots. The astrology consultation was very insightful and accurate. Thank you for this wonderful service.",
      avatar: "SR",
    },
    {
      id: 5,
      name: "Kavita Singh",
      location: "Jaipur, Rajasthan",
      text: "The prasad delivery service is exceptional. Everything was packed beautifully and reached in perfect condition. It truly felt like receiving blessings directly from the temple.",
      avatar: "KS",
    },
    {
      id: 6,
      name: "Amit Gupta",
      location: "Kolkata, West Bengal",
      text: "The spiritual blogs section is very informative. I've learned so much about different festivals and their significance. The content is well-researched and beautifully written.",
      avatar: "AG",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = () => {
    return "★★★★★"
  }

  const cardVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0
    }
  }

  return (
    <Section>
      <Content>
        <Title
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our Devotees Say
        </Title>
        
        <Subtitle
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Hear from our users about their spiritual experiences and how our platform has enriched their lives
        </Subtitle>

        <CardContainer>
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={currentIndex}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <CardContent>
                <ProfileSection>
                  <ProfileImage>{testimonials[currentIndex].avatar}</ProfileImage>
                  <ProfileName>{testimonials[currentIndex].name}</ProfileName>
                  <ProfileLocation>{testimonials[currentIndex].location}</ProfileLocation>
                </ProfileSection>
                
                <RatingSection>
                  <Rating>
                    <div className="stars">{renderStars()}</div>
                    <div className="label">Rating</div>
                  </Rating>
                </RatingSection>
                
                <ReviewText>{testimonials[currentIndex].text}</ReviewText>
              </CardContent>
            </TestimonialCard>
          </AnimatePresence>
        </CardContainer>

        <NavigationContainer>
          <NavigationButton onClick={prevSlide}>
            ←
          </NavigationButton>
          
          <NavigationButton onClick={nextSlide}>
            →
          </NavigationButton>
        </NavigationContainer>
      </Content>
    </Section>
  )
}

export default Testimonials