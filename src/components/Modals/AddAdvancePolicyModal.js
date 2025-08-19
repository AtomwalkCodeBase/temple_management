import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { processAdvancePolicyData } from "../../services/templeServices";
import { getStoredTempleId } from "../../services/authServices";

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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
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
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: #059669;
  }

  label {
    margin: 0;
    font-weight: 500;
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
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
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

const AddAdvancePolicyModal = ({ policy, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    percent: "",
    min_amount: "",
    due_mode: "BEFORE",
    due_days_before: "",
    is_default: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const templeId = getStoredTempleId();

  useEffect(() => {
    if (policy) {
      setFormData({
        name: policy.name || "",
        percent: policy.percent || "",
        min_amount: policy.min_amount || "",
        due_mode: policy.due_mode || "BEFORE",
        due_days_before: policy.due_days_before || "",
        is_default: policy.is_default || false,
      });
    }
  }, [policy]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const policyData = {
        call_mode: policy ? "UPDATE" : "ADD",
        temple_id: templeId,
        name: formData.name,
        percent: Number.parseFloat(formData.percent),
        min_amount: Number.parseFloat(formData.min_amount),
        due_mode: formData.due_mode,
        due_days_before: Number.parseInt(formData.due_days_before),
        is_default: formData.is_default,
      };

      if (policy) {
        policyData.adv_policy_id = policy.id;
      }

      await processAdvancePolicyData(policyData);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to save policy");
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
          <h2>{policy ? "Edit Advance Policy" : "Add Advance Policy"}</h2>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormGroup>
              <Label htmlFor="name">Policy Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Standard Advance Policy"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="percent">Advance Percentage *</Label>
              <Input
                type="number"
                id="percent"
                name="percent"
                value={formData.percent}
                onChange={handleChange}
                required
                min="0"
                max="100"
                step="0.01"
                placeholder="50"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="min_amount">Minimum Amount (₹) *</Label>
              <Input
                type="number"
                id="min_amount"
                name="min_amount"
                value={formData.min_amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="100"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="due_mode">Due Mode *</Label>
              <Select
                id="due_mode"
                name="due_mode"
                value={formData.due_mode}
                onChange={handleChange}
                required
              >
                <option value="BEFORE">Before Service</option>
                <option value="AFTER">After Service</option>
                <option value="IMMEDIATE">Immediate</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="due_days_before">Due Days Before *</Label>
              <Input
                type="number"
                id="due_days_before"
                name="due_days_before"
                value={formData.due_days_before}
                onChange={handleChange}
                required
                min="0"
                placeholder="3"
              />
            </FormGroup>

            <CheckboxGroup>
              <input
                type="checkbox"
                id="is_default"
                name="is_default"
                checked={formData.is_default}
                onChange={handleChange}
              />
              <Label htmlFor="is_default">Set as default policy</Label>
            </CheckboxGroup>
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
            {loading ? "Saving..." : policy ? "Update Policy" : "Create Policy"}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddAdvancePolicyModal;
