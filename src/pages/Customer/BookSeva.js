"use client";

import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
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
  FiHome,
  FiInfo,
  FiCreditCard,
  FiRefreshCw,
  FiPieChart,
  FiImage,
  // AnimatePresence,
} from "react-icons/fi";
import { MdTempleHindu } from "react-icons/md";
import { processBooking } from "../../services/customerServices";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";
import CustomerLayout from "../../components/Customer/CustomerLayout";
import { getTempleServicesList } from "../../services/templeServices";
import { IndianRupee } from "lucide-react";

const BookSevaContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
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
  gap: 1.5rem;
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
    /* transform: translateY(-2px); */
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  }

  .service-header {
    display: flex;
    justify-content: space-between;
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
    display: flex;
    justify-content: center;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .service-description {
    color: #6b7280;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .service-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

  .variations-section {
    margin-top: 1rem;
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
  }

  .variations-title {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .variations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .variation-card {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem;
    background: #f9fafb;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #667eea;
      background: #f0f4ff;
    }

    &.selected {
      border-color: #667eea;
      background: #e0e7ff;
    }

    .variation-type {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .variation-time {
      font-size: 0.8rem;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }

    .variation-price {
      font-weight: 700;
      color: #059669;
    }
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
const PolicyBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
  cursor: pointer;

  .icon {
    font-size: 1rem;
  }
`;

const PolicyModal = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  z-index: 1000;

  .policy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .policy-title {
    font-weight: 700;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .policy-close {
    background: #f3f4f6;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background: #e5e7eb;
      transform: rotate(90deg);
    }
  }

  .policy-details {
    font-size: 0.85rem;
    color: #6b7280;
    line-height: 1.5;
  }

  .policy-item {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;

    .label {
      font-weight: 500;
      color: #374151;
    }

    .value {
      font-weight: 600;
      color: #059669;
    }
  }

  .refund-rule {
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;

    .rule-condition {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .rule-percent {
      color: #059669;
      font-weight: 700;
    }

    .rule-notes {
      color: #6b7280;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }
  }
`;

const ServiceImage = styled(motion.div)`
  width: 100%;
  height: 200px;
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
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

  .image-count {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const ImageGallery = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .gallery-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }

  .gallery-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }

  .gallery-nav {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    padding: 0 1rem;

    button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.5rem;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  .gallery-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .gallery-thumbnails {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1rem;

    .thumbnail {
      width: 60px;
      height: 40px;
      border-radius: 0.25rem;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s ease;

      &.active {
        opacity: 1;
        border: 2px solid white;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const BookSeva = () => {
  const { templeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData } = useCustomerAuth();
  const [activePolicy, setActivePolicy] = useState(null);
  const temple = location.state?.temple;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePolicies, setActivePolicies] = useState({});
  const [bookingData, setBookingData] = useState({
    booking_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    notes: "",
    quantity: 1,
    duration: 60,
  });
  const [imageGallery, setImageGallery] = useState({
    isOpen: false,
    service: null,
    currentIndex: 0,
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
      const filteredServices = response.filter(
        (service) => !templeId || service.temple_id === templeId
      );
      setServices(filteredServices);
    } catch (err) {
      setError("Failed to load services. Please try again.");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedVariation(null);
    setBookingData({
      ...bookingData,
      duration: service.duration_minutes || 60,
    });
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Format booking_date and end_date as DD-MMM-YYYY (e.g., 28-AUG-2025)
    if (name === "booking_date" || name === "end_date") {
      const dateObj = new Date(value);
      if (!isNaN(dateObj.getTime())) {
        const day = String(dateObj.getDate()).padStart(2, "0");
        const monthNames = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ];
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        newValue = `${day}-${month}-${year}`;
      }
    }

    setBookingData({
      ...bookingData,
      [name]: newValue,
    });
  };
  const togglePolicy = (serviceId, policyType) => {
    setActivePolicies((prev) => {
      const newState = { ...prev };
      if (newState[serviceId] === policyType) {
        delete newState[serviceId];
      } else {
        newState[serviceId] = policyType;
      }
      return newState;
    });
  };
  const openImageGallery = (service, index = 0) => {
    setImageGallery({
      isOpen: true,
      service,
      currentIndex: index,
    });
  };

  const closeImageGallery = () => {
    setImageGallery({
      isOpen: false,
      service: null,
      currentIndex: 0,
    });
  };

  const navigateImage = (direction) => {
    setImageGallery((prev) => {
      const images = getServiceImages(prev.service);
      let newIndex = prev.currentIndex + direction;

      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;

      return {
        ...prev,
        currentIndex: newIndex,
      };
    });
  };

  const getServiceImages = (service) => {
    if (!service) return [];

    const images = [];
    if (service.image) images.push(service.image);
    if (service.image_1) images.push(service.image_1);
    if (service.image_2) images.push(service.image_2);
    if (service.image_3) images.push(service.image_3);
    if (service.image_4) images.push(service.image_4);
    if (service.image_5) images.push(service.image_5);

    return images.filter((img) => img !== null);
  };

  const handleConfirmBooking = async () => {
    if (!selectedService) {
      setError("Please select a service");
      return;
    }

    if (
      selectedService.service_variation_list.length > 0 &&
      !selectedVariation
    ) {
      setError("Please select a variation");
      return;
    }

    if (!bookingData.booking_date) {
      setError("Please select a booking date");
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
          variation_id: selectedVariation?.id || null,
          booking_date: bookingData.booking_date,
          end_date: bookingData.end_date || bookingData.booking_date,
          start_time: selectedVariation?.start_time || bookingData.start_time,
          end_time: selectedVariation?.end_time || bookingData.end_time,
          notes: bookingData.notes,
          quantity: Number.parseInt(bookingData.quantity),
          duration: Number.parseInt(bookingData.duration),
          unit_price:
            selectedVariation?.base_price || selectedService.base_price || 0,
        },
      };

      await processBooking(booking);

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
  const renderPolicyModal = (service) => {
    const activePolicy = activePolicies[service.service_id];
    if (!activePolicy) return null;

    const handleClose = (e) => {
      e.stopPropagation();
      togglePolicy(service.service_id, activePolicy);
    };

    switch (activePolicy) {
      case "advance":
        return (
          <PolicyModal
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="policy-header">
              <div className="policy-title">
                <FiCreditCard />
                Advance Payment Policy
              </div>
              <button className="policy-close" onClick={handleClose}>
                <FiX />
              </button>
            </div>
            <div className="policy-details">
              <div className="policy-item">
                <span className="label">Advance Percentage:</span>
                <span className="value">
                  {service.adv_policy_data.percent}%
                </span>
              </div>
              <div className="policy-item">
                <span className="label">Minimum Amount:</span>
                <span className="value">
                  ₹{service.adv_policy_data.min_amount}
                </span>
              </div>
              <div className="policy-item">
                <span className="label">Due Before:</span>
                <span className="value">
                  {service.adv_policy_data.due_days_before} days
                </span>
              </div>
            </div>
          </PolicyModal>
        );

      case "refund":
        return (
          <PolicyModal
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="policy-header">
              <div className="policy-title">
                <FiRefreshCw />
                Refund Policy
              </div>
              <button className="policy-close" onClick={handleClose}>
                <FiX />
              </button>
            </div>
            <div className="policy-details">
              {service.refund_policy_data.refund_rules &&
              service.refund_policy_data.refund_rules.length > 0 ? (
                service.refund_policy_data.refund_rules.map((rule, index) => (
                  <div key={index} className="refund-rule">
                    <div className="rule-condition">
                      Cancel{" "}
                      {rule.min_days_before > 0
                        ? `${rule.min_days_before} day(s) before`
                        : `${rule.min_hours_before} hours before`}
                    </div>
                    <div className="rule-percent">
                      {rule.refund_percent}% refund
                    </div>
                    {rule.notes && (
                      <div className="rule-notes">{rule.notes}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="policy-item">
                  <span className="value">No refund rules specified</span>
                </div>
              )}
            </div>
          </PolicyModal>
        );

      case "pricing":
        return (
          <PolicyModal
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="policy-header">
              <div className="policy-title">
                <FiPieChart />
                Pricing Rules
              </div>
              <button className="policy-close" onClick={handleClose}>
                <FiX />
              </button>
            </div>
            <div className="policy-details">
              <div className="policy-item">
                <span className="label">Weekday Price:</span>
                <span className="value">
                  ₹{service.pricing_rule_data.week_day_price}
                </span>
              </div>
              <div className="policy-item">
                <span className="label">Weekend Price:</span>
                <span className="value">
                  ₹{service.pricing_rule_data.date_price}
                </span>
              </div>
              <div className="policy-item">
                <span className="label">Time-based Price:</span>
                <span className="value">
                  ₹{service.pricing_rule_data.time_price}
                </span>
              </div>
              <div className="policy-item">
                <span className="label">Valid Until:</span>
                <span className="value">
                  {service.pricing_rule_data.end_date}
                </span>
              </div>
            </div>
          </PolicyModal>
        );

      default:
        return null;
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;

    const price = selectedVariation
      ? parseFloat(selectedVariation.base_price)
      : parseFloat(selectedService.base_price);

    return price * bookingData.quantity;
  };

  const formatPrice = (price) => {
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  return (
    <CustomerLayout>
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
            <div className="title">🏛️ Book Hall</div>
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
          <ServicesSection>
            <div className="section-title">
              <FiHome className="icon" />
              Available Halls
            </div>

            {loading ? (
              <EmptyState>
                <div className="icon">⏳</div>
                <div className="title">Loading halls...</div>
              </EmptyState>
            ) : services.length === 0 ? (
              <EmptyState>
                <div className="icon">🏛️</div>
                <div className="title">No Halls Available</div>
                <div className="subtitle">
                  This temple doesn't have any halls available for booking at
                  the moment.
                </div>
              </EmptyState>
            ) : (
              <ServicesGrid>
                {services.map((service, index) => {
                  const serviceImages = getServiceImages(service);
                  const hasImages = serviceImages.length > 0;

                  return (
                    <ServiceCard
                      key={service.service_id}
                      selected={
                        selectedService?.service_id === service.service_id
                      }
                      onClick={() => handleServiceSelect(service)}
                      // initial={{ opacity: 0, y: 20 }}
                      // animate={{ opacity: 1, y: 0 }}
                      // transition={{ duration: 0.4, delay: index * 0.1 }}
                      // whileHover={{ scale: 1.02 }}
                      // whileTap={{ scale: 0.98 }}
                    >
                      {hasImages && (
                        <ServiceImage
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageGallery(service, 0);
                          }}
                        >
                          <img src={serviceImages[0]} alt={service.name} />
                          {serviceImages.length > 1 && (
                            <div className="image-count">
                              <FiImage /> {serviceImages.length}
                            </div>
                          )}
                        </ServiceImage>
                      )}

                      <div className="service-header">
                        <div>
                          <div className="service-name">{service.name}</div>
                          <div className="service-type">
                            {service.service_type_str}
                          </div>
                        </div>
                      </div>

                      {service.description && (
                        <div className="service-description">
                          {service.description}
                        </div>
                      )}

                      <div className="service-details">
                        <div className="detail">
                          <FiUsers className="icon" />
                          <span className="value">
                            Capacity: {service.capacity} people
                          </span>
                        </div>
                        <div className="detail">
                          <FiClock className="icon" />
                          <span className="value">
                            Duration: {service.duration_minutes} mins
                          </span>
                        </div>
                        <div className="detail">
                          <IndianRupee size={18} className="icon" />
                          <span className="value">
                            Base Price: {formatPrice(service.base_price)}
                          </span>
                        </div>
                      </div>

                      {/* Policy Information */}
                      <div style={{ position: "relative", marginTop: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {service.adv_policy_data && (
                            <PolicyBadge
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePolicy(service.service_id, "advance");
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiCreditCard className="icon" />
                              Advance Policy
                            </PolicyBadge>
                          )}

                          {service.refund_policy_data && (
                            <PolicyBadge
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePolicy(service.service_id, "refund");
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiRefreshCw className="icon" />
                              Refund Policy
                            </PolicyBadge>
                          )}

                          {service.pricing_rule_data && (
                            <PolicyBadge
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePolicy(service.service_id, "pricing");
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiPieChart className="icon" />
                              Pricing Rules
                            </PolicyBadge>
                          )}
                        </div>

                        {renderPolicyModal(service)}
                      </div>

                      {service.service_variation_list &&
                        service.service_variation_list.length > 0 && (
                          <div className="variations-section">
                            <div className="variations-title">
                              Available Variations:
                            </div>
                            <div className="variations-grid">
                              {service.service_variation_list.map(
                                (variation, idx) => (
                                  <div
                                    key={idx}
                                    className={`variation-card ${
                                      selectedVariation === variation
                                        ? "selected"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVariationSelect(variation);
                                    }}
                                  >
                                    <div className="variation-type">
                                      {variation.pricing_type_str}
                                    </div>
                                    <div className="variation-time">
                                      {variation.start_time} -{" "}
                                      {variation.end_time}
                                    </div>
                                    <div className="variation-price">
                                      {formatPrice(variation.base_price)}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <div className="selected-indicator">
                        <FiCheck />
                      </div>
                    </ServiceCard>
                  );
                })}
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

                {!selectedVariation && (
                  <>
                    <FormGroup>
                      <label htmlFor="start_time">
                        <FiClock className="icon" />
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={bookingData.start_time}
                        onChange={handleInputChange}
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
                  </>
                )}

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
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Booking" : "Bookings"}
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
                    placeholder="Any special requirements or notes for the hall booking..."
                  />
                </FormGroup>

                <BookingSummary>
                  <div className="summary-title">Booking Summary</div>
                  <div className="summary-item">
                    <span className="label">Hall:</span>
                    <span className="value">{selectedService.name}</span>
                  </div>

                  {selectedVariation && (
                    <div className="summary-item">
                      <span className="label">Variation:</span>
                      <span className="value">
                        {selectedVariation.pricing_type_str} (
                        {selectedVariation.start_time} -{" "}
                        {selectedVariation.end_time})
                      </span>
                    </div>
                  )}

                  <div className="summary-item">
                    <span className="label">Duration:</span>
                    <span className="value">
                      {selectedService.duration_minutes} minutes
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Quantity:</span>
                    <span className="value">{bookingData.quantity}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Unit Price:</span>
                    <span className="value">
                      {formatPrice(
                        selectedVariation
                          ? selectedVariation.base_price
                          : selectedService.base_price
                      )}
                    </span>
                  </div>
                  <div className="summary-item total">
                    <span className="label">Total Amount:</span>
                    <span className="value">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </BookingSummary>

                <ActionButtons>
                  <ActionButton
                    className="secondary"
                    onClick={() => {
                      setSelectedService(null);
                      setSelectedVariation(null);
                    }}
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
                <div className="title">Select a Hall</div>
                <div className="subtitle">
                  Choose a hall from the list to continue with your booking
                </div>
              </EmptyState>
            )}
          </BookingFormSection>
        </ContentGrid>

        {/* Image Gallery Modal */}
        <AnimatePresence>
          {imageGallery.isOpen && (
            <ImageGallery
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="gallery-content">
                <img
                  src={
                    getServiceImages(imageGallery.service)[
                      imageGallery.currentIndex
                    ]
                  }
                  alt="Hall"
                  className="gallery-image"
                />

                <div className="gallery-nav">
                  <button onClick={() => navigateImage(-1)}>←</button>
                  <button onClick={() => navigateImage(1)}>→</button>
                </div>

                <button className="gallery-close" onClick={closeImageGallery}>
                  ✕
                </button>

                {getServiceImages(imageGallery.service).length > 1 && (
                  <div className="gallery-thumbnails">
                    {getServiceImages(imageGallery.service).map(
                      (img, index) => (
                        <div
                          key={index}
                          className={`thumbnail ${
                            index === imageGallery.currentIndex ? "active" : ""
                          }`}
                          onClick={() =>
                            setImageGallery((prev) => ({
                              ...prev,
                              currentIndex: index,
                            }))
                          }
                        >
                          <img src={img} alt={`Thumbnail ${index + 1}`} />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </ImageGallery>
          )}
        </AnimatePresence>
      </BookSevaContainer>
    </CustomerLayout>
  );
};

export default BookSeva;
