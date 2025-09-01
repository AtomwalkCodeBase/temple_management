"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  GiLotus,
  GiPrayerBeads,
  GiMeditation,
  GiStoneTablet,
  GiChurch,
  GiCandleFlame,
  GiTempleGate,
  GiBookmark,
} from "react-icons/gi";
import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";
import { getTempleServicesList } from "../services/templeServices";

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 100px;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
  background: linear-gradient(
    135deg,
    rgba(248, 246, 242, 0.8),
    rgba(245, 242, 235, 0.9)
  );
  border-radius: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(163, 138, 112, 0.2);
`;

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(135deg, #7a6a5a, #8b5a2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  font-family: "Georgia", serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #a38a70;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 300;
`;

const ServiceTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceTypeCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff, #fdfcfa);
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d9a566, #8b5a2b);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(139, 90, 43, 0.3);

    &::before {
      transform: scaleX(1);
    }
  }

  &.active {
    border-color: #8b5a2b;
    background: linear-gradient(135deg, #fff9f3, #fdf7f0);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const ServiceTypeIcon = styled.div`
  font-size: 3.5rem;
  color: #8b5a2b;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  ${ServiceTypeCard}:hover & {
    transform: scale(1.1);
    color: #7a6a5a;
  }
`;

const ServiceTypeName = styled.h3`
  font-size: 1.4rem;
  color: #5a4b41;
  margin-bottom: 0.5rem;
  font-family: "Georgia", serif;
`;

const ServiceTypeCount = styled.p`
  color: #a38a70;
  font-size: 0.9rem;
  margin: 0;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff, #fdfcfa);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(232, 226, 214, 0.5);
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceImage = styled.div`
  height: 220px;
  background: ${(props) =>
    props.image
      ? `url(${props.image})`
      : "linear-gradient(135deg, #f8f6f2, #e8e2d6)"};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) =>
      props.image
        ? "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))"
        : "rgba(255, 255, 255, 0.7)"};
  }

  .placeholder-icon {
    font-size: 4rem;
    color: #a38a70;
    z-index: 2;
  }
`;

const ServiceBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(139, 90, 43, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 3;
  backdrop-filter: blur(10px);
`;

const ServiceContent = styled.div`
  padding: 2rem;
`;

const ServiceHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ServiceName = styled.h2`
  font-size: 1.6rem;
  color: #5a4b41;
  margin: 0 0 0.5rem 0;
  font-family: "Georgia", serif;
  line-height: 1.3;
`;

const ServiceSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7a6a5a;
  font-size: 0.9rem;

  .icon {
    color: #8b5a2b;
    font-size: 1rem;
  }
`;

const PriceDisplay = styled.div`
  background: linear-gradient(
    135deg,
    rgba(248, 230, 204, 0.4),
    rgba(248, 230, 204, 0.2)
  );
  padding: 1.5rem;
  border-radius: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(232, 226, 214, 0.6);
  text-align: center;
`;

const PriceAmount = styled.div`
  font-size: 2rem;
  color: #5a4b41;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: "Georgia", serif;
`;

const PriceLabel = styled.div`
  font-size: 0.9rem;
  color: #8b5a2b;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;

  &.primary {
    background: linear-gradient(135deg, #8b5a2b, #7a6a5a);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #7a6a5a, #6b5a4a);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(139, 90, 43, 0.3);
    }
  }

  &.secondary {
    background: transparent;
    color: #8b5a2b;
    border: 2px solid rgba(139, 90, 43, 0.3);

    &:hover {
      background: rgba(139, 90, 43, 0.1);
      border-color: #8b5a2b;
    }
  }
`;

const ExpandedContent = styled(motion.div)`
  padding: 0 2rem 2rem;
  border-top: 1px solid rgba(232, 226, 214, 0.5);
  margin-top: 1rem;
`;

const DetailSection = styled.div`
  margin-bottom: 2rem;

  h4 {
    font-size: 1.2rem;
    color: #5a4b41;
    margin-bottom: 1rem;
    font-family: "Georgia", serif;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ServiceDescription = styled.p`
  color: #7a6a5a;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const VariationGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const VariationCard = styled.div`
  background: rgba(248, 230, 204, 0.2);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(232, 226, 214, 0.6);

  .variation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .variation-type {
    font-weight: 600;
    color: #8b5a2b;
    font-size: 1.1rem;
  }

  .variation-price {
    font-weight: 700;
    color: #5a4b41;
    font-size: 1.2rem;
  }

  .variation-details {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #7a6a5a;
  }
`;

const PolicyCard = styled.div`
  background: rgba(139, 90, 43, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(139, 90, 43, 0.2);

  .policy-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .policy-label {
    font-weight: 600;
    color: #8b5a2b;
  }

  .policy-value {
    color: #5a4b41;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem;
  flex-direction: column;
  gap: 2rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(163, 138, 112, 0.2);
  border-top: 4px solid #a38a70;
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

const LoadingText = styled.div`
  color: #7a6a5a;
  font-size: 1.2rem;
  font-family: "Georgia", serif;
  text-align: center;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem;
  color: #7a6a5a;

  .icon {
    font-size: 5rem;
    color: #d6ccc0;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #5a4b41;
    font-family: "Georgia", serif;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const DecorativeDivider = styled.div`
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    #d9a566,
    #8b5a2b,
    #d9a566,
    transparent
  );
  margin: 3rem 0;
  border-radius: 2px;
`;

const TempleServicesHomepage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getTempleServicesList();
      setServices(response || []);
    } catch (err) {
      console.error("Error fetching temple services:", err);
      setError("Failed to load temple services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getServiceTypes = () => {
    const types = services.reduce((acc, service) => {
      const type = service.service_type_str || "General";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(types).map(([name, count]) => ({ name, count }));
  };

  const getServiceTypeIcon = (type) => {
    const iconMap = {
      Pooja: <GiPrayerBeads />,
      Ceremony: <GiTempleGate />,
      Worship: <GiCandleFlame />,
      Meditation: <GiMeditation />,
      General: <GiChurch />,
    };
    return iconMap[type] || <GiBookmark />;
  };

  const filteredServices =
    selectedServiceType === "all"
      ? services
      : services.filter(
          (service) => service.service_type_str === selectedServiceType
        );

  const toggleCardExpansion = (serviceId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedCards(newExpanded);
  };

  const handleBookService = (service) => {
    window.location.href = `/customer-login`;
    console.log("Booking service:", service);
  };

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toLocaleString("en-IN")}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
  };

  if (loading) {
    return (
      <HomeContainer>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading sacred services...</LoadingText>
        </LoadingContainer>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer>
        <ErrorContainer>
          <div className="icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </ErrorContainer>
      </HomeContainer>
    );
  }

  const serviceTypes = getServiceTypes();

  return (
    <HomeContainer>
      <HeaderSection>
        <Title>
          <GiLotus /> Temple Services
        </Title>
        <Subtitle>
          Discover the sacred services and offerings available at our temple.
          Each service is designed to bring peace, devotion, and spiritual
          fulfillment.
        </Subtitle>
      </HeaderSection>

      <ServiceTypesGrid>
        <ServiceTypeCard
          className={selectedServiceType === "all" ? "active" : ""}
          onClick={() => setSelectedServiceType("all")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ServiceTypeIcon>
            <GiTempleGate />
          </ServiceTypeIcon>
          <ServiceTypeName>All Services</ServiceTypeName>
          <ServiceTypeCount>
            {services.length} services available
          </ServiceTypeCount>
        </ServiceTypeCard>

        {serviceTypes.map((type) => (
          <ServiceTypeCard
            key={type.name}
            className={selectedServiceType === type.name ? "active" : ""}
            onClick={() => setSelectedServiceType(type.name)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ServiceTypeIcon>{getServiceTypeIcon(type.name)}</ServiceTypeIcon>
            <ServiceTypeName>{type.name}</ServiceTypeName>
            <ServiceTypeCount>{type.count} services</ServiceTypeCount>
          </ServiceTypeCard>
        ))}
      </ServiceTypesGrid>

      <DecorativeDivider />

      <ServicesGrid>
        {filteredServices.map((service, index) => (
          <ServiceCard
            key={service.service_id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <ServiceImage image={service.image}>
              {!service.image && (
                <div className="placeholder-icon">
                  {getServiceTypeIcon(service.service_type_str)}
                </div>
              )}
              <ServiceBadge>{service.service_type_str}</ServiceBadge>
            </ServiceImage>

            <ServiceContent>
              <ServiceHeader>
                <ServiceName>{service.name}</ServiceName>

                <ServiceSummary>
                  {service.duration_minutes && (
                    <SummaryItem>
                      <FiClock className="icon" />
                      <span>{formatDuration(service.duration_minutes)}</span>
                    </SummaryItem>
                  )}
                  {service.capacity && (
                    <SummaryItem>
                      <FiUsers className="icon" />
                      <span>{service.capacity} people</span>
                    </SummaryItem>
                  )}
                </ServiceSummary>
              </ServiceHeader>

              <PriceDisplay>
                <PriceAmount>{formatCurrency(service.base_price)}</PriceAmount>
                <PriceLabel>Starting from</PriceLabel>
              </PriceDisplay>

              <ButtonGroup>
                <ActionButton
                  className="primary"
                  onClick={() => handleBookService(service)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiCalendar />
                  Book Service
                </ActionButton>

                <ActionButton
                  className="secondary"
                  onClick={() => toggleCardExpansion(service.service_id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {expandedCards.has(service.service_id) ? (
                    <>
                      <FiChevronUp />
                      Show Less
                    </>
                  ) : (
                    <>
                      <FiChevronDown />
                      View More
                    </>
                  )}
                </ActionButton>
              </ButtonGroup>
            </ServiceContent>

            <AnimatePresence>
              {expandedCards.has(service.service_id) && (
                <ExpandedContent
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {service.description && (
                    <DetailSection>
                      <h4>
                        <GiStoneTablet />
                        Description
                      </h4>
                      <ServiceDescription>
                        {service.description}
                      </ServiceDescription>
                    </DetailSection>
                  )}

                  {service.service_variation_list &&
                    service.service_variation_list.length > 0 && (
                      <DetailSection>
                        <h4>
                          <GiMeditation />
                          Service Variations
                        </h4>
                        <VariationGrid>
                          {service.service_variation_list.map(
                            (variation, idx) => (
                              <VariationCard key={idx}>
                                <div className="variation-header">
                                  <div className="variation-type">
                                    {variation.pricing_type_str}
                                  </div>
                                  <div className="variation-price">
                                    {formatCurrency(variation.base_price)}
                                  </div>
                                </div>
                                <div className="variation-details">
                                  {variation.start_time &&
                                    variation.end_time && (
                                      <span>
                                        {formatTime(variation.start_time)} -{" "}
                                        {formatTime(variation.end_time)}
                                      </span>
                                    )}
                                  {variation.max_participant && (
                                    <span>
                                      Max {variation.max_participant}{" "}
                                      participants
                                    </span>
                                  )}
                                </div>
                              </VariationCard>
                            )
                          )}
                        </VariationGrid>
                      </DetailSection>
                    )}

                  {service.adv_policy_data &&
                    service.adv_policy_data.is_active && (
                      <DetailSection>
                        <h4>
                          <GiBookmark />
                          Booking Policy
                        </h4>
                        <PolicyCard>
                          <div className="policy-item">
                            <span className="policy-label">
                              Advance Payment:
                            </span>
                            <span className="policy-value">
                              {service.adv_policy_data.percent}% (
                              {service.adv_policy_data.due_mode_str})
                            </span>
                          </div>
                        </PolicyCard>
                      </DetailSection>
                    )}
                </ExpandedContent>
              )}
            </AnimatePresence>
          </ServiceCard>
        ))}
      </ServicesGrid>

      {filteredServices.length === 0 && (
        <ErrorContainer>
          <div className="icon">🏛️</div>
          <h3>No Services Available</h3>
          <p>
            There are currently no services available for the selected category.
            Please try selecting a different service type.
          </p>
        </ErrorContainer>
      )}
    </HomeContainer>
  );
};

export default TempleServicesHomepage;
