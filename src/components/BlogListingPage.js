import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './Blogs/firebase';

// Sample useBlogs hook with real-time listener
const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Set up real-time listener for blogs collection
    const unsubscribe = onSnapshot(
      collection(db, 'life_blogs'),
      (snapshot) => {
        const blogData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure publishedAt is handled if not a Firestore Timestamp
          publishedAt: doc.data().publishedAt
            ? { seconds: doc.data().publishedAt.seconds || Math.floor(new Date(doc.data().publishedAt).getTime() / 1000) }
            : null,
          // Provide defaults for missing fields
          title: doc.data().title || 'Untitled',
          category: doc.data().category || 'Uncategorized',
          coverImage: doc.data().coverImage || doc.data().image || 'https://via.placeholder.com/350x200', // Fallback image
          excerpt: doc.data().excerpt || ''
        }));
        console.log('Fetched blogs:', blogData); // Debug fetched data
        setBlogs(blogData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Failed to fetch blogs');
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return { blogs, loading, error };
};

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
  cursor: pointer;
  
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
const PostTitle = styled.h2`
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

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #718096;
  font-size: 0.9rem;
`;

const Author = styled.span`
  color: #718096;
`;

const StyledDate = styled.span`
  color: #718096;
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

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #1a365d;
  padding: 3rem;
`;

const ErrorText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #ff4d4d;
  padding: 3rem;
`;

const BlogListingPage = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { blogs, loading, error } = useBlogs();

  // Log blogs for debugging
  console.log('Blogs:', blogs);

  // Categories derived from blog data
  const categories = ['All', ...new Set(blogs.map(blog => blog.category || 'Uncategorized'))];

  // Filter blogs based on category and search term
  useEffect(() => {
    let results = blogs;

    if (activeCategory !== 'All') {
      results = results.filter(blog => (blog.category || 'Uncategorized') === activeCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(blog => 
        (blog.title && typeof blog.title === 'string' && blog.title.toLowerCase().includes(term)) || 
        (blog.excerpt && typeof blog.excerpt === 'string' && blog.excerpt.toLowerCase().includes(term)) ||
        (blog.category && typeof blog.category === 'string' && blog.category.toLowerCase().includes(term))
      );
    }

    setFilteredBlogs(results);
    console.log('Filtered Blogs:', results); // Debug filtered results
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

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <Title>LifeIntelect Blog</Title>
          <Subtitle>
            Discover insights, innovations, and inspiration in technology, healthcare, education, and more.
          </Subtitle>
        </Header>
        <LoadingText>Loading blogs...</LoadingText>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header>
          <Title>LifeIntelect Blog</Title>
          <Subtitle>
            Discover insights, innovations, and inspiration in technology, healthcare, education, and more.
          </Subtitle>
        </Header>
        <ErrorText>Error: {error}</ErrorText>
      </PageContainer>
    );
  }

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
            <BlogCard 
              key={blog.id} 
              index={index}
              onClick={() => {
                window.location.href = `/blog/${blog.id}`;
              }}
            >
              <BlogImageContainer>
                <BlogImage 
                  src={blog.coverImage || blog.image || 'https://via.placeholder.com/350x200'} 
                  alt={blog.title || 'Blog post'} 
                />
              </BlogImageContainer>
              <BlogContent>
                <BlogCategory>{blog.category}</BlogCategory>
                <PostTitle>{blog.title || 'Untitled'}</PostTitle>
                <BlogExcerpt>{blog.tagline}</BlogExcerpt>
                <PostFooter>
                  <Author>By LifeIntelect team</Author>
                  <StyledDate>
                    {blog.date ? blog.date : 'No date'}
                  </StyledDate>
                </PostFooter>
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