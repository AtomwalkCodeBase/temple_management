import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X, Plus, Edit3, Trash2, Clock, Users, Calendar, IndianRupee } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fafbfc;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const ModalBody = styled.div`
  padding: 32px;
  overflow-y: auto;
  flex: 1;
`;

const PackageGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

const PackageCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #ffffff;
  transition: all 0.2s;
  
  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const PackageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PackageTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const PackageActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: #f9fafb;
    color: #374151;
  }
  
  &.danger {
    color: #dc2626;
    border-color: #fecaca;
    
    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }
`;

const PackageDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`;

const DetailValue = styled.span`
  color: #111827;
  font-weight: 500;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 16px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  background: #fafbfc;
  color: #6b7280;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    border-color: #9ca3af;
    background: #f3f4f6;
    color: #374151;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #d1d5db;
  
  &.primary {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
    
    &:hover {
      background: #2563eb;
    }
  }
  
  &.secondary {
    background: white;
    color: #6b7280;
    
    &:hover {
      background: #f9fafb;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
`;

const PackageModal = ({ 
  isOpen, 
  onClose, 
  hall, 
  packages = [], 
  onSave,
  onDelete,
  isSaving 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    price_type: "HOURLY",
    base_price: "",
    start_time: "09:00",
    end_time: "11:00",
    no_hours: "",
    max_no_per_day: "",
    max_participant: "",
    pricing_rule_id: 1
  });

  useEffect(() => {
    if (!isOpen) {
      setIsAdding(false);
      setEditingPackage(null);
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      price_type: "HOURLY",
      base_price: "",
      start_time: "09:00",
      end_time: "11:00",
      no_hours: "",
      max_no_per_day: "",
      max_participant: "",
      pricing_rule_id: 1
    });
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      price_type: pkg.price_type || "HOURLY",
      base_price: pkg.base_price || "",
      start_time: pkg.start_time || "09:00",
      end_time: pkg.end_time || "11:00",
      no_hours: pkg.no_hours || "",
      max_no_per_day: pkg.max_no_per_day,
      max_participant: pkg.max_participant,
      pricing_rule_id: pkg.pricing_rule_id || 1
    });
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const packageData = {
      id: editingPackage?.id || null, // Use existing ID for updates, null for new packages
      price_type: formData.price_type,
      base_price: parseFloat(formData.base_price),
      pricing_rule_id: parseInt(formData.pricing_rule_id),
      start_time: formData.start_time,
      end_time: formData.end_time,
      no_hours: formData.no_hours ? parseInt(formData.no_hours) : null,
      max_no_per_day: parseInt(formData.max_no_per_day),
      max_participant: parseInt(formData.max_participant)
    };
    
    onSave(packageData);
    // Optimistically reset and hide form for snappy UX; parent will close modal on success
    setIsAdding(false);
    setEditingPackage(null);
    resetForm();
  };

  const handleDelete = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await onDelete(packageId);
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  const getPriceTypeLabel = (type) => {
    const labels = {
      HOURLY: "Hourly",
      FULL_DAY: "Full Day",
      HALF_DAY: "Half Day"
    };
    return labels[type] || type;
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Manage Packages - {hall?.name}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {!isAdding ? (
            <>
              <PackageGrid>
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <PackageCard key={pkg.id}>
                      <PackageHeader>
                        <PackageTitle>{getPriceTypeLabel(pkg.price_type)} Package</PackageTitle>
                        <PackageActions>
                          <ActionButton onClick={() => handleEdit(pkg)}>
                            <Edit3 size={14} />
                            Edit
                          </ActionButton>
                          <ActionButton 
                            className="danger"
                            onClick={() => handleDelete(pkg.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </ActionButton>
                        </PackageActions>
                      </PackageHeader>
                      
                      <PackageDetails>
                        <DetailItem>
                          <IndianRupee size={16} />
                          <DetailValue>₹{pkg.base_price}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <Clock size={16} />
                          <DetailValue>{pkg.start_time} - {pkg.end_time}</DetailValue>
                        </DetailItem>
                        {pkg.no_hours && (
                          <DetailItem>
                            <Clock size={16} />
                            <DetailValue>{pkg.no_hours} hours</DetailValue>
                          </DetailItem>
                        )}
                        <DetailItem>
                          <Users size={16} />
                          <DetailValue>Max {pkg.max_participant} participants</DetailValue>
                        </DetailItem>
                        <DetailItem>
                          <Calendar size={16} />
                          <DetailValue>Max {pkg.max_no_per_day} per day</DetailValue>
                        </DetailItem>
                      </PackageDetails>
                    </PackageCard>
                  ))
                ) : (
                  <EmptyState>
                    <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
                      No packages defined
                    </div>
                    <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                      Create your first package to get started
                    </div>
                  </EmptyState>
                )}
              </PackageGrid>
              
              <AddButton onClick={() => setIsAdding(true)}>
                <Plus size={16} />
                Add New Package
              </AddButton>
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Package Type *</Label>
                  <Select
                    value={formData.price_type}
                    onChange={(e) => setFormData({...formData, price_type: e.target.value})}
                    required
                  >
                    <option value="HOURLY">Hourly</option>
                    <option value="HALF_DAY">Half Day</option>
                    <option value="FULL_DAY">Full Day</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label>Base Price (₹) *</Label>
                  <Input
                    type="number"
                    value={formData.base_price}
                    onChange={(e) => setFormData({...formData, base_price: e.target.value})}
                    placeholder="1500"
                    min="0"
                    step="0.01"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Pricing Rule *</Label>
                  <Select
                    value={formData.pricing_rule_id}
                    onChange={(e) => setFormData({...formData, pricing_rule_id: e.target.value})}
                    required
                  >
                    <option value="1">Default Pricing Rule</option>
                    <option value="2">Alternative Pricing Rule</option>
                    {/* Add other pricing rules here if available */}
                  </Select>
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label>Start Time *</Label>
                  <Input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>End Time *</Label>
                  <Input
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                    required
                  />
                </FormGroup>
                
                {formData.price_type === "HOURLY" && (
                  <FormGroup>
                    <Label>Number of Hours</Label>
                    <Input
                      type="number"
                      value={formData.no_hours}
                      onChange={(e) => setFormData({...formData, no_hours: e.target.value})}
                      placeholder="2"
                      min="1"
                    />
                  </FormGroup>
                )}
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label>Max Participants *</Label>
                  <Input
                    type="number"
                    value={formData.max_participant}
                    onChange={(e) => setFormData({...formData, max_participant: e.target.value})}
                    placeholder="10"
                    min="1"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Max Per Day *</Label>
                  <Input
                    type="number"
                    value={formData.max_no_per_day}
                    onChange={(e) => setFormData({...formData, max_no_per_day: e.target.value})}
                    placeholder="5"
                    min="1"
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormActions>
                <Button 
                  type="button" 
                  className="secondary"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingPackage(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primary" disabled={isSaving}>
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </Button>
              </FormActions>
            </Form>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PackageModal;