import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import HallForm from "../../components/Admin/HallForm";
import HallsOverview from "../../components/Admin/HallsOverview";
import AddonsNotification from "../../components/Admin/AddonsNotification";
import { useLocation, useNavigate } from "react-router-dom";
import { getTempleServicesList } from "../../services/templeServices";
import {
  Building2,
  Calendar,
  TrendingUp,
  Search,
  Download,
  CheckCircle,
  XCircle,
  X,
  Plus,
  Edit,
  Eye,
} from "lucide-react";

// Styled Components
const PageContainer = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
`;

const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

const Header = styled.header`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.025em;
  }

  p {
    margin: 8px 0 0;
    color: #64748b;
    font-size: 16px;
    font-weight: 400;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const Tabs = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Tab = styled.button`
  padding: 16px 24px;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  color: ${(props) => (props.$active ? "#ffffff" : "#64748b")};
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "#f8fafc"};
    color: ${(props) => (props.$active ? "#ffffff" : "#374151")};
  }
`;

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

const Toolbar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
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

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  background: #f9fafb;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: #ffffff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 16px 20px;
    background: #f8fafc;
    color: #64748b;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 1px solid #e2e8f0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td {
    padding: 20px;
    border-bottom: 1px solid #e2e8f0;
    color: #374151;
    font-size: 14px;
  }

  tr:hover {
    background: #f8fafc;
  }
`;

// Enhanced Hall Gallery Components
// const HallGalleryHeader = styled.div``; /* moved to HallsOverview */
// const GalleryControls = styled.div``; /* moved to HallsOverview */

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: #f8fafc;
    color: #374151;
    border-color: #d1d5db;
  }
`;

const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => (props.$active ? "#dcfce7" : "#f3f4f6")};
  color: ${(props) => (props.$active ? "#16a34a" : "#6b7280")};
  border: 1px solid ${(props) => (props.$active ? "#bbf7d0" : "#e5e7eb")};
