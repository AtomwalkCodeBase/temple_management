"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiCheck,
  FiX,
  FiFilter,
  FiUser,
  FiClock,
  FiDollarSign,
  FiPhone,
  FiMail,
  FiHome,
  FiInfo,
  FiCreditCard,
  FiRefreshCw,
  FiPieChart,
  FiImage,
} from "react-icons/fi";
import { MdTempleHindu } from "react-icons/md";
import {
  getBookingList,
  processBooking,
} from "../../services/customerServices";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";
import CustomerLayout from "../../components/Customer/CustomerLayout";

const BookingsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
`;

const HeaderSection = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1.5rem;
  padding: 2rem;
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

  .header-content {
    position: relative;
    z-index: 1;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid #6ee7b7;
  font-weight: 600;
  font-size: 1.1rem;
`;

const FilterSection = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .filter-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        color: #667eea;
      }
    }
  }

  .filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: 600;
      color: #374151;
      font-size: 0.9rem;
    }

    input,
    select {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }
  }
`;

const BookingsGrid = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); */
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BookingCard = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${(props) => {
      switch (props.status) {
        case "B":
          return "#3b82f6";
        case "C":
          return "#10b981";
        case "X":
          return "#ef4444";
        default:
          return "#6b7280";
      }
    }};
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const BookingRef = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.booked {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
  }

  &.completed {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
  }

  &.cancelled {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #dc2626;
  }
`;

