"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiPlus } from "react-icons/fi";
import {
  getPricingRuleList,
  processPricingRuleData,
} from "../../services/templeServices";
import { getStoredTempleId } from "../../services/authServices";
import PageContainer from "../../components/Common/PageContainer";
import DataTable from "../../components/Common/DataTable";
import AddPricingRuleModal from "../../components/Modals/AddPricingRuleModal";

const AddButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const PricingRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const templeId = getStoredTempleId();

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const response = await getPricingRuleList();
      // Filter by temple_id if needed
      const filteredRules = response.filter(
        (rule) => !templeId || rule.temple_id.toString() === templeId
      );
      setRules(filteredRules);
    } catch (error) {
      console.error("Error fetching rules:", error);
      setRules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = () => {
    setSelectedRule(null);
    setShowAddModal(true);
  };

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setShowAddModal(true);
  };

  const handleDeleteRule = async (rule) => {
    if (window.confirm(`Are you sure you want to delete "${rule.name}"?`)) {
      try {
        await processPricingRuleData({
          call_mode: "DELETE",
          temple_id: templeId,
          pricing_rule_id: rule.id,
        });
        fetchRules();
      } catch (error) {
        console.error("Error deleting rule:", error);
        alert("Failed to delete rule");
      }
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSelectedRule(null);
  };

  const handleRuleSaved = () => {
    fetchRules();
    handleModalClose();
  };

  const getDayName = (dayNumber) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days[dayNumber] || "All Days";
  };

  const columns = [
    {
      key: "name",
      title: "Rule Name",
      render: (value) => (
        <div style={{ fontWeight: 600, color: "#1f2937" }}>{value}</div>
      ),
    },
    {
      key: "day_of_week",
      title: "Day of Week",
      render: (value) => getDayName(value),
    },
    {
      key: "start_time",
      title: "Time Range",
      render: (value, item) => `${value} - ${item.end_time}`,
    },
    {
      key: "date_price",
      title: "Date Price",
      render: (value) => `₹${Number.parseFloat(value).toLocaleString()}`,
    },
    {
      key: "time_price",
      title: "Time Price",
      render: (value) => `₹${Number.parseFloat(value).toLocaleString()}`,
    },
    {
      key: "week_day_price",
      title: "Week Day Price",
      render: (value) => `₹${Number.parseFloat(value).toLocaleString()}`,
    },
    {
      key: "start_date",
      title: "Date Range",
      render: (value, item) => `${value} - ${item.end_date}`,
    },
    {
      key: "is_active",
      title: "Status",
      render: (value) => (value ? "Active" : "Inactive"),
    },
  ];

  return (
    <>
      <PageContainer
        title="Pricing Rules"
        description="Manage dynamic pricing rules for different times, dates, and days"
        icon={<FiTrendingUp />}
        gradient="linear-gradient(135deg, #b81616 0%, #6d28d9 100%)"
        actions={
          <AddButton
            onClick={handleAddRule}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus />
            Add Rule
          </AddButton>
        }
      >
        <DataTable
          data={rules}
          columns={columns}
          loading={loading}
          onEdit={handleEditRule}
          onDelete={handleDeleteRule}
          emptyIcon="📊"
          emptyTitle="No Pricing Rules Found"
          emptyDescription="Create your first pricing rule to manage dynamic pricing."
        />
      </PageContainer>

      <AnimatePresence>
        {showAddModal && (
          <AddPricingRuleModal
            rule={selectedRule}
            onClose={handleModalClose}
            onSuccess={handleRuleSaved}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PricingRules;
