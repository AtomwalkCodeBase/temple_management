import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Ptent from './../assets/img/Ptent.png'
import Ptent2 from './../assets/img/HomePage_Banner_1.1.png'
import Ptent3 from './../assets/img/Group 1.png'

// Keyframes for fade-in and fade-out animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components for the carousel
const CarouselContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

const ItemList = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  transition: transform 0.5s ease;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Text Content */
  .content {
    position: absolute;
    top: 30%;
    left: 40%;
    transform: translateX(-50%);
    color: #fff;
    text-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    width: 80%;
    max-width: 1140px;
    animation: ${fadeIn} 1s ease;

    .author {
      font-weight: bold;
      letter-spacing: 10px;
      margin-bottom: 10px;
    }

    .title {
      font-size: 4em;
      font-weight: bold;
      line-height: 1.3em;
    }

    .topic {
      font-size: 2em;
      font-weight: bold;
      color: #f1683a;
      text-transform: uppercase;
    }

    .description {
      margin-top: 20px;
      font-size: 1.2em;
      max-width: 60%;
    }

    .buttons {
      margin-top: 20px;
      display: flex;
      gap: 20px;

      button {
        background-color: #eee;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #ccc;
        }

        &:nth-child(2) {
          background-color: transparent;
          border: 2px solid #fff;
          color: #fff;

          &:hover {
            background-color: #fff;
            color: #000;
          }
        }
      }
    }
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .content {
      top: 10%;
      .title {
        font-size: 2em;
      }

      .topic {
        font-size: 1.2em;
      }

      .description {
        font-size: 1em;
        max-width: 100%;
      }

      .buttons {
        flex-direction: column;
        gap: 10px;

        button {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
`;

const ThumbnailList = styled.div`
  position: absolute;
  bottom: 20px;
  left: 75%;
  /* align-items: start; */
  display: flex;
  gap: 20px;
  transform: translateX(-50%);
  z-index: 10;
`;

const ThumbnailItem = styled.div`
  width: 150px;
  height: 220px;
  cursor: pointer;
  border: ${(props) => (props.active ? '3px solid #f1683a' : '2px solid #fff')};
  border-radius: 10px;
  overflow: hidden;
  transition: border 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === 'prev' ? 'left: 20px;' : 'right: 20px;')}
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(238, 238, 238, 0.8);
  color: #000;
  font-family: monospace;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: #fff;
    color: #000;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const TimeBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  background-color: #f1683a;
  width: ${(props) => props.progress}%;
  transition: width 0.1s linear;
  z-index: 5;
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const items = [
    {
      src: `${Ptent}`,
      author: 'LIFEINTELECT',
      title: 'Patent Services',
      topic: 'Through Our Competitive Solutions',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      src: `${Ptent3}`,
      author: 'LIFEINTELECT',
      title: 'Copyright Services',
      topic: 'Through Our Expert Counselling',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      src: `${Ptent2}`,
      author: 'LIFEINTELECT',
      title: 'Trademark Service',
      topic: 'Through Our Legal Protection',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      src: `${Ptent2}`,
      author: 'LIFEINTELECT',
      title: 'IP Lifecycle Management',
      topic: 'ANIMAL',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  // Clear existing timeout
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Progress bar handler
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 7000; // 7 seconds
    const interval = 100; // Update every 100ms

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);
      if (percentage >= 100) {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(updateProgress, interval);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  // Auto slide
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 7000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, items.length]);

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const jumpToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      {/* Slide items */}
      {items.map((item, index) => (
        <Slide key={index} active={index === currentIndex}>
          <img src={item.src} alt={item.title} />
          {index === currentIndex && (
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="description">{item.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          )}
        </Slide>
      ))}

      {/* Thumbnails */}
      <ThumbnailList>
        {items.map((item, index) => (
          <ThumbnailItem
            key={index}
            active={index === currentIndex}
            onClick={() => jumpToSlide(index)}
          >
            <img src={item.src} alt={item.title} />
          </ThumbnailItem>
        ))}
      </ThumbnailList>

      {/* Navigation Buttons */}
      {/* <NavigationButton direction="prev" onClick={showPrev}>
        &#60;
      </NavigationButton>
      <NavigationButton direction="next" onClick={showNext}>
        &#62;
      </NavigationButton> */}

      {/* TimeBar */}
      <TimeBar progress={progress} />
    </CarouselContainer>
  );
};

export default Carousel;
