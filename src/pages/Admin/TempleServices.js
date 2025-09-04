"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Building2, Bookmark, Calendar, Hotel, Home, TrendingUp, Users, IndianRupee, Activity, CheckCircle, Settings } from "lucide-react";

const PageContainer = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  padding: 16px;
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px 32px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 20px 24px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const HeaderLeft = styled.div`
  h1 {
    font-size: 26px;
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 6px 0;
    letter-spacing: -0.025em;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 22px;
    }
  }

  p {
    color: #64748b;
    font-size: 15px;
    margin: 0;
    font-weight: 400;
    line-height: 1.4;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 16px;
    justify-content: center;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 2px;
    color: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  
  .label {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const CardHeader = styled.div`
  background: ${props => props.bgColor || '#f8fafc'};
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${props => props.active ? '#10b981' : '#6b7280'};
  color: white;
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
`;

const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 6px 0;
  letter-spacing: -0.025em;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  color: #64748b;
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
`;

const MetricItem = styled.div`
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  text-align: center;
  
  .value {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  
  .label {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const FeaturesList = styled.div`
  margin-bottom: 16px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureIcon = styled.div`
  width: 18px;
  height: 18px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardActions = styled.div`
  display: flex;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
    border-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px 0 rgba(59, 130, 246, 0.3);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px 0 rgba(59, 130, 246, 0.2);
  }
