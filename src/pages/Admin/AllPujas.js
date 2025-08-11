import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/Dropdown";
import { MdLocationOn } from "react-icons/md";

// Button Component with Styled-Components
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  line-height: 1.5;

  ${({ variant, color }) => variant === 'filled' ? `
    background-color: ${colorMap[color] || color};
    color: white;
    border: none;
    &:hover:not(:disabled) {
      background-color: ${darkenColor(colorMap[color] || color)};
    }
  ` : `
    background-color: transparent;
    border: 1px solid ${colorMap[color] || color};
    color: ${colorMap[color] || color};
    &:hover:not(:disabled) {
      background-color: ${getColorWithOpacity(colorMap[color] || color, 0.1)};
    }
  `}

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'padding: 6px 12px; font-size: 14px;';
      case 'lg':
        return 'padding: 12px 24px; font-size: 18px;';
      default:
        return 'padding: 8px 16px; font-size: 16px;';
    }
  }}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => getColorWithOpacity(colorMap[props.color] || props.color, 0.3)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Color utilities
const colorMap = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#22c55e',
  orange: '#FFA500', // saffron for primary
  saffron: '#FFA500',
  maroon: '#800000',
  gray: '#888'
};

const parseHexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};

const getColorWithOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    return `rgba(${parseHexToRgb(color)}, ${opacity})`;
  }
  return color;
};

const darkenColor = (color) => {
  if (color.startsWith('#')) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, ((num >> 8) & 0xff) - 30);
    const b = Math.max(0, (num & 0xff) - 30);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  return color;
};

// Styled Components for AllPujas
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  background: #fff;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PujaCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1.5px solid #F8D7DA;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  &:hover {
    box-shadow: 0 8px 24px #f5f5f5;
    border-color: #f5f5f5;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$status === 'Active' ? '#22c55e' : '#ef4444'};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const PujaName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${props => props.$status === 'Active' ? '#e6f9ed' : '#F8D7DA'};
  color: ${props => props.$status === 'Active' ? '#22c55e' : 'rgb(172, 54, 73)'};
  border: 1px solid ${props => props.$status === 'Active' ? '#22c55e' : 'rgb(172, 54, 73)'};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const InfoLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
  min-width: 80px;
`;

const InfoValue = styled.span`
  color: #374151;
  font-weight: 400;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.span`
  background: #fbeaec;
  color: rgb(172, 54, 73);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const SubcategoryText = styled.span`
  font-size: 0.85rem;
  color: #b36b7a;
`;

const PriceValue = styled.span`
  font-weight: 700;
  color: rgb(172, 54, 73);
  font-size: 1rem;
`;

const TimeSlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TimeSlotBadge = styled.span`
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
`;

const NoSlotsText = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
  font-style: italic;
`;

const LocationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  background: #f5f5f5;
  color: rgb(172, 54, 73);
  padding: 0.25rem 0.85rem 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.95em;
  font-weight: 500;
  box-shadow: 0 1px 4px #f8d7da33;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  ${({ variant }) =>
    variant === 'edit' && `
      background: #f5f5f5;
      color: rgb(172, 54, 73);
      border: 1.5px solid #f5f5f5;
      &:hover {
        background: #F8D7DA;
        color: rgb(172, 54, 73);
        border: 1.5px solid rgb(172, 54, 73);
      }
    `}
  ${({ variant }) =>
    variant === 'delete' && `
      background: #e74c3c;
      color: #fff;
      &:hover {
        background: #fadbd8;
        color: #e74c3c;
        border: 1.5px solid #e74c3c;
      }
    `}
  ${({ variant }) =>
    variant === 'toggle' && `
      background: #fff;
      color: rgb(172, 54, 73);
      border: 1.5px solid rgb(172, 54, 73);
      &:hover {
        background: #f5f5f5;
        color: rgb(172, 54, 73);
      }
    `}
`;

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.1rem;
  background: white;
  border-radius: 12px;
  margin-top: 1rem;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const ViewToggleButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1.5px solid rgb(172, 54, 73);
  background: ${props => props.$active ? 'rgb(172, 54, 73)' : '#fff'};
  color: ${props => props.$active ? '#fff' : 'rgb(172, 54, 73)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: none;
  &:first-child {
    border-radius: 8px 0 0 8px;
  }
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
  &:hover {
    background: #F8D7DA;
    color: rgb(172, 54, 73);
    border: 1.5px solid rgb(172, 54, 73);
  }
`;

