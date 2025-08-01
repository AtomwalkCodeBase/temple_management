"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TempleContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: linear-gradient(
    to top,
    ${(props) => props.theme.colors.background} 0%,
    rgba(255, 153, 51, 0.1) 100%
  );
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 0px;
`;

const TempleTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.8rem;
  }
`;

const TempleSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.darkGray};
  max-width: 800px;
  margin: 0 auto 0.5rem;
`;

const ImageCarousel = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
`;

const CarouselImage = styled(motion.img)`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 300px;
  }
`;

const CarouselButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.85);
  color: ${(props) => props.theme.colors.primary};
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.13);
  z-index: 2;
  transition: background 0.25s, color 0.25s, box-shadow 0.25s;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  }

  &.prev {
    left: 12px;
  }

  &.next {
    right: 12px;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const SectionContent = styled(motion.p)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 1.6;
`;

const TimingsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const TimingCard = styled(motion.div)`
  background: ${(props) => props.theme.colors.white};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TimingTitle = styled.h3`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const TimingInfo = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const OfferingsList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OfferingItem = styled(motion.li)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  background: rgba(255, 153, 51, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
`;

const BookSevaButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const TempleDetails = () => {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [templeData, setTempleData] = useState(null);

  // Temple data mapping
  const templesData = {
    1: {
      name: "Jagannath Temple",
      location: "Puri, Odisha",
      deity: "Lord Jagannath",
      timings: "6AM-9PM",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
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
      travelDetails: "The temple is located in Puri, Odisha. The nearest airport is Biju Patnaik International Airport in Bhubaneswar (60 km away). Puri Railway Station is well-connected to major cities. Regular buses and taxis are available from Bhubaneswar and other nearby cities.",
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
      timings: "Open 24 Hours",
      image: "https://static.toiimg.com/photo/61820954.cms",
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
      travelDetails: "The Golden Temple is located in Amritsar, Punjab. Amritsar Airport is well-connected to major cities. Amritsar Railway Station is the nearest railway station. Local transport includes auto-rickshaws, taxis, and buses.",
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
      timings: "5AM-12:30PM, 4PM-9:30PM",
      image: "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
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
      travelDetails: "The temple is located in Madurai, Tamil Nadu. Madurai Airport is well-connected to major cities. Madurai Junction Railway Station is the nearest railway station. Local transport includes auto-rickshaws, taxis, and buses.",
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
       timings: "6AM-3PM, 5PM-7PM",
       image: "https://static.toiimg.com/photo/61820954.cms",
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
       travelDetails: "Kedarnath Temple is located in Uttarakhand. The nearest airport is Jolly Grant Airport in Dehradun (238 km away). The nearest railway station is Rishikesh (223 km away). From Rishikesh, one can take a bus or taxi to Gaurikund, and then trek 16 km to reach Kedarnath.",
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
       timings: "3AM-11:30PM",
       image: "https://imgs.search.brave.com/45u5nMGwZQRxHkFDlGaIEogjQe3M86of3p3a3-Q_rKA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTkvMTIvVmVua2F0/ZXN3YXJhLVRlbXBs/ZS10aXJ1cGF0aS5q/cGc",
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
       travelDetails: "Tirupati Balaji Temple is located in Tirupati, Andhra Pradesh. Tirupati Airport is well-connected to major cities. Tirupati Railway Station is the nearest railway station. Regular buses and taxis are available from nearby cities.",
       images: [
         "https://imgs.search.brave.com/45u5nMGwZQRxHkFDlGaIEogjQe3M86of3p3a3-Q_rKA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTkvMTIvVmVua2F0/ZXN3YXJhLVRlbXBs/ZS10aXJ1cGF0aS5q/cGc",
         "https://static.toiimg.com/photo/61820954.cms",
         "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
       ],
     },
     // Add more temples as needed
   };

  useEffect(() => {
    const temple = templesData[templeId];
    if (temple) {
      setTempleData(temple);
    } else {
      // Redirect to temples page if temple not found
      navigate('/temples');
    }
  }, [templeId, navigate]);

  if (!templeData) {
    return <div>Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % templeData.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + templeData.images.length) % templeData.images.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
    <TempleContainer>
      <BackButton
        onClick={() => navigate('/temples')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Temples
      </BackButton>
      <ImageCarousel>
        <CarouselImage
          src={templeData.images[currentImage]}
          alt={`${templeData.name} Image ${currentImage + 1}`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        />
        <CarouselButton
          className="prev"
          onClick={prevImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous image"
        >
          &#8592;
        </CarouselButton>
        <CarouselButton
          className="next"
          onClick={nextImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next image"
        >
          &#8594;
        </CarouselButton>
      </ImageCarousel>
      <HeroSection>
        <TempleTitle variants={itemVariants} initial="hidden" animate="visible">
          {templeData.name}
        </TempleTitle>
        <TempleSubtitle variants={itemVariants} initial="hidden" animate="visible">
          📍 {templeData.location}
        </TempleSubtitle>
      </HeroSection>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Section>
          <SectionTitle variants={itemVariants}>History of the Temple</SectionTitle>
          <SectionContent variants={itemVariants}>
            {templeData.history}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle variants={itemVariants}>Significance of the Temple</SectionTitle>
          <SectionContent variants={itemVariants}>
            {templeData.significance}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle variants={itemVariants}>Architecture of the Temple</SectionTitle>
          <SectionContent variants={itemVariants}>
            {templeData.architecture}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle variants={itemVariants}>Temple Timings</SectionTitle>
          <TimingsGrid variants={itemVariants}>
            {templeData.timings.map((timing, index) => (
              <TimingCard key={index} variants={itemVariants}>
                <TimingTitle>{timing.title}</TimingTitle>
                <TimingInfo>{timing.time}</TimingInfo>
              </TimingCard>
            ))}
          </TimingsGrid>
        </Section>
        <Section>
          <SectionTitle variants={itemVariants}>Offerings</SectionTitle>
          <OfferingsList variants={itemVariants}>
            {templeData.offerings.map((offering, index) => (
              <OfferingItem key={index} variants={itemVariants}>
                {offering}
              </OfferingItem>
            ))}
          </OfferingsList>
        </Section>
        <Section>
          <SectionTitle variants={itemVariants}>Travel Details</SectionTitle>
          <SectionContent variants={itemVariants}>
            {templeData.travelDetails}
          </SectionContent>
          <BookSevaButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Book Seva
          </BookSevaButton>
        </Section>
      </motion.div>
    </TempleContainer>
  );
};

export default TempleDetails;