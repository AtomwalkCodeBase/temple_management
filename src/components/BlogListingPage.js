import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

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
  padding: 2rem;
margin-top: 150px;
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
  background: ${props => props.active ? '#1a365d' : 'white'};
  color: ${props => props.active ? 'white' : '#1a365d'};
  border: 1px solid #1a365d;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${props => props.active ? '#1a365d' : '#f0f5ff'};
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1 + 0.5}s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const BlogImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogCategory = styled.span`
  display: inline-block;
  background: #e6f0ff;
  color: #1a365d;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const BlogTitle = styled.h2`
  font-size: 1.4rem;
  color: #1a365d;
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #718096;
  font-size: 0.9rem;
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  color: #1a365d;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #1a365d;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
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
`;

// Mock blog data (replace with actual API calls in production)
const sampleBlogs = [
  {
    id: 1,
    title: "Artificial Intelligence in Education: Transforming Learning Experiences",
    excerpt: "Explore how AI is revolutionizing educational methods and creating personalized learning journeys for students of all ages.",
    category: "Education",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 10, 2025",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "The Future of Digital Healthcare Solutions",
    excerpt: "How technology is improving healthcare accessibility, diagnosis accuracy, and treatment options worldwide.",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 8, 2025",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Smart Cities: Building Sustainable Urban Environments",
    excerpt: "Discover how IoT and data analytics are helping create more efficient, sustainable, and livable cities.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 5, 2025",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Cybersecurity Best Practices for Remote Work",
    excerpt: "Essential security measures to protect your data and systems in the era of distributed workforces.",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563163528458-35a13fd1f05b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 1, 2025",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Blockchain Applications Beyond Cryptocurrency",
    excerpt: "Exploring innovative uses of blockchain technology in supply chain, healthcare, and government services.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Feb 25, 2025",
    readTime: "7 min read"
  },
  {
    id: 6,
    title: "Mental Health in the Digital Age",
    excerpt: "How technology can both impact and improve mental wellbeing in our increasingly connected world.",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Feb 20, 2025",
    readTime: "6 min read"
  }
];

const BlogListingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Categories derived from blog data
  const categories = ['All', ...new Set(sampleBlogs.map(blog => blog.category))];
  
  // Initialize blogs from sample data (replace with API call)
  useEffect(() => {
    setBlogs(sampleBlogs);
    setFilteredBlogs(sampleBlogs);
  }, []);
  
  // Filter blogs based on category and search term
  useEffect(() => {
    let results = blogs;
    
    if (activeCategory !== 'All') {
      results = results.filter(blog => blog.category === activeCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        blog.excerpt.toLowerCase().includes(term) ||
        blog.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredBlogs(results);
  }, [activeCategory, searchTerm, blogs]);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const resetFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
  };
  
  return (
    <PageContainer>
      <Header>
        <Title>LifeIntelect Blog</Title>
        <Subtitle>
          Discover insights, innovations, and inspiration in technology, healthcare, education, and more.
        </Subtitle>
      </Header>
      
      <FilterSection>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <FilterButton 
              key={category}
              active={activeCategory === category}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </FilterButton>
          ))}
        </div>
        <SearchInput 
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FilterSection>
      
      {filteredBlogs.length > 0 ? (
        <BlogGrid>
          {filteredBlogs.map((blog, index) => (
            <BlogCard key={blog.id} index={index}>
              <BlogImageContainer>
                <BlogImage src={blog.image} alt={blog.title} />
              </BlogImageContainer>
              <BlogContent>
                <BlogCategory>{blog.category}</BlogCategory>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <span>{blog.date} • {blog.readTime}</span>
                  <ReadMoreButton to={`/blog/${blog.id}`}>Read More</ReadMoreButton>
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>No blogs found matching your criteria</EmptyStateText>
          <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default BlogListingPage;