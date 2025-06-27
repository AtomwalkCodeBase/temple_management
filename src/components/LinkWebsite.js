import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Data for links
const links = [
  {
    name: 'World Intellectual Property Organisation (WIPO)',
    url: 'https://www.wipo.int/portal/en/index.html',
    description: 'Global forum for intellectual property services, policy, information, and cooperation.',
    region: 'Global',
  },
  {
    name: 'United States Patent and Trademark Office (USPTO)',
    url: 'https://www.uspto.gov/',
    description: 'Federal agency for granting U.S. patents and registering trademarks.',
    region: 'North America',
  },
  {
    name: 'Indian Patent Office (IPO)',
    url: 'https://ipindia.gov.in/',
    description: 'Administers the Indian patent system and promotes innovation.',
    region: 'India',
  },
  {
    name: 'European Patent Office (EPO)',
    url: 'https://www.epo.org/en/searching-for-patents/technical/espacenet',
    description: 'Provides patent protection across European member states.',
    region: 'Europe',
  },
  {
    name: 'Korean Intellectual Property Office (KIPO)',
    url: 'https://www.kipo.go.kr/en/MainApp?c=1000',
    description: 'Manages intellectual property rights in South Korea.',
    region: 'Asia',
  },
  {
    name: 'Japan Patent Office (JPO)',
    url: 'https://www.jpo.go.jp/e/',
    description: 'Oversees patent, trademark, and design rights in Japan.',
    region: 'Asia',
  },
  {
    name: 'Intellectual Property Office of Singapore (IPOS)',
    url: 'https://www.ipos.gov.sg/',
    description: "Drives Singapore's IP ecosystem and innovation growth.",
    region: 'Asia',
  },
  {
    name: 'National Biodiversity Authority (NBA)',
    url: 'http://nbaindia.org/',
    description: 'Regulates biodiversity conservation and use in India.',
    region: 'India',
  },
];

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 700px;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  opacity: 0;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.8s ease-out 0.4s forwards;
  opacity: 0;
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: ${(props) => (props.active ? '#1a365d' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#1a365d')};
  border: 1px solid #1a365d;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${(props) => (props.active ? '#1a365d' : '#f0f5ff')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.3);
  }
`;

const SearchInput = styled.input`
  padding: 0.6rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  width: 250px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a365d;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
    width: 300px;
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const LinkCard = styled.a`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: ${(props) => props.index * 0.1 + 0.5}s;
  opacity: 0;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.3);
  }
`;

const LinkContent = styled.div`
  padding: 1.5rem;
`;

const LinkRegion = styled.span`
  display: inline-block;
  background: #e6f0ff;
  color: #1a365d;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const LinkTitle = styled.h2`
  font-size: 1.4rem;
  color: #1a365d;
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const LinkDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  grid-column: 1 / -1;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 12px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const ResetButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #1a365d;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2c5282;
    animation: ${pulse} 0.5s ease-in-out;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.3);
  }
`;

// const Footer = styled.footer`
//   margin-top: auto;
//   background: #1a365d;
//   color: white;
//   text-align: center;
//   padding: 1.5rem;
//   font-size: 0.9rem;
// `;

const App = () => {
  const [filteredLinks, setFilteredLinks] = useState(links);
  const [activeRegion, setActiveRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Regions derived from link data
  const regions = ['All', ...new Set(links.map((link) => link.region))];

  // Filter links based on region and search term
  useEffect(() => {
    let results = links;

    if (activeRegion !== 'All') {
      results = results.filter((link) => link.region === activeRegion);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (link) =>
          link.name.toLowerCase().includes(term) ||
          link.description.toLowerCase().includes(term)
      );
    }

    setFilteredLinks(results);
  }, [activeRegion, searchTerm]);

  const handleRegionChange = (region) => {
    setActiveRegion(region);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const resetFilters = () => {
    setActiveRegion('All');
    setSearchTerm('');
  };

  return (
    <PageContainer>
      <Header>
        <Title>Intellectual Property Resources</Title>
        <Subtitle>
          Explore global intellectual property and biodiversity organizations
        </Subtitle>
      </Header>

      <FilterSection>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {regions.map((region) => (
            <FilterButton
              key={region}
              active={activeRegion === region}
              onClick={() => handleRegionChange(region)}
            >
              {region}
            </FilterButton>
          ))}
        </div>
        <SearchInput
          type="text"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FilterSection>

      {filteredLinks.length > 0 ? (
        <LinkGrid>
          {filteredLinks.map((link, index) => (
            <LinkCard
              key={index}
              index={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkContent>
                <LinkRegion>{link.region}</LinkRegion>
                <LinkTitle>{link.name}</LinkTitle>
                <LinkDescription>{link.description}</LinkDescription>
              </LinkContent>
            </LinkCard>
          ))}
        </LinkGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>No organizations found matching your criteria</EmptyStateText>
          <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>
        </EmptyState>
      )}

      
    </PageContainer>
  );
};

export default App;
