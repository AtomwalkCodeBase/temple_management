"use client"
import styled from "styled-components"
import { motion } from "framer-motion"

const Section = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.background}, rgba(255, 153, 51, 0.05));
`

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const TestimonialCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.white};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.shadows.card};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: ${(props) => props.theme.colors.primary};
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: 1;
  }
`

const TestimonialText = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  margin-top: 1rem;
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`

const AuthorInfo = styled.div``

const AuthorName = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.2rem;
`

const AuthorLocation = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.9rem;
`

const StarRating = styled.div`
  color: ${(props) => props.theme.colors.gold};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      text: "The live darshan feature is absolutely amazing! I could participate in the morning aarti at Tirupati from my home. The video quality is excellent and the experience felt so divine.",
      rating: 5,
      avatar: "PS",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      text: "Booking puja online was so convenient. The priests performed the ritual with complete devotion and I received the prasad within 3 days. Highly recommended service!",
      rating: 5,
      avatar: "RK",
    },
    {
      id: 3,
      name: "Meera Patel",
      location: "Ahmedabad, Gujarat",
      text: "The bhajan collection is soul-stirring. I listen to them during my daily prayers and meditation. The quality of audio and the selection of bhajans is outstanding.",
      rating: 5,
      avatar: "MP",
    },
    {
      id: 4,
      name: "Suresh Reddy",
      location: "Hyderabad, Telangana",
      text: "As someone living abroad, this platform helps me stay connected to my roots. The astrology consultation was very insightful and accurate. Thank you for this wonderful service.",
      rating: 5,
      avatar: "SR",
    },
    {
      id: 5,
      name: "Kavita Singh",
      location: "Jaipur, Rajasthan",
      text: "The prasad delivery service is exceptional. Everything was packed beautifully and reached in perfect condition. It truly felt like receiving blessings directly from the temple.",
      rating: 5,
      avatar: "KS",
    },
    {
      id: 6,
      name: "Amit Gupta",
      location: "Kolkata, West Bengal",
      text: "The spiritual blogs section is very informative. I've learned so much about different festivals and their significance. The content is well-researched and beautifully written.",
      rating: 5,
      avatar: "AG",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
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

  const renderStars = (rating) => {
    return "⭐".repeat(rating)
  }

  return (
    <Section>
      <div className="container">
        <SectionTitle
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Devotees Say
        </SectionTitle>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <TestimonialsGrid>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} variants={cardVariants} whileHover={{ scale: 1.02 }}>
                <StarRating>{renderStars(testimonial.rating)}</StarRating>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>{testimonial.avatar}</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorLocation>{testimonial.location}</AuthorLocation>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </motion.div>
      </div>
    </Section>
  )
}

export default Testimonials
