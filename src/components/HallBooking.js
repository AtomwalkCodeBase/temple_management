"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import hall01 from "../assets/img/Hall_01.webp";
import hall02 from "../assets/img/Hall_02.jpg";
import hall03 from "../assets/img/Hall_03.jpg";
const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #FBBF24 100%);
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #EA580C 0%, #DC2626 50%, #EC4899 100%);
  color: white;
  padding: 4rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.2); }
  &::after { content: '🪷'; position: absolute; top: 2rem; left: 2rem; font-size: 4rem; opacity: 0.2; animation: pulse 2s infinite; }

  @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.4; } }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #FEF08A 0%, #FED7AA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #9A3412;
  text-align: center;
  margin-bottom: 2rem;
`;

const HallGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const HallCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${props => props.selected 
    ? '0 20px 40px rgba(234, 88, 12, 0.3), 0 0 0 4px #EA580C' 
    : '0 10px 30px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  &:hover { transform: scale(1.05); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15); }
`;

const HallImage = styled.div`
  position: relative;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease;

  &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%); }
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const CarouselImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
`;

const CarouselDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
  }
`;

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &.prev {
    left: 0.5rem;
  }

  &.next {
    right: 0.5rem;
  }
`;

const PriceBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #EA580C;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  z-index: 2;
`;

const SelectionIndicator = styled(motion.div)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #10B981;
  color: white;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 2;
`;

