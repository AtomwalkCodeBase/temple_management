import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import MasterTabs from "../../components/Admin/MasterTabs";
import ProgressBar from "../../components/Admin/ProgressBar";
import TempleList from "../../components/Admin/TempleList";
import TempleTimeSlots from "../../components/Admin/TempleTimeSlots";
import {
  addupdatetempale,
  uploadTempleImages,
  gettemplist,
  addTempleGroup,
  getTempleGroups,
} from "../../services/productServices";

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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #1e293b;
  font-family: "Inter", sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.08);
  @media (min-width: 768px) {
    padding: 1.75rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &.full {
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

const Row = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ErrorBox = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SuccessBox = styled.div`
  background: #ecfdf5;
  color: #065f46;
  padding: 0.75rem 1rem;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f1f5f9;
  margin: 1rem 0;
`;

function TempleMaster(props) {
  useEffect(() => {
    if (props.templeId) {
      handleEditTemple(props.selectedTemple);
    }
  }, []);
  const [activeTab, setActiveTab] = useState("temple-list");
  const tabs = useMemo(
    () => [
      { id: "temple-list", label: "Temple List" },
      { id: "add-temple", label: "Add a Temple" },
      { id: "time-slots", label: "Time Slots" },
      { id: "temple-groups", label: "Temple Groups" },
    ],
    []
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [templeId, setTempleId] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const formSteps = useMemo(
    () => [
      { id: 0, label: "Basic Information" },
      { id: 1, label: "Address Details" },
      { id: 2, label: "Groups & Remarks" },
      { id: 3, label: "Temple Timings" },
      { id: 4, label: "Temple Sections" },
      { id: 5, label: "Temple Images" },
    ],
    []
  );
  const [templeForm, setTempleForm] = useState({
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

  const [imageFiles, setImageFiles] = useState({
    mainImage: null, // image_file (compulsory)
    additionalImages: [], // image_file_1 to image_file_9 (optional)
  });

  const [timings, setTimings] = useState({
    morning_opening: "",
    morning_closing: "",
    evening_opening: "",
    evening_closing: "",
  });

  const [details, setDetails] = useState([{ title: "", paragraph: "" }]);

  // Manage temple-level time slots used as dropdown options in the form
  const [timeSlots, setTimeSlots] = useState([
    {
      id: "morning",
      name: "Morning Time",
      start: "6 AM",
      end: "11 AM",
      status: "Active",
    },
    {
      id: "evening",
      name: "Evening Time",
      start: "4 PM",
      end: "9 PM",
      status: "Active",
    },
  ]);
  const addTimeSlot = (slot) =>
    setTimeSlots((prev) => [
      ...prev,
      { ...slot, id: Date.now(), status: slot.status || "Active" },
    ]);
  const updateTimeSlot = (id, updatedSlot) =>
    setTimeSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedSlot } : s))
    );
  const deleteTimeSlot = (id) =>
    setTimeSlots((prev) =>
      prev.filter(
        (s) => s.id !== "morning" && s.id !== "evening" && s.id !== id
      )
    );
  const toggleTimeSlotStatus = (id) =>
    setTimeSlots((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );

  // Timings selection by slot - using checkboxes for multiple selection
  const [selectedTimeSlotIds, setSelectedTimeSlotIds] = useState([]);

  // Temple Groups state
  const [groups, setGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([]);
  const [groupForm, setGroupForm] = useState({ name: "", image: null });
  const [subGroupForm, setSubGroupForm] = useState({ name: "", image: null });
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingSubGroup, setEditingSubGroup] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const resetNotices = () => {
    setError("");
    setSuccess("");
  };

  // Function to handle editing a temple
  const handleEditTemple = (templeData) => {
    // Switch to Add Temple tab
    setActiveTab("add-temple");

    // Set temple ID for editing
    setTempleId(templeData.temple_id);

    // Populate form with temple data
    setTempleForm({
      name: templeData.name || "",
      email_id: templeData.email_id || "",
      mobile_number: templeData.mobile_number || "",
      alternate_contact_number: templeData.alternate_contact_number || "",
      contact_name: templeData.contact_name || "",
      address_line_1: templeData.address_line_1 || "",
      address_line_2: templeData.address_line_2 || "",
      address_line_3: templeData.address_line_3 || "",
      state_code: templeData.state_code || "",
      pin_code: templeData.pin_code || "",
      county_code: templeData.county_code || "IN",
      established_date: templeData.established_date || "",
      remarks: templeData.remarks || "",
      web_page: templeData.web_page || "",
      location: templeData.location || "",
      geo_location_data: templeData.geo_location_data || "",
      temple_group: templeData.temple_group || "",
      temple_sub_group: templeData.temple_sub_group || "",
      temple_group_id: templeData.temple_group_id || null,
      temple_sub_group_id: templeData.temple_sub_group_id || null,
    });

    // Populate timings if available
    if (templeData.additional_field_list?.temple_timings) {
      const timings = templeData.additional_field_list.temple_timings;
      if (
        timings.morning_opening ||
        timings.morning_closing ||
        timings.evening_opening ||
        timings.evening_closing
      ) {
        setTimings({
          morning_opening: timings.morning_opening || "",
          morning_closing: timings.morning_closing || "",
          evening_opening: timings.evening_opening || "",
          evening_closing: timings.evening_closing || "",
        });
      }

      // Handle selected time slots if available
      if (
        timings.selected_time_slots &&
        timings.selected_time_slots.length > 0
      ) {
        // Convert the time slots to local format and set selected IDs
        const slotIds = timings.selected_time_slots.map((slot) => slot.id);
        setSelectedTimeSlotIds(slotIds);
      }
    }

    // Populate temple details if available
    if (
      templeData.additional_field_list?.temple_data_list &&
      templeData.additional_field_list.temple_data_list.length > 0
    ) {
      setDetails(templeData.additional_field_list.temple_data_list);
    } else {
      setDetails([{ title: "", paragraph: "" }]);
    }

    // Reset to first step
    setCurrentStep(0);

    // Clear any previous messages
    resetNotices();
  };

  const handleTempleChange = (e) => {
    resetNotices();
    const { name, value } = e.target;
    setTempleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimingChange = (e) => {
    resetNotices();
    const { name, value } = e.target;
    setTimings((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDetail = () =>
    setDetails((prev) => [...prev, { title: "", paragraph: "" }]);
  const handleRemoveDetail = (idx) =>
    setDetails((prev) => prev.filter((_, i) => i !== idx));
  const handleRemoveLastDetail = () =>
    setDetails((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));
  const handleDetailChange = (idx, field, value) =>
    setDetails((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    );

  async function submitTempleSections() {
    setSaving(true);
    resetNotices();

    try {
      // Map selected slots to timings
      const selectedSlots = timeSlots.filter((s) =>
        selectedTimeSlotIds.includes(s.id)
      );
      const timingsPayload = {
        selected_time_slots: selectedSlots.map((slot) => ({
          id: slot.id,
          name: slot.name,
          start: slot.start,
          end: slot.end,
        })),
      };

      // Create temple with all data except images
      const templePayload = {
        temple_data: {
          call_mode: templeId ? "UPDATE" : "ADD",
          ...(templeId ? { temple_id: templeId } : {}),
          ...templeForm,
          temple_timings: timingsPayload,
          temple_data_list: details.filter((d) => d.title || d.paragraph),
        },
      };

      console.log("Creating temple with payload:", templePayload);
      const templeRes = await addupdatetempale(templePayload);
      console.log("Temple creation response:", templeRes);

      if (!templeId) {
        // This is a new temple creation - fetch temple list to get the new temple ID
        console.log(
          "Temple created successfully, fetching temple list to get ID..."
        );
        const templeListRes = await gettemplist();
        console.log("Temple list response:", templeListRes);

        // Find the newly created temple by matching the name and other details
        const templeList =
          templeListRes?.data?.data || templeListRes?.data || [];
        const newlyCreatedTemple = templeList.find(
          (temple) =>
            temple.name === templeForm.name &&
            temple.mobile_number === templeForm.mobile_number &&
            temple.address_line_1 === templeForm.address_line_1
        );

        if (!newlyCreatedTemple || !newlyCreatedTemple.temple_id) {
          throw new Error(
            "Temple created but could not find temple ID. Please check the temple list."
          );
        }

        const newTempleId = newlyCreatedTemple.temple_id;
        console.log("Found temple ID:", newTempleId);

        setTempleId(newTempleId);
        setSuccess(
          "Temple created successfully! You can now add images in the next step."
        );

        // Move to next step (Images)
        setCurrentStep(5);
      } else {
        // This is an update
        setSuccess(
          "Temple updated successfully! You can now add images in the next step."
        );

        // Move to next step (Images)
        setCurrentStep(5);
      }
    } catch (err) {
      console.error("Error in submitTempleSections:", err);
      setError(
        err?.response?.data?.message || err?.message || "Failed to save temple"
      );
    } finally {
      setSaving(false);
    }
  }

  async function submitTempleImages() {
    if (!templeId) {
      setError(
        "Temple ID not found. Please complete the previous steps first."
      );
      return;
    }

    if (!imageFiles.mainImage) {
      setError("Main temple image is required.");
      return;
    }

    setSaving(true);
    resetNotices();

    try {
      const formData = new FormData();
      formData.append("temple_id", templeId);
      formData.append("call_mode", "TEMPLE_IMAGE");

      // Add main image
      if (imageFiles.mainImage) {
        formData.append("image_file", imageFiles.mainImage);
        formData.append("image_file_1", imageFiles.mainImage);
      }

      // Add additional images (up to 9)
      imageFiles.additionalImages.slice(0, 9).forEach((file, index) => {
        formData.append(`image_file_${index + 1}`, file);
      });

      console.log("Uploading images for temple:", templeId);
      console.log("Image files:", {
        mainImage: imageFiles.mainImage?.name,
        additionalImages: imageFiles.additionalImages.map((f) => f.name),
      });
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const imageRes = await uploadTempleImages(templeId, formData);
      console.log("Image upload response:", imageRes);

      setSuccess(
        `Temple ${
          templeId ? "updated" : "created"
        } successfully! Redirecting to temple list...`
      );

      // Redirect user to Temple List tab after successful image upload
      setTimeout(() => {
        setActiveTab("temple-list");
        // Reset the form and go back to step 0
        setCurrentStep(0);
        setTempleId("");
        setTempleForm({
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
        setSelectedTimeSlotIds([]);
        setDetails([{ title: "", paragraph: "" }]);
        setImageFiles({ mainImage: null, additionalImages: [] });
      }, 1500); // Wait 1.5 seconds to show success message
    } catch (err) {
      console.error("Error in submitTempleImages:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error message:", err.message);

      // Better error message handling
      let errorMessage = "Failed to upload images";

      if (
        err.code === "NETWORK_ERROR" ||
        err.message.includes("Network Error")
      ) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error (500). Please try again later.";
      } else if (err.response?.status === 401) {
        errorMessage = "Authentication error. Please login again.";
      } else if (err.response?.status === 413) {
        errorMessage = "Image file too large. Please use smaller images.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  // Note: images tab omitted in current design; image upload handled within Add Temple flow if needed

  async function submitDetails() {
    if (!templeId) {
      setError("Temple ID is required.");
      return;
    }
    setSaving(true);
    resetNotices();
    try {
      const payload = {
        temple_data: {
          call_mode: "UPDATE",
          temple_id: templeId,
          temple_timings: { ...timings },
          temple_data_list: details.filter((d) => d.title || d.paragraph),
        },
      };
      await addupdatetempale(payload);
      setSuccess("All details saved successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to save details"
      );
    } finally {
      setSaving(false);
    }
  }

  // Temple Groups functions
  const fetchTempleGroups = async () => {
    setLoadingGroups(true);
    try {
      const response = await getTempleGroups();
      console.log("Temple Groups API Response:", response);

      const data = response?.data?.data || response?.data || [];
      console.log("Temple Groups Data:", data);

      // Separate groups and subgroups
      const groupsData = data.filter((item) => item.group_type === "T");
      const subGroupsData = data.filter((item) => item.group_type === "S");

      console.log("Groups Data:", groupsData);
      console.log("Sub Groups Data:", subGroupsData);

      setGroups(groupsData);
      setSubGroups(subGroupsData);
    } catch (err) {
      console.error("Error fetching temple groups:", err);
      setError("Failed to fetch temple groups");
    } finally {
      setLoadingGroups(false);
    }
  };

  // Helper function to get group name by ID
  const getGroupNameById = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : "";
  };

  // Helper function to get sub group name by ID
  const getSubGroupNameById = (subGroupId) => {
    const subGroup = subGroups.find((sg) => sg.id === subGroupId);
    return subGroup ? subGroup.name : "";
  };

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    if (!groupForm.name.trim()) {
      setError("Group name is required");
      return;
    }

    setSaving(true);
    resetNotices();

    try {
      const formData = new FormData();
      formData.append("name", groupForm.name.trim());
      formData.append("group_type", "T");
      formData.append("call_mode", editingGroup ? "UPDATE" : "ADD");

      if (editingGroup) {
        // Try different possible ID field names
        const groupId =
          editingGroup.id ||
          editingGroup.group_id ||
          editingGroup.temple_group_id;
        if (!groupId) {
          throw new Error("Group ID not found in the data");
        }
        formData.append("group_id", groupId);
      }

      if (groupForm.image) {
        formData.append("image", groupForm.image);
      }

      console.log("Group FormData:", {
        name: groupForm.name.trim(),
        group_type: "T",
        call_mode: editingGroup ? "UPDATE" : "ADD",
        group_id: editingGroup
          ? editingGroup.id ||
            editingGroup.group_id ||
            editingGroup.temple_group_id
          : undefined,
      });

      await addTempleGroup(formData);
      setSuccess(`Group ${editingGroup ? "updated" : "created"} successfully!`);

      // Reset form and refresh data
      setGroupForm({ name: "", image: null });
      setEditingGroup(null);
      await fetchTempleGroups();
    } catch (err) {
      console.error("Error saving group:", err);
      setError(
        err?.response?.data?.message || err?.message || "Failed to save group"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubGroupSubmit = async (e) => {
    e.preventDefault();
    if (!subGroupForm.name.trim()) {
      setError("Sub group name is required");
      return;
    }

    setSaving(true);
    resetNotices();

    try {
      const formData = new FormData();
      formData.append("name", subGroupForm.name.trim());
      formData.append("group_type", "S");
      formData.append("call_mode", editingSubGroup ? "UPDATE" : "ADD");

      if (editingSubGroup) {
        // Try different possible ID field names
        const subGroupId =
          editingSubGroup.id ||
          editingSubGroup.group_id ||
          editingSubGroup.temple_group_id;
        if (!subGroupId) {
          throw new Error("Sub Group ID not found in the data");
        }
        formData.append("group_id", subGroupId);
      }

      if (subGroupForm.image) {
        formData.append("image", subGroupForm.image);
      }

      console.log("Sub Group FormData:", {
        name: subGroupForm.name.trim(),
        group_type: "S",
        call_mode: editingSubGroup ? "UPDATE" : "ADD",
        group_id: editingSubGroup
          ? editingSubGroup.id ||
            editingSubGroup.group_id ||
            editingSubGroup.temple_group_id
          : undefined,
      });

      await addTempleGroup(formData);
      setSuccess(
        `Sub group ${editingSubGroup ? "updated" : "created"} successfully!`
      );

      // Reset form and refresh data
      setSubGroupForm({ name: "", image: null });
      setEditingSubGroup(null);
      await fetchTempleGroups();
    } catch (err) {
      console.error("Error saving sub group:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save sub group"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEditGroup = (group) => {
    console.log("Editing group:", group);
    setEditingGroup(group);
    setGroupForm({ name: group.name, image: null });
  };

  const handleEditSubGroup = (subGroup) => {
    console.log("Editing sub group:", subGroup);
    setEditingSubGroup(subGroup);
    setSubGroupForm({ name: subGroup.name, image: null });
  };

  const handleDeleteGroup = async (group) => {
    if (
      !window.confirm(`Are you sure you want to delete group "${group.name}"?`)
    ) {
      return;
    }

    console.log("Deleting group:", group);

    setSaving(true);
    resetNotices();

    try {
      const formData = new FormData();
      // Try different possible ID field names
      const groupId = group.id || group.group_id || group.temple_group_id;
      if (!groupId) {
        throw new Error("Group ID not found in the data");
      }

      // Try with just the essential fields for delete
      formData.append("id", groupId);
      formData.append("group_type", "T");
      formData.append("call_mode", "DELETE");

      console.log("Delete group FormData:", {
        id: groupId,
        group_type: "T",
        call_mode: "DELETE",
      });

      const response = await addTempleGroup(formData);
      console.log("Delete API Response:", response);

      setSuccess("Group deleted successfully!");
      await fetchTempleGroups();
    } catch (err) {
      console.error("Error deleting group:", err);
      console.error("Error response:", err.response);
      setError(
        err?.response?.data?.message || err?.message || "Failed to delete group"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSubGroup = async (subGroup) => {
    if (
      !window.confirm(
        `Are you sure you want to delete sub group "${subGroup.name}"?`
      )
    ) {
      return;
    }

    console.log("Deleting sub group:", subGroup);

    setSaving(true);
    resetNotices();

    try {
      const formData = new FormData();
      // Try different possible ID field names
      const subGroupId =
        subGroup.id || subGroup.group_id || subGroup.temple_group_id;
      if (!subGroupId) {
        throw new Error("Sub Group ID not found in the data");
      }

      // Try with just the essential fields for delete
      formData.append("id", subGroupId);
      formData.append("group_type", "S");
      formData.append("call_mode", "DELETE");

      console.log("Delete sub group FormData:", {
        id: subGroupId,
        group_type: "S",
        call_mode: "DELETE",
      });

      const response = await addTempleGroup(formData);
      console.log("Delete sub group API Response:", response);

      setSuccess("Sub group deleted successfully!");
      await fetchTempleGroups();
    } catch (err) {
      console.error("Error deleting sub group:", err);
      console.error("Error response:", err.response);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete sub group"
      );
    } finally {
      setSaving(false);
    }
  };

  const resetGroupForms = () => {
    setGroupForm({ name: "", image: null });
    setSubGroupForm({ name: "", image: null });
    setEditingGroup(null);
    setEditingSubGroup(null);
  };

  // Load temple groups when tab is activated
  useEffect(() => {
    if (activeTab === "temple-groups") {
      fetchTempleGroups();
    }
  }, [activeTab]);

  // Load temple groups for dropdowns when Add Temple tab is activated
  useEffect(() => {
    if (activeTab === "add-temple") {
      fetchTempleGroups();
    }
  }, [activeTab]);

  return (
    <PageContainer>
      <MasterTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <Card>
        {error ? <ErrorBox>{error}</ErrorBox> : null}
        {success ? <SuccessBox>{success}</SuccessBox> : null}

        {activeTab === "add-temple" && (
          <>
            <ProgressBar steps={formSteps} currentStep={currentStep} />

            {currentStep === 0 && (
              <>
                {templeId && (
                  <div
                    style={{
                      marginBottom: "1rem",
                      padding: "1rem",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      border: "1px solid #93c5fd",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    ✏️ <strong>Editing Temple:</strong> {templeForm.name} (ID:{" "}
                    {templeId})
                  </div>
                )}
                <Grid>
                  <FormGroup>
                    <Label>Temple Name *</Label>
                    <Input
                      name="name"
                      value={templeForm.name}
                      onChange={handleTempleChange}
                      required
                      placeholder="Sri Ram Mandir"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Contact Person</Label>
                    <Input
                      name="contact_name"
                      value={templeForm.contact_name}
                      onChange={handleTempleChange}
                      placeholder="Ramesh Kumar"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email_id"
                      value={templeForm.email_id}
                      onChange={handleTempleChange}
                      placeholder="contact@svtemple.org"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Mobile Number *</Label>
                    <Input
                      name="mobile_number"
                      value={templeForm.mobile_number}
                      onChange={handleTempleChange}
                      placeholder="9876543210"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Alternate Contact</Label>
                    <Input
                      name="alternate_contact_number"
                      value={templeForm.alternate_contact_number}
                      onChange={handleTempleChange}
                      placeholder="9123456780"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Website</Label>
                    <Input
                      name="web_page"
                      value={templeForm.web_page}
                      onChange={handleTempleChange}
                      placeholder="https://www.svtemple.org"
                    />
                  </FormGroup>
                </Grid>
              </>
            )}

            {currentStep === 1 && (
              <Grid>
                <FormGroup className="full">
                  <Label>Address Line 1 *</Label>
                  <Input
                    name="address_line_1"
                    value={templeForm.address_line_1}
                    onChange={handleTempleChange}
                    placeholder="Main Road"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Address Line 2</Label>
                  <Input
                    name="address_line_2"
                    value={templeForm.address_line_2}
                    onChange={handleTempleChange}
                    placeholder="Near River Bank"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>City *</Label>
                  <Input
                    name="address_line_3"
                    value={templeForm.address_line_3}
                    onChange={handleTempleChange}
                    placeholder="Bangalore"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>State Code *</Label>
                  <Input
                    name="state_code"
                    value={templeForm.state_code}
                    onChange={handleTempleChange}
                    placeholder="KA"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>PIN Code *</Label>
                  <Input
                    name="pin_code"
                    value={templeForm.pin_code}
                    onChange={handleTempleChange}
                    placeholder="517501"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    value={templeForm.location}
                    onChange={handleTempleChange}
                    placeholder="Bangalore, Karnataka"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Geo Location (Lat,Long)</Label>
                  <Input
                    name="geo_location_data"
                    value={templeForm.geo_location_data}
                    onChange={handleTempleChange}
                    placeholder="13.6288,79.4192"
                  />
                </FormGroup>
              </Grid>
            )}

            {currentStep === 2 && (
              <Grid>
                <FormGroup>
                  <Label>Temple Group</Label>
                  <select
                    name="temple_group_id"
                    value={templeForm.temple_group_id || ""}
                    onChange={handleTempleChange}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "2px solid #fed7aa",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      transition: "all 0.2s",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#ea580c";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(234, 88, 12, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#fed7aa";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select Temple Group</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label>Temple Sub Group</Label>
                  <select
                    name="temple_sub_group_id"
                    value={templeForm.temple_sub_group_id || ""}
                    onChange={handleTempleChange}
                    style={{
                      padding: "0.75rem 1rem",
                      border: "2px solid #fed7aa",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      transition: "all 0.2s",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#ea580c";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(234, 88, 12, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#fed7aa";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select Temple Sub Group</option>
                    {subGroups.map((subGroup) => (
                      <option key={subGroup.id} value={subGroup.id}>
                        {subGroup.name}
                      </option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup className="full">
                  <Label>Remarks</Label>
                  <TextArea
                    name="remarks"
                    value={templeForm.remarks}
                    onChange={handleTempleChange}
                    placeholder="Renovated recently"
                  />
                </FormGroup>
              </Grid>
            )}

            {currentStep === 3 && (
              <div>
                <Label style={{ marginBottom: "1rem", display: "block" }}>
                  Select Temple Timings
                </Label>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {timeSlots
                    .filter((s) => s.status !== "Inactive")
                    .map((slot) => (
                      <div
                        key={slot.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.75rem",
                          border: "1px solid #fed7aa",
                          borderRadius: "8px",
                          backgroundColor: selectedTimeSlotIds.includes(slot.id)
                            ? "#fff7f7"
                            : "#fff",
                        }}
                      >
                        <input
                          type="checkbox"
                          id={`slot-${slot.id}`}
                          checked={selectedTimeSlotIds.includes(slot.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTimeSlotIds((prev) => [
                                ...prev,
                                slot.id,
                              ]);
                            } else {
                              setSelectedTimeSlotIds((prev) =>
                                prev.filter((id) => id !== slot.id)
                              );
                            }
                          }}
                          style={{
                            width: "18px",
                            height: "18px",
                            accentColor: "#ea580c",
                          }}
                        />
                        <label
                          htmlFor={`slot-${slot.id}`}
                          style={{
                            flex: 1,
                            cursor: "pointer",
                            fontWeight: selectedTimeSlotIds.includes(slot.id)
                              ? "600"
                              : "400",
                          }}
                        >
                          <strong>{slot.name}</strong> - {slot.start} to{" "}
                          {slot.end}
                        </label>
                      </div>
                    ))}
                  {timeSlots.filter((s) => s.status !== "Inactive").length ===
                    0 && (
                    <div
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "#64748b",
                        border: "1px dashed #fed7aa",
                        borderRadius: "8px",
                      }}
                    >
                      No active time slots available. Please add time slots in
                      the "Time Slots" tab first.
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <>
                <Title style={{ fontSize: "1.25rem", marginTop: 0 }}>
                  Temple Details Sections
                </Title>
                {details.map((d, idx) => (
                  <Card
                    key={idx}
                    style={{ padding: "1rem", marginBottom: "0.75rem" }}
                  >
                    <Grid>
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          value={d.title}
                          onChange={(e) =>
                            handleDetailChange(idx, "title", e.target.value)
                          }
                          placeholder="History"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Paragraph</Label>
                        <TextArea
                          value={d.paragraph}
                          onChange={(e) =>
                            handleDetailChange(idx, "paragraph", e.target.value)
                          }
                          placeholder="Description..."
                        />
                      </FormGroup>
                    </Grid>
                  </Card>
                ))}
                <Row>
                  <Button color="orange" onClick={handleAddDetail}>
                    Add Section
                  </Button>
                  <Button
                    color="red"
                    onClick={handleRemoveLastDetail}
                    disabled={details.length === 0}
                  >
                    Remove
                  </Button>
                  <Button
                    color={templeId ? "green" : "orange"}
                    onClick={submitTempleSections}
                    loading={saving}
                    disabled={saving}
                  >
                    {templeId
                      ? "Update Temple & Continue"
                      : "Create Temple & Continue"}
                  </Button>
                </Row>
              </>
            )}

            {currentStep === 5 && (
              <div>
                {!templeId && (
                  <div
                    style={{
                      marginBottom: "1rem",
                      padding: "1rem",
                      backgroundColor: "#fef3c7",
                      color: "#92400e",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      border: "1px solid #fbbf24",
                    }}
                  >
                    ⚠️ Please complete the previous steps to create the temple
                    first. You need a temple ID to upload images.
                  </div>
                )}
                <FormGroup className="full">
                  <Label>Main Temple Image * (Required)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFiles((prev) => ({
                        ...prev,
                        mainImage: e.target.files[0] || null,
                      }))
                    }
                  />
                  {imageFiles.mainImage && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "#f0f9ff",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                      }}
                    >
                      Selected: {imageFiles.mainImage.name}
                    </div>
                  )}
                </FormGroup>

                <Divider />

                <FormGroup className="full">
                  <Label>Additional Images (Optional - up to 9)</Label>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setImageFiles((prev) => ({
                            ...prev,
                            additionalImages: [
                              ...prev.additionalImages,
                              e.target.files[0],
                            ],
                          }));
                        }
                      }}
                    />
                    <Button
                      color="orange"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.onchange = (e) => {
                          if (e.target.files[0]) {
                            setImageFiles((prev) => ({
                              ...prev,
                              additionalImages: [
                                ...prev.additionalImages,
                                e.target.files[0],
                              ],
                            }));
                          }
                        };
                        input.click();
                      }}
                    >
                      Add Image
                    </Button>
                  </div>

                  {imageFiles.additionalImages.length > 0 && (
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      {imageFiles.additionalImages.map((file, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.5rem",
                            backgroundColor: "#f8fafc",
                            borderRadius: "4px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <span style={{ fontSize: "0.875rem" }}>
                            {index + 1}. {file.name}
                          </span>
                          <Button
                            color="red"
                            size="sm"
                            onClick={() => {
                              setImageFiles((prev) => ({
                                ...prev,
                                additionalImages: prev.additionalImages.filter(
                                  (_, i) => i !== index
                                ),
                              }));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {imageFiles.additionalImages.length >= 9 && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                      }}
                    >
                      Maximum 9 additional images reached.
                    </div>
                  )}
                </FormGroup>
              </div>
            )}
            <Divider />
            <Row>
              <Button
                color="gray"
                onClick={() => {
                  setTempleId(""); // Clear temple ID to reset to create mode
                  setTempleForm({
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
                    temple_group_id: "",
                    temple_sub_group_id: "",
                  });
                  setSelectedTimeSlotIds([]);
                  setDetails([{ title: "", paragraph: "" }]);
                  setImageFiles({ mainImage: null, additionalImages: [] });
                  setCurrentStep(0);
                }}
              >
                Reset
              </Button>
              {currentStep > 0 && (
                <Button
                  color="gray"
                  onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                >
                  Back
                </Button>
              )}
              {currentStep < formSteps.length - 1 && (
                <Button
                  color="orange"
                  onClick={() =>
                    setCurrentStep((s) => Math.min(formSteps.length - 1, s + 1))
                  }
                >
                  Next
                </Button>
              )}
              {currentStep === formSteps.length - 1 && (
                <Button
                  color="orange"
                  onClick={submitTempleImages}
                  loading={saving}
                  disabled={saving}
                >
                  Upload Images
                </Button>
              )}
            </Row>
          </>
        )}

        {activeTab === "temple-list" && (
          <TempleList onEditTemple={handleEditTemple} />
        )}

        {activeTab === "time-slots" && (
          <TempleTimeSlots
            timeSlots={timeSlots}
            onAddTimeSlot={addTimeSlot}
            onEditTimeSlot={updateTimeSlot}
            onDeleteTimeSlot={deleteTimeSlot}
            onToggleTimeSlotStatus={toggleTimeSlotStatus}
          />
        )}

        {activeTab === "temple-groups" && (
          <div>
            <Title
              style={{
                fontSize: "1.25rem",
                marginTop: 0,
                marginBottom: "1.5rem",
              }}
            >
              Temple Groups Management
            </Title>

            {/* Groups Section */}
            <Card style={{ marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>
                {editingGroup
                  ? `Edit Group: ${editingGroup.name}`
                  : "Create New Group"}
              </h3>
              <form onSubmit={handleGroupSubmit}>
                <Grid>
                  <FormGroup>
                    <Label>Group Name *</Label>
                    <Input
                      name="name"
                      value={groupForm.name}
                      onChange={(e) =>
                        setGroupForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter group name"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Group Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setGroupForm((prev) => ({
                          ...prev,
                          image: e.target.files[0] || null,
                        }))
                      }
                    />
                    {groupForm.image && (
                      <div
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.5rem",
                          backgroundColor: "#f0f9ff",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                        }}
                      >
                        Selected: {groupForm.image.name}
                      </div>
                    )}
                  </FormGroup>
                </Grid>
                <Row>
                  <Button color="gray" onClick={resetGroupForms}>
                    Reset
                  </Button>
                  <Button
                    color={editingGroup ? "green" : "orange"}
                    type="submit"
                    loading={saving}
                    disabled={saving}
                  >
                    {editingGroup ? "Update Group" : "Create Group"}
                  </Button>
                </Row>
              </form>
            </Card>

            {/* Sub Groups Section */}
            <Card style={{ marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>
                {editingSubGroup
                  ? `Edit Sub Group: ${editingSubGroup.name}`
                  : "Create New Sub Group"}
              </h3>
              <form onSubmit={handleSubGroupSubmit}>
                <Grid>
                  <FormGroup>
                    <Label>Sub Group Name *</Label>
                    <Input
                      name="name"
                      value={subGroupForm.name}
                      onChange={(e) =>
                        setSubGroupForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter sub group name"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Sub Group Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setSubGroupForm((prev) => ({
                          ...prev,
                          image: e.target.files[0] || null,
                        }))
                      }
                    />
                    {subGroupForm.image && (
                      <div
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.5rem",
                          backgroundColor: "#f0f9ff",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                        }}
                      >
                        Selected: {subGroupForm.image.name}
                      </div>
                    )}
                  </FormGroup>
                </Grid>
                <Row>
                  <Button color="gray" onClick={resetGroupForms}>
                    Reset
                  </Button>
                  <Button
                    color={editingSubGroup ? "green" : "orange"}
                    type="submit"
                    loading={saving}
                    disabled={saving}
                  >
                    {editingSubGroup ? "Update Sub Group" : "Create Sub Group"}
                  </Button>
                </Row>
              </form>
            </Card>

            {/* Groups Table */}
            <Card style={{ marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>
                Existing Groups
              </h3>
              {loadingGroups ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#64748b",
                  }}
                >
                  Loading groups...
                </div>
              ) : groups.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#64748b",
                    border: "1px dashed #fed7aa",
                    borderRadius: "8px",
                  }}
                >
                  No groups found. Create your first group above.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#f8fafc" }}>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "left",
                            border: "1px solid #e2e8f0",
                            fontWeight: "600",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "left",
                            border: "1px solid #e2e8f0",
                            fontWeight: "600",
                          }}
                        >
                          Image
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "center",
                            border: "1px solid #e2e8f0",
                            fontWeight: "600",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.map((group) => (
                        <tr
                          key={group.id}
                          style={{ borderBottom: "1px solid #e2e8f0" }}
                        >
                          <td
                            style={{
                              padding: "0.75rem",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {group.name}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {group.image ? (
                              <img
                                src={group.image}
                                alt={group.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              <span
                                style={{
                                  color: "#64748b",
                                  fontSize: "0.875rem",
                                }}
                              >
                                No image
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              border: "1px solid #e2e8f0",
                              textAlign: "center",
                            }}
                          >
                            <Button
                              color="blue"
                              size="sm"
                              onClick={() => handleEditGroup(group)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Sub Groups Table */}
            <Card>
              <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b" }}>
                Existing Sub Groups
              </h3>
              {loadingGroups ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#64748b",
                  }}
                >
                  Loading sub groups...
                </div>
              ) : subGroups.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#64748b",
                    border: "1px dashed #fed7aa",
                    borderRadius: "8px",
                  }}
                >
                  No sub groups found. Create your first sub group above.
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#f8fafc" }}>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "left",
                            border: "1px solid #e2e8f0",
                            fontWeight: "600",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "left",
                            border: "1px solid #e2e8f0",
                            fontWeight: "600",
                          }}
                        >
                          Image
                        </th>
                        <th
                          style={{
                            padding: "0.75rem",
                            textAlign: "center",
                            border: "1px solid #e2e8f0",
                            fontWeight: "600",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subGroups.map((subGroup) => (
                        <tr
                          key={subGroup.id}
                          style={{ borderBottom: "1px solid #e2e8f0" }}
                        >
                          <td
                            style={{
                              padding: "0.75rem",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {subGroup.name}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {subGroup.image ? (
                              <img
                                src={subGroup.image}
                                alt={subGroup.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                            ) : (
                              <span
                                style={{
                                  color: "#64748b",
                                  fontSize: "0.875rem",
                                }}
                              >
                                No image
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem",
                              border: "1px solid #e2e8f0",
                              textAlign: "center",
                            }}
                          >
                            <Button
                              color="blue"
                              size="sm"
                              onClick={() => handleEditSubGroup(subGroup)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

export default TempleMaster;