`;

const TempleServices = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      title: "Sacred Halls Management",
      subtitle: "Wedding ceremonies, religious functions, and cultural events",
      icon: Building2,
      bgColor: "#fef7e0",
      iconColor: "#f59e0b",
      metrics: {
        total: { value: "12", icon: Building2 },
        active: { value: "8", icon: Activity },
        bookings: { value: "156", icon: Users },
        revenue: { value: "₹2.4L", icon: IndianRupee }
      },
      features: [
        "Wedding ceremony halls",
        "Religious function spaces", 
        "Cultural event venues",
        "Community gathering areas"
      ],
      status: "active"
    },
    {
      id: 2,
      title: "Divine Puja Services",
      subtitle: "Traditional rituals and spiritual ceremonies by learned priests",
      icon: Bookmark,
      bgColor: "#f0f4ff",
      iconColor: "#3b82f6",
      metrics: {
        total: { value: "24", icon: Bookmark },
        active: { value: "18", icon: Activity },
        bookings: { value: "892", icon: Users },
        revenue: { value: "₹3.8L", icon: IndianRupee }
      },
      features: [
        "Daily aarti services",
        "Special occasion pujas",
        "Personal prayer sessions",
        "Blessing ceremonies"
      ],
      status: "active"
    },
    {
      id: 3,
      title: "Temple Events",
      subtitle: "Festivals, workshops, and community spiritual programs",
      icon: Calendar,
      bgColor: "#fdf2f8",
      iconColor: "#ec4899",
      metrics: {
        total: { value: "36", icon: Calendar },
        active: { value: "24", icon: Activity },
        bookings: { value: "1.2K", icon: Users },
        revenue: { value: "₹5.6L", icon: IndianRupee }
      },
      features: [
        "Festival celebrations",
        "Spiritual workshops",
        "Cultural programs",
        "Community events"
      ],
      status: "active"
    },
    {
      id: 4,
      title: "Accommodation Services",
      subtitle: "Comfortable stays for pilgrims and devotees",
      icon: Hotel,
      bgColor: "#f0f9ff",
      iconColor: "#0ea5e9",
      metrics: {
        total: { value: "48", icon: Hotel },
        active: { value: "42", icon: Activity },
        bookings: { value: "634", icon: Users },
        revenue: { value: "₹1.9L", icon: IndianRupee }
      },
      features: [
        "Comfortable rooms",
        "Spiritual ambiance",
        "Pilgrim facilities",
        "Sacred surroundings"
      ],
      status: "active"
    },
    {
      id: 5,
      title: "Home Puja Services",
      subtitle: "Sacred rituals conducted at devotees' homes",
      icon: Home,
      bgColor: "#f0fdf4",
      iconColor: "#10b981",
      metrics: {
        total: { value: "64", icon: Home },
        active: { value: "56", icon: Activity },
        bookings: { value: "428", icon: Users },
        revenue: { value: "₹2.1L", icon: IndianRupee }
      },
      features: [
        "Home ceremonies",
        "Housewarming pujas",
        "Family blessings",
        "Personal consultations"
      ],
      status: "active"
    }
  ];

  const handleManageService = (service) => {
    const routeMap = {
      "Sacred Halls Management": "/halls-management?service=HALL",
      "Divine Puja Services": "/halls-management?service=PUJA",
      "Temple Events": "/templeadmin/calendar",
      "Accommodation Services": "/templeadmin/hall-bookings",
      "Home Puja Services": "/templeadmin/puja-bookings",
    };
    const target = routeMap[service.title] || "/templeadmin/dashboard";
    navigate(target);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <HeaderContent>
            <HeaderLeft>
              <h1>Temple Services Management</h1>
              <p>Comprehensive overview and management of all temple service offerings</p>
            </HeaderLeft>
            <StatsContainer>
              <StatItem>
                <div className="number">
                  <TrendingUp size={20} />
                  184
                </div>
                <div className="label">Total Services</div>
              </StatItem>
              <StatItem>
                <div className="number">
                  <Activity size={20} />
                  148
                </div>
                <div className="label">Active</div>
              </StatItem>
              <StatItem>
                <div className="number">
                  <IndianRupee size={20} />
                  15.8L
                </div>
                <div className="label">Monthly Revenue</div>
              </StatItem>
            </StatsContainer>
          </HeaderContent>
        </PageHeader>

        <ServicesGrid>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <ServiceCard
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                onClick={() => handleManageService(service)}
              >
                <CardHeader bgColor={service.bgColor}>
                  <StatusBadge active={service.status === 'active'}>
                    {service.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                  </StatusBadge>
                  <CardIconWrapper>
                    <IconComponent size={24} color={service.iconColor} />
                  </CardIconWrapper>
                  <CardTitle>{service.title}</CardTitle>
                  <CardSubtitle>{service.subtitle}</CardSubtitle>
                </CardHeader>
                
                <CardContent>
                  <MetricsGrid>
                    <MetricItem>
                      <div className="value">
                        <service.metrics.total.icon size={16} />
                        {service.metrics.total.value}
                      </div>
                      <div className="label">Total</div>
                    </MetricItem>
                    <MetricItem>
                      <div className="value">
                        <service.metrics.active.icon size={16} />
                        {service.metrics.active.value}
                      </div>
                      <div className="label">Active</div>
                    </MetricItem>
                    <MetricItem>
                      <div className="value">
                        <service.metrics.bookings.icon size={16} />
                        {service.metrics.bookings.value}
                      </div>
                      <div className="label">Bookings</div>
                    </MetricItem>
                    <MetricItem>
                      <div className="value">
                        <service.metrics.revenue.icon size={16} />
                        {service.metrics.revenue.value}
                      </div>
                      <div className="label">Revenue</div>
                    </MetricItem>
                  </MetricsGrid>
                  
                  <FeaturesList>
                    {service.features.map((feature, idx) => (
                      <FeatureItem key={idx}>
                        <FeatureIcon>
                          <CheckCircle size={12} color="white" />
                        </FeatureIcon>
                        {feature}
                      </FeatureItem>
                    ))}
                  </FeaturesList>
                  
                  <CardActions>
                    <ActionButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManageService(service);
                      }}
                    >
                      <Settings size={16} />
                      Manage Service
                    </ActionButton>
                  </CardActions>
                </CardContent>
              </ServiceCard>
            );
          })}
        </ServicesGrid>
      </ContentWrapper>
    </PageContainer>
  );
};

export default TempleServices;