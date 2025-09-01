"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiStar } from "react-icons/fi";
import { MdTempleHindu } from "react-icons/md";
import { fetchTemples } from "../../services/templeServices";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";
import CustomerLayout from "../../components/Customer/CustomerLayout";
import { gettemplist } from "../../services/productServices";

const TemplesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;

  .title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 500;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
`;

const FilterSection = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .filter-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: 600;
      color: #374151;
      font-size: 0.9rem;
    }

    input,
    select {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }
  }
`;

const TemplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TempleCard = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const TempleImage = styled.div`
  height: 220px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E");
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }

  .temple-icon {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
`;

const TempleContent = styled.div`
  padding: 2rem;
`;

const TempleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TempleName = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  flex: 1;
`;

const TempleRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;

  .star {
    font-size: 0.9rem;
  }
`;

const TempleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;

  .detail {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: #6b7280;

    .icon {
      color: #667eea;
      font-size: 1rem;
      min-width: 16px;
    }

    .value {
      color: #374151;
      font-weight: 500;
    }
  }
`;

const TempleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;

  .stat {
    text-align: center;

    .number {
      font-size: 1.2rem;
      font-weight: 800;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .label {
      font-size: 0.7rem;
      color: #6b7280;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
`;

const BookSevaButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #6b7280;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .text {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 500px;
  border: 1px solid #fca5a5;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #6b7280;

  .icon {
    font-size: 5rem;
    margin-bottom: 2rem;
    opacity: 0.5;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #374151;
  }

  .subtitle {
    font-size: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const CustomerTemples = () => {
  const [temples, setTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    rating: "",
  });
  const navigate = useNavigate();
  const { customerData } = useCustomerAuth();

  useEffect(() => {
    loadTemples();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [temples, filters]);

  const loadTemples = async () => {
    try {
      setLoading(true);
      const response = await gettemplist();
      const templesData = response.data || [];
      setTemples(templesData);
    } catch (err) {
      setError("Failed to load temples. Please try again.");
      console.error("Error loading temples:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = temples;

    if (filters.search) {
      filtered = filtered.filter(
        (temple) =>
          temple.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          temple.location?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((temple) =>
        temple.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredTemples(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleBookSeva = (temple) => {
    navigate(`/book-seva/${temple.temple_id}`, { state: { temple } });
  };

  if (loading) {
    return (
      <CustomerLayout>
        <LoadingContainer>
          <div className="spinner"></div>
          <div className="text">Loading sacred temples...</div>
        </LoadingContainer>
      </CustomerLayout>
    );
  }

  if (error) {
    return (
      <CustomerLayout>
        <ErrorMessage>{error}</ErrorMessage>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <TemplesContainer>
        <HeaderSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="title">Sacred Temples</div>
          <div className="subtitle">
            Discover divine temples and book your spiritual journey with us
          </div>
        </HeaderSection>

        <FilterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="filter-title">Find Your Perfect Temple</div>
          <div className="filter-grid">
            <div className="filter-item">
              <label>Search Temples</label>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            <div className="filter-item">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
            <div className="filter-item">
              <label>Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {filteredTemples.length === 0 ? (
          <EmptyState>
            <div className="icon">🏛️</div>
            <div className="title">No Temples Found</div>
            <div className="subtitle">
              {temples.length === 0
                ? "No temples are available at the moment. Please check back later."
                : "No temples match your search criteria. Try adjusting your filters."}
            </div>
          </EmptyState>
        ) : (
          <TemplesGrid>
            {filteredTemples.map((temple, index) => (
              <TempleCard
                key={temple.temple_id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <TempleImage>
                  {temple.image ? (
                    <img
                      src={temple.image || "/placeholder.svg"}
                      alt={temple.name}
                    />
                  ) : (
                    <div className="temple-icon">
                      <MdTempleHindu />
                    </div>
                  )}
                </TempleImage>

                <TempleContent>
                  <TempleHeader>
                    <TempleName>{temple.name}</TempleName>
                    <TempleRating>
                      <FiStar className="star" />
                      4.8
                    </TempleRating>
                  </TempleHeader>

                  <TempleDetails>
                    <div className="detail">
                      <FiMapPin className="icon" />
                      <span className="value">{temple.location}</span>
                    </div>
                    <div className="detail">
                      <FiPhone className="icon" />
                      <span className="value">{temple.mobile_number}</span>
                    </div>
                    <div className="detail">
                      <FiMail className="icon" />
                      <span className="value">{temple.email_id}</span>
                    </div>
                  </TempleDetails>

                  <TempleStats>
                    <div className="stat">
                      <div className="number">150+</div>
                      <div className="label">Sevas</div>
                    </div>
                    <div className="stat">
                      <div className="number">24/7</div>
                      <div className="label">Open</div>
                    </div>
                    <div className="stat">
                      <div className="number">5K+</div>
                      <div className="label">Devotees</div>
                    </div>
                  </TempleStats>

                  <BookSevaButton
                    onClick={() => handleBookSeva(temple)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MdTempleHindu />
                    Book Seva
                  </BookSevaButton>
                </TempleContent>
              </TempleCard>
            ))}
          </TemplesGrid>
        )}
      </TemplesContainer>
    </CustomerLayout>
  );
};

export default CustomerTemples;
