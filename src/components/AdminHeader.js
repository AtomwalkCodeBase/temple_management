"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  logout,
  getStoredUsername,
  getStoredFirstName,
} from "../services/authServices";

const HeaderContainer = styled.div`
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;

  @media (max-width: 768px) {
    display: block;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6b7280;
  position: relative;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }

  .badge {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background: #ef4444;
    color: white;
    font-size: 0.7rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    min-width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
`;

const UserInfo = styled.div`
  text-align: left;

  .name {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.9rem;
  }

  .role {
    font-size: 0.8rem;
    color: #6b7280;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #374151;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  &.danger {
    color: #ef4444;

    &:hover {
      background: #fee2e2;
    }
  }
`;

const AdminHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const username = getStoredUsername();
  const firstName = getStoredFirstName();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getUserInitials = () => {
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (username) {
      return username.charAt(0).toUpperCase();
    }
    return "A";
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <MenuToggle>☰</MenuToggle>
        <PageTitle>Temple Management</PageTitle>
      </HeaderLeft>

      <HeaderRight>
        <NotificationButton>
          🔔<span className="badge">3</span>
        </NotificationButton>

        <UserMenu>
          <UserButton onClick={() => setShowUserMenu(!showUserMenu)}>
            <UserAvatar>{getUserInitials()}</UserAvatar>
            <UserInfo>
              <div className="name">{firstName || username || "Admin"}</div>
              <div className="role">Temple Admin</div>
            </UserInfo>
            <span style={{ color: "#6B7280" }}>▼</span>
          </UserButton>

          {showUserMenu && (
            <DropdownMenu
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DropdownItem onClick={() => setShowUserMenu(false)}>
                👤 Profile Settings
              </DropdownItem>
              <DropdownItem onClick={() => setShowUserMenu(false)}>
                ⚙️ Account Settings
              </DropdownItem>
              <DropdownItem onClick={() => setShowUserMenu(false)}>
                📊 Reports
              </DropdownItem>
              <DropdownItem onClick={() => setShowUserMenu(false)}>
                ❓ Help & Support
              </DropdownItem>
              <DropdownItem className="danger" onClick={handleLogout}>
                🚪 Logout
              </DropdownItem>
            </DropdownMenu>
          )}
        </UserMenu>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default AdminHeader;
