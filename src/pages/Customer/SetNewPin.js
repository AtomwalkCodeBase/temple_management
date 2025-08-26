"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiSave,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { setNewPin } from "../../services/customerServices";
import { useCustomerAuth } from "../../contexts/CustomerAuthContext";

const SetPinContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const SetPinCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  .om-symbol {
    font-size: 4rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
  }

  .title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #1f2937, #374151);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1rem;
    color: #6b7280;
    font-weight: 500;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    color: #667eea;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: rgba(255, 255, 255, 0.95);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  padding: 1.25rem 2rem;
  border-radius: 1rem;
  font-size: 1.1rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  border: none;
  cursor: pointer;
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
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  border: 1px solid #fca5a5;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "⚠️";
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  padding: 2rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  border: 1px solid #6ee7b7;
  text-align: center;

  .success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .instructions {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-top: 1rem;
  }
`;

const BackLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: #764ba2;
      text-decoration: underline;
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SetNewPin = () => {
  const [formData, setFormData] = useState({
    u_id: "",
    o_pin: "",
    n_pin: "",
    confirmPin: "",
  });
  const [showPins, setShowPins] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { customerData } = useCustomerAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const togglePinVisibility = (field) => {
    setShowPins({
      ...showPins,
      [field]: !showPins[field],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.n_pin !== formData.confirmPin) {
      setError("New PIN and Confirm PIN do not match");
      setLoading(false);
      return;
    }

    if (formData.n_pin.length < 4) {
      setError("PIN must be at least 4 digits");
      setLoading(false);
      return;
    }

    try {
      const pinData = {
        u_id: formData.u_id || customerData?.customerId,
        o_pin: formData.o_pin,
        n_pin: formData.n_pin,
      };

      await setNewPin(pinData);
      setSuccess(true);

      // Redirect to login after 5 seconds
      setTimeout(() => {
        navigate("/customer-login");
      }, 5000);
    } catch (err) {
      setError(err.message || "Failed to update PIN. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SetPinContainer>
        <SetPinCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="success-icon">✅</div>
            <div>
              <strong>PIN Updated Successfully!</strong>
            </div>
            <div>Your PIN has been updated successfully!</div>
            <div className="instructions">
              You can now use your new PIN to login to your account.
              <br />
              <em>Redirecting to login page in 5 seconds...</em>
            </div>
          </SuccessMessage>

          <BackLink>
            <Link to="/customer-login">
              <FiArrowLeft />
              Go to Login
            </Link>
          </BackLink>
        </SetPinCard>
      </SetPinContainer>
    );
  }

  return (
    <SetPinContainer>
      <SetPinCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo>
          <motion.div
            className="om-symbol"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            🕉️
          </motion.div>
          <div className="title">Update PIN</div>
          <div className="subtitle">Change your account PIN</div>
        </Logo>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </ErrorMessage>
          )}

          <FormGroup>
            <Label htmlFor="u_id">
              <FiUser className="icon" />
              User ID
            </Label>
            <Input
              type="text"
              id="u_id"
              name="u_id"
              value={formData.u_id}
              onChange={handleChange}
              placeholder={customerData?.customerId || "Enter your user ID"}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="o_pin">
              <FiLock className="icon" />
              Current PIN
            </Label>
            <InputContainer>
              <Input
                type={showPins.old ? "text" : "password"}
                id="o_pin"
                name="o_pin"
                value={formData.o_pin}
                onChange={handleChange}
                required
                placeholder="Enter your current PIN"
                maxLength="6"
              />
              <ToggleButton
                type="button"
                onClick={() => togglePinVisibility("old")}
              >
                {showPins.old ? <FiEyeOff /> : <FiEye />}
              </ToggleButton>
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="n_pin">
              <FiLock className="icon" />
              New PIN
            </Label>
            <InputContainer>
              <Input
                type={showPins.new ? "text" : "password"}
                id="n_pin"
                name="n_pin"
                value={formData.n_pin}
                onChange={handleChange}
                required
                placeholder="Enter your new PIN"
                maxLength="6"
              />
              <ToggleButton
                type="button"
                onClick={() => togglePinVisibility("new")}
              >
                {showPins.new ? <FiEyeOff /> : <FiEye />}
              </ToggleButton>
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPin">
              <FiLock className="icon" />
              Confirm New PIN
            </Label>
            <InputContainer>
              <Input
                type={showPins.confirm ? "text" : "password"}
                id="confirmPin"
                name="confirmPin"
                value={formData.confirmPin}
                onChange={handleChange}
                required
                placeholder="Confirm your new PIN"
                maxLength="6"
              />
              <ToggleButton
                type="button"
                onClick={() => togglePinVisibility("confirm")}
              >
                {showPins.confirm ? <FiEyeOff /> : <FiEye />}
              </ToggleButton>
            </InputContainer>
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                Updating...
              </>
            ) : (
              <>
                <FiSave />
                Update PIN
              </>
            )}
          </SubmitButton>
        </Form>

        <BackLink>
          <Link to="/customer-login">
            <FiArrowLeft />
            Back to Login
          </Link>
        </BackLink>
      </SetPinCard>
    </SetPinContainer>
  );
};

export default SetNewPin;
