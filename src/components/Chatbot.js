"use client";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(234, 88, 12, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(234, 88, 12, 0.4);
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 480px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 2px solid #FED7AA;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 85vw;
    height: 60vh;
    right: 7.5vw;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%);
  color: white;
  padding: 0.875rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .online-indicator {
    width: 12px;
    height: 12px;
    background: #10B981;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);
  }



  .header-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .header-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #FFF8F0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #FED7AA;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #EA580C;
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)`
  max-width: 85%;
  padding: 0.875rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  line-height: 1.4;
  word-wrap: break-word;

  ${props => props.isUser ? `
    background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 0.25rem;
  ` : `
    background: white;
    color: #374151;
    align-self: flex-start;
    border: 1px solid #FED7AA;
    border-bottom-left-radius: 0.25rem;
  `}

  /* Bot message formatting */
  ${props => !props.isUser && `
    h1, h2, h3, h4, h5, h6 {
      color: #EA580C;
      margin: 0.5rem 0;
      font-weight: 600;
    }

    h1 { font-size: 1.1rem; }
    h2 { font-size: 1rem; }
    h3 { font-size: 0.95rem; }

    strong, b {
      color: #EA580C;
      font-weight: 600;
    }

    em, i {
      color: #B45309;
      font-style: italic;
    }

    ul, ol {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }

    li {
      margin: 0.25rem 0;
    }

    p {
      margin: 0.5rem 0;
    }

    .highlight {
      background: #FEF3C7;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      color: #B45309;
      font-weight: 500;
    }

    .highlight-saffron {
      color: #FF6B35;
      font-weight: 600;
    }

    .divider {
      border-top: 1px solid #FED7AA;
      margin: 0.75rem 0;
    }
  `}
`;

const ChatInput = styled.div`
  padding: 0.875rem;
  border-top: 1px solid #FED7AA;
  background: white;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #FED7AA;
  border-radius: 2rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #EA580C;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #EA580C 0%, #DC2626 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #FED7AA;
  border-radius: 1rem;
  align-self: flex-start;
  border-bottom-left-radius: 0.25rem;

  .dot {
    width: 8px;
    height: 8px;
    background: #EA580C;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🙏 I'm your temple assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Function to format bot response with proper styling
  const formatBotResponse = (text) => {
    if (!text) return text;

    // Replace markdown-style formatting with HTML
    let formattedText = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      
      // Italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      
      // Highlight important information
      .replace(/\[(.*?)\]/g, '<span class="highlight">$1</span>')
      
      // Dividers
      .replace(/---/g, '<div class="divider"></div>');

    // Auto-highlight important temple-related terms and information with saffron color
    formattedText = formattedText
      // Highlight temple names and locations
      .replace(/\b(Temple|Mandir|Gurudwara|Church|Mosque)\b/gi, '<span class="highlight-saffron">$1</span>')
      
      // Highlight deity names
      .replace(/\b(Lord|Goddess|Shiva|Vishnu|Brahma|Ganesh|Krishna|Rama|Hanuman|Durga|Lakshmi|Saraswati|Kali|Kartikeya|Ganesha|Shiv|Vishnu|Brahma|Ganesh|Krishna|Rama|Hanuman|Durga|Lakshmi|Saraswati|Kali|Kartikeya)\b/gi, '<span class="highlight-saffron">$1</span>')
      
      // Highlight puja and ritual terms
      .replace(/\b(Puja|Pooja|Aarti|Bhajan|Kirtan|Prasad|Prasadam|Darshan|Darsanam|Abhishek|Abhishekam|Havan|Yagya|Yajna|Mantra|Sloka|Stotra|Stotram)\b/gi, '<span class="highlight-saffron">$1</span>')
      
      // Highlight time-related terms
      .replace(/\b(Morning|Evening|Afternoon|Night|Dawn|Dusk|Sunrise|Sunset|AM|PM|O'Clock|Hours|Minutes|Days|Weeks|Months|Years)\b/gi, '<span class="highlight-saffron">$1</span>')
      
      // Highlight important numbers and prices
      .replace(/\b(₹\d+|\d+\s*(rupees|rs|rupee)|Rs\.?\s*\d+)\b/gi, '<span class="highlight-saffron">$1</span>')
      
      // Highlight contact information
      .replace(/\b(\d{10}|\d{3}-\d{3}-\d{4}|\+91\s*\d{10})\b/g, '<span class="highlight-saffron">$1</span>')
      
      // Highlight important actions
      .replace(/\b(Book|Booking|Reserve|Reservation|Register|Registration|Schedule|Appointment|Visit|Attend|Participate|Join|Enroll|Sign up|Sign-up)\b/gi, '<span class="highlight-saffron">$1</span>')
      
      // Highlight special terms
      .replace(/\b(Sacred|Divine|Holy|Blessed|Spiritual|Religious|Traditional|Ancient|Historic|Famous|Popular|Important|Special|Unique|Rare|Exclusive)\b/gi, '<span class="highlight-saffron">$1</span>');

    // Wrap in paragraphs if not already wrapped
    if (!formattedText.includes('<h1>') && !formattedText.includes('<h2>') && !formattedText.includes('<h3>')) {
      formattedText = `<p>${formattedText}</p>`;
    }

    // Handle lists properly
    if (formattedText.includes('<li>')) {
      formattedText = formattedText.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    }

    return formattedText;
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Namaste! 🙏 I'm your temple assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://niraj-22.app.n8n.cloud/webhook/33e18bf6-e658-434b-b53c-2993ea8151aa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text
        })
      });

      const responseData = await response.json();
      console.log("API Response:", responseData);

      // Extract the text from the response (matching your Python logic)
      let text;
      if ('output' in responseData) {
        text = responseData['output'];
      } else if ('response' in responseData) {
        text = responseData['response'];
      } else if ('text' in responseData) {
        text = responseData['text'];
      } else if ('message' in responseData) {
        text = responseData['message'];
      } else {
        // If the response structure is different, use the full response for debugging
        console.log("Response structure:", responseData);
        text = JSON.stringify(responseData);
      }

      // Format the response with proper styling
      const formattedText = formatBotResponse(text);

      console.log("Original text:", text);
      console.log("Formatted text:", formattedText);
      
      const botMessage = {
        id: Date.now() + 1,
        text: formattedText || "I'm sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, there was an error processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <h3>
                🕉️ Bhakti Assistant
                <div className="online-indicator"></div>
              </h3>
              <div className="header-buttons">
                <button 
                  className="header-btn" 
                  onClick={clearChat}
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  🗑️
                </button>
                <button 
                  className="header-btn" 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close chat"
                >
                  ×
                </button>
              </div>
            </ChatHeader>
            
            <ChatMessages>
              <AnimatePresence>
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    isUser={message.isUser}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.isUser ? (
                      message.text
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: message.text }} />
                    )}
                  </Message>
                ))}
                
                {isLoading && (
                  <LoadingDots
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </LoadingDots>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </ChatMessages>
            
            <ChatInput>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <SendButton 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
              >
                ➤
              </SendButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
      
      <ChatButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        💬
      </ChatButton>
    </ChatbotContainer>
  );
};

export default Chatbot; 