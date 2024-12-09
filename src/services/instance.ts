import axios from "axios";
import { API_URL } from "../lib/constant";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const credential = localStorage.getItem("credential");
    const AUTH_TOKEN = credential ? JSON.parse(credential).jwt : null;

    if (AUTH_TOKEN) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
