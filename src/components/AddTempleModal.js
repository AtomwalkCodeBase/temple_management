"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  addupdatetempale,
  uploadTempleImages,
} from "../services/productServices";

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

const FileInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  background: #f9fafb;

  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const TimingSection = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const TimingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddTimingButton = styled.button`
  background: #ea580c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

const RemoveTimingButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #dc2626;
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
    alternate_contact_number: "",
    contact_name: "",
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    state_code: "",
    pin_code: "",
    county_code: "IN",
    remarks: "",
    web_page: "",
    location: "",
    geo_location_data: "",
    temple_group: "",
    temple_sub_group: "",
    temple_group_id: null,
    temple_sub_group_id: null,
  });

  const [templeTimings, setTempleTimings] = useState({
    morning_opening: "",
    morning_closing: "",
    evening_opening: "",
    evening_closing: "",
  });

  const [templeDataList, setTempleDataList] = useState([
    { title: "", paragraph: "" },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
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
        remarks: temple.remarks || "",
        web_page: temple.web_page || "",
        location: temple.location || "",
        geo_location_data: temple.geo_location_data || "",
        temple_group: temple.temple_group || "",
        temple_sub_group: temple.temple_sub_group || "",
        temple_group_id: temple.temple_group_id || null,
        temple_sub_group_id: temple.temple_sub_group_id || null,
      });

      if (temple.temple_timings) {
        setTempleTimings(temple.temple_timings);
      }

      if (temple.temple_data_list) {
        setTempleDataList(temple.temple_data_list);
      } else if (temple.additional_field_list?.temple_data_list) {
        setTempleDataList(temple.additional_field_list.temple_data_list);
      }
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

  const handleTimingChange = (e) => {
    const { name, value } = e.target;
    setTempleTimings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDataListChange = (index, field, value) => {
    setTempleDataList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addDataListItem = () => {
    setTempleDataList((prev) => [...prev, { title: "", paragraph: "" }]);
  };

  const removeDataListItem = (index) => {
    setTempleDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare temple data with UPDATE call_mode for existing temples
      const templeData = {
        call_mode: temple ? "UPDATE" : "CREATE",
        ...(temple && { temple_id: temple.temple_id }),
        ...formData,
        temple_timings: templeTimings,
        temple_data_list: templeDataList.filter(
          (item) => item.title && item.paragraph
        ),
      };

      // Submit temple data
      const response = await addupdatetempale({
        temple_data: JSON.stringify(templeData),
      });

      // Upload images if selected
      if (selectedImages.length > 0 && temple?.temple_id) {
        await uploadTempleImages({
          temple_id: temple.temple_id,
          images: selectedImages,
        });
      }

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

            <FormRow>
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
                  placeholder="+91 9876543210"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contact_name">Contact Person Name</Label>
                <Input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  placeholder="Contact person name"
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

            <FormRow>
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
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="temple_group">Temple Group</Label>
                <Input
                  type="text"
                  id="temple_group"
                  name="temple_group"
                  value={formData.temple_group}
                  onChange={handleChange}
                  placeholder="Temple group name"
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
                  placeholder="Temple sub group"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="web_page">Website URL</Label>
              <Input
                type="url"
                id="web_page"
                name="web_page"
                value={formData.web_page}
                onChange={handleChange}
                placeholder="https://www.temple.com"
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

            <TimingSection>
              <Label>Temple Timings</Label>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="morning_opening">Morning Opening</Label>
                  <Input
                    type="time"
                    id="morning_opening"
                    name="morning_opening"
                    value={templeTimings.morning_opening}
                    onChange={handleTimingChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="morning_closing">Morning Closing</Label>
                  <Input
                    type="time"
                    id="morning_closing"
                    name="morning_closing"
                    value={templeTimings.morning_closing}
                    onChange={handleTimingChange}
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="evening_opening">Evening Opening</Label>
                  <Input
                    type="time"
                    id="evening_opening"
                    name="evening_opening"
                    value={templeTimings.evening_opening}
                    onChange={handleTimingChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="evening_closing">Evening Closing</Label>
                  <Input
                    type="time"
                    id="evening_closing"
                    name="evening_closing"
                    value={templeTimings.evening_closing}
                    onChange={handleTimingChange}
                  />
                </FormGroup>
              </FormRow>
            </TimingSection>

            <FormGroup>
              <Label>Temple Information</Label>
              {templeDataList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    background: "#F9FAFB",
                    borderRadius: "0.5rem",
                  }}
                >
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleDataListChange(index, "title", e.target.value)
                      }
                      placeholder="Section title"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Content</Label>
                    <TextArea
                      value={item.paragraph}
                      onChange={(e) =>
                        handleDataListChange(index, "paragraph", e.target.value)
                      }
                      placeholder="Section content"
                    />
                  </FormGroup>
                  {templeDataList.length > 1 && (
                    <RemoveTimingButton
                      type="button"
                      onClick={() => removeDataListItem(index)}
                    >
                      Remove Section
                    </RemoveTimingButton>
                  )}
                </div>
              ))}
              <AddTimingButton type="button" onClick={addDataListItem}>
                Add Information Section
              </AddTimingButton>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="temple_images">Temple Images</Label>
              <FileInput
                type="file"
                id="temple_images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImages.length > 0 && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#6B7280",
                    marginTop: "0.5rem",
                  }}
                >
                  {selectedImages.length} image(s) selected
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="remarks">Remarks</Label>
              <TextArea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Any additional remarks about the temple"
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
