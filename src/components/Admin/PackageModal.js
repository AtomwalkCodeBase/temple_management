import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";
import { getPricingRuleList } from "../../services/templeServices";

const ModalOverlay = styled.div`
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
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fafbfc;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const ModalBody = styled.div`
  padding: 32px;
  overflow-y: auto;
  flex: 1;
`;



const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const RuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

const RuleCard = styled.button`
  text-align: left;
  border: 1px solid ${props => props.$selected ? '#3b82f6' : '#e5e7eb'};
  background: ${props => props.$selected ? 'rgba(59, 130, 246, 0.05)' : '#ffffff'};
  color: #111827;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .title { font-size: 14px; font-weight: 600; color: #111827; }
  .desc { font-size: 12px; color: #6b7280; }
  .meta { font-size: 12px; color: #374151; display: flex; gap: 10px; flex-wrap: wrap; }
  .chips { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 2px; }
  .chip { font-size: 11px; color: #1f2937; background: #f3f4f6; border: 1px solid #e5e7eb; padding: 2px 6px; border-radius: 999px; }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #d1d5db;
  
  &.primary {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
    
    &:hover {
      background: #2563eb;
    }
  }
  
  &.secondary {
    background: white;
    color: #6b7280;
    
    &:hover {
      background: #f9fafb;
    }
  }
`;



const PackageModal = ({ 
  isOpen, 
  onClose, 
  hall, 
  onSave,
  onDelete,
  isSaving,
  initialPackage,
  isEditing
}) => {
  const [editingPackage, setEditingPackage] = useState(null);
  const [pricingRules, setPricingRules] = useState([]);
  const serviceType = String(hall?.service_type || '').toUpperCase();
  const isPuja = serviceType === 'PUJA';

  const mapPriceTypeToFullLabel = (priceType) => {
    switch (String(priceType || '').trim()) {
      case 'Individual-1': return 'Individual Puja (1 person)';
      case 'Partner-2': return 'Partner Puja (2 person)';
      case 'Family-5': return 'Family Puja (5 person)';
      case 'Joint-10': return 'Joint Family Puja (10 person)';
      default: return '';
    }
  };

  const [formData, setFormData] = useState({
    price_type: 'HOURLY',
    slot_name: '',
    base_price: '',
    start_time: '',
    end_time: '',
    no_hours: '',
    max_no_per_day: '',
    max_participant: '',
    pricing_rule_id: null
  });

  useEffect(() => {
    if (!isOpen) {
      setEditingPackage(null);
      resetForm();
      return;
    }
    // Fetch pricing rules when modal opens
    (async () => {
      try {
        const resp = await getPricingRuleList();
        const list = Array.isArray(resp?.data) ? resp.data : (Array.isArray(resp) ? resp : []);
        const templeId = hall?.temple_id ?? hall?.templeId ?? null;
        const filtered = list.filter(service => !templeId || String(service.temple_id) === String(templeId));
        const normalize = (r) => ({
          id: r?.id ?? r?.rule_id ?? r?.value ?? r?.code ?? null,
          name: r?.name ?? r?.title ?? r?.label ?? `Rule ${r?.id ?? ''}`,
          description: r?.description ?? r?.desc ?? '',
          // Normalize to required keys
          start_date: r?.start_date ?? r?.startDate ?? r?.from_date ?? r?.fromDate ?? '',
          end_date: r?.end_date ?? r?.endDate ?? r?.to_date ?? r?.toDate ?? '',
          date_price: r?.date_price ?? r?.datePrice ?? r?.special_date_price ?? r?.specialDatePrice ?? null,
          time_price: r?.time_price ?? r?.timePrice ?? r?.slot_price ?? r?.slotPrice ?? null,
          week_day_price: r?.week_day_price ?? r?.weekday_price ?? r?.weekDayPrice ?? r?.weekdayPrice ?? null,
        });
        setPricingRules(filtered.map(normalize));
      } catch (e) {
        setPricingRules([]);
      }
    })();
    // If an initial package is provided, open directly in form mode
    if (initialPackage !== undefined) {
      const pkg = initialPackage || {};
      setEditingPackage(pkg.id ? pkg : (isEditing ? pkg : null));
      const resolvedSlotName = isPuja 
        ? (pkg.slot_name || mapPriceTypeToFullLabel(pkg.price_type)) 
        : '';
      const resolvedPricingRuleId = (pkg.pricing_rule_id != null ? pkg.pricing_rule_id : (pkg.pricing_rule_data?.id != null ? pkg.pricing_rule_data.id : null));
      setFormData({
        price_type: pkg.price_type || 'HOURLY',
        slot_name: resolvedSlotName || '',
        base_price: pkg.base_price != null ? String(pkg.base_price) : '',
        start_time: pkg.start_time || '',
        end_time: pkg.end_time || '',
        no_hours: pkg.no_hours != null ? String(pkg.no_hours) : '',
        max_no_per_day: pkg.max_no_per_day != null ? String(pkg.max_no_per_day) : '',
        max_participant: pkg.max_participant != null ? String(pkg.max_participant) : '',
        pricing_rule_id: resolvedPricingRuleId != null ? Number(resolvedPricingRuleId) : null
      });
    }
  }, [isOpen, initialPackage]);

  const resetForm = () => {
    setFormData({
      price_type: "HOURLY",
      slot_name: "",
      base_price: "",
      start_time: "",
      end_time: "",
      no_hours: "",
      max_no_per_day: "",
      max_participant: "",
      pricing_rule_id: null
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    
    const packageData = isPuja ? {
      id: editingPackage?.id || null,
      slot_name: formData.slot_name || formData.price_type,
      price_type: (() => {
        const slotName = formData.slot_name || formData.price_type || '';
        if (slotName.includes("Joint")) return "Joint-10";
        if (slotName.includes("Individual")) return "Individual-1";
        if (slotName.includes("Partner")) return "Partner-2";
        if (slotName.includes("Family")) return "Family-5";
        return "FIXED";
      })(),
      base_price: parseFloat(formData.base_price),
      pricing_rule_id: formData.pricing_rule_id != null ? parseInt(formData.pricing_rule_id) : null,
      start_time: formData.start_time,
      end_time: formData.end_time,
      max_no_per_day: 1,
      max_participant: parseInt(formData.max_participant),
      no_hours: null,
      duration_minutes: (() => {
        if (formData.start_time && formData.end_time) {
          const startTime = new Date(`2000-01-01T${formData.start_time}:00`);
          const endTime = new Date(`2000-01-01T${formData.end_time}:00`);
          if (endTime > startTime) {
            return Math.round((endTime - startTime) / (1000 * 60));
          }
        }
        return 0;
      })()
    } : {
      id: editingPackage?.id || null, // Use existing ID for updates, null for new packages
      price_type: formData.price_type,
      base_price: parseFloat(formData.base_price),
      pricing_rule_id: formData.pricing_rule_id != null ? parseInt(formData.pricing_rule_id) : null,
      start_time: formData.start_time,
      end_time: formData.end_time,
      no_hours: formData.no_hours ? parseInt(formData.no_hours) : null,
      max_no_per_day: parseInt(formData.max_no_per_day),
      max_participant: parseInt(formData.max_participant)
    };
    

    
    onSave(packageData);
    // Optimistically reset and hide form for snappy UX; parent will close modal on success
    setEditingPackage(null);
    resetForm();
  };



  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{editingPackage || isEditing ? 'Edit Package' : 'Add Package'}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <Form onSubmit={handleSubmit}>
              <FormRow>
                {!isPuja && (
                  <FormGroup>
                    <Label>Package Type *</Label>
                    <Select
                      value={formData.price_type}
                      onChange={(e) => setFormData({...formData, price_type: e.target.value})}
                      required
                    >
                      <option value="HOURLY">Hourly</option>
                      <option value="HALF_DAY">Half Day</option>
                      <option value="FULL_DAY">Full Day</option>
                    </Select>
                  </FormGroup>
                )}
                {isPuja && (
                  <FormGroup>
                    <Label>Package Name *</Label>
                    <Select
                      value={formData.slot_name}
                      onChange={(e) => setFormData({ ...formData, slot_name: e.target.value })}
                      required
                    >
                      <option value="">Select package</option>
                      <option value="Individual Puja (1 person)">Individual Puja (1 person)</option>
                      <option value="Partner Puja (2 person)">Partner Puja (2 person)</option>
                      <option value="Family Puja (5 person)">Family Puja (5 person)</option>
                      <option value="Joint Family Puja (10 person)">Joint Family Puja (10 person)</option>
                    </Select>
                  </FormGroup>
                )}
                
                <FormGroup>
                  <Label>Base Price (₹) *</Label>
                  <Input
                    type="number"
                    value={formData.base_price}
                    placeholder="Numbers only"
                    onChange={(e) => setFormData({...formData, base_price: e.target.value})}
                    min="0"
                    step="0.01"
                    required
                  />
                </FormGroup>
                
                {/* Pricing rule selection moved to bottom as cards */}
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label>Start Time *</Label>
                  <Input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>End Time *</Label>
                  <Input
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                    required
                  />
                </FormGroup>
                
                {!isPuja && formData.price_type === "HOURLY" && (
                  <FormGroup>
                    <Label>Number of Hours</Label>
                    <Input
                      type="number"
                      value={formData.no_hours}
                      onChange={(e) => setFormData({...formData, no_hours: e.target.value})}
                      min="1"
                    />
                  </FormGroup>
                )}
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label>Maximum Participants *</Label>
                  <Input
                    type="number"
                    value={formData.max_participant}
                    placeholder="Numbers only"
                    onChange={(e) => setFormData({...formData, max_participant: e.target.value})}
                    min="1"
                    required
                  />
                </FormGroup>
                
                {!isPuja && (
                  <FormGroup>
                    <Label>Maximum Bookings Per Day *</Label>
                    <Input
                      type="number"
                      value={formData.max_no_per_day}
                      placeholder="Numbers only"
                      onChange={(e) => setFormData({...formData, max_no_per_day: e.target.value})}
                      min="1"
                      required
                    />
                  </FormGroup>
                )}
              </FormRow>

              {/* Pricing Rule selection moved to the bottom */}
              <div style={{ marginTop: 8 }}>
                <Label>Pricing Rule *</Label>
                <RuleGrid>
                  {(pricingRules || []).map((rule) => {
                    const id = Number(rule.id ?? 0);
                    const title = rule.name ?? `Rule ${id}`;
                    const description = rule.description ?? '';
                    const metaParts = [];
                    if (rule?.start_date || rule?.end_date) metaParts.push(`${rule.start_date || ''} → ${rule.end_date || ''}`);
                    const selected = Number(formData.pricing_rule_id) === id;
                    return (
                      <RuleCard
                        key={id}
                        type="button"
                        $selected={selected}
                        onClick={() => setFormData({ ...formData, pricing_rule_id: id })}
                        aria-pressed={selected}
                      >
                        <div className="title">{title}</div>
                        {description && <div className="desc">{description}</div>}
                        {metaParts.length > 0 && <div className="meta">{metaParts.join(' • ')}</div>}
                        <div className="chips">
                          {rule?.date_price != null && <span className="chip">Date price ₹{rule.date_price}</span>}
                          {rule?.time_price != null && <span className="chip">Time price ₹{rule.time_price}</span>}
                          {rule?.week_day_price != null && <span className="chip">Weekday price ₹{rule.week_day_price}</span>}
                        </div>
                      </RuleCard>
                    );
                  })}
                  {(pricingRules || []).length === 0 && (
                    <div style={{ fontSize: 12, color: '#6b7280' }}>No pricing rules found.</div>
                  )}
                </RuleGrid>
              </div>
              
              <FormActions>
                <Button 
                  type="button" 
                  className="secondary"
                  onClick={() => {
                    setEditingPackage(null);
                    resetForm();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primary" disabled={isSaving || formData.pricing_rule_id == null}>
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </Button>
              </FormActions>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PackageModal;