import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 4rem 0;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ReadAllLink = styled.a`
  color: #FF6B35;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #E55A2B;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ bgColor }) => bgColor};
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #fff;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.8rem;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex: 1;
`;

const CardReadAll = styled.a`
  color: #FF6B35;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.3s ease;

  &:hover {
    color: #E55A2B;
    text-decoration: underline;
  }
`;

const categories = [
  {
    id: 1,
    title: "Aarti",
    description: "Find the lyrics and significance of popular Aartis to enrich your daily worship rituals.",
    imageUrl: "https://localnation.co.in/cdn/shop/products/YW2t9tqdzm.jpg?v=1665294178",
    bgColor: "#FF9933",
    link: "/aarti"
  },
  {
    id: 2,
    title: "Chalisa",
    description: "Read powerful Chalisas dedicated to various deities. Chant to seek blessings and divine grace.",
    imageUrl: "https://img.freepik.com/free-photo/view-ancient-scroll-writing-documenting-history_23-2151751702.jpg?semt=ais_hybrid&w=740",
    bgColor: "#E86A33",
    link: "/chalisa"
  },
  {
    id: 3,
    title: "Mantra",
    description: "Discover potent Vedic mantras to bring peace, focus, and spiritual strength into your life.",
    imageUrl: "https://moditoys.com/cdn/shop/articles/The-Power-of-Chanting-Vedic-Mantras-Explained.jpg?v=1739479315",
    bgColor: "#3B5998",
    link: "/mantra"
  },
  {
    id: 4,
    title: "Blogs",
    description: "Read inspiring devotional blogs on fasting tips, festivals, Vedic stories, and spiritual journeys.",
    imageUrl: "https://img.freepik.com/premium-vector/blog-icons-design_18591-34330.jpg",
    bgColor: "#6C5CE7",
    link: "/blogs"
  }
];

const Information = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Title>Discover Devotional Wisdom from Sanatan Dharma</Title>
          <Subtitle>
          Explore enlightening articles on festivals, fasts, mantras, rituals, and holistic living — rooted in the timeless teachings of Sanatan Dharma.
          </Subtitle>
          <ReadAllLink href="/blogs">
          Explore All Articles →
          </ReadAllLink>
        </Header>

        <CardsGrid>
          {categories.map((category) => (
            <Card key={category.id}>
              <CardImage bgColor={category.bgColor} imageUrl={category.imageUrl}>
              </CardImage>
              <CardContent>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
                <CardReadAll href={category.link}>
                  Read All →
                </CardReadAll>
              </CardContent>
            </Card>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  );
};

export default Information; 