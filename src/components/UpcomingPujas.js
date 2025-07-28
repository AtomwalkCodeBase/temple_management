"use client"
import styled from "styled-components"
import { motion } from "framer-motion"

const Section = styled.section`
  padding: 5rem 0;
  background: ${(props) => props.theme.colors.white};
  overflow: hidden;
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

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
  padding: 1rem 0;
  margin-bottom: 3rem;
`

const MarqueeContent = styled(motion.div)`
  display: flex;
  white-space: nowrap;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`

const MarqueeItem = styled.span`
  margin-right: 4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const PujasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const PujaCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.card};
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const PujaHeader = styled.div`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
  color: white;
  padding: 1.5rem;
  text-align: center;
`

const PujaDate = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const PujaMonth = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`

const PujaInfo = styled.div`
  padding: 1.5rem;
`

const PujaTitle = styled.h3`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`

const PujaTemple = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 1rem;
  font-weight: 500;
`

const PujaDescription = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`

const PujaPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
`

const BookButton = styled.button`
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.gold};
    transform: translateY(-2px);
  }
`

const UpcomingPujas = () => {
  const marqueeItems = [
    "🎉 Diwali Special Puja - Book Now",
    "🌸 Navratri Celebrations Starting Soon",
    "🙏 Ganesh Chaturthi Live Darshan Available",
    "⭐ Special Discount on Puja Bookings",
    "🎵 New Bhajan Collection Added",
  ]

  const pujas = [
    {
      id: 1,
      title: "Maha Aarti",
      temple: "Jagannath Temple, Puri",
      date: "15",
      month: "Nov",
      description: "Grand evening aarti with traditional rituals and divine blessings.",
      price: "₹501",
    },
    {
      id: 2,
      title: "Rudrabhishek",
      temple: "Kedarnath Temple",
      date: "18",
      month: "Nov",
      description: "Sacred abhishek of Lord Shiva with milk, honey, and holy water.",
      price: "₹1001",
    },
    {
      id: 3,
      title: "Lakshmi Puja",
      temple: "Golden Temple, Amritsar",
      date: "22",
      month: "Nov",
      description: "Special puja for prosperity and wealth with traditional offerings.",
      price: "₹751",
    },
    {
      id: 4,
      title: "Hanuman Chalisa",
      temple: "Meenakshi Temple, Madurai",
      date: "25",
      month: "Nov",
      description: "108 times recitation of Hanuman Chalisa for strength and protection.",
      price: "₹301",
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

  return (
    <Section>
      <div className="container">
        <SectionTitle
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Upcoming Pujas
        </SectionTitle>

        <MarqueeContainer>
          <MarqueeContent
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <MarqueeItem key={index}>{item}</MarqueeItem>
            ))}
          </MarqueeContent>
        </MarqueeContainer>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <PujasGrid>
            {pujas.map((puja) => (
              <PujaCard key={puja.id} variants={cardVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <PujaHeader>
                  <PujaDate>{puja.date}</PujaDate>
                  <PujaMonth>{puja.month}</PujaMonth>
                </PujaHeader>
                <PujaInfo>
                  <PujaTitle>{puja.title}</PujaTitle>
                  <PujaTemple>📍 {puja.temple}</PujaTemple>
                  <PujaDescription>{puja.description}</PujaDescription>
                  <PujaPrice>
                    <Price>{puja.price}</Price>
                  </PujaPrice>
                  <BookButton>Book Now</BookButton>
                </PujaInfo>
              </PujaCard>
            ))}
          </PujasGrid>
        </motion.div>
      </div>
    </Section>
  )
}

export default UpcomingPujas
