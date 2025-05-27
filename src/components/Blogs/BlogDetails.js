import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBlog } from '../hooks/UseBlog';

// Styled Components
const Container = styled.div`
  background: linear-gradient(135deg, #312e81, #818cf8);
  padding: 60px 100px 0 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 600px;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 40px 20px 0 20px;
    min-height: 300px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding-right: 20px;
  margin-top: 70px;

  @media (max-width: 768px) {
    padding-right: 0;
    margin-top: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 10px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subheading = styled.p`
  color: #ffb3ff;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const MetaInfo = styled.p`
  font-size: 0.9rem;
  color: #ddd;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  text-align: center;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    aspect-ratio: 3/2;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    max-height: none; 
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    img {
      max-height: none; 
    }
  }
`;

const BlogContent = styled.div`
  background-color: white;
  padding: 40px 100px;
  color: #333;

  h2 {
    margin-top: 40px;
    font-size: 2rem;
    font-weight: 600;
    color: rgb(75, 0, 130);
  }

  h3 {
    margin-top: 20px;
    font-size: 2rem;
    font-weight: 600;
    color: rgb(75, 0, 130);
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  ul, ol {
    margin-left: 20px;
    margin-bottom: 15px;
  }

  li {
    margin-bottom: 8px;
  }

  img.content-image {
    display: block;
    max-width: 600px;
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 24px auto;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    object-fit: contain;
  }

  @media (max-width: 768px) {
    padding: 20px 10px;

    img.content-image {
      max-width: 100%;
      max-height: 200px;
    }
  }
`;

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, blogContent, loading, error } = useBlog(id);

  if (loading) return <div className="loading">Loading blog...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!blog || !blogContent) return <div className="error">Blog not found</div>;

  const renderContent = (content) => {
    switch (content.type) {
      case 'paragraph':
        return <p>{content.data}</p>;
      case 'bullets':
        return (
          <ul>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case 'steps':
        return (
          <ol>
            {content.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        );
      case 'image':
        return <img src={content.data} alt="" className="content-image" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: 'white', margin: 0, padding: 0 }}>
      <Container>
        <Content>
          <Heading>{blogContent.header.title}</Heading>
          <Subheading>{blogContent.header.tagline}</Subheading>
          <MetaInfo>
            By {blog.author} | Published on {blog.date}
          </MetaInfo>
        </Content>
        <ImageWrapper>
          <img
            src={blogContent.header.coverImage}
            alt={blogContent.header.title}
          />
        </ImageWrapper>
      </Container>

      <BlogContent>
        {blogContent.sections.map((section, index) => (
          <section key={index} className="blog-section">
            {section.title && <h2>{section.title}</h2>}
            {section.subtitle && <h3>{section.subtitle}</h3>}
            <div className="section-content">
              {section.contents.map((content, contentIndex) => (
                <div key={contentIndex} className="content-block">
                  {renderContent(content)}
                </div>
              ))}
            </div>
          </section>
        ))}
      </BlogContent>
    </div>
  );
};

export default BlogDetail;