import React, { useState } from "react";
import AllPujas from "./AllPujas";
import AddEditPuja from "./AddEditPuja";
import TimeSlots from "./TimeSlots";
import Categories from "./Categories";
import PriestAssignment from "./PriestAssignment";
import Archive from "./Archive";
import styled from "styled-components";
import MasterTabs from "../../components/Admin/MasterTabs";

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

// Removed unused header/title/subtitle styles


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

  // Removed unused handleCancelEdit

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
      case "priest-assignment":
        return (
          <PriestAssignment />
        );
      case "archive":
        return (
          <Archive />
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
    <PageContainer>
      <MasterTabs tabs={tabs} activeTab={activeTab} onChange={(id) => {
        if (id === "add-puja") setEditingPuja(null);
        setActiveTab(id);
      }} />

      <ContentContainer>
        {renderActiveComponent()}
      </ContentContainer>
    </PageContainer>
  );
};

export default PujaMaster;