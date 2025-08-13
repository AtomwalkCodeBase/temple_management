import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import Button from "../Button";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border-radius: 0 0 12px 12px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Inter', sans-serif;
`;

const PageSubtitle = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #800000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
`;

const UserRole = styled.span`
  color: #64748b;
  font-size: 0.75rem;
`;

const LogoutButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
`;

// Page title mapping
const getPageInfo = (pathname) => {
  const path = pathname.split('/').pop();
  
  switch (path) {
    case 'dashboard':
      return {
        title: 'Dashboard',
        subtitle: 'Overview of temple management system'
      };
    case 'puja-master':
      return {
        title: 'Puja Master',
        subtitle: 'Manage puja configurations, time slots, and categories'
      };
    case 'hall-master':
      return {
        title: 'Hall Master',
        subtitle: 'Manage temple halls and facilities'
      };
    case 'puja-bookings':
      return {
        title: 'Puja Bookings',
        subtitle: 'View and manage puja reservations'
      };
    case 'hall-bookings':
      return {
        title: 'Hall Bookings',
        subtitle: 'View and manage hall reservations'
      };
    case 'calendar':
      return {
        title: 'Calendar',
        subtitle: 'Temple events and schedule management'
      };
    case 'manual-booking':
      return {
        title: 'Manual Booking',
        subtitle: 'Create and manage bookings manually'
      };
    case 'reports':
      return {
        title: 'Reports',
        subtitle: 'Analytics and reporting dashboard'
      };
    case 'temple-master':
      return {
        title: 'Temple Master',
        subtitle: 'Manage temple details and images'
      };
    default:
      return {
        title: 'Admin Panel',
        subtitle: 'Temple Management System'
      };
  }
};

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("userToken");
    localStorage.removeItem("customerToken");
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <TitleSection>
        <PageTitle>{pageInfo.title}</PageTitle>
        <PageSubtitle>{pageInfo.subtitle}</PageSubtitle>
      </TitleSection>
      
      <RightSection>
        <UserInfo>
          <UserAvatar>R</UserAvatar>
          <UserDetails>
            <UserName>Richard</UserName>
            <UserRole>Admin</UserRole>
          </UserDetails>
        </UserInfo>
        
        <LogoutButton 
          color="red" 
          variant="outline" 
          onClick={handleLogout}
        >
          <MdLogout />
          Logout
        </LogoutButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default AdminHeader;
