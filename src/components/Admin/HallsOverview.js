import React, { useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { LayoutTemplate, Search, Eye, Users, Edit3, ChevronUp } from "lucide-react";
import PackagesPanel from "./PackagesPanel";
import AdvancePanel from "./AdvancePanel";
import RefundPanel from "./RefundPanel";
import PackageModal from "./PackageModal";
import { processTempleServiceData, getAdvancePolicyList, getRefundPolicyList } from "../../services/templeServices";



const ContentCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  
  .card-title {
    color: #0f172a;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.025em;
  }
`;

const HallGalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const GalleryControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    padding: 12px 16px 12px 44px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 14px;
    width: 320px;
    background: #f9fafb;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: #ffffff;
    }
  }
  
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }
`;

const HallGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HallCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 340px;
  ${props => props.$expanded ? `
    grid-column: 1 / -1;
    box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.2);
    transform: translateY(-2px);
  ` : ''}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.15);
  }
`;

const HallImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  flex-shrink: 0;
`;

const ImageGallery = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const MainImageSection = styled.div`
  flex: 2;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ThumbnailGrid = styled.div`
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  padding-left: 2px;
`;

const ThumbnailImage = styled.div`
  position: relative;
  overflow: hidden;
  background: #f8fafc;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const HallMainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${HallCard}:hover & {
    transform: scale(1.05);
  }
  
  &.error {
    opacity: 0.5;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.24) 100%);
`;

const ImageLoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const StatusBadgeNew = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${props => props.$active ? 'rgba(16, 185, 129, 0.9)' : 'rgba(156, 163, 175, 0.9)'};
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 3px 6px;
  font-size: 9px;
  font-weight: 600;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 50%;
    display: inline-block;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 500;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HallHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const EditHeaderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #0f172a;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const HallBody = styled.div`
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HallTitle = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HallDescription = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.3;
  height: 32px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: capitalize;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Packages button - keep current styling */
  ${props => props.$type === 'packages' ? `
    background: #E0ECFF; /* darker blue tint */
    border-color: #93C5FD;
    color: #1D4ED8; /* darker blue */
  ` : ''}
  ${props => props.$type === 'packages' && props.$active ? `
    background: #C7DAFF; /* active */
    border-color: #60A5FA;
    color: #1E40AF; /* deepest blue */
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
  ` : ''}
  
  /* Advance button - subtle blue */
  ${props => props.$type === 'advance' ? `
    background: #DCFCE7; /* darker green tint */
    border-color: #86EFAC;
    color: #047857; /* darker green */
  ` : ''}
  ${props => props.$type === 'advance' && props.$active ? `
    background: #BBF7D0; /* active */
    border-color: #4ADE80;
    color: #065F46; /* deepest green */
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  ` : ''}
  
  /* Refund button - subtle red */
  ${props => props.$type === 'refund' ? `
    background: #FEE2E2; /* darker red tint */
    border-color: #FCA5A5;
    color: #DC2626; /* darker red */
  ` : ''}
  ${props => props.$type === 'refund' && props.$active ? `
    background: #FECACA; /* active */
    border-color: #F87171;
    color: #B91C1C; /* deepest red */
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25);
  ` : ''}
  
  /* Default hover states */
  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #334155;
  }
  
  /* Type-specific hover states */
  ${props => props.$type === 'packages' && `
    &:hover {
      background: #C7DAFF;
      border-color: #60A5FA;
      color: #1E40AF;
    }
  `}
  
  ${props => props.$type === 'advance' && `
    &:hover {
      background: #BBF7D0;
      border-color: #4ADE80;
      color: #065F46;
    }
  `}
  
  ${props => props.$type === 'refund' && `
    &:hover {
      background: #FECACA;
      border-color: #F87171;
      color: #B91C1C;
    }
  `}
  
  &:active {
    background: #e2e8f0;
  }
`;

const HallFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 32px;
`;

const FeatureTag = styled.span`
  background: #f1f5f9;
  color: #334155;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HallActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid #eef2f7;
  background: #ffffff;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  z-index: 2;
  box-shadow: 0 -3px 8px rgba(15, 23, 42, 0.04);
  gap: 8px;
`;



