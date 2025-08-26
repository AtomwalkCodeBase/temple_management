"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiBarChart,
} from "react-icons/fi";
import { GiLotus, IncenseBurner, TempleGate } from "react-icons/gi";
import {
  logout,
  getStoredUsername,
  getStoredFirstName,
} from "../../services/authServices";

const HeaderContainer = styled.div`
  background: linear-gradient(90deg, #2c1a0a 0%, #4a2c14 100%);
  border-bottom: 1px solid #8b5a2b;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(44, 26, 10, 0.95);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: 1px solid #8b5a2b;
  font-size: 1.5rem;
  cursor: pointer;
  color: #d9a566;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 90, 43, 0.3);
    color: #ffd700;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PageInfo = styled.div`
  .breadcrumb {
    font-size: 0.8rem;
    color: #d9a566;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      &:not(:last-child)::after {
        content: "/";
        margin-left: 0.5rem;
        color: #8b5a2b;
      }
    }
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f8e6cc;
    margin: 0;
    font-family: "Georgia", serif;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled(motion.button)`
  background: none;
  border: 1px solid #8b5a2b;
  font-size: 1.25rem;
  cursor: pointer;
  color: #d9a566;
  position: relative;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 90, 43, 0.3);
    color: #ffd700;
  }

  .badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: linear-gradient(135deg, #c84b31, #a53a23);
    color: #f8e6cc;
    font-size: 0.7rem;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    min-width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(200, 75, 49, 0.3);
  }
`;

const QuickActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #d9a566, #b38742);
  color: #2c1a0a;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(217, 165, 102, 0.4);

  &:hover {
    box-shadow: 0 4px 12px rgba(217, 165, 102, 0.6);
    background: linear-gradient(135deg, #e0b574, #c49952);
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(139, 90, 43, 0.2);
  border: 1px solid #8b5a2b;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 90, 43, 0.4);
    border-color: #d9a566;
  }
`;

const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #d9a566, #b38742);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c1a0a;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(217, 165, 102, 0.4);
  border: 1px solid #8b5a2b;
`;

const UserInfo = styled.div`
  text-align: left;

  .name {
    font-weight: 600;
    color: #f8e6cc;
    font-size: 0.9rem;
    margin: 0;
  }

  .role {
    font-size: 0.75rem;
    color: #d9a566;
    margin: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChevronIcon = styled(motion.div)`
  color: #d9a566;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: linear-gradient(135deg, #3a2313, #4a2c14);
  border: 1px solid #8b5a2b;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(58, 35, 19, 0.95);
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #8b5a2b;
  background: rgba(44, 26, 10, 0.7);

  .user-name {
    font-weight: 600;
    color: #f8e6cc;
    margin: 0 0 0.25rem 0;
    font-family: "Georgia", serif;
  }

  .user-email {
    font-size: 0.8rem;
    color: #d9a566;
    margin: 0;
  }
`;

const DropdownItem = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #f8e6cc;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(139, 90, 43, 0.3);

  &:hover {
    background: rgba(139, 90, 43, 0.3);
    color: #ffd700;
  }

  &.danger {
    color: #e67c73;

    &:hover {
      background: rgba(200, 75, 49, 0.2);
      color: #ff9d94;
    }
  }

  .icon {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const TemplePatternDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #8b5a2b, transparent);
  margin: 0.25rem 0;
`;

const AdminHeader = ({ onToggleMobileMenu, currentPage = "Dashboard" }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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

  const getBreadcrumb = () => {
    const path = window.location.pathname;
    if (path === "/dashboard") return ["Dashboard"];
    if (path.includes("/temple-list"))
      return ["Temple Management", "Temple List"];
    if (path.includes("/services"))
      return ["Service Management", "Temple Services"];
    if (path.includes("/advance-policies"))
      return ["Policy Management", "Advance Policies"];
    if (path.includes("/refund-policies"))
      return ["Policy Management", "Refund Policies"];
    if (path.includes("/pricing-rules"))
      return ["Policy Management", "Pricing Rules"];
    return ["Dashboard"];
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <MobileMenuButton onClick={onToggleMobileMenu}>
          <FiMenu />
        </MobileMenuButton>

        <PageInfo>
          <div className="breadcrumb">
            {getBreadcrumb().map((crumb, index) => (
              <span key={index}>{crumb}</span>
            ))}
          </div>
          <h1 className="page-title">{currentPage}</h1>
        </PageInfo>
      </HeaderLeft>

      <HeaderRight>
        <QuickActions>
          <QuickActionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/services")}
          >
            <FiSettings size={14} />
            Quick Add
          </QuickActionButton>
        </QuickActions>

        <NotificationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FiBell />
          <span className="badge">3</span>
        </NotificationButton>

        <UserMenu>
          <UserButton
            onClick={() => setShowUserMenu(!showUserMenu)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserAvatar>{getUserInitials()}</UserAvatar>
            <UserInfo>
              <div className="name">{firstName || username || "Admin"}</div>
              <div className="role">Temple Administrator</div>
            </UserInfo>
            <ChevronIcon
              animate={{ rotate: showUserMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown />
            </ChevronIcon>
          </UserButton>

          <AnimatePresence>
            {showUserMenu && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownHeader>
                  <div className="user-name">
                    {firstName || username || "Admin User"}
                  </div>
                  <div className="user-email">temple.admin@example.com</div>
                </DropdownHeader>

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiUser className="icon" />
                  Profile Settings
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiSettings className="icon" />
                  Account Settings
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiBarChart className="icon" />
                  Analytics & Reports
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  whileHover={{ x: 4 }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiHelpCircle className="icon" />
                  Help & Support
                </DropdownItem>

                <TemplePatternDivider />

                <DropdownItem
                  className="danger"
                  whileHover={{ x: 4 }}
                  onClick={handleLogout}
                >
                  <FiLogOut className="icon" />
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </UserMenu>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default AdminHeader;
