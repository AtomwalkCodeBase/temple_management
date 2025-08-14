"use client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { logout } from "../services/authServices";

const HeaderContainer = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  
  @media (min-width: 480px) {
    font-size: 1.25rem;
    max-width: 220px;
  }
  
  @media (min-width: 640px) {
    font-size: 1.4rem;
    max-width: none;
  }
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (min-width: 480px) {
    gap: 0.75rem;
  }
  
  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #64748b;
  font-size: 0.8rem;
  
  @media (min-width: 480px) {
    font-size: 0.85rem;
    gap: 0.5rem;
  }
  
  @media (min-width: 640px) {
    font-size: 0.9rem;
  }
`;

const LogoutButton = styled(motion.button)`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  
  &:hover {
    background: #dc2626;
  }
  
  @media (min-width: 480px) {
    padding: 0.4rem 0.85rem;
    font-size: 0.85rem;
  }
  
  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 0.5rem;
  }
`;

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Temple Management Dashboard</HeaderTitle>
      <HeaderActions>
        <UserInfo>
          <span>👤</span>
          <span>Admin User</span>
        </UserInfo>
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </LogoutButton>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default AdminHeader;