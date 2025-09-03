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

// Fetch Bookings by Service ID
export const getServiceBookings = async (serviceId) => {
  const token = localStorage.getItem("customerToken");
  try {
    // Attempt with service_id filter; backend may accept this param to filter booked dates by service
    const url = `${BASE_URL}/get_booking_list/`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Fall back to empty if not supported
    console.log(
      "getServiceBookings failed:",
      error?.response?.data || error?.message
    );
    return [];
  }
};

// Local Storage Helpers
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

// Helper to transform bookings into a set of disabled date keys (YYYY-MM-DD)
export const toDateKey = (d) => {
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return null;
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const extractDisabledDatesFromBookings = (bookings) => {
  function toDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const keySet = new Set();
  (bookings || []).forEach((b) => {
    // Try common field names for booking date
    const rawDate =
      b.booking_date ||
      b.book_date ||
      b.date ||
      (b.booking_data && b.booking_data.booking_date);

    if (!rawDate) return;

    // Parse DD-MM-YYYY format (e.g., "16-08-2025")
    const dateParts = String(rawDate).split("-");

    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JS
      const year = parseInt(dateParts[2], 10);

      // Validate the date parts
      if (
        !isNaN(day) &&
        !isNaN(month) &&
        !isNaN(year) &&
        month >= 0 &&
        month <= 11 &&
        day >= 1 &&
        day <= 31
      ) {
        const date = new Date(year, month, day);

        // Double-check if the date is valid
        if (
          !isNaN(date.getTime()) &&
          date.getDate() === day &&
          date.getMonth() === month &&
          date.getFullYear() === year
        ) {
          const key = toDateKey(date);
          keySet.add(key);
        }
      }
    }
  });
  return keySet;
};

// Helper function to convert Date object to YYYY-MM-DD format
