import { useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { ChevronDown, Sparkles } from "lucide-react"

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

// Styled components
const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7ff 0%, #e0e7ff 100%);
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
    z-index: 0;
  }
  
  &::before {
    top: -100px;
    left: -100px;
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::after {
    bottom: -100px;
    right: -100px;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
`

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
`

const Title = styled.h1`
  font-size: 2.75rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    border-radius: 2px;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.6;
`

const SparkleIcon = styled(Sparkles)`
  position: absolute;
  color: #4f46e5;
  animation: ${float} 3s ease-in-out infinite;
`

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FAQItem = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background: white;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay}ms;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`

const QuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4f46e5;
  }
  
  ${(props) =>
    props.isOpen &&
    css`
    color: #4f46e5;
    background: linear-gradient(90deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0) 100%);
  `}
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => (props.isOpen ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" : "#f3f4f6")};
  color: ${(props) => (props.isOpen ? "white" : "#6b7280")};
  transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  
  &:hover {
    animation: ${pulse} 1.5s infinite;
  }
`

const Answer = styled.div`
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s;
  padding: ${(props) => (props.isOpen ? "0 1.5rem 1.5rem" : "0 1.5rem")};
  color: #4b5563;
  line-height: 1.7;
  font-size: 1.05rem;
  
  p {
    margin-top: 0;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transform: translateY(${(props) => (props.isOpen ? "0" : "-10px")});
    transition: opacity 0.4s ease-in, transform 0.4s ease-in;
    transition-delay: ${(props) => (props.isOpen ? "0.2s" : "0")};
    border-left: 3px solid #e0e7ff;
    padding-left: 1rem;
    background: linear-gradient(90deg, rgba(224, 231, 255, 0.3) 0%, rgba(224, 231, 255, 0) 100%);
    border-radius: 0 8px 8px 0;
    padding: 0.75rem 1rem;
  }
`

// const GradientButton = styled.button`
//   background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
//   color: white;
//   border: none;
//   padding: 0.75rem 1.5rem;
//   border-radius: 50px;
//   font-weight: 600;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-top: 2rem;
//   transition: all 0.3s ease;
//   box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
//   position: relative;
//   overflow: hidden;
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
//   }
  
