import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp, getDoc, collection } from 'firebase/firestore';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../News/firebasee';

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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  @media (max-width: 480px) {
    padding: 0.65rem;
    font-size: 0.95rem;
    min-height: 120px;
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

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    .react-datepicker__input-container input {
      padding: 0.65rem;
      font-size: 0.95rem;
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

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
  border-radius: 4px;
  display: block;
`;

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/';

function KnowledgeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    platform: 'linkedin',
    content: '',
    image: '',
    date: null
  });

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const postRef = doc(db, 'posts', id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const postData = postSnap.data();
          const fullImage = postData.image || '';
          const relativeImage = fullImage.replace(/^https?:\/+cdn\.jsdelivr\.net\/gh\/AtomwalkCodeBase\/Blogs@main\/?/i, '');
          
          setFormData({
            platform: postData.platform || 'linkedin',
            content: postData.content || '',
            image: relativeImage,
            date: postData.date ? new Date(postData.date) : null
          });
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        setError('Error loading post: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim()
    }));
    setError(null);
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date
    }));
    setError(null);
  };

  const getFullImageUrl = (path) => {
    if (!path) return '';
    if (/^https:\/\/cdn\.jsdelivr\.net\/gh\/AtomwalkCodeBase\/Blogs@main\//i.test(path)) return path;

    const cleanPath = path.replace(/^https?:\/+cdn\.jsdelivr\.net\/gh\/AtomwalkCodeBase\/Blogs@main\/?/i, '');
    return `${CDN_BASE_URL}${cleanPath}`.replace(/([^:]\/)\/+/g, '$1');
  };

  const validateImageUrl = async (url) => {
    try {
      return await new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        setTimeout(() => resolve(false), 5000);
      });
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { content, date, image, platform } = formData;
    if (!content.trim()) return setError('Content is required.'), setLoading(false);
    if (!date) return setError('Date is required.'), setLoading(false);
    if (!image.trim()) return setError('Image path is required.'), setLoading(false);

    const fullImageUrl = getFullImageUrl(image);
    const isValidImage = await validateImageUrl(fullImageUrl);
    if (!isValidImage) {
      setError('Invalid image URL or path. Please verify the image exists.');
      setLoading(false);
      return;
    }

    try {
      const postRef = id ? doc(db, 'posts', id) : doc(collection(db, 'posts'));
      const postId = postRef.id;

      const postData = {
        platform,
        content: content.trim(),
        image: fullImageUrl,
        date: date.toISOString(),
        engagement: { likes: 0, comments: 0, shares: 0 },
        updatedAt: serverTimestamp()
      };

      await setDoc(postRef, postData);
      navigate(`/knowledgehub/${postId}`);
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{id ? 'Edit Social Post' : 'Create Social Post'}</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Platform</Label>
          <Select name="platform" value={formData.platform} onChange={handleChange} disabled={!!id}>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter/X</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Content</Label>
          <TextArea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Image Path (e.g. Folder Name/image name)</Label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            placeholder="Enter relative path or full URL"
          />
          {formData.image && (
            <ImagePreview
              src={getFullImageUrl(formData.image)}
              alt="Image preview"
              onError={() => setError('Image preview failed to load.')}
            />
          )}
        </FormGroup>

        <FormGroup>
          <Label>Date</Label>
          <DatePickerWrapper>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              required
            />
          </DatePickerWrapper>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : id ? 'Update' : 'Create'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/knowledgehub')}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </form>
    </Container>
  );
}

export default KnowledgeForm;