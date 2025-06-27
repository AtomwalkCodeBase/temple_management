import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Share2, Copy, Check } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { db } from '../News/firebasee';
import { collection, getDocs } from 'firebase/firestore';
import { SiX } from "react-icons/si";
import knowledgebg from '../../assets/img/knowledgebg.jpg'; 
// knowledgebg 

const KnowledgeHub = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedPostId, setCopiedPostId] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          engagement: doc.data().engagement || { likes: 0, comments: 0, shares: 0 }
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const platformConfig = {
    linkedin: {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      bgColor: '#0077b5',
      textColor: '#ffffff'
    },
    twitter: {
      name: 'Twitter/X',
      icon: <SiX size={20} />,
      bgColor: '#1da1f2',
      textColor: '#ffffff'
    },
    facebook: {
      name: 'Facebook',
      icon: <FaFacebook />,
      bgColor: '#1877f2',
      textColor: '#ffffff'
    },
    instagram: {
      name: 'Instagram',
      icon: <FaInstagram />,
      bgColor: '#E1306C',
      textColor: '#ffffff'
    }
  };

  // Format date to "YYYY, MMMM DD"
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
      day: 'numeric'
    }).format(date).replace(/(\d+),/, '$1,');
  };

  // Get the first image for display
  const getDisplayImage = (post) => {
    if (post.images && Array.isArray(post.images) && post.images.length > 0) {
      return post.images[0]; // Return the first image from the images array
    }
    return post.image || null; // Fallback to single image or null
  };

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(post => post.platform === activeFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        platformConfig[post.platform].name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.slice(0, visiblePosts);
  }, [posts, activeFilter, searchTerm, visiblePosts]);

  const handleShare = (postId, action, platform = null) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const url = `${window.location.origin}/knowledgehub/${postId}`;
    const title = post.content.slice(0, 100);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: () => {
        navigator.clipboard.writeText(url).then(() => {
          setCopiedPostId(postId);
          setTimeout(() => setCopiedPostId(null), 2000);
        }).catch(err => console.error('Failed to copy:', err));
      }
    };

    if (action === 'copy') {
      shareUrls.copy();
    } else if (platform && shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 6);
  };

  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const totalEngagement = posts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0
    );
    const platforms = [...new Set(posts.map(post => post.platform))].length;
    
    return {
      totalPosts: `${totalPosts}`,
      totalEngagement: `${(totalEngagement / 1000).toFixed(1)}K`,
      platforms,
      satisfaction: '100%'
    };
  }, [posts]);

  const containerStyle = {
    marginTop: 'clamp(60px, 15vw, 115px)',
    minHeight: '100vh',
    background: '#ffffff',
    padding: 'clamp(10px, 3vw, 20px)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const mainContainerStyle = {
    maxWidth: 'min(1400px, 95vw)',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    borderRadius: 'clamp(12px, 2vw, 24px)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  };

  // const headerStyle = {
  //   background: 'linear-gradient(135deg, #0b09e8, #3498db)',
  //   color: 'white',
  //   padding: 'clamp(30px, 6vw, 60px) clamp(20px, 4vw, 40px)',
  //   textAlign: 'center',
  //   position: 'relative',
  //   overflow: 'hidden'
  // };
  const headerStyle = {
  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${knowledgebg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white', // safe with dark overlay
  padding: 'clamp(30px, 6vw, 60px) clamp(20px, 4vw, 40px)',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden'
};

  const headerContentStyle = {
    position: 'relative',
    zIndex: 2
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: '700',
    marginBottom: 'clamp(8px, 2vw, 16px)',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.02em'
  };

  const subtitleStyle = {
    fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
    opacity: 0.9,
    maxWidth: 'min(600px, 90%)',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  const filterSectionStyle = {
    padding: 'clamp(20px, 5vw, 40px)',
    background: '#f8f9fa',
    borderBottom: '1px solid #e9ecef'
  };

  const filterControlsStyle = {
    display: 'flex',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
    flexWrap: 'wrap',
    gap: 'clamp(12px, 3vw, 24px)'
  };

  const filterTabsStyle = {
    display: 'flex',
    gap: 'clamp(6px, 1.5vw, 12px)',
    flexWrap: 'wrap',
    justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
  };

  const getFilterTabStyle = (isActive) => ({
    padding: 'clamp(10px, 2vw, 14px) clamp(14px, 3vw, 28px)',
    background: isActive ? '#3498db' : 'white',
    color: isActive ? 'white' : '#495057',
    border: `2px solid ${isActive ? '#3498db' : '#e9ecef'}`,
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: 'clamp(12px, 2vw, 14px)',
    outline: 'none',
    boxShadow: isActive ? '0 8px 25px rgba(52, 152, 219, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.05)'
  });

  const searchContainerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: window.innerWidth < 768 ? '100%' : 'clamp(200px, 25vw, 320px)',
    margin: window.innerWidth < 768 ? '0 auto' : '0'
  };

  const searchInputStyle = {
    width: '100%',
    padding: 'clamp(10px, 2vw, 14px) clamp(40px, 8vw, 50px) clamp(10px, 2vw, 14px) clamp(10px, 2vw, 20px)',
    border: '2px solid #e9ecef',
    borderRadius: '50px',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: 'white'
  };

  const searchIconStyle = {
    position: 'absolute',
    right: 'clamp(10px, 2vw, 18px)',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d'
  };

  const gridStyle = {
    padding: 'clamp(25px, 5vw, 50px) clamp(20px, 4vw, 40px)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 90vw), 1fr))',
    gap: 'clamp(16px, 3vw, 32px)'
  };

  const getPostCardStyle = () => ({
    background: 'white',
    borderRadius: 'clamp(10px, 2vw, 20px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
    border: '1px solid #f0f0f0',
    cursor: 'pointer'
  });

  const postHeaderStyle = {
    padding: 'clamp(12px, 3vw, 24px)',
    background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 2vw, 16px)',
    borderBottom: '1px solid #f0f0f0'
  };

  const getPlatformIconStyle = (platform) => ({
    width: 'clamp(32px, 6vw, 48px)',
    height: 'clamp(32px, 6vw, 48px)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'clamp(12px, 2.5vw, 18px)',
    background: platformConfig[platform].bgColor,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
  });

  const postMetaStyle = {
    flex: 1
  };

  const platformNameStyle = {
    fontWeight: '600',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    color: '#2c3e50',
    marginBottom: '4px'
  };

  const postDateStyle = {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#6c757d'
  };

  const postContentStyle = {
    padding: 'clamp(12px, 3vw, 24px)'
  };

  const postTextStyle = {
    color: '#495057',
    lineHeight: '1.7',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    marginBottom: 'clamp(10px, 2vw, 20px)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const postImageStyle = {
    width: '100%',
    height: 'clamp(140px, 30vw, 220px)',
    objectFit: 'cover',
    borderRadius: 'clamp(6px, 1.5vw, 12px)',
    marginBottom: 'clamp(8px, 2vw, 16px)'
  };

  const postActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'clamp(10px, 2.5vw, 20px) clamp(12px, 3vw, 24px)',
    background: '#f8f9fa',
    borderTop: '1px solid #e9ecef'
  };

  const shareButtonsStyle = {
    display: 'flex',
    gap: 'clamp(4px, 1vw, 8px)'
  };

  const getShareButtonStyle = (isActive) => ({
    padding: 'clamp(8px, 1.5vw, 10px) clamp(10px, 2vw, 20px)',
    background: isActive ? '#27ae60' : '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: 'clamp(11px, 2vw, 13px)',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(3px, 1vw, 6px)'
  });

  const loadMoreStyle = {
    textAlign: 'center',
    padding: 'clamp(25px, 5vw, 50px)'
  };

  const loadMoreButtonStyle = {
    padding: 'clamp(12px, 2.5vw, 16px) clamp(24px, 5vw, 48px)',
    background: 'linear-gradient(135deg, #3498db, #2980b9)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.3)'
  };

  const statsBarStyle = {
    background: 'white',
    padding: 'clamp(20px, 4vw, 40px)',
    borderTop: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(20px, 5vw, 80px)',
    flexWrap: 'wrap'
  };

  const statStyle = {
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '700',
    color: '#3498db',
    display: 'block',
    marginBottom: 'clamp(4px, 1vw, 8px)'
  };

  const statLabelStyle = {
    color: '#6c757d',
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <h1 style={titleStyle}>Knowledge Hub</h1>
            <p style={subtitleStyle}>
              Discover and share insights from our social media presence. Stay connected with our latest updates, industry thoughts, and community engagement.
            </p>
          </div>
        </div>

        <div style={filterSectionStyle}>
          <div style={filterControlsStyle}>
            <div style={filterTabsStyle}>
              {['all', 'linkedin', 'twitter', 'facebook', 'instagram'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={getFilterTabStyle(activeFilter === filter)}
                  onMouseEnter={(e) => {
                    if (activeFilter !== filter) {
                      e.target.style.borderColor = '#3498db';
                      e.target.style.color = '#3498db';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== filter) {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.color = '#495057';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {filter === 'all' ? 'All Posts' : platformConfig[filter]?.name}
                </button>
              ))}
            </div>
            
            <div style={searchContainerStyle}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3498db';
                  e.target.style.boxShadow = '0 0 0 4px rgba(52, 152, 219, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <Search style={searchIconStyle} size={20} />
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div style={gridStyle}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={getPostCardStyle()}
              onClick={() => navigate(`/knowledgehub/${post.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Post Header */}
              <div style={postHeaderStyle}>
                <div style={getPlatformIconStyle(post.platform)}>
                  {platformConfig[post.platform].icon}
                </div>
                <div style={postMetaStyle}>
                  <div style={platformNameStyle}>
                    {platformConfig[post.platform].name}
                  </div>
                  <div style={postDateStyle}>{formatDate(post.date)}</div>
                </div>
              </div>

              {/* Post Content */}
              <div style={postContentStyle}>
                <p style={postTextStyle}>{post.content}</p>
                {getDisplayImage(post) && (
                  <img
                    src={getDisplayImage(post)}
                    alt="Post content"
                    style={postImageStyle}
                  />
                )}
              </div>

              {/* Post Actions */}
              <div style={postActionsStyle} onClick={(e) => e.stopPropagation()}>
                <div style={shareButtonsStyle}>
                  <button
                    onClick={() => handleShare(post.id, 'share', 'twitter')}
                    style={getShareButtonStyle(false)}
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
                    <Share2 size={14} />
                    Share
                  </button>
                  <button
                    onClick={() => handleShare(post.id, 'copy')}
                    style={getShareButtonStyle(copiedPostId === post.id)}
                    onMouseEnter={(e) => {
                      if (copiedPostId !== post.id) {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.background = '#2980b9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (copiedPostId !== post.id) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.background = '#3498db';
                      }
                    }}
                    aria-label="Copy link"
                  >
                    {copiedPostId === post.id ? (
                      <>
                        <Check size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredPosts.length < posts.filter(post => 
          activeFilter === 'all' || post.platform === activeFilter
        ).length && (
          <div style={loadMoreStyle}>
            <button
              onClick={loadMorePosts}
              style={loadMoreButtonStyle}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(52, 152, 219, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.3)';
              }}
            >
              Load More Posts
            </button>
          </div>
        )}

        {/* Stats Bar */}
        <div style={statsBarStyle}>
          <div style={statStyle}>
            <span style={statNumberStyle}>{stats.totalPosts}</span>
            <div style={statLabelStyle}>Total Posts</div>
          </div>
          <div style={statStyle}>
            <span style={statNumberStyle}>{stats.platforms}</span>
            <div style={statLabelStyle}>Platforms</div>
          </div>
          <div style={statStyle}>
            <span style={statNumberStyle}>{stats.satisfaction}</span>
            <div style={statLabelStyle}>Positive Feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