//   &:active {
//     transform: translateY(0);
//   }
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 200%;
//     height: 100%;
//     background: linear-gradient(90deg, 
//       rgba(255, 255, 255, 0) 0%, 
//       rgba(255, 255, 255, 0.2) 25%, 
//       rgba(255, 255, 255, 0.2) 50%, 
//       rgba(255, 255, 255, 0) 100%);
//     animation: ${shimmer} 3s infinite;
//   }
// `

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 2.5rem;
//   animation: ${fadeIn} 1s ease-out;
//   animation-delay: 0.8s;
//   opacity: 0;
//   animation-fill-mode: forwards;
// `
export default function Commonfaq({ data }) {
  const [openItems, setOpenItems] = useState([]);
  const [expandAll, setExpandAll] = useState(false);

  const faqData = {
    Patents: [
      {
        id: "patent-1",
        question: "What is a patent?",
        answer:
          "A patent is a form of intellectual property that grants the patent holder exclusive rights to an invention. This legal protection prevents others from making, using, selling, or distributing the patented invention without the patent holder's permission.",
      },
      {
        id: "patent-2",
        question: "How long is a patent term?",
        answer:
          "The term of a patent is generally 20 years from the filing date of the patent application, subject to the payment of maintenance fees.",
      },
      {
        id: "patent-3",
        question: "What are the requirements for patent protection?",
        answer: (
          <div style={{ paddingLeft: "0", margin: "0" }}>
            <div style={{ marginBottom: "8px" }}>
              To be eligible for patent protection, an invention must be:
            </div>
            <ul style={{ paddingLeft: "20px", margin: "0" }}>
              {[
                "Novel: New and not known to the public before the filing date.",
                "Non-obvious: Involves an inventive step that is not obvious to someone skilled in the field.",
                "Industrial applicability: Capable of being made or used in an industry.",
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        id: "patent-4",
        question: "Who can own patents?",
        answer:
          "Patents can be owned by individuals, companies, or other entities. The inventor is typically the initial owner, but patent rights can be assigned or transferred to others through legal agreements.",
      },
      {
        id: "patent-5",
        question: "What rights does a patent owner have?",
        answer: (
          <div style={{ paddingLeft: "0", margin: "0" }}>
            <div style={{ marginBottom: "8px" }}>
              A patent owner has the right to:
            </div>
            <ul style={{ paddingLeft: "20px", margin: "0" }}>
              {[
                "Exclude others from making, using, selling, or distributing the patented invention.",
                "License the patent to others in exchange for royalties.",
                "Sell or transfer the patent rights to another party.",
                "Enforce the patent rights through litigation if they are infringed upon.",
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ),
      }
    ],
    IndustrialDesigns: [
      {
        id: "design-1",
        question: "What is an industrial design?",
        answer:
          "An industrial design refers to the ornamental or aesthetic aspects of an article, including its shape, pattern, or colour. It protects the visual appearance of a product, not its functional aspects.",
      },
      {
        id: "design-2",
        question: "How long is the term of an industrial design patent?",
        answer:
          "The term of an industrial design is 10 years from the filing date, which can be extended by an additional 5 years, making the maximum term 15 years.",
      },
      {
        id: "design-3",
        question: "How can an inventor or designer maintain the novelty of their design before filing for protection?",
        answer:
          "To maintain the novelty of a design before filing for protection, the inventor or designer should avoid publicly disclosing the design. Confidentiality agreements and non-disclosure agreements (NDAs) can help protect the design during development and collaboration.",
      },
      {
        id: "design-4",
        question: "What is the process for obtaining industrial design protection?",
        answer:
          "To obtain industrial design protection, an application must be filed with the relevant patent office. The application should include a detailed description and drawings of the design, demonstrating its ornamental features.",
      },
    ],
    Copyrights: [
      {
        id: "copyright-1",
        question: "What is copyright?",
        answer:
          "Copyright is a form of intellectual property that grants the creator of original works, such as literary, artistic, musical, and other creative works, exclusive rights to use and distribute those works.",
      },
      {
        id: "copyright-2",
        question: "What types of works can be protected by copyright?",
        answer:
          "Copyright can protect literary works, musical compositions, visual arts, dramatic works, motion pictures, software, and other creative expressions that are fixed in a tangible medium.",
      },
      {
        id: "copyright-3",
        question: "How long does copyright protection last?",
        answer:
          "Copyright protection lasts for the lifetime of the creator plus an additional 60 years.",
      },
      {
        id: "copyright-4",
        question: "What rights does a copyright owner have?",
        answer: (
          <div style={{ paddingLeft: "0", margin: "0" }}>
            <div style={{ marginBottom: "8px" }}>
              A copyright owner has the exclusive rights to:
            </div>
            <ul style={{ paddingLeft: "20px", margin: "0" }}>
              {[
                "Reproduce the original work.",
                "Distribute the original work.",
                "Perform the original work.",
                "Display the original work.",
                "Create derivative works based on the original work.",
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        id: "copyright-5",
        question: "Can copyright protection be transferred or assigned?",
        answer:
          "Yes, copyright protection can be transferred or assigned to others through written agreements, such as licensing or sale of rights.",
      },
    ],
    Trademarks: [
      {
        id: "trademark-1",
        question: "What is a trademark?",
        answer:
          "A trademark is a distinctive sign, symbol, word, or combination thereof that identifies and distinguishes the source of goods or services of one party from those of others.",
      },
      {
        id: "trademark-2",
        question: "What types of marks can be registered as trademarks?",
        answer:
          "Trademarks can include words, logos, symbols, designs, slogans, colors, and even sounds that are used to identify and distinguish goods or services.",
      },
      {
        id: "trademark-3",
        question: "How long does trademark protection last?",
        answer:
          "Trademark protection can last indefinitely, provided the trademark is used in commerce and the required renewal fees are paid. Typically, trademarks need to be renewed every 10 years.",
      },
      {
    id: "trademark-4",
    question: "What rights does a trademark owner have?",
    answer: (
      <div style={{ paddingLeft: "0", margin: "0" }}>
        <div style={{ marginBottom: "8px" }}>
          A trademark owner has the exclusive right to:
        </div>
        <ul style={{ paddingLeft: "20px", margin: "0" }}>
          {[
            "Use the mark in connection with the goods or services for which it is registered.",
            "Prevent others from using a similar mark that could cause confusion.",
          ].map((item, index) => (
            <li key={index} style={{ marginBottom: "4px" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
},
      {
        id: "trademark-5",
        question: "How do you obtain trademark protection?",
        answer:
          "Trademark protection can be obtained by filing an application with the relevant trademark office, providing a detailed description of the mark, and demonstrating its use in commerce.",
      },
      {
        id: "trademark-6",
        question: "What is the difference between a registered trademark and an unregistered trademark?",
        answer:
          "A registered trademark has been officially recorded with the trademark office and provides the owner with legal benefits, including the presumption of ownership and exclusive rights. An unregistered trademark, often indicated by the ™ symbol, still offers some common law rights but does not have the same level of legal protection.",
      },
    ],
    GeographicalIndications: [
      {
        id: "gi-1",
        question: "What is a Geographical Indication (GI)?",
        answer:
          "A Geographical Indication (GI) is a sign used on products that have a specific geographical origin and possess qualities, reputation, or characteristics that are essentially attributable to that location. Examples include Champagne, Darjeeling tea, and Parmigiano-Reggiano cheese.",
      },
      {
        id: "gi-2",
        question: "How does a product qualify for a GI?",
        answer:
          "To qualify for a GI, a product must originate from a specific geographical area and possess unique qualities, reputation, or characteristics that are inherently linked to that location. These attributes must be due to the geographical environment, including natural and human factors.",
      },
      {
        id: "gi-3",
        question: "What types of products can be protected by a GI?",
        answer:
          "GIs can protect a wide range of products, including agricultural products, foodstuffs, wines, spirits, handicrafts, and industrial products, as long as they meet the criteria for GI protection.",
      },
      {
        id: "gi-4",
        question: "How long does GI protection last?",
        answer:
          "The duration of GI protection varies by jurisdiction, but it generally lasts as long as the product continues to meet the criteria for GI status. There is no specific expiration date, and protection can continue indefinitely with proper maintenance and enforcement.",
      },
      {
    id: "gi-5",
    question: "What rights does a GI holder have?",
    answer: (
      <div style={{ paddingLeft: "0", margin: "0" }}>
        <div style={{ marginBottom: "8px" }}>
          A GI holder has the right to:
        </div>
        <ul style={{ paddingLeft: "20px", margin: "0" }}>
          {[
            "Use the GI for products that meet the defined standards and criteria.",
            "Prevent others from using the GI for products that do not meet the criteria.",
            "Take legal action against unauthorized use or imitation of the GI.",
          ].map((item, index) => (
            <li key={index} style={{ marginBottom: "4px" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
}
    ],
  };

  const selectedData = faqData[data] || [];

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // const toggleAll = () => {
  //   setExpandAll(!expandAll);
  //   if (!expandAll) {
  //     setOpenItems(selectedData.map((item) => item.id));
  //   } else {
  //     setOpenItems([]);
  //   }
  // };

  return (
    <PageBackground>
      <FAQContainer>
        <FAQHeader>
          <SparkleIcon size={24} style={{ top: 10, left: "30%" }} />
          <SparkleIcon size={18} style={{ top: 40, right: "28%" }} />
          <Title>Got Questions? We've Got Answers!</Title>
          <Subtitle>
            Find answers to common questions about our products, services, and
            how we can help you.
          </Subtitle>
        </FAQHeader>

        {/* Module-wise display */}
        {Object.entries(faqData).map(([moduleKey, moduleFaqs]) => (
          <div key={moduleKey} style={{ marginBottom: "2rem" }}>
            <ModuleHeader>{getModuleTitle(moduleKey)}</ModuleHeader>
            <FAQList>
              {moduleFaqs.map((item, index) => (
                <FAQItem key={item.id} delay={200 + index * 100}>
                  <QuestionButton
                    isOpen={openItems.includes(item.id)}
                    onClick={() => toggleItem(item.id)}
                  >
                    {item.question}
                    <IconWrapper isOpen={openItems.includes(item.id)}>
                      <ChevronDown size={18} />
                    </IconWrapper>
                  </QuestionButton>
                  <Answer isOpen={openItems.includes(item.id)}>
                    {Array.isArray(item.answer) ? (
                      <ul>
                        {item.answer.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </Answer>
                </FAQItem>
              ))}
            </FAQList>
          </div>
        ))}

        {/* <ButtonContainer>
          <GradientButton onClick={toggleAll}>
            {expandAll ? "Collapse All" : "Expand All"}
          </GradientButton>
        </ButtonContainer> */}
      </FAQContainer>
    </PageBackground>
  );
}

// Helper function to convert keys into proper section titles
function getModuleTitle(moduleKey) {
  switch (moduleKey) {
    case "Patents":
      return "Patents FAQs";
    case "IndustrialDesigns":
      return "Industrial Designs FAQs";
    case "Copyrights":
      return "Copyrights FAQs";
    case "Trademarks":
      return "Trademarks FAQs";
    case "GeographicalIndications":
      return "Geographical Indications FAQs";
    default:
      return "FAQs";
  }
}

// Styled-component for module header
const ModuleHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: #7c3aed;
    margin-top: 4px;
  }
`;
