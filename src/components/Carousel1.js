import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Ptent from './../assets/img/pariesh.jpeg'
import Ptent2 from './../assets/img/2_image.jpeg'
import Ptent3 from './../assets/img/honnybee.jpg'
import Ptent4 from './../assets/img/4_image.jpeg'

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


// Styled Components
const CarouselContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.translateValue}%);
  height: 100vh;
  width: 100vw;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.active ? 'flex' : 'none'};
  align-items: center;
  
  /* Text Content */
  .content {
    padding-left: 10%;
    width: 50%;
    color: #fff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
    animation: ${fadeIn} 0.8s ease;
    
    .author {
      font-weight: bold;
      letter-spacing: 5px;
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .title {
      font-size: 3.5rem;
      font-weight: bold;
      line-height: 1.2;
      margin-bottom: 10px;
    }

    .topic {
      font-size: 2.5rem;
      font-weight: bold;
      color: #f1683a;
      margin-bottom: 15px;
    }

    .description {
      margin-top: 15px;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .buttons {
      display: flex;
      gap: 20px;

      button {
        background-color: #fff;
        color: #333;
        border: none;
        padding: 12px 25px;
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase;
        transition: all 0.3s ease;
        border-radius: 4px;

        &:hover {
          background-color: #f1683a;
          color: #fff;
        }

        &:nth-child(2) {
          background-color: transparent;
          border: 2px solid #fff;
          color: #fff;

          &:hover {
            background-color: #fff;
            color: #333;
          }
        }
      }
    }
  }

  /* Gradient overlay to improve text readability */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .content {
      padding-left: 5%;
      width: 90%;
      
      .title {
        font-size: 2rem;
      }

      .topic {
        font-size: 1.2rem;
      }

      .description {
        font-size: 1rem;
      }

      .buttons {
        flex-direction: column;
        gap: 10px;
        width: 80%;

        button {
          width: 100%;
        }
      }
    }
  }
`;

// const NavButton = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background: rgba(255, 255, 255, 0.2);
//   color: #fff;
//   border: none;
//   width: 50px;
//   height: 50px;
//   cursor: pointer;
//   font-size: 24px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 10;
//   transition: background 0.3s;
  
//   &:hover {
//     background: rgba(255, 255, 255, 0.4);
//   }
  
//   &:focus {
//     outline: none;
//   }
  
//   ${props => props.left ? 'left: 20px;' : 'right: 20px;'}
// `;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  z-index: 10;
`;

const Dot = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${props => props.active ? '#f1683a' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.active ? '#f1683a' : 'rgba(255, 255, 255, 0.8)'};
    transform: scale(1.2);
  }
  
  &:focus {
    outline: none;
  }
`;

export default function FullscreenCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef(null);
  
	const items = [
	  {
		src: Ptent,
		author: 'LIFEINTELECT',
		// title: 'Zoom out and focus deep. That’s how we view your project ',
		topic: 'Zoom out and Focus deep. That’s how we view your Project.',
		// description:
		//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	  },
	  {
		src: Ptent2,
		author: 'LIFEINTELECT',
		// title: 'Copyright Services',
		topic: 'For Thoughts to Thrive, let us help Nurture your Idea.',
		// description:
		//   'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	  },
	  {
		src: Ptent3,
		author: 'LIFEINTELECT',
		// title: 'Trademark Service',
		topic: 'Design with Innovation, Strengthen with Protection.',
		// description:
		//   'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	  },
	  {
		src: Ptent4,
		author: 'LIFEINTELECT',
		// title: 'IP Lifecycle Management',
		topic: 'Plan, Protect, Strategize and Excel with us.',
		// description:
		//   'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	  },
	];
  
	const nextSlide = () => {
	  setCurrentIndex((prev) => (prev + 1) % items.length);
	};
  
	// const prevSlide = () => {
	//   setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
	// };
  
	const goToSlide = (index) => {
	  setCurrentIndex(index);
	};
  
	const resetTimer = () => {
	  if (intervalRef.current) {
		clearInterval(intervalRef.current);
	  }
	  intervalRef.current = setInterval(() => {
		nextSlide();
	  }, 3000);
	};
  
	useEffect(() => {
	  resetTimer();
	  return () => clearInterval(intervalRef.current);
	}, []);
  
	useEffect(() => {
	  resetTimer();
	}, [currentIndex]);
  const navigatetos=()=>{
     window.location.href="/services"
  }
  const contact=()=>{
    window.location.href="/contact"
 }
	return (
	  <CarouselContainer>
		<SlideContainer translateValue={-currentIndex * 100}>
		  {items.map((item, index) => (
			<Slide key={index}>
			  <Image src={item.src} alt={item.title} />
			  <TextOverlay active={currentIndex === index}>
				<div className="content">
				  <div className="author">{item.author}</div>
				  <div className="title">{item.title}</div>
				  <div className="topic">{item.topic}</div>
				  <div className="description">{item.description}</div>
				  <div className="buttons">
					<button onClick={()=>navigatetos()}>Learn More</button>
					<button onClick={()=>contact()}>Contact Us</button>
				  </div>
				</div>
			  </TextOverlay>
			</Slide>
		  ))}
		</SlideContainer>
  
		{/* <NavButton left onClick={() => { prevSlide(); resetTimer(); }}>
		  &#10094;
		</NavButton>
		<NavButton onClick={() => { nextSlide(); resetTimer(); }}>
		  &#10095;
		</NavButton> */}
  
		<DotsContainer>
		  {items.map((_, index) => (
			<Dot
			  key={index}
			  active={currentIndex === index}
			  onClick={() => { goToSlide(index); resetTimer(); }}
			/>
		  ))}
		</DotsContainer>
	  </CarouselContainer>
	);
  }