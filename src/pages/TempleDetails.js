"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TempleContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fef7e0 0%, #fff8dc 50%, #f5f5dc 100%);
  font-family: 'Georgia', serif;
  padding-top: 80px;
`;

const HeaderSection = styled.div`
  background: linear-gradient(45deg, #8b4513 0%, #a0522d 50%, #cd853f 100%);
  color: white;
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="lotus" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23lotus)"/></svg>');
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const TempleTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-family: 'Cinzel', serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TempleLocation = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const DeityName = styled(motion.p)`
  font-size: 1.1rem;
  font-style: italic;
  opacity: 0.8;
`;

const ImageSection = styled.section`
  max-width: 1200px;
  margin: -20px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const MainImage = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border: 4px solid #daa520;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ImageIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#daa520' : '#ccc'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #daa520;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: start;
  position: sticky;
  top: 100px;
`;

const Section = styled(motion.section)`
  background: white;
  padding: 30px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border-left: 5px solid #daa520;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #8b4513;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '🕉️';
    font-size: 1.2rem;
  }
`;

const SectionContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  text-align: justify;
`;

const InfoCard = styled(motion.div)`
  background: linear-gradient(135deg, #fff 0%, #fefefe 100%);
  padding: 25px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border: 1px solid #e0e0e0;
`;

const InfoCardTitle = styled.h3`
  font-size: 1.4rem;
  color: #8b4513;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
`;

const TimingsGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const TimingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #faf0e6;
  border-radius: 8px;
  border-left: 3px solid #daa520;
`;

const TimingLabel = styled.span`
  font-weight: 600;
  color: #8b4513;
`;

const TimingValue = styled.span`
  color: #444;
  font-family: monospace;
`;

const OfferingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const OfferingTag = styled.span`
  background: linear-gradient(45deg, #daa520, #b8860b);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const BookSevaButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 30px auto 0;
  display: block;
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }
`;

const QuickInfo = styled.div`
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

const QuickInfoItem = styled.div`
  margin: 10px 0;

  strong {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 5px;
  }

  span {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

// Updated temple data to ensure timingsText (for summary) and timings (for array).
const templesData = {
  1: {
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    deity: "Lord Jagannath",
    timingsText: "6AM-9PM",
    history: "The Jagannath Temple was built by King Anantavarman Chodaganga Deva of the Eastern Ganga dynasty in the 12th century. The temple is famous for its annual Rath Yatra, or chariot festival, in which the three principal deities are pulled on huge and elaborately decorated temple cars.",
    significance: "The Jagannath Temple is one of the Char Dham pilgrimage sites and is considered one of the most sacred temples in Hinduism. The temple is known for its unique architecture and the annual Rath Yatra festival.",
    architecture: "The temple is built in the Kalinga style of architecture, with the Pancharatha (Five chariots) type consisting of two anurathas, two konakas and one ratha. The temple has four distinct sectional structures, namely - Deula, Vimana or Garba griha where the triad deities are lodged on the ratnavedi (Throne of Pearls).",
    timings: [
      { title: "Morning Opening", time: "06:00 AM - 09:00 PM" },
      { title: "Morning Aarti", time: "06:00 AM - 06:30 AM" },
      { title: "Morning Darshan", time: "06:30 AM - 12:00 PM" },
      { title: "Afternoon Break", time: "12:00 PM - 03:00 PM" },
      { title: "Evening Darshan", time: "03:00 PM - 09:00 PM" },
      { title: "Evening Aarti", time: "08:30 PM - 09:00 PM" },
    ],
    offerings: ["Prasad", "Flowers", "Coconut", "Banana", "Sweets"],
    freeMeals: "The temple provides free meals (Mahaprasad) to all devotees. The main meal is served from 11:00 AM to 2:00 PM daily. The temple kitchen can serve up to 100,000 people daily during peak seasons.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
      "https://static.toiimg.com/photo/61820954.cms",
      "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
    ],
  },
  2: {
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    deity: "Guru Granth Sahib",
    timingsText: "Open 24 Hours",
    history: "The Golden Temple was built by Guru Arjan Dev, the fifth Sikh Guru, in 1604. The temple was designed to be built in the center of a holy pool, which was completed by Guru Ram Das in 1577. The temple has been destroyed and rebuilt several times throughout history.",
    significance: "The Golden Temple is the holiest Gurdwara of Sikhism and is considered the spiritual and cultural center of the Sikh religion. It is open to people of all faiths and backgrounds, symbolizing the Sikh principle of universal brotherhood.",
    architecture: "The temple is built in the center of a square tank, surrounded by a walkway. The temple itself is a two-story marble structure inlaid with mother-of-pearl and decorated with gold foil. The upper floor is covered with pure gold leaf, giving it its distinctive appearance.",
    timings: [
      { title: "24 Hours Open", time: "Open All Day" },
      { title: "Morning Aarti", time: "04:00 AM - 05:00 AM" },
      { title: "Evening Aarti", time: "07:00 PM - 08:00 PM" },
      { title: "Langar Service", time: "24 Hours" },
    ],
    offerings: ["Karah Parshad", "Langar", "Flowers", "Donations"],
    freeMeals: "The Golden Temple is famous for its Langar (community kitchen) which serves free meals 24 hours a day to all visitors regardless of religion, caste, or creed. The Langar serves approximately 100,000 people daily.",
    images: [
      "https://static.toiimg.com/photo/61820954.cms",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
      "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
    ],
  },
  3: {
    name: "Meenakshi Temple",
    location: "Madurai, Tamil Nadu",
    deity: "Goddess Meenakshi",
    timingsText: "5AM-12:30PM, 4PM-9:30PM",
    history: "The temple was originally built by the Pandya dynasty in the 6th century CE, but was largely rebuilt and expanded during the Nayak dynasty in the 16th and 17th centuries. The temple complex is one of the largest in India.",
    significance: "The Meenakshi Temple is one of the most important temples in Tamil Nadu and is considered a masterpiece of Dravidian architecture. The temple is famous for its colorful gopurams (temple towers) and intricate sculptures.",
    architecture: "The temple complex covers 14 acres and has 14 gopurams (towers), the tallest of which is 170 feet high. The temple is built in the Dravidian style of architecture with elaborate carvings and sculptures depicting various mythological stories.",
    timings: [
      { title: "Morning Opening", time: "05:00 AM - 12:30 PM" },
      { title: "Morning Aarti", time: "05:00 AM - 06:00 AM" },
      { title: "Morning Darshan", time: "06:00 AM - 12:30 PM" },
      { title: "Afternoon Break", time: "12:30 PM - 04:00 PM" },
      { title: "Evening Opening", time: "04:00 PM - 09:30 PM" },
      { title: "Evening Aarti", time: "06:30 PM - 07:30 PM" },
    ],
    offerings: ["Flowers", "Coconut", "Banana", "Sweets", "Kumkum"],
    freeMeals: "The temple provides free meals to devotees during special occasions and festivals. Regular prasad distribution takes place after morning and evening aartis. During major festivals, the temple serves meals to thousands of devotees.",
    images: [
      "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
      "https://static.toiimg.com/photo/61820954.cms",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
    ],
  },
   4: {
     name: "Kedarnath Temple",
     location: "Uttarakhand",
     deity: "Lord Shiva",
     timingsText: "6AM-3PM, 5PM-7PM",
     history: "The temple was built by Adi Shankaracharya and is one of the twelve Jyotirlingas, the holiest Hindu shrines of Shiva. The temple is believed to have been built by the Pandavas and revived by Adi Shankaracharya.",
     significance: "Kedarnath Temple is one of the four major sites in India's Chota Char Dham pilgrimage of Northern Himalayas and is the first of the Panch Kedar pilgrimage sites. The temple is at the height of 3,583 m (11,755 ft), 223 km from Rishikesh, on the shores of Mandakini river.",
     architecture: "The temple is built of extremely large, evenly cut grey slabs of stones. It is of unknown date. The structure is believed to have been constructed in the 8th century CE, when Adi Shankaracharya visited. The walls are 6 feet thick and built of area stones.",
     timings: [
       { title: "Morning Opening", time: "06:00 AM - 03:00 PM" },
       { title: "Morning Aarti", time: "06:00 AM - 07:00 AM" },
       { title: "Morning Darshan", time: "07:00 AM - 03:00 PM" },
       { title: "Afternoon Break", time: "03:00 PM - 05:00 PM" },
       { title: "Evening Opening", time: "05:00 PM - 07:00 PM" },
       { title: "Evening Aarti", time: "06:30 PM - 07:00 PM" },
     ],
     offerings: ["Bilva Patra", "Flowers", "Milk", "Honey", "Ghee"],
     freeMeals: "Due to the remote location and harsh weather conditions, the temple provides basic meals to pilgrims during the pilgrimage season (May to November). Meals are served from 8:00 AM to 10:00 AM and 6:00 PM to 8:00 PM.",
     images: [
       "https://static.toiimg.com/photo/61820954.cms",
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
       "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
     ],
   },
   5: {
     name: "Tirupati Balaji",
     location: "Andhra Pradesh",
     deity: "Lord Venkateswara",
     timingsText: "3AM-11:30PM",
     history: "The temple is believed to have been built by King Thondaiman, Tamil ruler of the ancient Thondaimandalam, after he had a dream of Lord Vishnu. The temple has been patronized by various dynasties including the Pallavas, Cholas, and Vijayanagara Empire.",
     significance: "Tirupati Balaji Temple is the most visited temple in the world and is considered one of the most sacred pilgrimage sites in Hinduism. The temple is famous for the tradition of hair offering by devotees.",
     architecture: "The temple is built in Dravidian architecture and is constructed in South Indian style. The temple complex has several mandapams, shrines, and other structures. The main temple is built on the top of the seven hills.",
     timings: [
       { title: "Early Morning", time: "03:00 AM - 11:30 PM" },
       { title: "Suprabhatam", time: "03:00 AM - 03:30 AM" },
       { title: "Morning Aarti", time: "04:00 AM - 04:30 AM" },
       { title: "Morning Darshan", time: "04:30 AM - 11:30 PM" },
       { title: "Evening Aarti", time: "06:30 PM - 07:00 PM" },
     ],
     offerings: ["Laddu", "Hair Donation", "Flowers", "Coconut", "Kumkum"],
     freeMeals: "Tirupati Balaji Temple serves free meals (Annadanam) to all devotees. The main meal is served from 11:00 AM to 3:00 PM and 7:00 PM to 9:00 PM daily. The temple serves over 50,000 devotees daily.",
     images: [
       "https://imgs.search.brave.com/45u5nMGwZQRxHkFDlGaIEogjQe3M86of3p3a3-Q_rKA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTkvMTIvVmVua2F0/ZXN3YXJhLVRlbXBs/ZS10aXJ1cGF0aS5q/cGc",
       "https://static.toiimg.com/photo/61820954.cms",
       "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
     ],
   },
 };

const TempleDetails = () => {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [templeData, setTempleData] = useState(null);

  useEffect(() => {
    const temple = templesData[templeId];
    if (temple) {
      setTempleData(temple);
    } else {
      navigate('/temples');
    }
  }, [templeId, navigate]);

  useEffect(() => {
    if (templeData && templeData.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % templeData.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [templeData]);

  if (!templeData) {
    return <div>Loading...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <TempleContainer>
      <HeaderSection>
        <TempleTitle
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {templeData.name}
        </TempleTitle>
        <TempleLocation
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          📍 {templeData.location}
        </TempleLocation>
        <DeityName
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Dedicated to {templeData.deity}
        </DeityName>
      </HeaderSection>

      <ImageSection>
        <MainImage
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <CarouselImage
            src={templeData.images[currentImage]}
            alt={`${templeData.name} Image ${currentImage + 1}`}
          />
        </MainImage>
        {templeData.images.length > 1 && (
          <ImageIndicators>
            {templeData.images.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentImage}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </ImageIndicators>
        )}
      </ImageSection>

      <ContentContainer>
        <MainContent>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Section variants={itemVariants}>
              <SectionTitle>Sacred History</SectionTitle>
              <SectionContent>{templeData.history}</SectionContent>
            </Section>

            <Section variants={itemVariants}>
              <SectionTitle>Spiritual Significance</SectionTitle>
              <SectionContent>{templeData.significance}</SectionContent>
            </Section>

            <Section variants={itemVariants}>
              <SectionTitle>Divine Architecture</SectionTitle>
              <SectionContent>{templeData.architecture}</SectionContent>
            </Section>

            <Section variants={itemVariants}>
              <SectionTitle>Free Meals</SectionTitle>
              <SectionContent>{templeData.freeMeals}</SectionContent>
            </Section>
              <BookSevaButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/book-seva')}
              >
                🙏 Book Seva
              </BookSevaButton>
          </motion.div>
        </MainContent>

        <Sidebar>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <InfoCard variants={itemVariants}>
              <QuickInfo>
                <QuickInfoItem>
                  <strong>Temple Timings</strong>
                  <span>{templeData.timingsText}</span>
                </QuickInfoItem>
                <QuickInfoItem>
                  <strong>Primary Deity</strong>
                  <span>{templeData.deity}</span>
                </QuickInfoItem>
              </QuickInfo>
            </InfoCard>

            <InfoCard variants={itemVariants}>
              <InfoCardTitle>🕐 Detailed Timings</InfoCardTitle>
              <TimingsGrid>
                {templeData.timings.map((timing, index) => (
                  <TimingRow key={index}>
                    <TimingLabel>{timing.title}</TimingLabel>
                    <TimingValue>{timing.time}</TimingValue>
                  </TimingRow>
                ))}
              </TimingsGrid>
            </InfoCard>

            <InfoCard variants={itemVariants}>
              <InfoCardTitle>🙏 Sacred Offerings</InfoCardTitle>
              <OfferingsContainer>
                {templeData.offerings.map((offering, index) => (
                  <OfferingTag key={index}>{offering}</OfferingTag>
                ))}
              </OfferingsContainer>
            </InfoCard>
          </motion.div>
        </Sidebar>
      </ContentContainer>
    </TempleContainer>
  );
};

export default TempleDetails;