`;

// Main Component
const HallsManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hallFilter, setHallFilter] = useState("all");

  const [showHallWizard, setShowHallWizard] = useState(false);
  const [editService, setEditService] = useState(null);
  const [hallServices, setHallServices] = useState([]);
  const [hallServicesLoading, setHallServicesLoading] = useState(false);
  const [newHallServiceId, setNewHallServiceId] = useState(null);
  const [showAddonsNotification, setShowAddonsNotification] = useState(false);
  const templeId = localStorage.getItem("templeId") || null;
  useEffect(() => {
    // Check for new hall creation and tab changes
    const params = new URLSearchParams(location.search);
    const newHallId = params.get("new_hall");
    const tabParam = params.get("tab");

    console.log("URL Params:", location.search);
    console.log("New Hall ID:", newHallId);
    console.log("Tab Param:", tabParam);

    if (newHallId) {
      console.log("Setting new hall notification for ID:", newHallId);
      setNewHallServiceId(newHallId);
      setShowAddonsNotification(true);
      // Clean up the URL parameter
      params.delete("new_hall");
      navigate({ pathname: location.pathname, search: params.toString() });

      // Scroll to top to ensure notification is visible
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // Small delay to ensure navigation completes first
    }

    if (
      tabParam &&
      ["overview", "bookings", "halls", "customers"].includes(tabParam)
    ) {
      console.log("Setting active tab to:", tabParam);
      setActiveTab(tabParam);

      // If switching to overview tab, scroll to top
      if (tabParam === "overview") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.search, navigate, location.pathname]);

  // Scroll to top whenever notification is shown
  useEffect(() => {
    if (showAddonsNotification) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200); // Delay to ensure component renders first
    }
  }, [showAddonsNotification]);

  // Ensure tab switches can occur even if the HallWizard is open
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fetch hall services from API and keep only HALL service_type
  const fetchHallServices = async () => {
    setHallServicesLoading(true);
    try {
      const resp = await getTempleServicesList();
      const list = Array.isArray(resp)
        ? resp
        : Array.isArray(resp?.data)
        ? resp.data
        : Array.isArray(resp?.results)
        ? resp.results
        : Array.isArray(resp?.services)
        ? resp.services
        : [];
      const hallsOnly = list
        .filter(
          (s) => (s?.service_type || "").toString().toUpperCase() === "HALL"
        )
        .filter((service) => !templeId || service.temple_id === templeId);
      setHallServices(hallsOnly);
    } catch (e) {
      setHallServices([]);
    } finally {
      setHallServicesLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHallServices();
  }, []);

  // Remove mock bookings; rely on live hall services
  useEffect(() => {
    setBookings([]);
  }, [hallServices]);

  // Wizard visibility is controlled only by explicit user actions (Add/Edit)

  // Stats based on live halls
  const hallStats = useMemo(() => {
    const total = hallServices.length;
    const active = hallServices.filter((h) => h.is_active).length;
    const basePrices = hallServices
      .map((h) => parseFloat(h.base_price))
      .filter((v) => !Number.isNaN(v));
    const avgBase = basePrices.length
      ? Math.round(basePrices.reduce((a, b) => a + b, 0) / basePrices.length)
      : 0;
    return { total, active, avgBase };
  }, [hallServices]);

  // Helper functions

  const handleEdit = (service) => {
    try {
      // Only treat as inline update if explicitly flagged
      if (service?._inlineUpdate === true) {
        setHallServices((prev) =>
          prev.map((h) =>
            h.service_id === service.service_id
              ? { ...h, ...service, _inlineUpdate: undefined }
              : h
          )
        );
        return;
      }

      // Open the hall wizard for editing with pre-filled values
      setEditService(service || null);
      setShowHallWizard(true);
    } catch {}
  };

  if (loading) {
    return (
      <PageContainer>
        <Container>
          <div
            style={{ padding: "60px", textAlign: "center", color: "#64748b" }}
          >
            <Building2
              size={48}
              style={{ marginBottom: "16px", opacity: 0.5 }}
            />
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
              Loading halls...
            </div>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <TitleSection>
            <Building2 size={36} color="#667eea" />
            <div>
              <h1>Sacred Halls Management</h1>
              <p>
                Manage hall bookings, availability, and configurations with
                enterprise-grade tools
              </p>
            </div>
          </TitleSection>
          <HeaderActions>
            <SecondaryButton>
              <Download size={16} />
              Export Data
            </SecondaryButton>
            <PrimaryButton
              onClick={() => {
                setEditService(null);
                setShowHallWizard(true);
              }}
              disabled={hallServicesLoading}
            >
              <Plus size={16} />
              Add New Hall
            </PrimaryButton>
          </HeaderActions>
        </Header>

        <Tabs>
          <Tab
            $active={activeTab === "overview"}
            onClick={() => handleTabChange("overview")}
          >
            <TrendingUp size={18} />
            Overview
          </Tab>
          <Tab
            $active={activeTab === "bookings"}
            onClick={() => handleTabChange("bookings")}
          >
            <Calendar size={18} />
            Bookings
          </Tab>
        </Tabs>

        {activeTab === "overview" && (
          <>
            {showAddonsNotification && (
              <AddonsNotification
                serviceId={newHallServiceId}
                onClose={() => setShowAddonsNotification(false)}
                onSkip={() => setShowAddonsNotification(false)}
              />
            )}

            <HallsOverview
              hallStats={hallStats}
              hallServices={hallServices}
              hallServicesLoading={hallServicesLoading}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onEditHall={handleEdit}
            />
          </>
        )}

        {activeTab === "bookings" && (
          <ContentCard>
            <div className="card-header">
              <div className="card-title">Hall Services Overview</div>
            </div>
            <Toolbar>
              <SearchInput>
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search halls by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchInput>
              <FilterSelect
                value={hallFilter}
                onChange={(e) => setHallFilter(e.target.value)}
              >
                <option value="all">All Halls</option>
                {hallServices.map((h) => (
                  <option key={h.service_id} value={h.name}>
                    {h.name}
                  </option>
                ))}
              </FilterSelect>
            </Toolbar>
            <Table>
              <thead>
                <tr>
                  <th>Hall Name</th>
                  <th>Service Type</th>
                  <th>Base Price</th>
                  <th>Capacity</th>
                  <th>Variations</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hallServices
                  .filter((h) => hallFilter === "all" || h.name === hallFilter)
                  .filter((h) =>
                    h.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((h) => (
                    <tr key={h.service_id}>
                      <td style={{ fontWeight: "600" }}>{h.name}</td>
                      <td>{h.service_type_str || h.service_type}</td>
                      <td style={{ fontWeight: "600", color: "#059669" }}>
                        {h.base_price != null
                          ? `₹${Number(h.base_price).toLocaleString()}`
                          : "—"}
                      </td>
                      <td>
                        {h.capacity != null ? `${h.capacity} people` : "—"}
                      </td>
                      <td>
                        {Array.isArray(h.service_variation_list)
                          ? h.service_variation_list.length
                          : 0}
                      </td>
                      <td>
                        <ActiveBadge $active={!!h.is_active}>
                          {h.is_active ? (
                            <CheckCircle size={12} />
                          ) : (
                            <XCircle size={12} />
                          )}
                          {h.is_active ? "Active" : "Inactive"}
                        </ActiveBadge>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <ActionButton
                            onClick={() => handleEdit(h)}
                            title="Edit Hall"
                          >
                            <Edit size={14} />
                          </ActionButton>
                          <ActionButton title="View Details">
                            <Eye size={14} />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                {hallServices.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        color: "#6b7280",
                        textAlign: "center",
                        padding: "40px",
                        fontStyle: "italic",
                      }}
                    >
                      {hallServicesLoading
                        ? "Loading halls..."
                        : "No halls found. Create your first hall to get started."}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ContentCard>
        )}

        {showAddonsNotification && activeTab !== "overview" && (
          <AddonsNotification
            serviceId={newHallServiceId}
            onClose={() => setShowAddonsNotification(false)}
            onSkip={() => setShowAddonsNotification(false)}
          />
        )}

        {showHallWizard && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add or edit hall"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15, 23, 42, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "24px",
            }}
          >
            <div
              role="document"
              style={{
                width: "auto",
                maxWidth: "unset",
                background: "transparent",
                borderRadius: 0,
                boxShadow: "none",
                overflow: "visible",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowHallWizard(false);
                }
              }}
            >
              <button
                onClick={() => {
                  setShowHallWizard(false);
                }}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                  cursor: "pointer",
                  zIndex: 1,
                }}
              >
                <X size={18} />
              </button>
              <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden", padding: 0 }}>
                <HallForm
                  editService={editService}
                  onCancel={() => {
                    setShowHallWizard(false);
                    setEditService(null);
                  }}
                  onSuccess={async (serviceId) => {
                    console.log("HallForm onSuccess called with serviceId:", serviceId);
                    setShowHallWizard(false);
                    setEditService(null);
                    try {
                      await fetchHallServices();
                    } catch {}
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </PageContainer>
  );
};

export default HallsManagement;
