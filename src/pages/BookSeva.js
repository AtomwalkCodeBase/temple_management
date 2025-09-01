"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import HallBooking from "../components/HallBooking";
import SpecialPuja from "../components/SpecialPuja";

const BookSevaContainer = styled.div`
  min-height: 100vh;
  background: #fff8f0;
  position: relative;
  overflow-x: hidden;
 
  padding-top: 100px; /* Add padding to account for fixed navbar */
`;

const HeaderSection = styled.div`
  position: relative;
  padding: 3rem 0 2rem;
  background: linear-gradient(135deg, #fff5e6 0%, #ffe4c4 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 20% 30%,
        rgba(218, 165, 32, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(184, 115, 51, 0.08) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  padding: 0 1rem;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #8b4513;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.1);

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #d2691e, #8b4513);
    border-radius: 3px;
  }
`;

const Subtitle = styled.p`
 
  font-size: 1.25rem;
  color: #d2691e;
  font-weight: 500;
  margin-top: 1rem;
`;

const TempleMotif = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0.08;
  pointer-events: none;
  z-index: 1;

  &::before {
    content: "🕉️";
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 3rem;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: "🔔";
    position: absolute;
    top: 30%;
    right: 15%;
    font-size: 2rem;
    animation: float 4s ease-in-out infinite reverse;
  }
