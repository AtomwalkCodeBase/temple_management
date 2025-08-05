"use client";
import styled from "styled-components";
import Hero from "../components/Hero";
import FeaturedTemples from "../components/FeaturedTemples";
import Testimonials from "../components/Testimonials";
import DevotionalFeatures from "../components/DevotionalFeatures";
import Information from "../components/Information";
import Background from "../components/Background";
import HelpSection from "../components/HelpSection";
import Chatbot from "../components/Chatbot";

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      {/* <StatsSection /> */}
      <FeaturedTemples />
      <HelpSection />
      <Background />
      <DevotionalFeatures />
      <Testimonials />
      <Information />
      {/* <NewsletterSection /> */}
      <Chatbot />
    </HomeContainer>
  );
};

export default Home;
