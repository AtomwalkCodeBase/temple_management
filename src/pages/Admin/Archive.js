import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { MdRestore, MdDelete, MdVisibility, MdArchive, MdSearch, MdFilterList } from "react-icons/md";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
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
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
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
  background: #fee2e2;
  color: #991b1b;
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

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [archivedPujas] = useState([
    {
      id: 1,
      name: "Ganesh Chaturthi Puja",
      category: "Festival Pujas",
      subcategory: "Ganesh Chaturthi",
      price: 1500,
      duration: "2 hours",
      archivedDate: "2024-01-15",
      archivedReason: "Seasonal puja completed"
    },
    {
      id: 2,
      name: "Old Wedding Ceremony",
      category: "Special Occasion Pujas",
      subcategory: "Wedding",
      price: 5000,
      duration: "4 hours",
      archivedDate: "2024-01-10",
      archivedReason: "Outdated pricing"
    },
    {
      id: 3,
      name: "Traditional Housewarming",
      category: "Special Occasion Pujas",
      subcategory: "Housewarming",
      price: 2000,
      duration: "3 hours",
      archivedDate: "2024-01-05",
      archivedReason: "Replaced with new version"
    }
  ]);

  const filteredPujas = archivedPujas.filter(puja => {
    const matchesSearch = puja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         puja.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || puja.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleRestorePuja = (puja) => {
    console.log("Restore puja:", puja);
    // TODO: Implement restore functionality
  };

  const handleDeletePuja = (id) => {
    console.log("Delete archived puja:", id);
    // TODO: Implement delete functionality
  };

  const handleViewPuja = (puja) => {
    console.log("View archived puja:", puja);
    // TODO: Implement view functionality
  };

  const categories = ["All", ...Array.from(new Set(archivedPujas.map(puja => puja.category)))];

  return (
    <Container>
      <Header>
        <Title>📦 Archive - Inactive Pujas</Title>
        <SearchAndFilters>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search archived pujas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          
          <FilterButton
            variant="outline"
            color="gray"
            size="sm"
            onClick={() => {
              const currentIndex = categories.indexOf(categoryFilter);
              const nextIndex = (currentIndex + 1) % categories.length;
              setCategoryFilter(categories[nextIndex]);
            }}
          >
            <MdFilterList />
            {categoryFilter}
          </FilterButton>
        </SearchAndFilters>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Puja Name</Th>
              <Th>Category</Th>
              <Th>Subcategory</Th>
              <Th>Price</Th>
              <Th>Duration</Th>
              <Th>Archived Date</Th>
              <Th>Reason</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredPujas.length === 0 ? (
              <tr>
                <Td colSpan={8}>
                  <EmptyState>
                    {searchTerm || categoryFilter !== "All" 
                      ? "No archived pujas match your search criteria" 
                      : "No archived pujas found"}
                  </EmptyState>
                </Td>
              </tr>
            ) : (
              filteredPujas.map((puja) => (
                <Tr key={puja.id}>
                  <Td>
                    <strong>{puja.name}</strong>
                  </Td>
                  <Td>{puja.category}</Td>
                  <Td>{puja.subcategory}</Td>
                  <Td>₹{puja.price}</Td>
                  <Td>{puja.duration}</Td>
                  <Td>{puja.archivedDate}</Td>
                  <Td>{puja.archivedReason}</Td>
                  <Td>
                    <ActionButtons>
                      <ActionButton
                        color="blue"
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPuja(puja)}
                        title="View Details"
                      >
                        <MdVisibility />
                      </ActionButton>
                      <ActionButton
                        color="green"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestorePuja(puja)}
                        title="Restore Puja"
                      >
                        <MdRestore />
                      </ActionButton>
                      <ActionButton
                        color="red"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePuja(puja.id)}
                        title="Delete Permanently"
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

      {filteredPujas.length === 0 && !searchTerm && categoryFilter === "All" && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          <MdArchive style={{ fontSize: "3rem", marginBottom: "1rem" }} />
          <h3>Archive is Empty</h3>
          <p>No pujas have been archived yet. Inactive pujas will appear here.</p>
        </div>
      )}
    </Container>
  );
};

export default Archive; 