import React from "react";
import styled from "styled-components";

// Import Inter font with optimized weights
const FontImport = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Panel = styled.div`
  background: #fafafa;
  border-radius: 16px;
  padding: 16px 16px 10px 16px;
  min-height: 0;
`;

const SuccessBanner = styled.div`
  padding: 10px 12px;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  color: #065f46;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1d1d1f;
  margin: 0;
  letter-spacing: -0.022em;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #6e6e73;
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

const PrimaryButton = styled.button`
  padding: 8px 14px;
  background: linear-gradient(135deg, #007aff 0%, #0056d6 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.18);
  letter-spacing: -0.01em;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 122, 255, 0.24);
  }

  &:active {
    transform: translateY(0);
    transition: all 0.1s;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 8px;

  /* Dynamic grid based on package count */
  &.single-package {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto 24px auto;
  }

  &.two-packages {
    grid-template-columns: repeat(2, 1fr);
    max-width: 824px;
    margin: 0 auto 24px auto;
  }

  &.multiple-packages {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr !important;
    max-width: none !important;
    margin: 0 0 24px 0 !important;
    gap: 16px;
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    &.multiple-packages {
      grid-template-columns: repeat(2, 1fr);
    }
    gap: 20px;
  }
`;

const PackageCard = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);

  /* Enhanced styling for single package view */
  .single-package &,
  .two-packages & {
    padding: 20px;
    border-radius: 18px;
  }

  .single-package & {
    text-align: center;
  }

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

const PackageTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 12px 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

const PackagePrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #30d158;
  margin-bottom: 16px;
  line-height: 1;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #30d158 0%, #34c759 100%);
    border-radius: 1px;
  }

  /* Center the price accent line when in single-package layout */
  .single-package &::after {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PackageInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6e6e73;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.004em;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const InfoIcon = styled.svg`
  width: 16px;
  height: 16px;
  color: #6e6e73;
  stroke-width: 1.5;
  flex-shrink: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const EditButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  background: #ffffff;
  border: 1.5px solid #007aff;
  border-radius: 10px;
  color: #007aff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.004em;

  &:hover {
    background: rgba(0, 122, 255, 0.06);
    border-color: #0056d6;
    color: #0056d6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    transition: all 0.1s;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  background: linear-gradient(135deg, #ff3b30 0%, #d70015 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.004em;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(215, 0, 21, 0.24);
  }

  &:active {
    transform: translateY(0);
    transition: all 0.1s;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: #6e6e73;
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  margin: 0 0 8px 0;
  letter-spacing: -0.022em;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: #6e6e73;
  margin: 0 0 32px 0;
  line-height: 1.5;
  letter-spacing: -0.01em;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const MorePackages = styled.div`
  text-align: center;
  padding: 12px;
  margin-top: 6px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  color: #6e6e73;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const PackagesPanel = ({
  hall,
  selectedHall,
  successMessage,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const list = Array.isArray(selectedHall?.service_variation_list)
    ? selectedHall.service_variation_list
    : Array.isArray(hall?.service_variation_list)
    ? hall.service_variation_list
    : [];

  const formatPackageType = (priceType) => {
    switch (priceType) {
      case "HOURLY":
        return "Hourly Package";
      case "HALF_DAY":
        return "Half Day Package";
      case "FULL_DAY":
        return "Full Day Package";
      default:
        return `${priceType} Package`;
    }
  };

  const formatPrice = (price) => {
    return price?.toLocaleString("en-IN") || price;
  };

  return (
    <>
      <FontImport />
      <Panel>
        {successMessage && (
          <SuccessBanner>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </SuccessBanner>
        )}

        <Header>
          <HeaderLeft>
            <Title>
              {list.length} Package{list.length !== 1 ? "s" : ""}
            </Title>
            <Subtitle>Manage time slots and pricing variations</Subtitle>
          </HeaderLeft>
          <PrimaryButton onClick={() => onAdd(hall)}>Add Package</PrimaryButton>
        </Header>

        {list.length > 0 ? (
          <>
            <Grid
              className={
                list.length === 1
                  ? "single-package"
                  : list.length === 2
                  ? "two-packages"
                  : "multiple-packages"
              }
            >
              {list.slice(0, 6).map((pkg, index) => (
                <PackageCard key={pkg.id || index}>
                  <PackageTitle>
                    {formatPackageType(pkg.price_type)}
                  </PackageTitle>

                  <PackagePrice>₹{formatPrice(pkg.base_price)}</PackagePrice>

                  <PackageInfo>
                    <InfoItem>
                      <InfoIcon
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </InfoIcon>
                      {pkg.start_time} - {pkg.end_time}
                    </InfoItem>
                    <InfoItem>
                      <InfoIcon
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </InfoIcon>
                      Max {pkg.max_participant} Participants
                    </InfoItem>
                  </PackageInfo>

                  <ButtonGroup>
                    <EditButton onClick={() => onEdit(hall, pkg)}>
                      Edit
                    </EditButton>
                    <DeleteButton onClick={() => onDelete(hall, pkg.id)}>
                      Delete
                    </DeleteButton>
                  </ButtonGroup>
                </PackageCard>
              ))}
            </Grid>

            {list.length > 6 && (
              <MorePackages>
                +{list.length - 6} more package
                {list.length - 6 !== 1 ? "s" : ""}
              </MorePackages>
            )}
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </EmptyIcon>
            <EmptyTitle>No packages defined</EmptyTitle>
            <EmptyDescription>
              Create your first package to get started with pricing and
              availability
            </EmptyDescription>
            <PrimaryButton onClick={() => onAdd(hall)}>
              Create Package
            </PrimaryButton>
          </EmptyState>
        )}
      </Panel>
    </>
  );
};

export default PackagesPanel;
