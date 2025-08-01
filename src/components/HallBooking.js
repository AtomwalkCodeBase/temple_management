"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HallBookingContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`;

const SectionIcon = styled.div`
  font-size: 2rem;
  color: #D2691E;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  font-weight: 600;
  color: #8B4513;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #D2691E, #8B4513);
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

const HallsPanel = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.1);
  border: 1px solid rgba(210, 105, 30, 0.2);
  height: fit-content;
`;

const PanelTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #8B4513;
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
    background: linear-gradient(90deg, #D2691E, #8B4513);
  }
`;

const HallCard = styled.div`
  background: rgba(255, 248, 231, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(210, 105, 30, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.15);
  }
`;

const HallImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 2px solid rgba(210, 105, 30, 0.2);
`;

const HallName = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #8B4513;
  margin-bottom: 0.5rem;
`;

const HallCapacity = styled.p`
  color: #D2691E;
  font-weight: 500;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const SelectButton = styled(motion.button)`
  background: linear-gradient(90deg, #D2691E, #8B4513);
  color: white;
  border: 2px solid white;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.75rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #8B4513;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(210, 105, 30, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #8B4513;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #D2691E;
    box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(210, 105, 30, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #8B4513;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #D2691E;
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

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 248, 231, 0.6);
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(210, 105, 30, 0.15);
  font-family: 'Poppins', sans-serif;
`;

const SummaryIcon = styled.span`
  font-size: 1.5rem;
  color: #D2691E;
`;

const SummaryText = styled.div`
  flex: 1;
`;

const SummaryLabel = styled.div`
  font-weight: 600;
  color: #8B4513;
  margin-bottom: 0.25rem;
`;

const SummaryValue = styled.div`
  color: #D2691E;
  font-weight: 500;
`;

const TotalAmount = styled.div`
  background: rgba(255, 248, 231, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(210, 105, 30, 0.2);
  margin: 2rem 0;
  font-family: 'Poppins', sans-serif;
`;

const TotalLabel = styled.div`
  font-weight: 700;
  color: #8B4513;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const TotalValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #D2691E;
`;

const BookNowButton = styled(motion.button)`
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(90deg, #D2691E, #8B4513);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(139, 69, 19, 0.4);
    background: linear-gradient(90deg, #8B4513, #D2691E);
  }
`;

const HallBooking = () => {
  const [selectedHall, setSelectedHall] = useState(null);
  const [bookingDate, setBookingDate] = useState("2024-04-26");
  const [bookingTime, setBookingTime] = useState("12:00");
  const [purpose, setPurpose] = useState("Engagement ceremony");

  const halls = [
    {
      id: 1,
      name: "Shiv Mandapam",
      capacity: "200 people",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 5000
    },
    {
      id: 2,
      name: "Ganesh Sabha",
      capacity: "150 people",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 4000
    },
    {
      id: 3,
      name: "Durga Darbar",
      capacity: "300 people",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      price: 6000
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleHallSelect = (hall) => {
    setSelectedHall(hall);
  };

  return (
    <HallBookingContainer>
      <SectionHeader>
        <SectionIcon>🏛️</SectionIcon>
        <SectionTitle>Hall Booking</SectionTitle>
      </SectionHeader>

      <ContentGrid>
        <HallsPanel
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PanelTitle>Available Halls</PanelTitle>
          
          {halls.map((hall) => (
            <HallCard key={hall.id}>
              <HallImage src={hall.image} alt={hall.name} />
              <HallName>{hall.name}</HallName>
              <HallCapacity>Capacity {hall.capacity}</HallCapacity>
              <SelectButton
                onClick={() => handleHallSelect(hall)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Select
              </SelectButton>
            </HallCard>
          ))}

          <FormGroup>
            <Label>Booking Date & Time</Label>
            <Input 
              type="date" 
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </FormGroup>

          <FormGroup>
            <Label>Time</Label>
            <Select 
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            >
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
              <option value="18:00">06:00 PM</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Purpose</Label>
            <Input 
              type="text" 
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter event purpose"
            />
          </FormGroup>
        </HallsPanel>

        <SummaryPanel
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PanelTitle>Booking Summary</PanelTitle>
          
          {selectedHall && (
            <>
              <SummaryItem>
                <SummaryIcon>🏛️</SummaryIcon>
                <SummaryText>
                  <SummaryLabel>Selected Hall</SummaryLabel>
                  <SummaryValue>{selectedHall.name}</SummaryValue>
                </SummaryText>
              </SummaryItem>

              <SummaryItem>
                <SummaryIcon>👥</SummaryIcon>
                <SummaryText>
                  <SummaryLabel>Capacity</SummaryLabel>
                  <SummaryValue>{selectedHall.capacity}</SummaryValue>
                </SummaryText>
              </SummaryItem>
            </>
          )}

          <SummaryItem>
            <SummaryIcon>📅</SummaryIcon>
            <SummaryText>
              <SummaryLabel>Date</SummaryLabel>
              <SummaryValue>{formatDate(bookingDate)}</SummaryValue>
            </SummaryText>
          </SummaryItem>

          <SummaryItem>
            <SummaryIcon>🕒</SummaryIcon>
            <SummaryText>
              <SummaryLabel>Time</SummaryLabel>
              <SummaryValue>{formatTime(bookingTime)}</SummaryValue>
            </SummaryText>
          </SummaryItem>

          <SummaryItem>
            <SummaryIcon>🎯</SummaryIcon>
            <SummaryText>
              <SummaryLabel>Event Type</SummaryLabel>
              <SummaryValue>{purpose}</SummaryValue>
            </SummaryText>
          </SummaryItem>

          <TotalAmount>
            <TotalLabel>Total Amount</TotalLabel>
            <TotalValue>₹ {selectedHall ? selectedHall.price.toLocaleString() : '0'}</TotalValue>
          </TotalAmount>

          <BookNowButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedHall}
          >
            Book Now
          </BookNowButton>
        </SummaryPanel>
      </ContentGrid>
    </HallBookingContainer>
  );
};

export default HallBooking; 