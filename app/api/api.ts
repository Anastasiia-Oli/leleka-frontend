import axios from "axios";

export const api = axios.create({
  baseURL: "https://leleka-backend-1.onrender.com",
  withCredentials: true,
});
