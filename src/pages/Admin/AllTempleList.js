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
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 8px 28px rgba(0, 86, 214, 0.08);
  overflow: hidden;
  border: 1px solid #cfe0ff;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #0056d6 0%, #0a4db4 100%);
  color: #ffffff;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  /* Clean header without dotted overlay for a modern look */

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
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #ffffff;
  }

  p {
    opacity: 0.95;
    margin: 0;
    color: #e0edff;
    font-size: 1.1rem;
  }
`;

const AddButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.35);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const TempleCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 6px 22px rgba(0, 86, 214, 0.08);
  margin: 2rem;
  border: 1px solid #e6efff;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #a8c6ff, #0056d6, #a8c6ff);
  }

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 86, 214, 0.18);
    transform: translateY(-2px);
  }
`;

const TempleImage = styled.div`
  height: 220px;
  background: ${(props) =>
    props.image
      ? `url(${props.image})`
      : "linear-gradient(135deg, #0056d6 0%, #0a4db4 100%)"};
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
    color: #a8c6ff;
    z-index: 2;
    opacity: 0.9;
  }
`;

const TempleContent = styled.div`
  padding: 2rem;
`;

const TempleTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .temple-id {
    font-size: 0.9rem;
    color: #0a4db4;
    font-weight: 600;
    background: #eaf2ff;
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
    color: #6b7280;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .value {
    font-size: 1.1rem;
    color: #0f172a;
    font-weight: 500;
  }
`;

const TempleDescription = styled.div`
  background: #f6faff;
  padding: 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e6efff;

  .label {
    font-size: 0.85rem;
    color: #0a4db4;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .content {
    color: #0f172a;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const TempleTimings = styled.div`
  background: #f3f8ff;
  padding: 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e6efff;

  .label {
    font-size: 0.85rem;
    color: #0a4db4;
    font-weight: 700;
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
    background: #ffffff;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.95rem;
    color: #0a4db4;
    font-weight: 600;
    border: 1px solid #e6efff;
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
    background: #0056d6;
    color: #ffffff;
    border: 1px solid #0050c6;

    &:hover {
      background: #0a4db4;
      box-shadow: 0 6px 18px rgba(0, 86, 214, 0.35);
    }
  }

  &.secondary {
    background: #ffffff;
    color: #0f172a;
    border: 1px solid #e6efff;

    &:hover {
      background: #f6faff;
      box-shadow: 0 4px 12px rgba(0, 86, 214, 0.15);
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
    border: 4px solid rgba(0, 86, 214, 0.15);
    border-top: 4px solid #0056d6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: #3b82f6;
    font-size: 1.1rem;
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
  color: #3b82f6;

  .icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    color: #a8c6ff;
    opacity: 0.9;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #0f172a;
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
    #a8c6ff,
    #0056d6,
    #a8c6ff,
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
