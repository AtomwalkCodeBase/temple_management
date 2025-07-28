"use client"

import { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const LiveDarshanContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
`

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.background}, rgba(255, 153, 51, 0.1));
  padding: 3rem 0;
  text-align: center;
`

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`

const LiveSection = styled.section`
  padding: 4rem 0;
`

const LiveGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const VideoContainer = styled(motion.div)`
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadows.card};
`

const VideoPlayer = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;

  &::before {
    content: '📺';
    position: absolute;
  }

  &::after {
    content: 'LIVE';
    position: absolute;
    top: 20px;
    right: 20px;
    background: red;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`

const VideoInfo = styled.div`
  padding: 1.5rem;
`

const TempleTitle = styled.h3`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`

const ViewerCount = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Sidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TempleList = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.card};
`

const SidebarTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

const TempleItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &.active {
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.gold});
    color: white;
  }
`

const TempleIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "rgba(255,255,255,0.2)" : props.theme.colors.primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

const TempleInfo = styled.div`
  flex: 1;
`

const TempleName = styled.h4`
  margin-bottom: 0.2rem;
  font-size: 1rem;
`

const TempleStatus = styled.p`
  font-size: 0.8rem;
  opacity: 0.8;
`

const ChatSection = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.card};
  height: 300px;
  display: flex;
  flex-direction: column;
`

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 2px;
  }
`

const ChatMessage = styled.div`
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.background};
`

const ChatUser = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.9rem;
`

const ChatText = styled.p`
  margin: 0.2rem 0 0 0;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
`

const ChatInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 20px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const LiveDarshan = () => {
  const [activeTemple, setActiveTemple] = useState(0)
  const [chatMessage, setChatMessage] = useState("")

  const temples = [
    {
      id: 1,
      name: "Jagannath Temple",
      location: "Puri, Odisha",
      status: "Live Now",
      viewers: 15420,
      icon: "🏛️",
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      status: "Live Now",
      viewers: 8930,
      icon: "🕌",
    },
    {
      id: 3,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      status: "Starting Soon",
      viewers: 0,
      icon: "🏛️",
    },
    {
      id: 4,
      name: "Tirupati Balaji",
      location: "Andhra Pradesh",
      status: "Live Now",
      viewers: 25670,
      icon: "⛩️",
    },
  ]

  const chatMessages = [
    { user: "Devotee123", message: "Har Har Mahadev! 🙏" },
    { user: "Spiritual_Soul", message: "Such peaceful darshan, feeling blessed" },
    { user: "PrayerWarrior", message: "Om Namah Shivaya" },
    { user: "BlessedOne", message: "Thank you for this beautiful service 🌸" },
    { user: "DevoteeHeart", message: "Jai Jagannath! 🚩" },
  ]

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      console.log("Chat message:", chatMessage)
      setChatMessage("")
    }
  }

  return (
    <LiveDarshanContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            Live Temple Darshan
          </HeroTitle>
        </div>
      </HeroSection>

      <LiveSection>
        <LiveGrid>
          <VideoContainer
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <VideoPlayer />
            <VideoInfo>
              <TempleTitle>{temples[activeTemple].name}</TempleTitle>
              <ViewerCount>👥 {temples[activeTemple].viewers.toLocaleString()} viewers watching</ViewerCount>
              <p style={{ color: "#666", lineHeight: 1.6 }}>
                Experience the divine presence and sacred atmosphere of this holy temple. Join thousands of devotees in
                this spiritual journey from the comfort of your home.
              </p>
            </VideoInfo>
          </VideoContainer>

          <Sidebar
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TempleList>
              <SidebarTitle>Available Temples</SidebarTitle>
              {temples.map((temple, index) => (
                <TempleItem
                  key={temple.id}
                  className={activeTemple === index ? "active" : ""}
                  onClick={() => setActiveTemple(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TempleIcon active={activeTemple === index}>{temple.icon}</TempleIcon>
                  <TempleInfo>
                    <TempleName>{temple.name}</TempleName>
                    <TempleStatus>{temple.status}</TempleStatus>
                  </TempleInfo>
                </TempleItem>
              ))}
            </TempleList>

            <ChatSection>
              <SidebarTitle>Live Chat</SidebarTitle>
              <ChatMessages>
                {chatMessages.map((msg, index) => (
                  <ChatMessage key={index}>
                    <ChatUser>{msg.user}:</ChatUser>
                    <ChatText>{msg.message}</ChatText>
                  </ChatMessage>
                ))}
              </ChatMessages>
              <form onSubmit={handleChatSubmit}>
                <ChatInput
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Share your prayers and blessings..."
                />
              </form>
            </ChatSection>
          </Sidebar>
        </LiveGrid>
      </LiveSection>
    </LiveDarshanContainer>
  )
}

export default LiveDarshan
