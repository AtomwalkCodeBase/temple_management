import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { MdAdd, MdEdit, MdDelete, MdPerson, MdSchedule, MdSettings } from "react-icons/md";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
`;

const InfoLabel = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #1e293b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${props => {
    switch (props.$status) {
      case 'Active':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'Inactive':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const PriestAssignment = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      priestName: "Pandit Ramesh Kumar",
      specialization: "Vedic Rituals",
      maxPujasPerDay: 5,
      defaultPujas: ["Ganesh Puja", "Lakshmi Puja"],
      backupPriests: ["Pandit Suresh", "Pandit Amit"],
      status: "Active",
      availability: "Mon-Sat, 6 AM - 8 PM"
    },
    {
      id: 2,
      priestName: "Pandit Suresh Sharma",
      specialization: "Marriage Ceremonies",
      maxPujasPerDay: 3,
      defaultPujas: ["Vivah Sanskar", "Griha Pravesh"],
      backupPriests: ["Pandit Ramesh", "Pandit Amit"],
      status: "Active",
      availability: "Mon-Sun, 8 AM - 6 PM"
    },
    {
      id: 3,
      priestName: "Pandit Amit Patel",
      specialization: "Festival Pujas",
      maxPujasPerDay: 4,
      defaultPujas: ["Diwali Puja", "Navratri Puja"],
      backupPriests: ["Pandit Ramesh", "Pandit Suresh"],
      status: "Inactive",
      availability: "Mon-Fri, 7 AM - 7 PM"
    }
  ]);

  const handleAddAssignment = () => {
    console.log("Add new priest assignment");
    // TODO: Implement add functionality
  };

  const handleEditAssignment = (assignment) => {
    console.log("Edit assignment:", assignment);
    // TODO: Implement edit functionality
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const handleToggleStatus = (id) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id 
        ? { ...assignment, status: assignment.status === "Active" ? "Inactive" : "Active" }
        : assignment
    ));
  };

  return (
    <Container>
      <Header>
        <Title>👨‍💼 Priest Assignment Management</Title>
        <AddButton color="blue" onClick={handleAddAssignment}>
          <MdAdd />
          Add Assignment
        </AddButton>
      </Header>

      <Grid>
        {assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>
                <MdPerson />
                {assignment.priestName}
              </CardTitle>
              <CardActions>
                <Button
                  size="sm"
                  variant="outline"
                  color="orange"
                  onClick={() => handleEditAssignment(assignment)}
                >
                  <MdEdit />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  color="red"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  <MdDelete />
                </Button>
              </CardActions>
            </CardHeader>

            <div>
              <InfoRow>
                <InfoLabel>Specialization:</InfoLabel>
                <InfoValue>{assignment.specialization}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Max Pujas/Day:</InfoLabel>
                <InfoValue>{assignment.maxPujasPerDay}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Status:</InfoLabel>
                <StatusBadge $status={assignment.status}>
                  {assignment.status}
                </StatusBadge>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Availability:</InfoLabel>
                <InfoValue>{assignment.availability}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Default Pujas:</InfoLabel>
                <InfoValue>{assignment.defaultPujas.join(", ")}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Backup Priests:</InfoLabel>
                <InfoValue>{assignment.backupPriests.join(", ")}</InfoValue>
              </InfoRow>
            </div>
          </Card>
        ))}
      </Grid>

      {assignments.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          <MdSettings style={{ fontSize: "3rem", marginBottom: "1rem" }} />
          <h3>No Priest Assignments</h3>
          <p>Start by adding priest assignments to manage puja allocations.</p>
        </div>
      )}
    </Container>
  );
};

export default PriestAssignment; 