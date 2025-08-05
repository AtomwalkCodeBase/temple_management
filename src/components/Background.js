import React from "react";
import styled from "styled-components";
import temple01 from "../assets/img/temple_01.png";
import temple02 from "../assets/img/temple_02.png";
import temple03 from "../assets/img/temple_03.png";
import temple04 from "../assets/img/temple_04.png";

const Section = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #fff;
`;

const BackgroundImage = styled.div`
  /* position: absolute; */
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
  height: 100vh;
  width: 100%;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-position-y: 30%;
`;

const CardTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #000000;
  margin-bottom: 16px;
`;

const LearnMoreButton = styled.button`
  background: #ebcf89;
  color: #333333;
  border: none;
  border-radius: 9999px;
  padding: 12px 28px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d4b876;
    transform: scale(1.02);
  }
`;

const RestorationSection = styled.section`
  background: #fff;
  padding: 60px 0;
  display: flex;
  justify-content: center;
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
`;

const RestorationText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RestorationTitle = styled.h2`
  font-family: "Lora", serif;
  font-weight: 500;
  font-size: 40px;
  line-height: 48px;
  color: #2d253f;
  margin-bottom: 2rem;
`;

const RestorationParagraph = styled.p`
  font-family: "Lora", serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 34px;
  color: rgb(67, 63, 76);
  margin-bottom: 1.5rem;
  text-align: left;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RestorationImage = styled.img`
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  max-height: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const TempleScienceCard = styled.div`
  position: absolute;
  top: 65%;
  right: 6%;
  transform: translateY(-50%);
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const TempleCardLeft = styled.div`
  position: absolute;
  top: 10%;
  left: 8%;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const TempleCardRight = styled.div`
  position: absolute;
  top: 48%;
  right: 4%;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const CardSubtitle = styled.p`
  font-family: "Lora", serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #55525a;
  margin-bottom: 28px;
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
        {/* No CloudOverlay here */}
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