// Collapse button uses IconButton base. Keep base defined first (see below)

const ExpandedContent = styled.div`
  overflow: visible;
  max-height: ${props => props.$expanded ? 'none' : '0'};
  opacity: ${props => props.$expanded ? 1 : 0};
  transform: translateY(${props => props.$expanded ? '0' : '-4px'});
  transition: ${props => props.$expanded ? 'opacity 0.2s ease, transform 0.25s ease' : 'max-height 0.35s ease, opacity 0.2s ease, transform 0.25s ease'};
  border-top: 1px solid #eef2f7;
  background: #ffffff;
  padding: 0;
`;

const ExpandedInner = styled.div`
  padding: 8px 8px 12px 8px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;



const IconButton = styled.button`
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8fafc;
    color: #374151;
    border-color: #d1d5db;
  }
`;

const CollapseButton = styled(IconButton)`
  margin-left: 8px;
  width: 36px;
  height: 36px;
  border-color: #cbd5e1;
  background: #f8fafc;
  color: #0f172a;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
`;



// Helpers scoped to Overview
const extractImageUrls = (hall) => {
  const urls = [];
  
  // Helper function to add valid image URLs
  const pushIfUrl = (val) => {
    if (typeof val === 'string' && val && /^(https?:)?\/\//.test(val)) {
      urls.push(val);
    }
  };
  
  // Primary image field
  pushIfUrl(hall?.image);
  
  // Sequential image fields (image_1, image_2, image_3, etc.)
  for (let i = 1; i <= 10; i++) {
    const imageKey = `image_${i}`;
    if (hall?.[imageKey]) {
      pushIfUrl(hall[imageKey]);
    }
  }
  
  // Fallback fields (for backward compatibility)
  pushIfUrl(hall?.image_url);
  pushIfUrl(hall?.main_image);
  
  // Check for any other image-related fields
  Object.entries(hall || {}).forEach(([k, v]) => {
    if (typeof v === 'string' && /(image|img)/i.test(k) && /^(https?:)?\/\//.test(v)) {
      // Avoid duplicates
      if (!urls.includes(v)) {
        urls.push(v);
      }
    }
  });
  
  // Check for image arrays
  const candidates = [hall?.image_list, hall?.images, hall?.photos, hall?.gallery];
  candidates.forEach((arr) => {
    if (Array.isArray(arr)) {
      arr.forEach(pushIfUrl);
    }
  });
  
  // Check additional field list
  const afl = hall?.additional_field_list;
  if (afl) {
    Object.values(afl).forEach((val) => {
      if (Array.isArray(val)) {
        val.forEach(pushIfUrl);
      } else if (typeof val === 'string') {
        pushIfUrl(val);
      }
    });
  }
  
  // Remove duplicates and return
  return [...new Set(urls)];
};

// Helper function to clean package data for API
const cleanPackageForAPI = (pkg, fallbackPricingRuleId) => {
  const resolvedPricingRuleId = pkg.pricing_rule_id
    ?? pkg.pricing_rule_data?.id
    ?? fallbackPricingRuleId
    ?? 1;
  return {
    id: pkg.id ?? null,
    price_type: pkg.price_type,
    base_price: typeof pkg.base_price === 'string' ? parseFloat(pkg.base_price) : pkg.base_price,
    pricing_rule_id: resolvedPricingRuleId,
    start_time: pkg.start_time,
    end_time: pkg.end_time,
    no_hours: pkg.no_hours ?? null,
    max_no_per_day: typeof pkg.max_no_per_day === 'string' ? parseInt(pkg.max_no_per_day) : pkg.max_no_per_day,
    max_participant: typeof pkg.max_participant === 'string' ? parseInt(pkg.max_participant) : pkg.max_participant
  };
};

const getPlaceholderImage = () => {
  return 'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.1"/>
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.2"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg)"/>
          <circle cx="400" cy="180" r="60" fill="#e2e8f0"/>
          <path d="M370 160 L430 160 L430 200 L370 200 Z" fill="#94a3b8"/>
          <circle cx="385" cy="175" r="8" fill="#64748b"/>
          <text x="400" y="280" text-anchor="middle" font-family="system-ui" font-size="18" fill="#64748b">Sacred Hall</text>
        </svg>`
    );
};

