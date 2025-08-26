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
import { GiLotus, TempleGate } from "react-icons/gi";

const TableContainer = styled.div`
  background: linear-gradient(135deg, #f8f4eb 0%, #f1e9d9 100%);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #d9a566;
`;

const TableHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #d9a566;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: rgba(44, 26, 10, 0.05);

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
    color: #8b5a2b;
    font-size: 1rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d9a566;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.8);
  color: #4a2c14;

  &:focus {
    outline: none;
    border-color: #b38742;
    box-shadow: 0 0 0 3px rgba(217, 165, 102, 0.2);
  }

  &::placeholder {
    color: #8b5a2b;
    opacity: 0.6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, #4a2c14 0%, #3a2313 100%);

  th {
    padding: 1rem 2rem;
    text-align: left;
    font-weight: 600;
    color: #f8e6cc;
    font-size: 0.9rem;
    border-bottom: 1px solid #8b5a2b;
    position: relative;
    font-family: "Georgia", serif;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: 1px;
      background: linear-gradient(to bottom, transparent, #8b5a2b, transparent);
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid rgba(139, 90, 43, 0.2);
    transition: background-color 0.2s;
    background: rgba(255, 255, 255, 0.7);

    &:nth-child(even) {
      background: rgba(248, 230, 204, 0.3);
    }

    &:hover {
      background: rgba(217, 165, 102, 0.1);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 1rem 2rem;
    color: #4a2c14;
    font-size: 0.9rem;
    vertical-align: middle;
  }
`;

const ActionCell = styled.td`
  position: relative;
  text-align: right;
`;

const ActionButton = styled.button`
  background: rgba(139, 90, 43, 0.1);
  border: 1px solid #d9a566;
  color: #8b5a2b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(139, 90, 43, 0.3);
    color: #4a2c14;
    border-color: #b38742;
  }
`;

const ActionMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: linear-gradient(135deg, #f8f4eb 0%, #f1e9d9 100%);
  border: 1px solid #d9a566;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 160px;
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
  color: #4a2c14;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(139, 90, 43, 0.1);

  &:hover {
    background: rgba(217, 165, 102, 0.1);
    color: #2c1a0a;
  }

  &.danger {
    color: #c84b31;

    &:hover {
      background: rgba(200, 75, 49, 0.1);
    }
  }

  .icon {
    font-size: 0.9rem;
    color: #8b5a2b;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #8b5a2b;

  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #d9a566;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #4a2c14;
    font-family: "Georgia", serif;
  }

  p {
    margin: 0;
    opacity: 0.8;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  flex-direction: column;
  gap: 1rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(217, 165, 102, 0.2);
    border-top: 4px solid #d9a566;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: #8b5a2b;
    font-size: 0.9rem;
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

const TableFooter = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid #d9a566;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(44, 26, 10, 0.05);
  color: #8b5a2b;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d9a566;
  background: ${(props) => (props.active ? "#d9a566" : "transparent")};
  color: ${(props) => (props.active ? "#2c1a0a" : "#8b5a2b")};
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #d9a566;
    color: #2c1a0a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
  emptyIcon = <GiLotus />,
  emptyTitle = "No Data Found",
  emptyDescription = "There are no items to display at this time.",
  searchable = true,
  pagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
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

  // Close action menu when clicking outside
  useState(() => {
    const handleClickOutside = () => {
      setActiveActionMenu(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <TableContainer>
        <LoadingContainer>
          <div className="spinner"></div>
          <div className="loading-text">Loading sacred records...</div>
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
              placeholder="Search sacred records..."
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
        <>
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
                  initial={{ opacity: 0, y: 10 }}
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
                              onClick={() =>
                                handleActionItemClick("view", item)
                              }
                            >
                              <FiEye className="icon" />
                              View Details
                            </ActionMenuItem>
                          )}
                          {onEdit && (
                            <ActionMenuItem
                              onClick={() =>
                                handleActionItemClick("edit", item)
                              }
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

          {pagination && (
            <TableFooter>
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} entries
              </div>
              <Pagination>
                <PageButton
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  Previous
                </PageButton>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <PageButton
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  Next
                </PageButton>
              </Pagination>
            </TableFooter>
          )}
        </>
      )}
    </TableContainer>
  );
};

export default DataTable;
