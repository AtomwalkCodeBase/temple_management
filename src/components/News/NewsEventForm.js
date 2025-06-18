  import React, { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import { doc, setDoc, serverTimestamp, getDoc, collection } from 'firebase/firestore';
  import { db } from './firebasee';
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  import sanitizeHtml from 'sanitize-html';
  import styled from 'styled-components';

  const MAX_CHUNK_SIZE = 900000;

  const Container = styled.div`
    margin-top: 80px;
    padding: 2rem 1rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
      padding: 1.5rem 1rem;
    }

    @media (max-width: 480px) {
      margin-top: 60px;
      padding: 1rem 0.5rem;
    }
  `;

  const Title = styled.h2`
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  `;

  const FormGroup = styled.div`
    margin-bottom: 1.5rem;
  `;

  const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  `;

  const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    @media (max-width: 480px) {
      padding: 0.65rem;
      font-size: 0.95rem;
    }
  `;

  const Select = styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    @media (max-width: 480px) {
      padding: 0.65rem;
      font-size: 0.95rem;
    }
  `;

  const EditorWrapper = styled.div`
    margin-bottom: 1rem;

    .ql-editor {
      min-height: 400px;

      @media (max-width: 768px) {
        min-height: 350px;
      }

      @media (max-width: 480px) {
        min-height: 300px;
      }
    }
  `;

  const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  `;

  const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 0.75rem 1.5rem;
    background: ${({ loading }) => (loading ? '#90caf9' : '#2196f3')};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${({ loading }) => (loading ? 'not-allowed' : 'pointer')};
    font-size: 1rem;

    @media (max-width: 480px) {
      padding: 0.65rem 1.25rem;
      font-size: 0.95rem;
      width: 100%;
    }
  `;

  const CancelButton = styled.button`
    margin-top: 20px;
    padding: 0.75rem 1.5rem;
    background: #f5f5f5;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    @media (max-width: 480px) {
      padding: 0.65rem 1.25rem;
      font-size: 0.95rem;
      width: 100%;
    }
  `;


  function NewsEventForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      title: '',
      tagline: '',
      coverImagePath: '',
      category: 'news',
      content: ''
    });

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    };

    const formats = [
      'header', 'bold', 'italic', 'underline',
      'list', 'link', 'image'
    ];

    useEffect(() => {
      if (id) {
        const fetchItem = async () => {
          try {
            setLoading(true);
            const [metadataDoc, contentDoc] = await Promise.all([
              getDoc(doc(db, 'articles_metadata', id)),
              getDoc(doc(db, 'articles_content', id))
            ]);

            if (metadataDoc.exists() && contentDoc.exists()) {
              const metadata = metadataDoc.data();
              const content = contentDoc.data();
              const fetchedContent = content.chunks
                ? content.chunks.filter(chunk => typeof chunk === 'string').join('')
                : (typeof content.content === 'string' ? content.content : '');

              const sanitizedContent = sanitizeHtml(fetchedContent, {
                allowedTags: ['p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'br'],
                allowedAttributes: {
                  a: ['href'],
                  img: ['src', 'alt']
                }
              });

              setFormData({
                title: metadata.title || '',
                tagline: metadata.tagline || '',
                coverImagePath: metadata.coverImage?.replace('https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/', '') || '',
                category: metadata.category || 'news',
                content: sanitizedContent
              });
            } else {
              alert('Item not found.');
            }
          } catch (error) {
            console.error('Error fetching news/event:', error);
            alert('Error loading item.');
          } finally {
            setLoading(false);
          }
        };
        fetchItem();
      }
    }, [id]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleContentChange = (content) => {
      setFormData(prev => ({
        ...prev,
        content: content || ''
      }));
    };

    const splitContentIntoChunks = (content) => {
      if (!content) return [''];
      const chunks = [];
      let currentChunk = '';
      const paragraphs = content.split('</p>').filter(p => p.trim());

      for (let paragraph of paragraphs) {
        paragraph = paragraph + (paragraph ? '</p>' : '');
        if ((currentChunk + paragraph).length > MAX_CHUNK_SIZE) {
          if (currentChunk) chunks.push(currentChunk);
          currentChunk = paragraph;
        } else {
          currentChunk += paragraph;
        }
      }

      if (currentChunk) chunks.push(currentChunk);
      return chunks;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const articleId = id || doc(collection(db, 'articles_metadata')).id;
        const coverImageUrl = `https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/${formData.coverImagePath}`;

        const sanitizedContent = sanitizeHtml(formData.content, {
          allowedTags: ['p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'br'],
          allowedAttributes: {
            a: ['href'],
            img: ['src', 'alt']
          }
        });

        const contentChunks = splitContentIntoChunks(sanitizedContent);

        await setDoc(doc(db, 'articles_metadata', articleId), {
          title: formData.title,
          tagline: formData.tagline,
          coverImage: coverImageUrl,
          category: formData.category,
          publishedAt: serverTimestamp()
        });

        await setDoc(doc(db, 'articles_content', articleId), {
          articleId,
          type: 'richText',
          updatedAt: serverTimestamp(),
          totalChunks: contentChunks.length,
          chunks: contentChunks
        });

        navigate(`/news/${articleId}`);
      } catch (error) {
        console.error('Error saving news/event:', error);
        alert('Error saving item.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Container>
        <Title>{id ? 'Edit News/Event' : 'Create News/Event'}</Title>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Category</Label>
            <Select name="category" value={formData.category} onChange={handleChange} disabled={!!id}>
              <option value="news">News</option>
              <option value="event">Event</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Tagline</Label>
            <Input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Cover Image Path (e.g., folder/image.jpg)</Label>
            <Input
              type="text"
              name="coverImagePath"
              value={formData.coverImagePath}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <EditorWrapper>
            <Label>Content</Label>
            {loading ? (
              <p>Loading content...</p>
            ) : (
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
              />
            )}
          </EditorWrapper>

          <ButtonGroup>
            <SubmitButton type="submit" disabled={loading} loading={loading}>
              {loading ? 'Saving...' : id ? 'Update' : 'Create'}
            </SubmitButton>
            <CancelButton type="button" onClick={() => navigate('/news')}>Cancel</CancelButton>
          </ButtonGroup>
        </form>
      </Container>
    );
  }

  export default NewsEventForm;
