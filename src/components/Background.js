import React from "react";
import styled from "styled-components";
import temple01 from "../assets/img/temple_01.png";
import temple02 from "../assets/img/temple_02.png";
import temple03 from "../assets/img/GoldenTemple.png";
import temple04 from "../assets/img/Murudeshwar_Temple.png";

const Section = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #fff;
`;

const BackgroundImage = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TempleImage = styled.div`
  height: 120vh;
  min-height: 500px;
  width: 100%;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position-y: 30%;

  @media (max-width: 768px) {
    min-height: 400px;
    background-position-y: center;
  }
`;

const CardTitle = styled.h2`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

const LearnMoreButton = styled.button`
  background: #ebcf89;
  color: #333333;
  border: none;
  border-radius: 9999px;
  padding: 12px 28px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d4b876;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 16px;
  }
`;

const RestorationSection = styled.section`
  background: #fff;
  padding: 60px 0;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const RestorationContainer = styled.div`
  max-width: 1140px;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 48px;
  align-items: center;
  padding: 0 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 24px;
  }
`;

const RestorationText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: 1;

  @media (max-width: 900px) {
    order: 2;
  }
`;

const RestorationTitle = styled.h2`
  line-height: 48px;
  color: #2d253f;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 1.5rem;
  }
`;

const RestorationParagraph = styled.p`
  font-weight: 400;
  font-size: 22px;
  line-height: 34px;
  color: rgb(67, 63, 76);
  margin-bottom: 1.5rem;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 1rem;
  }
`;

const RestorationImage = styled.img`
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  max-height: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  order: 2;

  @media (max-width: 900px) {
    order: 1;
    max-height: 350px;
  }
`;

const TempleCardBase = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
  width: 480px;
  max-width: 90%;
  margin: 20px;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    transform: none;
    width: calc(100% - 40px);
    padding: 30px;
    margin: 20px auto;
  }
`;

const TempleScienceCard = styled(TempleCardBase)`
  position: absolute;
  top: 65%;
  right: 6%;
  transform: translateY(-50%);

  @media (max-width: 1024px) {
    right: 4%;
    width: 400px;
  }

  @media (max-width: 768px) {
    margin-top: -60px;
  }
`;

const TempleCardLeft = styled(TempleCardBase)`
  position: absolute;
  top: 10%;
  left: 8%;

  @media (max-width: 1024px) {
    left: 4%;
    width: 400px;
  }

  @media (max-width: 768px) {
    margin-top: -60px;
  }
`;

const TempleCardRight = styled(TempleCardBase)`
  position: absolute;
  top: 48%;
  right: 4%;

  @media (max-width: 1024px) {
    right: 4%;
    width: 400px;
  }

  @media (max-width: 768px) {
    margin-top: -60px;
  }
`;

const CardSubtitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #55525a;
  margin-bottom: 28px;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
  }
`;

const MobileCardContainer = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const Background = () => {
  return (
    <>
      <Section>
        <BackgroundImage>
          <TempleImage imageUrl={temple01} />
        </BackgroundImage>
        <TempleScienceCard>
          <CardTitle>Science Behind Hindu Temples</CardTitle>
          <CardSubtitle>
            Discover the Ancient Science of Temple Architecture and Vaastu
            Shastras.
          </CardSubtitle>
          <LearnMoreButton>LEARN MORE</LearnMoreButton>
        </TempleScienceCard>
      </Section>

      <RestorationSection>
        <RestorationContainer>
          <RestorationText>
            <RestorationTitle>
              Not Anyone Can Restore Ancient Temples
            </RestorationTitle>
            <RestorationParagraph>
              Temple architecture is an entire field of knowledge on its own and
              is based upon deep scientific and spiritual principles. Various
              texts like the Agamas and Shilpa Sastras teach the principles of
              temple architecture. Renovation cannot and must not be done by
              traditional contractors who have no regard towards the ancient
              texts/methodologies.
            </RestorationParagraph>
            <RestorationParagraph>
              Instead, highly-qualified, trained, and established temple
              architects, or sthapathis as they are known, must undertake the
              renovation of these ancient temples so that the subtle energies do
              not get disturbed or ruined.
            </RestorationParagraph>
            <RestorationParagraph>
              Behind Every Temple only utilizes these highly trained individuals
              to ensure 100% authentic renovations are done.
            </RestorationParagraph>
          </RestorationText>
          <RestorationImage src={temple02} alt="Ancient ruined temple" />
        </RestorationContainer>
      </RestorationSection>

      <Section>
        <BackgroundImage>
          <TempleImage imageUrl={temple03} />
        </BackgroundImage>
        <MobileCardContainer>
          <TempleCardLeft>
            <CardTitle>Completed Temple Renovations</CardTitle>
            <CardSubtitle>
              Explore some of the completed temple renovation projects!
            </CardSubtitle>
            <LearnMoreButton>LEARN MORE</LearnMoreButton>
          </TempleCardLeft>
        </MobileCardContainer>
        <TempleCardLeft>
          <CardTitle>Completed Temple Renovations</CardTitle>
          <CardSubtitle>
            Explore some of the completed temple renovation projects!
          </CardSubtitle>
          <LearnMoreButton>LEARN MORE</LearnMoreButton>
        </TempleCardLeft>
      </Section>

      <Section>
        <BackgroundImage>
          <TempleImage imageUrl={temple04} />
        </BackgroundImage>
        <MobileCardContainer>
          <TempleCardRight>
            <CardTitle>Upcoming Temple Projects</CardTitle>
            <CardSubtitle>
              Discover temples that are currently under restoration and how you
              can contribute!
            </CardSubtitle>
            <LearnMoreButton>LEARN MORE</LearnMoreButton>
          </TempleCardRight>
        </MobileCardContainer>
        <TempleCardRight>
          <CardTitle>Upcoming Temple Projects</CardTitle>
          <CardSubtitle>
            Discover temples that are currently under restoration and how you
            can contribute!
          </CardSubtitle>
          <LearnMoreButton>LEARN MORE</LearnMoreButton>
        </TempleCardRight>
      </Section>
    </>
  );
};

export default Background;
