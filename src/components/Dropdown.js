import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: ${props => {
    const sizes = {
      sm: '0.5rem 0.75rem',
      md: '0.75rem 1rem',
      lg: '1rem 1.25rem'
    };
    return sizes[props.size] || sizes.md;
  }};
  border: 1px solid #e0e0e0;
  border-radius: ${props => {
    const sizes = {
      sm: '4px',
      md: '8px',
      lg: '12px'
    };
    return sizes[props.size] || sizes.md;
  }};
  font-size: ${props => {
    const sizes = {
      sm: '14px',
      md: '16px',
      lg: '18px'
    };
    return sizes[props.size] || sizes.md;
  }};
  background: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  min-width: ${props => props.minWidth || 'auto'};
  width: ${props => props.width || 'auto'};
  
  &:focus {
    border-color: #f7931e;
    box-shadow: 0 0 0 3px rgba(247, 147, 30, 0.1);
  }
  
  &:hover {
    border-color: #d1d5db;
  }
  
  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  option {
    padding: 0.5rem;
    background: #fff;
    color: #333;
  }
`;

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder,
  size = "md",
  disabled = false,
  width,
  minWidth,
  className,
  ...props
}) => {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      size={size}
      disabled={disabled}
      width={width}
      minWidth={minWidth}
      className={className}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  className: PropTypes.string
};

Dropdown.defaultProps = {
  options: [],
  size: 'md',
  disabled: false
};

export default Dropdown; 