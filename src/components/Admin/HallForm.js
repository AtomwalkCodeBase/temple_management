import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { getServiceTypeList, processTempleServiceData, processTempleServiceImages, getTempleServicesList, getPriceTypeList, getPricingRuleList } from "../../services/templeServices";
import { gettemplist } from "../../services/productServices";
import { getStoredTempleId } from "../../services/authServices";

const Container = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-width: 760px;
  margin: 0 auto;
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  height: 72vh;
  max-height: 84vh;

  @media (max-width: 768px) {
    height: 86vh;
    max-height: 92vh;
  }
`;

const Header = styled.div`
  padding: 16px 24px 14px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
`;

const Content = styled.div`
  padding: 12px 24px 16px;
  flex: 1 1 auto;
  overflow-y: ${props => props.scroll ? 'auto' : 'hidden'};
`;

const Footer = styled.div`
  padding: 12px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h2`
  color: #1d1d1f;
  margin: 0 0 6px 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const TempleInfo = styled.div`
  background: linear-gradient(135deg, #007aff, #5856d6);
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  color: #1d1d1f;
  font-size: 14px;
  font-weight: 600;
  
  &.required::after {
    content: " *";
    color: #ff3b30;
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e5e5e7;
  border-radius: 10px;
  font-size: 15px;
  background: #ffffff;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.15);
  }
  
  &::placeholder {
    color: #86868b;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e5e5e7;
  border-radius: 10px;
  font-size: 15px;
  background: #ffffff;
  min-height: 64px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.15);
  }
  
  &::placeholder {
    color: #86868b;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
  
  @media (max-width: 968px) {
    grid-template-columns: 2fr 1fr 1fr;
    
    .image-slot:nth-child(n+4) {
      grid-column: span 1;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    
    .image-slot:first-child {
      grid-column: span 2;
    }
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSlot = styled.div`
  position: relative;
  background: ${props => props.hasFile ? 'linear-gradient(135deg, #e8f5e8, #f0fff0)' : '#f8f9fa'};
  border: 2px dashed ${props => props.hasFile ? '#34c759' : '#d1d1d6'};
  border-radius: 12px;
  aspect-ratio: ${props => props.isPrimary ? '4/3' : '1/1'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  min-height: ${props => props.isPrimary ? '140px' : '100px'};
  
  &:hover {
    border-color: ${props => props.hasFile ? '#30d158' : '#007aff'};
    background: ${props => props.hasFile ? 'linear-gradient(135deg, #d4f8d4, #e8ffe8)' : '#f0f8ff'};
    transform: translateY(-1px);
  }
`;

const ImagePreview = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageContent = styled.div`
  text-align: center;
  padding: 16px;
  z-index: 1;
`;

const ImageIcon = styled.div`
  font-size: ${props => props.isPrimary ? '28px' : '20px'};
  margin-bottom: 8px;
`;

const ImageText = styled.div`
  color: ${props => props.hasFile ? '#1d6f42' : '#86868b'};
  font-size: ${props => props.isPrimary ? '13px' : '11px'};
  font-weight: 500;
  margin-bottom: 4px;
  text-align: center;
  line-height: 1.2;
`;

const ImageSubtext = styled.div`
  color: #86868b;
  font-size: ${props => props.isPrimary ? '11px' : '10px'};
  text-align: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 59, 48, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  z-index: 2;
  transition: background 0.2s ease;
  
  &:hover {
    background: #ff3b30;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
  
  &.primary {
    background: #007aff;
    color: white;
    
    &:hover:not(:disabled) {
      background: #0056cc;
      transform: translateY(-1px);
    }
    
    &:disabled {
      background: #d1d1d6;
      cursor: not-allowed;
      transform: none;
    }
  }
  
  &.secondary {
    background: #f2f2f7;
    color: #007aff;
    
    &:hover {
      background: #e5e5ea;
    }
  }
`;

const Alert = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  
  &.error {
    background: #ffebee;
    color: #d32f2f;
    border: 1px solid #ffcdd2;
  }
  
  &.success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
  }
`;

const Info = styled.div`
  color: #86868b;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 20px;
`;

const HiddenInput = styled.input`
  display: none;
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

export default function HallForm({ onCancel, onSuccess, onInlineUpdate, editService }) {
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
    service_type: "Hall",
    description: "",
    capacity: "",
    duration_minutes: "0"
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

  // Prevent background page from scrolling while modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarCompensation = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarCompensation > 0) {
      document.body.style.paddingRight = `${scrollbarCompensation}px`;
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

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
        
        // Prefer logged-in/stored temple first, then fall back to first in list
        let actualTempleId = getStoredTempleId() || "";
        if (!actualTempleId && templeList?.data && Array.isArray(templeList.data)) {
          const firstTemple = templeList.data[0];
          actualTempleId = firstTemple?.temple_id || firstTemple?.id || "";
        }
        
        setTempleId(actualTempleId);
        setFormData((prev) => ({ ...prev, service_type: "Hall", duration_minutes: "0" }));

        const params = new URLSearchParams(location.search);
        const editId = params.get("edit");
        
        // Prefill when editing via prop or URL param
        if (editService || editId) {
          setIsEditing(true);
          try {
            let svc = editService;
            if (!svc) {
              const servicesResp = await getTempleServicesList();
              const list = Array.isArray(servicesResp)
                ? servicesResp
                : (Array.isArray(servicesResp?.data)
                    ? servicesResp.data
                    : (Array.isArray(servicesResp?.results)
                        ? servicesResp.results
                        : []));
              svc = list
                .filter(s => String(s?.temple_id) === String(actualTempleId))
                .find(s => (s.service_id || s.id) === editId);
            }
            if (svc) {
              setServiceId(svc.service_id || editId);
              setFormData(prev => ({
                ...prev,
                name: svc.name || "",
                description: svc.description || "",
                capacity: svc.capacity != null ? String(svc.capacity) : "",
                duration_minutes: svc.duration_minutes != null ? String(svc.duration_minutes) : "0",
                service_type: "Hall"
              }));
              const imgs = extractImageUrls(svc);
              setExistingImages({ main: imgs[0] || "", others: imgs.slice(1, 6) });
              
              setCurrentStep(0);
            }
          } catch (e) {
            // ignore and proceed as add
          }
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
  };

  const canSubmit = Boolean(formData.name && formData.capacity);

  const handleImageChange = (field, file) => {
    if (file) {
      setImageFiles(prev => ({ ...prev, [field]: file }));
    }
  };

  const removeImage = (field) => {
    setImageFiles(prev => ({ ...prev, [field]: null }));
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
    
    if (!formData.name || !formData.capacity) {
      setError("Please fill in all required fields: Hall Name and Capacity");
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
        base_price: 0,
        capacity: toNum(formData.capacity),
        duration_minutes: 0,
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
        base_price: 0,
        capacity: toNum(formData.capacity),
        duration_minutes: 0,
        service_variation_list: []
      };
      await processTempleServiceData(payload);
      setSuccess("Hall details updated.");
      // Refresh parent list without closing and advance to image upload
      try {
        if (onInlineUpdate && serviceId) {
          onInlineUpdate(serviceId);
        }
      } catch {}
      setStepAndSync(1);
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

  const renderImageSlot = (field, index, isPrimary = false) => {
    const file = imageFiles[field];
    const inputId = `image-${field}`;
    
    return (
      <ImageSlot
        key={field}
        hasFile={!!file}
        isPrimary={isPrimary}
        className={`image-slot ${isPrimary ? 'primary' : 'secondary'}`}
        onClick={() => !file && document.getElementById(inputId).click()}
      >
        <HiddenInput
          id={inputId}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(field, e.target.files[0])}
        />
        
        {file && (
          <>
            <ImagePreview>
              <img src={URL.createObjectURL(file)} alt="Preview" />
            </ImagePreview>
            <RemoveButton onClick={(e) => {
              e.stopPropagation();
              removeImage(field);
            }}>
              ×
            </RemoveButton>
          </>
        )}
        
        <ImageContent>
          <ImageIcon isPrimary={isPrimary}>
            {file ? '✓' : (isPrimary ? '📸' : '➕')}
          </ImageIcon>
          <ImageText hasFile={!!file} isPrimary={isPrimary}>
            {file ? (file.name.length > (isPrimary ? 25 : 15) ? file.name.substring(0, isPrimary ? 25 : 15) + '...' : file.name) : 
             (isPrimary ? 'Main Image' : `Image ${index}`)}
          </ImageText>
          <ImageSubtext isPrimary={isPrimary}>
            {file ? `${(file.size / 1024 / 1024).toFixed(1)}MB` : 
             (isPrimary ? 'Required' : 'Optional')}
          </ImageSubtext>
        </ImageContent>
      </ImageSlot>
    );
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Loading...</Title>
        </Header>
        <Content>
          <Info>Loading hall form and temple information...</Info>
        </Content>
      </Container>
    );
  }

  if (!templeId) {
    return (
      <Container>
        <Header>
          <Title>Error</Title>
        </Header>
        <Content>
          <Alert className="error">
            No temple found. Please ensure you have access to a temple before creating halls.
          </Alert>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{isEditing ? "Edit Hall" : "Add New Hall"}</Title>
        <ProgressBar steps={steps} currentStep={currentStep} />
      </Header>

      <Content scroll={currentStep === 1}>

        {error && <Alert className="error">{error}</Alert>}
        {success && <Alert className="success">{success}</Alert>}

        {currentStep === 0 && (
          <>
            <Info>
              Create a new hall for temple bookings. Fill in the basic information below to get started.
            </Info>
            
            <Grid>
              <FormGroup>
                <Label className="required">Hall Name</Label>
                <Input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Wedding Hall, Prayer Hall..." 
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label className="required">Maximum Capacity</Label>
                <Input 
                  name="capacity" 
                  type="number" 
                  min="1" 
                  value={formData.capacity} 
                  onChange={handleChange} 
                  placeholder="e.g. 200" 
                  required
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>Description</Label>
                <TextArea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Describe the hall features and suitable event types..." 
                />
              </FormGroup>
            </Grid>
          </>
        )}

        {currentStep === 1 && (
          <>
            {isEditing && (existingImages.main || (existingImages.others || []).length > 0) && (
              <div style={{ marginBottom: '8px' }}>
                <Label>Current Photos</Label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
                  {existingImages.main && (
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e5ea', flex: '0 0 auto' }}>
                      <img src={existingImages.main} alt="current main" style={{ height: 90, width: 160, objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  {(existingImages.others || []).slice(0, 3).map((u, i) => (
                    <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e5ea', flex: '0 0 auto' }}>
                      <img src={u} alt={`current ${i+1}`} style={{ height: 90, width: 120, objectFit: 'cover', display: 'block' }} />
                    </div>
                  ))}
                  {((existingImages.others || []).length > 3) && (
                    <div style={{
                      borderRadius: '10px',
                      border: '1px dashed #e5e5ea',
                      height: 90,
                      width: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6b7280',
                      fontWeight: 600,
                      flex: '0 0 auto'
                    }}>
                      +{(existingImages.others || []).length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <ImageGrid>
              {renderImageSlot('image_file', 0, true)}
              {[1, 2, 3, 4, 5].map(num => 
                renderImageSlot(`image_file_${num}`, num, false)
              )}
            </ImageGrid>
          </>
        )}
      </Content>

      <Footer>
        <Button 
          className="secondary"
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
        
        <div style={{ display: 'flex', gap: '12px' }}>
          {currentStep === 0 && (
            <Button 
              className="secondary"
              onClick={() => setStepAndSync(1)}
            >
              Next
            </Button>
          )}
          
          <Button 
            className="primary"
            onClick={currentStep === 0 ? (isEditing ? handleUpdate : handleSubmit) : handleImageUpload} 
            disabled={saving || (currentStep === 0 ? !canSubmit : !imageFiles.image_file)}
          >
            {currentStep === 0 
              ? (isEditing ? (saving ? "Saving..." : "Save Changes") : (saving ? "Creating..." : "Create Hall"))
              : (saving ? "Uploading..." : "Complete")
            }
          </Button>
        </div>
      </Footer>
    </Container>
  );
}