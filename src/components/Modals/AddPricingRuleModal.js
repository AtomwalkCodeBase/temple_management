"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import {
  processPricingRuleData,
  getWeekDayList,
} from "../../services/templeServices";
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
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
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
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
    background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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

const AddPricingRuleModal = ({ rule, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    day_of_week: "",
    start_date: "",
    end_date: "",
    date_price: "",
    time_price: "",
    week_day_price: "",
    excluded_days_price: "",
  });
  const [weekDays, setWeekDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const templeId = getStoredTempleId();

  useEffect(() => {
    fetchWeekDays();
    if (rule) {
      setFormData({
        name: rule.name || "",
        start_time: rule.start_time || "",
        end_time: rule.end_time || "",
        day_of_week: rule.day_of_week?.toString() || "",
        start_date: rule.start_date || "",
        end_date: rule.end_date || "",
        date_price: rule.date_price || "",
        time_price: rule.time_price || "",
        week_day_price: rule.week_day_price || "",
        excluded_days_price: rule.excluded_days_price || "",
      });
    }
  }, [rule]);

  const fetchWeekDays = async () => {
    try {
      const response = await getWeekDayList();
      setWeekDays(response);
    } catch (error) {
      console.error("Error fetching week days:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const formatDateForAPI = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const ruleData = {
        call_mode: rule ? "UPDATE" : "ADD",
        temple_id: templeId,
        name: formData.name,
        start_time: formData.start_time,
        end_time: formData.end_time,
        day_of_week: formData.day_of_week
          ? Number.parseInt(formData.day_of_week)
          : null,
        start_date: formatDateForAPI(formData.start_date),
        end_date: formatDateForAPI(formData.end_date),
        date_price: Number.parseFloat(formData.date_price),
        time_price: Number.parseFloat(formData.time_price),
        week_day_price: Number.parseFloat(formData.week_day_price),
        excluded_days_price: Number.parseFloat(formData.excluded_days_price),
      };

      if (rule) {
        ruleData.pricing_rule_id = rule.id;
      }

      await processPricingRuleData(ruleData);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to save pricing rule");
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
          <h2>{rule ? "Edit Pricing Rule" : "Add Pricing Rule"}</h2>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormGroup>
              <Label htmlFor="name">Rule Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Weekend Pricing"
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="start_time">Start Time</Label>
                <Input
                  type="time"
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="end_time">End Time</Label>
                <Input
                  type="time"
                  id="end_time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="day_of_week">Day of Week</Label>
              <Select
                id="day_of_week"
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
              >
                <option value="">All Days</option>
                {weekDays.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="date_price">Date Price (₹)</Label>
                <Input
                  type="number"
                  id="date_price"
                  name="date_price"
                  value={formData.date_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="500"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="time_price">Time Price (₹)</Label>
                <Input
                  type="number"
                  id="time_price"
                  name="time_price"
                  value={formData.time_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="200"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="week_day_price">Week Day Price (₹)</Label>
                <Input
                  type="number"
                  id="week_day_price"
                  name="week_day_price"
                  value={formData.week_day_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="300"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="excluded_days_price">
                  Excluded Days Price (₹)
                </Label>
                <Input
                  type="number"
                  id="excluded_days_price"
                  name="excluded_days_price"
                  value={formData.excluded_days_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0"
                />
              </FormGroup>
            </FormRow>
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
            {loading ? "Saving..." : rule ? "Update Rule" : "Create Rule"}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddPricingRuleModal;
