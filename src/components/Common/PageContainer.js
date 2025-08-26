"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  background: linear-gradient(135deg, #f8f4eb 0%, #f1e9d9 100%);
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #d9a566;
`;

const Header = styled.div`
  background: ${(props) =>
    props.gradient || "linear-gradient(135deg, #4a2c14 0%, #3a2313 100%)"};
  color: #f8e6cc;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 20% 30%,
        rgba(217, 165, 102, 0.1) 2px,
        transparent 2px
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(217, 165, 102, 0.1) 2px,
        transparent 2px
      );
    background-size: 30px 30px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 2;

  .icon {
    font-size: 2.5rem;
    color: #d9a566;
    background: rgba(44, 26, 10, 0.3);
    padding: 0.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(217, 165, 102, 0.3);
  }

  .text {
    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin: 0 0 0.5rem 0;
      font-family: "Georgia", serif;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: #f8e6cc;
    }

    p {
      opacity: 0.9;
      margin: 0;
      color: #d9a566;
      font-size: 1rem;
      max-width: 600px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;

    .icon {
      font-size: 2rem;
      padding: 0.5rem;
    }

    .text h1 {
      font-size: 1.75rem;
    }
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Content = styled.div`
  padding: 0;
  background: linear-gradient(135deg, #f8f4eb 0%, #f1e9d9 100%);
`;

const DecorativeBorder = styled.div`
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    #d9a566,
    #b38742,
    #d9a566,
    transparent
  );
  margin: 0 1rem;
  border-radius: 2px;
`;

const PageContainer = ({
  title,
  description,
  icon,
  gradient,
  actions,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Header gradient={gradient}>
          <HeaderContent>
            {icon && <div className="icon">{icon}</div>}
            <div className="text">
              <h1>{title}</h1>
              {description && <p>{description}</p>}
            </div>
          </HeaderContent>
          {actions && <ActionsContainer>{actions}</ActionsContainer>}
        </Header>
        <DecorativeBorder />
        <Content>{children}</Content>
      </Container>
    </motion.div>
  );
};

export default PageContainer;