`;

const NavigationBar = styled.div`
  background: linear-gradient(90deg, #d2691e, #8b4513);
  border-radius: 50px;
  padding: 0.5rem;
  margin: 0 auto;
  max-width: 800px;
  box-shadow: 0 8px 24px rgba(139, 69, 19, 0.3);
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const NavItem = styled.button`
  background: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.95)" : "transparent"};
  color: ${(props) => (props.active ? "#8B4513" : "white")};
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.85);
    color: ${(props) => (props.active ? "#8B4513" : "#D2691E")};
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
`;

const SectionIcon = styled.div`
  font-size: 2rem;
  color: #d2691e;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 600;
  color: #8b4513;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #d2691e, #8b4513);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormPanel = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(210, 105, 30, 0.2);
  height: fit-content;
`;

const PanelTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: #8b4513;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, #d2691e, #8b4513);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.75rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #8b4513;
  margin-bottom: 0.75rem;
  font-size: 1rem;
 
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(210, 105, 30, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #8b4513;
  cursor: pointer;
  transition: all 0.3s ease;
 

  &:focus {
    outline: none;
    border-color: #d2691e;
    box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(210, 105, 30, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #8b4513;
  transition: all 0.3s ease;
 

  &:focus {
    outline: none;
    border-color: #d2691e;
    box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
  }
`;

const SummaryPanel = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(210, 105, 30, 0.2);
  position: relative;
  height: fit-content;

  &::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 1px solid rgba(218, 165, 32, 0.2);
    border-radius: 12px;
    pointer-events: none;
    z-index: -1;
  }
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 248, 231, 0.6);
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(210, 105, 30, 0.15);
`;

const ItemIcon = styled.span`
  font-size: 1.5rem;
  color: #d2691e;
`;

const ItemText = styled.span`
  font-weight: 600;
  color: #8b4513;
 
`;

const DateInfo = styled.div`
  background: rgba(255, 248, 231, 0.6);
  padding: 1.25rem;
  border-radius: 8px;
  margin: 1.25rem 0;
  border: 1px solid rgba(210, 105, 30, 0.15);
 
`;

const LocationInfo = styled.div`
  background: rgba(255, 248, 231, 0.6);
  padding: 1.25rem;
  border-radius: 8px;
  margin: 1.25rem 0;
  border: 1px solid rgba(210, 105, 30, 0.15);

`;

const CostSection = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 248, 231, 0.6);
  border-radius: 8px;
  border: 1px solid rgba(210, 105, 30, 0.15);
 
`;

const CostLabel = styled.h4`
  font-weight: 700;
  color: #8b4513;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
`;

const CostValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d2691e;
`;

const ProceedButton = styled(motion.button)`
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(90deg, #d2691e, #8b4513);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(139, 69, 19, 0.4);
    background: linear-gradient(90deg, #8b4513, #d2691e);
  }
`;

const FooterIcon = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 2rem;
  color: #d2691e;
  animation: float 4s ease-in-out infinite;
`;

const TempleInfoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(210, 105, 30, 0.2);
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const TempleImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid rgba(210, 105, 30, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TempleDetails = styled.div`
  flex: 1;
`;

const TempleName = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: #8b4513;
  margin-bottom: 0.5rem;
`;

const TempleLocation = styled.p`
  color: #d2691e;
  font-weight: 500;
  margin-bottom: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "📍";
  }
`;

const TempleDeity = styled.p`
  color: #8b4513;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "🕉️";
  }
`;

const BookSeva = () => {
  const location = useLocation();
  const [selectedOfferings, setSelectedOfferings] = useState([
    "Flowers",
    "Sweets",
  ]);
  const [selectedDate, setSelectedDate] = useState("2024-04-24");
  const [selectedLocation, setSelectedLocation] = useState(
    "Shree Ganesh Mandir"
  );
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [activeTab, setActiveTab] = useState("chadhava");

  const temples = [
    {
      id: 1,
      name: "Kashi Vishwanath Temple",
      location: "Varanasi, Uttar Pradesh",
      deity: "Lord Shiva",
      timings: "5AM-11AM, 4PM-9PM",
      image:
        "https://i.pinimg.com/736x/9e/90/70/9e90707222c55c19f922ff7097c5975d.jpg",
    },
    {
      id: 2,
      name: "Jagannath Temple",
      location: "Puri, Odisha",
      deity: "Lord Jagannath",
      timings: "6AM-9PM",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-agvMxTV3rSTZCB9Npd1ueYqg-qbe0bxhQ&s",
    },
    {
      id: 3,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      deity: "Goddess Meenakshi",
      timings: "5AM-12:30PM, 4PM-9:30PM",
      image:
        "https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg",
    },
    {
      id: 4,
      name: "Tirupati Balaji Temple",
      location: "Andhra Pradesh",
      deity: "Lord Venkateswara",
      timings: "3AM-11:30PM",
      image:
        "https://www.pilgrimagetour.in/blog/wp-content/uploads/2023/09/How-to-Reach-Tirupati-Balaji-Temple.jpg",
    },
    {
      id: 5,
      name: "Somnath Temple",
      location: "Gujarat",
      deity: "Lord Shiva",
      timings: "6AM-10PM",
      image: "https://c9admin.cottage9.com/uploads/5839/somnath-temple.jpg",
    },
    {
      id: 6,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      deity: "Guru Granth Sahib",
      timings: "Open 24 Hours",
      image: "https://static.toiimg.com/photo/61820954.cms",
    },
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (location.state?.templeId) {
      const temple = temples.find((t) => t.id === location.state.templeId);
      if (temple) {
        setSelectedTemple(temple);
        setSelectedLocation(temple.name);
      }
    }
  }, [location.state]);

  // Additional effect to ensure scroll to top on route change
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <BookSevaContainer>
      <HeaderSection>
        <HeaderContent>
          <TitleSection>
            <TempleMotif />
            <MainTitle>Book Seva</MainTitle>
            <Subtitle>
              Experience divine blessings through sacred offerings
            </Subtitle>
          </TitleSection>

          <NavigationBar>
            <NavItems>
              <NavItem
                active={activeTab === "chadhava"}
                onClick={() => setActiveTab("chadhava")}
              >
                Chadhava
              </NavItem>
              <NavItem
                active={activeTab === "hall-booking"}
                onClick={() => setActiveTab("hall-booking")}
              >
                Hall Booking
              </NavItem>
              <NavItem
                active={activeTab === "special-puja"}
                onClick={() => setActiveTab("special-puja")}
              >
                Special Puja
              </NavItem>
              <NavItem
                active={activeTab === "donations"}
                onClick={() => setActiveTab("donations")}
              >
                Donations
              </NavItem>
              <NavItem
                active={activeTab === "volunteering"}
                onClick={() => setActiveTab("volunteering")}
              >
                Volunteering
              </NavItem>
            </NavItems>
          </NavigationBar>
        </HeaderContent>
      </HeaderSection>

      <MainContent>
        {activeTab === "chadhava" && (
          <>
            {selectedTemple && (
              <TempleInfoCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <TempleImage
                  src={selectedTemple.image}
                  alt={selectedTemple.name}
                />
                <TempleDetails>
                  <TempleName>{selectedTemple.name}</TempleName>
                  <TempleLocation>{selectedTemple.location}</TempleLocation>
                  <TempleDeity>{selectedTemple.deity}</TempleDeity>
                </TempleDetails>
              </TempleInfoCard>
            )}

            <SectionHeader>
              <SectionIcon>🪔</SectionIcon>
              <SectionTitle>Chadhava Offerings</SectionTitle>
            </SectionHeader>

            <ContentGrid>
              <FormPanel
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <PanelTitle>Select Offerings</PanelTitle>

                <FormGroup>
                  <Label>Offering Type</Label>
                  <Select>
                    <option>Flowers (₹200-₹500)</option>
                    <option>Sweets (₹300-₹600)</option>
                    <option>Fruits (₹150-₹400)</option>
                    <option>Incense (₹100-₹300)</option>
                    <option>Oil (₹250-₹500)</option>
                    <option>Special Prasadam (₹500-₹1000)</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Preferred Date</Label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Temple Location</Label>
                  <Input
                    type="text"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    placeholder="Enter temple name or location"
                  />
                </FormGroup>
              </FormPanel>

              <SummaryPanel
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PanelTitle>Order Summary</PanelTitle>

                {selectedOfferings.map((offering, index) => (
                  <SelectedItem key={index}>
                    <ItemIcon>
                      {offering === "Flowers"
                        ? "🌸"
                        : offering === "Sweets"
                        ? "🍬"
                        : offering === "Fruits"
                        ? "🍎"
                        : "🪔"}
                    </ItemIcon>
                    <ItemText>{offering}</ItemText>
                  </SelectedItem>
                ))}

                <DateInfo>
                  <strong>Selected Date:</strong> {formatDate(selectedDate)}
                </DateInfo>

                <LocationInfo>
                  <strong>Temple Location:</strong> {selectedLocation}
                </LocationInfo>

                <CostSection>
                  <CostLabel>Estimated Cost Range</CostLabel>
                  <CostValue>₹500 - ₹1000</CostValue>
                  <small>
                    (Final amount will be confirmed after verification)
                  </small>
                </CostSection>

                <ProceedButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Payment
                </ProceedButton>
              </SummaryPanel>
            </ContentGrid>
          </>
        )}

        {activeTab === "hall-booking" && <HallBooking />}

        {activeTab === "special-puja" && <SpecialPuja />}

        {activeTab === "donations" && (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h2 style={{ color: "#8B4513", marginBottom: "1rem" }}>
              Donations
            </h2>
            <p style={{ color: "#D2691E" }}>Coming Soon...</p>
          </div>
        )}

        {activeTab === "volunteering" && (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h2 style={{ color: "#8B4513", marginBottom: "1rem" }}>
              Volunteering
            </h2>
            <p style={{ color: "#D2691E" }}>Coming Soon...</p>
          </div>
        )}
      </MainContent>

      <FooterIcon>🪷</FooterIcon>
    </BookSevaContainer>
  );
};

export default BookSeva;
