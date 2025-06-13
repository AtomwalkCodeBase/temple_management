import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebasee';
import styled from 'styled-components';

const Container = styled.div`
  background: #ffffff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
  padding: 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
      linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1));
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px 100px;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 400px;
    padding: 120px 40px 140px;
    gap: 4rem;
  }
`;

const HeroText = styled.div`
  text-align: center;
  margin-top: 70px;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.50rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  @media (min-width: 1024px) {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const MainContent = styled.div`
  background: #f8fafc;
  position: relative;
  z-index: 1;
`;

// Fixed FilterSection - removed sticky positioning and adjusted z-index
const FilterSection = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 2rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
`;

const FilterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 0 40px;
  }
`;

const FilterButton = styled.button`
  padding: 0.75rem 2rem;
  border: 2px solid ${props => props.active ? '#1e40af' : '#e2e8f0'};
  background: ${props => props.active ? '#1e40af' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 100px;

  &:hover {
    border-color: #1e40af;
    background: ${props => props.active ? '#1e40af' : '#f8fafc'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ContentSection = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 20px;

  @media (min-width: 768px) {
    padding: 5rem 40px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
`;

const Card = styled.article`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #f1f5f9;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #e2e8f0;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 2;
`;

const Badge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const BadgeNews = styled(Badge)`
  background: #dc2626;
`;

const BadgeEvent = styled(Badge)`
  background: #059669;
`;

const ContentBox = styled.div`
  padding: 2rem;
`;

const Title = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 1.375rem;
  }
`;

const Tagline = styled.p`
  margin: 0 0 1.5rem;
  color: #64748b;
  font-size: 0.9375rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
`;

const DateText = styled.span`
  color: #94a3b8;
  font-size: 0.8125rem;
  font-weight: 500;
`;

const ReadMore = styled.span`
  color: #1e40af;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #1e40af;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  font-weight: 500;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #dc2626;
  font-size: 1.125rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  margin: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
`;

const NewsEventsList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  // Stats calculation
  const stats = {
    total: items.length,
    news: items.filter(item => item.category?.toLowerCase() === 'news').length,
    events: items.filter(item => item.category?.toLowerCase() === 'event').length
  };

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
        setFilteredItems(itemsList);
      } catch (error) {
        console.error('Error fetching news and events:', error);
        setError('Failed to load news and events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => 
        item.category?.toLowerCase() === activeFilter.toLowerCase()
      ));
    }
  }, [activeFilter, items]);

  const handleCardClick = (id) => navigate(`/news/${id}`);
  
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(id);
    }
  };

  if (loading) {
    return (
      <Container>
        <Loading>
          <LoadingSpinner />
          <LoadingText>Loading latest updates...</LoadingText>
        </Loading>
      </Container>
    );
  }

  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle>LifeIntelect Consultancy</HeroTitle>
            <HeroSubtitle>
              Stay informed with our latest insights, breaking news, and upcoming events. 
              Your trusted source for professional updates and industry developments.
            </HeroSubtitle>
          </HeroText>
          <HeroStats>
            <StatItem>
              <StatNumber>{stats.total}</StatNumber>
              <StatLabel>Total Articles</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats.news}</StatNumber>
              <StatLabel>News Stories</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats.events}</StatNumber>
              <StatLabel>Events</StatLabel>
            </StatItem>
          </HeroStats>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <FilterSection>
          <FilterContainer>
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              All
            </FilterButton>
            <FilterButton
              active={activeFilter === 'news'}
              onClick={() => setActiveFilter('news')}
            >
              News
            </FilterButton>
            <FilterButton
              active={activeFilter === 'event'}
              onClick={() => setActiveFilter('event')}
            >
              Events
            </FilterButton>
          </FilterContainer>
        </FilterSection>

        <ContentSection>
          <SectionHeader>
            <SectionTitle>
              {activeFilter === 'all' ? 'Latest Updates' : 
               activeFilter === 'news' ? 'Recent News' : 'Upcoming Events'}
            </SectionTitle>
            <SectionSubtitle>
              {activeFilter === 'all' 
                ? 'Discover the latest news, insights, and events from Life Intellect'
                : `Browse our collection of ${activeFilter === 'news' ? 'news articles' : 'events'}`
              }
            </SectionSubtitle>
          </SectionHeader>

          {filteredItems.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                {activeFilter === 'news' ? '📰' : activeFilter === 'event' ? '📅' : '📋'}
              </EmptyIcon>
              <EmptyTitle>
                No {activeFilter === 'all' ? 'content' : activeFilter} available
              </EmptyTitle>
              <EmptyDescription>
                We're working on bringing you the latest updates. Check back soon for new content!
              </EmptyDescription>
            </EmptyState>
          ) : (
            <Grid>
              {filteredItems.map((item) => {
                const BadgeComponent =
                  item.category?.toLowerCase() === 'news' ? BadgeNews : BadgeEvent;
                return (
                  <Card
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Read more about ${item.title}`}
                  >
                    <ImageWrapper>
                      <Image
                        src={
                          item.coverImage ||
                          `https://via.placeholder.com/400x240/1e40af/ffffff?text=${encodeURIComponent(item.category || 'Life Intellect')}`
                        }
                        alt={item.title || 'Article image'}
                      />
                      <BadgeContainer>
                        <BadgeComponent>
                          {item.category || 'Article'}
                        </BadgeComponent>
                      </BadgeContainer>
                    </ImageWrapper>
                    <ContentBox>
                      <Title>{item.title || 'Untitled Article'}</Title>
                      <Tagline>{item.tagline || 'Click to read the full article and discover more insights.'}</Tagline>
                      <MetaInfo>
                        <DateText>
                          {item.publishedAt
                            ? item.publishedAt.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Date unavailable'}
                        </DateText>
                        <ReadMore>Read More →</ReadMore>
                      </MetaInfo>
                    </ContentBox>
                  </Card>
                );
              })}
            </Grid>
          )}
        </ContentSection>
      </MainContent>
    </Container>
  );
};

export default NewsEventsList;