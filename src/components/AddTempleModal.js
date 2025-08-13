"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { addupdatetempale } from "../services/productServices";
import Button from "./Button";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  color: #b45309;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #fed7aa;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid #fed7aa;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

// Button component is now imported from ./Button

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #fecaca;
  margin-bottom: 1rem;
`;

const AddTempleModal = ({ temple, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email_id: "",
    mobile_number: "",
    alternate_contact_number: "",
    contact_name: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    state_code: "",
    pin_code: "",
    county_code: "IN",
    established_date: "",
    remarks: "",
    web_page: "",
    location: "",
    geo_location_data: "",
    temple_group: "",
    temple_sub_group: "",
    temple_group_id: null,
    temple_sub_group_id: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (temple) {
      setFormData({
        name: temple.name || "",
        email_id: temple.email_id || "",
        mobile_number: temple.mobile_number || "",
        alternate_contact_number: temple.alternate_contact_number || "",
        contact_name: temple.contact_name || "",
        address_line_1: temple.address_line_1 || "",
        address_line_2: temple.address_line_2 || "",
        address_line_3: temple.address_line_3 || "",
        state_code: temple.state_code || "",
        pin_code: temple.pin_code || "",
        county_code: temple.county_code || "IN",
        established_date: temple.established_date || "",
        remarks: temple.remarks || "",
        web_page: temple.web_page || "",
        location: temple.location || "",
        geo_location_data: temple.geo_location_data || "",
        temple_group: temple.temple_group || "",
        temple_sub_group: temple.temple_sub_group || "",
        temple_group_id: temple.temple_group_id || null,
        temple_sub_group_id: temple.temple_sub_group_id || null,
        temple_id: temple.temple_id || "",
      });
    }
  }, [temple]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const templeData = {
        call_mode: temple ? "UPDATE" : "ADD",
        ...formData,
      };

      // Add temple_id if updating
      if (temple?.temple_id) {
        templeData.temple_id = temple.temple_id;
      }

      console.log("Sending temple data:", { temple_data: templeData });

      const response = await addupdatetempale({
        temple_data: templeData,
      });

      console.log("API Response:", response);
      onSuccess();
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to save temple. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <h2>{temple ? "✏️ Edit Temple" : "➕ Add New Temple"}</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Temple Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter temple name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="contact_name">Contact Person</Label>
              <Input
                type="text"
                id="contact_name"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                placeholder="Contact person name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email_id">Email Address</Label>
              <Input
                type="email"
                id="email_id"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                placeholder="temple@example.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="mobile_number">Mobile Number *</Label>
              <Input
                type="tel"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
                placeholder="9876543210"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="alternate_contact_number">
                Alternate Contact
              </Label>
              <Input
                type="tel"
                id="alternate_contact_number"
                name="alternate_contact_number"
                value={formData.alternate_contact_number}
                onChange={handleChange}
                placeholder="Alternate contact number"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="web_page">Website</Label>
              <Input
                type="url"
                id="web_page"
                name="web_page"
                value={formData.web_page}
                onChange={handleChange}
                placeholder="https://www.temple.org"
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label htmlFor="address_line_1">Address Line 1 *</Label>
              <Input
                type="text"
                id="address_line_1"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                required
                placeholder="Street address"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address_line_2">Address Line 2</Label>
              <Input
                type="text"
                id="address_line_2"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
                placeholder="Area/Locality"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address_line_3">City *</Label>
              <Input
                type="text"
                id="address_line_3"
                name="address_line_3"
                value={formData.address_line_3}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="state_code">State Code *</Label>
              <Input
                type="text"
                id="state_code"
                name="state_code"
                value={formData.state_code}
                onChange={handleChange}
                required
                placeholder="AP, TN, KA, etc."
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="pin_code">PIN Code *</Label>
              <Input
                type="text"
                id="pin_code"
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                required
                placeholder="517501"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="established_date">Established Date</Label>
              <Input
                type="date"
                id="established_date"
                name="established_date"
                value={formData.established_date}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">Location Description</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Tirupati, Andhra Pradesh"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="geo_location_data">Geo Location (Lat,Long)</Label>
              <Input
                type="text"
                id="geo_location_data"
                name="geo_location_data"
                value={formData.geo_location_data}
                onChange={handleChange}
                placeholder="13.6288,79.4192"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="temple_group">Temple Group</Label>
              <Input
                type="text"
                id="temple_group"
                name="temple_group"
                value={formData.temple_group}
                onChange={handleChange}
                placeholder="e.g., Narayan, Shiva, etc."
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="temple_sub_group">Temple Sub Group</Label>
              <Input
                type="text"
                id="temple_sub_group"
                name="temple_sub_group"
                value={formData.temple_sub_group}
                onChange={handleChange}
                placeholder="e.g., Heritage, Modern, etc."
              />
            </FormGroup>

            <FormGroup className="full-width">
              <Label htmlFor="remarks">Remarks</Label>
              <TextArea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Additional notes about the temple..."
              />
            </FormGroup>

            <ButtonGroup>
              <Button
                type="button"
                variant="outline"
                color="gray"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="orange"
                disabled={loading}
                loading={loading}
              >
                {loading
                  ? "🙏 Saving..."
                  : temple
                  ? "💾 Update Temple"
                  : "➕ Add Temple"}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTempleModal;
