import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { getServiceTypeList, processTempleServiceData, processTempleServiceImages, getTempleServicesList, getPriceTypeList, getPricingRuleList } from "../../services/templeServices";
import { gettemplist } from "../../services/productServices";
import { getStoredTempleId } from "../../services/authServices";

const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem;
  &.full { grid-column: 1 / -1; }
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
    border-color: #7c3aed; 
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12); 
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem; 
  border: 2px solid #e5e7eb; 
  border-radius: 0.5rem; 
  font-size: 1rem; 
  min-height: 100px; 
  resize: vertical;
  &:focus { 
    outline: none; 
    border-color: #7c3aed; 
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12); 
  }
`;

const Row = styled.div`
  display: flex; 
  gap: 1rem; 
  flex-wrap: wrap; 
  justify-content: flex-end; 
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem; 
  border-radius: 8px; 
  border: 1px solid transparent; 
  font-weight: 600; 
  cursor: pointer;
  transition: all 0.2s;
  
  &[data-variant="primary"] { 
    background: #7c3aed; 
    color: #fff; 
    border-color: #7c3aed; 
  }
  &[data-variant="primary"]:hover { 
    background: #6d28d9; 
    border-color: #6d28d9; 
  }
  &[data-variant="secondary"] { 
    background: #f3f4f6; 
    color: #374151; 
    border-color: #d1d5db; 
  }
  &[data-variant="secondary"]:hover { 
    background: #e5e7eb; 
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorBox = styled.div`
  background: #fef3c7; 
  color: #92400e; 
  padding: 0.75rem 1rem; 
  border: 1px solid #fde68a; 
  border-radius: 8px; 
  margin-bottom: 1rem;
`;

const SuccessBox = styled.div`
  background: #d1fae5; 
  color: #065f46; 
  padding: 0.75rem 1rem; 
  border: 1px solid #a7f3d0; 
  border-radius: 8px; 
  margin-bottom: 1rem;
`;

const Info = styled.div`
  color: #64748b; 
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

function normalizePairs(list) {
  if (!list) return [];
  if (Array.isArray(list) && list.length > 0) {
    if (Array.isArray(list[0])) return list;
    if (typeof list[0] === "object") return list.map((x) => [x.id ?? x.value ?? x[0] ?? x, x.name ?? x.label ?? x[1] ?? String(x)]);
    return list.map((x) => [x, String(x)]);
  }
  return [];
}

export default function HallForm({ onCancel, onSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [serviceTypes, setServiceTypes] = useState([]);
  const [templeId, setTempleId] = useState("T_0000010");
  const [serviceId, setServiceId] = useState("");
  const [createdHall, setCreatedHall] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [existingImages, setExistingImages] = useState({ main: "", others: [] });

  const [formData, setFormData] = useState({
    name: "",
    service_type: "",
    description: "",
    base_price: "",
    capacity: "",
    duration_minutes: ""
  });

  const [imageFiles, setImageFiles] = useState({
    image_file: null,
    image_file_1: null,
    image_file_2: null,
    image_file_3: null,
    image_file_4: null,
    image_file_5: null
  });

  const [priceTypes, setPriceTypes] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);

  const steps = [
    { id: 0, label: "Hall Information", icon: "🏛️" },
    { id: 1, label: "Upload Images", icon: "📸" }
  ];

  const extractImageUrls = (svc) => {
    const urls = [];
    const pushIfUrl = (val) => {
      if (typeof val === "string" && /^(https?:)?\/\//.test(val)) urls.push(val);
    };
    if (!svc) return urls;
    pushIfUrl(svc.image_url); pushIfUrl(svc.image); pushIfUrl(svc.main_image);
    Object.entries(svc).forEach(([k, v]) => {
      if (typeof v === "string" && /(image|img)/i.test(k) && /^(https?:)?\/\//.test(v)) urls.push(v);
    });
    const lists = [svc.image_list, svc.images, svc.photos, svc.gallery, svc.service_images];
    lists.forEach(a => { 
      if (Array.isArray(a)) a.forEach((item) => {
        if (typeof item === 'string') pushIfUrl(item);
        if (item && typeof item === 'object') {
          ['url','image_url','file_url','path','src'].forEach(key => pushIfUrl(item[key]));
        }
      });
    });
    const afl = svc?.additional_field_list;
    if (afl) Object.values(afl).forEach(val => {
      if (Array.isArray(val)) val.forEach((item) => {
        if (typeof item === 'string') pushIfUrl(item);
        if (item && typeof item === 'object') ['url','image_url','file_url','path','src'].forEach(k=>pushIfUrl(item[k]));
      });
      if (typeof val === "string") pushIfUrl(val);
    });
    return Array.from(new Set(urls));
  };

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      try {
        const [st, templeList] = await Promise.all([
          getServiceTypeList().catch(() => []),
          gettemplist().catch(() => [])
        ]);
        if (cancelled) return;
        
        const stPairs = normalizePairs(st?.data ?? st);
        setServiceTypes(stPairs);
        
        let actualTempleId = "";
        if (templeList?.data && Array.isArray(templeList.data)) {
          const firstTemple = templeList.data[0];
          actualTempleId = firstTemple?.temple_id || firstTemple?.id || "";
        }
        
        if (!actualTempleId) {
          actualTempleId = getStoredTempleId() || "";
        }
        
        setTempleId(actualTempleId);
        setFormData((prev) => ({ ...prev, service_type: "Hall" }));

        const params = new URLSearchParams(location.search);
        const editId = params.get("edit");
        const stepParam = params.get("step");
        
        if (editId) {
          setIsEditing(true);
          try {
            const servicesResp = await getTempleServicesList();
            const list = Array.isArray(servicesResp)
              ? servicesResp
              : (Array.isArray(servicesResp?.data)
                  ? servicesResp.data
                  : (Array.isArray(servicesResp?.results)
                      ? servicesResp.results
                      : []));
            const svc = list.find(s => (s.service_id || s.id) === editId);
            if (svc) {
              setServiceId(svc.service_id || editId);
              setFormData(prev => ({
                ...prev,
                name: svc.name || "",
                description: svc.description || "",
                base_price: svc.base_price != null ? String(svc.base_price) : "",
                capacity: svc.capacity != null ? String(svc.capacity) : "",
                duration_minutes: svc.duration_minutes != null ? String(svc.duration_minutes) : "",
                service_type: "Hall"
              }));
              const imgs = extractImageUrls(svc);
              setExistingImages({ main: imgs[0] || "", others: imgs.slice(1, 6) });
              
              const n = Number(stepParam);
              if (!Number.isNaN(n) && n >= 0 && n <= 1) {
                setCurrentStep(n);
              }
            }
          } catch (e) {
            // ignore and proceed as add
          }
        } else if (stepParam != null) {
          const n = Number(stepParam);
          if (!Number.isNaN(n) && n >= 0 && n <= 1) setCurrentStep(n);
        }

        const [ptList, prList] = await Promise.all([
          getPriceTypeList().catch(() => []),
          getPricingRuleList().catch(() => [])
        ]);
        setPriceTypes(Array.isArray(ptList?.data) ? ptList.data : (ptList || []));
        setPricingRules(Array.isArray(prList?.data) ? prList.data : (prList || []));

      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    bootstrap();
    return () => { cancelled = true; };
  }, [location.search]);

  const setStepAndSync = (n) => {
    setCurrentStep(n);
    setError("");
    setSuccess("");
    const params = new URLSearchParams(location.search);
    params.set("step", String(n));
    params.set("add", "hall");
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const canSubmit = Boolean(
    formData.name && 
    formData.base_price && 
    formData.capacity && 
    formData.duration_minutes
  );

  const handleImageChange = (field, file) => {
    setImageFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const removeImage = (field) => {
    setImageFiles(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  async function handleSubmit() {
    setSaving(true); 
    setError("");
    setSuccess("");
    
    if (!templeId) {
      setError("No temple ID found. Please ensure you have access to a temple.");
      setSaving(false);
      return;
    }
    
    if (!formData.name || !formData.base_price || !formData.capacity || !formData.duration_minutes) {
      setError("Please fill in all required fields: Hall Name, Rental Price, Capacity, and Duration");
      setSaving(false);
      return;
    }
    
    try {
      const toNum = (v) => (v === undefined || v === null || v === "") ? null : Number(v);
      
      const payload = {
        call_mode: "ADD",
        temple_id: templeId,
        name: formData.name.trim(),
        service_type: "Hall",
        description: formData.description.trim() || "",
        base_price: toNum(formData.base_price),
        capacity: toNum(formData.capacity),
        duration_minutes: toNum(formData.duration_minutes),
        service_variation_list: []
      };
      
      const response = await processTempleServiceData(payload);
      setCreatedHall(response);
      
      const respSvcId = response?.service_id || response?.data?.service_id || response?.result?.service_id;
      if (respSvcId) {
        setServiceId(respSvcId);
      }
      
      setSuccess("Hall created successfully! Now you can upload images.");
      
      try {
        if (!respSvcId) {
          const servicesResponse = await getTempleServicesList();
          const services = Array.isArray(servicesResponse)
            ? servicesResponse
            : (Array.isArray(servicesResponse?.data)
                ? servicesResponse.data
                : (Array.isArray(servicesResponse?.results)
                    ? servicesResponse.results
                    : (Array.isArray(servicesResponse?.services)
                        ? servicesResponse.services
                        : [])));
          
          const newHall = services.find(service => {
            const sType = String(service.service_type || service.service_type_str || "");
            const isHall = /hall/i.test(sType);
            return isHall && service.name === formData.name && String(service.temple_id) === String(templeId);
          });
          
          if (newHall && (newHall.service_id || newHall.id)) {
            const foundId = newHall.service_id || newHall.id;
            setServiceId(foundId);
          } else {
            const fallbackId = `TEMP_${Date.now()}`;
            setServiceId(fallbackId);
          }
        }
      } catch (err) {
        console.error("Error fetching service ID:", err);
      }
      
      setStepAndSync(1);
      
    } catch (err) {
      let errorMessage = "Failed to create hall";
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err?.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate() {
    setSaving(true);
    setError("");
    setSuccess("");

    if (!serviceId) {
      setError("Missing service ID for update.");
      setSaving(false);
      return;
    }

    try {
      const toNum = (v) => (v === undefined || v === null || v === "") ? null : Number(v);
      const payload = {
        call_mode: "UPDATE",
        temple_id: templeId,
        service_id: serviceId,
        name: formData.name.trim(),
        service_type: "Hall",
        description: formData.description.trim() || "",
        base_price: toNum(formData.base_price),
        capacity: toNum(formData.capacity),
        duration_minutes: toNum(formData.duration_minutes),
        service_variation_list: []
      };
      await processTempleServiceData(payload);
      setSuccess("Hall details updated.");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to update hall");
    } finally {
      setSaving(false);
    }
  }

  const handleImageUpload = async () => {
    if (!imageFiles.image_file) {
      setError("Main image is required. Please upload at least one image.");
      return;
    }

    if (!serviceId) {
      setError("Service ID not found. Please try creating the hall again.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const imageData = {
        service_id: serviceId,
        ...imageFiles
      };

      const response = await processTempleServiceImages(imageData);
      setSuccess("Images uploaded successfully! Hall creation complete.");
      
      try {
        if (isEditing && serviceId) {
          const servicesResp = await getTempleServicesList();
          const list = Array.isArray(servicesResp) ? servicesResp : (servicesResp?.data || servicesResp?.results || []);
          const svc = list.find(s => (s.service_id || s.id) === serviceId);
          if (svc) {
            const imgs = extractImageUrls(svc);
            setExistingImages({ main: imgs[0] || "", others: imgs.slice(1, 6) });
          }
        }
      } catch (e) {
        // ignore refresh errors
      }
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(serviceId);
        }
      }, 1000);

    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to upload images");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Card><Info>Loading hall form and temple information…</Info></Card>;
  }

  if (!templeId) {
    return (
      <Card>
        <ErrorBox role="alert">
          No temple found. Please ensure you have access to a temple before creating halls.
        </ErrorBox>
      </Card>
    );
  }

  return (
    <Card>
      <Title>{isEditing ? "Edit Hall" : "Add New Hall"}</Title>
      <ProgressBar steps={steps} currentStep={currentStep} />

      {templeId && (
        <div style={{ 
          background: '#f0f9ff', 
          border: '1px solid #0ea5e9', 
          borderRadius: '8px', 
          padding: '0.75rem 1rem', 
          marginBottom: '1.5rem',
          color: '#0369a1',
          fontSize: '0.9rem'
        }}>
          🏛️ Creating hall for Temple ID: <strong>{templeId}</strong>
        </div>
      )}

      {currentStep === 0 && (
        <Info>
          Create a new hall for temple bookings. Fill in the basic information below to get started.
        </Info>
      )}

      {error && <ErrorBox role="alert">{error}</ErrorBox>}
      {success && <SuccessBox role="alert">{success}</SuccessBox>}

      <Grid>
        {currentStep === 0 && (
          <>
            <FormGroup>
              <Label>Hall Name *</Label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter hall name (e.g., Wedding Hall, Prayer Hall)" 
                required
              />
            </FormGroup>
              
            <FormGroup>
              <Label>Hall Type *</Label>
              <Input 
                name="service_type" 
                value="Hall" 
                disabled
                style={{ background: '#f9fafb', color: '#6b7280' }}
              />
              <Info style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem' }}>
                Service type is automatically set to "Hall" as required by the API
              </Info>
            </FormGroup>
              
            <FormGroup>
              <Label>Rental Price (₹) *</Label>
              <Input 
                name="base_price" 
                type="number" 
                min="0" 
                step="0.01" 
                value={formData.base_price} 
                onChange={handleChange} 
                placeholder="Enter rental price per booking" 
                required
              />
            </FormGroup>
              
            <FormGroup>
              <Label>Maximum Capacity *</Label>
              <Input 
                name="capacity" 
                type="number" 
                min="1" 
                value={formData.capacity} 
                onChange={handleChange} 
                placeholder="Maximum number of people" 
                required
              />
            </FormGroup>
              
            <FormGroup>
              <Label>Event Duration (minutes) *</Label>
              <Input 
                name="duration_minutes" 
                type="number" 
                min="1" 
                value={formData.duration_minutes} 
                onChange={handleChange} 
                placeholder="Standard duration for events" 
                required
              />
            </FormGroup>
              
            <FormGroup className="full">
              <Label>Hall Description</Label>
              <TextArea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Describe the hall, its features, and suitable event types" 
              />
            </FormGroup>
          </>
        )}

        {currentStep === 1 && (
          <FormGroup className="full">
            {isEditing && (existingImages.main || existingImages.others.length > 0) && (
              <div style={{ marginBottom: '1rem' }}>
                <Label>Existing Images</Label>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                    <img src={existingImages.main} alt="current main" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  </div>
                  {existingImages.others.map((u, i) => (
                    <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                      <img src={u} alt={`current ${i+1}`} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
                <Info style={{ marginTop: '6px' }}>Uploading new files will add to or replace images as per backend rules.</Info>
              </div>
            )}

            <Label style={{ color: '#dc2626', fontWeight: '600' }}>
              Main Image * (Required)
            </Label>
            <div style={{ 
              border: '2px dashed #d1d5db', 
              borderRadius: '8px', 
              padding: '2rem', 
              textAlign: 'center',
              background: imageFiles.image_file ? '#f0f9ff' : '#f9fafb',
              transition: 'all 0.2s ease'
            }}>
              {imageFiles.image_file ? (
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                    {imageFiles.image_file.name}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
                    {(imageFiles.image_file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <Button 
                    data-variant="secondary" 
                    onClick={() => removeImage('image_file')}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📁</div>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                    Drop your main image here
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
                    or click to browse files
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange('image_file', e.target.files[0])}
                    style={{ display: 'none' }}
                    id="main-image-upload"
                  />
                  <label 
                    htmlFor="main-image-upload" 
                    style={{ 
                      cursor: 'pointer',
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      background: '#7c3aed',
                      color: 'white',
                      border: '1px solid #7c3aed',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#6d28d9';
                      e.target.style.borderColor = '#6d28d9';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#7c3aed';
                      e.target.style.borderColor = '#7c3aed';
                    }}
                  >
                    Choose Image
                  </label>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1rem' }}>
              <Label style={{ color: '#6b7280', fontWeight: '600' }}>
                Additional Images (Optional)
              </Label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginTop: '0.5rem'
              }}>
                {[1, 2, 3, 4, 5].map((num) => {
                  const field = `image_file_${num}`;
                  const file = imageFiles[field];
                  
                  return (
                    <div key={num} style={{ 
                      border: '2px dashed #d1d5db', 
                      borderRadius: '8px', 
                      padding: '1.5rem', 
                      textAlign: 'center',
                      background: file ? '#f0f9ff' : '#f9fafb',
                      transition: 'all 0.2s ease',
                      minHeight: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      {file ? (
                        <div>
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                          <Button 
                            data-variant="secondary" 
                            onClick={() => removeImage(field)}
                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>➕</div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                            Add Image {num}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(field, e.target.files[0])}
                            style={{ display: 'none' }}
                            id={`image-upload-${num}`}
                          />
                          <label 
                            htmlFor={`image-upload-${num}`} 
                            style={{ 
                              cursor: 'pointer',
                              display: 'inline-block',
                              padding: '0.25rem 0.75rem',
                              background: '#f3f4f6',
                              color: '#374151',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontWeight: '600',
                              fontSize: '0.8rem',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = '#e5e7eb';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = '#f3f4f6';
                            }}
                          >
                            Choose
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FormGroup>
        )}
      </Grid>

      <Row>
        <Button 
          type="button"
          data-variant="secondary"
          onClick={() => {
            if (currentStep === 0) {
              const params = new URLSearchParams(location.search);
              params.delete("add");
              params.delete("edit");
              params.delete("step");
              navigate({ pathname: location.pathname, search: params.toString() });
              if (onCancel) onCancel();
            } else {
              setStepAndSync(currentStep - 1);
            }
          }}
        >
          {currentStep === 0 ? "Cancel" : "Back"}
        </Button>
        
        {currentStep === 0 ? (
          <Button 
            type="button" 
            data-variant="primary" 
            onClick={isEditing ? handleUpdate : handleSubmit} 
            disabled={saving || !canSubmit}
          >
            {isEditing ? (saving ? "Saving…" : "Save Changes") : (saving ? "Creating Hall…" : "Create Hall")}
          </Button>
        ) : (
          <Button 
            type="button" 
            data-variant="primary"
            onClick={handleImageUpload} 
            disabled={saving || !imageFiles.image_file}
          >
            {saving ? "Uploading Images…" : "Upload Images & Complete"}
          </Button>
        )}

        {currentStep === 0 && (
          <Button 
            type="button"
            data-variant="secondary"
            onClick={() => setStepAndSync(1)}
          >
            Next
          </Button>
        )}
      </Row>
    </Card>
  );
}
