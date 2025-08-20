"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { gettemplist } from "../../services/productServices";
import { getStoredTempleId } from "../../services/authServices";
import AddTempleModal from "../../components/AddTempleModal";
import TempleMaster from "./TempleMaster";

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

const TempleCard = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem;
  border: 2px solid #f3f4f6;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-color: #ea580c;
  }
`;

const TempleImage = styled.div`
  height: 200px;
  background: ${(props) =>
    props.image
      ? `url(${props.image})`
      : "linear-gradient(135deg, #EA580C 0%, #DC2626 100%)"};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => (props.image ? "rgba(0, 0, 0, 0.3)" : "none")};
  }
`;

const TempleContent = styled.div`
  padding: 2rem;
`;

const TempleTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TempleDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .label {
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 1rem;
    color: #374151;
    font-weight: 500;
  }
`;

const TempleDescription = styled.div`
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;

  .label {
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  .content {
    color: #374151;
    line-height: 1.6;
  }
`;

const TempleTimings = styled.div`
  background: #fef3c7;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;

  .label {
    font-size: 0.8rem;
    color: #92400e;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  .timings {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .timing-slot {
    background: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.9rem;
    color: #92400e;
    font-weight: 500;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
    color: white;
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background: #e5e7eb;
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

const AllTempleList = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const userTempleId = getStoredTempleId();
  console.log(temples, "temples");
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
    // onEditTemple(temple);
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
            {slot.name}: {slot.start} - {slot.end}
          </div>
        )
      );
    }

    if (temple.temple_timings) {
      return (
        <>
          <div className="timing-slot">
            Morning: {temple.temple_timings.morning_opening} -{" "}
            {temple.temple_timings.morning_closing}
          </div>
          <div className="timing-slot">
            Evening: {temple.temple_timings.evening_opening} -{" "}
            {temple.temple_timings.evening_closing}
          </div>
        </>
      );
    }

    return <div className="timing-slot">Timings not available</div>;
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
      {!showAddModal && (
        <PageContainer>
          <PageHeader>
            <HeaderContent>
              <h1>🏛️ My Temple List</h1>
              <p>Manage your assigned temple information</p>
            </HeaderContent>
            {temples.length === 0 && (
              <AddButton
                onClick={handleAddTemple}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>➕</span>
                Add Temple
              </AddButton>
            )}
          </PageHeader>

          {temples.length === 0 ? (
            <EmptyState>
              <div className="icon">🏛️</div>
              <h3>No Temple Assigned</h3>
              <p>You don't have any temple assigned to your account yet</p>
            </EmptyState>
          ) : (
            temples.map((temple, index) => (
              <TempleCard
                key={temple.temple_id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TempleImage image={temple.image} />

                <TempleContent>
                  <TempleTitle>
                    🏛️ {temple.name}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#6b7280",
                        fontWeight: "normal",
                      }}
                    >
                      ({temple.temple_id})
                    </span>
                  </TempleTitle>

                  <TempleDetails>
                    <DetailItem>
                      <div className="label">Location</div>
                      <div className="value">
                        {temple.location ||
                          `${temple.address_line_3}, ${temple.state_code}`}
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Contact</div>
                      <div className="value">{temple.mobile_number}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Email</div>
                      <div className="value">{temple.email_id}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Temple Group</div>
                      <div className="value">
                        {temple.temple_group || "Not specified"}
                      </div>
                    </DetailItem>
                  </TempleDetails>

                  {temple.remarks && (
                    <TempleDescription>
                      <div className="label">Remarks</div>
                      <div className="content">{temple.remarks}</div>
                    </TempleDescription>
                  )}

                  <TempleTimings>
                    <div className="label">Temple Timings</div>
                    <div className="timings">{renderTimings(temple)}</div>
                  </TempleTimings>

                  {temple.additional_field_list?.temple_data_list && (
                    <TempleDescription>
                      <div className="label">Temple Information</div>
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
          // <AddTempleModal
          //   temple={selectedTemple}
          //   onClose={handleModalClose}
          //   onSuccess={handleTempleAdded}
          // />
          <TempleMaster
            templeId={userTempleId}
            selectedTemple={selectedTemple}
          ></TempleMaster>
        )}
      </AnimatePresence>
    </>
  );
};

export default AllTempleList;