// Button Component
const Button = ({ children, variant = 'filled', color = 'blue', size = 'md', className, ...props }) => {
  return (
    <StyledButton variant={variant} color={color} size={size} className={className} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['filled', 'outline']),
  color: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

// AllPujas Component
const AllPujas = ({ pujas, onDeletePuja, onToggleStatus, onAddPuja, onEditPuja, timeSlots = [], categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [subcategoryFilter, setSubcategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

  const selectedCategory = categories.find(cat => cat.name === categoryFilter);
  const availableSubcategories = selectedCategory?.subcategories || [];

  const filteredPujas = pujas.filter(puja => {
    const matchesSearch = puja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         puja.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (puja.subcategory && puja.subcategory.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || puja.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || puja.category === categoryFilter;
    const matchesSubcategory = subcategoryFilter === "All" || puja.subcategory === subcategoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesSubcategory;
  });

  const renderPujaCard = (puja) => (
    <PujaCard key={puja.id} $status={puja.status}>
      <CardHeader>
        <PujaName>{puja.name}</PujaName>
        <StatusBadge $status={puja.status}>{puja.status}</StatusBadge>
      </CardHeader>
      
      <CardContent>
        <InfoRow>
          <InfoLabel>Category:</InfoLabel>
          <CategoryContainer>
            <CategoryBadge>{puja.category}</CategoryBadge>
            {puja.subcategory && (
              <SubcategoryText>→ {puja.subcategory}</SubcategoryText>
            )}
          </CategoryContainer>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Price:</InfoLabel>
          <PriceValue>₹{puja.price}</PriceValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Duration:</InfoLabel>
          <InfoValue>{puja.duration}</InfoValue>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Location:</InfoLabel>
          <LocationBadge>
            <MdLocationOn style={{ color: "rgb(172, 54, 73)", fontSize: "1.1em", marginRight: 2 }} />
            {puja.location}
          </LocationBadge>
        </InfoRow>
        
        <InfoRow>
          <InfoLabel>Time Slots:</InfoLabel>
          <TimeSlotContainer>
            {puja.timeSlots && puja.timeSlots.length > 0 ? (
              puja.timeSlots.map((slotId, index) => {
                const slot = timeSlots.find(s => s.id === slotId);
                return slot ? (
                  <TimeSlotBadge key={index}>
                    {slot.name} ({slot.start}-{slot.end})
                  </TimeSlotBadge>
                ) : null;
              })
            ) : (
              <NoSlotsText>No slots assigned</NoSlotsText>
            )}
          </TimeSlotContainer>
        </InfoRow>
      </CardContent>
      
      <CardActions>
        <ActionButton
          variant="toggle"
          onClick={() => onToggleStatus(puja.id)}
          style={{ minWidth: 90 }}
        >
          Toggle Status
        </ActionButton>
        <ActionButton
          variant="edit"
          onClick={() => onEditPuja(puja)}
          style={{ minWidth: 70 }}
        >
          Edit
        </ActionButton>
        <ActionButton
          variant="delete"
          onClick={() => onDeletePuja(puja.id)}
          style={{ minWidth: 70 }}
        >
          Delete
        </ActionButton>
      </CardActions>
    </PujaCard>
  );

  return (
    <Container>
      <TopBar>
        <FiltersContainer>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Puja Name or Category"
            minWidth="250px"
          />
          
          <Dropdown
            options={[
              { value: "All", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" }
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          
          <Dropdown
            options={[
              { value: "All", label: "All Categories" },
              ...categories.map(category => ({
                value: category.name,
                label: category.name
              }))
            ]}
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setSubcategoryFilter("All");
            }}
          />

          {selectedCategory?.hasSubcategories && (
            <Dropdown
              options={[
                { value: "All", label: "All Subcategories" },
                ...availableSubcategories.map(subcategory => ({
                  value: subcategory,
                  label: subcategory
                }))
              ]}
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
            />
          )}
        </FiltersContainer>
        
        <ActionsContainer>
          <Button onClick={onAddPuja} color="rgb(172, 54, 73)" size="md">
            Add New Puja
          </Button>
          <Button variant="outline" color="gray" size="md">
            Export List
          </Button>
        </ActionsContainer>
      </TopBar>

      <ViewToggleContainer>
        <ViewToggleButton
          $active={viewMode === "cards"}
          onClick={() => setViewMode("cards")}
        >
          Cards View
        </ViewToggleButton>
        <ViewToggleButton
          $active={viewMode === "table"}
          onClick={() => setViewMode("table")}
        >
          Table View
        </ViewToggleButton>
      </ViewToggleContainer>

      {viewMode === "cards" ? (
        <CardsGrid>
          {filteredPujas.map(renderPujaCard)}
        </CardsGrid>
      ) : (
        <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.9rem", color: "#1f2937" }}>Puja Name</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.9rem", color: "#1f2937" }}>Category</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.9rem", color: "#1f2937" }}>Price</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.9rem", color: "#1f2937" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.9rem", color: "#1f2937" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPujas.map((puja) => (
                  <tr key={puja.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "1rem", fontWeight: "500" }}>{puja.name}</td>
                    <td style={{ padding: "1rem" }}>
                      <CategoryContainer>
                        <CategoryBadge>{puja.category}</CategoryBadge>
                        {puja.subcategory && (
                          <SubcategoryText>→ {puja.subcategory}</SubcategoryText>
                        )}
                      </CategoryContainer>
                    </td>
                    <td style={{ padding: "1rem", fontWeight: "600" }}>₹{puja.price}</td>
                    <td style={{ padding: "1rem" }}>
                      <StatusBadge $status={puja.status}>{puja.status}</StatusBadge>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <CardActions style={{ margin: 0, padding: 0, border: "none" }}>
                        <Button
                          onClick={() => onToggleStatus(puja.id)}
                          variant="outline"
                          color={puja.status === "Active" ? "green" : "red"}
                          size="sm"
                        >
                          Toggle
                        </Button>
                        <Button
                          onClick={() => onEditPuja(puja)}
                          color="blue"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => onDeletePuja(puja.id)}
                          color="red"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredPujas.length === 0 && (
        <NoResultsContainer>
          No pujas found matching your criteria.
        </NoResultsContainer>
      )}
    </Container>
  );
};

AllPujas.propTypes = {
  pujas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      subcategory: PropTypes.string,
      price: PropTypes.number.isRequired,
      timeSlots: PropTypes.arrayOf(PropTypes.string),
      duration: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Active', 'Inactive']).isRequired
    })
  ).isRequired,
  onDeletePuja: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onAddPuja: PropTypes.func.isRequired,
  onEditPuja: PropTypes.func.isRequired,
  timeSlots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      hasSubcategories: PropTypes.bool,
      subcategories: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

export default AllPujas;