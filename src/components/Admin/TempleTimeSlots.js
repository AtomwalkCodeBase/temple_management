import React, { useState } from "react";
import Button from "../Button";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(255,215,0,0.07);
  margin-bottom: 2rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 700px;
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(172, 54, 73);
  margin: 0;
  padding-bottom: 0.25rem;
  border-bottom: 3px solid rgb(172, 54, 73);
  letter-spacing: 0.5px;
`;

const AddButton = styled(Button)`
  background: rgb(172, 54, 73) !important;
  color: #fff !important;
  border: none !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  padding: 0.85rem 2rem !important;
  border-radius: 10px !important;
  box-shadow: 0 2px 8px #f8d7da33;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #F8D7DA !important;
    color: rgb(172, 54, 73) !important;
  }
`;

const Th = styled.th`
  position: sticky;
  top: 0;
  background:rgb(184, 22, 22);
  color: #fff;
  font-weight: 600;
  padding: 1rem 0.75rem;
  text-align: left;
  z-index: 2;
  font-size: 1rem;
`;

const Td = styled.td`
  padding: 0.85rem 0.75rem;
  font-size: 0.98rem;
  color: #222;
  border-bottom: 1px solid #f3f4f6;
`;

const Tr = styled.tr`
  background: ${props => props.$zebra ? '#f5f5f5' : '#fff'};
  transition: background 0.2s;
  &:hover {
    background: #F8D7DA;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${props => props.$status === 'Active' ? '#22c55e' : 'rgb(172, 54, 73)'};
  color: #fff;
  border: none;
`;

const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 1.1rem;
  padding: 3rem 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalForm = styled.form`
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  min-width: 340px;
  max-width: 95vw;
  box-shadow: 0 8px 32px rgba(172,54,73,0.13);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
`;

const ModalTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(172, 54, 73);
  text-align: left;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  background: none;
  border: none;
  color: #888;
  font-size: 1.7rem;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 10;
  &:hover {
    color: rgb(172, 54, 73);
  }
`;

const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ModalLabel = styled.label`
  font-size: 0.95rem;
  color: #444;
`;

const ModalInput = styled.input`
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  background: #faf9f7;
  &:focus {
    outline: none;
    border-color: #800000;
    background: #fff;
  }
`;

const ModalError = styled.div`
  color: #e74c3c;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  ${({ variant }) =>
    variant === 'toggle' && `
      background: #fff;
      color: rgb(172, 54, 73);
      border: 1.5px solid rgb(172, 54, 73);
      &:hover {
        background: #F8D7DA;
        color: rgb(172, 54, 73);
      }
    `}
  ${({ variant }) =>
    variant === 'edit' && `
      background: rgb(172, 54, 73);
      color: #fff;
      &:hover {
        background: #F8D7DA;
        color: rgb(172, 54, 73);
      }
    `}
  ${({ variant }) =>
    variant === 'delete' && `
      background: #e74c3c;
      color: #fff;
      &:hover {
        background: #fadbd8;
        color: #e74c3c;
      }
    `}
`;

const TempleTimeSlots = ({ timeSlots, onAddTimeSlot, onEditTimeSlot, onDeleteTimeSlot, onToggleTimeSlotStatus }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [form, setForm] = useState({ name: "", start: "", end: "" });
  const [error, setError] = useState("");

  const resetForm = () => {
    setForm({ name: "", start: "", end: "" });
    setEditingSlot(null);
    setError("");
  };

  const handleOpenForm = (slot = null) => {
    if (slot) {
      setForm({ name: slot.name, start: slot.start, end: slot.end });
      setEditingSlot(slot);
    } else {
      resetForm();
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.start || !form.end) {
      setError("All fields are required.");
      return;
    }
    if (form.start >= form.end) {
      setError("Start time must be before end time.");
      return;
    }
    if (editingSlot) {
      onEditTimeSlot(editingSlot.id, { ...editingSlot, ...form });
    } else {
      onAddTimeSlot({ ...form });
    }
    handleCloseForm();
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>
      <HeaderBar>
        <AddButton
          onClick={() => handleOpenForm()}
          size="md"
        >
          + Add New Time Slot
        </AddButton>
      </HeaderBar>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.length === 0 ? (
              <tr><Td colSpan={5}><EmptyState>No time slots defined.</EmptyState></Td></tr>
            ) : (
              timeSlots.map((slot, idx) => (
                <Tr key={slot.id} $zebra={idx % 2 === 1}>
                  <Td>{slot.name}</Td>
                  <Td>{slot.start}</Td>
                  <Td>{slot.end}</Td>
                  <Td><StatusBadge $status={slot.status}>{slot.status}</StatusBadge></Td>
                  <Td>
                    <TableActions>
                      <ActionButton
                        variant="toggle"
                        onClick={() => onToggleTimeSlotStatus(slot.id)}
                        style={{ minWidth: 90 }}
                      >
                        {slot.status === "Active" ? "Deactivate" : "Activate"}
                      </ActionButton>
                      <ActionButton
                        variant="edit"
                        onClick={() => handleOpenForm(slot)}
                        style={{ minWidth: 70 }}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        onClick={() => onDeleteTimeSlot(slot.id)}
                        style={{ minWidth: 70 }}
                      >
                        Delete
                      </ActionButton>
                    </TableActions>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
      {/* Add/Edit Form Modal */}
      {showForm && (
        <ModalOverlay>
          <ModalForm onSubmit={handleSubmit}>
            <ModalClose type="button" onClick={handleCloseForm} aria-label="Close">
              <MdClose />
            </ModalClose>
            <ModalTitle>{editingSlot ? "Edit Time Slot" : "Add New Time Slot"}</ModalTitle>
            <ModalField>
              <ModalLabel>Name</ModalLabel>
              <ModalInput name="name" value={form.name} onChange={handleChange} />
            </ModalField>
            <ModalField style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <ModalLabel>Start Time</ModalLabel>
                <ModalInput name="start" type="time" value={form.start} onChange={handleChange} />
              </div>
              <div style={{ flex: 1 }}>
                <ModalLabel>End Time</ModalLabel>
                <ModalInput name="end" type="time" value={form.end} onChange={handleChange} />
              </div>
            </ModalField>
            {error && <ModalError>{error}</ModalError>}
            <ModalActions>
              <Button
                onClick={handleCloseForm}
                variant="outline"
                color="gray"
                size="md"
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color="#800000"
                size="md"
                type="submit"
              >
                {editingSlot ? "Update" : "Add"}
              </Button>
            </ModalActions>
          </ModalForm>
        </ModalOverlay>
      )}
    </div>
  );
};

export default TempleTimeSlots;

