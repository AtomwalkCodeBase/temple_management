"use client";
import styled from "styled-components";
import Hero from "../components/Hero";
import FeaturedTemples from "../components/FeaturedTemples";
import Services from "../components/Services";
import UpcomingPujas from "../components/UpcomingPujas";
import Testimonials from "../components/Testimonials";
import StatsSection from "../components/StatsSection";
import NewsletterSection from "../components/NewsletterSection";

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
      <Services />
      <UpcomingPujas />
      <Testimonials />
      <NewsletterSection />
    </HomeContainer>
  );
};

export default Home;