const HallsOverview = ({
  hallStats,
  hallServices,
  hallServicesLoading,
  searchQuery,
  onSearchChange,
  onEditHall
}) => {
  const [expandedHallId, setExpandedHallId] = useState(null);
  const [expandedTab, setExpandedTab] = useState(null);
  const gridRef = useRef(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [advancePolicies, setAdvancePolicies] = useState([]);
  const [advLoading, setAdvLoading] = useState(false);
  const [selectedAdvPolicyId, setSelectedAdvPolicyId] = useState(null);
  const [refundPolicies, setRefundPolicies] = useState([]);
  const [refundLoading, setRefundLoading] = useState(false);
  const [selectedRefundPolicyId, setSelectedRefundPolicyId] = useState(null);
  const [isSavingPackage, setIsSavingPackage] = useState(false);
  const lastPackageSubmitRef = useRef({ key: null, at: 0 });
  const [imageLoadStates, setImageLoadStates] = useState({});

  const dedupePackages = (packages) => {
    const seen = new Set();
    const result = [];
    for (const pkg of packages) {
      const key = pkg.id != null
        ? `id:${pkg.id}`
        : `new:${pkg.price_type}|${pkg.start_time}|${pkg.end_time}|${pkg.no_hours ?? ''}|${pkg.max_no_per_day}|${pkg.max_participant}|${pkg.base_price}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(pkg);
      }
    }
    return result;
  };

  // Handle image loading states
  const handleImageLoad = (hallId, imageIndex) => {
    setImageLoadStates(prev => ({
      ...prev,
      [`${hallId}-${imageIndex}`]: 'loaded'
    }));
  };

  const handleImageError = (hallId, imageIndex) => {
    setImageLoadStates(prev => ({
      ...prev,
      [`${hallId}-${imageIndex}`]: 'error'
    }));
  };

  // Fetch advance policies when the Advance tab is opened for a hall
  useEffect(() => {
    if (expandedHallId && expandedTab === 'advance') {
      const fetchPolicies = async () => {
        try {
          setAdvLoading(true);
          const data = await getAdvancePolicyList();
          const listRaw = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
          // Determine active temple id from the expanded hall
          const hallFromList = hallServices.find(h => h.service_id === expandedHallId);
          const hallCandidate = hallFromList || selectedHall;
          const templeId = hallCandidate?.temple_id;
          // Filter policies to only the current temple (if id is present)
          const filtered = listRaw.filter(service => !templeId || String(service.temple_id) === String(templeId));
          const list = filtered.map(p => ({ ...p, id: p?.id != null ? Number(p.id) : p.id }));
          setAdvancePolicies(list);
          // Preselect: current hall policy or default policy
          const currentIdRaw = hallCandidate?.adv_policy_data?.id ?? hallCandidate?.adv_policy_id ?? null;
          const currentId = currentIdRaw != null ? Number(currentIdRaw) : null;
          const defaultPolicy = list.find(p => p.is_default);
          setSelectedAdvPolicyId(currentId ?? (defaultPolicy ? Number(defaultPolicy.id) : null));
        } catch (e) {
          // silent fail for now
        } finally {
          setAdvLoading(false);
        }
      };
      fetchPolicies();
    }
  }, [expandedHallId, expandedTab, hallServices, selectedHall]);

  // Fetch refund policies (active only) when the Refund tab is opened for a hall
  useEffect(() => {
    if (expandedHallId && expandedTab === 'refund') {
      const fetchRefunds = async () => {
        try {
          setRefundLoading(true);
          const data = await getRefundPolicyList();
          const raw = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
          const hallFromList = hallServices.find(h => h.service_id === expandedHallId);
          const hallCandidate = hallFromList || selectedHall;
          const templeId = hallCandidate?.temple_id;
          const byTemple = raw.filter(service => !templeId || String(service.temple_id) === String(templeId));
          const activeOnly = byTemple.filter(p => p?.is_active);
          const list = activeOnly.map(p => ({ ...p, id: p?.id != null ? Number(p.id) : p.id }));
          setRefundPolicies(list);
          // Preselect: current hall policy or default policy
          const currentIdRaw = hallCandidate?.refund_policy_data?.id ?? hallCandidate?.refund_policy_id ?? null;
          const currentId = currentIdRaw != null ? Number(currentIdRaw) : null;
          const defaultPolicy = list.find(p => p.is_default);
          setSelectedRefundPolicyId(currentId ?? (defaultPolicy ? Number(defaultPolicy.id) : null));
        } catch (e) {
        } finally {
          setRefundLoading(false);
        }
      };
      fetchRefunds();
    }
  }, [expandedHallId, expandedTab, hallServices, selectedHall]);

  const handleSaveAdvancePolicy = useCallback(async (policyId) => {
    const selectedPolicyId = policyId || selectedAdvPolicyId;
    if (!expandedHallId || !selectedPolicyId) return;
    const hall = hallServices.find(h => h.service_id === expandedHallId) || selectedHall;
    if (!hall) return;

    try {
      const serviceData = {
        call_mode: "UPDATE",
        temple_id: hall.temple_id,
        service_id: hall.service_id,
        name: hall.name,
        service_type: hall.service_type,
        description: hall.description || "",
        adv_policy_id: selectedPolicyId,
        refund_policy_id: hall.refund_policy_id ?? hall.refund_policy_data?.id ?? 1,
        base_price: typeof hall.base_price === 'string' ? parseFloat(hall.base_price) : hall.base_price,
        capacity: typeof hall.capacity === 'string' ? parseInt(hall.capacity) : hall.capacity,
        duration_minutes: typeof hall.duration_minutes === 'string' ? parseInt(hall.duration_minutes) : hall.duration_minutes,
        pricing_rule_id: hall.pricing_rule_id ?? 1,
        service_variation_list: (hall.service_variation_list || []).map(pkg => cleanPackageForAPI(pkg, hall.pricing_rule_id))
      };

      const response = await processTempleServiceData(serviceData);

      const chosenPolicy = advancePolicies.find(p => Number(p.id) === Number(selectedPolicyId)) || null;

      const updatedHall = {
        ...hall,
        adv_policy_id: selectedPolicyId,
        adv_policy_data: response?.service_data?.adv_policy_data || chosenPolicy || hall.adv_policy_data,
        _inlineUpdate: true
      };

      // Sync local selection explicitly
      setSelectedAdvPolicyId(Number(selectedPolicyId));

      setSuccessMessage("Advance policy saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      if (onEditHall) onEditHall(updatedHall);
      if (selectedHall?.service_id === hall.service_id) setSelectedHall(updatedHall);
    } catch (e) {
      // could show error message
    }
  }, [expandedHallId, selectedAdvPolicyId, hallServices, onEditHall, selectedHall, advancePolicies]);

  const handleSaveRefundPolicy = useCallback(async (policyId) => {
    const selectedPolicyId = policyId || selectedRefundPolicyId;
    if (!expandedHallId || !selectedPolicyId) return;
    const hall = hallServices.find(h => h.service_id === expandedHallId) || selectedHall;
    if (!hall) return;

    try {
      const serviceData = {
        call_mode: "UPDATE",
        temple_id: hall.temple_id,
        service_id: hall.service_id,
        name: hall.name,
        service_type: hall.service_type,
        description: hall.description || "",
        adv_policy_id: hall.adv_policy_id ?? hall.adv_policy_data?.id ?? 1,
        refund_policy_id: selectedPolicyId,
        base_price: typeof hall.base_price === 'string' ? parseFloat(hall.base_price) : hall.base_price,
        capacity: typeof hall.capacity === 'string' ? parseInt(hall.capacity) : hall.capacity,
        duration_minutes: typeof hall.duration_minutes === 'string' ? parseInt(hall.duration_minutes) : hall.duration_minutes,
        pricing_rule_id: hall.pricing_rule_id ?? 1,
        service_variation_list: (hall.service_variation_list || []).map(pkg => cleanPackageForAPI(pkg, hall.pricing_rule_id))
      };

      const response = await processTempleServiceData(serviceData);

      const chosenPolicy = refundPolicies.find(p => Number(p.id) === Number(selectedPolicyId)) || null;
      const updatedHall = {
        ...hall,
        refund_policy_id: selectedPolicyId,
        refund_policy_data: response?.service_data?.refund_policy_data || chosenPolicy || hall.refund_policy_data,
        _inlineUpdate: true
      };

      // sync id locally
      setSelectedRefundPolicyId(Number(selectedPolicyId));

      setSuccessMessage("Refund policy saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      if (onEditHall) onEditHall(updatedHall);
      if (selectedHall?.service_id === hall.service_id) setSelectedHall(updatedHall);
    } catch (e) {
    }
  }, [expandedHallId, selectedRefundPolicyId, hallServices, onEditHall, selectedHall, refundPolicies]);



  const handleExpand = (hallId, tab) => {
    if (expandedHallId === hallId && expandedTab === tab) {
      setExpandedHallId(null);
      setExpandedTab(null);
    } else {
      // reset any inline package editor when switching cards/tabs
      setIsEditingPackage(false);
      setEditingPackageId(null);
      setExpandedHallId(hallId);
      setExpandedTab(tab);
      const hallObj = hallServices.find(h => h.service_id === hallId);
      if (hallObj) setSelectedHall(hallObj);
      // Compute the vertical offset of the clicked card row to place an overlay
      try {
        const grid = gridRef.current;
        const cardEl = grid?.querySelector(`[data-hall-id="${hallId}"]`);
        if (grid && cardEl) {
          const cardRect = cardEl.getBoundingClientRect();
          // Scroll into view nicely on small screens
          const y = window.scrollY + cardRect.top - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } catch {}
    }
  };

  // Inline package editor state and helpers (used for modal as well)
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);

  const openAddPackage = (hall) => {
    setSelectedHall(hall);
    setIsEditingPackage(true);
    setEditingPackageId(null);
    setPackageModalOpen(true);
  };

  const openEditPackage = (hall, pkg) => {
    setSelectedHall(hall);
    setIsEditingPackage(true);
    setEditingPackageId(pkg?.id ?? null);
    setPackageModalOpen(true);
  };



  const handlePackageSave = useCallback(async (packageData) => {
    if (!selectedHall || isSavingPackage) return;

    // Idempotency key per new/update payload
    const key = packageData.id != null
      ? `upd:${packageData.id}`
      : `add:${packageData.price_type}|${packageData.start_time}|${packageData.end_time}|${packageData.no_hours ?? ''}|${packageData.max_no_per_day}|${packageData.max_participant}|${packageData.base_price}`;
    const now = Date.now();
    if (lastPackageSubmitRef.current.key === key && now - lastPackageSubmitRef.current.at < 1500) {
      return; // ignore duplicate rapid submissions
    }
    lastPackageSubmitRef.current = { key, at: now };
    
    try {
      setIsSavingPackage(true);
      const currentPackages = selectedHall.service_variation_list || [];
      let updatedPackages;
      
      if (packageData.id) {
        // Update existing package - preserve existing fields and update with new data
        updatedPackages = currentPackages.map(pkg => {
          if (pkg.id === packageData.id) {
            return {
              ...pkg, // Keep existing fields like pricing_type_str, pricing_rule_data
              ...packageData, // Update with new data
              id: pkg.id // Ensure ID is preserved
            };
          }
          return pkg;
        });
      } else {
        // Add new package - ensure it has the correct structure
        const newPackage = {
          id: null, // Will be assigned by the API
          price_type: packageData.price_type,
          base_price: packageData.base_price,
          pricing_rule_id: packageData.pricing_rule_id,
          start_time: packageData.start_time,
          end_time: packageData.end_time,
          no_hours: packageData.no_hours,
          max_no_per_day: packageData.max_no_per_day,
          max_participant: packageData.max_participant,
          temple_id: selectedHall.temple_id
        };
        updatedPackages = [...currentPackages, newPackage];
      }
      
      // De-duplicate potential duplicate entries
      updatedPackages = dedupePackages(updatedPackages);
      
      // Clean packages for API - remove extra fields that API doesn't expect and ensure numeric types
      const cleanedPackages = updatedPackages.map(pkg => cleanPackageForAPI(pkg, selectedHall.pricing_rule_id));
      
      // Prepare the service data for API call
      const serviceData = {
        call_mode: "UPDATE",
        temple_id: selectedHall.temple_id,
        service_id: selectedHall.service_id,
        name: selectedHall.name,
        service_type: selectedHall.service_type,
        description: selectedHall.description || "",
        adv_policy_id: selectedHall.adv_policy_id ?? 1,
        refund_policy_id: selectedHall.refund_policy_id ?? 1,
        base_price: typeof selectedHall.base_price === 'string' ? parseFloat(selectedHall.base_price) : selectedHall.base_price,
        capacity: typeof selectedHall.capacity === 'string' ? parseInt(selectedHall.capacity) : selectedHall.capacity,
        duration_minutes: typeof selectedHall.duration_minutes === 'string' ? parseInt(selectedHall.duration_minutes) : selectedHall.duration_minutes,
        pricing_rule_id: selectedHall.pricing_rule_id ?? 1,
        service_variation_list: cleanedPackages
      };
      
      // Call the API to update the hall with new packages
      const response = await processTempleServiceData(serviceData);
      
      // Update the local state with the response data to get the updated packages with IDs
      const updatedHall = {
        ...selectedHall,
        service_variation_list: response?.service_data?.service_variation_list || updatedPackages,
        _inlineUpdate: true
      };
      
      // Update the selectedHall state immediately for UI feedback
      setSelectedHall(updatedHall);
      
      // Show success message
      setSuccessMessage("Package saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Close modal/editor
      setPackageModalOpen(false);
      
      // Update the hall in the parent component's state
      if (onEditHall) {
        onEditHall(updatedHall);
      }
      
    } catch (error) {
      console.error("Error saving package:", error);
      throw error;
    } finally {
      setIsSavingPackage(false);
    }
  }, [selectedHall, onEditHall, isSavingPackage]);

  const handlePackageDelete = useCallback(async (packageId) => {
    if (!selectedHall) return;
    
    try {
      const currentPackages = selectedHall.service_variation_list || [];
      const updatedPackages = currentPackages.filter(pkg => pkg.id !== packageId);
      
      // Clean packages for API - remove extra fields that API doesn't expect and ensure numeric types
      const cleanedPackages = updatedPackages.map(pkg => cleanPackageForAPI(pkg, selectedHall.pricing_rule_id));
      
      // Prepare the service data for API call
      const serviceData = {
        call_mode: "UPDATE",
        temple_id: selectedHall.temple_id,
        service_id: selectedHall.service_id,
        name: selectedHall.name,
        service_type: selectedHall.service_type,
        description: selectedHall.description || "",
        adv_policy_id: selectedHall.adv_policy_id ?? 1,
        refund_policy_id: selectedHall.refund_policy_id ?? 1,
        base_price: typeof selectedHall.base_price === 'string' ? parseFloat(selectedHall.base_price) : selectedHall.base_price,
        capacity: typeof selectedHall.capacity === 'string' ? parseInt(selectedHall.capacity) : selectedHall.capacity,
        duration_minutes: typeof selectedHall.duration_minutes === 'string' ? parseInt(selectedHall.duration_minutes) : selectedHall.duration_minutes,
        pricing_rule_id: selectedHall.pricing_rule_id ?? 1,
        service_variation_list: cleanedPackages
      };
      
      // Call the API to update the hall with removed package
      const response = await processTempleServiceData(serviceData);
      
      // Update the local state with the response data
      const updatedHall = {
        ...selectedHall,
        service_variation_list: response?.service_data?.service_variation_list || updatedPackages
      };
      
      // Update the selectedHall state immediately for UI feedback
      setSelectedHall(updatedHall);
      
      // Show success message
      setSuccessMessage("Package deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Update the hall in the parent component's state
      if (onEditHall) {
        onEditHall(updatedHall);
      }
      
    } catch (error) {
      console.error("Error deleting package:", error);
      throw error;
    }
  }, [selectedHall, onEditHall]);

  return (
    <>


      <ContentCard>
        <HallGalleryHeader>
          <div className="card-title">Hall Gallery</div>
          <GalleryControls>
            <SearchInput>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search halls..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </SearchInput>
          </GalleryControls>
        </HallGalleryHeader>

        {hallServicesLoading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
            <LayoutTemplate size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <div style={{ fontSize: '16px', fontWeight: '500' }}>Loading hall gallery...</div>
          </div>
        ) : (
          <HallGrid ref={gridRef}>
            {hallServices
              .filter(h => (h.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()))
              .map((hall) => {
                const imageUrls = extractImageUrls(hall);
                const hasImages = imageUrls.length > 0;
                const mainImage = hasImages ? imageUrls[0] : getPlaceholderImage();
                const imageCount = imageUrls.length;
                const isExpanded = expandedHallId === hall.service_id;
                return (
                  <HallCard key={hall.service_id} $expanded={isExpanded} data-hall-id={hall.service_id}>
                    <HallImageContainer>
                      <ImageGallery>
                        <MainImageSection>
                          <HallMainImage 
                            src={mainImage} 
                            alt={hall.name}
                            onLoad={() => handleImageLoad(hall.service_id, 0)}
                            onError={(e) => {
                              e.target.src = getPlaceholderImage();
                              e.target.classList.add('error');
                              handleImageError(hall.service_id, 0);
                            }}
                          />
                          {imageLoadStates[`${hall.service_id}-0`] !== 'loaded' && 
                           imageLoadStates[`${hall.service_id}-0`] !== 'error' && (
                            <ImageLoadingIndicator />
                          )}
                          <ImageOverlay />
                        </MainImageSection>
                        <ThumbnailGrid>
                            {/* Show additional images if available, otherwise show main image repeated */}
                            {imageUrls.length > 1 ? (
                              imageUrls.slice(1, 3).map((url, index) => (
                                <ThumbnailImage key={index}>
                                  <img 
                                    src={url} 
                                    alt={`${hall.name} view ${index + 2}`}
                                    onLoad={() => handleImageLoad(hall.service_id, index + 1)}
                                    onError={(e) => {
                                      e.target.src = getPlaceholderImage();
                                      handleImageError(hall.service_id, index + 1);
                                    }}
                                  />
                                </ThumbnailImage>
                              ))
                            ) : (
                              // If only one image, show it in thumbnails too
                              Array.from({ length: 2 }).map((_, index) => (
                                <ThumbnailImage key={`main-${index}`}>
                                  <img 
                                    src={mainImage} 
                                    alt={`${hall.name} view ${index + 2}`}
                                    onLoad={() => handleImageLoad(hall.service_id, `main-${index}`)}
                                    onError={(e) => {
                                      e.target.src = getPlaceholderImage();
                                      handleImageError(hall.service_id, `main-${index}`);
                                    }}
                                  />
                                </ThumbnailImage>
                              ))
                            )}
                            {/* Fill remaining thumbnail slots with placeholder if needed */}
                            {Array.from({ length: Math.max(0, 3 - Math.min(imageUrls.length, 3)) }).map((_, index) => (
                              <ThumbnailImage key={`placeholder-${index}`}>
                                <img 
                                  src={getPlaceholderImage()} 
                                  alt="placeholder"
                                  onLoad={() => handleImageLoad(hall.service_id, `placeholder-${index}`)}
                                  onError={(e) => {
                                    // If even placeholder fails, show a simple colored div
                                    e.target.style.display = 'none';
                                    e.target.parentElement.style.background = '#e2e8f0';
                                    handleImageError(hall.service_id, `placeholder-${index}`);
                                  }}
                                />
                              </ThumbnailImage>
                            ))}
                          </ThumbnailGrid>
                      </ImageGallery>
                      <StatusBadgeNew $active={hall.is_active}>
                        <div style={{ width: 8, height: 8, background: hall.is_active ? '#ffffff' : '#e5e7eb', borderRadius: '50%' }} />
                        {hall.is_active ? 'Active' : 'Inactive'}
                      </StatusBadgeNew>
                      {imageCount > 0 && (
                        <ImageCounter>
                          <Eye size={12} />
                          {imageCount} photo{imageCount !== 1 ? 's' : ''}
                        </ImageCounter>
                      )}
                    </HallImageContainer>

                    <HallBody>
                      <HallHeaderRow>
                        <HallTitle>{hall.name}</HallTitle>
                        <EditHeaderButton onClick={() => onEditHall?.(hall)} title="Edit hall">
                          <Edit3 size={14} /> Edit
                        </EditHeaderButton>
                      </HallHeaderRow>
                      <HallDescription>
                        {hall.description || 'Premium sacred hall for ceremonies and gatherings'}
                      </HallDescription>

                      <HallFeatures>
                        <FeatureTag>
                          <Users size={10} />
                          Capacity: {hall.capacity || '—'}
                        </FeatureTag>
                      </HallFeatures>

                      <ButtonRow>
                        <ActionButton 
                          $type="packages"
                          onClick={() => handleExpand(hall.service_id, 'packages')}
                          $active={isExpanded && expandedTab === 'packages'}
                        >Packages</ActionButton>
                        <ActionButton 
                          $type="advance"
                          onClick={() => handleExpand(hall.service_id, 'advance')}
                          $active={isExpanded && expandedTab === 'advance'}
                        >Advance</ActionButton>
                        <ActionButton 
                          $type="refund"
                          onClick={() => handleExpand(hall.service_id, 'refund')}
                          $active={isExpanded && expandedTab === 'refund'}
                        >Refund</ActionButton>
                      </ButtonRow>
                    </HallBody>

                    <ExpandedContent $expanded={isExpanded}>
                      <ExpandedInner>
                        {expandedTab === 'packages' && (
                          <PackagesPanel
                            hall={hall}
                            selectedHall={selectedHall}
                            successMessage={successMessage}
                            onAdd={openAddPackage}
                            onEdit={openEditPackage}
                            onDelete={(h, id) => { setSelectedHall(h); handlePackageDelete(id); }}
                          />
                        )}
                        {expandedTab === 'advance' && (
                          <AdvancePanel
                            hall={hall}
                            advancePolicies={advancePolicies}
                            selectedAdvPolicyId={selectedAdvPolicyId}
                            onSelect={setSelectedAdvPolicyId}
                            onSave={handleSaveAdvancePolicy}
                            successMessage={successMessage}
                            loading={advLoading}
                          />
                        )}
                        {expandedTab === 'refund' && (
                          <RefundPanel
                            hall={hall}
                            refundPolicies={refundPolicies}
                            selectedRefundPolicyId={selectedRefundPolicyId}
                            onSelect={setSelectedRefundPolicyId}
                            onSave={handleSaveRefundPolicy}
                            successMessage={successMessage}
                            loading={refundLoading}
                          />
                        )}
                      </ExpandedInner>
                    </ExpandedContent>

                    <HallActions>
                      {isExpanded && (
                        <CollapseButton 
                          onClick={() => { setExpandedHallId(null); setExpandedTab(null); }}
                          aria-label="Collapse card"
                          title="Collapse"
                          style={{ marginLeft: 12 }}
                        >
                          <ChevronUp size={18} />
                        </CollapseButton>
                      )}
                    </HallActions>
                  </HallCard>
                );
              })}
            
            {hallServices.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: '#64748b' }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto 16px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold"
                  }}
                >
                  H
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No halls found</div>
                <div style={{ fontSize: '14px' }}>Create your first hall to get started</div>
              </div>
            )}
          </HallGrid>
        )}
      </ContentCard>
      
      {/* Package Management Modal */}
      <PackageModal
        isOpen={packageModalOpen}
        onClose={() => {
          setIsEditingPackage(false);
          setEditingPackageId(null);
          setPackageModalOpen(false);
        }}
        hall={selectedHall}
        packages={selectedHall?.service_variation_list || []}
        onSave={(pkg)=> handlePackageSave(pkg)}
        onDelete={(id)=> handlePackageDelete(id)}
        isSaving={isSavingPackage}
        initialPackage={editingPackageId != null ? (selectedHall?.service_variation_list || []).find(p=>p.id===editingPackageId) : (isEditingPackage ? {} : undefined)}
      />
    </>
  );
};

export default HallsOverview;