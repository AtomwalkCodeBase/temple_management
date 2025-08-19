"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTempleServicesList,
  getServiceTypeList,
  getPriceTypeList,
  getAdvancePolicyList,
  getRefundPolicyList,
  getPricingRuleList,
  processTempleServiceData,
} from "../../services/templeServices";
import { getStoredTempleId } from "../../services/authServices";
import AddServiceModal from "../../components/AddServiceModal";

const PageContainer = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const HeaderContent = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }

  p {
    opacity: 0.9;
    margin: 0;
  }
`;

const AddButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`;

const ServiceType = styled.span`
  background: #eef2ff;
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ServiceDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.5;
`;

const ServiceDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  .label {
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 500;
  }

  .value {
    font-size: 0.9rem;
    color: #1f2937;
    font-weight: 600;
  }
`;

const ServiceActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid #d1d5db;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
    border-color: #9ca3af;
  }

  &.edit {
    border-color: #f59e0b;
    color: #f59e0b;

    &:hover {
      background: #fef3c7;
    }
  }

  &.delete {
    border-color: #ef4444;
    color: #ef4444;

    &:hover {
      background: #fee2e2;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #ea580c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #374151;
  }
`;

const TempleServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [priceTypes, setPriceTypes] = useState([]);
  const [advancePolicies, setAdvancePolicies] = useState([]);
  const [refundPolicies, setRefundPolicies] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);

  const templeId = getStoredTempleId();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchServices(),
        fetchServiceTypes(),
        fetchPriceTypes(),
        fetchAdvancePolicies(),
        fetchRefundPolicies(),
        fetchPricingRules(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getTempleServicesList();
      // Filter services by temple_id if needed
      const filteredServices = response.filter(
        (service) => !templeId || service.temple_id === templeId
      );
      setServices(filteredServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  const fetchServiceTypes = async () => {
    try {
      const response = await getServiceTypeList();
      setServiceTypes(response);
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  const fetchPriceTypes = async () => {
    try {
      const response = await getPriceTypeList();
      setPriceTypes(response);
    } catch (error) {
      console.error("Error fetching price types:", error);
    }
  };

  const fetchAdvancePolicies = async () => {
    try {
      const response = await getAdvancePolicyList();
      setAdvancePolicies(response);
    } catch (error) {
      console.error("Error fetching advance policies:", error);
    }
  };

  const fetchRefundPolicies = async () => {
    try {
      const response = await getRefundPolicyList();
      setRefundPolicies(response);
    } catch (error) {
      console.error("Error fetching refund policies:", error);
    }
  };

  const fetchPricingRules = async () => {
    try {
      const response = await getPricingRuleList();
      setPricingRules(response);
    } catch (error) {
      console.error("Error fetching pricing rules:", error);
    }
  };

  const handleAddService = () => {
    setSelectedService(null);
    setShowAddModal(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setShowAddModal(true);
  };

  const handleDeleteService = async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.name}"?`)) {
      try {
        await processTempleServiceData({
          call_mode: "DELETE",
          service_id: service.service_id,
        });
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service");
      }
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSelectedService(null);
  };

  const handleServiceSaved = () => {
    fetchServices();
    handleModalClose();
  };

  const getServiceTypeIcon = (type) => {
    const icons = {
      HALL: "🏛️",
      PUJA: "🙏",
      EVENT: "🎉",
      ACCOMMODATION: "🏨",
      EXT_PUJA: "🏠",
    };
    return icons[type] || "⚙️";
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <PageHeader>
          <HeaderContent>
            <h1>⚙️ Temple Services</h1>
            <p>Manage all services offered by your temple</p>
          </HeaderContent>
          <AddButton
            onClick={handleAddService}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>➕</span>
            Add Service
          </AddButton>
        </PageHeader>

        {services.length === 0 ? (
          <EmptyState>
            <div className="icon">⚙️</div>
            <h3>No Services Found</h3>
            <p>Start by adding your first temple service</p>
          </EmptyState>
        ) : (
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.service_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceHeader>
                  <ServiceTitle>
                    {getServiceTypeIcon(service.service_type)} {service.name}
                  </ServiceTitle>
                  <ServiceType>{service.service_type_str}</ServiceType>
                </ServiceHeader>

                <ServiceDescription>{service.description}</ServiceDescription>

                <ServiceDetails>
                  <DetailItem>
                    <div className="label">Base Price</div>
                    <div className="value">₹{service.base_price}</div>
                  </DetailItem>
                  <DetailItem>
                    <div className="label">Capacity</div>
                    <div className="value">{service.capacity} people</div>
                  </DetailItem>
                  <DetailItem>
                    <div className="label">Duration</div>
                    <div className="value">{service.duration_minutes} mins</div>
                  </DetailItem>
                  <DetailItem>
                    <div className="label">Variations</div>
                    <div className="value">
                      {service.service_variation_list?.length || 0}
                    </div>
                  </DetailItem>
                </ServiceDetails>

                <ServiceActions>
                  <ActionButton
                    className="edit"
                    onClick={() => handleEditService(service)}
                  >
                    ✏️ Edit
                  </ActionButton>
                  <ActionButton>👁️ View</ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDeleteService(service)}
                  >
                    🗑️ Delete
                  </ActionButton>
                </ServiceActions>
              </ServiceCard>
            ))}
          </ServicesGrid>
        )}
      </PageContainer>

      <AnimatePresence>
        {showAddModal && (
          <AddServiceModal
            service={selectedService}
            serviceTypes={serviceTypes}
            priceTypes={priceTypes}
            advancePolicies={advancePolicies}
            refundPolicies={refundPolicies}
            pricingRules={pricingRules}
            onClose={handleModalClose}
            onSuccess={handleServiceSaved}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TempleServices;
