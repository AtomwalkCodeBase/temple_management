import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebasee';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const CoverImage = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;

  img {
    margin-top: 50px;
    width: 100%;
    height: 500px;
    object-fit: contain;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);

    @media (max-width: 768px) {
      height: 400px;
    }

    @media (max-width: 480px) {
      height: 300px;
    }
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
  background: ${(props) => (props.category === 'news' ? '#2196f3' : '#4caf50')};
  color: white;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .tagline {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 1.125rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  .date {
    color: #999;
    font-size: 0.875rem;

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;

  .rich-text-content {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #333;
     text-align: justify;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }

    h1, h2, h3 {
      color: #333;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 2rem;

      @media (max-width: 768px) {
        font-size: 1.75rem;
      }

      @media (max-width: 480px) {
        font-size: 1.5rem;
      }
    }

    h2 {
      font-size: 1.75rem;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }

      @media (max-width: 480px) {
        font-size: 1.25rem;
      }
    }

    h3 {
      font-size: 1.5rem;

      @media (max-width: 768px) {
        font-size: 1.25rem;
      }

      @media (max-width: 480px) {
        font-size: 1.1rem;
      }
    }

    p {
      margin: 1rem 0;
    }

    ul, ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    ul {
      list-style-type: disc;
    }

    ol {
      list-style-type: decimal;
    }

    li {
      margin: 0.5rem 0;
    }

    .ql-indent-1 {
      margin-left: 2rem;
    }

    .ql-indent-2 {
      margin-left: 4rem;
    }

    .ql-indent-3 {
      margin-left: 6rem;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1rem 0;
    }
  }
`;

const Message = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => (props.error ? '#f44336' : '#666')};
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;


const NewsEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const [metadataDoc, contentDoc] = await Promise.all([
          getDoc(doc(db, 'articles_metadata', id)),
          getDoc(doc(db, 'articles_content', id))
        ]);

        if (metadataDoc.exists() && contentDoc.exists()) {
          const content = contentDoc.data();
          const fullContent = content.chunks ? content.chunks.join('') : content.content;
          const sanitizedContent = sanitizeHtml(fullContent, {
            allowedTags: ['p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'br'],
            allowedAttributes: {
              a: ['href'],
              img: ['src', 'alt']
            }
          });

          setItem({
            id,
            ...metadataDoc.data(),
            content: sanitizedContent,
            publishedAt: metadataDoc.data().publishedAt?.toDate()
          });
        } else {
          navigate('/news-events');
        }
      } catch (error) {
        console.error('Error fetching news/event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  if (loading) return <Message>Loading...</Message>;
  if (!item) return <Message error>Item not found</Message>;

  return (
    <Container>
      <Header>
        <CoverImage>
          <img src={item.coverImage} alt={item.title} />
          <Badge category={item.category?.toLowerCase()}>
            {item.category}
          </Badge>
        </CoverImage>
        <HeaderContent>
          <h1>{item.title}</h1>
          <p className="tagline">{item.tagline}</p>
          <p className="date">
            {item.publishedAt?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </HeaderContent>
      </Header>

      <Content>
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </Content>
    </Container>
  );
};

export default NewsEventDetail;
