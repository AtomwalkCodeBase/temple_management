"use client"

import { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const BookPujaContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.background}, rgba(255, 153, 51, 0.05));
`

const HeroSection = styled.section`
  padding: 3rem 0;
  text-align: center;
`

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`

const FormSection = styled.section`
  padding: 2rem 0 4rem;
`

const FormContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: ${(props) => props.theme.shadows.card};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 20px;
    padding: 2rem;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1);
  }
`

const Select = styled.select`
  padding: 1rem;
  border: 2px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1);
  }
`

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 153, 51, 0.1);
  }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
  color: white;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.shadows.button};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 153, 51, 0.4);
  }
`

const PujaOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const PujaOption = styled(motion.div)`
  background: ${(props) =>
    props.selected
      ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.gold})`
      : props.theme.colors.lightGray};
  color: ${(props) => (props.selected ? "white" : props.theme.colors.text)};
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const BookPuja = () => {
  const [selectedPuja, setSelectedPuja] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    temple: "",
    date: "",
    time: "",
    specialRequests: "",
  })

  const pujaTypes = [
    { id: "maha-aarti", name: "Maha Aarti", price: "₹501" },
    { id: "rudrabhishek", name: "Rudrabhishek", price: "₹1001" },
    { id: "lakshmi-puja", name: "Lakshmi Puja", price: "₹751" },
    { id: "hanuman-chalisa", name: "Hanuman Chalisa", price: "₹301" },
    { id: "ganga-aarti", name: "Ganga Aarti", price: "₹401" },
    { id: "special-abhishek", name: "Special Abhishek", price: "₹1501" },
  ]

  const temples = [
    "Jagannath Temple, Puri",
    "Golden Temple, Amritsar",
    "Meenakshi Temple, Madurai",
    "Kedarnath Temple",
    "Tirupati Balaji",
    "Somnath Temple",
    "Vaishno Devi Temple",
    "Kashi Vishwanath Temple",
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Puja booking submitted:", { selectedPuja, ...formData })
    alert("Your puja booking has been submitted successfully! We will contact you shortly.")
  }

  return (
    <BookPujaContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Book Your Sacred Puja
          </HeroTitle>
        </div>
      </HeroSection>

      <FormSection>
        <div className="container">
          <FormContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 style={{ marginBottom: "2rem", textAlign: "center", color: "#2D2D2D" }}>Select Your Puja Type</h3>

            <PujaOptions>
              {pujaTypes.map((puja) => (
                <PujaOption
                  key={puja.id}
                  selected={selectedPuja === puja.id}
                  onClick={() => setSelectedPuja(puja.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h4>{puja.name}</h4>
                  <p style={{ margin: "0.5rem 0", fontSize: "1.2rem", fontWeight: "bold" }}>{puja.price}</p>
                </PujaOption>
              ))}
            </PujaOptions>

            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Select Temple *</Label>
                  <Select name="temple" value={formData.temple} onChange={handleInputChange} required>
                    <option value="">Choose a temple</option>
                    {temples.map((temple, index) => (
                      <option key={index} value={temple}>
                        {temple}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Preferred Date *</Label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Preferred Time</Label>
                  <Select name="time" value={formData.time} onChange={handleInputChange}>
                    <option value="">Select time</option>
                    <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                    <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginBottom: "2rem" }}>
                <Label>Special Requests or Prayers</Label>
                <TextArea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any specific prayers, intentions, or special requirements..."
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selectedPuja}
              >
                Book Puja Now
              </SubmitButton>
            </form>
          </FormContainer>
        </div>
      </FormSection>
    </BookPujaContainer>
  )
}

export default BookPuja
