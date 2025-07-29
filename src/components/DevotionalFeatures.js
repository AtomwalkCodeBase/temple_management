import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 4.5rem 0 3.5rem 0;
  background: #fff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 1000;
  color: #111;
  margin-bottom: 1.1rem;
  letter-spacing: -1px;
  line-height: 1.12;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.22rem;
  color: #444;
  margin-bottom: 3.2rem;
  font-weight: 400;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.2rem 3.8rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 1.1rem;
`;

const FeatureIconBox = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: 2.1rem;
  background: ${({ color }) => color || '#F4A300'};
  color: #fff;
  margin-bottom: 0.2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.45rem;
  font-weight: 950;
  color: #111;
  margin-bottom: 0;
  margin-top: 0;
`;

const FeatureDesc = styled.p`
  font-size: 1.04rem;
  color: #444;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
  margin-top: 0;
`;

const features = [
  {
    icon: "🛕",
    color: "#F4A300",
    title: "Digital Temple",
    desc: "Carry your temple in your pocket and feel the divine presence anytime, anywhere.",
  },
  {
    icon: "📅",
    color: "#E86A33",
    title: "Puja Booking",
    desc: "Book sevas and rituals online with ease and personalized Sankalp details.",
  },
  {
    icon: "💰",
    color: "#A259FF",
    title: "Easy Donations",
    desc: "Offer your support securely and receive instant digital receipts.",
  },
  {
    icon: "📩",
    color: "#2EC4B6",
    title: "Devotee Connect",
    desc: "Send blessings, aarti timings, and festival updates directly to devotees.",
  },
  {
    icon: "🔔",
    color: "#FFB703",
    title: "Ritual Alerts",
    desc: "Get reminders for aartis, fasts, and sacred festivals every day.",
  },
  {
    icon: "🌸",
    color: "#FF6F61",
    title: "Virtual Seva",
    desc: "Light a diya, offer flowers, and stay connected with devotion from anywhere.",
  },
];

const DevotionalFeatures = () => (
  <Section>
    <Title>One App for all your devotional needs</Title>
    <Subtitle>
      Sri Mandir brings these amazing features for you, get these features for free and start your devotional journey now.
    </Subtitle>
    <FeaturesGrid>
      {features.map((feature, idx) => (
        <FeatureItem key={idx}>
          <FeatureIconBox color={feature.color}>{feature.icon}</FeatureIconBox>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDesc>{feature.desc}</FeatureDesc>
        </FeatureItem>
      ))}
    </FeaturesGrid>
  </Section>
);

export default DevotionalFeatures; 