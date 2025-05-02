import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Img1 from "../assets/img/s1.jpg";
import Img2 from "../assets/img/s2.jpg";
import Img3 from "../assets/img/s3.jpg";
import Img4 from "../assets/img/Service4.jpg";
import Img5 from "../assets/img/Service5.jpg";
import Img6 from "../assets/img/Service6.png";

const cards = [
  {
    image: Img6,
    title: "Strategy & Advisory",
    points: [
      "IP Strategy Development",
      "IP Litigation & Enforcement Support",
      "Licensing & IP Agreements",
      "Trade Secret Protection & Confidentiality",
      "IP Exit Strategy & Monetization",
      "Corporate IP Governance & Risk Mitigation",
      "Patent & Trademark Portfolio Optimization",
      "Government and Policy Advocacy"
    ],
  },
  {
    image: Img1,
    title: "IP Lifecycle management",
    points: [
      "IP Audit of the Company",
      "IP Policy and Process setup",
      "IP Portfolio Management",
      "IP valuation",
      "Technology Transfer",
      "Analysis and due diligence"
    ],
  },
  {
    image: Img3,
    title: "IP education and training",
    points: [
      "Custom IP Workshops",
      "IP Law & Policy Updates",
      "IP Commercialization & Licensing Training",
      "IP Dispute Resolution & Enforcement",
      "Sector-Specific IP Training"
    ],
  },
  {
    image: Img5,
    title: "IP solutions",
    points: [
      "Patent",
      "Industrial design",
      "Trademark",
      "Copyright",
      "Geographical indication",
      "National biodiversity authority approval"
    ],
  },
  {
    image: Img4,
    title: "IPR Solutions for Startups",
    points: [
      "IP Strategy & Roadmap",
      "Cost-Effective IP Protection",
      "IP Due Diligence for Investors",
      "IP Licensing & Commercialization",
      "Raising Awareness and Funding with IP",
    ],
  },
  {
    image: Img2,
    title: "Scientific and Technology Solutions",
    points: [
      "Patent Valuations",
      "Drug Discovery and Development",
      "Patent Due Diligence & Variability Analysis",
      "Assessment Of Clinical & Commercial Potential",
      "Competitive Landscape & Industry Trends",
      "Management Consulting",
      "Market Research",
      "Scientific Writing and Editing",
      "Non-Patent Searches and Analysis"
    ],
  }
];

const overlayVariants = {
  initial: { opacity: 0, y: 40 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};
const titleVariants = {
  initial: { y: 0 },
  hover: { y: -20, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};
const pointsVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};
const pointItemVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.27 } },
};

const GridContainer = styled.section`
  width: 100%;
  max-width: 1250px;         
  margin: 3rem auto;
  margin-left: 200px;        
  padding: 0 1rem;
  @media (max-width: 1200px) {
    margin-left: 0;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.3rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: #0047ab;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const CardGrid = styled.div`
  display: grid;
  width: 100%;
  height: 600px;
  min-height: 400px;
  grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
  grid-template-rows: 1fr 1fr;
  gap: 0;
  border-radius: 0;
  overflow: hidden;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 180px);
    height: auto;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 150px);
    height: auto;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  background: ${({ $bgcolor }) => $bgcolor || "#0047ab"};
  overflow: hidden;
  cursor: pointer;
  min-width: 0;
  min-height: 0;
  border-radius: 0;
`;

const CardBg = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ src }) =>
    src
      ? `url(${src}) center/cover no-repeat`
      : "linear-gradient(135deg,#0047ab 0%,#4169e1 100%)"};
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
`;

const CardOverlay = styled(motion.div)`
  position: absolute;
  left: 0; right: 0; bottom: 0; top: 0;
  background: linear-gradient(0deg, rgba(13, 13, 14, 0.92) 60%, rgba(0,71,171,0.15) 100%);
  color: #fff;
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  z-index: 3;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.04em;
  color: #fff;
  z-index: 3;
  position: absolute;
  left: 1.2rem;
  bottom: 1.2rem;
  pointer-events: none;
  text-shadow: 0 2px 12px rgba(0,0,0,0.12);
`;

const CardTitleHover = styled(motion.h3)`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.7rem 0;
  letter-spacing: 0.04em;
  color: #fff;
  z-index: 4;
  position: relative;
  pointer-events: none;
  text-shadow: 0 2px 12px rgba(0,0,0,0.12);
`;

const PointsList = styled(motion.ul)`
  list-style: disc inside;
  margin: 0;
  padding-left: 1rem;
  color: #f3f3f3;
  font-size: 1.01rem;
  font-weight: 400;
`;

const getGridPosition = idx => {
  switch (idx) {
    case 0: return { gridColumn: "1 / 2", gridRow: "1 / 3" }; // left big
    case 1: return { gridColumn: "2 / 3", gridRow: "1 / 2" }; // center top left
    case 2: return { gridColumn: "3 / 4", gridRow: "1 / 2" }; // center top right
    case 3: return { gridColumn: "2 / 3", gridRow: "2 / 3" }; // center bottom left
    case 4: return { gridColumn: "3 / 4", gridRow: "2 / 3" }; // center bottom right
    case 5: return { gridColumn: "4 / 5", gridRow: "1 / 3" }; // right big
    default: return {};
  }
};

export default function InfosysLikeServicesGrid() {
  return (
    <GridContainer>
      <Title>Our Services</Title>
      <CardGrid>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            style={getGridPosition(idx)}
            initial="initial"
            whileHover="hover"
          >
            <CardBg src={card.image} />
            <CardTitle variants={titleVariants}>{card.title}</CardTitle>
            <CardOverlay variants={overlayVariants}>
              <CardTitleHover variants={titleVariants}>{card.title}</CardTitleHover>
              <PointsList variants={pointsVariants}>
                {card.points.map((point, i) => (
                  <motion.li
                    key={i}
                    variants={pointItemVariants}
                    style={{ marginBottom: "0.3rem" }}
                  >
                    {point}
                  </motion.li>
                ))}
              </PointsList>
            </CardOverlay>
          </Card>
        ))}
      </CardGrid>
    </GridContainer>
  );
}
