"use client";
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

const PujaRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const PujaCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  text-align: center;
  box-shadow: ${props => props.selected 
    ? '0 20px 40px rgba(234, 88, 12, 0.3), 0 0 0 4px #EA580C' 
    : '0 10px 30px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  &:hover { transform: scale(1.05); }
`;

const PujaIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #EA580C;
`;

const PujaName = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  color: #9A3412;
  margin-bottom: 0.5rem;
`;

const PujaPrice = styled.div`
  color: #EA580C;
  font-weight: 600;
  font-size: 1.1rem;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const Panel = styled.div`
  background: ${props => props.summary ? 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)' : 'white'};
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: ${props => props.summary ? '2px solid #FED7AA' : '1px solid #FED7AA'};
  height: 100%;

  h3 { 
    font-size: 2rem; 
    font-weight: bold; 
    color: #9A3412; 
    margin-bottom: 1.5rem; 
    display: flex; 
    align-items: center; 
    gap: 0.75rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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

const pujas = [
  {
    name: "Rudrabhishek",
    price: 1500,
    icon: "🕉️"
  },
  {
    name: "Navagraha Puja",
    price: 2500,
    icon: "☀️"
  },
  {
    name: "Satyanarayan Katha",
    price: 3000,
    icon: "📿"
  },
  {
    name: "Chandi Path",
    price: 4500,
    icon: "🪔"
  }
];

const timeSlots = [
  "Morning (8 AM – 10 AM)",
  "Midday (11 AM – 1 PM)",
  "Afternoon (2 PM – 4 PM)",
  "Evening (5 PM – 7 PM)"
];

const SpecialPuja = () => {
  const [selectedPuja, setSelectedPuja] = useState(pujas[0]);
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(10);
  const [slot, setSlot] = useState(timeSlots[0]);

  const handleSubmit = () => {
    if (!date) return alert("Please select a date");
    alert(`Puja booking confirmed for ${selectedPuja.name}!`);
  };

  return (
    <MainContainer>
      <HeroSection>
        <HeroTitle initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{ fontSize: '3rem', marginRight: '0.5rem' }}>🪔</span> Sacred Puja Booking
        </HeroTitle>
        <HeroSubtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Book divine pujas for spiritual blessings and prosperity
        </HeroSubtitle>
      </HeroSection>

      <Container>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#9A3412', textAlign: 'center', marginBottom: '2rem' }}>
          Select Your Puja
        </h2>
        
        <PujaRow>
          {pujas.map((puja) => (
            <PujaCard
              key={puja.name}
              onClick={() => setSelectedPuja(puja)}
              selected={selectedPuja.name === puja.name}
              whileHover={{ scale: 1.02 }}
            >
              <PujaIcon>{puja.icon}</PujaIcon>
              <PujaName>{puja.name}</PujaName>
              <PujaPrice>₹{puja.price.toLocaleString()}</PujaPrice>
            </PujaCard>
          ))}
        </PujaRow>

        <FormSection>
          <Panel>
            <h3><span>📅</span> Booking Details</h3>
            
            <FormGrid>
              <FormGroup>
                <label>Puja Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <label>Number of Participants</label>
                <Input 
                  type="number" 
                  min="1" 
                  value={participants} 
                  onChange={(e) => setParticipants(e.target.value)} 
                />
              </FormGroup>
              <FormGroup>
                <label>Preferred Time Slot</label>
                <Select value={slot} onChange={(e) => setSlot(e.target.value)}>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </Select>
              </FormGroup>
            </FormGrid>

            <Button onClick={handleSubmit} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              🙏 Book Sacred Puja
            </Button>
          </Panel>

          <Panel summary>
            <h3><span>📋</span> Puja Summary</h3>
            
            <SummaryCard>
              <div className="row">
                <span className="label">Puja:</span>
                <span className="value">{selectedPuja.name}</span>
              </div>
              <div className="row">
                <span className="label">Price:</span>
                <span className="value">₹{selectedPuja.price.toLocaleString()}</span>
              </div>
            </SummaryCard>
            
            <SummaryCard>
              <div className="row">
                <span className="label">Date:</span>
                <span className="value">{date || "Not selected"}</span>
              </div>
              <div className="row">
                <span className="label">Time Slot:</span>
                <span className="value">{slot}</span>
              </div>
              <div className="row">
                <span className="label">Participants:</span>
                <span className="value">{participants}</span>
              </div>
            </SummaryCard>
            
            <SummaryCard total>
              <div className="row">
                <span className="label">Total Amount:</span>
                <span className="value">₹{selectedPuja.price.toLocaleString()}</span>
              </div>
            </SummaryCard>
          </Panel>
        </FormSection>
      </Container>
    </MainContainer>
  );
};

export default SpecialPuja;