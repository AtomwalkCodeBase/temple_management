"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

const TemplesContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
`;

const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background},
    rgba(255, 153, 51, 0.1)
  );
  padding: 3rem 0;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.darkGray};
  max-width: 600px;
  margin: 0 auto;
`;

const TemplesGrid = styled.section`
  padding: 4rem 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TempleCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.card};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const TempleImage = styled.img`
  height: 250px;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.gold}
  );
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    opacity: 0.7;
  }
`;

const TempleInfo = styled.div`
  padding: 2rem;
`;

const TempleName = styled.h3`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const TempleLocation = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 1rem;
  font-weight: 500;
`;

const TempleDescription = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TempleFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Feature = styled.span`
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;

  &.primary {
    background: ${(props) => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${(props) => props.theme.colors.gold};
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: 2px solid ${(props) => props.theme.colors.primary};

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const Temples = () => {
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
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      description:
        "The holiest Gurdwara of Sikhism, known for its stunning golden architecture and the sacred Amrit Sarovar. Open to people of all faiths and backgrounds.",
      features: ["24/7 Darshan", "Langar Service", "Prasad", "Kirtan"],
      image: "https://static.toiimg.com/photo/61820954.cms",
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
    },
    {
      id: 7,
      name: "Vaishno Devi Temple",
      location: "Jammu & Kashmir",
      description:
        "Sacred shrine of Goddess Vaishno Devi located in the Trikuta Mountains. Millions of pilgrims undertake the challenging trek to seek the goddess's blessings.",
      features: [
        "Cave Temple",
        "Helicopter Service",
        "Trekking",
        "Aarti Darshan",
      ],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
    },
    {
      id: 8,
      name: "Kashi Vishwanath Temple",
      location: "Varanasi, Uttar Pradesh",
      description:
        "One of the most famous Hindu temples dedicated to Lord Shiva. Located in the holy city of Varanasi on the banks of the sacred Ganges River.",
      features: [
        "Ganga Aarti",
        "Ancient Heritage",
        "Spiritual Significance",
        "Sacred Ganges",
      ],
      image: "https://static.toiimg.com/photo/61820954.cms",
    },
    {
      id: 9,
      name: "Badrinath Temple",
      location: "Uttarakhand",
      description:
        "Sacred temple dedicated to Lord Vishnu, part of the Char Dham pilgrimage. Situated in the Garhwal Himalayas along the banks of Alaknanda River.",
      features: [
        "Char Dham",
        "Himalayan Location",
        "Seasonal Opening",
        "Ancient Architecture",
      ],
      image:
        "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
  };

  return (
    <TemplesContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Temples
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover India's most revered temples and experience divine
            blessings through our comprehensive spiritual services
          </HeroSubtitle>
        </div>
      </HeroSection>

      <TemplesGrid>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GridContainer>
            {temples.map((temple) => (
              <TempleCard
                key={temple.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TempleImage src={temple.image} />
                <TempleInfo>
                  <TempleName>{temple.name}</TempleName>
                  <TempleLocation>📍 {temple.location}</TempleLocation>
                  <TempleDescription>{temple.description}</TempleDescription>
                  <TempleFeatures>
                    {temple.features.map((feature, index) => (
                      <Feature key={index}>{feature}</Feature>
                    ))}
                  </TempleFeatures>
                  <ActionButtons>
                    <ActionButton className="primary">Book Puja</ActionButton>
                    <ActionButton className="secondary">
                      Live Darshan
                    </ActionButton>
                  </ActionButtons>
                </TempleInfo>
              </TempleCard>
            ))}
          </GridContainer>
        </motion.div>
      </TemplesGrid>
    </TemplesContainer>
  );
};

export default Temples;