const HallContent = styled.div`
  padding: 1.5rem;

  h3 { font-size: 1.5rem; font-weight: bold; color: #9A3412; margin-bottom: 0.5rem; }
  .capacity { color: #EA580C; font-weight: 600; margin-bottom: 1rem; }
  .features { display: flex; flex-direction: column; gap: 0.5rem; }
  .feature { display: flex; align-items: center; font-size: 0.9rem; color: #6B7280; gap: 0.5rem; }
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: stretch;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const Panel = styled.div`
  background: ${props => props.summary ? 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)' : 'white'};
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: ${props => props.summary ? '2px solid #FED7AA' : '1px solid #FED7AA'};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 600px;

  h3 { 
    font-size: 2rem; 
    font-weight: bold; 
    color: #9A3412; 
    margin-bottom: 1.5rem; 
    display: flex; 
    align-items: center; 
    gap: 0.75rem;
    white-space: nowrap;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.full ? '1fr' : '1fr 1fr'};
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
  label { color: #B45309; font-weight: 600; margin-bottom: 0.5rem; display: block; }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #FED7AA;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-size: 1rem;

  &:focus { outline: none; border-color: #EA580C; box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1); }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #FED7AA;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-size: 1rem;
  background: white;

  &:focus { outline: none; border-color: #EA580C; box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1); }
`;

const Button = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%);
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(234, 88, 12, 0.3);
  border: none;
  cursor: pointer;

  &:hover { box-shadow: 0 15px 30px rgba(234, 88, 12, 0.4); transform: translateY(-2px); }
`;

const SummaryCard = styled.div`
  background: ${props => props.total ? 'linear-gradient(135deg, #EA580C 0%, #DC2626 100%)' : 'white'};
  color: ${props => props.total ? 'white' : 'inherit'};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${props => props.total ? '0 10px 20px rgba(234, 88, 12, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};

  .row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
  .row:last-child { margin-bottom: 0; }
  .label { font-weight: 600; color: ${props => props.total ? 'white' : '#6B7280'}; }
  .value { color: ${props => props.total ? 'white' : '#EA580C'}; font-weight: ${props => props.total ? 'bold' : '600'}; font-size: ${props => props.total ? '1.5rem' : '1rem'}; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 0;
  .icon { font-size: 4rem; margin-bottom: 1rem; }
  .text { color: #EA580C; font-weight: 600; }
`;

const IncludesList = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #6B7280;
  margin-top: 1rem;
  div { margin-bottom: 0.25rem; }
`;

const HallBooking = () => {
  const [selectedHall, setSelectedHall] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const shivMandapamImages = [hall01, hall02, hall03];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === shivMandapamImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [shivMandapamImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === shivMandapamImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? shivMandapamImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const halls = [
    { id: 1, name: "Shiv Mandapam", capacity: "200 people", images: shivMandapamImages, price: 5000, features: ["AC Available", "Parking", "Decoration"] },
    { id: 2, name: "Ganesh Sabha", capacity: "150 people", images: shivMandapamImages, price: 4000, features: ["Traditional Setup", "Sound System", "Parking"] },
    { id: 3, name: "Durga Darbar", capacity: "300 people", images: shivMandapamImages, price: 6000, features: ["Premium Hall", "Full AC", "Catering Support"] }
  ];

  const handleSubmit = () => {
    if (!selectedHall) return alert("Please select a hall");
    if (!name || !email || !phone || !date) return alert("Please fill all required fields");
    alert(`Booking confirmed for ${selectedHall.name}!`);
  };

  return (
    <MainContainer>
      <HeroSection>
        <HeroTitle initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{ fontSize: '3rem', marginRight: '0.5rem' }}>ॐ</span> Sacred Hall Booking
        </HeroTitle>
        <HeroSubtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Reserve our divine halls for your spiritual celebrations and sacred ceremonies
        </HeroSubtitle>
      </HeroSection>

      <Container>
        <HallGrid>
          {halls.map((hall, index) => (
            <HallCard
              key={hall.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedHall(hall)}
              selected={selectedHall?.id === hall.id}
            >
              {hall.images ? (
                <CarouselContainer>
                  {hall.images.map((image, imgIndex) => (
                    <CarouselImage
                      key={imgIndex}
                      src={image}
                      active={currentImageIndex === imgIndex}
                    />
                  ))}
                  <PriceBadge>₹{hall.price.toLocaleString()}</PriceBadge>
                  {selectedHall?.id === hall.id && (
                    <SelectionIndicator initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</SelectionIndicator>
                  )}
                  <CarouselArrow className="prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                    ‹
                  </CarouselArrow>
                  <CarouselArrow className="next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                    ›
                  </CarouselArrow>
                  <CarouselDots>
                    {hall.images.map((_, dotIndex) => (
                      <CarouselDot
                        key={dotIndex}
                        active={currentImageIndex === dotIndex}
                        onClick={(e) => { e.stopPropagation(); goToImage(dotIndex); }}
                      />
                    ))}
                  </CarouselDots>
                </CarouselContainer>
              ) : (
                <HallImage src={hall.image}>
                  <PriceBadge>₹{hall.price.toLocaleString()}</PriceBadge>
                  {selectedHall?.id === hall.id && (
                    <SelectionIndicator initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</SelectionIndicator>
                  )}
                </HallImage>
              )}
              
              <HallContent>
                <h3>{hall.name}</h3>
                <div className="capacity">👥 Capacity: {hall.capacity}</div>
                <div className="features">
                  {hall.features.map((feature, idx) => (
                    <div key={idx} className="feature">
                      <span style={{ color: '#EA580C' }}>✨</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </HallContent>
            </HallCard>
          ))}
        </HallGrid>

        <FormSection>
          <Panel>
            <h3><span>📝</span>Booking Details</h3>
            
            <FormGrid>
              <FormGroup>
                <label>Your Name</label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
              </FormGroup>
              <FormGroup>
                <label>Phone Number</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" />
              </FormGroup>
            </FormGrid>

            <FormGrid full>
              <FormGroup>
                <label>Email Address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
              </FormGroup>
            </FormGrid>

            <FormGrid>
              <FormGroup>
                <label>Event Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <label>Event Time</label>
                <Select value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="08:00">🌅 8:00 AM</option>
                  <option value="12:00">☀️ 12:00 PM</option>
                  <option value="16:00">🌇 4:00 PM</option>
                  <option value="20:00">🌙 8:00 PM</option>
                </Select>
              </FormGroup>
            </FormGrid>

            <Button onClick={handleSubmit} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              🙏 Confirm Sacred Booking
            </Button>
          </Panel>

          <Panel summary>
            <h3><span>📋</span>Booking Summary</h3>
            
            {selectedHall ? (
              <div>
                <SummaryCard>
                  <div className="row">
                    <span className="label">Hall:</span>
                    <span className="value">{selectedHall.name}</span>
                  </div>
                  <div className="row">
                    <span className="label">Capacity:</span>
                    <span className="value">{selectedHall.capacity}</span>
                  </div>
                </SummaryCard>
                
                <SummaryCard>
                  <div className="row">
                    <span className="label">Date:</span>
                    <span className="value">{date || "Not selected"}</span>
                  </div>
                  <div className="row">
                    <span className="label">Time:</span>
                    <span className="value">{time}</span>
                  </div>
                </SummaryCard>
                
                <SummaryCard total>
                  <div className="row">
                    <span className="label">Total Amount:</span>
                    <span className="value">₹{selectedHall.price.toLocaleString()}</span>
                  </div>
                </SummaryCard>
                
                <IncludesList>
                  <div>✨ Includes basic decoration and setup</div>
                  <div>🎵 Sound system available</div>
                  <div>🚗 Free parking included</div>
                </IncludesList>
              </div>
            ) : (
              <EmptyState>
                <div className="icon">🏛️</div>
                <div className="text">Please select a hall to see booking summary</div>
              </EmptyState>
            )}
          </Panel>
        </FormSection>
      </Container>
    </MainContainer>
  );
};

export default HallBooking;