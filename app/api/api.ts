import axios from "axios";

const baseURL = "https://leleka-backend-1.onrender.com";

const api = axios.create({ baseURL, withCredentials: true });

export default api;
