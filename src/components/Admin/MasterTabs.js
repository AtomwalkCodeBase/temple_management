import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
  @media (max-width: 768px) { margin-bottom: 1.5rem; }
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.$isActive ? "rgb(184, 22, 22)" : "transparent"};
  color: ${props => props.$isActive ? "#fff" : "#800000"};
  font-weight: ${props => props.$isActive ? 600 : 500};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  white-space: nowrap;
  border-bottom: ${props => props.$isActive ? "2px solid rgb(184, 22, 22)" : "none"};
  &:hover {
    background: #F8D7DA;
    color: rgb(184, 22, 22);
    border-bottom: 2px solid rgb(184, 22, 22);
  }
  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
`;

function MasterTabs({ tabs, activeTab, onChange }) {
  return (
    <TabContainer>
      {tabs.map(tab => (
        <TabButton
          key={tab.id}
          onClick={() => onChange(tab.id)}
          $isActive={activeTab === tab.id}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
}

export default MasterTabs;



