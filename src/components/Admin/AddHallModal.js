import React, { useState, useEffect, useRef } from "react";

const HALL_TYPES = [
  "Marriage Hall",
  "Dining Hall", 
  "Seminar Hall",
  "Open Ground"
];

const AMENITIES = [
  "Air Conditioning",
  "Sound System", 
  "Stage",
  "Projector",
  "Seating"
];

const RATE_TYPES = ["Hourly", "Fixed"];

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
    maxWidth: "680px",
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
  chipStyle: (selected) => ({
    padding: "0.6rem 1.2rem",
    borderRadius: "12px",
    border: `1px solid ${selected ? "#FF6B00" : "#d1d5db"}`,
    background: selected ? "#FF6B00" : "#fff",
    color: selected ? "#fff" : "#1f2937",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.2s",
    marginRight: "0.6rem",
    marginBottom: "0.6rem",
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
  fileInputStyle: {
    width: "100%",
    padding: "0.85rem",
    border: "2px dashed #d1d5db",
    borderRadius: "12px",
    fontSize: "0.9rem",
    background: "#f9f9f9",
    cursor: "pointer",
    textAlign: "center",
    color: "#666",
    marginBottom: "0.6rem",
  },
  imagePreviewStyle: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: "0.6rem",
  },
  flexContainer: {
    display: "flex",
    gap: "0.85rem",
    marginBottom: "1.75rem",
  },
  flexItem: {
    flex: 1,
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
  .modal-chip:hover {
    background: ${styles.chipStyle(false).background};
    color: ${styles.chipStyle(false).color};
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
    .modal-flex-container {
      flex-direction: column;
    }
  }
`;

function AddHallModal({ open, onClose, onSave }) {
  const [hallName, setHallName] = useState("");
  const [location, setLocation] = useState("");
  const [hallType, setHallType] = useState(HALL_TYPES[0]);
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [baseRate, setBaseRate] = useState("");
  const [rateType, setRateType] = useState(RATE_TYPES[0]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const modalRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open && modalRef.current) modalRef.current.focus();
  }, [open]);

  const validate = () => {
    const newErrors = {};
    if (!hallName.trim()) newErrors.hallName = "Required field";
    if (!location.trim()) newErrors.location = "Required field";
    if (!capacity || isNaN(capacity) || capacity <= 0)
      newErrors.capacity = "Enter a valid number";
    if (amenities.length === 0)
      newErrors.amenities = "Select at least one amenity";
    if (!baseRate || isNaN(baseRate) || baseRate <= 0)
      newErrors.baseRate = "Enter a valid amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ 
        hallName, 
        location, 
        hallType, 
        capacity, 
        amenities, 
        baseRate, 
        rateType, 
        imageFile, 
        description 
      });
      onClose();
    }
  };

  const toggleAmenity = (amenity) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
    if (errors.amenities) setErrors(prev => ({ ...prev, amenities: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
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
            <h2 style={styles.modalTitle}>Add New Hall</h2>
            <button
              style={styles.closeButton}
              onClick={onClose}
              className="modal-close-button"
            >
              ×
            </button>
          </div>
          <div style={styles.modalBody}>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Hall Name *</label>
                <input
                  type="text"
                  placeholder="Enter hall name"
                  value={hallName}
                  onChange={(e) => setHallName(e.target.value)}
                  style={styles.input}
                  className="modal-input"
                  autoFocus
                />
                {errors.hallName && (
                  <span style={styles.errorText}>{errors.hallName}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Location *</label>
                <input
                  type="text"
                  placeholder="Enter location or floor"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={styles.input}
                  className="modal-input"
                />
                {errors.location && (
                  <span style={styles.errorText}>{errors.location}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Hall Type *</label>
                <select
                  value={hallType}
                  onChange={(e) => setHallType(e.target.value)}
                  style={styles.input}
                  className="modal-input"
                >
                  {HALL_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Capacity *</label>
                <input
                  type="number"
                  placeholder="Maximum seating capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  style={styles.input}
                  className="modal-input"
                  min="1"
                />
                {errors.capacity && (
                  <span style={styles.errorText}>{errors.capacity}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Amenities *</label>
                <div style={{ marginBottom: "0.6rem" }}>
                  {AMENITIES.map((amenity) => (
                    <button
                      type="button"
                      key={amenity}
                      style={styles.chipStyle(amenities.includes(amenity))}
                      onClick={() => toggleAmenity(amenity)}
                      className="modal-chip"
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
                {errors.amenities && (
                  <span style={styles.errorText}>{errors.amenities}</span>
                )}
              </div>

              <div style={styles.flexContainer} className="modal-flex-container">
                <div style={styles.flexItem}>
                  <label style={styles.label}>Base Rate (₹) *</label>
                  <input
                    type="number"
                    placeholder="Enter base rate in ₹"
                    value={baseRate}
                    onChange={(e) => setBaseRate(e.target.value)}
                    style={styles.input}
                    className="modal-input"
                    min="1"
                  />
                  {errors.baseRate && (
                    <span style={styles.errorText}>{errors.baseRate}</span>
                  )}
                </div>
                <div style={styles.flexItem}>
                  <label style={styles.label}>Rate Type *</label>
                  <select
                    value={rateType}
                    onChange={(e) => setRateType(e.target.value)}
                    style={styles.input}
                    className="modal-input"
                  >
                    {RATE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Image Upload</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <div
                  style={styles.fileInputStyle}
                  onClick={handleImageClick}
                >
                  {imagePreview ? (
                    <div>
                      <div>Image selected: {imageFile?.name}</div>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={styles.imagePreviewStyle} 
                      />
                    </div>
                  ) : (
                    <div>Click to upload JPG/PNG (Max size: 5MB)</div>
                  )}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  placeholder="Brief description of the hall"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  type="submit"
                  style={styles.primaryButton}
                  className="modal-primary-button"
                >
                  Save Hall
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddHallModal;