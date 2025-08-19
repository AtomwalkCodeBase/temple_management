"use client";

import styled from "styled-components";

const Container = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  background: ${(props) =>
    props.gradient || "linear-gradient(135deg, #EA580C 0%, #DC2626 100%)"};
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    font-size: 2rem;
  }

  .text {
    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin: 0 0 0.5rem 0;
    }

    p {
      opacity: 0.9;
      margin: 0;
    }
  }
`;

const Content = styled.div`
  padding: 0;
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
    <Container>
      <Header gradient={gradient}>
        <HeaderContent>
          {icon && <div className="icon">{icon}</div>}
          <div className="text">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
        </HeaderContent>
        {actions && <div>{actions}</div>}
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default PageContainer;
