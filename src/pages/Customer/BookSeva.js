"use client";

import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiFileText,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import { MdTempleHindu } from "react-icons/md";
// import { fetchTempleServices } from "../../services/templeServices";
import { processBooking } from "../../services/customerServices";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";
import CustomerLayout from "../../components/Customer/CustomerLayout";
import { getTempleServicesList } from "../../services/templeServices";
import HallsManagement from "../Admin/HallsManagement";

const BookSevaContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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

  .back-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  .temple-name {
    font-size: 1.3rem;
    opacity: 0.9;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    .title {
      font-size: 2rem;
    }

    .temple-name {
      font-size: 1.1rem;
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

const ServicesSection = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      color: #667eea;
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const ServiceCard = styled(motion.div)`
  border: 2px solid ${(props) => (props.selected ? "#667eea" : "#e5e7eb")};
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.selected ? "#f8faff" : "white")};
  position: relative;

  &:hover {
    border-color: #667eea;
    background: #f8faff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }

  .service-header {
    display: flex;
    justify-content: between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .service-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
    flex: 1;
  }

  .service-type {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .service-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #6b7280;

    .icon {
      color: #667eea;
      font-size: 1rem;
    }

    .value {
      font-weight: 600;
      color: #374151;
    }
  }

  .selected-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 24px;
    height: 24px;
    background: #667eea;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

const BookingFormSection = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  height: fit-content;
  position: sticky;
  top: 2rem;

  .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      color: #667eea;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      color: #667eea;
    }
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const BookingSummary = styled.div`
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;

  .summary-title {
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;

    .label {
      color: #6b7280;
      font-weight: 500;
    }

    .value {
      color: #1f2937;
      font-weight: 600;
    }

    &.total {
      border-top: 1px solid #d1d5db;
      padding-top: 0.75rem;
      margin-top: 1rem;
      font-size: 1rem;

      .value {
        color: #667eea;
        font-size: 1.2rem;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;
    border: 2px solid #e5e7eb;

    &:hover {
      background: #e5e7eb;
      border-color: #d1d5db;
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  border: 1px solid #fca5a5;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "⚠️";
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

const BookSeva = () => {
  const { templeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData } = useCustomerAuth();

  const temple = location.state?.temple;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  const [bookingData, setBookingData] = useState({
    booking_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    notes: "",
    quantity: 1,
    duration: 60,
  });

  useEffect(() => {
    if (templeId) {
      loadServices();
    }
  }, [templeId]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await getTempleServicesList(templeId);
      // Filter services to show only Seva type services
      const sevaServices =
        // response.data?.filter(
        //   (service) =>
        //     service.service_type?.toLowerCase().includes("seva") ||
        //     service.service_type?.toLowerCase().includes("pooja") ||
        //     service.service_type?.toLowerCase().includes("puja")
        // ) || [];
        setServices(response);
    } catch (err) {
      setError("Failed to load services. Please try again.");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setBookingData({
      ...bookingData,
      duration: service.duration || 60,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleConfirmBooking = async () => {
    if (!selectedService) {
      setError("Please select a service");
      return;
    }

    if (!bookingData.booking_date || !bookingData.start_time) {
      setError("Please fill in all required fields");
      return;
    }

    setBookingLoading(true);
    setError("");

    try {
      const booking = {
        booking_data: {
          cust_ref_code: customerData.custRefCode,
          call_mode: "ADD_BOOKING",
          service_id: selectedService.service_id,
          booking_date: bookingData.booking_date,
          end_date: bookingData.end_date || bookingData.booking_date,
          start_time: bookingData.start_time,
          end_time: bookingData.end_time,
          notes: bookingData.notes,
          quantity: Number.parseInt(bookingData.quantity),
          duration: Number.parseInt(bookingData.duration),
          unit_price: selectedService.price || 0,
        },
      };

      await processBooking(booking);

      // Navigate to booking success or bookings list
      navigate("/customer-bookings", {
        state: {
          message: "🎉 Booking confirmed successfully!",
          booking: booking.booking_data,
        },
      });
    } catch (err) {
      setError(err.message || "Failed to confirm booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/customer-temples");
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    return (selectedService.price || 0) * bookingData.quantity;
  };

  return (
    <CustomerLayout>
      {/* <HallsManagement /> */}
      <BookSevaContainer>
        <HeaderSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <button className="back-button" onClick={handleBack}>
              <FiArrowLeft />
              Back to Temples
            </button>
            <div className="title">🙏 Book Sacred Seva</div>
            <div className="temple-name">{temple?.name || "Temple"}</div>
          </div>
        </HeaderSection>

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </ErrorMessage>
        )}

        <ContentGrid>
          <ServicesSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="section-title">
              <MdTempleHindu className="icon" />
              Available Sevas
            </div>

            {loading ? (
              <EmptyState>
                <div className="icon">⏳</div>
                <div className="title">Loading services...</div>
              </EmptyState>
            ) : services.length === 0 ? (
              <EmptyState>
                <div className="icon">🙏</div>
                <div className="title">No Seva Services Available</div>
                <div className="subtitle">
                  This temple doesn't have any seva services available at the
                  moment.
                </div>
              </EmptyState>
            ) : (
              <ServicesGrid>
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.service_id}
                    selected={
                      selectedService?.service_id === service.service_id
                    }
                    onClick={() => handleServiceSelect(service)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="service-header">
                      <div>
                        <div className="service-name">
                          {service.service_name}
                        </div>
                        <div className="service-type">
                          {service.service_type}
                        </div>
                      </div>
                    </div>

                    <div className="service-details">
                      <div className="detail">
                        <FiClock className="icon" />
                        <span className="value">
                          {service.duration || 60} mins
                        </span>
                      </div>
                      <div className="detail">
                        <FiDollarSign className="icon" />
                        <span className="value">₹{service.price || 0}</span>
                      </div>
                      <div className="detail">
                        <FiUsers className="icon" />
                        <span className="value">Available</span>
                      </div>
                    </div>

                    <div className="selected-indicator">
                      <FiCheck />
                    </div>
                  </ServiceCard>
                ))}
              </ServicesGrid>
            )}
          </ServicesSection>

          <BookingFormSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-title">
              <FiCalendar className="icon" />
              Booking Details
            </div>

            {selectedService ? (
              <>
                <FormGroup>
                  <label htmlFor="booking_date">
                    <FiCalendar className="icon" />
                    Booking Date *
                  </label>
                  <input
                    type="date"
                    id="booking_date"
                    name="booking_date"
                    value={bookingData.booking_date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="start_time">
                    <FiClock className="icon" />
                    Start Time *
                  </label>
                  <input
                    type="time"
                    id="start_time"
                    name="start_time"
                    value={bookingData.start_time}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="end_time">
                    <FiClock className="icon" />
                    End Time
                  </label>
                  <input
                    type="time"
                    id="end_time"
                    name="end_time"
                    value={bookingData.end_time}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="quantity">
                    <FiUser className="icon" />
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={bookingData.quantity}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="notes">
                    <FiFileText className="icon" />
                    Special Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or notes for the seva..."
                  />
                </FormGroup>

                <BookingSummary>
                  <div className="summary-title">Booking Summary</div>
                  <div className="summary-item">
                    <span className="label">Service:</span>
                    <span className="value">
                      {selectedService.service_name}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Duration:</span>
                    <span className="value">
                      {bookingData.duration} minutes
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Quantity:</span>
                    <span className="value">{bookingData.quantity}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Unit Price:</span>
                    <span className="value">₹{selectedService.price || 0}</span>
                  </div>
                  <div className="summary-item total">
                    <span className="label">Total Amount:</span>
                    <span className="value">₹{calculateTotal()}</span>
                  </div>
                </BookingSummary>

                <ActionButtons>
                  <ActionButton
                    className="secondary"
                    onClick={() => setSelectedService(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiX />
                    Cancel
                  </ActionButton>
                  <ActionButton
                    className="primary"
                    onClick={handleConfirmBooking}
                    disabled={bookingLoading}
                    whileHover={{ scale: bookingLoading ? 1 : 1.02 }}
                    whileTap={{ scale: bookingLoading ? 1 : 0.98 }}
                  >
                    {bookingLoading ? (
                      <>
                        <LoadingSpinner />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <FiCheck />
                        Confirm Booking
                      </>
                    )}
                  </ActionButton>
                </ActionButtons>
              </>
            ) : (
              <EmptyState>
                <div className="icon">👆</div>
                <div className="title">Select a Service</div>
                <div className="subtitle">
                  Choose a seva from the list to continue with your booking
                </div>
              </EmptyState>
            )}
          </BookingFormSection>
        </ContentGrid>
      </BookSevaContainer>
    </CustomerLayout>
  );
};

export default BookSeva;
