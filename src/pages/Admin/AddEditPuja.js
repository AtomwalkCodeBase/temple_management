import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";
import ProgressBar from "../../components/Admin/ProgressBar";

// Mock data for dropdowns
const CATEGORIES = ["Daily", "Festival", "Special"];
const LOCATIONS = ["Temple", "Devotee Home", "Both"];
const ITEMS_REQUIRED = ["Flowers", "Coconut", "Lamp", "Incense", "Kumkum", "Chandan"];
const PRIESTS = ["Pandit Sharma", "Pandit Rao", "Pandit Patel", "Pandit Singh"];
const ASSIGNMENT_TYPES = ["Auto Assign", "Manual Assign"];

// Styled Components
const PRIMARY_COLOR = 'rgb(172, 54, 73)';
const HOVER_BG = '#F8D7DA';
const FOCUS_COLOR = 'rgb(172, 54, 73)';
const CHIP_BG = '#f5f5f5';
const CHIP_SELECTED_BG = 'rgb(172, 54, 73)';
const CHIP_SELECTED_TEXT = '#fff';
const PROGRESS_BG = 'rgb(172, 54, 73)';
const PROGRESS_STEP_ACTIVE = 'rgb(172, 54, 73)';
const PROGRESS_STEP_TEXT = '#fff';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;



const FormContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: ${props => props.error ? "1px solid #dc3545" : "1px solid #e0e0e0"};
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: ${FOCUS_COLOR};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: ${props => props.error ? "1px solid #dc3545" : "1px solid #e0e0e0"};
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: ${FOCUS_COLOR};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  &:focus {
    border-color: ${FOCUS_COLOR};
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.selected ? CHIP_SELECTED_BG : CHIP_BG};
  color: ${props => props.selected ? CHIP_SELECTED_TEXT : "#333"};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.selected ? FOCUS_COLOR : HOVER_BG};
    color: ${props => props.selected ? CHIP_SELECTED_TEXT : PRIMARY_COLOR};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
  cursor: pointer;
  &:focus {
    border-color: ${FOCUS_COLOR};
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: ${props => props.variant === "secondary" ? "1px solid #ccc" : "none"};
  border-radius: 8px;
  background: ${props => {
    if (props.disabled) return "#f5f5f5";
    if (props.variant === "secondary") return "#fff";
    return PRIMARY_COLOR;
  }};
  color: ${props => {
    if (props.disabled) return "#ccc";
    if (props.variant === "secondary") return "#666";
    return "#fff";
  }};
  font-weight: 600;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s;
  &:hover:not(:disabled) {
    background: ${props => {
      if (props.variant === "secondary") return HOVER_BG;
      return HOVER_BG;
    }};
    color: ${props => props.variant === "secondary" ? PRIMARY_COLOR : PRIMARY_COLOR};
    border: ${props => props.variant === "secondary" ? `1px solid ${PRIMARY_COLOR}` : "none"};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddEditPuja = ({ onSavePuja, onCancel, initialValues, timeSlots = [], categories = [] }) => {
  const [formData, setFormData] = useState(() => {
    if (initialValues) {
      return {
        pujaName: initialValues.name || "",
        category: initialValues.category || (categories.length > 0 ? categories[0].name : ""),
        subcategory: initialValues.subcategory || "",
        allowedLocations: initialValues.allowedLocations && initialValues.allowedLocations.length > 0
          ? initialValues.allowedLocations
          : initialValues.location ? [initialValues.location] : [],
        maxAttendees: initialValues.maxAttendees || "",
        description: initialValues.description || "",
        imageFile: null,
        price: initialValues.price || "",
        specialPrice: initialValues.specialPrice || "",
        timeSlots: initialValues.timeSlots || [],
        slotCapacity: initialValues.slotCapacity || "",
        itemsRequired: initialValues.itemsRequired || [],
        preparationTime: initialValues.preparationTime || "",
        preparationUnit: initialValues.preparationUnit || "Minutes",
        specialInstructions: initialValues.specialInstructions || "",
        defaultPriest: initialValues.defaultPriest || "",
        backupPriest: initialValues.backupPriest || "",
        assignmentType: initialValues.assignmentType || ASSIGNMENT_TYPES[0],
        status: initialValues.status || "Active",
        effectiveFrom: initialValues.effectiveFrom || "",
        effectiveTo: initialValues.effectiveTo || "",
        reason: initialValues.reason || ""
      };
    }
    return {
      pujaName: "",
      category: categories.length > 0 ? categories[0].name : "",
      subcategory: "",
      allowedLocations: [],
      maxAttendees: "",
      description: "",
      imageFile: null,
      price: "",
      specialPrice: "",
      timeSlots: [],
      slotCapacity: "",
      itemsRequired: [],
      preparationTime: "",
      preparationUnit: "Minutes",
      specialInstructions: "",
      defaultPriest: "",
      backupPriest: "",
      assignmentType: ASSIGNMENT_TYPES[0],
      status: "Active",
      effectiveFrom: "",
      effectiveTo: "",
      reason: ""
    };
  });

  // Get selected category object and its subcategories
  const selectedCategory = categories.find(cat => cat.name === formData.category);
  const availableSubcategories = selectedCategory?.subcategories || [];

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("basic");

  const sections = [
    { id: "basic", label: "Basic Information" },
    { id: "pricing", label: "Pricing & Time Slots" },
    { id: "ritual", label: "Ritual & Preparation" },
    { id: "priest", label: "Priest Assignment" },
    { id: "availability", label: "Availability" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateSection = (section) => {
    const newErrors = {};
    
    if (section === "basic") {
      if (!formData.pujaName.trim()) newErrors.pujaName = "Puja name is required";
      if (!formData.allowedLocations.length) newErrors.allowedLocations = "Select at least one location";
    }
    
    if (section === "pricing") {
      if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
        newErrors.price = "Price must be a positive number";
      }
      if (!formData.timeSlots.length) newErrors.timeSlots = "Select at least one time slot";
    }
    
    if (section === "priest") {
      if (formData.assignmentType === "Manual Assign" && !formData.defaultPriest) {
        newErrors.defaultPriest = "Default priest is required for manual assignment";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(activeSection)) {
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      if (currentIndex < sections.length - 1) {
        setActiveSection(sections[currentIndex + 1].id);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const handleSubmit = () => {
    if (validateSection(activeSection)) {
      // Transform form data to match the expected puja structure
      const pujaData = {
        name: formData.pujaName,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        specialPrice: formData.specialPrice ? Number(formData.specialPrice) : null,
        timeSlots: formData.timeSlots,
        duration: `${formData.preparationTime || 0} ${formData.preparationUnit}`,
        location: formData.allowedLocations[0] || "Temple", // Use first location as primary
        status: formData.status,
        maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : null,
        description: formData.description,
        itemsRequired: formData.itemsRequired,
        preparationTime: formData.preparationTime,
        preparationUnit: formData.preparationUnit,
        specialInstructions: formData.specialInstructions,
        defaultPriest: formData.defaultPriest,
        backupPriest: formData.backupPriest,
        assignmentType: formData.assignmentType,
        effectiveFrom: formData.effectiveFrom,
        effectiveTo: formData.effectiveTo,
        reason: formData.reason,
        imageFile: formData.imageFile
      };
      
      onSavePuja(pujaData);
      onCancel(); // Go back to All Pujas tab
    }
  };

  const renderBasicInformation = () => (
    <div>
      <SectionTitle>Basic Information</SectionTitle>
      
      <FormGrid>
        <FormGroup>
          <Label>Puja Name *</Label>
          <Input
            type="text"
            placeholder="Morning Puja"
            value={formData.pujaName}
            onChange={(e) => handleInputChange("pujaName", e.target.value)}
            error={errors.pujaName}
          />
          {errors.pujaName && <ErrorMessage>{errors.pujaName}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Category *</Label>
          <Dropdown
            options={categories.map((category) => ({
              value: category.name,
              label: category.name
            }))}
            value={formData.category}
            onChange={(e) => {
              handleInputChange("category", e.target.value);
              // Reset subcategory when category changes
              handleInputChange("subcategory", "");
            }}
          />
        </FormGroup>

        {selectedCategory?.hasSubcategories && (
          <FormGroup>
            <Label>Subcategory</Label>
            <Dropdown
              options={[
                { value: "", label: "Select Subcategory (Optional)" },
                ...availableSubcategories.map((subcategory) => ({
                  value: subcategory,
                  label: subcategory
                }))
              ]}
              value={formData.subcategory}
              onChange={(e) => handleInputChange("subcategory", e.target.value)}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label>Allowed Locations</Label>
          <Dropdown
            options={LOCATIONS.map((location) => ({
              value: location,
              label: location
            }))}
            value={formData.allowedLocations[0] || ""}
            onChange={(e) => handleInputChange("allowedLocations", [e.target.value])}
            placeholder="Select Location"
            style={errors.allowedLocations ? { border: '1.5px solid #e74c3c' } : {}}
          />
          {errors.allowedLocations && <ErrorMessage>{errors.allowedLocations}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Max Attendees</Label>
          <Input
            type="number"
            placeholder="50"
            value={formData.maxAttendees}
            onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            placeholder="Brief description of the puja"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
          />
        </FormGroup>

        <FormGroup>
          <Label>Image Upload</Label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => handleInputChange("imageFile", e.target.files[0])}
          />
        </FormGroup>
      </FormGrid>
    </div>
  );

  const renderPricingTimeSlots = () => (
    <div>
      <SectionTitle>Pricing & Time Slots</SectionTitle>
      <FormGrid>
        <FormGroup>
          <Label>Price (₹)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={e => handleInputChange("price", e.target.value)}
            min="0"
          />
        </FormGroup>
        <FormGroup>
          <Label>Special Price (Optional)</Label>
          <Input
            type="number"
            value={formData.specialPrice}
            onChange={e => handleInputChange("specialPrice", e.target.value)}
            min="0"
          />
        </FormGroup>
        <FormGroup>
          <Label>Assign Time Slots</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {timeSlots.filter(slot => slot.status === "Active").length === 0 ? (
              <span style={{ color: "#888" }}>No active time slots available. Please add in Time Slot Manager.</span>
            ) : (
              timeSlots.filter(slot => slot.status === "Active").map(slot => (
                <label key={slot.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={formData.timeSlots.includes(slot.id)}
                    onChange={e => {
                      const checked = e.target.checked;
                      setFormData(prev => ({
                        ...prev,
                        timeSlots: checked
                          ? [...prev.timeSlots, slot.id]
                          : prev.timeSlots.filter(id => id !== slot.id)
                      }));
                    }}
                  />
                  {slot.name} ({slot.start} - {slot.end}, Capacity: {slot.capacity})
                </label>
              ))
            )}
          </div>
        </FormGroup>
      </FormGrid>
    </div>
  );

  const renderRitualPreparation = () => (
    <div>
      <SectionTitle>Ritual & Preparation Details</SectionTitle>
      
      <FormGrid>
        <FormGroup>
          <Label>Items Required</Label>
          <ChipContainer>
            {ITEMS_REQUIRED.map(item => (
              <Chip
                key={item}
                type="button"
                onClick={() => handleMultiSelect("itemsRequired", item)}
                selected={formData.itemsRequired.includes(item)}
              >
                {item}
              </Chip>
            ))}
          </ChipContainer>
        </FormGroup>

        <TwoColumnGrid>
          <FormGroup>
            <Label>Preparation Time</Label>
            <Input
              type="number"
              placeholder="30"
              value={formData.preparationTime}
              onChange={(e) => handleInputChange("preparationTime", e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Preparation Time Unit</Label>
            <Dropdown
              options={[
                { value: "Minutes", label: "Minutes" },
                { value: "Hours", label: "Hours" }
              ]}
              value={formData.preparationUnit}
              onChange={(e) => handleInputChange("preparationUnit", e.target.value)}
            />
          </FormGroup>
        </TwoColumnGrid>

        <FormGroup>
          <Label>Special Instructions</Label>
          <TextArea
            placeholder="Bring valid ID for temple entry"
            value={formData.specialInstructions}
            onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
            rows={3}
          />
        </FormGroup>
      </FormGrid>
    </div>
  );

  const renderPriestAssignment = () => (
    <div>
      <SectionTitle>Priest Assignment</SectionTitle>
      
      <FormGrid>
        <FormGroup>
          <Label>Assignment Type</Label>
          <Dropdown
            options={ASSIGNMENT_TYPES.map((type) => ({
              value: type,
              label: type
            }))}
            value={formData.assignmentType}
            onChange={(e) => handleInputChange("assignmentType", e.target.value)}
          />
        </FormGroup>

        <TwoColumnGrid>
          <FormGroup>
            <Label>Default Priest</Label>
            <Select
              value={formData.defaultPriest}
              onChange={(e) => handleInputChange("defaultPriest", e.target.value)}
              error={errors.defaultPriest}
            >
              <option value="">Select Priest</option>
              {PRIESTS.map(priest => (
                <option key={priest} value={priest}>{priest}</option>
              ))}
            </Select>
            {errors.defaultPriest && <ErrorMessage>{errors.defaultPriest}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Backup Priest</Label>
            <Select
              value={formData.backupPriest}
              onChange={(e) => handleInputChange("backupPriest", e.target.value)}
            >
              <option value="">Select Backup Priest</option>
              {PRIESTS.map(priest => (
                <option key={priest} value={priest}>{priest}</option>
              ))}
            </Select>
          </FormGroup>
        </TwoColumnGrid>
      </FormGrid>
    </div>
  );

  const renderAvailability = () => (
    <div>
      <SectionTitle>Availability</SectionTitle>
      
      <FormGrid>
        <FormGroup>
          <Label>Status *</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === "Active"}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />
              Active
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={formData.status === "Inactive"}
                onChange={(e) => handleInputChange("status", e.target.value)}
              />
              Inactive
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        <TwoColumnGrid>
          <FormGroup>
            <Label>Effective From</Label>
            <Input
              type="date"
              value={formData.effectiveFrom}
              onChange={(e) => handleInputChange("effectiveFrom", e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Effective To</Label>
            <Input
              type="date"
              value={formData.effectiveTo}
              onChange={(e) => handleInputChange("effectiveTo", e.target.value)}
            />
          </FormGroup>
        </TwoColumnGrid>

        <FormGroup>
          <Label>Reason/Notes</Label>
          <TextArea
            placeholder="Priest on leave"
            value={formData.reason}
            onChange={(e) => handleInputChange("reason", e.target.value)}
            rows={3}
          />
        </FormGroup>
      </FormGrid>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "basic": return renderBasicInformation();
      case "pricing": return renderPricingTimeSlots();
      case "ritual": return renderRitualPreparation();
      case "priest": return renderPriestAssignment();
      case "availability": return renderAvailability();
      default: return renderBasicInformation();
    }
  };

  const currentStepIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <Container>
      {/* Progress Bar */}
      <ProgressBar steps={sections} currentStep={currentStepIndex} />

      {/* Form Content */}
      <FormContainer>
        {renderSectionContent()}
        
        {/* Navigation Buttons */}
        <NavigationContainer>
          <Button
            onClick={handlePrevious}
            disabled={activeSection === "basic"}
            variant="secondary"
          >
            Previous
          </Button>
          
          <ButtonGroup>
            {activeSection === "availability" ? (
              <Button onClick={handleSubmit}>
                Save Puja
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </ButtonGroup>
        </NavigationContainer>
      </FormContainer>
    </Container>
  );
};

export default AddEditPuja; 