const ServiceImage = styled(motion.div)`
  width: 100%;
  height: 200px;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ServiceInfo = styled.div`
  margin-bottom: 1.5rem;

  .service-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      color: #667eea;
      font-size: 1.4rem;
    }
  }

  .service-description {
    color: #6b7280;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailCard = styled.div`
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;

  .detail-title {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;

    .icon {
      color: #667eea;
    }
  }

  .detail-content {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .detail-value {
    font-weight: 600;
    color: #1f2937;
    margin-top: 0.25rem;
  }
`;

const CustomerInfo = styled.div`
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #bae6fd;

  .customer-header {
    font-weight: 700;
    color: #0369a1;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .customer-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .customer-detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;

    .icon {
      color: #0369a1;
      min-width: 16px;
    }

    .label {
      color: #6b7280;
      font-weight: 500;
    }

    .value {
      color: #1f2937;
      font-weight: 600;
    }
  }
`;

const PolicySection = styled.div`
  margin-bottom: 1.5rem;

  .policy-header {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .policy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .policy-item {
    background: #f9fafb;
    border-radius: 0.5rem;
    padding: 0.75rem;
    font-size: 0.85rem;

    .policy-label {
      color: #6b7280;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .policy-value {
      color: #059669;
      font-weight: 600;
    }
  }
`;

const BookingActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &.update {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;

    &:hover {
      background: linear-gradient(135deg, #bfdbfe, #93c5fd);
      transform: translateY(-2px);
    }
  }

  &.cancel {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #dc2626;

    &:hover {
      background: linear-gradient(135deg, #fecaca, #fca5a5);
      transform: translateY(-2px);
    }
  }

  &.complete {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;

    &:hover {
      background: linear-gradient(135deg, #a7f3d0, #6ee7b7);
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #6b7280;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .text {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 500px;
  border: 1px solid #fca5a5;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #6b7280;

  .icon {
    font-size: 5rem;
    margin-bottom: 2rem;
    opacity: 0.5;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #374151;
  }

  .subtitle {
    font-size: 1rem;
    max-width: 400px;
    margin: 0 auto 2rem;
  }

  .cta-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }
  }
`;

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { customerData } = useCustomerAuth();

  const successMessage = location.state?.message;

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filters]);

  const loadBookings = async () => {
    const data = customerData?.custRefCode;
    try {
      setLoading(true);
      const response = await getBookingList(data);
      setBookings(response);
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = bookings;

    if (filters.search) {
      filtered = filtered.filter(
        (booking) =>
          booking.service_data?.name
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          booking.ref_code
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          booking.customer_data?.name
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (booking) => booking.status === filters.status
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (booking) => booking.booking_date >= filters.dateFrom
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (booking) => booking.booking_date <= filters.dateTo
      );
    }

    setFilteredBookings(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleBookingAction = async (bookingRefCode, action) => {
    setActionLoading(bookingRefCode);
    setError("");

    try {
      const bookingData = {
        booking_data: {
          cust_ref_code: customerData.custRefCode,
          call_mode: action.toUpperCase(),
          booking_ref_code: bookingRefCode,
          remarks: `Booking ${action.toLowerCase()}d by customer`,
        },
      };

      await processBooking(bookingData);
      await loadBookings(); // Reload bookings
    } catch (err) {
      setError(err.message || `Failed to ${action.toLowerCase()} booking.`);
    } finally {
      setActionLoading("");
    }
  };

  const getStatusText = (status) => {
    switch (status?.toUpperCase()) {
      case "B":
        return "Booked";
      case "C":
        return "Completed";
      case "X":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "B":
        return "booked";
      case "C":
        return "completed";
      case "X":
        return "cancelled";
      default:
        return "booked";
    }
  };

  const formatPrice = (price) => {
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  const calculateTotal = (booking) => {
    return parseFloat(booking.unit_price) * booking.quantity;
  };

  if (loading) {
    return (
      <CustomerLayout>
        <LoadingContainer>
          <div className="spinner"></div>
          <div className="text">Loading your bookings...</div>
        </LoadingContainer>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <BookingsContainer>
        <HeaderSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <div className="title">📋 My Bookings</div>
            <div className="subtitle">
              Manage and track your spiritual journey
            </div>
          </div>
        </HeaderSection>

        <AnimatePresence>
          {successMessage && (
            <SuccessMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {successMessage}
            </SuccessMessage>
          )}
        </AnimatePresence>

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </ErrorMessage>
        )}

        <FilterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="filter-header">
            <div className="filter-title">
              <FiFilter className="icon" />
              Filter Bookings
            </div>
          </div>
          <div className="filter-grid">
            <div className="filter-item">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search by service, booking ID, or name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div className="filter-item">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Status</option>
                <option value="B">Booked</option>
                <option value="C">Completed</option>
                <option value="X">Cancelled</option>
              </select>
            </div>
            <div className="filter-item">
              <label>From Date</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
            </div>
            <div className="filter-item">
              <label>To Date</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </div>
          </div>
        </FilterSection>

        {filteredBookings.length === 0 ? (
          <EmptyState>
            <div className="icon">🙏</div>
            <div className="title">
              {bookings.length === 0
                ? "No Bookings Yet"
                : "No Bookings Match Your Filters"}
            </div>
            <div className="subtitle">
              {bookings.length === 0
                ? "Start your spiritual journey by booking a seva at your favorite temple"
                : "Try adjusting your filters to see more bookings"}
            </div>
            {bookings.length === 0 && (
              <button
                className="cta-button"
                onClick={() => navigate("/customer-temples")}
              >
                Book Your First Seva
              </button>
            )}
          </EmptyState>
        ) : (
          <BookingsGrid>
            {filteredBookings.map((booking, index) => (
              <BookingCard
                key={booking.ref_code}
                status={booking.status}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BookingHeader>
                  <BookingRef>{booking.ref_code}</BookingRef>
                  <StatusBadge className={getStatusClass(booking.status)}>
                    {getStatusText(booking.status)}
                  </StatusBadge>
                </BookingHeader>

                {booking.service_data?.image && (
                  <ServiceImage>
                    <img
                      src={booking.service_data.image}
                      alt={booking.service_data.name}
                      onClick={() =>
                        window.open(booking.service_data.image, "_blank")
                      }
                    />
                  </ServiceImage>
                )}

                <ServiceInfo>
                  <div className="service-name">
                    <MdTempleHindu className="icon" />
                    {booking.service_data?.name || "Service"}
                  </div>
                  {booking.service_data?.description && (
                    <div className="service-description">
                      {booking.service_data.description}
                    </div>
                  )}
                </ServiceInfo>

                <BookingDetails>
                  <DetailCard>
                    <div className="detail-title">
                      <FiCalendar className="icon" />
                      Booking Details
                    </div>
                    <div className="detail-content">
                      <div>
                        Date:{" "}
                        <span className="detail-value">
                          {booking.booking_date}
                        </span>
                      </div>
                      <div>
                        Time:{" "}
                        <span className="detail-value">
                          {booking.start_time} - {booking.end_time}
                        </span>
                      </div>
                      <div>
                        Quantity:{" "}
                        <span className="detail-value">{booking.quantity}</span>
                      </div>
                    </div>
                  </DetailCard>

                  <DetailCard>
                    <div className="detail-title">
                      <FiDollarSign className="icon" />
                      Pricing
                    </div>
                    <div className="detail-content">
                      <div>
                        Unit Price:{" "}
                        <span className="detail-value">
                          {formatPrice(booking.unit_price)}
                        </span>
                      </div>
                      <div>
                        Total:{" "}
                        <span className="detail-value">
                          {formatPrice(calculateTotal(booking))}
                        </span>
                      </div>
                      {booking.service_variation_data && (
                        <div>
                          Variation:{" "}
                          <span className="detail-value">
                            {booking.service_variation_data.pricing_type_str}
                          </span>
                        </div>
                      )}
                    </div>
                  </DetailCard>

                  <DetailCard>
                    <div className="detail-title">
                      <FiHome className="icon" />
                      Temple Info
                    </div>
                    <div className="detail-content">
                      <div>
                        Name:{" "}
                        <span className="detail-value">
                          {booking.service_data?.temple_name}
                        </span>
                      </div>
                      <div>
                        Capacity:{" "}
                        <span className="detail-value">
                          {booking.service_data?.capacity} people
                        </span>
                      </div>
                      <div>
                        Duration:{" "}
                        <span className="detail-value">
                          {booking.service_data?.duration_minutes} mins
                        </span>
                      </div>
                    </div>
                  </DetailCard>
                </BookingDetails>

                <CustomerInfo>
                  <div className="customer-header">
                    <FiUser />
                    Customer Information
                  </div>
                  <div className="customer-details">
                    <div className="customer-detail">
                      <FiUser className="icon" />
                      <span className="label">Name:</span>
                      <span className="value">
                        {booking.customer_data?.name}
                      </span>
                    </div>
                    <div className="customer-detail">
                      <FiMail className="icon" />
                      <span className="label">Email:</span>
                      <span className="value">
                        {booking.customer_data?.email_id}
                      </span>
                    </div>
                    <div className="customer-detail">
                      <FiPhone className="icon" />
                      <span className="label">Phone:</span>
                      <span className="value">
                        {booking.customer_data?.mobile_number}
                      </span>
                    </div>
                    <div className="customer-detail">
                      <FiPhone className="icon" />
                      <span className="label">Alt Phone:</span>
                      <span className="value">
                        {booking.customer_data?.alternate_contact_number}
                      </span>
                    </div>
                  </div>
                </CustomerInfo>

                {booking.service_data && (
                  <PolicySection>
                    <div className="policy-header">
                      <FiInfo className="icon" />
                      Booking Policies
                    </div>
                    <div className="policy-grid">
                      {booking.service_data.adv_policy_data && (
                        <div className="policy-item">
                          <div className="policy-label">Advance Payment:</div>
                          <div className="policy-value">
                            {booking.service_data.adv_policy_data.percent}% (Min
                            ₹{booking.service_data.adv_policy_data.min_amount})
                          </div>
                        </div>
                      )}
                      {booking.service_data.refund_policy_data && (
                        <div className="policy-item">
                          <div className="policy-label">Refund Policy:</div>
                          <div className="policy-value">
                            {booking.service_data.refund_policy_data.name}
                          </div>
                        </div>
                      )}
                      {booking.service_data.pricing_rule_data && (
                        <div className="policy-item">
                          <div className="policy-label">Pricing Rule:</div>
                          <div className="policy-value">
                            {booking.service_data.pricing_rule_data.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </PolicySection>
                )}

                {booking.status?.toUpperCase() === "B" && (
                  <BookingActions>
                    <ActionButton
                      className="cancel"
                      onClick={() =>
                        handleBookingAction(booking.ref_code, "cancel")
                      }
                      disabled={actionLoading === booking.ref_code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiX />
                      {actionLoading === booking.ref_code
                        ? "..."
                        : "Cancel Booking"}
                    </ActionButton>
                    <ActionButton
                      className="complete"
                      onClick={() =>
                        handleBookingAction(booking.ref_code, "complete")
                      }
                      disabled={actionLoading === booking.ref_code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiCheck />
                      {actionLoading === booking.ref_code
                        ? "..."
                        : "Mark Complete"}
                    </ActionButton>
                  </BookingActions>
                )}
              </BookingCard>
            ))}
          </BookingsGrid>
        )}
      </BookingsContainer>
    </CustomerLayout>
  );
};

export default CustomerBookings;
