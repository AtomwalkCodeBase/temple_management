import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 5rem 0 5rem 0;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled.h2`
  font-family: 'Lora', serif;
  font-weight: 500;
  font-size: 44px;
  line-height: 54px;
  color: #2d253f;
  text-align: center;
  margin-bottom: 3.5rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #2d253f;
  border-radius: 24px;
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 340px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
`;

const StepTitle = styled.h3`
  font-family: 'Lora', serif;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  color: rgb(235, 207, 137);
  margin-bottom: 1.3rem;
`;

const CardDescription = styled.p`
  font-family: 'Lora', serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
  color: rgb(217, 231, 230);
  margin-bottom: 2.2rem;
`;

const CTAButton = styled.button`
  background: #ebcf89;
  color: #232136;
  border: none;
  padding: 0.85rem 2.2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 10px rgba(235, 207, 137, 0.10);
  &:hover {
    background: #ffe7a0;
    box-shadow: 0 4px 18px rgba(235, 207, 137, 0.18);
  }
`;

const helpSteps = [
  {
    title: "Donate",
    description: "Help us directly restore ancient temples by contributing to verified projects rooted in dharma and tradition.",
    buttonText: "Donate Now"
  },
  {
    title: "Volunteer",
    description: "Join hands on-site or remotely—assist with temple events, education, documentation, and outreach.",
    buttonText: "Volunteer"
  },
  {
    title: "Share",
    description: "Amplify our mission. Share stories, spread awareness, and inspire others to reconnect with Sanatan Dharma.",
    buttonText: "Share"
  }
];

const HelpSection = () => {
  return (
    <Section>
      <Container>
        <Title>3 Ways You Can Help Restore Temples & Protect Dharma</Title>
        <CardsGrid>
          {helpSteps.map((step, idx) => (
            <Card key={step.title}>
              <StepTitle>{step.title}</StepTitle>
              <CardDescription>{step.description}</CardDescription>
              <CTAButton>{step.buttonText}</CTAButton>
            </Card>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  );
};

export default HelpSection; 