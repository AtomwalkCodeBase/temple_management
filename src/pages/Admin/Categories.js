import React, { useState } from "react";
import styled from "styled-components";
import { MdClose, MdAdd, MdExpandMore, MdExpandLess } from "react-icons/md";

// Theme colors
const themeColor = "rgb(184, 22, 22)";
const themeColorLight = "rgba(184, 22, 22, 0.1)";
const themeColorLighter = "rgba(184, 22, 22, 0.05)";
const themeColorDark = "rgb(150, 18, 18)";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: ${themeColor};
    border-radius: 2px;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${themeColor};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(184, 22, 22, 0.3);
  
  &:hover {
    background: ${themeColorDark};
    transform: translateY(-1px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: ${props => props.$isActive ? themeColorLighter : '#f7fafc'};
  cursor: pointer;
  border-bottom: ${props => props.$expanded ? '1px solid #e2e8f0' : 'none'};
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CategoryName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryStatus = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.$active ? '#c6f6d5' : '#fed7d7'};
  color: ${props => props.$active ? '#22543d' : '#742a2a'};
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: none;
  border: 1px solid #e2e8f0;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f1f5f9;
    
    &.edit {
      color: ${themeColor};
      border-color: ${themeColorLight};
    }
    
    &.delete {
      color: #e53e3e;
      border-color: #fed7d7;
    }
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s;
  transform: ${props => props.$expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const SubcategorySection = styled.div`
  padding: ${props => props.$expanded ? '1.25rem' : '0'};
  background: #f7fafc;
  max-height: ${props => props.$expanded ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const SubcategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: ${props => props.$hasItems ? '1rem' : '0'};
`;

const SubcategoryTag = styled.div`
  display: flex;
  align-items: center;
  background: ${themeColorLighter};
  color: ${themeColor};
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const RemoveSubcategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${themeColor};
  cursor: pointer;
  margin-left: 0.25rem;
  font-size: 1rem;
  transition: color 0.2s;
  
  &:hover {
    color: #e53e3e;
  }
`;

const AddSubcategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${themeColorLight};
  color: ${themeColor};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(184, 22, 22, 0.2);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #718096;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #e53e3e;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #4a5568;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
    
    &:focus {
      outline: none;
      border-color: ${themeColor};
      box-shadow: 0 0 0 3px rgba(184, 22, 22, 0.2);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  
  input {
    width: auto;
  }
  
  label {
    margin: 0;
    font-weight: 400;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SecondaryButton = styled.button`
  background: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f7fafc;
  }
`;

const PrimaryButton = styled.button`
  background: ${themeColor};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${themeColorDark};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  h3 {
    color: #4a5568;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #718096;
    margin-bottom: 1.5rem;
  }
`;

const Categories = ({ 
  categories, 
  onAddCategory, 
  onEditCategory, 
  onDeleteCategory, 
  onToggleCategoryStatus,
  onAddSubcategory,
  onRemoveSubcategory 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", hasSubcategories: false });
  const [subcategoryName, setSubcategoryName] = useState("");
  const [error, setError] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategoryExpand = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const resetForm = () => {
    setForm({ name: "", description: "", hasSubcategories: false });
    setEditingCategory(null);
    setError("");
  };

  const handleOpenForm = (category = null) => {
    if (category) {
      setForm({ 
        name: category.name, 
        description: category.description || "", 
        hasSubcategories: category.hasSubcategories 
      });
      setEditingCategory(category);
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
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      setError("Name and description are required.");
      return;
    }
    
    if (editingCategory) {
      onEditCategory(editingCategory.id, form);
    } else {
      onAddCategory(form);
    }
    handleCloseForm();
  };

  const handleOpenSubcategoryForm = (category) => {
    setSelectedCategory(category);
    setSubcategoryName("");
    setShowSubcategoryForm(true);
  };

  const handleCloseSubcategoryForm = () => {
    setShowSubcategoryForm(false);
    setSelectedCategory(null);
    setSubcategoryName("");
  };

  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (!subcategoryName.trim()) {
      setError("Subcategory name is required.");
      return;
    }
    if (selectedCategory.subcategories.includes(subcategoryName.trim())) {
      setError("Subcategory already exists.");
      return;
    }
    onAddSubcategory(selectedCategory.id, subcategoryName.trim());
    handleCloseSubcategoryForm();
  };

  return (
    <Container>
      <Header>
        <Title>Category Management</Title>
        <AddButton onClick={() => handleOpenForm()}>
          <MdAdd /> Add Category
        </AddButton>
      </Header>

      {categories.length === 0 ? (
        <EmptyState>
          <h3>No categories found</h3>
          <p>Get started by adding your first category</p>
          <AddButton onClick={() => handleOpenForm()}>
            <MdAdd /> Add Category
          </AddButton>
        </EmptyState>
      ) : (
        categories.map(category => (
          <CategoryCard key={category.id}>
            <CategoryHeader 
              $isActive={category.status === "Active"}
              $expanded={expandedCategories[category.id]}
              onClick={() => toggleCategoryExpand(category.id)}
            >
              <CategoryInfo>
                <CategoryName>
                  {category.name}
                  {category.hasSubcategories && (
                    <ExpandButton 
                      $expanded={expandedCategories[category.id]}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategoryExpand(category.id);
                      }}
                    >
                      {expandedCategories[category.id] ? <MdExpandLess /> : <MdExpandMore />}
                    </ExpandButton>
                  )}
                </CategoryName>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryInfo>
              
              <CategoryActions>
                <CategoryStatus $active={category.status === "Active"}>
                  {category.status}
                </CategoryStatus>
                
                <ActionButton 
                  className="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenForm(category);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ActionButton>
                
                <ActionButton 
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(category.id);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ActionButton>
              </CategoryActions>
            </CategoryHeader>
            
            {category.hasSubcategories && (
              <SubcategorySection $expanded={expandedCategories[category.id]}>
                <SubcategoryList $hasItems={category.subcategories.length > 0}>
                  {category.subcategories.map((sub, index) => (
                    <SubcategoryTag key={index}>
                      {sub}
                      <RemoveSubcategoryButton 
                        onClick={() => onRemoveSubcategory(category.id, sub)}
                      >
                        ×
                      </RemoveSubcategoryButton>
                    </SubcategoryTag>
                  ))}
                </SubcategoryList>
                
                <AddSubcategoryButton 
                  onClick={() => handleOpenSubcategoryForm(category)}
                >
                  <MdAdd /> Add Subcategory
                </AddSubcategoryButton>
              </SubcategorySection>
            )}
          </CategoryCard>
        ))
      )}

      {/* Add/Edit Category Modal */}
      {showForm && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={handleCloseForm}>
              <MdClose />
            </ModalCloseButton>
            
            <ModalHeader>
              <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
            </ModalHeader>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Category Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  placeholder="Enter category name"
                />
              </FormGroup>
              
              <FormGroup>
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder="Enter category description"
                />
              </FormGroup>
              
              <CheckboxGroup>
                <input 
                  type="checkbox" 
                  id="hasSubcategories" 
                  name="hasSubcategories" 
                  checked={form.hasSubcategories} 
                  onChange={handleChange} 
                />
                <label htmlFor="hasSubcategories">Allow subcategories</label>
              </CheckboxGroup>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <ModalFooter>
                <SecondaryButton type="button" onClick={handleCloseForm}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">
                  {editingCategory ? "Update Category" : "Add Category"}
                </PrimaryButton>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Add Subcategory Modal */}
      {showSubcategoryForm && selectedCategory && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={handleCloseSubcategoryForm}>
              <MdClose />
            </ModalCloseButton>
            
            <ModalHeader>
              <h3>Add Subcategory to {selectedCategory.name}</h3>
            </ModalHeader>
            
            <form onSubmit={handleAddSubcategory}>
              <FormGroup>
                <label>Subcategory Name</label>
                <input 
                  type="text" 
                  value={subcategoryName} 
                  onChange={(e) => setSubcategoryName(e.target.value)} 
                  placeholder="Enter subcategory name"
                />
              </FormGroup>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <ModalFooter>
                <SecondaryButton type="button" onClick={handleCloseSubcategoryForm}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton type="submit">
                  Add Subcategory
                </PrimaryButton>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Categories;