import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebasee';
import styled from 'styled-components';
import newsBanner from '../../assets/img/newsevent.png';

const Container = styled.div`
  margin-top: 70px;
  padding: 3rem 0;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
`;

const HeadingNews = styled.h2`
  margin: 0 20px 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -0.025em;
  animation: fadeInSlideUp 1s ease-out forwards;
  background-image: url(${newsBanner});
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  height: 300px;
  border-radius: 20px;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.4);
  display: flex;
  align-items: flex-end;
  text-align: left;

  @media (min-width: 640px) {
    margin: 0 40px 3rem;
    font-size: 2.5rem;
    height: 400px;
    padding: 60px 40px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  border: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 220px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 10px;
`;

const Badge = styled.span`
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(4px);
  color: #ffffff;
`;

const BadgeNews = styled(Badge)`
  background: rgba(33, 150, 243, 0.9);
`;

const BadgeEvent = styled(Badge)`
  background: rgba(76, 175, 80, 0.9);
`;

const ContentBox = styled.div`
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 1.375rem;
  }
`;

const Tagline = styled.p`
  margin: 0 0 1rem;
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: 640px) {
    font-size: 0.9375rem;
  }
`;

const DateText = styled.p`
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;

  @media (min-width: 640px) {
    font-size: 0.8125rem;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: #4b5563;
  font-size: 1.125rem;
  font-weight: 500;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 3rem;
  color: red;
  font-size: 1.125rem;
`;

const NewsEventsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(
          collection(db, 'articles_metadata'),
          orderBy('publishedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          publishedAt: doc.data().publishedAt?.toDate() || null,
        }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching news and events:', error);
        setError('Failed to load news and events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleCardClick = (id) => navigate(`/news/${id}`);
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(id);
    }
  };

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      <HeadingNews>
        Life Intelect <br /> News & Events
      </HeadingNews>
      {items.length === 0 ? (
        <Loading>No News or Events available.</Loading>
      ) : (
        <Grid>
          {items.map((item) => {
            const BadgeComponent =
              item.category?.toLowerCase() === 'news' ? BadgeNews : BadgeEvent;
            return (
              <Card
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.title}`}
              >
                <ImageWrapper>
                  <Image
                    src={
                      item.coverImage ||
                      'https://via.placeholder.com/400x220?text=No+Image'
                    }
                    alt={item.title || 'News image'}
                  />
                </ImageWrapper>
                <ContentBox>
                  <HeaderContainer>
                    <BadgeComponent>
                      {item.category || 'Uncategorized'}
                    </BadgeComponent>
                    <DateText>
                      {item.publishedAt
                        ? item.publishedAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Date unavailable'}
                    </DateText>
                  </HeaderContainer>
                  <Title>{item.title || 'Untitled'}</Title>
                  <Tagline>{item.tagline || 'No description available'}</Tagline>
                </ContentBox>
              </Card>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default NewsEventsList;
