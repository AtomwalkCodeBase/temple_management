import React, { useState } from 'react';
import styled from 'styled-components';
import { useBlogs } from './hooks/useBlogs';

// Styled Components
const MainWrapper = styled.div`
  background-color: rgb(255 246 247);
`;

const NoResults = styled.p`
  grid-column: span 3;
  text-align: center;
  color: #ff0000;
  font-size: 40px;
  font-weight: 500;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 40px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 15px;
`;

const PostCategory = styled.span`
  font-size: 12px;
  color: #007BFF;
  font-weight: bold;
  text-transform: uppercase;
`;

const PostTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #888;
  margin-top: auto;
`;

const Author = styled.span`
  display: flex;
  align-items: center;
`;

// Renamed from Date to StyledDate to avoid shadowing global Date
const StyledDate = styled.span`
  font-size: 12px;
`;

const Header = styled.div`
  padding: 20px 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: rgba(255, 128, 0, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(255 56 0);
  }
`;

const BlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { blogs, loading, error } = useBlogs();

  if (loading) return <div className="loading">Loading blogs...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const filteredPosts = blogs.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainWrapper>
      <Header>
        <h2 style={{ color: '#454545' }}>Latest Post</h2>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={() => console.log('Searching...')}>Search</SearchButton>
        </SearchBar>
      </Header>
      <PostGrid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((blog) => (
            <PostCard
              key={blog.id}
              onClick={() => {
                window.location.href = `/blog/${blog.id}`;
              }}
            >
              <PostImage src={blog.coverImage} alt={blog.title} />
              <PostContent>
                {/* <PostCategory>{blog.category}</PostCategory> */}
                <PostTitle>{blog.title}</PostTitle>
                <PostFooter>
                  <Author>By Atomwalk team</Author>
                  <StyledDate> {/* Use StyledDate instead of Date */}
                    {blog.publishedAt?.seconds
                      ? new Date(blog.publishedAt.seconds * 1000).toLocaleDateString()
                      : 'No date'}
                  </StyledDate>
                </PostFooter>
              </PostContent>
            </PostCard>
          ))
        ) : (
          <NoResults>No posts found for "{searchQuery}"</NoResults>
        )}
      </PostGrid>
    </MainWrapper>
  );
};

export default BlogPosts;