import { useState, useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { Send, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

// Animations
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0);
  }
`

// Styled Components
const ContactSection = styled.section`
  --primary: hsl(222.2, 47.4%, 11.2%);
  --primary-rgb: 34, 41, 57;
  --primary-foreground: hsl(210, 40%, 98%);
  --secondary: hsl(210, 40%, 96.1%);
  --secondary-foreground: hsl(222.2, 47.4%, 11.2%);
  --muted: hsl(210, 40%, 96.1%);
  --muted-foreground: hsl(215.4, 16.3%, 46.9%);
  --accent: hsl(210, 40%, 96.1%);
  --accent-foreground: hsl(222.2, 47.4%, 11.2%);
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(222.2, 47.4%, 11.2%);
  --border: hsl(214.3, 31.8%, 91.4%);
  --input: hsl(214.3, 31.8%, 91.4%);
  --ring: hsl(222.2, 84%, 4.9%);

  .dark & {
    --primary: hsl(210, 40%, 98%);
    --primary-rgb: 236, 242, 254;
    --primary-foreground: hsl(222.2, 47.4%, 11.2%);
    --secondary: hsl(217.2, 32.6%, 17.5%);
    --secondary-foreground: hsl(210, 40%, 98%);
    --muted: hsl(217.2, 32.6%, 17.5%);
    --muted-foreground: hsl(215, 20.2%, 65.1%);
    --accent: hsl(217.2, 32.6%, 17.5%);
    --accent-foreground: hsl(210, 40%, 98%);
    --card: hsl(222.2, 84%, 4.9%);
    --card-foreground: hsl(210, 40%, 98%);
    --border: hsl(217.2, 32.6%, 17.5%);
    --input: hsl(217.2, 32.6%, 17.5%);
    --ring: hsl(212.7, 26.8%, 83.9%);
  }

  padding: 6rem 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
`

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transform: translateY(20px);
  
  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--muted-foreground);
  max-width: 600px;
  margin: 0 auto;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const ContactForm = styled.form`
  background-color: var(--card);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
  opacity: 0;
  transform: translateX(-30px);
  
  &.animate {
    animation: ${slideInLeft} 0.8s forwards;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  transform: translateY(10px);
  
  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--card-foreground);
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--input);
  background-color: transparent;
  color: var(--card-foreground);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--input);
  background-color: transparent;
  color: var(--card-foreground);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease;
  width: 100%;
  opacity: 0;
  
  &.animate {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  
  &.animate {
    animation: ${slideInRight} 0.8s forwards;
  }
`

const InfoCard = styled.div`
  background-color: var(--card);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border: 1px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease, transform 0.5s ease;
  opacity: 0;
  transform: translateY(20px);
  transition-delay: ${props => props.$delay || '0s'};
  
  &.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
`

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  animation: ${pulse} 2s infinite;
`

const InfoContent = styled.div`
  flex: 1;
`

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--card-foreground);
`

const InfoText = styled.p`
  color: var(--muted-foreground);
  font-size: 0.95rem;
`

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #3b82f6;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: gap 0.3s ease;
  
  &:hover {
    gap: 0.5rem;
  }
`

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Refs for scroll animation targets
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const formGroups = useRef([])
  const infoCards = useRef([])
  const submitButtonRef = useRef(null)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formState)
    alert("Your message has been sent! We will get back to you soon.")
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // Observe all elements that need animation
    if (headerRef.current) observer.observe(headerRef.current)
    if (formRef.current) observer.observe(formRef.current)
    if (infoRef.current) observer.observe(infoRef.current)
    if (submitButtonRef.current) observer.observe(submitButtonRef.current)

    formGroups.current.forEach(el => {
      if (el) observer.observe(el)
    })

    infoCards.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <ContactSection>
      <ContactHeader ref={headerRef}>
        <Title>Get In Touch</Title>
        <Subtitle>
          Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
        </Subtitle>
      </ContactHeader>

      <ContactGrid>
        <ContactForm ref={formRef} onSubmit={handleSubmit}>
          <FormGroup
            ref={el => formGroups.current[0] = el}
            $delay="0.1s"
          >
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </FormGroup>

          <FormGroup
            ref={el => formGroups.current[1] = el}
            $delay="0.2s"
          >
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </FormGroup>

          <FormGroup
            ref={el => formGroups.current[2] = el}
            $delay="0.3s"
          >
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
              placeholder="How can we help you?"
            />
          </FormGroup>

          <FormGroup
            ref={el => formGroups.current[3] = el}
            $delay="0.4s"
          >
            <Label htmlFor="message">Your Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              placeholder="Tell us more about your project, needs, or questions..."
            />
          </FormGroup>

          <SubmitButton
            ref={submitButtonRef}
            type="submit"
          >
            <span>Send Message</span>
            <Send size={16} />
          </SubmitButton>
        </ContactForm>

        <ContactInfo ref={infoRef}>
          <InfoCard
            ref={el => infoCards.current[0] = el}
            $delay="0.2s"
          >
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Email Us</InfoTitle>
              <InfoText>Our friendly team is here to help with any questions.</InfoText>
              <ContactLink href="mailto:support@lifeintelect.com">
                support@lifeintelect.com
                <ArrowRight size={14} />
              </ContactLink>
            </InfoContent>
          </InfoCard>

          <InfoCard
            ref={el => infoCards.current[1] = el}
            $delay="0.4s"
          >
            <IconWrapper>
              <Phone size={20} />
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Call Us</InfoTitle>
              <InfoText>
                <div>Telephone: +(91)-9591600666</div>
                <div>Office Landline: 91-080-28476777</div>
              </InfoText>
              <ContactLink href="tel:+919591600666">
                +(91)-9591600666
                <ArrowRight size={14} />
              </ContactLink>
            </InfoContent>
          </InfoCard>

          <InfoCard
            ref={el => infoCards.current[2] = el}
            $delay="0.6s"
          >
            <IconWrapper>
              <MapPin size={20} />
            </IconWrapper>
            <InfoContent>
              <InfoTitle>Visit Us</InfoTitle>
              <InfoText>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Corporate Address</div>
                <div>Lifeintelect Consultancy Pvt. Ltd</div>
                <div>Gopalan Millennium Tower, 1st Floor, No 133,</div>
                <div>ITPL Main Road, Kundalahalli, Brookefield,</div>
                <div>Bengaluru, Karnataka 560037</div>

                <div style={{ fontWeight: 'bold', marginTop: '16px', marginBottom: '8px' }}>Branch Address</div>
                <div>Lifeintelect Consultancy Pvt. Ltd</div>
                <div>2100 East County Line Rd,</div>
                <div>Ardmore, PA, 19003, USA</div>
              </InfoText>
              <ContactLink href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                View on Map
                <ArrowRight size={14} />
              </ContactLink>
            </InfoContent>
          </InfoCard>
        </ContactInfo>
      </ContactGrid>
    </ContactSection>
  )
}