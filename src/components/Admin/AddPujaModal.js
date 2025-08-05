import React, { useState, useEffect, useRef } from "react";

const TIME_SLOTS = [
  { label: "Morning (6–8 AM)", value: "morning" },
  { label: "Afternoon (12–2 PM)", value: "afternoon" },
  { label: "Evening (6–8 PM)", value: "evening" },
];
const DURATION_UNITS = ["Minutes", "Hours"];

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(8px)",
    padding: "2rem",
    animation: "fadeIn 0.3s ease-out",
    overflowY: "auto",
  },
  modalContainer: {
    background: "linear-gradient(145deg, #ffffff, #f8fafc)",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
    overflowY: "auto",
    maxHeight: "calc(100vh - 4rem)",
    animation: "scaleIn 0.3s ease-out",
  },
  modalHeader: {
    background: "linear-gradient(to right, #FF6B00, #FF8F33)",
    padding: "1.5rem",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: "1.6rem",
    fontWeight: "700",
    margin: 0,
    textAlign: "center",
    letterSpacing: "0.5px",
  },
  closeButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "rgba(255, 255, 255, 0.35)",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, transform 0.2s",
  },
  modalBody: {
    padding: "2rem",
    background: "#fff",
  },
  formGroup: {
    marginBottom: "1.75rem",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.6rem",
  },
  input: {
    width: "100%",
    padding: "0.85rem",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    fontSize: "0.9rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
    boxSizing: "border-box",
  },
  errorText: {
    color: "#dc2626",
    fontSize: "0.8rem",
    marginTop: "0.3rem",
    display: "block",
  },
  timeSlotContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    marginTop: "0.6rem",
  },
  timeSlotButton: (selected) => ({
    padding: "0.6rem 1.2rem",
    borderRadius: "12px",
    border: `1px solid ${selected ? "#FF6B00" : "#d1d5db"}`,
    background: selected ? "#FF6B00" : "#fff",
    color: selected ? "#fff" : "#1f2937",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  durationContainer: {
    display: "flex",
    gap: "0.85rem",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.85rem",
    marginTop: "2rem",
    position: "sticky",
    bottom: 0,
    background: "#fff",
    padding: "1rem 0",
  },
  secondaryButton: {
    padding: "0.85rem 1.5rem",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#1f2937",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  primaryButton: {
    padding: "0.85rem 1.5rem",
    borderRadius: "12px",
    border: "none",
    background: "#FF6B00",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

const cssStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .modal-close-button:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: rotate(90deg);
  }
  .modal-input:focus {
    border-color: #FF6B00;
    box-shadow: 0 0 0 4px rgba(255, 107, 0, 0.25);
  }
  .modal-secondary-button:hover {
    background: #f1f5f9;
  }
  .modal-primary-button:hover {
    background: #e55a00;
  }
  @media (max-width: 640px) {
    .modal-overlay {
      padding: 1.5rem;
    }
    .modal-container {
      max-height: calc(100vh - 3rem);
    }
    .modal-title {
      font-size: 1.4rem;
    }
    .modal-body {
      padding: 1.5rem;
    }
  }
`;

function AddPujaModal({ open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    pujaName: "",
    price: "",
    timeSlots: [],
    duration: "",
    durationUnit: DURATION_UNITS[0],
    maxAttendees: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) modalRef.current.focus();
  }, [open]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleTimeSlot = (slot) => {
    const newSlots = formData.timeSlots.includes(slot)
      ? formData.timeSlots.filter((s) => s !== slot)
      : [...formData.timeSlots, slot];
    handleChange("timeSlots", newSlots);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.pujaName.trim()) newErrors.pujaName = "Required field";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Enter a valid amount";
    if (formData.timeSlots.length === 0)
      newErrors.timeSlots = "Select at least one time slot";
    if (!formData.duration || isNaN(formData.duration) || formData.duration <= 0)
      newErrors.duration = "Enter a valid duration";
    if (
      !formData.maxAttendees ||
      isNaN(formData.maxAttendees) ||
      formData.maxAttendees <= 0
    )
      newErrors.maxAttendees = "Enter a valid number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <>
      <style>{cssStyles}</style>
      <div style={styles.modalOverlay} className="modal-overlay">
        <div
          style={styles.modalContainer}
          ref={modalRef}
          tabIndex={-1}
          className="modal-container"
        >
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Add New Puja</h2>
            <button
              style={styles.closeButton}
              onClick={onClose}
              className="modal-close-button"
            >
              ×
            </button>
          </div>
          <div style={styles.modalBody}>
            <div onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Puja Name *</label>
                <input
                  type="text"
                  placeholder="Enter puja name"
                  value={formData.pujaName}
                  onChange={(e) => handleChange("pujaName", e.target.value)}
                  style={styles.input}
                  className="modal-input"
                  autoFocus
                />
                {errors.pujaName && (
                  <span style={styles.errorText}>{errors.pujaName}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Price (₹) *</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  style={styles.input}
                  className="modal-input"
                  min="1"
                />
                {errors.price && (
                  <span style={styles.errorText}>{errors.price}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Time Slot(s) *</label>
                <div style={styles.timeSlotContainer}>
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot.value}
                      style={styles.timeSlotButton(
                        formData.timeSlots.includes(slot.value)
                      )}
                      onClick={() => toggleTimeSlot(slot.value)}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
                {errors.timeSlots && (
                  <span style={styles.errorText}>{errors.timeSlots}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Duration *</label>
                <div style={styles.durationContainer}>
                  <input
                    type="number"
                    placeholder="60"
                    value={formData.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    style={{ ...styles.input, flex: 1 }}
                    className="modal-input"
                    min="1"
                  />
                  <select
                    value={formData.durationUnit}
                    onChange={(e) => handleChange("durationUnit", e.target.value)}
                    style={{ ...styles.input, width: "130px" }}
                    className="modal-input"
                  >
                    {DURATION_UNITS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.duration && (
                  <span style={styles.errorText}>{errors.duration}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Max Attendees *</label>
                <input
                  type="number"
                  placeholder="Maximum attendees"
                  value={formData.maxAttendees}
                  onChange={(e) => handleChange("maxAttendees", e.target.value)}
                  style={styles.input}
                  className="modal-input"
                  min="1"
                />
                {errors.maxAttendees && (
                  <span style={styles.errorText}>{errors.maxAttendees}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  placeholder="Brief description (optional)"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  style={{ ...styles.input, minHeight: "120px" }}
                  className="modal-input"
                  rows="4"
                />
              </div>
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={onClose}
                  className="modal-secondary-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={handleSubmit}
                  className="modal-primary-button"
                >
                  Save Puja
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPujaModal;