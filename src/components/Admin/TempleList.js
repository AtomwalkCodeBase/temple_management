import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdEdit, MdDelete, MdVisibility, MdSearch, MdFilterList } from "react-icons/md";
import Button from "../Button";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const SearchAndFilters = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 250px;
  
  &:focus {
    outline: none;
    border-color: #800000;
    box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.1);
  }
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: 0.75rem;
  color: #6b7280;
  font-size: 1.125rem;
`;

const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;
  color: #374151;
`;

const Tr = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${props => {
    switch (props.$status) {
      case 'Active':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'Inactive':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ActionButton = styled(Button)`
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  min-width: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  margin: 1rem 2rem;
`;

const TempleList = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Import the function dynamically to avoid circular dependency
      const { gettemplist } = await import("../../services/productServices");
      const response = await gettemplist();
      
      if (response.data) {
        setTemples(response.data);
      } else {
        setTemples([]);
      }
    } catch (err) {
      console.error("Error fetching temples:", err);
      setError("Failed to fetch temple list. Please try again.");
      setTemples([]);
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh function globally so Dashboard can call it
  useEffect(() => {
    window.refreshTempleList = fetchTemples;
    return () => {
      delete window.refreshTempleList;
    };
  }, []);

  const filteredTemples = temples.filter(temple => {
    const matchesSearch = temple.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temple.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temple.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || temple.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditTemple = (temple) => {
    console.log("Edit temple:", temple);
    // TODO: Implement edit functionality
  };

  const handleDeleteTemple = (temple) => {
    console.log("Delete temple:", temple);
    // TODO: Implement delete functionality
  };

  const handleViewTemple = (temple) => {
    console.log("View temple:", temple);
    // TODO: Implement view functionality
  };

  if (loading) {
    return (
      <Container>
        <LoadingState>
          <div>🔄 Loading temples...</div>
        </LoadingState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState>
          <div>❌ {error}</div>
          <Button 
            color="blue" 
            size="sm" 
            onClick={fetchTemples}
            style={{ marginTop: "1rem" }}
          >
            Retry
          </Button>
        </ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🏛️ Booked Temple List</Title>
        <SearchAndFilters>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search temples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          
          <FilterButton
            variant="outline"
            color="gray"
            size="sm"
            onClick={() => setStatusFilter(statusFilter === "All" ? "Active" : statusFilter === "Active" ? "Inactive" : "All")}
          >
            <MdFilterList />
            {statusFilter === "All" ? "All Status" : statusFilter}
          </FilterButton>
        </SearchAndFilters>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Temple Name</Th>
              <Th>Location</Th>
              <Th>Contact Person</Th>
              <Th>Mobile</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredTemples.length === 0 ? (
              <tr>
                <Td colSpan={7}>
                  <EmptyState>
                    {searchTerm || statusFilter !== "All" 
                      ? "No temples match your search criteria" 
                      : "No temples found"}
                  </EmptyState>
                </Td>
              </tr>
            ) : (
              filteredTemples.map((temple) => (
                <Tr key={temple.temple_id || temple.id}>
                  <Td>
                    <strong>{temple.name || "N/A"}</strong>
                  </Td>
                  <Td>{temple.location || temple.address_line_3 || "N/A"}</Td>
                  <Td>{temple.contact_name || "N/A"}</Td>
                  <Td>{temple.mobile_number || "N/A"}</Td>
                  <Td>{temple.email_id || "N/A"}</Td>
                  <Td>
                    <StatusBadge $status={temple.status || "Active"}>
                      {temple.status || "Active"}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionButtons>
                      <ActionButton
                        color="blue"
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTemple(temple)}
                        title="View Temple"
                      >
                        <MdVisibility />
                      </ActionButton>
                      <ActionButton
                        color="orange"
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTemple(temple)}
                        title="Edit Temple"
                      >
                        <MdEdit />
                      </ActionButton>
                      <ActionButton
                        color="red"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTemple(temple)}
                        title="Delete Temple"
                      >
                        <MdDelete />
                      </ActionButton>
                    </ActionButtons>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TempleList;
