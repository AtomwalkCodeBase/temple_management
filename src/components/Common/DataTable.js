"use client";

import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

const TableContainer = styled.div`
  background: white;
`;

const TableHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 1rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #f8fafc;

  th {
    padding: 1rem 2rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
    border-bottom: 1px solid #e5e7eb;

    &:first-child {
      border-top-left-radius: 0.5rem;
    }

    &:last-child {
      border-top-right-radius: 0.5rem;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.2s;

    &:hover {
      background: #f9fafb;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 1rem 2rem;
    color: #6b7280;
    font-size: 0.9rem;
    vertical-align: middle;
  }
`;

const ActionCell = styled.td`
  position: relative;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const ActionMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 100;
  overflow: hidden;
`;

const ActionMenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #374151;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: #f9fafb;
  }

  &.danger {
    color: #ef4444;

    &:hover {
      background: #fef2f2;
    }
  }

  .icon {
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  p {
    margin: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f4f6;
    border-top: 4px solid #f59e0b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  emptyIcon = "📄",
  emptyTitle = "No Data Found",
  emptyDescription = "There are no items to display.",
  searchable = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeActionMenu, setActiveActionMenu] = useState(null);

  const filteredData = searchable
    ? data.filter((item) =>
        columns.some((column) => {
          const value = item[column.key];
          return (
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      )
    : data;

  const handleActionClick = (index, event) => {
    event.stopPropagation();
    setActiveActionMenu(activeActionMenu === index ? null : index);
  };

  const handleActionItemClick = (action, item) => {
    setActiveActionMenu(null);
    if (action === "edit" && onEdit) onEdit(item);
    if (action === "delete" && onDelete) onDelete(item);
    if (action === "view" && onView) onView(item);
  };

  if (loading) {
    return (
      <TableContainer>
        <LoadingContainer>
          <div className="spinner"></div>
        </LoadingContainer>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      {searchable && (
        <TableHeader>
          <SearchContainer>
            <FiSearch className="search-icon" />
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </TableHeader>
      )}

      {filteredData.length === 0 ? (
        <EmptyState>
          <div className="icon">{emptyIcon}</div>
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
        </EmptyState>
      ) : (
        <Table>
          <TableHead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
              {(onEdit || onDelete || onView) && <th>Actions</th>}
            </tr>
          </TableHead>
          <TableBody>
            {filteredData.map((item, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render
                      ? column.render(item[column.key], item, rowIndex)
                      : item[column.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <ActionCell>
                    <ActionButton
                      onClick={(e) => handleActionClick(rowIndex, e)}
                    >
                      <FiMoreVertical />
                    </ActionButton>

                    {activeActionMenu === rowIndex && (
                      <ActionMenu
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {onView && (
                          <ActionMenuItem
                            onClick={() => handleActionItemClick("view", item)}
                          >
                            <FiEye className="icon" />
                            View Details
                          </ActionMenuItem>
                        )}
                        {onEdit && (
                          <ActionMenuItem
                            onClick={() => handleActionItemClick("edit", item)}
                          >
                            <FiEdit className="icon" />
                            Edit
                          </ActionMenuItem>
                        )}
                        {onDelete && (
                          <ActionMenuItem
                            className="danger"
                            onClick={() =>
                              handleActionItemClick("delete", item)
                            }
                          >
                            <FiTrash2 className="icon" />
                            Delete
                          </ActionMenuItem>
                        )}
                      </ActionMenu>
                    )}
                  </ActionCell>
                )}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
