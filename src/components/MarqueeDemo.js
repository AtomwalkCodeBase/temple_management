import React from 'react';
import styled, { keyframes } from 'styled-components';

// Sample review data
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

// Keyframes for Marquee Animation
const marqueeAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Styled Components for Marquee
const MarqueeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0; /* Change background as needed */
  margin-top: 20px;
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeAnimation} ${(props) => props.duration || '20s'} linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

// Review Card Styling
const ReviewCard = styled.figure`
  width: 250px;
  margin: 0 15px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 10px;
  background-color: #454545;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  figcaption {
    font-size: 1rem;
    font-weight: bold;
  }

  blockquote {
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
`;

// Styled Components for Gradient Effect on Edges
const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 1;
  pointer-events: none;

  &.left {
    left: 0;
    background: linear-gradient(to right, rgba(240, 240, 240, 1), rgba(240, 240, 240, 0));
  }

  &.right {
    right: 0;
    background: linear-gradient(to left, rgba(240, 240, 240, 1), rgba(240, 240, 240, 0));
  }
`;

// Component for Marquee
const Marquee = ({ children, reverse, duration }) => {
  return (
    <MarqueeContainer>
      <MarqueeTrack style={{ animationDirection: reverse ? 'reverse' : 'normal' }} duration={duration}>
        {children}
        {children} {/* Duplicate to create infinite scroll effect */}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

// Main Demo Component
export const MarqueeDemo = () => {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#f0f0f0' }}>
      {/* First Row of Reviews */}
      <Marquee duration="20s">
        {firstRow.map((review) => (
          <ReviewCard key={review.username}>
            <div className="flex">
              <img src={review.img} alt={review.name} />
              <div style={{ marginLeft: '10px' }}>
                <figcaption>{review.name}</figcaption>
                <p>{review.username}</p>
              </div>
            </div>
            <blockquote>{review.body}</blockquote>
          </ReviewCard>
        ))}
      </Marquee>

      {/* Second Row of Reviews (reverse scrolling) */}
      <Marquee reverse duration="20s">
        {secondRow.map((review) => (
          <ReviewCard key={review.username}>
            <div className="flex">
              <img src={review.img} alt={review.name} />
              <div style={{ marginLeft: '10px' }}>
                <figcaption>{review.name}</figcaption>
                <p>{review.username}</p>
              </div>
            </div>
            <blockquote>{review.body}</blockquote>
          </ReviewCard>
        ))}
      </Marquee>
      {/* Gradient overlays for fading edges */}
      <GradientOverlay className="left" />
      <GradientOverlay className="right" />
    </div>
  );
};

export default MarqueeDemo;
