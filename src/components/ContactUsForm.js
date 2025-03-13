import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Header = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FormSection = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #444;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CountrySelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e4e4e4;
  border-radius: 8px 0 0 8px;
  font-size: 0.95rem;
  background-color: white;
  width: 80px;
`;

const PhoneInput = styled(Input)`
  border-radius: 0 8px 8px 0;
  border-left: none;
  flex: 1;
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  font-size: 0.95rem;
  height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #000;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 0.95rem;
  color: #444;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  animation: ${fadeIn} 1s ease-out;
`;

const ContactMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactMethodTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
`;

const ContactMethodText = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 1px solid #eaeaea;
  text-decoration: none;
  color: #222;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
    transform: translateX(5px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #f2f2f2;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  ${({ $pulse }) => $pulse && css`
    animation: ${pulse} 2s infinite;
  `}
  
  ${ContactLink}:hover & {
    background-color: #000;
    color: white;
  }
`;

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: []
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => {
        const services = [...prev.services];
        if (checked) {
          services.push(value);
        } else {
          const index = services.indexOf(value);
          if (index > -1) {
            services.splice(index, 1);
          }
        }
        return { ...prev, services };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
    alert('Form submitted!');
  };
  
  return (
    <Container>
      <Header>
        <Title>Contact our team</Title>
        <Subtitle>
          Got any questions about the product or scaling on our platform? We're here to help.
          Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
        </Subtitle>
      </Header>
      
      <FormSection>
        <Form onSubmit={handleSubmit}>
          <InputRow>
            <FormGroup>
              <Label htmlFor="firstName">First name</Label>
              <Input 
                type="text" 
                id="firstName" 
                name="firstName" 
                placeholder="First name" 
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="lastName">Last name</Label>
              <Input 
                type="text" 
                id="lastName" 
                name="lastName" 
                placeholder="Last name" 
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormGroup>
          </InputRow>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="you@company.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">Phone number</Label>
            <PhoneInputWrapper>
              <CountrySelect id="country" name="country">
                <option value="US">US</option>
                <option value="UK">UK</option>
                <option value="AU">AU</option>
                <option value="CA">CA</option>
              </CountrySelect>
              <PhoneInput 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+1 (555) 000-0000" 
                value={formData.phone}
                onChange={handleChange}
              />
            </PhoneInputWrapper>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea 
              id="message" 
              name="message" 
              placeholder="Leave us a message..." 
              value={formData.message}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Services</Label>
            <CheckboxGrid>
              <CheckboxGroup>
                <Checkbox 
                  type="checkbox" 
                  id="website" 
                  name="services" 
                  value="Website design"
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="website">Website design</CheckboxLabel>
              </CheckboxGroup>
              
              <CheckboxGroup>
                <Checkbox 
                  type="checkbox" 
                  id="content" 
                  name="services" 
                  value="Content creation"
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="content">Content creation</CheckboxLabel>
              </CheckboxGroup>
              
              <CheckboxGroup>
                <Checkbox 
                  type="checkbox" 
                  id="ux" 
                  name="services" 
                  value="UX design"
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="ux">UX design</CheckboxLabel>
              </CheckboxGroup>
              
              <CheckboxGroup>
                <Checkbox 
                  type="checkbox" 
                  id="strategy" 
                  name="services" 
                  value="Strategy & consulting"
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="strategy">Strategy & consulting</CheckboxLabel>
              </CheckboxGroup>
              
              <CheckboxGroup>
                <Checkbox 
                  type="checkbox" 
                  id="research" 
                  name="services" 
                  value="User research"
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="research">User research</CheckboxLabel>
              </CheckboxGroup>
              
              <CheckboxGroup>
                <Checkbox 
                  type="checkbox" 
                  id="other" 
                  name="services" 
                  value="Other"
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="other">Other</CheckboxLabel>
              </CheckboxGroup>
            </CheckboxGrid>
          </FormGroup>
          
          <SubmitButton type="submit">Send message</SubmitButton>
        </Form>
      </FormSection>
      
      <ContactInfoSection>
        <ContactMethod>
          <ContactMethodTitle>Chat with us</ContactMethodTitle>
          <ContactMethodText>Speak to our friendly team via live chat.</ContactMethodText>
          
          <ContactLink href="#" title="Start a live chat">
            <IconWrapper $pulse>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </IconWrapper>
            Start a live chat
          </ContactLink>
          
          <ContactLink href="mailto:support@company.com" title="Send us an email">
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </IconWrapper>
            Shoot us an email
          </ContactLink>
          
          <ContactLink href="https://twitter.com/company" target="_blank" rel="noopener noreferrer" title="Message us on X">
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
              </svg>
            </IconWrapper>
            Message us on X
          </ContactLink>
        </ContactMethod>
        
        <ContactMethod>
          <ContactMethodTitle>Call us</ContactMethodTitle>
          <ContactMethodText>Call our team Mon-Fri from 8am to 5pm.</ContactMethodText>
          
          <ContactLink href="tel:+15550000000" title="Call our team">
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </IconWrapper>
            +1 (555) 000-0000
          </ContactLink>
        </ContactMethod>
        
        <ContactMethod>
          <ContactMethodTitle>Visit us</ContactMethodTitle>
          <ContactMethodText>Chat to us in person at our Melbourne HQ.</ContactMethodText>
          
          <ContactLink href="https://maps.google.com" target="_blank" rel="noopener noreferrer" title="Visit our office">
            <IconWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </IconWrapper>
            100 Smith Street, Collingwood VIC 3066
          </ContactLink>
        </ContactMethod>
      </ContactInfoSection>
    </Container>
  );
};

export default ContactUsForm;



