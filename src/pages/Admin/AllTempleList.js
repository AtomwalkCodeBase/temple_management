"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { gettemplist } from "../../services/productServices";
import { getStoredTempleId } from "../../services/authServices";
import AddTempleModal from "../../components/AddTempleModal";
import TempleMaster from "./TempleMaster";
import {
  GiLotus,
  TempleGate,
  IncenseBurner,
  GiTempleGate,
} from "react-icons/gi";

const PageContainer = styled.div`
  background: linear-gradient(135deg, #f8f4eb 0%, #f1e9d9 100%);
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #d9a566;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #4a2c14 0%, #3a2313 100%);
  color: #f8e6cc;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 20% 30%,
        rgba(217, 165, 102, 0.1) 2px,
        transparent 2px
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(217, 165, 102, 0.1) 2px,
        transparent 2px
      );
    background-size: 30px 30px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
    font-family: "Georgia", serif;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  p {
    opacity: 0.9;
    margin: 0;
    color: #d9a566;
    font-size: 1.1rem;
  }
`;

const AddButton = styled(motion.button)`
  background: rgba(217, 165, 102, 0.2);
  color: #f8e6cc;
  border: 2px solid rgba(217, 165, 102, 0.4);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Georgia", serif;

  &:hover {
    background: rgba(217, 165, 102, 0.3);
    border-color: rgba(217, 165, 102, 0.6);
  }
`;

const TempleCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #faf7f2 100%);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 2rem;
  border: 1px solid #d9a566;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d9a566, #b38742, #d9a566);
  }

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const TempleImage = styled.div`
  height: 220px;
  background: ${(props) =>
    props.image
      ? `url(${props.image})`
      : "linear-gradient(135deg, #4a2c14 0%, #3a2313 100%)"};
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
      props.image ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.6)"};
  }

  .placeholder-icon {
    font-size: 4rem;
    color: #d9a566;
    z-index: 2;
    opacity: 0.8;
  }
`;

const TempleContent = styled.div`
  padding: 2rem;
`;

const TempleTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #4a2c14;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: "Georgia", serif;

  .temple-id {
    font-size: 0.9rem;
    color: #8b5a2b;
    font-weight: normal;
    background: rgba(217, 165, 102, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    margin-left: 0.5rem;
  }
`;

const TempleDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .label {
    font-size: 0.85rem;
    color: #8b5a2b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .value {
    font-size: 1.1rem;
    color: #4a2c14;
    font-weight: 500;
  }
`;

const TempleDescription = styled.div`
  background: rgba(248, 230, 204, 0.3);
  padding: 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(217, 165, 102, 0.2);

  .label {
    font-size: 0.85rem;
    color: #8b5a2b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .content {
    color: #4a2c14;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const TempleTimings = styled.div`
  background: rgba(254, 243, 199, 0.4);
  padding: 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(217, 165, 102, 0.3);

  .label {
    font-size: 0.85rem;
    color: #92400e;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .timings {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .timing-slot {
    background: rgba(255, 255, 255, 0.8);
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.95rem;
    color: #92400e;
    font-weight: 500;
    border: 1px solid rgba(217, 165, 102, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.875rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(135deg, #d9a566 0%, #b38742 100%);
    color: #2c1a0a;
    border: 1px solid #b38742;

    &:hover {
      background: linear-gradient(135deg, #e0b574 0%, #c49952 100%);
      box-shadow: 0 4px 12px rgba(217, 165, 102, 0.4);
    }
  }

  &.secondary {
    background: rgba(248, 230, 204, 0.5);
    color: #4a2c14;
    border: 1px solid #d9a566;

    &:hover {
      background: rgba(248, 230, 204, 0.8);
      box-shadow: 0 4px 12px rgba(139, 90, 43, 0.2);
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  flex-direction: column;
  gap: 1rem;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(217, 165, 102, 0.2);
    border-top: 4px solid #d9a566;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: #8b5a2b;
    font-size: 1.1rem;
    font-family: "Georgia", serif;
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
  color: #8b5a2b;

  .icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    color: #d9a566;
    opacity: 0.8;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #4a2c14;
    font-family: "Georgia", serif;
  }

  p {
    margin: 0;
    opacity: 0.8;
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const DecorativeDivider = styled.div`
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(217, 165, 102, 0.5),
    rgba(179, 135, 66, 0.7),
    rgba(217, 165, 102, 0.5),
    transparent
  );
  margin: 1.5rem 0;
  border-radius: 1px;
`;

const AllTempleList = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const userTempleId = getStoredTempleId();

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const response = await gettemplist();
      const allTemples = response.data || [];

      // Filter temples to show only the user's assigned temple
      const userTemples = userTempleId
        ? allTemples.filter((temple) => temple.temple_id === userTempleId)
        : allTemples;

      setTemples(userTemples);
    } catch (error) {
      console.error("Error fetching temples:", error);
      setTemples([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTemple = () => {
    setSelectedTemple(null);
    setShowAddModal(true);
  };

  const handleEditTemple = (temple) => {
    setSelectedTemple(temple);
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSelectedTemple(null);
  };

  const handleTempleAdded = () => {
    fetchTemples();
    handleModalClose();
  };

  const renderTimings = (temple) => {
    if (temple.additional_field_list?.temple_timings?.selected_time_slots) {
      return temple.additional_field_list.temple_timings.selected_time_slots.map(
        (slot, index) => (
          <div key={index} className="timing-slot">
            <span>⏰</span>
            {slot.name}: {slot.start} - {slot.end}
          </div>
        )
      );
    }

    if (temple.temple_timings) {
      return (
        <>
          <div className="timing-slot">
            <span>🌅</span>
            Morning: {temple.temple_timings.morning_opening} -{" "}
            {temple.temple_timings.morning_closing}
          </div>
          <div className="timing-slot">
            <span>🌇</span>
            Evening: {temple.temple_timings.evening_opening} -{" "}
            {temple.temple_timings.evening_closing}
          </div>
        </>
      );
    }

    return <div className="timing-slot">⏰ Timings not available</div>;
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <div className="spinner"></div>
          <div className="loading-text">
            Loading sacred temple information...
          </div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <>
      {!showAddModal && (
        <PageContainer>
          <PageHeader>
            <HeaderContent>
              <h1>
                <GiLotus /> My Temple
              </h1>
              <p>Manage your assigned temple information and services</p>
            </HeaderContent>
            {temples.length === 0 && (
              <AddButton
                onClick={handleAddTemple}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>+</span>
                Add Temple
              </AddButton>
            )}
          </PageHeader>

          {temples.length === 0 ? (
            <EmptyState>
              <div className="icon">
                <GiTempleGate />
              </div>
              <h3>No Temple Assigned</h3>
              <p>
                You don't have any temple assigned to your account yet. Contact
                your administrator or add a new temple to get started.
              </p>
              <AddButton
                onClick={handleAddTemple}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: "2rem" }}
              >
                <span>+</span>
                Add Your First Temple
              </AddButton>
            </EmptyState>
          ) : (
            temples.map((temple, index) => (
              <TempleCard
                key={temple.temple_id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TempleImage image={temple.image}>
                  {!temple.image && (
                    <div className="placeholder-icon">
                      <GiTempleGate />
                    </div>
                  )}
                </TempleImage>

                <TempleContent>
                  <TempleTitle>
                    <GiLotus /> {temple.name}
                    <span className="temple-id">ID: {temple.temple_id}</span>
                  </TempleTitle>

                  <TempleDetails>
                    <DetailItem>
                      <div className="label">📍 Location</div>
                      <div className="value">
                        {temple.location ||
                          `${temple.address_line_3}, ${temple.state_code}`}
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">📞 Contact</div>
                      <div className="value">
                        {temple.mobile_number || "Not provided"}
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">✉️ Email</div>
                      <div className="value">
                        {temple.email_id || "Not provided"}
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">🏛️ Temple Group</div>
                      <div className="value">
                        {temple.temple_group || "Not specified"}
                      </div>
                    </DetailItem>
                  </TempleDetails>

                  <DecorativeDivider />

                  {temple.remarks && (
                    <TempleDescription>
                      <div className="label">📝 Remarks</div>
                      <div className="content">{temple.remarks}</div>
                    </TempleDescription>
                  )}

                  <TempleTimings>
                    <div className="label">🕒 Temple Timings</div>
                    <div className="timings">{renderTimings(temple)}</div>
                  </TempleTimings>

                  {temple.additional_field_list?.temple_data_list && (
                    <TempleDescription>
                      <div className="label">📋 Temple Information</div>
                      <div className="content">
                        {temple.additional_field_list.temple_data_list.map(
                          (data, idx) => (
                            <div key={idx} style={{ marginBottom: "1rem" }}>
                              <strong>{data.title}:</strong> {data.paragraph}
                            </div>
                          )
                        )}
                      </div>
                    </TempleDescription>
                  )}

                  <ActionButtons>
                    <ActionButton
                      className="secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      👁️ View Details
                    </ActionButton>
                    <ActionButton
                      className="primary"
                      onClick={() => handleEditTemple(temple)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ✏️ Edit Temple
                    </ActionButton>
                  </ActionButtons>
                </TempleContent>
              </TempleCard>
            ))
          )}
        </PageContainer>
      )}

      <AnimatePresence>
        {showAddModal && (
          <TempleMaster
            templeId={userTempleId}
            selectedTemple={selectedTemple}
            onClose={handleModalClose}
            onSuccess={handleTempleAdded}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AllTempleList;
