"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 8rem 0;
  background: ${(props) => props.theme.colors.white};
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
        circle at 20% 80%,
        rgba(255, 153, 51, 0.05),
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(218, 165, 32, 0.05),
        transparent 50%
      );
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 900;
  background: ${(props) => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: ${(props) => props.theme.colors.gradient.primary};
    border-radius: 2px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.darkGray};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TemplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TempleCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.white};
  border-radius: 30px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.card};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: ${(props) => props.theme.shadows.cardHover};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.theme.colors.gradient.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    opacity: 0.05;
  }
`;

const TempleImageContainer = styled.div`
  height: 300px;
  position: relative;
  overflow: hidden;
`;

const TempleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${TempleCard}:hover & {
    transform: scale(1.1);
  }
`;

const TempleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

const TempleStatus = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${(props) =>
    props.live
      ? "linear-gradient(135deg, #00B894, #00A085)"
      : "linear-gradient(135deg, #E17055, #D63031)"};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    animation: ${(props) => (props.live ? "pulse 2s infinite" : "none")};
  }
`;

const TempleInfo = styled.div`
  padding: 2.5rem;
  position: relative;
  z-index: 2;
`;

const TempleName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.8rem;
  font-family: ${(props) => props.theme.fonts.heading};
`;

const TempleLocation = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TempleDescription = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const TempleFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const Feature = styled(motion.span)`
  background: ${(props) => props.theme.colors.gradient.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(255, 153, 51, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 153, 51, 0.4);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &.primary {
    background: ${(props) => props.theme.colors.gradient.primary};
    color: white;
    box-shadow: ${(props) => props.theme.shadows.button};

    &:hover {
      transform: translateY(-3px);
      box-shadow: ${(props) => props.theme.shadows.buttonHover};
    }
  }

  &.secondary {
    background: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: 2px solid ${(props) => props.theme.colors.primary};

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      color: white;
      transform: translateY(-3px);
      box-shadow: ${(props) => props.theme.shadows.button};
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const FeaturedTemples = () => {
  const temples = [
    {
      id: 1,
      name: "Jagannath Temple",
      location: "Puri, Odisha",
      description:
        "One of the most sacred Hindu temples and part of the Char Dham pilgrimage. Famous for its annual Rath Yatra festival where the deities are taken out in grand processions.",
      features: [
        "Live Darshan",
        "Puja Booking",
        "Prasad Delivery",
        "Rath Yatra",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
      isLive: true,
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      description:
        "The holiest Gurdwara of Sikhism, known for its stunning golden architecture and the sacred Amrit Sarovar. Open to people of all faiths and backgrounds.",
      features: ["24/7 Darshan", "Langar Service", "Prasad", "Kirtan"],
      image: "https://static.toiimg.com/photo/61820954.cms",
      isLive: true,
    },
    {
      id: 3,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      description:
        "Ancient temple dedicated to Goddess Meenakshi with magnificent Dravidian architecture. Famous for its colorful gopurams and intricate sculptures.",
      features: [
        "Live Darshan",
        "Special Pujas",
        "Festival Celebrations",
        "Architecture Tours",
      ],
      image:
        "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
      isLive: false,
    },
    {
      id: 4,
      name: "Kedarnath Temple",
      location: "Uttarakhand",
      description:
        "Sacred Jyotirlinga temple located in the Himalayas at an altitude of 3,583 meters. One of the holiest Shiva temples and part of Char Dham Yatra.",
      features: [
        "Seasonal Opening",
        "Helicopter Service",
        "Trekking",
        "Special Abhishek",
      ],
      image: "https://static.toiimg.com/photo/61820954.cms",
      isLive: false,
    },
    {
      id: 5,
      name: "Tirupati Balaji",
      location: "Andhra Pradesh",
      description:
        "Most visited temple in the world, dedicated to Lord Venkateswara. Known for its immense spiritual significance and the tradition of hair offering by devotees.",
      features: [
        "VIP Darshan",
        "Hair Donation",
        "Laddu Prasad",
        "Special Entry",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
      isLive: true,
    },
    {
      id: 6,
      name: "Somnath Temple",
      location: "Gujarat",
      description:
        "First among the twelve Jyotirlinga shrines of Shiva, rebuilt multiple times throughout history. Located on the shores of the Arabian Sea with breathtaking views.",
      features: [
        "Jyotirlinga",
        "Beach Location",
        "Light & Sound Show",
        "Historical Significance",
      ],
      image:
        "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
      isLive: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Sacred Temples
          </SectionTitle>
          <SectionSubtitle
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover India's most revered temples and experience divine
            blessings through our comprehensive spiritual services
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TemplesGrid>
            {temples.map((temple) => (
              <TempleCard
                key={temple.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TempleImageContainer>
                  <TempleImage src={temple.image} alt={temple.name} />
                  <TempleOverlay />
                  <TempleStatus
                    live={temple.isLive}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {temple.isLive ? "LIVE" : "OFFLINE"}
                  </TempleStatus>
                </TempleImageContainer>

                <TempleInfo>
                  <TempleName>{temple.name}</TempleName>
                  <TempleLocation>📍 {temple.location}</TempleLocation>
                  <TempleDescription>{temple.description}</TempleDescription>

                  <TempleFeatures>
                    {temple.features.map((feature, index) => (
                      <Feature
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {feature}
                      </Feature>
                    ))}
                  </TempleFeatures>

                  <ActionButtons>
                    <ActionButton
                      className="primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🙏 Book Puja
                    </ActionButton>
                    <ActionButton
                      className="secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📺 Live Darshan
                    </ActionButton>
                  </ActionButtons>
                </TempleInfo>
              </TempleCard>
            ))}
          </TemplesGrid>
        </motion.div>
      </div>
    </Section>
  );
};

export default FeaturedTemples;
