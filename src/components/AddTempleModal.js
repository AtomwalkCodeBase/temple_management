"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { addupdatetempale } from "../services/productServices";

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
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem 1rem 0 0;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #374151;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
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
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  border: none;

  &.primary {
    background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
    color: white;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
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
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    state_code: "",
    pin_code: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (temple) {
      setFormData({
        name: temple.name || "",
        email_id: temple.email_id || "",
        mobile_number: temple.mobile_number || "",
        address_line_1: temple.address_line_1 || "",
        address_line_2: temple.address_line_2 || "",
        address_line_3: temple.address_line_3 || "",
        state_code: temple.state_code || "",
        pin_code: temple.pin_code || "",
        description: temple.description || "",
      });
    }
  }, [temple]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (temple) {
        formDataToSend.append("temple_id", temple.id);
      }

      await addupdatetempale(formDataToSend);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to save temple");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <ModalContent
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <ModalHeader>
          <h2>{temple ? "Edit Temple" : "Add New Temple"}</h2>
          <p>
            {temple ? "Update temple information" : "Create a new temple entry"}
          </p>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

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

            <FormRow>
              <FormGroup>
                <Label htmlFor="email_id">Email Address *</Label>
                <Input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleChange}
                  required
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
                  placeholder="+91 9876543210"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
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
                placeholder="Apartment, suite, etc."
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="address_line_3">City *</Label>
                <Input
                  type="text"
                  id="address_line_3"
                  name="address_line_3"
                  value={formData.address_line_3}
                  onChange={handleChange}
                  required
                  placeholder="City name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="state_code">State *</Label>
                <Input
                  type="text"
                  id="state_code"
                  name="state_code"
                  value={formData.state_code}
                  onChange={handleChange}
                  required
                  placeholder="State name"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="pin_code">PIN Code *</Label>
              <Input
                type="text"
                id="pin_code"
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                required
                placeholder="123456"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description about the temple"
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalActions>
          <Button
            type="button"
            className="secondary"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="primary"
            disabled={loading}
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Saving..." : temple ? "Update Temple" : "Create Temple"}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTempleModal;
