"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiTrendingUp,
  FiActivity,
  FiStar,
} from "react-icons/fi";
import { MdTempleHindu } from "react-icons/md";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";
import { getBookingList } from "../../services/customerServices";
import CustomerLayout from "../../components/Customer/CustomerLayout";

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const WelcomeSection = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1.5rem;
  padding: 3rem;
  color: white;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(50%, -50%);
  }

  .welcome-content {
    position: relative;
    z-index: 1;
  }

  .greeting {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ffffff, #f1f5f9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }

  .quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .stat {
    text-align: center;

    .number {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    padding: 2rem;

    .greeting {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${(props) => props.color || "#f59e0b"};
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .stat-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    background: ${(props) => props.color || "#f59e0b"};
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .stat-change {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 0.8rem;

    &.positive {
      color: #10b981;
    }

    &.negative {
      color: #ef4444;
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const RecentBookings = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .view-all {
      color: #f59e0b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const BookingItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #f3f4f6;
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #e5e7eb;
  }

  .booking-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    background: linear-gradient(135deg, #f59e0b, #f97316);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }

  .booking-details {
    flex: 1;

    .service-name {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .booking-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.8rem;
      color: #6b7280;

      .info-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }

  .booking-status {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;

    &.booked {
      background: #dbeafe;
      color: #1e40af;
    }

    &.completed {
      background: #d1fae5;
      color: #065f46;
    }
  }
`;

const QuickActions = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 2rem 0;
  }
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    border-color: #d1d5db;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .action-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background: ${(props) => props.color || "#f59e0b"};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }

  .action-content {
    flex: 1;
    text-align: left;

    .action-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .action-desc {
      font-size: 0.8rem;
      color: #6b7280;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  .subtitle {
    font-size: 0.9rem;
  }
`;

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { customerData } = useCustomerAuth();

  useEffect(() => {
    loadRecentBookings();
  }, []);

  const loadRecentBookings = async () => {
    try {
      if (customerData?.custRefCode) {
        const response = await getBookingList(customerData.custRefCode);
        setBookings(response?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "B":
        return "booked";
      case "C":
        return "completed";
      default:
        return "booked";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toUpperCase()) {
      case "B":
        return "Booked";
      case "C":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const quickActions = [
    {
      title: "Book New Seva",
      desc: "Find temples and book services",
      icon: MdTempleHindu,
      color: "#f59e0b",
      action: () => navigate("/customer-temples"),
    },
    {
      title: "View Bookings",
      desc: "Manage your bookings",
      icon: FiCalendar,
      color: "#3b82f6",
      action: () => navigate("/customer-bookings"),
    },
    {
      title: "Profile Settings",
      desc: "Update your information",
      icon: FiActivity,
      color: "#10b981",
      action: () => navigate("/customer-profile"),
    },
  ];

  return (
    <CustomerLayout>
      <DashboardContainer>
        <WelcomeSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="welcome-content">
            <div className="greeting">🙏 Namaste, Devotee!</div>
            <div className="subtitle">
              Welcome to your spiritual journey dashboard
            </div>

            <div className="quick-stats">
              <div className="stat">
                <div className="number">{bookings.length}</div>
                <div className="label">Total Bookings</div>
              </div>
              <div className="stat">
                <div className="number">
                  {bookings.filter((b) => b.status === "B").length}
                </div>
                <div className="label">Active Bookings</div>
              </div>
              <div className="stat">
                <div className="number">
                  {bookings.filter((b) => b.status === "C").length}
                </div>
                <div className="label">Completed</div>
              </div>
            </div>
          </div>
        </WelcomeSection>

        <StatsGrid>
          <StatCard
            color="#f59e0b"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="stat-header">
              <div className="stat-icon">
                <MdTempleHindu />
              </div>
            </div>
            <div className="stat-value">12</div>
            <div className="stat-label">Temples Visited</div>
            <div className="stat-change positive">
              <FiTrendingUp />
              +2 this month
            </div>
          </StatCard>

          <StatCard
            color="#3b82f6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat-header">
              <div className="stat-icon">
                <FiCalendar />
              </div>
            </div>
            <div className="stat-value">{bookings.length}</div>
            <div className="stat-label">Total Bookings</div>
            <div className="stat-change positive">
              <FiTrendingUp />+{bookings.filter((b) => b.status === "B").length}{" "}
              active
            </div>
          </StatCard>

          <StatCard
            color="#10b981"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stat-header">
              <div className="stat-icon">
                <FiStar />
              </div>
            </div>
            <div className="stat-value">4.9</div>
            <div className="stat-label">Experience Rating</div>
            <div className="stat-change positive">
              <FiTrendingUp />
              Excellent feedback
            </div>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <RecentBookings
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <h3>Recent Bookings</h3>
              <a href="/customer-bookings" className="view-all">
                View All
              </a>
            </div>

            {loading ? (
              <EmptyState>
                <div className="icon">⏳</div>
                <div className="title">Loading bookings...</div>
              </EmptyState>
            ) : bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <BookingItem
                  key={booking.booking_ref_code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="booking-icon">
                    <MdTempleHindu />
                  </div>
                  <div className="booking-details">
                    <div className="service-name">{booking.service}</div>
                    <div className="booking-info">
                      <div className="info-item">
                        <FiCalendar />
                        {booking.booking_date}
                      </div>
                      <div className="info-item">
                        <FiMapPin />
                        {booking.booking_ref_code}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`booking-status ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </div>
                </BookingItem>
              ))
            ) : (
              <EmptyState>
                <div className="icon">🙏</div>
                <div className="title">No bookings yet</div>
                <div className="subtitle">
                  Start your spiritual journey by booking a seva
                </div>
              </EmptyState>
            )}
          </RecentBookings>

          <QuickActions
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>Quick Actions</h3>
            {quickActions.map((action, index) => (
              <ActionButton
                key={index}
                color={action.color}
                onClick={action.action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="action-icon">
                  <action.icon />
                </div>
                <div className="action-content">
                  <div className="action-title">{action.title}</div>
                  <div className="action-desc">{action.desc}</div>
                </div>
              </ActionButton>
            ))}
          </QuickActions>
        </ContentGrid>
      </DashboardContainer>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
