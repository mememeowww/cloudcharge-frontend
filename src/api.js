// src/api.js
// src/api.js
console.log("VITE_API_URL =>", import.meta.env.VITE_API_URL);

import axios from "axios";

// ✅ Correct way to access Vite env variables
const API_URL = import.meta.env.VITE_API_URL;

// 🔹 AUTH ENDPOINTS
export const registerUser = (userData) =>
  axios.post(`${API_URL}/api/auth/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_URL}/api/auth/login`, userData);

// 🔹 BATTERY ENDPOINT
export const getBattery = (token) =>
  axios.get(`${API_URL}/battery`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 🔹 USER PROFILE ENDPOINT
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
