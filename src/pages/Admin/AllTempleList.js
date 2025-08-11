"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { gettemplist } from "../../services/productServices";
import AddTempleModal from "../../components/AddTempleModal";

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

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8fafc;

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.2s;

    &:hover {
      background: #f9fafb;
    }
  }

  td {
    padding: 1rem;
    color: #6b7280;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${(props) => (props.active ? "#D1FAE5" : "#FEE2E2")};
  color: ${(props) => (props.active ? "#065F46" : "#991B1B")};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
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

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const response = await gettemplist();
      setTemples(response.data || []);
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
            <h1>🏛️ All Temple List</h1>
            <p>Manage and monitor all registered temples</p>
          </HeaderContent>
          <AddButton
            onClick={handleAddTemple}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>➕</span>
            Add Temple
          </AddButton>
        </PageHeader>

        {temples.length === 0 ? (
          <EmptyState>
            <div className="icon">🏛️</div>
            <h3>No Temples Found</h3>
            <p>Start by adding your first temple to the system</p>
          </EmptyState>
        ) : (
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <th>Temple Name</th>
                  <th>Location</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </TableHeader>
              <TableBody>
                {temples.map((temple, index) => (
                  <motion.tr
                    key={temple.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td>
                      <strong>{temple.name}</strong>
                    </td>
                    <td>
                      {temple.location ||
                        `${temple.address_line_3}, ${temple.state_code}`}
                    </td>
                    <td>{temple.mobile_number}</td>
                    <td>{temple.email_id}</td>
                    <td>
                      <StatusBadge active={temple.status !== "inactive"}>
                        {temple.status || "Active"}
                      </StatusBadge>
                    </td>
                    <td>
                      <ActionButton
                        onClick={() => handleEditTemple(temple)}
                        title="Edit Temple"
                      >
                        ✏️
                      </ActionButton>
                      <ActionButton title="View Details">👁️</ActionButton>
                    </td>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </PageContainer>

      <AnimatePresence>
        {showAddModal && (
          <AddTempleModal
            temple={selectedTemple}
            onClose={handleModalClose}
            onSuccess={handleTempleAdded}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AllTempleList;
