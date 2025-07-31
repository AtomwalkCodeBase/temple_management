"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 8rem 0;
  background: url('https://ayodhyadarshanam.com/static/media/SubHeroBg.eefb8ef14f7af1951305.png');
  background-size: cover;
  background-position: center;
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
  background: #ab353d;
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
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
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid #eee;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const TempleImageContainer = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const TempleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TempleInfo = styled.div`
  padding: 1.5rem;
`;

const TempleName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const TempleLocation = styled.p`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TempleDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  gap: 0.4rem;
`;

const DetailLabel = styled.span`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const DetailValue = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ViewDetailsButton = styled(motion.button)`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 153, 51, 0.1);
  }
`;

const BookSevaButton = styled(motion.button)`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const FeaturedTemples = () => {
  const temples = [
    {
      id: 1,
      name: "Kashi Vishwanath Temple",
      location: "Varanasi, Uttar Pradesh",
      deity: "Lord Shiva",
      timings: "5AM-11AM, 4PM-9PM",
      image: "https://i.pinimg.com/736x/9e/90/70/9e90707222c55c19f922ff7097c5975d.jpg"
    },
    {
      id: 2,
      name: "Jagannath Temple",
      location: "Puri, Odisha",
      deity: "Lord Jagannath",
      timings: "6AM-9PM",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s"
    },
    {
      id: 3,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      deity: "Goddess Meenakshi",
      timings: "5AM-12:30PM, 4PM-9:30PM",
      image: "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg"
    },
    {
      id: 4,
      name: "Tirupati Balaji Temple",
      location: "Andhra Pradesh",
      deity: "Lord Venkateswara",
      timings: "3AM-11:30PM",
      image: "https://www.pilgrimagetour.in/blog/wp-content/uploads/2023/09/How-to-Reach-Tirupati-Balaji-Temple.jpg"
    },
    {
      id: 5,
      name: "Somnath Temple",
      location: "Gujarat",
      deity: "Lord Shiva",
      timings: "6AM-10PM",
      image: "https://c9admin.cottage9.com/uploads/5839/somnath-temple.jpg"
    },
    {
      id: 6,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      deity: "Guru Granth Sahib",
      timings: "Open 24 Hours",
      image: "https://static.toiimg.com/photo/61820954.cms"
    }
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
            Discover India's most revered temples and plan your visit
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
                whileHover={{ y: -5 }}
              >
                <TempleImageContainer>
                  <TempleImage src={temple.image} alt={temple.name} />
                </TempleImageContainer>

                <TempleInfo>
                  <TempleName>{temple.name}</TempleName>
                  <TempleLocation>📍 {temple.location}</TempleLocation>
                  
                  <TempleDetail>
                    <span role="img" aria-label="Om">🕉️</span>
                    <DetailLabel>Deity:</DetailLabel>
                    <DetailValue>{temple.deity}</DetailValue>
                  </TempleDetail>
                  <TempleDetail>
                    <span role="img" aria-label="Clock">🕒</span>
                    <DetailLabel>Timings:</DetailLabel>
                    <DetailValue>{temple.timings}</DetailValue>
                  </TempleDetail>

                  <ActionButtons>
                    <ViewDetailsButton
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </ViewDetailsButton>
                    <BookSevaButton
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Seva
                    </BookSevaButton>
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