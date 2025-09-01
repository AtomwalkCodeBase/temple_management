import axios from "axios";

const BASE_URL = "https://temple.atomwalk.com/customer/api";

// Customer Registration
export const registerCustomer = async (customerData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/customer_registration/`,
      customerData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Customer Login
export const loginCustomer = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/customer_pin_login/`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Set New PIN
export const setNewPin = async (pinData) => {
  try {
    const response = await axios.post(`${BASE_URL}/set_pin/`, pinData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Forgot PIN
export const forgotPin = async (mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer_forget_pin/`, {
      mobile_number: mobileNumber,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Process Booking
export const processBooking = async (bookingData) => {
  const token = localStorage.getItem("customerToken");
  try {
    const response = await axios.post(
      `${BASE_URL}/process_booking_data/`,
      bookingData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Booking List
export const getBookingList = async () => {
  const custRefCode = localStorage.getItem("customerRefCode");
  const token = localStorage.getItem("customerToken");
  try {
    const response = await axios.get(
      `${BASE_URL}/get_booking_list/?cust_ref_code=${custRefCode}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Customer Auth Helper Functions
export const saveCustomerAuth = (authData) => {
  localStorage.setItem("customerToken", authData.token);
  localStorage.setItem("customerRefCode", authData.cust_ref_code);
  localStorage.setItem("customerId", authData.customer_id.toString());
};

export const getCustomerAuth = () => {
  return {
    token: localStorage.getItem("customerToken"),
    custRefCode: localStorage.getItem("customerRefCode"),
    customerId: localStorage.getItem("customerId"),
  };
};

export const clearCustomerAuth = () => {
  localStorage.removeItem("customerToken");
  localStorage.removeItem("customerRefCode");
  localStorage.removeItem("customerId");
};

export const isCustomerAuthenticated = () => {
  return !!localStorage.getItem("customerToken");
};
