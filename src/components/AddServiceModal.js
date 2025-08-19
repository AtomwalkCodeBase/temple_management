"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { processTempleServiceData } from "../services/templeServices";
import { getStoredTempleId } from "../services/authServices";

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
  max-width: 800px;
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

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
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

const VariationsSection = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: #f9fafb;
`;

const VariationItem = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AddVariationButton = styled.button`
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  color: #6b7280;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const RemoveVariationButton = styled.button`
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: #fca5a5;
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

const AddServiceModal = ({
  service,
  serviceTypes,
  priceTypes,
  advancePolicies,
  refundPolicies,
  pricingRules,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    service_type: "",
    description: "",
    base_price: "",
    capacity: "",
    duration_minutes: "",
    adv_policy_id: "",
    refund_policy_id: "",
    pricing_rule_id: "",
    service_variation_list: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const templeId = getStoredTempleId();

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        service_type: service.service_type || "",
        description: service.description || "",
        base_price: service.base_price || "",
        capacity: service.capacity || "",
        duration_minutes: service.duration_minutes || "",
        adv_policy_id: service.adv_policy_data?.id || "",
        refund_policy_id: service.refund_policy_data?.id || "",
        pricing_rule_id: service.pricing_rule_data?.id || "",
        service_variation_list: service.service_variation_list || [],
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const addVariation = () => {
    setFormData((prev) => ({
      ...prev,
      service_variation_list: [
        ...prev.service_variation_list,
        {
          id: null,
          price_type: "",
          base_price: "",
          pricing_rule_id: "",
          start_time: "",
          end_time: "",
          no_hours: "",
          max_no_per_day: "",
          max_participant: "",
        },
      ],
    }));
  };

  const removeVariation = (index) => {
    setFormData((prev) => ({
      ...prev,
      service_variation_list: prev.service_variation_list.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const updateVariation = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      service_variation_list: prev.service_variation_list.map((variation, i) =>
        i === index ? { ...variation, [field]: value } : variation
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const serviceData = {
        call_mode: service ? "UPDATE" : "ADD",
        temple_id: templeId,
        ...formData,
        base_price: Number.parseFloat(formData.base_price),
        capacity: Number.parseInt(formData.capacity),
        duration_minutes: Number.parseInt(formData.duration_minutes),
        adv_policy_id: Number.parseInt(formData.adv_policy_id),
        refund_policy_id: Number.parseInt(formData.refund_policy_id),
        pricing_rule_id: Number.parseInt(formData.pricing_rule_id),
        service_variation_list: formData.service_variation_list.map(
          (variation) => ({
            ...variation,
            base_price: Number.parseFloat(variation.base_price),
            pricing_rule_id: Number.parseInt(variation.pricing_rule_id),
            no_hours: Number.parseInt(variation.no_hours),
            max_no_per_day: Number.parseInt(variation.max_no_per_day),
            max_participant: Number.parseInt(variation.max_participant),
          })
        ),
      };

      if (service) {
        serviceData.service_id = service.service_id;
      }

      await processTempleServiceData(serviceData);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to save service");
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
          <h2>{service ? "Edit Service" : "Add New Service"}</h2>
          <p>
            {service ? "Update service details" : "Create a new temple service"}
          </p>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter service name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="service_type">Service Type *</Label>
                <Select
                  id="service_type"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select service type</option>
                  {serviceTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter service description"
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="base_price">Base Price (₹) *</Label>
                <Input
                  type="number"
                  id="base_price"
                  name="base_price"
                  value={formData.base_price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Number of people"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
                <Input
                  type="number"
                  id="duration_minutes"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Duration in minutes"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="adv_policy_id">Advance Policy</Label>
                <Select
                  id="adv_policy_id"
                  name="adv_policy_id"
                  value={formData.adv_policy_id}
                  onChange={handleChange}
                >
                  <option value="">Select advance policy</option>
                  {advancePolicies.map((policy) => (
                    <option key={policy.id} value={policy.id}>
                      {policy.name} ({policy.percent}%)
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="refund_policy_id">Refund Policy</Label>
                <Select
                  id="refund_policy_id"
                  name="refund_policy_id"
                  value={formData.refund_policy_id}
                  onChange={handleChange}
                >
                  <option value="">Select refund policy</option>
                  {refundPolicies.map((policy) => (
                    <option key={policy.id} value={policy.id}>
                      {policy.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="pricing_rule_id">Pricing Rule</Label>
                <Select
                  id="pricing_rule_id"
                  name="pricing_rule_id"
                  value={formData.pricing_rule_id}
                  onChange={handleChange}
                >
                  <option value="">Select pricing rule</option>
                  {pricingRules.map((rule) => (
                    <option key={rule.id} value={rule.id}>
                      {rule.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormRow>

            <VariationsSection>
              <h3 style={{ margin: "0 0 1rem 0", color: "#374151" }}>
                Service Variations
              </h3>

              {formData.service_variation_list.map((variation, index) => (
                <VariationItem key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <h4 style={{ margin: 0, color: "#6B7280" }}>
                      Variation {index + 1}
                    </h4>
                    <RemoveVariationButton
                      type="button"
                      onClick={() => removeVariation(index)}
                    >
                      Remove
                    </RemoveVariationButton>
                  </div>

                  <FormRow>
                    <FormGroup>
                      <Label>Price Type</Label>
                      <Select
                        value={variation.price_type}
                        onChange={(e) =>
                          updateVariation(index, "price_type", e.target.value)
                        }
                      >
                        <option value="">Select price type</option>
                        {priceTypes.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>Base Price (₹)</Label>
                      <Input
                        type="number"
                        value={variation.base_price}
                        onChange={(e) =>
                          updateVariation(index, "base_price", e.target.value)
                        }
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={variation.start_time}
                        onChange={(e) =>
                          updateVariation(index, "start_time", e.target.value)
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={variation.end_time}
                        onChange={(e) =>
                          updateVariation(index, "end_time", e.target.value)
                        }
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Max Participants</Label>
                      <Input
                        type="number"
                        value={variation.max_participant}
                        onChange={(e) =>
                          updateVariation(
                            index,
                            "max_participant",
                            e.target.value
                          )
                        }
                        min="1"
                        placeholder="Number of participants"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Max Per Day</Label>
                      <Input
                        type="number"
                        value={variation.max_no_per_day}
                        onChange={(e) =>
                          updateVariation(
                            index,
                            "max_no_per_day",
                            e.target.value
                          )
                        }
                        min="1"
                        placeholder="Max bookings per day"
                      />
                    </FormGroup>
                  </FormRow>
                </VariationItem>
              ))}

              <AddVariationButton type="button" onClick={addVariation}>
                + Add Service Variation
              </AddVariationButton>
            </VariationsSection>
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
            {loading
              ? "Saving..."
              : service
              ? "Update Service"
              : "Create Service"}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddServiceModal;
