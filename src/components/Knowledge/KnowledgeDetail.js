import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2, Copy, Check } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook, FaReddit, FaWhatsapp, FaShareAlt } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { db } from "../News/firebasee";
import { doc, getDoc } from "firebase/firestore";
import { SiX } from 'react-icons/si'; // New Twitter/X icon

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const platformConfig = {
  linkedin: {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    bgColor: "#0077b5",
    textColor: "#ffffff",
  },
  twitter: {
    name: "Twitter/X",
    icon: <FaTwitter />,
    bgColor: "#1da1f2",
    textColor: "#ffffff",
  },
  facebook: {
    name: "Facebook",
    icon: <FaFacebook />,
    bgColor: "#1877f2",
    textColor: "#ffffff",
  },
};

// Styled Components
const PageContainer = styled.div`
  margin-top: 115px;
  min-height: 100vh;
  background: #ffffff;
  padding: 20px;
  font-family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
`;

const MainContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const TopNavigation = styled.div`
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 20px 40px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: #f8f9fa;
  color: #495057;
  border: 2px solid #e9ecef;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(-2px);
  }
`;

const HeroSection = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #f8f9fa;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const ImageFallback = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: #6c757d;
`;

const PlatformBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: ${(props) =>
    platformConfig[props.platform]?.bgColor || "#3498db"};
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentSection = styled.div`
  padding: 40px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const PlatformIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${(props) =>
    platformConfig[props.platform]?.bgColor || "#3498db"};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const PostMeta = styled.div`
  flex: 1;
`;

const PlatformName = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #2c3e50;
`;

const PostDate = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const PostContent = styled.p`
  color: #495057;
  line-height: 1.7;
  font-size: 16px;
  margin-bottom: 24px;
`;

const ShareSection = styled.section`
  background: #ffffff;
  padding: 40px 0 80px 0;
  border-top: 1px solid #f0f0f0;
`;

const ShareContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

const ShareButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ShareTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c2c2c;
  margin: 0;
  font-weight: 500;
`;

const ShareOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 15px;
  width: 100%;
  max-width: 500px;
`;

const ShareOption = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${(props) => props.$color || "#333"};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.$color || "#ff6b6b"};
  }

  svg {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 16px;
  color: #6c757d;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #e9ecef;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-right: 16px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 16px;
  color: #dc2626;
  text-align: center;
  padding: 40px;
`;

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
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          setPost({
            id: postSnap.id,
            ...postSnap.data(),
            engagement: postSnap.data().engagement || {
              likes: 0,
              comments: 0,
              shares: 0,
            },
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const formatDate = (dateInput) => {
    if (!dateInput) return "Unknown date";
    let date;
    if (typeof dateInput === "string") {
      date = new Date(dateInput);
    } else if (dateInput.toDate) {
      date = dateInput.toDate();
    } else {
      date = new Date(dateInput);
    }
    if (isNaN(date.getTime())) return "Invalid date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
      .format(date)
      .replace(/(\d+),/, "$1,");
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.content.slice(0, 100);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + " " + url
      )}`,
      copy: () => {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      },
      native: () => {
        if (navigator.share) {
          navigator.share({
            title: title,
            text: title,
            url: url,
          }).catch((error) => console.error("Error sharing:", error));
        }
      },
    };

    if (platform === "copy" || platform === "native") {
      shareUrls[platform]();
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleBackNavigation = () => {
    navigate("/knowledgehub");
  };

  if (loading) {
    return (
      <PageContainer>
        <MainContainer>
          <LoadingContainer>
            <LoadingSpinner />
            Loading post...
          </LoadingContainer>
        </MainContainer>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <MainContainer>
          <ErrorContainer>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
            Post not found.
          </ErrorContainer>
        </MainContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContainer>
        <TopNavigation>
          <BackButton
            onClick={handleBackNavigation}
            aria-label="Back to Knowledge Hub"
          >
            <span>←</span>
            Back to Knowledge Hub
          </BackButton>
        </TopNavigation>

        <HeroSection>
          {post.image && !imageError ? (
            <CoverImage
              src={post.image}
              alt="Post content"
              onError={() => setImageError(true)}
            />
          ) : (
            <ImageFallback>🖼️</ImageFallback>
          )}
          <PlatformBadge platform={post.platform}>
            {platformConfig[post.platform].icon}
            <span>{platformConfig[post.platform].name}</span>
          </PlatformBadge>
        </HeroSection>

        <ContentSection>
          <PostHeader>
            <PlatformIcon platform={post.platform}>
              {platformConfig[post.platform].icon}
            </PlatformIcon>
            <PostMeta>
              <PlatformName>{platformConfig[post.platform].name}</PlatformName>
              <PostDate>{formatDate(post.date)}</PostDate>
            </PostMeta>
          </PostHeader>

          <PostContent>{post.content}</PostContent>

          <ShareSection>
            <ShareContainer>
              <ShareButtonWrapper>
                <ShareTitle>Share this post</ShareTitle>
                <ShareOptionsGrid>
                  <ShareOption
                    onClick={() => handleShare("twitter")}
                    $color="#1DA1F2"
                    aria-label="Share on Twitter"
                  >
                    <SiX size={20} />
                    <span>Twitter</span>
                  </ShareOption>
                  <ShareOption
                    onClick={() => handleShare("linkedin")}
                    $color="#0077B5"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </ShareOption>
                  <ShareOption
                    onClick={() => handleShare("facebook")}
                    $color="#1877F2"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook />
                    <span>Facebook</span>
                  </ShareOption>
                  
                  
                  <ShareOption 
                    onClick={() => handleShare("whatsapp")}
                    $color="#25D366"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </ShareOption>
                  <ShareOption
                    onClick={() => handleShare("reddit")}
                    $color="#FF5700"
                    aria-label="Share on Reddit"
                  >
                    <FaReddit />
                    <span>Reddit</span>
                  </ShareOption>
                 
                  {navigator.share && (
                    <ShareOption
                      onClick={() => handleShare("native")}
                      aria-label="Share via native share"
                    >
                      <FaShareAlt />
                      <span>More</span>
                    </ShareOption>
                  )}
                   <ShareOption
                    onClick={() => handleShare("copy")}
                    aria-label="Copy link"
                  >
                    {copied ? <Check /> : <Copy />}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                  </ShareOption>
                </ShareOptionsGrid>
              </ShareButtonWrapper>
            </ShareContainer>
          </ShareSection>
        </ContentSection>
      </MainContainer>
    </PageContainer>
  );
};

export default KnowledgeHubDetail;