import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { useBlog } from '../hooks/UseBlog';
import { constructImageUrl } from '../utils/imageUrl';

const getToday = () => {
  const today = new Date();
  // Format as YYYY-MM-DD
  return today.toISOString().split('T')[0];
};

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog, blogContent } = useBlog(id);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    coverImagePath: '',
    date: getToday(),
    sections: [],
    category:''
  });

  useEffect(() => {
    if (id && blog && blogContent) {
      setFormData({
        title: blog.title,
        tagline: blog.tagline,
        coverImagePath: blog.coverImage.replace('https://cdn.jsdelivr.net/gh/AtomwalkCodeBase/Blogs@main/', ''),
        date: blog.date || getToday(),
        sections: blogContent.sections,
        category: blog.category || ''
      });
    }
  }, [id, blog, blogContent]);

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', subtitle: '', contents: [] }]
    }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const addContent = (sectionIndex, type) => {
    const newContent = {
      type,
      data: type === 'paragraph' || type === 'image' ? '' : []
    };

    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          contents: [...section.contents, newContent]
        } : section
      )
    }));
  };

  const removeContent = (sectionIndex, contentIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          contents: section.contents.filter((_, j) => j !== contentIndex)
        } : section
      )
    }));
  };

  const updateContent = (sectionIndex, contentIndex, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          contents: section.contents.map((content, j) =>
            j === contentIndex ? { ...content, data: value } : content
          )
        } : section
      )
    }));
  };

  const handleListItemChange = (sectionIndex, contentIndex, itemIndex, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          contents: section.contents.map((content, j) =>
            j === contentIndex ? {
              ...content,
              data: content.data.map((item, k) => k === itemIndex ? value : item)
            } : content
          )
        } : section
      )
    }));
  };

  const addListItem = (sectionIndex, contentIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          contents: section.contents.map((content, j) =>
            j === contentIndex ? {
              ...content,
              data: [...content.data, '']
            } : content
          )
        } : section
      )
    }));
  };

  const removeListItem = (sectionIndex, contentIndex, itemIndex) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          contents: section.contents.map((content, j) =>
            j === contentIndex ? {
              ...content,
              data: content.data.filter((_, k) => k !== itemIndex)
            } : content
          )
        } : section
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogId = id || doc(collection(db, 'life_blogs')).id;
      const coverImageUrl = constructImageUrl(formData.coverImagePath);

      // Save blog metadata, including date
      await setDoc(doc(db, 'life_blogs', blogId), {
        title: formData.title,
        tagline: formData.tagline,
        coverImage: coverImageUrl,
        category: formData.category,
        date: formData.date 
      });

      // Process sections to convert image paths to full URLs
      const processedSections = formData.sections.map(section => ({
        ...section,
        contents: section.contents.map(content => ({
          ...content,
          data: content.type === 'image' ? constructImageUrl(content.data) : content.data
        }))
      }));

      // Save blog content
      await setDoc(doc(db, 'life_blogs_content', blogId), {
        blogId,
        header: {
          title: formData.title,
          tagline: formData.tagline,
          coverImage: coverImageUrl
        },
        sections: processedSections,
        summary: formData.tagline
      });

      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContentForm = (content, sectionIndex, contentIndex) => {
    switch (content.type) {
      case 'paragraph':
        return (
          <textarea
            value={content.data}
            onChange={(e) => updateContent(sectionIndex, contentIndex, e.target.value)}
            placeholder="Enter paragraph text..."
            rows={4}
          />
        );
      case 'image':
        return (
          <input
            type="text"
            value={content.data}
            onChange={(e) => updateContent(sectionIndex, contentIndex, e.target.value)}
            placeholder="folder/image.jpg"
          />
        );
      case 'bullets':
      case 'steps':
        return (
          <div className="list-items">
            {content.data.map((item, itemIndex) => (
              <div key={itemIndex} className="list-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListItemChange(sectionIndex, contentIndex, itemIndex, e.target.value)}
                  placeholder={`${content.type === 'bullets' ? 'Bullet' : 'Step'} ${itemIndex + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeListItem(sectionIndex, contentIndex, itemIndex)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(sectionIndex, contentIndex)}
              className="add-btn"
            >
              Add {content.type === 'bullets' ? 'Bullet' : 'Step'}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="blog-form" style={{marginTop: 120, marginBottom: 50}}>
      <h2>{id ? 'Edit Blog' : 'Create New Blog'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label>Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label>Cover Image Path (e.g., folder/image.jpg)</label>
          <input
            type="text"
            value={formData.coverImagePath}
            onChange={(e) => setFormData(prev => ({ ...prev, coverImagePath: e.target.value }))}
            placeholder="folder/image.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="Enter category e.g. Web Development"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>

        <div className="sections">
          <h3>Sections</h3>
          {formData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section-form">
              <div className="section-header">
                <h4>Section {sectionIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="remove-btn"
                >
                  Remove Section
                </button>
              </div>

              <div className="form-group">
                <label>Section Title (optional)</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Section Subtitle (optional)</label>
                <input
                  type="text"
                  value={section.subtitle}
                  onChange={(e) => updateSection(sectionIndex, 'subtitle', e.target.value)}
                />
              </div>

              <div className="contents">
                <h5>Content Blocks</h5>
                {section.contents.map((content, contentIndex) => (
                  <div key={contentIndex} className="content-form">
                    <div className="content-header">
                      <span>Type: {content.type}</span>
                      <button
                        type="button"
                        onClick={() => removeContent(sectionIndex, contentIndex)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="content-body">
                      {renderContentForm(content, sectionIndex, contentIndex)}
                    </div>
                  </div>
                ))}
                
                <div className="add-content-buttons">
                  <button type="button" onClick={() => addContent(sectionIndex, 'paragraph')}>
                    Add Paragraph
                  </button>
                  <button type="button" onClick={() => addContent(sectionIndex, 'bullets')}>
                    Add Bullets
                  </button>
                  <button type="button" onClick={() => addContent(sectionIndex, 'steps')}>
                    Add Steps
                  </button>
                  <button type="button" onClick={() => addContent(sectionIndex, 'image')}>
                    Add Image
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button type="button" onClick={addSection} className="add-section-btn">
            Add Section
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Blog' : 'Create Blog')}
          </button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
