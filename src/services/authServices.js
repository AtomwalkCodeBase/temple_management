import axios from "axios";
import { loginEndpoint } from "./ConstantServies";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "https://temple.atomwalk.com/auth/login/",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("customerToken");
};

export const isAuthenticated = () => {
  return !!(
    localStorage.getItem("userToken") || localStorage.getItem("customerToken")
  );
};
