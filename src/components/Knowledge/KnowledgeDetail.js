import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Share2, Copy, Check } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { db } from '../News/firebasee';
import { doc, getDoc } from 'firebase/firestore';

const platformConfig = {
  linkedin: {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    bgColor: '#0077b5',
    textColor: '#ffffff',
  },
  twitter: {
    name: 'Twitter/X',
    icon: <FaTwitter />,
    bgColor: '#1da1f2',
    textColor: '#ffffff',
  },
  facebook: {
    name: 'Facebook',
    icon: <FaFacebook />,
    bgColor: '#1877f2',
    textColor: '#ffffff',
  },
  instagram: {
    name: 'Instagram',
    icon: <FaInstagram />,
    bgColor: '#E1306C',
    textColor: '#ffffff',
  },
};

const KnowledgeHubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost({
            id: postSnap.id,
            ...postSnap.data(),
            engagement: postSnap.data().engagement || { likes: 0, comments: 0, shares: 0 },
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const formatDate = (dateInput) => {
    if (!dateInput) return 'Unknown date';
    let date;
    if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else if (dateInput.toDate) {
      date = dateInput.toDate();
    } else {
      date = new Date(dateInput);
    }
    if (isNaN(date.getTime())) return 'Invalid date';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
      .format(date)
      .replace(/(\d+),/, '$1,');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.content.slice(0, 100);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: () => {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      },
    };

    if (platform === 'copy') {
      shareUrls.copy();
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleBackNavigation = () => {
    navigate('/knowledgehub');
  };

  // Styles (aligned with KnowledgeHub)
  const containerStyle = {
    marginTop: '115px',
    minHeight: '100vh',
    background: '#ffffff',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const mainContainerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: '24px',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  };

  const topNavigationStyle = {
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    padding: '20px 40px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const backButtonStyle = {
    padding: '10px 20px',
    background: '#f8f9fa',
    color: '#495057',
    border: '2px solid #e9ecef',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  };

  const heroSectionStyle = {
    position: 'relative',
    height: '400px',
    overflow: 'hidden',
    background: '#f8f9fa',
  };

  const coverImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '12px 12px 0 0',
  };

  const imageFallbackStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '48px',
    color: '#6c757d',
  };

  const platformBadgeStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '8px 16px',
    background: platformConfig[post?.platform]?.bgColor || '#3498db',
    color: '#ffffff',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const contentSectionStyle = {
    padding: '40px',
  };

  const postHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  };

  const platformIconStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    background: platformConfig[post?.platform]?.bgColor || '#3498db',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  };

  const postMetaStyle = {
    flex: 1,
  };

  const platformNameStyle = {
    fontWeight: '600',
    fontSize: '18px',
    color: '#2c3e50',
  };

  const postDateStyle = {
    fontSize: '14px',
    color: '#6c757d',
  };

  const postContentStyle = {
    color: '#495057',
    lineHeight: '1.7',
    fontSize: '16px',
    marginBottom: '24px',
  };

  const engagementStatsStyle = {
    display: 'flex',
    gap: '24px',
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '24px',
    padding: '16px 0',
    borderTop: '1px solid #e9ecef',
    borderBottom: '1px solid #e9ecef',
  };

  const statItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const shareSectionStyle = {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e9ecef',
  };

  const shareTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '16px',
  };

  const shareButtonsStyle = {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  };

  const shareButtonStyle = (isActive) => ({
    padding: '10px 20px',
    background: isActive ? '#27ae60' : '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
  });

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '16px',
    color: '#6c757d',
  };

  const errorStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '16px',
    color: '#dc2626',
    textAlign: 'center',
    padding: '40px',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={mainContainerStyle}>
          <div style={loadingStyle}>
            <div
              style={{
                border: '4px solid #e9ecef',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
                marginRight: '16px',
              }}
            ></div>
            Loading post...
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={containerStyle}>
        <div style={mainContainerStyle}>
          <div style={errorStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
            Post not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        <div style={topNavigationStyle}>
          <button
            style={backButtonStyle}
            onClick={handleBackNavigation}
            onMouseEnter={(e) => {
              e.target.style.background = '#e9ecef';
              e.target.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f8f9fa';
              e.target.style.transform = 'translateX(0)';
            }}
            aria-label="Back to Knowledge Hub"
          >
            <span>←</span>
            Back to Knowledge Hub
          </button>
        </div>

        <div style={heroSectionStyle}>
          {post.image && !imageError ? (
            <img src={post.image} alt="Post content" style={coverImageStyle} onError={() => setImageError(true)} />
          ) : (
            <div style={imageFallbackStyle}>🖼️</div>
          )}
          <div style={platformBadgeStyle}>
            {platformConfig[post.platform].icon}
            <span>{platformConfig[post.platform].name}</span>
          </div>
        </div>

        <div style={contentSectionStyle}>
          <div style={postHeaderStyle}>
            <div style={platformIconStyle}>{platformConfig[post.platform].icon}</div>
            <div style={postMetaStyle}>
              <div style={platformNameStyle}>{platformConfig[post.platform].name}</div>
              <div style={postDateStyle}>{formatDate(post.date)}</div>
            </div>
          </div>

          <p style={postContentStyle}>{post.content}</p>

          <div style={shareSectionStyle}>
            <div style={shareTitleStyle}>Share this post</div>
            <div style={shareButtonsStyle}>
              <button
                onClick={() => handleShare('twitter')}
                style={shareButtonStyle(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = '#3498db';
                }}
                aria-label="Share on Twitter"
              >
                <FaTwitter size={14} />
                Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                style={shareButtonStyle(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = '#3498db';
                }}
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin size={14} />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('facebook')}
                style={shareButtonStyle(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = '#2980b9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = '#3498db';
                }}
                aria-label="Share on Facebook"
              >
                <FaFacebook size={14} />
                Facebook
              </button>
              <button
                onClick={() => handleShare('copy')}
                style={shareButtonStyle(copied)}
                onMouseEnter={(e) => {
                  if (!copied) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.background = '#2980b9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = '#3498db';
                  }
                }}
                aria-label="Copy link"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHubDetail;