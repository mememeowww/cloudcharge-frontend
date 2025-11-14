// src/api.js
// src/api.js
console.log("VITE_API_URL =>", import.meta.env.VITE_API_URL);

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ---------- AUTH ----------
export const registerUser = (userData) =>
  axios.post(`${API_URL}/api/auth/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_URL}/api/auth/login`, userData);

// ---------- BATTERY ----------
export const getBattery = (token) =>
  axios.get(`${API_URL}/api/battery`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ---------- USER ----------
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
