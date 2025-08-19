"use client";

import { FiHome, FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi";
import styled from "styled-components";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${(props) => props.color || "#f59e0b"};

  .icon {
    font-size: 2.5rem;
    color: ${(props) => props.color || "#f59e0b"};
    margin-bottom: 1rem;
  }

  .number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .label {
    color: #6b7280;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .change {
    font-size: 0.8rem;
    font-weight: 600;
    color: #059669;
  }
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      repeat;
    opacity: 0.3;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
    max-width: 600px;
  }
`;

const AdminDashboard = () => {
  const stats = [
    {
      icon: <FiHome />,
      number: "12",
      label: "Active Services",
      change: "+2 this month",
      color: "#059669",
    },
    {
      icon: <FiUsers />,
      number: "156",
      label: "Total Devotees",
      change: "+12% from last month",
      color: "#dc2626",
    },
    {
      icon: <FiDollarSign />,
      number: "₹25,000",
      label: "Today's Revenue",
      change: "+8% from yesterday",
      color: "#7c3aed",
    },
    {
      icon: <FiTrendingUp />,
      number: "45",
      label: "Today's Bookings",
      change: "+5 from yesterday",
      color: "#f59e0b",
    },
  ];

  return (
    <>
      <WelcomeSection>
        <div className="content">
          <h1>🕉️ Welcome to Temple Admin</h1>
          <p>
            Manage your temple services, bookings, and policies from this
            comprehensive dashboard
          </p>
        </div>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index} color={stat.color}>
            <div className="icon">{stat.icon}</div>
            <div className="number">{stat.number}</div>
            <div className="label">{stat.label}</div>
            <div className="change">{stat.change}</div>
          </StatCard>
        ))}
      </StatsGrid>
    </>
  );
};

export default AdminDashboard;
