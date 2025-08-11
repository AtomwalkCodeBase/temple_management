import React, { useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import Button from "../../components/Button";
import AllPujas from "./AllPujas";
import AddEditPuja from "./AddEditPuja";
import TimeSlots from "./TimeSlots";
import Categories from "./Categories";
import PriestAssignment from "./PriestAssignment";
import Archive from "./Archive";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContainer = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const TabContainer = styled.div`
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.$isActive ? "rgb(184, 22, 22)" : "transparent"};
  color: ${props => props.$isActive ? "#fff" : "#800000"};
  font-weight: ${props => props.$isActive ? "600" : "500"};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  white-space: nowrap;
  border-bottom: ${props => props.$isActive ? "2px solid rgb(184, 22, 22)" : "none"};
  &:hover {
    background: #F8D7DA;
    color: rgb(184, 22, 22);
    border-bottom: 2px solid rgb(184, 22, 22);
  }
  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
`;

const ContentContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(255,215,0,0.08);
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

// Mock data
const mockPujas = [
  {
    id: 1,
    name: "Morning Puja",
    category: "Daily Pujas",
    subcategory: "Morning",
    price: 1200,
    timeSlots: [1],
    duration: "1 hr",
    location: "Temple",
    status: "Active",
    description: "Traditional morning worship ceremony"
  },
  {
    id: 2,
    name: "Evening Aarti",
    category: "Daily Pujas",
    subcategory: "Evening",
    price: 800,
    timeSlots: [2],
    duration: "45 mins",
    location: "Temple",
    status: "Active",
    description: "Evening lamp ceremony with devotional songs"
  },
  {
    id: 3,
    name: "Ganesh Puja",
    category: "Festival Pujas",
    subcategory: "Ganesh Chaturthi",
    price: 2500,
    timeSlots: [1, 2],
    duration: "2 hrs",
    location: "Temple",
    status: "Active",
    description: "Special worship of Lord Ganesha"
  },
  {
    id: 4,
    name: "Satyanarayan Katha",
    category: "Special Occasion Pujas",
    subcategory: "Housewarming",
    price: 5000,
    timeSlots: [],
    duration: "3 hrs",
    location: "Both",
    status: "Inactive",
    description: "Religious ceremony for new beginnings"
  }
];

const tabs = [
  { id: "all-pujas", label: "All Pujas", component: AllPujas },
  { id: "add-puja", label: "Add New Puja", component: AddEditPuja },
  { id: "time-slots", label: "Time Slots", component: TimeSlots },
  { id: "categories", label: "Categories", component: Categories },
  { id: "priest-assignment", label: "Priest Assignment", component: PriestAssignment },
  { id: "archive", label: "Archive", component: Archive },
];

const PujaMaster = () => {
  const [activeTab, setActiveTab] = useState("all-pujas");
  const [pujas, setPujas] = useState(mockPujas);
  const [editingPuja, setEditingPuja] = useState(null);
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, name: "Morning Slot", start: "06:00", end: "07:00", capacity: 10, status: "Active" },
    { id: 2, name: "Evening Slot", start: "18:00", end: "19:00", capacity: 15, status: "Active" }
  ]);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Daily Pujas",
      description: "Regular temple rituals performed every day.",
      hasSubcategories: true,
      subcategories: ["Morning", "Afternoon", "Evening"],
      status: "Active"
    },
    {
      id: 2,
      name: "Weekly Pujas",
      description: "Performed on specific days of the week.",
      hasSubcategories: false,
      subcategories: [],
      status: "Active"
    },
    {
      id: 3,
      name: "Monthly / Periodic Pujas",
      description: "Performed on specific lunar dates or monthly occasions.",
      hasSubcategories: false,
      subcategories: [],
      status: "Active"
    },
    {
      id: 4,
      name: "Festival Pujas",
      description: "Seasonal rituals linked to major festivals.",
      hasSubcategories: true,
      subcategories: ["Diwali", "Ganesh Chaturthi", "Navratri", "Holi"],
      status: "Active"
    },
    {
      id: 5,
      name: "Special Occasion Pujas",
      description: "For life events or special ceremonies.",
      hasSubcategories: true,
      subcategories: ["Wedding", "Housewarming", "Naming Ceremony"],
      status: "Active"
    }
  ]);

  // Puja management functions
  const addPuja = (newPuja) => {
    const pujaWithId = {
      ...newPuja,
      id: Date.now(),
      status: newPuja.status || "Active",
      timeSlots: newPuja.timeSlots || []
    };
    setPujas(prev => [...prev, pujaWithId]);
    setActiveTab("all-pujas");
  };

  const updatePuja = (id, updatedPuja) => {
    setPujas(prev => prev.map(puja => 
      puja.id === id ? { ...puja, ...updatedPuja } : puja
    ));
  };

  const deletePuja = (id) => {
    setPujas(prev => prev.filter(puja => puja.id !== id));
  };

  const togglePujaStatus = (id) => {
    setPujas(prev => prev.map(puja => 
      puja.id === id 
        ? { ...puja, status: puja.status === "Active" ? "Inactive" : "Active" }
        : puja
    ));
  };

  const handleEditPuja = (puja) => {
    setEditingPuja(puja);
    setActiveTab("add-puja");
  };

  const handleSaveEditPuja = (updatedPuja) => {
    updatePuja(editingPuja.id, updatedPuja);
    setEditingPuja(null);
    setActiveTab("all-pujas");
  };

  const handleCancelEdit = () => {
    setEditingPuja(null);
    setActiveTab("all-pujas");
  };

  // Time slot management functions
  const addTimeSlot = (slot) => {
    setTimeSlots(prev => [...prev, { ...slot, id: Date.now(), status: slot.status || "Active" }]);
  };
  
  const updateTimeSlot = (id, updatedSlot) => {
    setTimeSlots(prev => prev.map(slot => slot.id === id ? { ...slot, ...updatedSlot } : slot));
  };
  
  const deleteTimeSlot = (id) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };
  
  const toggleTimeSlotStatus = (id) => {
    setTimeSlots(prev => prev.map(slot => slot.id === id ? { ...slot, status: slot.status === "Active" ? "Inactive" : "Active" } : slot));
  };

  // Category management functions
  const addCategory = (category) => {
    setCategories(prev => [
      ...prev,
      {
        ...category,
        id: Date.now(),
        status: category.status || "Active",
        subcategories: category.hasSubcategories ? [] : [],
      }
    ]);
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updatedCategory } : category
    ));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const toggleCategoryStatus = (id) => {
    setCategories(prev => prev.map(category => 
      category.id === id 
        ? { ...category, status: category.status === "Active" ? "Inactive" : "Active" }
        : category
    ));
  };

  const addSubcategory = (categoryId, subcategoryName) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, subcategories: [...category.subcategories, subcategoryName] }
        : category
    ));
  };

  const removeSubcategory = (categoryId, subcategoryName) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId 
        ? { ...category, subcategories: category.subcategories.filter(sub => sub !== subcategoryName) }
        : category
    ));
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "all-pujas":
        return (
          <AllPujas 
            pujas={pujas}
            onDeletePuja={deletePuja}
            onToggleStatus={togglePujaStatus}
            onAddPuja={() => setActiveTab("add-puja")}
            onEditPuja={handleEditPuja}
            timeSlots={timeSlots}
            categories={categories}
          />
        );
      case "add-puja":
        return (
          <AddEditPuja 
            initialValues={editingPuja || undefined}
            onSavePuja={editingPuja ? handleSaveEditPuja : addPuja}
            onCancel={() => {
              setEditingPuja(null);
              setActiveTab("all-pujas");
            }}
            timeSlots={timeSlots}
            categories={categories}
          />
        );
      case "time-slots":
        return (
          <TimeSlots
            timeSlots={timeSlots}
            onAddTimeSlot={addTimeSlot}
            onEditTimeSlot={updateTimeSlot}
            onDeleteTimeSlot={deleteTimeSlot}
            onToggleTimeSlotStatus={toggleTimeSlotStatus}
          />
        );
      case "categories":
        return (
          <Categories
            categories={categories}
            onAddCategory={addCategory}
            onEditCategory={updateCategory}
            onDeleteCategory={deleteCategory}
            onToggleCategoryStatus={toggleCategoryStatus}
            onAddSubcategory={addSubcategory}
            onRemoveSubcategory={removeSubcategory}
          />
        );
      default:
        return <AllPujas 
          pujas={pujas}
          onDeletePuja={deletePuja}
          onToggleStatus={togglePujaStatus}
          onAddPuja={() => setActiveTab("add-puja")}
          onEditPuja={handleEditPuja}
          timeSlots={timeSlots}
          categories={categories}
        />;
    }
  };

  return (
    <AdminLayout>
      <PageContainer>
        <HeaderContainer>
          <Title>Puja Master</Title>
          <Subtitle>
            Manage all puja configurations, time slots, categories, and priest assignments
          </Subtitle>
        </HeaderContainer>

        <TabContainer>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              onClick={() => {
                if (tab.id === "add-puja") setEditingPuja(null);
                setActiveTab(tab.id);
              }}
              $isActive={activeTab === tab.id}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabContainer>

        <ContentContainer>
          {renderActiveComponent()}
        </ContentContainer>
      </PageContainer>
    </AdminLayout>
  );
};

export default PujaMaster;