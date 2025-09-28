import axios from "axios";
import Cookies from "js-cookie";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({ baseURL, withCredentials: true });

nextServer.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}
);

export default nextServer;
